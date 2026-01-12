#!/usr/bin/env node
/**
 * Convert Excalidraw files to SVG using Puppeteer + @excalidraw/utils
 * Since @excalidraw/utils requires browser APIs, we run it in a headless browser.
 */

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIAGRAMS_DIR = join(__dirname, '../projects/ai-native-org/diagrams');

async function main() {
  const files = readdirSync(DIAGRAMS_DIR)
    .filter(f => f.endsWith('.excalidraw'))
    .map(f => join(DIAGRAMS_DIR, f));

  console.log(`Found ${files.length} Excalidraw files\n`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Load a minimal HTML page with the Excalidraw utils
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://unpkg.com/@excalidraw/utils@0.1.2/dist/excalidraw-utils.min.js"></script>
    </head>
    <body></body>
    </html>
  `);

  // Wait for the script to load
  await page.waitForFunction(() => typeof window.ExcalidrawUtils !== 'undefined', { timeout: 10000 });

  for (const file of files) {
    const content = JSON.parse(readFileSync(file, 'utf-8'));
    const outputPath = file.replace('.excalidraw', '.svg');

    console.log(`Converting: ${basename(file)}`);

    const svgString = await page.evaluate(async (data) => {
      const { elements, appState, files } = data;
      const svg = await window.ExcalidrawUtils.exportToSvg({
        elements,
        appState: {
          ...appState,
          exportWithDarkMode: false,
          exportBackground: true,
        },
        files: files || {},
      });
      return svg.outerHTML;
    }, content);

    writeFileSync(outputPath, svgString);
    console.log(`  -> ${basename(outputPath)}`);
  }

  await browser.close();
  console.log('\nDone!');
}

main().catch(console.error);
