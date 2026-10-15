// Convierte un borrador de docs/blog/drafts/*.md en un documento `article` de Sanity (NDJSON)
// para `sanity dataset import`. Se importa como borrador (`drafts.`): se revisa y publica en el Studio.
// Admite lo que permite el esquema (también ![alt](ruta) como imagen): párrafos, ### → h2, #### → h3, listas, bloques de código,
// **negrita**, *cursiva*, `código` y [enlaces](url).
// Uso: node scripts/blog/markdown-to-sanity.mjs docs/blog/drafts/<archivo>.md [publishedAt ISO]
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [sourcePath, publishedAtArgument] = process.argv.slice(2);
if (!sourcePath) {
  console.error(
    "Uso: node scripts/blog/markdown-to-sanity.mjs <borrador.md> [publishedAt]",
  );
  process.exit(1);
}

const source = readFileSync(sourcePath, "utf8");
const [header, body] = source.split(/^## body\s*$/m);
if (!body) throw new Error("El borrador no tiene la sección `## body`");

const readField = (name) => {
  const match = header.match(
    new RegExp(`^- \\*\\*${name}[^*]*:\\*\\* (.+)$`, "m"),
  );
  if (!match)
    throw new Error(`Falta el campo ${name} en la cabecera del borrador`);
  return match[1].trim();
};

const title = readField("title");
const slug = readField("slug");
const description = readField("description");
if (description.length > 160)
  throw new Error(
    `La descripción tiene ${description.length} caracteres (máx. 160)`,
  );

let keyCounter = 0;
const createKey = () =>
  createHash("sha1")
    .update(`${slug}-${keyCounter++}`)
    .digest("hex")
    .slice(0, 12);

// Inline: recorre el texto y abre o cierra marcas; dentro de `código` no hay más marcas.
const parseInline = (text) => {
  const spans = [];
  const markDefs = [];
  const active = { strong: false, em: false };
  let buffer = "";
  const pushSpan = (value, extraMarks = []) => {
    if (!value) return;
    const marks = [
      ...(active.strong ? ["strong"] : []),
      ...(active.em ? ["em"] : []),
      ...extraMarks,
    ];
    spans.push({ _type: "span", _key: createKey(), text: value, marks });
  };
  for (let index = 0; index < text.length;) {
    const rest = text.slice(index);
    const link = rest.match(
      /^\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)/,
    );
    if (rest.startsWith("`")) {
      const end = text.indexOf("`", index + 1);
      if (end === -1) throw new Error(`Código sin cerrar: ${text}`);
      pushSpan(buffer);
      buffer = "";
      pushSpan(text.slice(index + 1, end), ["code"]);
      index = end + 1;
    } else if (rest.startsWith("**")) {
      pushSpan(buffer);
      buffer = "";
      active.strong = !active.strong;
      index += 2;
    } else if (rest.startsWith("*") && !rest.startsWith("* ")) {
      pushSpan(buffer);
      buffer = "";
      active.em = !active.em;
      index += 1;
    } else if (link) {
      pushSpan(buffer);
      buffer = "";
      const markKey = createKey();
      markDefs.push({ _type: "link", _key: markKey, href: link[2] });
      pushSpan(link[1], [markKey]);
      index += link[0].length;
    } else {
      buffer += text[index];
      index += 1;
    }
  }
  pushSpan(buffer);
  if (active.strong || active.em)
    throw new Error(`Negrita o cursiva sin cerrar: ${text}`);
  return { children: spans, markDefs };
};

const createBlock = (text, style = "normal", listItem, level = 1) => ({
  _type: "block",
  _key: createKey(),
  style,
  ...(listItem ? { listItem, level } : {}),
  ...parseInline(text),
});

const CODE_LANGUAGE_ALIASES = {
  sh: "sh",
  js: "javascript",
  ts: "typescript",
  md: "markdown",
};
const SUPPORTED_CODE_LANGUAGES = new Set([
  "bash",
  "sh",
  "json",
  "javascript",
  "js",
  "typescript",
  "ts",
  "tsx",
  "markdown",
  "md",
  "text",
]);

const blocks = [];
let paragraph = [];
let codeFence;
const flushParagraph = () => {
  if (paragraph.length) blocks.push(createBlock(paragraph.join(" ")));
  paragraph = [];
};

for (const line of body.trim().split("\n")) {
  if (codeFence) {
    if (line === "```") {
      blocks.push({
        _type: "code",
        _key: createKey(),
        language: codeFence.language,
        ...(codeFence.filename ? { filename: codeFence.filename } : {}),
        code: codeFence.lines.join("\n"),
      });
      codeFence = undefined;
    } else codeFence.lines.push(line);
    continue;
  }

  if (line.startsWith("```")) {
    flushParagraph();
    const opening = line.match(/^```(?:([A-Za-z]+)(?: title=(.+))?)?$/);
    if (!opening) throw new Error(`Valla de código no válida: ${line}`);
    const language = (opening[1] ?? "text").toLowerCase();
    if (!SUPPORTED_CODE_LANGUAGES.has(language))
      throw new Error(`Lenguaje de código no admitido: ${language}`);
    codeFence = {
      language: CODE_LANGUAGE_ALIASES[language] ?? language,
      filename: opening[2],
      lines: [],
    };
    continue;
  }

  // ![alt](ruta local) → bloque imagen; `sanity dataset import` sube el archivo como asset.
  const image = line.match(/^!\[([^\]]+)\]\(([^)\s]+)\)$/);
  if (image) {
    flushParagraph();
    const imagePath = resolve(dirname(sourcePath), image[2]);
    if (!existsSync(imagePath)) throw new Error(`No existe la imagen: ${image[2]}`);
    blocks.push({
      _type: "image",
      _key: createKey(),
      _sanityAsset: `image@${pathToFileURL(imagePath).href}`,
      alt: image[1],
    });
    continue;
  }

  const heading = line.match(/^(#{3,5}) (.+)$/);
  // Dos o más espacios de sangría delante de la viñeta = segundo nivel de lista.
  const bullet = line.match(/^( *)- (.+)$/);
  const numbered = line.match(/^( *)\d+\. (.+)$/);
  const quote = line.match(/^> (.+)$/);
  if (!line.trim()) flushParagraph();
  else if (heading) {
    flushParagraph();
    blocks.push(createBlock(heading[2], `h${heading[1].length - 1}`));
  } else if (bullet || numbered) {
    flushParagraph();
    blocks.push(
      createBlock(
        (bullet ?? numbered)[2],
        "normal",
        bullet ? "bullet" : "number",
        (bullet ?? numbered)[1].length >= 2 ? 2 : 1,
      ),
    );
  } else if (quote) {
    flushParagraph();
    blocks.push(createBlock(quote[1], "blockquote"));
  } else if (/^#{1,2} /.test(line))
    throw new Error(`Encabezado no admitido en el cuerpo: ${line}`);
  else paragraph.push(line.trim());
}
if (codeFence)
  throw new Error("Valla de código sin cerrar al final del archivo");
flushParagraph();

const article = {
  _id: `drafts.article-${slug}`,
  _type: "article",
  title,
  slug: { _type: "slug", current: slug },
  description,
  publishedAt: publishedAtArgument ?? new Date().toISOString(),
  body: blocks,
};

const outputPath = sourcePath.replace(/\.md$/, ".ndjson");
writeFileSync(outputPath, `${JSON.stringify(article)}\n`);
console.log(`${outputPath}: ${blocks.length} bloques · ${title}`);
