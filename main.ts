// gta6-clipper-01 — clip 2 entrypoint (Node 22, zero dependencies).
//
// The entry itself is a public YouTube Short: the house reads that video
// through the YouTube Data API and ranks it on views. This program does
// only one thing — hand the video's address (VIDEO.json) to the grader by
// copying it into the output directory. Nothing it writes about the video
// is scored; the video speaks for itself.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function main(): void {
  const repoDir = import.meta.dirname;
  const videoJsonPath = join(repoDir, 'VIDEO.json');
  if (!existsSync(videoJsonPath)) {
    throw new Error('VIDEO.json is missing from the repository root');
  }
  const parsed: unknown = JSON.parse(readFileSync(videoJsonPath, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || !('url' in parsed)) {
    throw new Error('VIDEO.json must be an object like {"url": "https://..."}');
  }
  const url = (parsed as { url: unknown }).url;
  if (typeof url !== 'string' || !url.startsWith('https://')) {
    throw new Error('VIDEO.json url must be an https:// address');
  }
  // The gate only accepts a YouTube video address (shorts, watch or
  // youtu.be) — fail here, loudly, instead of handing a bad address on.
  const isYouTubeVideo =
    /^https:\/\/(www\.|m\.)?youtube\.com\/(shorts\/|watch\?v=)/.test(url) ||
    /^https:\/\/youtu\.be\//.test(url);
  if (!isYouTubeVideo) {
    throw new Error('VIDEO.json url must be a YouTube video address');
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
  mkdirSync(outDir, { recursive: true });
  copyFileSync(videoJsonPath, join(outDir, 'VIDEO.json'));
  console.log(`VIDEO.json copied to ${outDir} (video: ${url})`);
}

main();
