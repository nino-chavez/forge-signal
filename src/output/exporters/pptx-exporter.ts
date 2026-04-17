/**
 * PPTX Exporter
 *
 * Public API for PowerPoint export. Delegates to the theme-aware PPTX
 * engine for rendering. Preserves the original `exportToPPTX()` signature
 * for backward compatibility while adding optional `theme` support.
 */

import { renderDeckToPptx } from './pptx-engine.js';
import { loadConfig } from '../../core/config.js';

export interface PPTXExportOptions {
  title: string;
  content: string;
  outputPath: string;
  author?: string;
<<<<<<< HEAD
  /** Theme ID (e.g. 'signal-forge', 'bigcommerce', 'dark'). Defaults to 'signal-forge'. */
=======
  /** Theme ID (e.g. 'signal-forge', 'dark'). Defaults to 'signal-forge'. */
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  theme?: string;
}

/**
 * Export content to PowerPoint (.pptx)
 *
 * Delegates to the PPTX engine which handles theme resolution,
 * content parsing (V2 parser with layout auto-detection), and
 * layout dispatch.
 */
export async function exportToPPTX(options: PPTXExportOptions): Promise<void> {
  const config = loadConfig();
  const { title, content, outputPath, author = config.author, theme } = options;

  await renderDeckToPptx({
    content,
    title,
    outputPath,
    themeId: theme,
    author,
  });
}
