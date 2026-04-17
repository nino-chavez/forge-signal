/**
 * Layout Registry
 *
 * Maps SlideLayout type strings to their render functions.
 * The PPTX engine uses this to dispatch each slide to the
 * correct layout function.
 */

import type { SlideLayout } from '../../content/templates/slide-model.js';
import type { LayoutFunction } from './layout-types.js';
import { renderTitleSlide } from './title.js';
import { renderSectionDividerSlide } from './section-divider.js';
import { renderContentSlide } from './content.js';
import { renderTwoColumnTextSlide } from './two-column-text.js';
import { renderMultiColumnImageSlide } from './multi-column-image.js';
import { renderTableSlide } from './table.js';
import { renderImageTextSlide } from './image-text.js';
import { renderFullImageSlide } from './full-image.js';
<<<<<<< HEAD
import { renderFullImageCleanSlide } from './full-image-clean.js';
=======
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
import { renderQuoteSlide } from './quote.js';
import { renderConclusionSlide } from './conclusion.js';

const layoutRegistry = new Map<SlideLayout, LayoutFunction>([
  ['title', renderTitleSlide],
  ['section-divider', renderSectionDividerSlide],
  ['content', renderContentSlide],
  ['two-column-text', renderTwoColumnTextSlide],
  ['multi-column-image', renderMultiColumnImageSlide],
  ['table', renderTableSlide],
  ['image-text', renderImageTextSlide],
  ['full-image', renderFullImageSlide],
<<<<<<< HEAD
  ['full-image-clean', renderFullImageCleanSlide],
=======
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  ['quote', renderQuoteSlide],
  ['conclusion', renderConclusionSlide],
]);

/**
 * Get the layout function for a given slide layout type.
 * Falls back to the content layout if the type is unknown.
 */
export function getLayoutFunction(layout: SlideLayout): LayoutFunction {
  return layoutRegistry.get(layout) ?? renderContentSlide;
}
