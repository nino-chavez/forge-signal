/**
 * Debug: Show what layouts the parser assigns to each slide.
 */

import { readFileSync } from 'fs';
import { parseDeckFromMarkdownV2 } from '../src/content/templates/slide-model.js';

const content = readFileSync('projects/mustang/briefs/replatform-reality-brief.md', 'utf-8');
const deck = parseDeckFromMarkdownV2(content);

console.log(`Deck: "${deck.title}" — ${deck.slides.length} slides\n`);
deck.slides.forEach((s, i) => {
  const bullets = s.bullets?.length ?? 0;
  const hasTable = s.table ? ` | table: ${s.table.headers.length}cols × ${s.table.rows.length}rows` : '';
  console.log(`  ${String(i + 1).padStart(2)}. [${s.layout.padEnd(18)}] ${s.title.slice(0, 60)}${bullets > 0 ? ` (${bullets} bullets)` : ''}${hasTable}`);
});
