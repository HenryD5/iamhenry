// Convierte un borrador de docs/blog/drafts/*.md en un documento `article` de Sanity (NDJSON)
// para `sanity dataset import`. Se importa como borrador (`drafts.`): se revisa y publica en el Studio.
// Admite lo que permite el esquema: párrafos, ### → h2, #### → h3, listas, **negrita**, *cursiva*, `código` y [enlaces](url).
// Uso: node scripts/blog/markdown-to-sanity.mjs docs/blog/drafts/<archivo>.md [publishedAt ISO]
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const [sourcePath, publishedAtArgument] = process.argv.slice(2);
if (!sourcePath) {
  console.error("Uso: node scripts/blog/markdown-to-sanity.mjs <borrador.md> [publishedAt]");
  process.exit(1);
}

const source = readFileSync(sourcePath, "utf8");
const [header, body] = source.split(/^## body\s*$/m);
if (!body) throw new Error("El borrador no tiene la sección `## body`");

const readField = (name) => {
  const match = header.match(new RegExp(`^- \\*\\*${name}[^*]*:\\*\\* (.+)$`, "m"));
  if (!match) throw new Error(`Falta el campo ${name} en la cabecera del borrador`);
  return match[1].trim();
};

const title = readField("title");
const slug = readField("slug");
const description = readField("description");
if (description.length > 160) throw new Error(`La descripción tiene ${description.length} caracteres (máx. 160)`);

let keyCounter = 0;
const createKey = () => createHash("sha1").update(`${slug}-${keyCounter++}`).digest("hex").slice(0, 12);

// Inline: recorre el texto y abre o cierra marcas; dentro de `código` no hay más marcas.
const parseInline = (text) => {
  const spans = [];
  const markDefs = [];
  const active = { strong: false, em: false };
  let buffer = "";
  const pushSpan = (value, extraMarks = []) => {
    if (!value) return;
    const marks = [...(active.strong ? ["strong"] : []), ...(active.em ? ["em"] : []), ...extraMarks];
    spans.push({ _type: "span", _key: createKey(), text: value, marks });
  };
  for (let index = 0; index < text.length; ) {
    const rest = text.slice(index);
    const link = rest.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)/);
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
  if (active.strong || active.em) throw new Error(`Negrita o cursiva sin cerrar: ${text}`);
  return { children: spans, markDefs };
};

const createBlock = (text, style = "normal", listItem) => ({
  _type: "block",
  _key: createKey(),
  style,
  ...(listItem ? { listItem, level: 1 } : {}),
  ...parseInline(text),
});

const blocks = [];
let paragraph = [];
const flushParagraph = () => {
  if (paragraph.length) blocks.push(createBlock(paragraph.join(" ")));
  paragraph = [];
};

for (const line of body.trim().split("\n")) {
  const heading = line.match(/^(#{3,5}) (.+)$/);
  const bullet = line.match(/^- (.+)$/);
  const numbered = line.match(/^\d+\. (.+)$/);
  const quote = line.match(/^> (.+)$/);
  if (!line.trim()) flushParagraph();
  else if (heading) {
    flushParagraph();
    blocks.push(createBlock(heading[2], `h${heading[1].length - 1}`));
  } else if (bullet || numbered) {
    flushParagraph();
    blocks.push(createBlock((bullet ?? numbered)[1], "normal", bullet ? "bullet" : "number"));
  } else if (quote) {
    flushParagraph();
    blocks.push(createBlock(quote[1], "blockquote"));
  } else if (/^#{1,2} /.test(line)) throw new Error(`Encabezado no admitido en el cuerpo: ${line}`);
  else paragraph.push(line.trim());
}
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
