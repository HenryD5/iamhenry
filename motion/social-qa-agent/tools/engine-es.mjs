// Envoltorio del motor de audio de media-use: fuerza español (--lang es) en TTS y transcripción.
// El adaptador de faceless-explainer no reenvía el idioma; se usa con HF_MEDIA_ENGINE=tools/engine-es.mjs.
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";

const engine = join(homedir(), ".claude/skills/media-use/audio/scripts/audio.mjs");
const result = spawnSync("node", [engine, ...process.argv.slice(2), "--lang", "es"], { stdio: "inherit" });
process.exit(result.status ?? 1);
