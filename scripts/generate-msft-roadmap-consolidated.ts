import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PptxGenJS = require('pptxgenjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shared color palette
const COLORS = {
  purple500: 'A100FF',
  purple400: 'B833FF',
  blue500: '0078D4',
  blue400: '2899F5',
  green500: '107C10',
  green400: '54B054',
  textPrimary: '1A1A1A',
  textSecondary: '333333',
  textBody: '666666',
  textMuted: '999999',
  white: 'FFFFFF',
  borderLight: 'E5E5E5',
  borderMedium: 'CCCCCC',
  bgLight: 'F8F8F8',
  bgMedium: 'F0F0F0',
  mobilize: '999999',
  foundation: '0078D4',
  scale: '107C10',
  optimize: 'A100FF',
  master: '5C5C5C',
  level1: '0078D4',
  capability: '107C10',
};

function addFooter(slide: any, slideNum: number) {
  slide.addText('Copyright 2025 Accenture. All rights reserved. Confidential.', {
    x: 0.3, y: 5.35, w: 4, h: 0.15,
    fontSize: 5, color: COLORS.textMuted
  });
  slide.addText('accenture', {
    x: 8.5, y: 5.35, w: 1, h: 0.15,
    fontSize: 8, bold: true, color: COLORS.purple500, align: 'right'
  });
}

// ============================================================
// SLIDE 1-2: ROADMAP FRAMEWORK APPROACH
// ============================================================
function addApproachSlides(pptx: any) {
  // --- Slide 1: Three Views Overview ---
  const slide1 = pptx.addSlide();

  slide1.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: COLORS.purple500 } });

  slide1.addText('Roadmap Slide Framework', {
    x: 0.3, y: 0.15, w: 6, h: 0.35,
    fontSize: 22, bold: true, color: COLORS.textPrimary
  });

  slide1.addText('Three views for three audiences', {
    x: 0.3, y: 0.48, w: 6, h: 0.25,
    fontSize: 12, color: COLORS.textBody
  });

  const cardY = 0.85;
  const cardWidth = 3.1;
  const cardHeight = 3.2;
  const cardGap = 0.1;

  // Card 1: Master Roadmap
  const card1X = 0.3;
  slide1.addShape('rect', { x: card1X, y: cardY, w: cardWidth, h: cardHeight, fill: { color: COLORS.white }, line: { color: COLORS.borderMedium, width: 1 } });
  slide1.addShape('rect', { x: card1X, y: cardY, w: cardWidth, h: 0.4, fill: { color: COLORS.master } });
  slide1.addText('Master Roadmap', { x: card1X, y: cardY, w: cardWidth, h: 0.4, fontSize: 12, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });

  const card1Content = [
    { label: 'Audience', value: 'Executive Steering Committee' },
    { label: 'Axis', value: 'Capability swimlanes x Timeline (quarters)' },
    { label: 'Granularity', value: '8 periods (Q1 \'25 through 2027+)' },
    { label: 'Focus', value: 'Gantt-style bars showing parallel workstreams' },
    { label: 'Visual', value: 'Horizontal timeline bars across swimlanes' },
  ];
  card1Content.forEach((item, i) => {
    slide1.addText(item.label, { x: card1X + 0.15, y: cardY + 0.5 + (i * 0.5), w: 1.1, h: 0.2, fontSize: 8, bold: true, color: COLORS.textMuted });
    slide1.addText(item.value, { x: card1X + 0.15, y: cardY + 0.68 + (i * 0.5), w: cardWidth - 0.3, h: 0.28, fontSize: 10, color: COLORS.textSecondary });
  });

  // Card 2: Level 1 Per-Platform
  const card2X = card1X + cardWidth + cardGap;
  slide1.addShape('rect', { x: card2X, y: cardY, w: cardWidth, h: cardHeight, fill: { color: COLORS.white }, line: { color: COLORS.borderMedium, width: 1 } });
  slide1.addShape('rect', { x: card2X, y: cardY, w: cardWidth, h: 0.4, fill: { color: COLORS.level1 } });
  slide1.addText('Level 1 Per-Platform', { x: card2X, y: cardY, w: cardWidth, h: 0.4, fontSize: 12, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });

  const card2Content = [
    { label: 'Audience', value: 'Business Sponsors / Decision-makers' },
    { label: 'Axis', value: 'Single platform deep-dive' },
    { label: 'Granularity', value: '14 months (M0-M12+)' },
    { label: 'Focus', value: 'Value delivery phases (strategic, not technical)' },
    { label: 'Visual', value: 'Two-column: Timeline + Overview' },
  ];
  card2Content.forEach((item, i) => {
    slide1.addText(item.label, { x: card2X + 0.15, y: cardY + 0.5 + (i * 0.5), w: 1.1, h: 0.2, fontSize: 8, bold: true, color: COLORS.textMuted });
    slide1.addText(item.value, { x: card2X + 0.15, y: cardY + 0.68 + (i * 0.5), w: cardWidth - 0.3, h: 0.28, fontSize: 10, color: COLORS.textSecondary });
  });

  // Card 3: Capability Roadmap
  const card3X = card2X + cardWidth + cardGap;
  slide1.addShape('rect', { x: card3X, y: cardY, w: cardWidth, h: cardHeight, fill: { color: COLORS.white }, line: { color: COLORS.borderMedium, width: 1 } });
  slide1.addShape('rect', { x: card3X, y: cardY, w: cardWidth, h: 0.4, fill: { color: COLORS.capability } });
  slide1.addText('Capability Roadmap', { x: card3X, y: cardY, w: cardWidth, h: 0.4, fontSize: 12, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });

  const card3Content = [
    { label: 'Audience', value: 'Program Team / Delivery Leads' },
    { label: 'Axis', value: 'Capability domains (rows) x Phases (columns)' },
    { label: 'Granularity', value: '3 phases (Q1, Q2-Q4, Q1-Q2 2026)' },
    { label: 'Focus', value: 'Initiative-level detail (what, who owns it)' },
    { label: 'Visual', value: 'Grid of initiative cards with ownership dots' },
  ];
  card3Content.forEach((item, i) => {
    slide1.addText(item.label, { x: card3X + 0.15, y: cardY + 0.5 + (i * 0.5), w: 1.1, h: 0.2, fontSize: 8, bold: true, color: COLORS.textMuted });
    slide1.addText(item.value, { x: card3X + 0.15, y: cardY + 0.68 + (i * 0.5), w: cardWidth - 0.3, h: 0.28, fontSize: 10, color: COLORS.textSecondary });
  });

  // Question boxes
  const questionY = cardY + cardHeight + 0.15;
  slide1.addShape('rect', { x: card1X, y: questionY, w: cardWidth, h: 0.7, fill: { color: COLORS.bgLight } });
  slide1.addText('"Should we invest? What\'s the 3-year journey?"', { x: card1X + 0.1, y: questionY + 0.1, w: cardWidth - 0.2, h: 0.5, fontSize: 10, italic: true, color: COLORS.master, align: 'center', valign: 'middle' });

  slide1.addShape('rect', { x: card2X, y: questionY, w: cardWidth, h: 0.7, fill: { color: COLORS.bgLight } });
  slide1.addText('"Why invest in this platform? What outcomes?"', { x: card2X + 0.1, y: questionY + 0.1, w: cardWidth - 0.2, h: 0.5, fontSize: 10, italic: true, color: COLORS.level1, align: 'center', valign: 'middle' });

  slide1.addShape('rect', { x: card3X, y: questionY, w: cardWidth, h: 0.7, fill: { color: COLORS.bgLight } });
  slide1.addText('"What initiatives per phase? Who owns them?"', { x: card3X + 0.1, y: questionY + 0.1, w: cardWidth - 0.2, h: 0.5, fontSize: 10, italic: true, color: COLORS.capability, align: 'center', valign: 'middle' });

  addFooter(slide1, 1);

  // --- Slide 2: How Views Relate ---
  const slide2 = pptx.addSlide();

  slide2.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: COLORS.purple500 } });
  slide2.addText('How the Views Relate', { x: 0.3, y: 0.15, w: 6, h: 0.35, fontSize: 22, bold: true, color: COLORS.textPrimary });
  slide2.addText('Progressive detail from portfolio to delivery', { x: 0.3, y: 0.48, w: 6, h: 0.25, fontSize: 12, color: COLORS.textBody });

  const flowX = 2.5;
  const boxW = 5;
  const boxH = 0.55;
  const flowStartY = 0.85;
  const arrowGap = 0.25;

  // Box 1: Master
  slide2.addShape('rect', { x: flowX, y: flowStartY, w: boxW, h: boxH, fill: { color: COLORS.master } });
  slide2.addText('Master Roadmap', { x: flowX, y: flowStartY, w: boxW, h: boxH, fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
  slide2.addText('Portfolio view across all capability domains\n8 quarters of strategic investment visibility', { x: flowX + boxW + 0.3, y: flowStartY, w: 3.5, h: boxH, fontSize: 10, color: COLORS.textSecondary, valign: 'middle' });

  slide2.addText('▼', { x: flowX, y: flowStartY + boxH, w: boxW, h: arrowGap, fontSize: 16, color: COLORS.borderMedium, align: 'center', valign: 'middle' });

  // Box 2: Level 1
  const box2Y = flowStartY + boxH + arrowGap;
  slide2.addShape('rect', { x: flowX, y: box2Y, w: boxW, h: boxH, fill: { color: COLORS.level1 } });
  slide2.addText('Level 1 Per-Platform', { x: flowX, y: box2Y, w: boxW, h: boxH, fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
  slide2.addText('Per-platform strategic view for sponsors\n14-month value delivery roadmap', { x: flowX + boxW + 0.3, y: box2Y, w: 3.5, h: boxH, fontSize: 10, color: COLORS.textSecondary, valign: 'middle' });

  slide2.addText('▼', { x: flowX, y: box2Y + boxH, w: boxW, h: arrowGap, fontSize: 16, color: COLORS.borderMedium, align: 'center', valign: 'middle' });

  // Box 3: Capability
  const box3Y = box2Y + boxH + arrowGap;
  slide2.addShape('rect', { x: flowX, y: box3Y, w: boxW, h: boxH, fill: { color: COLORS.capability } });
  slide2.addText('Capability Roadmap', { x: flowX, y: box3Y, w: boxW, h: boxH, fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
  slide2.addText('Initiative-level detail by capability domain\nPhased delivery with ownership clarity', { x: flowX + boxW + 0.3, y: box3Y, w: 3.5, h: boxH, fontSize: 10, color: COLORS.textSecondary, valign: 'middle' });

  slide2.addText('▼', { x: flowX, y: box3Y + boxH, w: boxW, h: arrowGap, fontSize: 16, color: COLORS.borderMedium, align: 'center', valign: 'middle' });

  // Box 4: Level 2
  const box4Y = box3Y + boxH + arrowGap;
  slide2.addShape('rect', { x: flowX, y: box4Y, w: boxW, h: boxH, fill: { color: COLORS.bgMedium }, line: { color: COLORS.borderMedium, width: 1, dashType: 'dash' } });
  slide2.addText('Level 2 Delivery Plans', { x: flowX, y: box4Y, w: boxW, h: boxH, fontSize: 14, color: COLORS.textMuted, align: 'center', valign: 'middle' });
  slide2.addText('Sprint-level execution plans\n(Not included in this package)', { x: flowX + boxW + 0.3, y: box4Y, w: 3.5, h: boxH, fontSize: 10, color: COLORS.textMuted, valign: 'middle' });

  // Key insight
  const insightY = box4Y + boxH + 0.25;
  slide2.addShape('rect', { x: 0.3, y: insightY, w: 9.4, h: 0.7, fill: { color: COLORS.bgLight }, line: { color: COLORS.purple500, width: 2 } });
  slide2.addText('KEY INSIGHT', { x: 0.5, y: insightY + 0.08, w: 1.5, h: 0.2, fontSize: 9, bold: true, color: COLORS.purple500 });
  slide2.addText('Each view serves a different decision-making need. Executives need investment justification, sponsors need platform-specific outcomes, and program teams need initiative-level accountability.', { x: 0.5, y: insightY + 0.28, w: 9, h: 0.38, fontSize: 9, color: COLORS.textSecondary });

  addFooter(slide2, 2);
}

// ============================================================
// SLIDE 3-4: MASTER ROADMAP
// ============================================================
function addMasterRoadmapSlides(pptx: any) {
  // --- Slide 3: Master Roadmap ---
  const slide3 = pptx.addSlide();

  slide3.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.05, fill: { color: COLORS.purple500 } });

  slide3.addText([
    { text: 'accenture', options: { fontSize: 9, color: COLORS.purple500, bold: true } },
    { text: ' + ', options: { fontSize: 9, color: COLORS.textMuted } },
    { text: 'Microsoft', options: { fontSize: 9, color: COLORS.textSecondary, bold: true } },
    { text: ' | 2025', options: { fontSize: 9, color: COLORS.textMuted } },
  ], { x: 0.3, y: 0.15, w: 4, h: 0.2 });

  slide3.addText('Microsoft Store Platform Transformation Roadmap', { x: 0.3, y: 0.35, w: 8, h: 0.4, fontSize: 20, bold: true, color: COLORS.textPrimary });
  slide3.addText('Strategic implementation plan to modernize commerce capabilities, enabling 2X Gaming hardware growth and 50% Surface increase through best-in-class platform outsourcing', { x: 0.3, y: 0.7, w: 7.5, h: 0.35, fontSize: 9, color: COLORS.textBody });

  // Legend
  const legendX = 8.5;
  slide3.addText('Phases', { x: legendX, y: 0.2, w: 1.3, h: 0.2, fontSize: 8, bold: true, color: COLORS.textSecondary });
  const legendItems = [
    { label: 'Mobilize', color: COLORS.mobilize },
    { label: 'Foundation', color: COLORS.foundation },
    { label: 'Scale', color: COLORS.scale },
    { label: 'Optimize & AI', color: COLORS.optimize },
  ];
  legendItems.forEach((item, i) => {
    const y = 0.4 + (i * 0.18);
    slide3.addShape('rect', { x: legendX + 0.9, y: y, w: 0.35, h: 0.12, fill: { color: item.color } });
    slide3.addText(item.label, { x: legendX, y: y - 0.02, w: 0.85, h: 0.15, fontSize: 7, color: COLORS.textBody, align: 'right' });
  });

  // Timeline header
  const timelineY = 1.15;
  const labelWidth = 2.0;
  const timelineWidth = 7.5;
  const colWidth = timelineWidth / 8;
  const timelineStartX = 0.3 + labelWidth;

  slide3.addText('Capability Domain', { x: 0.3, y: timelineY, w: labelWidth, h: 0.25, fontSize: 8, bold: true, color: COLORS.textSecondary });

  const periods = ['Q1 \'25', 'Q2 \'25', 'Q3 \'25', 'Q4 \'25', 'Q1 \'26', 'Q2 \'26', 'H2 \'26', '2027+'];
  periods.forEach((period, i) => {
    const isFirst = i === 0;
    slide3.addText(period, {
      x: timelineStartX + (i * colWidth), y: timelineY, w: colWidth, h: 0.25,
      fontSize: 7, bold: isFirst, color: isFirst ? COLORS.purple500 : COLORS.textMuted, align: 'center'
    });
  });

  // Separator line
  slide3.addShape('rect', { x: 0.3, y: timelineY + 0.28, w: 9.4, h: 0.01, fill: { color: COLORS.borderLight } });

  // Capability rows
  const capabilities = [
    { name: 'Commerce Experience', bars: [
      { start: 0, duration: 1, phase: 'mobilize', label: 'Current State' },
      { start: 1, duration: 2, phase: 'foundation', label: 'PDP Redesign' },
      { start: 3, duration: 2, phase: 'scale', label: 'Cart & Checkout' },
      { start: 5, duration: 3, phase: 'optimize', label: 'AI Personalization' },
    ]},
    { name: 'Customer Data Platform', bars: [
      { start: 0, duration: 1, phase: 'mobilize', label: 'Discovery' },
      { start: 1, duration: 3, phase: 'foundation', label: 'CDP Foundation' },
      { start: 4, duration: 2, phase: 'scale', label: 'Activation' },
      { start: 6, duration: 2, phase: 'optimize', label: 'AI/ML Models' },
    ]},
    { name: 'Product Information', bars: [
      { start: 0, duration: 1, phase: 'mobilize', label: 'Audit' },
      { start: 1, duration: 2, phase: 'foundation', label: 'PIM Setup' },
      { start: 3, duration: 3, phase: 'scale', label: 'Content Enrichment' },
      { start: 6, duration: 2, phase: 'optimize', label: 'AI Content' },
    ]},
    { name: 'Order Management', bars: [
      { start: 0, duration: 2, phase: 'mobilize', label: 'Assessment' },
      { start: 2, duration: 3, phase: 'foundation', label: 'OMS Implementation' },
      { start: 5, duration: 2, phase: 'scale', label: 'Multi-channel' },
      { start: 7, duration: 1, phase: 'optimize', label: 'Optimization' },
    ]},
    { name: 'Trust & Payments', bars: [
      { start: 0, duration: 1, phase: 'mobilize', label: 'Review' },
      { start: 1, duration: 2, phase: 'foundation', label: 'Payment Gateway' },
      { start: 3, duration: 2, phase: 'scale', label: 'Fraud Prevention' },
      { start: 5, duration: 3, phase: 'optimize', label: 'AI Fraud Detection' },
    ]},
    { name: 'Business Intelligence', bars: [
      { start: 0, duration: 2, phase: 'mobilize', label: 'Data Strategy' },
      { start: 2, duration: 2, phase: 'foundation', label: 'Data Lake' },
      { start: 4, duration: 2, phase: 'scale', label: 'BI Dashboards' },
      { start: 6, duration: 2, phase: 'optimize', label: 'Predictive Analytics' },
    ]},
  ];

  const rowHeight = 0.6;
  const rowStartY = timelineY + 0.35;
  const barHeight = 0.35;

  capabilities.forEach((cap, rowIdx) => {
    const rowY = rowStartY + (rowIdx * rowHeight);

    // Row background (alternating)
    if (rowIdx % 2 === 0) {
      slide3.addShape('rect', { x: 0.3, y: rowY, w: 9.4, h: rowHeight, fill: { color: 'FAFAFA' } });
    }

    // Capability label
    slide3.addText(cap.name, { x: 0.35, y: rowY + 0.1, w: labelWidth - 0.1, h: rowHeight - 0.2, fontSize: 8, color: COLORS.textSecondary, valign: 'middle' });

    // Bars
    cap.bars.forEach(bar => {
      const barX = timelineStartX + (bar.start * colWidth) + 0.05;
      const barW = (bar.duration * colWidth) - 0.1;
      const phaseColor = COLORS[bar.phase as keyof typeof COLORS] || COLORS.mobilize;

      slide3.addShape('rect', { x: barX, y: rowY + 0.12, w: barW, h: barHeight, fill: { color: phaseColor } });
      slide3.addText(bar.label, { x: barX, y: rowY + 0.12, w: barW, h: barHeight, fontSize: 6, color: COLORS.white, align: 'center', valign: 'middle' });
    });
  });

  // Footer
  slide3.addText('Copyright 2025 Accenture. All rights reserved. Confidential.', { x: 0.3, y: 5.35, w: 4, h: 0.15, fontSize: 5, color: COLORS.textMuted });
  slide3.addText('accenture', { x: 8.5, y: 5.35, w: 1, h: 0.15, fontSize: 8, bold: true, color: COLORS.purple500, align: 'right' });

  // --- Slide 4: Key Milestones ---
  const slide4 = pptx.addSlide();

  slide4.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.05, fill: { color: COLORS.purple500 } });
  slide4.addText('Key Milestones & Decision Points', { x: 0.3, y: 0.15, w: 8, h: 0.4, fontSize: 20, bold: true, color: COLORS.textPrimary });
  slide4.addText('Critical gates and success metrics for the transformation journey', { x: 0.3, y: 0.5, w: 7, h: 0.25, fontSize: 10, color: COLORS.textBody });

  const milestones = [
    { quarter: 'Q1 2025', title: 'Mobilize Complete', items: ['Team onboarded', 'Current state documented', 'Quick wins identified'], color: COLORS.mobilize },
    { quarter: 'Q2 2025', title: 'Foundation Launch', items: ['PDP redesign live', 'CDP foundation ready', 'Payment gateway integrated'], color: COLORS.foundation },
    { quarter: 'Q4 2025', title: 'Scale Checkpoint', items: ['Cart/checkout optimized', 'Multi-channel OMS live', 'BI dashboards operational'], color: COLORS.scale },
    { quarter: 'Q2 2026', title: 'AI Integration', items: ['Personalization engine live', 'AI fraud detection active', 'Predictive analytics in use'], color: COLORS.optimize },
  ];

  const msCardWidth = 2.2;
  const msCardHeight = 2.5;
  const msStartX = 0.4;
  const msStartY = 0.9;
  const msGap = 0.15;

  milestones.forEach((ms, i) => {
    const cardX = msStartX + (i * (msCardWidth + msGap));

    slide4.addShape('rect', { x: cardX, y: msStartY, w: msCardWidth, h: msCardHeight, fill: { color: COLORS.white }, line: { color: COLORS.borderMedium, width: 1 } });
    slide4.addShape('rect', { x: cardX, y: msStartY, w: msCardWidth, h: 0.4, fill: { color: ms.color } });
    slide4.addText(ms.quarter, { x: cardX, y: msStartY, w: msCardWidth, h: 0.4, fontSize: 11, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
    slide4.addText(ms.title, { x: cardX + 0.1, y: msStartY + 0.5, w: msCardWidth - 0.2, h: 0.3, fontSize: 10, bold: true, color: COLORS.textPrimary });

    ms.items.forEach((item, j) => {
      slide4.addText('• ' + item, { x: cardX + 0.1, y: msStartY + 0.85 + (j * 0.35), w: msCardWidth - 0.2, h: 0.3, fontSize: 8, color: COLORS.textBody });
    });
  });

  // Success metrics
  const metricsY = msStartY + msCardHeight + 0.3;
  slide4.addText('SUCCESS METRICS', { x: 0.3, y: metricsY, w: 3, h: 0.3, fontSize: 10, bold: true, color: COLORS.purple500 });

  const metrics = [
    { label: '2X', desc: 'Gaming hardware growth target' },
    { label: '50%', desc: 'Surface revenue increase' },
    { label: '<2s', desc: 'Page load time target' },
    { label: '99.9%', desc: 'Platform uptime SLA' },
  ];

  metrics.forEach((m, i) => {
    const metricX = 0.4 + (i * 2.35);
    slide4.addShape('rect', { x: metricX, y: metricsY + 0.35, w: 2.2, h: 0.8, fill: { color: COLORS.bgLight } });
    slide4.addText(m.label, { x: metricX, y: metricsY + 0.4, w: 2.2, h: 0.35, fontSize: 18, bold: true, color: COLORS.purple500, align: 'center' });
    slide4.addText(m.desc, { x: metricX + 0.1, y: metricsY + 0.75, w: 2, h: 0.3, fontSize: 8, color: COLORS.textBody, align: 'center' });
  });

  slide4.addText('Copyright 2025 Accenture. All rights reserved. Confidential.', { x: 0.3, y: 5.35, w: 4, h: 0.15, fontSize: 5, color: COLORS.textMuted });
  slide4.addText('accenture', { x: 8.5, y: 5.35, w: 1, h: 0.15, fontSize: 8, bold: true, color: COLORS.purple500, align: 'right' });
}

// ============================================================
// SLIDE 5-6: LEVEL 1 PER-PLATFORM TEMPLATE
// ============================================================
function addLevel1Slides(pptx: any) {
  // --- Slide 5: Level 1 Template ---
  const slide5 = pptx.addSlide();

  slide5.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.05, fill: { color: COLORS.blue500 } });

  slide5.addText('[Platform Name] Transformation Roadmap', { x: 0.3, y: 0.15, w: 7, h: 0.35, fontSize: 18, bold: true, color: COLORS.textPrimary });
  slide5.addText('Value delivery timeline for [Business Sponsor Name]', { x: 0.3, y: 0.48, w: 6, h: 0.2, fontSize: 10, color: COLORS.textBody });

  // Two-column layout
  const leftColX = 0.3;
  const leftColW = 5.5;
  const rightColX = 6;
  const rightColW = 3.7;

  // Timeline column
  slide5.addText('DELIVERY TIMELINE', { x: leftColX, y: 0.8, w: 3, h: 0.25, fontSize: 10, bold: true, color: COLORS.blue500 });

  const phases = [
    { name: 'MOBILIZE', months: 'M0-M2', color: COLORS.mobilize, items: ['Team formation', 'Current state analysis', 'Quick wins identification'] },
    { name: 'FOUNDATION', months: 'M3-M6', color: COLORS.foundation, items: ['Core platform setup', 'Integration framework', 'Data migration prep'] },
    { name: 'SCALE', months: 'M7-M10', color: COLORS.scale, items: ['Feature expansion', 'Performance optimization', 'User adoption'] },
    { name: 'OPTIMIZE', months: 'M11-M12+', color: COLORS.optimize, items: ['AI/ML enhancement', 'Continuous improvement', 'Value realization'] },
  ];

  const phaseHeight = 0.95;
  const phaseStartY = 1.1;

  phases.forEach((phase, i) => {
    const phaseY = phaseStartY + (i * phaseHeight);

    slide5.addShape('rect', { x: leftColX, y: phaseY, w: 0.08, h: phaseHeight - 0.1, fill: { color: phase.color } });
    slide5.addText(phase.name, { x: leftColX + 0.15, y: phaseY, w: 1.2, h: 0.25, fontSize: 9, bold: true, color: phase.color });
    slide5.addText(phase.months, { x: leftColX + 1.4, y: phaseY, w: 0.8, h: 0.25, fontSize: 8, color: COLORS.textMuted });

    phase.items.forEach((item, j) => {
      slide5.addText('• ' + item, { x: leftColX + 0.2, y: phaseY + 0.28 + (j * 0.2), w: leftColW - 0.4, h: 0.2, fontSize: 8, color: COLORS.textBody });
    });
  });

  // Overview column
  slide5.addText('PLATFORM OVERVIEW', { x: rightColX, y: 0.8, w: 3, h: 0.25, fontSize: 10, bold: true, color: COLORS.blue500 });

  slide5.addShape('rect', { x: rightColX, y: 1.1, w: rightColW, h: 1.5, fill: { color: COLORS.bgLight }, line: { color: COLORS.borderLight, width: 1 } });
  slide5.addText('Business Outcomes', { x: rightColX + 0.15, y: 1.2, w: rightColW - 0.3, h: 0.25, fontSize: 9, bold: true, color: COLORS.textSecondary });
  slide5.addText('• [Outcome 1]\n• [Outcome 2]\n• [Outcome 3]', { x: rightColX + 0.15, y: 1.45, w: rightColW - 0.3, h: 0.8, fontSize: 8, color: COLORS.textBody });

  slide5.addShape('rect', { x: rightColX, y: 2.7, w: rightColW, h: 1.2, fill: { color: COLORS.bgLight }, line: { color: COLORS.borderLight, width: 1 } });
  slide5.addText('Key Stakeholders', { x: rightColX + 0.15, y: 2.8, w: rightColW - 0.3, h: 0.25, fontSize: 9, bold: true, color: COLORS.textSecondary });
  slide5.addText('• Executive Sponsor: [Name]\n• Product Owner: [Name]\n• Technical Lead: [Name]', { x: rightColX + 0.15, y: 3.05, w: rightColW - 0.3, h: 0.7, fontSize: 8, color: COLORS.textBody });

  slide5.addShape('rect', { x: rightColX, y: 4.0, w: rightColW, h: 1.0, fill: { color: COLORS.bgLight }, line: { color: COLORS.borderLight, width: 1 } });
  slide5.addText('Investment Summary', { x: rightColX + 0.15, y: 4.1, w: rightColW - 0.3, h: 0.25, fontSize: 9, bold: true, color: COLORS.textSecondary });
  slide5.addText('Total: $[X]M over 14 months\nTeam: [X] FTEs', { x: rightColX + 0.15, y: 4.35, w: rightColW - 0.3, h: 0.5, fontSize: 8, color: COLORS.textBody });

  addFooter(slide5, 5);

  // --- Slide 6: Level 1 Example (Commerce Experience) ---
  const slide6 = pptx.addSlide();

  slide6.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.05, fill: { color: COLORS.blue500 } });

  slide6.addText('Commerce Experience Platform Roadmap', { x: 0.3, y: 0.15, w: 7, h: 0.35, fontSize: 18, bold: true, color: COLORS.textPrimary });
  slide6.addText('Value delivery timeline for Commerce Business Sponsor', { x: 0.3, y: 0.48, w: 6, h: 0.2, fontSize: 10, color: COLORS.textBody });

  // Timeline
  slide6.addText('DELIVERY TIMELINE', { x: leftColX, y: 0.8, w: 3, h: 0.25, fontSize: 10, bold: true, color: COLORS.blue500 });

  const cePhases = [
    { name: 'MOBILIZE', months: 'M0-M2', color: COLORS.mobilize, items: ['UX research & audit', 'Technical discovery', 'Competitor analysis'] },
    { name: 'FOUNDATION', months: 'M3-M6', color: COLORS.foundation, items: ['PDP redesign launch', 'Search optimization', 'Mobile experience'] },
    { name: 'SCALE', months: 'M7-M10', color: COLORS.scale, items: ['Cart/checkout rebuild', 'Cross-sell engine', 'A/B testing framework'] },
    { name: 'OPTIMIZE', months: 'M11-M12+', color: COLORS.optimize, items: ['AI personalization', 'Voice commerce', 'Predictive recommendations'] },
  ];

  cePhases.forEach((phase, i) => {
    const phaseY = phaseStartY + (i * phaseHeight);

    slide6.addShape('rect', { x: leftColX, y: phaseY, w: 0.08, h: phaseHeight - 0.1, fill: { color: phase.color } });
    slide6.addText(phase.name, { x: leftColX + 0.15, y: phaseY, w: 1.2, h: 0.25, fontSize: 9, bold: true, color: phase.color });
    slide6.addText(phase.months, { x: leftColX + 1.4, y: phaseY, w: 0.8, h: 0.25, fontSize: 8, color: COLORS.textMuted });

    phase.items.forEach((item, j) => {
      slide6.addText('• ' + item, { x: leftColX + 0.2, y: phaseY + 0.28 + (j * 0.2), w: leftColW - 0.4, h: 0.2, fontSize: 8, color: COLORS.textBody });
    });
  });

  // Overview
  slide6.addText('PLATFORM OVERVIEW', { x: rightColX, y: 0.8, w: 3, h: 0.25, fontSize: 10, bold: true, color: COLORS.blue500 });

  slide6.addShape('rect', { x: rightColX, y: 1.1, w: rightColW, h: 1.5, fill: { color: COLORS.bgLight }, line: { color: COLORS.borderLight, width: 1 } });
  slide6.addText('Business Outcomes', { x: rightColX + 0.15, y: 1.2, w: rightColW - 0.3, h: 0.25, fontSize: 9, bold: true, color: COLORS.textSecondary });
  slide6.addText('• 25% conversion rate increase\n• 40% reduction in cart abandonment\n• 2X mobile engagement', { x: rightColX + 0.15, y: 1.45, w: rightColW - 0.3, h: 0.8, fontSize: 8, color: COLORS.textBody });

  slide6.addShape('rect', { x: rightColX, y: 2.7, w: rightColW, h: 1.2, fill: { color: COLORS.bgLight }, line: { color: COLORS.borderLight, width: 1 } });
  slide6.addText('Key Stakeholders', { x: rightColX + 0.15, y: 2.8, w: rightColW - 0.3, h: 0.25, fontSize: 9, bold: true, color: COLORS.textSecondary });
  slide6.addText('• Exec Sponsor: VP Digital Commerce\n• Product Owner: Commerce PM\n• Tech Lead: Frontend Architect', { x: rightColX + 0.15, y: 3.05, w: rightColW - 0.3, h: 0.7, fontSize: 8, color: COLORS.textBody });

  slide6.addShape('rect', { x: rightColX, y: 4.0, w: rightColW, h: 1.0, fill: { color: COLORS.bgLight }, line: { color: COLORS.borderLight, width: 1 } });
  slide6.addText('Investment Summary', { x: rightColX + 0.15, y: 4.1, w: rightColW - 0.3, h: 0.25, fontSize: 9, bold: true, color: COLORS.textSecondary });
  slide6.addText('Total: $2.4M over 14 months\nTeam: 8 FTEs (4 Accenture, 4 MSFT)', { x: rightColX + 0.15, y: 4.35, w: rightColW - 0.3, h: 0.5, fontSize: 8, color: COLORS.textBody });

  addFooter(slide6, 6);
}

// ============================================================
// SLIDE 7-8: CAPABILITY ROADMAP
// ============================================================
function addCapabilitySlides(pptx: any) {
  // Capability data
  const capabilities = [
    {
      name: 'Commerce Experience',
      color: '0078D4',
      phases: [
        ['UX Research', 'Tech Discovery'],
        ['PDP Redesign', 'Search Optimization', 'Mobile Experience'],
        ['Cart/Checkout', 'Cross-sell Engine']
      ]
    },
    {
      name: 'Customer Data Platform',
      color: '107C10',
      phases: [
        ['Data Audit', 'CDP Selection'],
        ['Identity Resolution', 'Segment Builder', 'Activation Framework'],
        ['AI/ML Models', 'Real-time Personalization']
      ]
    },
    {
      name: 'Product Information',
      color: 'A100FF',
      phases: [
        ['Content Audit', 'PIM Requirements'],
        ['PIM Implementation', 'DAM Integration', 'Content Enrichment'],
        ['AI Content Generation', 'Dynamic Merchandising']
      ]
    },
  ];

  const capabilities2 = [
    {
      name: 'Order & Fulfillment',
      color: 'E74C3C',
      phases: [
        ['Process Mapping', 'OMS Selection'],
        ['OMS Core', 'Inventory Sync', 'Ship-from-Store'],
        ['Predictive Inventory', 'Dynamic Routing']
      ]
    },
    {
      name: 'Trust & Payments',
      color: 'F39C12',
      phases: [
        ['Fraud Analysis', 'Gateway Review'],
        ['Payment Modernization', 'Fraud Rules Engine', 'Alternative Payments'],
        ['AI Fraud Detection', 'Dynamic Pricing']
      ]
    },
    {
      name: 'Business Outcomes',
      color: '5C5C5C',
      phases: [
        ['KPI Framework', 'Baseline Metrics'],
        ['BI Dashboards', 'Attribution Model', 'Executive Reporting'],
        ['Predictive Analytics', 'Revenue Optimization']
      ]
    },
  ];

  const phaseLabels = ['Phase 1: Q1 2025', 'Phase 2: Q2-Q4 2025', 'Phase 3: Q1-Q2 2026'];

  // Helper function to render a capability slide
  function renderCapabilitySlide(slide: any, caps: typeof capabilities, slideTitle: string) {
    slide.addShape('rect', { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: COLORS.purple500 } });

    slide.addText('Capability Roadmap', { x: 0.3, y: 0.12, w: 6, h: 0.3, fontSize: 18, bold: true, color: COLORS.textPrimary });
    slide.addText(slideTitle, { x: 0.3, y: 0.4, w: 6, h: 0.2, fontSize: 10, color: COLORS.textBody });

    // Column headers
    const labelColW = 1.8;
    const phaseColW = 2.5;
    const startX = 0.3;
    const headerY = 0.7;

    slide.addText('Capability', { x: startX, y: headerY, w: labelColW, h: 0.3, fontSize: 9, bold: true, color: COLORS.textSecondary });

    phaseLabels.forEach((label, i) => {
      const colX = startX + labelColW + (i * phaseColW);
      slide.addShape('rect', { x: colX, y: headerY, w: phaseColW - 0.05, h: 0.3, fill: { color: i === 0 ? COLORS.foundation : i === 1 ? COLORS.scale : COLORS.optimize } });
      slide.addText(label, { x: colX, y: headerY, w: phaseColW - 0.05, h: 0.3, fontSize: 8, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
    });

    // Capability rows
    const rowHeight = 1.5;
    const rowStartY = headerY + 0.4;

    caps.forEach((cap, rowIdx) => {
      const rowY = rowStartY + (rowIdx * rowHeight);

      // Row background
      if (rowIdx % 2 === 0) {
        slide.addShape('rect', { x: startX, y: rowY, w: labelColW + (phaseColW * 3), h: rowHeight - 0.05, fill: { color: 'FAFAFA' } });
      }

      // Capability label
      slide.addShape('rect', { x: startX, y: rowY + 0.1, w: 0.08, h: rowHeight - 0.25, fill: { color: cap.color } });
      slide.addText(cap.name, { x: startX + 0.15, y: rowY + 0.1, w: labelColW - 0.2, h: rowHeight - 0.2, fontSize: 9, bold: true, color: COLORS.textSecondary, valign: 'top' });

      // Phase initiatives
      cap.phases.forEach((phaseItems, phaseIdx) => {
        const colX = startX + labelColW + (phaseIdx * phaseColW);

        phaseItems.forEach((item, itemIdx) => {
          const cardY = rowY + 0.1 + (itemIdx * 0.45);
          slide.addShape('rect', { x: colX + 0.05, y: cardY, w: phaseColW - 0.15, h: 0.38, fill: { color: COLORS.white }, line: { color: COLORS.borderLight, width: 1 } });
          slide.addText(item, { x: colX + 0.1, y: cardY, w: phaseColW - 0.25, h: 0.38, fontSize: 8, color: COLORS.textSecondary, valign: 'middle' });
        });
      });
    });

    addFooter(slide, 0);
  }

  // Slide 7: Experience & Data Capabilities
  const slide7 = pptx.addSlide();
  renderCapabilitySlide(slide7, capabilities, 'Experience & Data Capabilities');

  // Slide 8: Operations & Business Outcomes
  const slide8 = pptx.addSlide();
  renderCapabilitySlide(slide8, capabilities2, 'Operations & Business Outcomes');
}

// ============================================================
// MAIN: Generate consolidated PPTX
// ============================================================
async function main() {
  const outputDir = path.join(__dirname, '..', 'templates', 'strategic');

  console.log('Generating Consolidated Microsoft Roadmap PowerPoint...\n');

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Signal Forge';
  pptx.title = 'Microsoft Store Roadmap Package';
  pptx.subject = 'Consolidated Roadmap Views';

  // Add all slides
  addApproachSlides(pptx);      // Slides 1-2: Framework explanation
  addMasterRoadmapSlides(pptx); // Slides 3-4: Master roadmap + milestones
  addLevel1Slides(pptx);        // Slides 5-6: Level 1 template + example
  addCapabilitySlides(pptx);    // Slides 7-8: Capability roadmap

  const outputPath = path.join(outputDir, 'msft-roadmap-consolidated.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Created: ${outputPath}`);

  console.log('\nTotal slides: 8');
  console.log('  1-2: Roadmap Framework Approach');
  console.log('  3-4: Master Roadmap & Milestones');
  console.log('  5-6: Level 1 Per-Platform (Template + Example)');
  console.log('  7-8: Capability Roadmap');

  console.log('\nDone!');
}

main().catch(console.error);
