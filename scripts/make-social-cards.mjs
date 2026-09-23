// Generates the Open Graph / Twitter link-preview cards in public/images/synaptyx/.
//
// Composes each card as SVG and rasterizes it with sharp (librsvg). The SVG-to-JPEG
// mechanics follow the lsp-event-graphics helpers (txt, imageDataURI, renderJPEG),
// copied inline so the repo has no dependency on a user-level skill.
//
// Fonts: librsvg lays out text with Pango. On macOS Pango defaults to CoreText, which
// cannot see fonts that are not installed system-wide. This script therefore decodes the
// repo's own @fontsource/inter WOFF files to TTF in a temporary directory, writes a
// temporary fontconfig file that points only at that directory, and forces Pango's
// fontconfig backend before sharp is loaded. The cards always render in the site's Inter
// and never silently fall back to Helvetica.
//
// Run: npm run images:social

import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { inflateSync } from 'node:zlib';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');
const OUT = path.join(PUB, 'images/synaptyx');

const C = {
  ink: '#101010',
  blue: '#70c1f6',
  grey: '#7c91a0',
  white: '#ffffff',
  sub: '#d5dde3',
};
const FAMILY = 'Inter';
const FOOTER = 'OAKBROOK TERRACE, IL · FORMERLY TOTAL TISSUE & FITNESS';

// Copy is taken from existing site pages; photos are existing local assets.
const CARDS = [
  {
    id: 'default',
    lines: ['Move better.', 'Live fully.'],
    sub: 'Manual therapy, movement education, and contrast therapy.',
    photo: 'images/optimized/recovery-space.webp',
    out: 'social-card.jpg',
    square: 'social-card-square.jpg',
  },
  {
    id: 'manual-therapy',
    lines: ['Understand your body.', 'Move with purpose.'],
    sub: 'Hands-on tissue work and movement education.',
    photo: 'images/optimized/recovery-space.webp',
    out: 'social-manual-therapy.jpg',
  },
  {
    id: 'contrast-therapy',
    lines: ['Recover with intention.', 'Come back ready.'],
    sub: 'Cold plunge, hot plunge, and infrared sauna.',
    photo: 'images/optimized/plunge.webp',
    out: 'social-contrast-therapy.jpg',
  },
  {
    id: 'mentorship',
    lines: ['Learn the approach.', 'Build your practice.'],
    sub: 'Practitioner mentorship for therapists and fitness professionals.',
    // media.mentorshipPoster in src/data/site.ts
    photo:
      'images/65f1cd38d5c13f0914954f48-67c9e6e9d3b1a49af9199e97_video-output-9470F004-2040-489A-81D3-A0D5D1757FB9-poster-00001.jpg',
    out: 'social-mentorship.jpg',
  },
  {
    id: 'book',
    lines: ['Book with Josh', 'or Casey.'],
    sub: 'Live availability, gift cards, and first-visit details.',
    photo: 'images/optimized/sauna.webp',
    out: 'social-book.jpg',
  },
];

// ---------------------------------------------------------------------------
// Fonts: WOFF 1.0 -> TTF, then a private fontconfig
// ---------------------------------------------------------------------------

function woffToSfnt(woff) {
  if (woff.toString('ascii', 0, 4) !== 'wOFF') throw new Error('Not a WOFF 1.0 file');
  const flavor = woff.readUInt32BE(4);
  const numTables = woff.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < numTables; i += 1) {
    const e = 44 + i * 20;
    const offset = woff.readUInt32BE(e + 4);
    const compLength = woff.readUInt32BE(e + 8);
    const origLength = woff.readUInt32BE(e + 12);
    const raw = woff.subarray(offset, offset + compLength);
    tables.push({
      tag: woff.subarray(e, e + 4),
      checksum: woff.readUInt32BE(e + 16),
      data: compLength < origLength ? inflateSync(raw) : raw,
    });
  }
  const pow = 2 ** Math.floor(Math.log2(numTables));
  const header = Buffer.alloc(12 + numTables * 16);
  header.writeUInt32BE(flavor, 0);
  header.writeUInt16BE(numTables, 4);
  header.writeUInt16BE(pow * 16, 6);
  header.writeUInt16BE(Math.log2(pow), 8);
  header.writeUInt16BE(numTables * 16 - pow * 16, 10);
  const chunks = [header];
  let offset = header.length;
  tables.forEach((t, i) => {
    const r = 12 + i * 16;
    t.tag.copy(header, r);
    header.writeUInt32BE(t.checksum, r + 4);
    header.writeUInt32BE(offset, r + 8);
    header.writeUInt32BE(t.data.length, r + 12);
    const padded = Buffer.alloc((t.data.length + 3) & ~3);
    t.data.copy(padded);
    chunks.push(padded);
    offset += padded.length;
  });
  return Buffer.concat(chunks);
}

async function prepareFonts() {
  const dir = await mkdtemp(path.join(tmpdir(), 'synaptyx-social-fonts-'));
  const files = path.join(ROOT, 'node_modules/@fontsource/inter/files');
  for (const weight of [500, 600, 800]) {
    const woff = await readFile(path.join(files, `inter-latin-${weight}-normal.woff`));
    await writeFile(path.join(dir, `inter-${weight}.ttf`), woffToSfnt(woff));
  }
  const conf = path.join(dir, 'fonts.conf');
  await writeFile(
    conf,
    `<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig><dir>${dir}</dir><cachedir>${dir}/cache</cachedir></fontconfig>\n`,
  );
  process.env.FONTCONFIG_FILE = conf;
  process.env.PANGOCAIRO_BACKEND = 'fontconfig';
  return dir;
}

// ---------------------------------------------------------------------------
// SVG helpers (mechanics adapted from lsp-event-graphics)
// ---------------------------------------------------------------------------

const esc = (v) =>
  String(v)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function txt({ text, x, y, size, color, weight, tracking = 0 }) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="${FAMILY}" font-size="${size}" font-weight="${weight}" letter-spacing="${tracking}">${esc(text)}</text>`;
}

async function imageDataURI(sharp, file, { width, height }) {
  const buf = await sharp(file)
    .resize({ width, height, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

async function renderJPEG(sharp, markup, outPath, quality = 88) {
  await sharp(Buffer.from(markup)).jpeg({ quality, mozjpeg: true }).toFile(outPath);
}

// Rendered ink width of one line, measured by rasterizing it alone and trimming.
async function measure(sharp, line) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="${line.size * 2}">${txt({ ...line, x: 10, y: line.size * 1.4, color: '#000' })}</svg>`;
  const { info } = await sharp(Buffer.from(svg))
    .trim({ background: '#00000000' })
    .toBuffer({ resolveWithObject: true });
  return info.width;
}

// Split into at most two lines, choosing the break that keeps the longer line shortest.
function balance(text) {
  const words = text.split(/\s+/);
  let best = [text];
  let bestMax = text.length;
  for (let i = 1; i < words.length; i += 1) {
    const a = words.slice(0, i).join(' ');
    const b = words.slice(i).join(' ');
    const max = Math.max(a.length, b.length);
    if (max < bestMax) [best, bestMax] = [[a, b], max];
  }
  return text.length <= 30 ? [text] : best;
}

// ---------------------------------------------------------------------------
// Composition
// ---------------------------------------------------------------------------

const M = 72; // safe margin
const TEXT_RIGHT = 640; // keep sub and footer copy left of this
const HEAD_RIGHT = 760; // headlines may run into the faded photo edge

function lockup(markURI, markW, markH, x, y) {
  const tx = x + markW + 18;
  return (
    `<image href="${markURI}" x="${x}" y="${y}" width="${markW}" height="${markH}"/>` +
    txt({
      text: 'SYNAPTYX',
      x: tx,
      y: y + 31,
      size: 30,
      weight: 800,
      color: C.white,
      tracking: 4.2,
    }) +
    txt({
      text: 'MANUAL THERAPY',
      x: tx + 1,
      y: y + 50,
      size: 12,
      weight: 500,
      color: C.blue,
      tracking: 3.84,
    })
  );
}

async function fitHeadline(sharp, lines, maxWidth, start = 84) {
  for (let size = start; size >= 52; size -= 1) {
    const widths = [];
    for (const text of lines)
      widths.push(await measure(sharp, { text, size, weight: 800, tracking: -0.05 * size }));
    if (Math.max(...widths) <= maxWidth) return { size, widths };
  }
  throw new Error(`Headline does not fit: ${lines.join(' / ')}`);
}

async function fitSub(sharp, lines, maxWidth, start = 24) {
  for (let size = start; size >= 18; size -= 1) {
    const widths = [];
    for (const text of lines) widths.push(await measure(sharp, { text, size, weight: 500 }));
    if (Math.max(...widths) <= maxWidth) return size;
  }
  throw new Error(`Sub line does not fit: ${lines.join(' / ')}`);
}

async function landscape(sharp, card, assets) {
  const W = 1200;
  const H = 630;
  const photoX = 504;
  const photo = await imageDataURI(sharp, path.join(PUB, card.photo), {
    width: W - photoX,
    height: H,
  });
  const head = await fitHeadline(sharp, card.lines, HEAD_RIGHT - M);
  const subLines = balance(card.sub);
  const subSize = await fitSub(sharp, subLines, TEXT_RIGHT - M);
  // Vertically centre headline + sub between the lockup (ends y=128) and the footer.
  const lh = Math.round(head.size * 0.98);
  const subGap = Math.round(head.size * 0.35 + 28);
  const blockH =
    head.size * 0.73 + lh + subGap + (subLines.length - 1) * subSize * 1.35 + subSize * 0.22;
  const y1 = Math.round(338 - blockH / 2 + head.size * 0.73);
  const y2 = y1 + lh;
  const subY = y2 + subGap;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="fade" x1="${photoX}" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.ink}" stop-opacity="1"/>
      <stop offset="0.03" stop-color="${C.ink}" stop-opacity="1"/>
      <stop offset="0.25" stop-color="${C.ink}" stop-opacity="0.72"/>
      <stop offset="0.5" stop-color="${C.ink}" stop-opacity="0.28"/>
      <stop offset="0.75" stop-color="${C.ink}" stop-opacity="0.06"/>
      <stop offset="1" stop-color="${C.ink}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="300" cy="330" r="430" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.blue}" stop-opacity="0.14"/>
      <stop offset="0.55" stop-color="${C.blue}" stop-opacity="0.05"/>
      <stop offset="1" stop-color="${C.blue}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.ink}"/>
  <image href="${photo}" x="${photoX}" y="0" width="${W - photoX}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="${photoX}" y="0" width="${W - photoX}" height="${H}" fill="${C.ink}" opacity="0.6"/>
  <rect x="${photoX - 1}" y="0" width="${W - photoX + 1}" height="${H}" fill="url(#fade)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="6" fill="${C.blue}"/>
  ${lockup(assets.mark, assets.markW, 56, M, M)}
  ${txt({ text: card.lines[0], x: M - 3, y: y1, size: head.size, weight: 800, color: C.white, tracking: -0.05 * head.size })}
  ${txt({ text: card.lines[1], x: M - 3, y: y2, size: head.size, weight: 800, color: C.blue, tracking: -0.05 * head.size })}
  ${subLines
    .map((t, i) =>
      txt({
        text: t,
        x: M,
        y: subY + i * subSize * 1.35,
        size: subSize,
        weight: 500,
        color: C.sub,
      }),
    )
    .join('')}
  ${txt({ text: FOOTER, x: M, y: H - M, size: 12, weight: 600, color: C.grey, tracking: 2.04 })}
</svg>`;
  await renderJPEG(sharp, svg, path.join(OUT, card.out));
  return { headSize: head.size, headWidths: head.widths, subSize };
}

async function square(sharp, card, assets) {
  const S = 1080;
  const photoY = 470;
  const photo = await imageDataURI(sharp, path.join(PUB, card.photo), {
    width: S,
    height: S - photoY,
  });
  const maxW = S - 2 * M;
  const head = await fitHeadline(sharp, card.lines, maxW, 100);
  const subLines = balance(card.sub);
  const subSize = await fitSub(sharp, subLines, maxW, 28);
  const lh = Math.round(head.size * 0.98);
  const y1 = 322;
  const y2 = y1 + lh;
  const subY = y2 + 64;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <linearGradient id="fade" x1="0" y1="${photoY}" x2="0" y2="${S}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.ink}" stop-opacity="1"/>
      <stop offset="0.12" stop-color="${C.ink}" stop-opacity="1"/>
      <stop offset="0.4" stop-color="${C.ink}" stop-opacity="0.45"/>
      <stop offset="0.7" stop-color="${C.ink}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${C.ink}" stop-opacity="0.75"/>
    </linearGradient>
    <radialGradient id="glow" cx="330" cy="360" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.blue}" stop-opacity="0.14"/>
      <stop offset="0.55" stop-color="${C.blue}" stop-opacity="0.05"/>
      <stop offset="1" stop-color="${C.blue}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${S}" height="${S}" fill="${C.ink}"/>
  <image href="${photo}" x="0" y="${photoY}" width="${S}" height="${S - photoY}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="0" y="${photoY}" width="${S}" height="${S - photoY}" fill="${C.ink}" opacity="0.6"/>
  <rect x="0" y="${photoY - 1}" width="${S}" height="${S - photoY + 1}" fill="url(#fade)"/>
  <rect width="${S}" height="${S}" fill="url(#glow)"/>
  <rect width="${S}" height="6" fill="${C.blue}"/>
  ${lockup(assets.mark, assets.markW, 56, M, M)}
  ${txt({ text: card.lines[0], x: M - 3, y: y1, size: head.size, weight: 800, color: C.white, tracking: -0.05 * head.size })}
  ${txt({ text: card.lines[1], x: M - 3, y: y2, size: head.size, weight: 800, color: C.blue, tracking: -0.05 * head.size })}
  ${subLines
    .map((t, i) =>
      txt({
        text: t,
        x: M,
        y: subY + i * subSize * 1.35,
        size: subSize,
        weight: 500,
        color: C.sub,
      }),
    )
    .join('')}
  ${txt({ text: FOOTER, x: M, y: S - M, size: 12, weight: 600, color: C.grey, tracking: 2.04 })}
</svg>`;
  await renderJPEG(sharp, svg, path.join(OUT, card.square));
}

const fontDir = await prepareFonts();
try {
  // sharp is imported only after the fontconfig environment is in place.
  const { default: sharp } = await import('sharp');
  const markFile = path.join(PUB, 'images/synaptyx/synaptyx-mark.png');
  const meta = await sharp(markFile).metadata();
  const markW = Math.round((56 * meta.width) / meta.height);
  const markBuf = await sharp(markFile).resize({ height: 112 }).png().toBuffer();
  const assets = { mark: `data:image/png;base64,${markBuf.toString('base64')}`, markW };
  for (const card of CARDS) {
    const r = await landscape(sharp, card, assets);
    const note = r.headSize < 84 ? ` (headline reduced to ${r.headSize}px)` : '';
    console.log(
      `${card.out}: headline ${r.headSize}px, widest line ${Math.max(...r.headWidths)}px, sub ${r.subSize}px${note}`,
    );
    if (card.square) {
      await square(sharp, card, assets);
      console.log(`${card.square}: 1080x1080`);
    }
  }
} finally {
  await rm(fontDir, { recursive: true, force: true });
}
