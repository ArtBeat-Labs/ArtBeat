#!/usr/bin/env node
/**
 * Switches the canonical base URL across the whole site.
 *
 *   node scripts/set-domain.mjs github   -> https://artbeat-labs.github.io/ArtBeat/
 *   node scripts/set-domain.mjs euorg    -> https://artbeat.eu.org/
 *   node scripts/set-domain.mjs check    -> report only, exit 1 if inconsistent
 *
 * Idempotent: run it as many times as you like, in either direction.
 * Touches only absolute URLs in metadata and structured data. Relative links
 * (assets, the three class pages) are untouched and keep working either way.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const TARGETS = {
  github: 'https://artbeat-labs.github.io/ArtBeat/',
  euorg: 'https://artbeat.eu.org/',
};

// Matches either live form, with or without a trailing slash, plus a www variant.
const PATTERN = /https:\/\/(?:artbeat-labs\.github\.io\/ArtBeat|www\.artbeat\.eu\.org|artbeat\.eu\.org)\/?/g;

const files = readdirSync('.')
  .filter((f) => f.endsWith('.html') || f === 'sitemap.xml' || f === 'robots.txt' || f === 'llms.txt');

const mode = process.argv[2];

function tally(text) {
  const found = text.match(PATTERN) || [];
  const counts = {};
  for (const m of found) {
    const key = m.startsWith('https://artbeat-labs') ? 'github' : 'euorg';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

if (mode === 'check') {
  let total = { github: 0, euorg: 0 };
  let bad = false;
  for (const f of files) {
    const c = tally(readFileSync(f, 'utf8'));
    total.github += c.github || 0;
    total.euorg += c.euorg || 0;
    const mixed = (c.github || 0) > 0 && (c.euorg || 0) > 0;
    if (mixed) bad = true;
    const line = `  ${f.padEnd(20)} github=${c.github || 0} euorg=${c.euorg || 0}`;
    console.log(mixed ? line + '   <- MIXED' : line);
  }
  console.log(`\n  TOTAL              github=${total.github} euorg=${total.euorg}`);
  if (bad) { console.log('\n  FAIL: files mix both base URLs.'); process.exit(1); }
  if (total.github && total.euorg) { console.log('\n  FAIL: site mixes both base URLs.'); process.exit(1); }
  if (!total.github && !total.euorg) { console.log('\n  WARN: no absolute base URLs found.'); process.exit(0); }
  console.log(`\n  OK: consistently on ${total.github ? 'github.io' : 'artbeat.eu.org'}.`);
  process.exit(0);
}

if (!TARGETS[mode]) {
  console.error(`Usage: node scripts/set-domain.mjs <${Object.keys(TARGETS).join('|')}|check>`);
  process.exit(1);
}

const to = TARGETS[mode];
let changed = 0;
for (const f of files) {
  const before = readFileSync(f, 'utf8');
  const after = before.replace(PATTERN, to);
  if (after !== before) {
    writeFileSync(f, after);
    changed++;
    console.log(`  updated  ${f}`);
  }
}
console.log(`\n  ${changed} file(s) changed. Base URL is now: ${to}`);
console.log('  Next: run `npm run build` (regenerates assets/site.css), then commit.');