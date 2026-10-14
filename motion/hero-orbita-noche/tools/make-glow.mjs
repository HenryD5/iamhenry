// Genera assets/glow.png: el resplandor del hero (HeroSection.tsx, primer div absoluto)
// reproducido con los HEX de brief/theme.css, ya compuesto sobre #F6F5FB.
// Uso: node tools/make-glow.mjs | ffmpeg -y -f rawvideo -pix_fmt rgb24 -s 1920x1080 -i - -frames:v 1 assets/glow.png
// Web: caja 84rem x 46rem, opacidad .5, blur 4.5rem; anillo exterior 80rem de ancho.
// Video: anillo exterior 1560 px de ancho -> 19.5 px/rem.
const W = 1920, H = 1080, S = 2;            // S: submuestreo para el desenfoque
const w = W / S, h = H / S;
const REM = 1560 / 80;                       // 19.5 px por rem
const BW = 84 * REM, BH = 46 * REM;          // 1638 x 897
const BX = 960 - BW / 2, BY = 540 - BH / 2;  // centrado en el núcleo
const SIGMA = 4.5 * REM;                     // 87.75 px
const OPACITY = 0.5;
const BG = [0x0e, 0x10, 0x22];
const LAYERS = [                              // de arriba a abajo, como en el CSS
  { c: [0x66, 0x92, 0xfe], px: 0.28, py: 0.50, stop: 0.45 }, // --primary-400
  { c: [0x96, 0xb6, 0xfe], px: 0.54, py: 0.44, stop: 0.42 }, // --primary-300
  { c: [0xfe, 0x96, 0x8e], px: 0.78, py: 0.60, stop: 0.36 }, // --tertiary-300
].map((l) => {
  const cx = l.px * BW, cy = l.py * BH;
  const r = Math.max(Math.hypot(cx, cy), Math.hypot(BW - cx, cy), Math.hypot(cx, BH - cy), Math.hypot(BW - cx, BH - cy));
  return { ...l, cx, cy, R: r * l.stop };    // circle farthest-corner
});

// campo premultiplicado a media resolución
let f = [0, 1, 2, 3].map(() => new Float64Array(w * h));
for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
  const x = (i + 0.5) * S - BX, y = (j + 0.5) * S - BY;
  if (x < 0 || y < 0 || x > BW || y > BH) continue;
  let r = 0, g = 0, b = 0, a = 0;
  for (let k = LAYERS.length - 1; k >= 0; k--) {
    const l = LAYERS[k];
    const al = Math.max(0, 1 - Math.hypot(x - l.cx, y - l.cy) / l.R);
    r = l.c[0] * al + r * (1 - al); g = l.c[1] * al + g * (1 - al); b = l.c[2] * al + b * (1 - al); a = al + a * (1 - al);
  }
  const o = j * w + i; f[0][o] = r; f[1][o] = g; f[2][o] = b; f[3][o] = a;
}
// desenfoque gaussiano separable
const sg = SIGMA / S, rad = Math.ceil(sg * 4);
const ker = new Float64Array(2 * rad + 1); let ks = 0;
for (let k = -rad; k <= rad; k++) { ker[k + rad] = Math.exp(-(k * k) / (2 * sg * sg)); ks += ker[k + rad]; }
for (let k = 0; k < ker.length; k++) ker[k] /= ks;
function blur(src) {
  const tmp = new Float64Array(w * h), out = new Float64Array(w * h);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    let s = 0; const k0 = Math.max(-rad, -i), k1 = Math.min(rad, w - 1 - i);
    for (let k = k0; k <= k1; k++) s += src[j * w + i + k] * ker[k + rad];
    tmp[j * w + i] = s;
  }
  for (let j = 0; j < h; j++) { const k0 = Math.max(-rad, -j), k1 = Math.min(rad, h - 1 - j);
    for (let i = 0; i < w; i++) { let s = 0; for (let k = k0; k <= k1; k++) s += tmp[(j + k) * w + i] * ker[k + rad]; out[j * w + i] = s; } }
  return out;
}
f = f.map(blur);
// ampliación bilineal, máscara de borde y composición sobre el fondo
const smooth = (e0, e1, v) => { const t = Math.min(1, Math.max(0, (v - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
const out = Buffer.alloc(W * H * 3);
function samp(ch, X, Y) {
  let u = (X + 0.5) / S - 0.5, v = (Y + 0.5) / S - 0.5;
  u = Math.min(w - 1, Math.max(0, u)); v = Math.min(h - 1, Math.max(0, v));
  const i0 = Math.floor(u), j0 = Math.floor(v), i1 = Math.min(w - 1, i0 + 1), j1 = Math.min(h - 1, j0 + 1), a = u - i0, b = v - j0;
  return (ch[j0 * w + i0] * (1 - a) + ch[j0 * w + i1] * a) * (1 - b) + (ch[j1 * w + i0] * (1 - a) + ch[j1 * w + i1] * a) * b;
}
for (let Y = 0; Y < H; Y++) for (let X = 0; X < W; X++) {
  const d = Math.min(X + 0.5, Y + 0.5, W - X - 0.5, H - Y - 0.5);  // distancia al borde del lienzo
  const m = smooth(32, 170, d) * OPACITY;                           // se apaga antes del borde
  const o = (Y * W + X) * 3;
  if (m === 0) { out[o] = BG[0]; out[o + 1] = BG[1]; out[o + 2] = BG[2]; continue; }
  const a = samp(f[3], X, Y) * m;
  for (let c = 0; c < 3; c++) out[o + c] = Math.round(samp(f[c], X, Y) * m + BG[c] * (1 - a));
}
process.stdout.write(out);
