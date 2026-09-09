import { readFile } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const requiredFiles = [
  'README.md',
  'studio.html',
  'studio.js',
  'package-lock.json',
  'THIRD-PARTY-NOTICES.md',
  'CHANGELOG.md',
  'LICENSE',
  'CONTENT-LICENSE.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'index.html',
  'styles.css',
  'app.js',
  'recognition.js',
  'scripts/recognition.test.mjs',
  'scripts/validate.mjs',
  '.gitignore',
  'docs/open-source-patterns.md',
  'package.json',
  'data/schema.json',
  'data/events.synthetic.json',
  'templates/event-marketing-brief.md',
  'templates/sponsor-proposal.md'
];

const suspiciousPath = /(^|\/)(\.env(\.|$)|.*(secret|credential|password|token).*)(\/|$)|\.(pem|key|p12|pfx|sqlite|sqlite3|db)$/i;
const suspiciousContent = /AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|sk_(?:live|test)_[0-9A-Za-z]+|gh[pousr]_[0-9A-Za-z]{20,}|-----BEGIN (?:RSA|EC|OPENSSH|PRIVATE) KEY-----/;

const failures = [];
for (const file of requiredFiles) {
  try {
    await access(new URL(file, root));
  } catch {
    failures.push(`missing required file: ${file}`);
  }
}

const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
if (packageJson.private !== false) failures.push('package.json must declare private: false');
if (packageJson.scripts?.test !== 'node scripts/validate.mjs') failures.push('package.json test script is not the release gate');

const schema = JSON.parse(await readFile(new URL('data/schema.json', root), 'utf8'));
const collection = JSON.parse(await readFile(new URL('data/events.synthetic.json', root), 'utf8'));
if (schema.title !== 'Synthetic Community Event') failures.push('schema title is not privacy-labelled');
if (collection.recordType !== 'synthetic collection') failures.push('event collection is not privacy-labelled');
if (!collection.notice.includes('fictional examples')) failures.push('event collection notice is missing');
if (!Array.isArray(collection.events) || collection.events.length < 2) failures.push('expected at least two synthetic event records');

for (const event of collection.events ?? []) {
  if (!event.id.startsWith('evt_synthetic_')) failures.push(`event id is not synthetic: ${event.id}`);
  if (event.organizer?.recordType !== 'synthetic') failures.push(`organizer is not marked synthetic: ${event.id}`);
  if (event.provenance?.recordType !== 'synthetic') failures.push(`provenance is not marked synthetic: ${event.id}`);
}

async function walk(directory = '') {
  for (const entry of await readdir(new URL(directory || '.', root), {withFileTypes: true})) {
    if (entry.name === '.git' || (!directory && ['node_modules', 'dist'].includes(entry.name))) continue;
    const path = directory + entry.name;
    if (entry.isDirectory()) await walk(path + '/');
    else if (!requiredFiles.includes(path)) failures.push(`file outside public allowlist: ${path}`);
  }
}
await walk();
for (const file of requiredFiles) {
  if (suspiciousPath.test(file)) failures.push(`suspicious tracked path: ${file}`);
  const contents = await readFile(new URL(file, root), 'utf8');
  if (suspiciousContent.test(contents)) failures.push(`common credential pattern found in: ${file}`);
}

if (failures.length) {
  console.error('FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${requiredFiles.length} required files, ${collection.events.length} synthetic records, and common-key scan clear`);
}
