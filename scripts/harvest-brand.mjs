#!/usr/bin/env node
/**
 * harvest-brand.mjs — extract a client's real brand tokens from their live site.
 *
 * Grounds client-facing deliverable design in the client's verifiable brand
 * instead of a free-picked palette (which drifts into AI-default clusters).
 * Reads computed styles via browse-tool (must be on PATH; see
 * ~/Workspace/dev/tools/browse-tool).
 *
 * Usage:
 *   node scripts/harvest-brand.mjs <url> [--json out.json] [--theme-id client-slug]
 *
 * Output: harvest JSON on stdout (or --json file) with raw computed styles,
 * a color tally, and a derived token set. With --theme-id, also prints a
 * PresentationTheme stub for src/content/design-system/themes/.
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
if (!url) {
  console.error('Usage: node scripts/harvest-brand.mjs <url> [--json out.json] [--theme-id slug]');
  process.exit(1);
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const jsonOut = flag('--json');
const themeId = flag('--theme-id');

const sh = (cmd, cmdArgs) => {
  try {
    return execFileSync(cmd, cmdArgs, { encoding: 'utf8', timeout: 60_000 });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`${cmd} not found on PATH — install browse-tool and add its bin/ to PATH.`);
      process.exit(1);
    }
    throw err;
  }
};

// Reuse a running browse-tool Chrome if one answers; otherwise start headless.
try {
  execFileSync('browse-eval', ['return 1'], { encoding: 'utf8', timeout: 10_000 });
} catch {
  sh('browse-start', ['--headless']);
}
sh('browse-nav', [url, '--wait']);

const HARVEST = `
const pick = (el) => {
  if (!el) return null;
  const s = getComputedStyle(el);
  return { bg: s.backgroundColor, color: s.color, font: s.fontFamily.split(',')[0].replace(/['"]/g, '').trim() };
};
const tally = {};
[...document.querySelectorAll('*')].slice(0, 2000).forEach((el) => {
  const s = getComputedStyle(el);
  [s.backgroundColor, s.color].forEach((c) => {
    if (c && c !== 'rgba(0, 0, 0, 0)') tally[c] = (tally[c] || 0) + 1;
  });
});
return {
  title: document.title,
  body: pick(document.body),
  h1: pick(document.querySelector('h1')),
  h2: pick(document.querySelector('h2')),
  header: pick(document.querySelector('header, [class*=header]')),
  button: pick(document.querySelector('a.elementor-button, .wp-block-button a, a[class*=button], button')),
  colors: Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 20),
};
`;
const raw = JSON.parse(sh('browse-eval', [HARVEST]));

// ---- derive tokens ----------------------------------------------------------
const parseRgb = (str) => {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(str);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
};
const saturation = ({ r, g, b }) => {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  return max === 0 ? 0 : (max - min) / max;
};
const hex = ({ r, g, b }) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

const entries = raw.colors
  .map(([css, count]) => ({ css, count, rgb: parseRgb(css) }))
  .filter((e) => e.rgb && e.rgb.a >= 0.9);
// accent = most frequent saturated, non-neutral color
const accent = entries.find((e) => saturation(e.rgb) > 0.25);
const darkest = [...entries].sort((a, b) => a.rgb.r + a.rgb.g + a.rgb.b - (b.rgb.r + b.rgb.g + b.rgb.b))[0];

const tokens = {
  source: url,
  harvestedAt: new Date().toISOString(),
  ground: raw.body?.bg ?? null,
  ink: raw.body?.color ?? null,
  accent: accent ? hex(accent.rgb) : null,
  dark: darkest ? hex(darkest.rgb) : null,
  fonts: {
    heading: raw.h1?.font ?? raw.h2?.font ?? null,
    body: raw.body?.font ?? null,
  },
};

const result = { tokens, raw };
const out = JSON.stringify(result, null, 2);
if (jsonOut) {
  writeFileSync(jsonOut, out);
  console.error(`wrote ${jsonOut}`);
} else {
  console.log(out);
}

if (themeId) {
  const strip = (h) => (h ?? 'CHANGEME').replace('#', '');
  console.error(`
// Paste into src/content/design-system/themes/${themeId}.ts and fill gaps by eye.
// Derived from ${url} — verify against the client's actual pages before shipping.
colors: {
  primary: '${strip(tokens.accent)}',
  dark: '${strip(tokens.dark)}',
  // ground/ink for reference: ${tokens.ground} on ${tokens.ink}
},
typography: { heading: '${tokens.fonts.heading}', body: '${tokens.fonts.body}' },
`);
}
