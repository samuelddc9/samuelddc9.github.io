import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('./', import.meta.url);
const pagePath = new URL('index.html', root);
let html = readFileSync(pagePath, 'utf8');
for (const filename of ['teamtap.css', 'teamtap.js', 'motion.css', 'motion.js']) {
  const hash = createHash('sha256').update(readFileSync(new URL(filename, root))).digest('hex').slice(0, 12);
  const pattern = new RegExp(`(["'])${filename.replace('.', '\\.')}([?]v=[a-f0-9]+)?\\1`, 'g');
  if (!pattern.test(html)) throw new Error(`Missing asset reference: ${filename}`);
  pattern.lastIndex = 0;
  html = html.replace(pattern, (_, quote) => `${quote}${filename}?v=${hash}${quote}`);
}
writeFileSync(pagePath, html);
console.log(`Updated asset versions in ${fileURLToPath(pagePath)}`);
