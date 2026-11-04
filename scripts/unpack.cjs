const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const archive = fs.readFileSync(path.join(root, '.ecotrace-source.br.b64'), 'utf8').trim();
const json = zlib.brotliDecompressSync(Buffer.from(archive, 'base64')).toString('utf8');
const files = JSON.parse(json);
for (const [relativePath, content] of Object.entries(files)) {
  if (path.isAbsolute(relativePath) || relativePath.split('/').includes('..')) throw new Error('Invalid path');
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content, 'utf8');
}
console.log('EcoTrace unpacked:', Object.keys(files).length, 'files');
