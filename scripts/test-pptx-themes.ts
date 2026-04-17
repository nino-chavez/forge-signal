/**
 * Test script: Generate PPTX decks directly from markdown using the engine.
 * Bypasses AI pipeline — feeds markdown straight to the theme engine.
 *
<<<<<<< HEAD
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
=======
 * Usage: npx tsx scripts/test-pptx-themes.ts <input.md>
 */

import { readFileSync, mkdirSync } from 'fs';
import { renderDeckToPptx } from '../src/output/exporters/pptx-engine.js';
import { listThemes } from '../src/content/design-system/theme-registry.js';
import { registerBuiltInPresets } from '../src/presets/index.js';

registerBuiltInPresets();

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: npx tsx scripts/test-pptx-themes.ts <input.md>');
  process.exit(1);
}

const content = readFileSync(inputPath, 'utf-8');
const outputDir = 'output/theme-tests';
mkdirSync(outputDir, { recursive: true });

const themes = listThemes();

async function main() {
  for (const theme of themes) {
    const outputPath = `${outputDir}/test-${theme.id}.pptx`;
    console.log(`Generating ${theme.id} → ${outputPath}`);
    await renderDeckToPptx({
      content,
      title: 'Theme Test',
      outputPath,
      themeId: theme.id,
      author: 'Signal Forge',
    });
    console.log(`  Done`);
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  }
  console.log('\nAll decks generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
