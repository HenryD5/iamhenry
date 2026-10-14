// Mide el color de los bordes de un video ya codificado.
// Uso: node tools/edge-colors.mjs <video> [bt709|bt601]
import { spawn } from "node:child_process";
const [file, matrix = "bt709"] = process.argv.slice(2);
const W = 1920, H = 1080, FS = W * H * 3;
const ff = spawn("ffmpeg", ["-v", "error", "-i", file, "-vf", `scale=in_color_matrix=${matrix}:in_range=tv:out_range=pc:flags=accurate_rnd+full_chroma_int`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"]);
const pts = { "sup-izq": [0, 0], "sup-centro": [960, 0], "sup-der": [1919, 0], "izq-centro": [0, 540], "der-centro": [1919, 540], "inf-izq": [0, 1079], "inf-centro": [960, 1079], "inf-der": [1919, 1079] };
const seen = {}; for (const k in pts) seen[k] = new Map();
const border = new Map(); let frames = 0, first = null, last = null;
let buf = Buffer.alloc(0);
const hex = (b, o) => "#" + [b[o], b[o + 1], b[o + 2]].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
function frame(f) {
  frames++;
  for (const k in pts) { const c = hex(f, (pts[k][1] * W + pts[k][0]) * 3); seen[k].set(c, (seen[k].get(c) || 0) + 1); }
  const add = (x, y) => { const c = hex(f, (y * W + x) * 3); border.set(c, (border.get(c) || 0) + 1); };
  for (let x = 0; x < W; x++) { add(x, 0); add(x, H - 1); }
  for (let y = 1; y < H - 1; y++) { add(0, y); add(W - 1, y); }
  if (!first) first = Buffer.from(f); last = Buffer.from(f);
}
ff.stdout.on("data", (d) => { buf = buf.length ? Buffer.concat([buf, d]) : d; while (buf.length >= FS) { frame(buf.subarray(0, FS)); buf = buf.subarray(FS); } });
ff.stderr.pipe(process.stderr);
ff.on("close", () => {
  console.log(file, "· matriz", matrix, "· fotogramas", frames);
  for (const k in pts) console.log(" ", k.padEnd(11), [...seen[k]].map(([c, n]) => `${c} x${n}`).join(", "));
  const tot = [...border.values()].reduce((a, b) => a + b, 0);
  console.log("  perímetro completo (1 px, todos los fotogramas):", [...border].sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c} ${(100 * n / tot).toFixed(3)}%`).join(", "));
  let diff = 0, max = 0; for (let i = 0; i < FS; i++) { const d = Math.abs(first[i] - last[i]); if (d) { diff++; if (d > max) max = d; } }
  console.log("  primer vs último fotograma: valores distintos", diff, "de", FS, "· diferencia máxima", max);
  console.log("  centro del núcleo (960,540) f0:", hex(first, (540 * W + 960) * 3));
});
