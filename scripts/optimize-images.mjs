import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const dir = 'public/images';
await mkdir(`${dir}/optimized`, { recursive: true });
for (const [source, dest, width] of [
  ['6625ad2dacfc4c76e4383baa_EGC_6179.jpg', 'recovery-space.webp', 1600],
  ['6625ad2dd9d453253f3d8c59_EGC_6234.jpg', 'plunge.webp', 1200],
  ['6625ad2dfea2d18504f6a9df_EGC_6167.jpg', 'sauna.webp', 1200],
]) {
  await sharp(`${dir}/${source}`)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${dir}/optimized/${dest}`);
}
await sharp(`${dir}/66269d3731c576e8399b078a_Total-Tissue---fitness--LOGO.png`)
  .resize({ width: 420, withoutEnlargement: true })
  .webp({ lossless: true })
  .toFile(`${dir}/optimized/total-tissue-logo.webp`);
console.log('Optimized 3 facility photographs and the original logo. Originals preserved.');
