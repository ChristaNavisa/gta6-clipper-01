// gta6-clipper-01 entrypoint (Node 22, no dependencies).
// Copies VIDEO.json — the address of the uploaded YouTube Short — from this
// repository into the grader's output directory. The house reads the video
// itself through the YouTube Data API; nothing else is written.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
mkdirSync(outDir, { recursive: true });
const repoDir = dirname(fileURLToPath(import.meta.url));
const videoPath = join(repoDir, 'VIDEO.json');
// Fail loudly on a broken VIDEO.json instead of copying it through.
const video = JSON.parse(readFileSync(videoPath, 'utf8'));
if (typeof video.url !== 'string' || !/^https:\/\//.test(video.url)) {
  throw new Error('VIDEO.json must hold {"url": "https://..."}');
}
copyFileSync(videoPath, join(outDir, 'VIDEO.json'));
console.log('wrote VIDEO.json to', outDir, '->', video.url);
