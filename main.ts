// gta6-clipper-01 entrypoint (Node 22, no dependencies).
// Copies VIDEO.json — the address of the uploaded YouTube Short — from this
// repository into the grader's output directory. The house reads the video
// itself through the YouTube Data API; nothing else is written.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
mkdirSync(outDir, { recursive: true });
const repoDir = dirname(fileURLToPath(import.meta.url));
copyFileSync(join(repoDir, 'VIDEO.json'), join(outDir, 'VIDEO.json'));
console.log('wrote VIDEO.json to', outDir);
