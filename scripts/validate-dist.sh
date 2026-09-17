#!/bin/sh
# Validates the built site in dist/: every internal href/src referenced in the
# generated HTML must resolve to a real file. Exits non-zero on any failure.
set -e

cd "$(dirname "$0")/.."

if [ ! -d dist ]; then
  echo "dist/ not found — run the build first" >&2
  exit 1
fi

node - <<'EOF'
const fs = require('node:fs');
const path = require('node:path');

const DIST = 'dist';
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(DIST);

const exists = (rel) => {
  const target = path.join(DIST, rel);
  if (!fs.existsSync(target)) return false;
  // A reference like /foo (no extension) may be a directory route: /foo/index.html
  if (fs.statSync(target).isDirectory()) {
    return fs.existsSync(path.join(target, 'index.html'));
  }
  return true;
};

let broken = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref.startsWith('/') || ref.startsWith('//')) continue; // check same-origin absolute refs only
    const clean = decodeURIComponent(ref.split('?')[0]);
    if (clean === '/') continue;
    if (!exists(clean.replace(/\/$/, '')) && !exists(clean)) {
      console.error(`BROKEN in ${file}: ${ref}`);
      broken++;
    }
  }
}

if (broken > 0) {
  console.error(`\n${broken} broken reference(s) found`);
  process.exit(1);
}
console.log(`OK: all internal references in ${htmlFiles.length} HTML file(s) resolve`);
EOF
