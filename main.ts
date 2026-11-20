// One Night in Vice City — clip 2 entrypoint.
//
// The clip is the entry: a vertical cut of Grand Theft Auto VI Trailer 2,
// published as a public YouTube Short. All this program does is prove that
// VIDEO.json names a genuine YouTube video address, then hand that file to
// the grader by copying it into the output directory. The house reads the
// video itself through the YouTube Data API; nothing written here is scored.
import * as fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SIZE_CAP_BYTES = 16384;
const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const ADDRESS_PATTERN =
  /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]+)(?:[?#&].*)?$/;

function reject(why: string): never {
  throw new Error(`VIDEO.json rejected: ${why}`);
}

// Returns the video id, or a reason the address fails. A query or fragment
// after the id (for example ?feature=share) is read past, and an id of the
// wrong length is reported with the id itself, so a bad address is easy to fix.
function idOf(address: string): { id: string } | { problem: string } {
  const hit = ADDRESS_PATTERN.exec(address);
  if (hit === null) return { problem: 'not a youtube.com or youtu.be video address' };
  if (!ID_PATTERN.test(hit[1])) {
    return { problem: `video id ${JSON.stringify(hit[1])} is ${hit[1].length} characters, not 11` };
  }
  return { id: hit[1] };
}

function main(): void {
  const folder = dirname(fileURLToPath(import.meta.url));
  const videoFile = join(folder, 'VIDEO.json');

  if (!fs.existsSync(videoFile)) reject('no VIDEO.json beside main.ts');
  const bytes = fs.statSync(videoFile).size;
  if (bytes > SIZE_CAP_BYTES) reject(`VIDEO.json is ${bytes} bytes, over the 16384-byte cap`);

  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(videoFile, 'utf8'));
  } catch {
    reject('VIDEO.json does not parse as JSON');
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    reject('VIDEO.json must be an object like {"url": "https://..."}');
  }
  const address = (parsed as { url?: unknown }).url;
  if (typeof address !== 'string') reject('VIDEO.json must carry a string "url"');
  if (!address.startsWith('https://')) reject('the url must start with https://');
  const found = idOf(address);
  if ('problem' in found) {
    reject(
      `the url must be a YouTube video address — youtube.com/shorts/<id>, youtube.com/watch?v=<id> or youtu.be/<id> — with an 11-character id (${found.problem})`,
    );
  }
  const id = found.id;

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(videoFile, join(outDir, 'VIDEO.json'));
  console.log(`handed in video ${id} -> ${join(outDir, 'VIDEO.json')}`);
}

main();
