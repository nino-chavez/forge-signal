/**
 * Test script: Generate PPTX decks directly from markdown using the engine.
 * Bypasses AI pipeline — feeds markdown straight to the theme engine.
 *
 * Usage: npx tsx scripts/test-pptx-themes.ts
 */

import { readFileSync } from 'fs';
import { renderDeckToPptx } from '../src/output/exporters/pptx-engine.js';

const inputPath = 'projects/mustang/briefs/replatform-reality-brief.md';
const content = readFileSync(inputPath, 'utf-8');

const themes = ['signal-forge', 'bigcommerce', 'dark'] as const;

async function main() {
  for (const themeId of themes) {
    const outputPath = `projects/mustang/output/replatform-reality-${themeId}.pptx`;
    console.log(`Generating ${themeId} → ${outputPath}`);
    await renderDeckToPptx({
      content,
      title: 'The Replatform Reality',
      outputPath,
      themeId,
      author: 'Signal Forge',
    });
    console.log(`  ✓ Done`);
  }
  console.log('\nAll decks generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
