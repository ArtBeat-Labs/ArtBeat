#!/usr/bin/env node
/**
 * Turns the custom domain on or off by creating/removing the CNAME file.
 *
 *   node scripts/cname.mjs on    -> writes CNAME with artbeat.eu.org
 *   node scripts/cname.mjs off   -> removes CNAME (site falls back to github.io)
 *   node scripts/cname.mjs status -> report current state
 *
 * Only run `on` once eu.org has approved the domain AND the DNS resolves:
 *     dig +short artbeat.eu.org
 * must return GitHub's Pages IPs (185.199.108-111.153). While CNAME exists,
 * GitHub Pages serves ONLY at the custom domain.
 */
import { existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs';

const FILE = 'CNAME';
const DOMAIN = 'artbeat.eu.org';
const mode = process.argv[2] || 'status';

if (mode === 'on') {
  writeFileSync(FILE, DOMAIN + '\n');
  console.log(`  ${FILE} written -> ${DOMAIN}`);
  console.log('  GitHub Pages will now serve ONLY at https://artbeat.eu.org/');
  console.log('  Provisioning + TLS can take up to ~1 hour. Watch the Pages build.');
} else if (mode === 'off') {
  if (existsSync(FILE)) { rmSync(FILE); console.log(`  ${FILE} removed. Site falls back to the github.io URL.`); }
  else console.log('  no CNAME file present, nothing to do.');
} else {
  console.log(existsSync(FILE)
    ? `  ON   -> ${FILE} contains: ${readFileSync(FILE, 'utf8').trim()}`
    : '  OFF  -> no CNAME file, serving from the github.io URL');
}