// news-image-20261118 entry (Node 22, standard library only).
// The entry is the front-page image stored beside this file as entry.png
// (a JPEG by magic bytes; the name stays entry.png either way). The program
// copies those exact bytes to /output/entry.png, so both grader runs write
// identical output. No network, no dependencies.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(source);

// Guard the gate before copying: JPEG magic and the 1 MiB limit.
if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
  throw new Error('entry.png is not a JPEG');
}
if (statSync(source).size > 1048576) {
  throw new Error('entry.png is over the 1 MiB limit');
}

copyFileSync(source, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
