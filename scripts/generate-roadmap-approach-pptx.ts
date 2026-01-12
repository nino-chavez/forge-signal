import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PptxGenJS = require('pptxgenjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color palette
const COLORS = {
  purple500: 'A100FF',
  purple400: 'B833FF',
  blue500: '0078D4',
  blue400: '2899F5',
  green500: '107C10',
  textPrimary: '1A1A1A',
  textSecondary: '333333',
  textBody: '666666',
  textMuted: '999999',
  white: 'FFFFFF',
  borderLight: 'E5E5E5',
  borderMedium: 'CCCCCC',
  bgLight: 'F8F8F8',
  bgMedium: 'F0F0F0',
  master: '5C5C5C',
  level1: '0078D4',
  capability: '107C10',
};

function addFooter(slide: any) {
  slide.addText('Copyright 2025 Accenture. All rights reserved. Confidential.', {
    x: 0.3, y: 5.35, w: 4, h: 0.15,
    fontSize: 5, color: COLORS.textMuted
  });
  slide.addText('accenture', {
    x: 8.5, y: 5.35, w: 1, h: 0.15,
    fontSize: 8, bold: true, color: COLORS.purple500, align: 'right'
  });
}

function createRoadmapApproachPptx() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Signal Forge';
  pptx.title = 'Microsoft Store Roadmap Approach';
  pptx.subject = 'Roadmap Slide Framework';

  // === SLIDE 1: Three Views Overview ===
  const slide1 = pptx.addSlide();

  // Header bar
  slide1.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.04,
    fill: { color: COLORS.purple500 }
  });

  // Title
  slide1.addText('Roadmap Slide Framework', {
    x: 0.3, y: 0.15, w: 6, h: 0.35,
    fontSize: 22, bold: true, color: COLORS.textPrimary
  });

  slide1.addText('Three views for three audiences', {
    x: 0.3, y: 0.48, w: 6, h: 0.25,
    fontSize: 12, color: COLORS.textBody
  });

  // Three column cards - more space for content
  const cardY = 0.85;
  const cardWidth = 3.1;
  const cardHeight = 3.2;
  const cardGap = 0.1;

  // Card 1: Master Roadmap
  const card1X = 0.3;
  slide1.addShape('rect', {
    x: card1X, y: cardY, w: cardWidth, h: cardHeight,
    fill: { color: COLORS.white },
    line: { color: COLORS.borderMedium, width: 1 }
  });
  slide1.addShape('rect', {
    x: card1X, y: cardY, w: cardWidth, h: 0.4,
    fill: { color: COLORS.master }
  });
  slide1.addText('Master Roadmap', {
    x: card1X, y: cardY, w: cardWidth, h: 0.4,
    fontSize: 12, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });

  const card1Content = [
    { label: 'Audience', value: 'Executive Steering Committee' },
    { label: 'Axis', value: 'Capability swimlanes x Timeline (quarters)' },
    { label: 'Granularity', value: '8 periods (Q1 \'25 through 2027+)' },
    { label: 'Focus', value: 'Gantt-style bars showing parallel workstreams' },
    { label: 'Visual', value: 'Horizontal timeline bars across swimlanes' },
  ];
  card1Content.forEach((item, i) => {
    slide1.addText(item.label, {
      x: card1X + 0.15, y: cardY + 0.5 + (i * 0.5), w: 1.1, h: 0.2,
      fontSize: 8, bold: true, color: COLORS.textMuted
    });
    slide1.addText(item.value, {
      x: card1X + 0.15, y: cardY + 0.68 + (i * 0.5), w: cardWidth - 0.3, h: 0.28,
      fontSize: 10, color: COLORS.textSecondary
    });
  });

  // Card 2: Level 1 Per-Platform
  const card2X = card1X + cardWidth + cardGap;
  slide1.addShape('rect', {
    x: card2X, y: cardY, w: cardWidth, h: cardHeight,
    fill: { color: COLORS.white },
    line: { color: COLORS.borderMedium, width: 1 }
  });
  slide1.addShape('rect', {
    x: card2X, y: cardY, w: cardWidth, h: 0.4,
    fill: { color: COLORS.level1 }
  });
  slide1.addText('Level 1 Per-Platform', {
    x: card2X, y: cardY, w: cardWidth, h: 0.4,
    fontSize: 12, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });

  const card2Content = [
    { label: 'Audience', value: 'Business Sponsors / Decision-makers' },
    { label: 'Axis', value: 'Single platform deep-dive' },
    { label: 'Granularity', value: '14 months (M0-M12+)' },
    { label: 'Focus', value: 'Value delivery phases (strategic, not technical)' },
    { label: 'Visual', value: 'Two-column: Timeline + Overview' },
  ];
  card2Content.forEach((item, i) => {
    slide1.addText(item.label, {
      x: card2X + 0.15, y: cardY + 0.5 + (i * 0.5), w: 1.1, h: 0.2,
      fontSize: 8, bold: true, color: COLORS.textMuted
    });
    slide1.addText(item.value, {
      x: card2X + 0.15, y: cardY + 0.68 + (i * 0.5), w: cardWidth - 0.3, h: 0.28,
      fontSize: 10, color: COLORS.textSecondary
    });
  });

  // Card 3: Capability Roadmap
  const card3X = card2X + cardWidth + cardGap;
  slide1.addShape('rect', {
    x: card3X, y: cardY, w: cardWidth, h: cardHeight,
    fill: { color: COLORS.white },
    line: { color: COLORS.borderMedium, width: 1 }
  });
  slide1.addShape('rect', {
    x: card3X, y: cardY, w: cardWidth, h: 0.4,
    fill: { color: COLORS.capability }
  });
  slide1.addText('Capability Roadmap', {
    x: card3X, y: cardY, w: cardWidth, h: 0.4,
    fontSize: 12, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });

  const card3Content = [
    { label: 'Audience', value: 'Program Team / Delivery Leads' },
    { label: 'Axis', value: 'Capability domains (rows) x Phases (columns)' },
    { label: 'Granularity', value: '3 phases (Q1, Q2-Q4, Q1-Q2 2026)' },
    { label: 'Focus', value: 'Initiative-level detail (what, who owns it)' },
    { label: 'Visual', value: 'Grid of initiative cards with ownership dots' },
  ];
  card3Content.forEach((item, i) => {
    slide1.addText(item.label, {
      x: card3X + 0.15, y: cardY + 0.5 + (i * 0.5), w: 1.1, h: 0.2,
      fontSize: 8, bold: true, color: COLORS.textMuted
    });
    slide1.addText(item.value, {
      x: card3X + 0.15, y: cardY + 0.68 + (i * 0.5), w: cardWidth - 0.3, h: 0.28,
      fontSize: 10, color: COLORS.textSecondary
    });
  });

  // Question each answers - below cards
  const questionY = cardY + cardHeight + 0.15;

  slide1.addShape('rect', {
    x: card1X, y: questionY, w: cardWidth, h: 0.7,
    fill: { color: COLORS.bgLight }
  });
  slide1.addText('"Should we invest? What\'s the 3-year journey?"', {
    x: card1X + 0.1, y: questionY + 0.1, w: cardWidth - 0.2, h: 0.5,
    fontSize: 10, italic: true, color: COLORS.master, align: 'center', valign: 'middle'
  });

  slide1.addShape('rect', {
    x: card2X, y: questionY, w: cardWidth, h: 0.7,
    fill: { color: COLORS.bgLight }
  });
  slide1.addText('"Why invest in this platform? What outcomes?"', {
    x: card2X + 0.1, y: questionY + 0.1, w: cardWidth - 0.2, h: 0.5,
    fontSize: 10, italic: true, color: COLORS.level1, align: 'center', valign: 'middle'
  });

  slide1.addShape('rect', {
    x: card3X, y: questionY, w: cardWidth, h: 0.7,
    fill: { color: COLORS.bgLight }
  });
  slide1.addText('"What initiatives per phase? Who owns them?"', {
    x: card3X + 0.1, y: questionY + 0.1, w: cardWidth - 0.2, h: 0.5,
    fontSize: 10, italic: true, color: COLORS.capability, align: 'center', valign: 'middle'
  });

  addFooter(slide1);

  // === SLIDE 2: Hierarchy and Relationship ===
  const slide2 = pptx.addSlide();

  // Header bar
  slide2.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.04,
    fill: { color: COLORS.purple500 }
  });

  // Title
  slide2.addText('How the Views Relate', {
    x: 0.3, y: 0.15, w: 6, h: 0.35,
    fontSize: 22, bold: true, color: COLORS.textPrimary
  });

  slide2.addText('Progressive detail from portfolio to delivery', {
    x: 0.3, y: 0.48, w: 6, h: 0.25,
    fontSize: 12, color: COLORS.textBody
  });

  // Vertical flow - centered and larger
  const flowX = 2.5;
  const boxW = 5;
  const boxH = 0.7;
  const flowStartY = 1.0;
  const arrowGap = 0.35;

  // Box 1: Master
  slide2.addShape('rect', {
    x: flowX, y: flowStartY, w: boxW, h: boxH,
    fill: { color: COLORS.master }
  });
  slide2.addText('Master Roadmap', {
    x: flowX, y: flowStartY, w: boxW, h: boxH,
    fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });
  slide2.addText('Portfolio view across all capability domains\n8 quarters of strategic investment visibility', {
    x: flowX + boxW + 0.3, y: flowStartY, w: 3.5, h: boxH,
    fontSize: 10, color: COLORS.textSecondary, valign: 'middle'
  });

  // Arrow 1
  slide2.addText('▼', {
    x: flowX, y: flowStartY + boxH, w: boxW, h: arrowGap,
    fontSize: 16, color: COLORS.borderMedium, align: 'center', valign: 'middle'
  });

  // Box 2: Level 1
  const box2Y = flowStartY + boxH + arrowGap;
  slide2.addShape('rect', {
    x: flowX, y: box2Y, w: boxW, h: boxH,
    fill: { color: COLORS.level1 }
  });
  slide2.addText('Level 1 Per-Platform', {
    x: flowX, y: box2Y, w: boxW, h: boxH,
    fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });
  slide2.addText('Per-platform strategic view for sponsors\n14-month value delivery roadmap', {
    x: flowX + boxW + 0.3, y: box2Y, w: 3.5, h: boxH,
    fontSize: 10, color: COLORS.textSecondary, valign: 'middle'
  });

  // Arrow 2
  slide2.addText('▼', {
    x: flowX, y: box2Y + boxH, w: boxW, h: arrowGap,
    fontSize: 16, color: COLORS.borderMedium, align: 'center', valign: 'middle'
  });

  // Box 3: Capability
  const box3Y = box2Y + boxH + arrowGap;
  slide2.addShape('rect', {
    x: flowX, y: box3Y, w: boxW, h: boxH,
    fill: { color: COLORS.capability }
  });
  slide2.addText('Capability Roadmap', {
    x: flowX, y: box3Y, w: boxW, h: boxH,
    fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });
  slide2.addText('Initiative-level detail by capability domain\nPhased delivery with ownership clarity', {
    x: flowX + boxW + 0.3, y: box3Y, w: 3.5, h: boxH,
    fontSize: 10, color: COLORS.textSecondary, valign: 'middle'
  });

  // Arrow 3
  slide2.addText('▼', {
    x: flowX, y: box3Y + boxH, w: boxW, h: arrowGap,
    fontSize: 16, color: COLORS.borderMedium, align: 'center', valign: 'middle'
  });

  // Box 4: Level 2
  const box4Y = box3Y + boxH + arrowGap;
  slide2.addShape('rect', {
    x: flowX, y: box4Y, w: boxW, h: boxH,
    fill: { color: COLORS.bgMedium },
    line: { color: COLORS.borderMedium, width: 1, dashType: 'dash' }
  });
  slide2.addText('Level 2 Delivery Plans', {
    x: flowX, y: box4Y, w: boxW, h: boxH,
    fontSize: 14, color: COLORS.textMuted, align: 'center', valign: 'middle'
  });
  slide2.addText('Sprint-level execution plans\n(Not included in this package)', {
    x: flowX + boxW + 0.3, y: box4Y, w: 3.5, h: boxH,
    fontSize: 10, color: COLORS.textMuted, valign: 'middle'
  });

  // Key insight box at bottom
  const insightY = box4Y + boxH + 0.4;
  slide2.addShape('rect', {
    x: 0.3, y: insightY, w: 9.4, h: 0.8,
    fill: { color: COLORS.bgLight },
    line: { color: COLORS.purple500, width: 2 }
  });
  slide2.addText('KEY INSIGHT', {
    x: 0.5, y: insightY + 0.1, w: 1.5, h: 0.25,
    fontSize: 9, bold: true, color: COLORS.purple500
  });
  slide2.addText('Each view serves a different decision-making need. Executives need investment justification, sponsors need platform-specific outcomes, and program teams need initiative-level accountability.', {
    x: 0.5, y: insightY + 0.35, w: 9, h: 0.4,
    fontSize: 10, color: COLORS.textSecondary
  });

  addFooter(slide2);

  return pptx;
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'templates', 'strategic');

  console.log('Generating Roadmap Approach PowerPoint...\n');

  const pptx = createRoadmapApproachPptx();
  const outputPath = path.join(outputDir, 'msft-roadmap-approach.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`✓ Created: ${outputPath}`);

  console.log('\nDone!');
}

main().catch(console.error);
