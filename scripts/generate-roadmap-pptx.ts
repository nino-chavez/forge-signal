import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PptxGenJS = require('pptxgenjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color palette (Accenture-inspired)
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
  bgLight: 'FAFAFA',
  mobilize: '999999',
  foundation: '0078D4',
  scale: '107C10',
  optimize: 'A100FF',
};

// ============================================================
// MASTER ROADMAP PRESENTATION
// ============================================================
function createMasterRoadmapPptx() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Signal Forge';
  pptx.title = 'Microsoft Store Platform Transformation Roadmap';
  pptx.subject = 'Strategic Roadmap - Phase 2 Deliverable';

  // ---- SLIDE 1: Master Roadmap ----
  const slide1 = pptx.addSlide();

  // Header bar
  slide1.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.05,
    fill: { color: COLORS.purple500 }
  });

  // Title area
  slide1.addText([
    { text: 'accenture', options: { fontSize: 9, color: COLORS.purple500, bold: true } },
    { text: ' + ', options: { fontSize: 9, color: COLORS.textMuted } },
    { text: 'Microsoft', options: { fontSize: 9, color: COLORS.textSecondary, bold: true } },
    { text: ' | 2025', options: { fontSize: 9, color: COLORS.textMuted } },
  ], { x: 0.3, y: 0.15, w: 4, h: 0.2 });

  slide1.addText('Microsoft Store Platform Transformation Roadmap', {
    x: 0.3, y: 0.35, w: 8, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.textPrimary
  });

  slide1.addText('Strategic implementation plan to modernize commerce capabilities, enabling 2X Gaming hardware growth and 50% Surface increase through best-in-class platform outsourcing', {
    x: 0.3, y: 0.7, w: 7.5, h: 0.35,
    fontSize: 9, color: COLORS.textBody
  });

  // Legend (top right)
  const legendX = 8.5;
  slide1.addText('Phases', { x: legendX, y: 0.2, w: 1.3, h: 0.2, fontSize: 8, bold: true, color: COLORS.textSecondary });

  const legendItems = [
    { label: 'Mobilize', color: COLORS.mobilize },
    { label: 'Foundation', color: COLORS.foundation },
    { label: 'Scale', color: COLORS.scale },
    { label: 'Optimize & AI', color: COLORS.optimize },
  ];

  legendItems.forEach((item, i) => {
    const y = 0.4 + (i * 0.18);
    slide1.addShape('rect', { x: legendX + 0.9, y: y, w: 0.35, h: 0.12, fill: { color: item.color } });
    slide1.addText(item.label, { x: legendX, y: y - 0.02, w: 0.85, h: 0.15, fontSize: 7, color: COLORS.textBody, align: 'right' });
  });

  // Timeline header
  const timelineY = 1.15;
  const labelWidth = 2.0;
  const timelineWidth = 7.5;
  const colWidth = timelineWidth / 8;
  const timelineStartX = 0.3 + labelWidth;

  slide1.addText('Capability Domain', { x: 0.3, y: timelineY, w: labelWidth, h: 0.25, fontSize: 8, bold: true, color: COLORS.textSecondary });

  const periods = ['Q1 \'25', 'Q2 \'25', 'Q3 \'25', 'Q4 \'25', 'Q1 \'26', 'Q2 \'26', 'H2 \'26', '2027+'];
  periods.forEach((period, i) => {
    const isFirst = i === 0;
    slide1.addText(period, {
      x: timelineStartX + (i * colWidth), y: timelineY, w: colWidth, h: 0.25,
      fontSize: 7, color: isFirst ? COLORS.purple500 : COLORS.textBody, align: 'center',
      fill: isFirst ? { color: 'F3E8FF' } : undefined
    });
  });

  // Phase labels row
  const phaseY = timelineY + 0.3;
  const phases = [
    { label: 'MOBILIZE', color: COLORS.mobilize, span: 1 },
    { label: 'FOUNDATION', color: COLORS.foundation, span: 3 },
    { label: 'SCALE', color: COLORS.scale, span: 2 },
    { label: 'OPTIMIZE & AI', color: COLORS.optimize, span: 2 },
  ];

  let phaseX = timelineStartX;
  phases.forEach(phase => {
    slide1.addShape('rect', {
      x: phaseX + 0.02, y: phaseY, w: (colWidth * phase.span) - 0.04, h: 0.22,
      fill: { color: phase.color }
    });
    slide1.addText(phase.label, {
      x: phaseX, y: phaseY, w: colWidth * phase.span, h: 0.22,
      fontSize: 7, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
    });
    phaseX += colWidth * phase.span;
  });

  // Swimlanes
  const swimlanes = [
    {
      name: 'Program Governance & Change',
      platforms: 'Operating Model, Org Design, Training',
      bars: [
        { start: 0, span: 1, label: 'Setup', color: COLORS.mobilize },
        { start: 1, span: 7, label: 'Ongoing Governance & Change Management', color: COLORS.borderMedium, dashed: true },
      ]
    },
    {
      name: 'Commerce Core Platform',
      platforms: 'Adobe Commerce | Cart, Checkout, Pricing, Promotions',
      bars: [
        { start: 0, span: 1, label: 'Vendor Selection', color: COLORS.mobilize },
        { start: 1, span: 3, label: 'Build & Launch MVP (US Pilot)', color: COLORS.foundation },
        { start: 4, span: 2, label: 'Scale to 100+ Markets', color: COLORS.scale },
        { start: 6, span: 2, label: 'Agentic Commerce', color: COLORS.optimize },
      ]
    },
    {
      name: 'Customer Data & Personalization',
      platforms: 'Segment | Adobe AJO | Braze',
      bars: [
        { start: 0, span: 1, label: 'Strategy', color: COLORS.mobilize },
        { start: 1, span: 1, label: 'Vendor Eval', color: COLORS.mobilize },
        { start: 2, span: 2, label: 'CDP Implementation', color: COLORS.foundation },
        { start: 4, span: 2, label: 'Journey Orchestration', color: COLORS.scale },
        { start: 6, span: 2, label: 'Real-time Decisioning', color: COLORS.optimize },
      ]
    },
    {
      name: 'Product Data & Content',
      platforms: 'Syndigo | AEM | Workfront',
      bars: [
        { start: 0, span: 1, label: 'Governance', color: COLORS.mobilize },
        { start: 1, span: 2, label: 'PIM Implementation', color: COLORS.foundation },
        { start: 3, span: 2, label: 'AEM Rearchitecture', color: COLORS.foundation },
        { start: 5, span: 1.5, label: 'Content Supply Chain', color: COLORS.scale },
        { start: 6.5, span: 1.5, label: 'AI Content', color: COLORS.optimize },
      ]
    },
    {
      name: 'Order & Fulfillment Operations',
      platforms: 'IBM OMS | Parcel Labs | Dropship',
      bars: [
        { start: 0, span: 2, label: 'Assessment & Design', color: COLORS.mobilize },
        { start: 2, span: 3, label: 'OMS Build & Dropship MVP', color: COLORS.foundation },
        { start: 5, span: 2, label: 'Multi-Node Fulfillment', color: COLORS.scale },
        { start: 7, span: 1, label: 'Auto', color: COLORS.optimize },
      ]
    },
    {
      name: 'Trust & Payments',
      platforms: 'Adyen (retain) | Signifyd | Blackhawk',
      bars: [
        { start: 0, span: 1, label: 'Negotiate', color: COLORS.mobilize },
        { start: 1, span: 2, label: 'Fraud & Gift Card Integration', color: COLORS.foundation },
        { start: 3, span: 2, label: 'Regional Payment Expansion', color: COLORS.scale },
        { start: 5, span: 3, label: 'Ongoing Optimization', color: COLORS.borderMedium, dashed: true },
      ]
    },
    {
      name: 'Data Foundation & Integration',
      platforms: 'Azure | Middleware | Data Migration',
      bars: [
        { start: 0, span: 4, label: 'Data Architecture & Migration', color: COLORS.foundation },
        { start: 4, span: 2, label: 'Integration Hardening', color: COLORS.scale },
        { start: 6, span: 2, label: 'AI/ML Data Layer', color: COLORS.optimize },
      ]
    },
  ];

  const swimlaneStartY = phaseY + 0.3;
  const rowHeight = 0.32;
  const barHeight = 0.18;

  swimlanes.forEach((lane, i) => {
    const y = swimlaneStartY + (i * rowHeight);

    // Lane label
    slide1.addText(lane.name, {
      x: 0.3, y: y, w: labelWidth - 0.1, h: 0.14,
      fontSize: 7, bold: true, color: COLORS.textPrimary
    });
    slide1.addText(lane.platforms, {
      x: 0.3, y: y + 0.12, w: labelWidth - 0.1, h: 0.12,
      fontSize: 5, color: COLORS.textMuted
    });

    // Bars
    lane.bars.forEach(bar => {
      const barX = timelineStartX + (bar.start * colWidth) + 0.02;
      const barW = (bar.span * colWidth) - 0.04;

      if (bar.dashed) {
        slide1.addShape('rect', {
          x: barX, y: y + 0.04, w: barW, h: barHeight,
          fill: { color: COLORS.bgLight },
          line: { color: COLORS.borderMedium, dashType: 'dash', width: 0.5 }
        });
        slide1.addText(bar.label, {
          x: barX, y: y + 0.04, w: barW, h: barHeight,
          fontSize: 5, color: COLORS.textBody, align: 'center', valign: 'middle'
        });
      } else {
        slide1.addShape('rect', {
          x: barX, y: y + 0.04, w: barW, h: barHeight,
          fill: { color: bar.color }
        });
        slide1.addText(bar.label, {
          x: barX, y: y + 0.04, w: barW, h: barHeight,
          fontSize: 5, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
        });
      }
    });

    // Row separator
    slide1.addShape('line', {
      x: 0.3, y: y + rowHeight - 0.01, w: 9.4, h: 0,
      line: { color: COLORS.borderLight, width: 0.5 }
    });
  });

  // Bottom section (4 columns) - positioned after swimlanes
  const bottomY = swimlaneStartY + (swimlanes.length * rowHeight) + 0.15;
  const bottomColWidth = 2.35;

  slide1.addShape('rect', {
    x: 0, y: bottomY, w: '100%', h: 0.02,
    fill: { color: COLORS.borderMedium }
  });

  // Column 1: Key Dependencies
  slide1.addText('Key Dependencies', {
    x: 0.3, y: bottomY + 0.06, w: bottomColWidth, h: 0.12,
    fontSize: 6, bold: true, color: COLORS.purple500
  });
  const dependencies = [
    'Steering Committee approval on vendor selection',
    'Enterprise architecture alignment (CDO/CTO)',
    'Cross-org alignment: Consumer Marketing, Gaming',
    'Budget approval for Phase 2 expansion',
  ];
  dependencies.forEach((dep, i) => {
    slide1.addText(`\u2022 ${dep}`, {
      x: 0.3, y: bottomY + 0.20 + (i * 0.12), w: bottomColWidth, h: 0.12,
      fontSize: 5, color: COLORS.textBody
    });
  });

  // Column 2: Critical Assumptions
  slide1.addText('Critical Assumptions', {
    x: 0.3 + bottomColWidth, y: bottomY + 0.06, w: bottomColWidth, h: 0.12,
    fontSize: 6, bold: true, color: COLORS.purple500
  });
  const assumptions = [
    'Phase 1 recommendations approved',
    'No major org restructuring during impl.',
    'Existing Adyen payment platform retained',
    'Azure remains primary cloud platform',
  ];
  assumptions.forEach((item, i) => {
    slide1.addText(`\u2022 ${item}`, {
      x: 0.3 + bottomColWidth, y: bottomY + 0.20 + (i * 0.12), w: bottomColWidth, h: 0.12,
      fontSize: 5, color: COLORS.textBody
    });
  });

  // Column 3: Investment Summary
  slide1.addText('Investment Summary (ROM)', {
    x: 0.3 + (bottomColWidth * 2), y: bottomY + 0.06, w: bottomColWidth, h: 0.12,
    fontSize: 6, bold: true, color: COLORS.purple500
  });
  const investments = [
    { label: 'Mobilize', value: '$2-3M' },
    { label: 'Foundation', value: '$8-12M' },
    { label: 'Scale', value: '$5-8M' },
    { label: 'Optimize', value: '$3-5M' },
  ];
  investments.forEach((inv, i) => {
    slide1.addText(inv.label, {
      x: 0.3 + (bottomColWidth * 2), y: bottomY + 0.20 + (i * 0.10), w: 0.9, h: 0.10,
      fontSize: 5, color: COLORS.textBody
    });
    slide1.addText(inv.value, {
      x: 0.3 + (bottomColWidth * 2) + 0.9, y: bottomY + 0.20 + (i * 0.10), w: 0.6, h: 0.10,
      fontSize: 5, bold: true, color: COLORS.textPrimary, align: 'right'
    });
  });
  // Total
  slide1.addShape('line', {
    x: 0.3 + (bottomColWidth * 2), y: bottomY + 0.62, w: 1.5, h: 0,
    line: { color: COLORS.purple500, width: 0.5 }
  });
  slide1.addText('Total (3-Year)', {
    x: 0.3 + (bottomColWidth * 2), y: bottomY + 0.64, w: 0.9, h: 0.12,
    fontSize: 5, bold: true, color: COLORS.textPrimary
  });
  slide1.addText('$18-28M', {
    x: 0.3 + (bottomColWidth * 2) + 0.9, y: bottomY + 0.64, w: 0.6, h: 0.12,
    fontSize: 6, bold: true, color: COLORS.purple500, align: 'right'
  });

  // Column 4: Next Steps
  slide1.addText('Next Steps', {
    x: 0.3 + (bottomColWidth * 3), y: bottomY + 0.06, w: bottomColWidth, h: 0.12,
    fontSize: 6, bold: true, color: COLORS.purple500
  });
  const nextSteps = [
    'Finalize vendor recommendations (Jan)',
    'Complete TCO analysis (Jan)',
    'Executive steering approval (Feb)',
    'Mobilization kickoff (Q2 2025)',
  ];
  nextSteps.forEach((step, i) => {
    slide1.addText(`${i + 1}. ${step}`, {
      x: 0.3 + (bottomColWidth * 3), y: bottomY + 0.20 + (i * 0.12), w: bottomColWidth, h: 0.12,
      fontSize: 5, color: COLORS.textBody
    });
  });

  // Footer
  slide1.addText('Copyright 2025 Accenture. All rights reserved. Confidential.', {
    x: 0.3, y: 5.35, w: 4, h: 0.15,
    fontSize: 5, color: COLORS.textMuted
  });
  slide1.addText('Phase 2 Deliverable | Draft as of: Jan 2025', {
    x: 4.5, y: 5.35, w: 3, h: 0.15,
    fontSize: 6, color: COLORS.textBody, align: 'center'
  });
  slide1.addText('28', {
    x: 9.2, y: 5.35, w: 0.5, h: 0.15,
    fontSize: 8, bold: true, color: COLORS.textSecondary, align: 'right'
  });

  // ---- SLIDE 2: Instructions ----
  const slide2 = pptx.addSlide();

  slide2.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.05,
    fill: { color: COLORS.purple500 }
  });

  slide2.addText('Master Strategic Roadmap - Design Rationale', {
    x: 0.3, y: 0.2, w: 9, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.textPrimary
  });

  // Structure Decisions
  slide2.addText('Structure Decisions', {
    x: 0.3, y: 0.7, w: 4.5, h: 0.25,
    fontSize: 12, bold: true, color: COLORS.purple500
  });

  const structureItems = [
    '6 capability swimlanes instead of 12+ platform rows \u2014 executives see domains, not tools',
    '4 value-oriented phases (Mobilize \u2192 Foundation \u2192 Scale \u2192 Optimize) instead of "Plan & Analyze \u2192 Build"',
    'Platform names in subtext \u2014 visible but not the primary organizing principle',
    'Quarterly time scale \u2014 appropriate for strategic view (not monthly for this audience)',
  ];
  structureItems.forEach((item, i) => {
    slide2.addText(`\u2022 ${item}`, {
      x: 0.3, y: 1.0 + (i * 0.28), w: 4.5, h: 0.28,
      fontSize: 9, color: COLORS.textBody
    });
  });

  // Swimlane Mapping table
  slide2.addText('Swimlane Mapping from Phase 1 Assessment', {
    x: 5.0, y: 0.7, w: 4.5, h: 0.25,
    fontSize: 12, bold: true, color: COLORS.purple500
  });

  const mappingData = [
    ['Master Roadmap Swimlane', 'Phase 1 Domains', 'Platforms'],
    ['Program Governance', 'Operating Model', 'N/A (internal)'],
    ['Commerce Core Platform', 'Digital Touchpoints, Pricing', 'Adobe Commerce'],
    ['Customer Data & Personalization', 'Customer Data, Analytics', 'Segment, AJO, Braze'],
    ['Product Data & Content', 'Product Data Mgmt, Content', 'Syndigo, AEM'],
    ['Order & Fulfillment', 'Order Mgmt, Supply Chain', 'IBM OMS, Parcel Labs'],
    ['Trust & Payments', 'Finance & Payment, Fraud', 'Adyen, Signifyd'],
    ['Data Foundation', 'Cross-cutting enabler', 'Azure, Middleware'],
  ];

  mappingData.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const isHeader = rowIdx === 0;
      slide2.addShape('rect', {
        x: 5.0 + (colIdx * 1.5), y: 1.0 + (rowIdx * 0.28), w: 1.48, h: 0.26,
        fill: { color: isHeader ? COLORS.purple500 : (rowIdx % 2 === 0 ? COLORS.bgLight : COLORS.white) },
        line: { color: COLORS.borderLight, width: 0.5 }
      });
      slide2.addText(cell, {
        x: 5.0 + (colIdx * 1.5), y: 1.0 + (rowIdx * 0.28), w: 1.48, h: 0.26,
        fontSize: 6, color: isHeader ? COLORS.white : COLORS.textBody,
        bold: isHeader, align: 'center', valign: 'middle'
      });
    });
  });

  // What This Replaces
  slide2.addText('What This Replaces in Current Slide', {
    x: 0.3, y: 2.4, w: 9, h: 0.25,
    fontSize: 12, bold: true, color: COLORS.purple500
  });

  const replacementData = [
    ['Current Slide Issue', 'This Template\'s Solution'],
    ['12+ individual platform rows', '6 consolidated capability domains'],
    ['"Plan & Analyze" as a phase', '"Mobilize" with clear deliverables'],
    ['"Build, Launch MVP (12mths)"', '"Foundation Release" with business outcome'],
    ['Missing investment context', 'ROM summary in bottom section'],
    ['"Site Tiering?" / "Middleware?" questions', 'Decisions resolved or noted as assumptions'],
  ];

  replacementData.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const isHeader = rowIdx === 0;
      slide2.addShape('rect', {
        x: 0.3 + (colIdx * 4.6), y: 2.7 + (rowIdx * 0.32), w: 4.55, h: 0.3,
        fill: { color: isHeader ? COLORS.purple500 : (colIdx === 0 ? 'FFEBEE' : 'E8F5E9') },
        line: { color: COLORS.borderLight, width: 0.5 }
      });
      slide2.addText(cell, {
        x: 0.3 + (colIdx * 4.6), y: 2.7 + (rowIdx * 0.32), w: 4.55, h: 0.3,
        fontSize: 8, color: isHeader ? COLORS.white : COLORS.textBody,
        bold: isHeader, align: 'center', valign: 'middle'
      });
    });
  });

  // Companion slides note
  slide2.addText('Companion Slides Needed', {
    x: 0.3, y: 4.7, w: 9, h: 0.25,
    fontSize: 12, bold: true, color: COLORS.purple500
  });
  slide2.addText('This master view should be followed by 6-7 domain-specific slides using the Level 1 per-platform template format, one per swimlane.', {
    x: 0.3, y: 5.0, w: 9, h: 0.25,
    fontSize: 10, color: COLORS.textBody
  });

  return pptx;
}

// ============================================================
// LEVEL 1 PER-PLATFORM TEMPLATE PRESENTATION
// ============================================================
function createLevel1TemplatePptx() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Signal Forge';
  pptx.title = 'Level 1 Strategic Roadmap - Per-Platform Template';
  pptx.subject = 'Roadmap Template';

  // ---- SLIDE 1: Per-Platform Template ----
  const slide1 = pptx.addSlide();

  // Header
  slide1.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.05,
    fill: { color: COLORS.purple500 }
  });

  // WIP Badge
  slide1.addShape('rect', {
    x: 0.3, y: 0.2, w: 0.35, h: 0.18,
    fill: { color: 'FEF3C7' }
  });
  slide1.addText('WIP', {
    x: 0.3, y: 0.2, w: 0.35, h: 0.18,
    fontSize: 7, bold: true, color: '92400E', align: 'center', valign: 'middle'
  });

  slide1.addText('Commerce Platform', {
    x: 0.7, y: 0.15, w: 6, h: 0.35,
    fontSize: 20, bold: true, color: COLORS.textPrimary
  });

  slide1.addText('Platform enabling Microsoft to deliver unified digital commerce experiences that drive 2X Gaming revenue growth while reducing operational complexity and time-to-market for new product launches.', {
    x: 0.3, y: 0.5, w: 7, h: 0.35,
    fontSize: 8, color: COLORS.textBody
  });

  // Key legend (top right)
  slide1.addText('Key', { x: 8.5, y: 0.2, w: 1.2, h: 0.15, fontSize: 7, bold: true, color: COLORS.textSecondary });

  const keyItems = [
    { label: 'Microsoft', shape: 'circle', color: COLORS.blue500 },
    { label: 'SI', shape: 'triangle', color: 'F59E0B' },
    { label: 'Third Party', shape: 'rect', color: COLORS.purple500 },
  ];

  keyItems.forEach((item, i) => {
    const y = 0.38 + (i * 0.18);
    slide1.addText(item.label, { x: 8.5, y: y, w: 0.7, h: 0.15, fontSize: 6, color: COLORS.textBody, align: 'right' });
    slide1.addShape('ellipse', {
      x: 9.3, y: y + 0.02, w: 0.1, h: 0.1,
      fill: { color: item.color }
    });
  });

  // Two-column layout
  const leftColX = 0.3;
  const leftColW = 4.3;
  const rightColX = 4.8;
  const rightColW = 4.9;
  const contentY = 0.95;

  // Left: Timeline
  slide1.addShape('rect', {
    x: leftColX, y: contentY, w: leftColW, h: 0.22,
    fill: { color: COLORS.purple500 }
  });
  slide1.addText('STRATEGIC TIMELINE (VALUE DELIVERY PHASES)', {
    x: leftColX, y: contentY, w: leftColW, h: 0.22,
    fontSize: 7, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });

  // Timeline header
  const timelineY = contentY + 0.35;
  const months = ['', 'M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M12+'];
  const monthWidth = leftColW / 15;

  months.forEach((month, i) => {
    slide1.addText(month, {
      x: leftColX + (i * monthWidth), y: timelineY, w: monthWidth, h: 0.15,
      fontSize: 5, color: COLORS.textMuted, align: 'center'
    });
  });

  // Timeline items
  const timelineItems = [
    { label: 'Strategic Value Defined', icons: ['client', 'si'], bars: [{ start: 1, width: 4, color: COLORS.blue500 }] },
    { label: 'Foundation Capabilities', icons: ['client', 'vendor'], bars: [{ start: 2, width: 4, color: COLORS.blue500 }] },
    { label: 'Foundation Release', icons: ['client'], milestone: { pos: 6, color: COLORS.blue500 } },
    { label: 'Scale Capabilities', icons: ['si', 'vendor'], bars: [{ start: 6, width: 5, color: COLORS.green500 }] },
    { label: 'Growth Integration', icons: ['client'], bars: [{ start: 7, width: 4, color: COLORS.green500 }] },
    { label: 'Scale Release', icons: ['client'], milestone: { pos: 11, color: COLORS.green500 } },
    { label: 'Optimization & AI', icons: ['client', 'si', 'vendor'], bars: [{ start: 11, width: 3, color: COLORS.purple500 }] },
  ];

  timelineItems.forEach((item, i) => {
    const y = timelineY + 0.2 + (i * 0.28);
    const labelWidth = monthWidth * 3;

    // Label
    slide1.addText(item.label, {
      x: leftColX + 0.3, y: y, w: labelWidth - 0.3, h: 0.2,
      fontSize: 6, color: COLORS.textSecondary
    });

    // Bars
    if (item.bars) {
      item.bars.forEach(bar => {
        slide1.addShape('rect', {
          x: leftColX + labelWidth + (bar.start * monthWidth * 0.8),
          y: y + 0.03,
          w: bar.width * monthWidth * 0.8,
          h: 0.14,
          fill: { color: bar.color }
        });
      });
    }

    // Milestone
    if (item.milestone) {
      slide1.addShape('rect', {
        x: leftColX + labelWidth + (item.milestone.pos * monthWidth * 0.8) - 0.06,
        y: y + 0.02,
        w: 0.12, h: 0.12,
        fill: { color: COLORS.white },
        line: { color: item.milestone.color, width: 1 },
        rotate: 45
      });
    }
  });

  // Right: Overview
  slide1.addShape('rect', {
    x: rightColX, y: contentY, w: rightColW, h: 0.22,
    fill: { color: COLORS.purple500 }
  });
  slide1.addText('OVERVIEW & KEY CONSIDERATIONS', {
    x: rightColX, y: contentY, w: rightColW, h: 0.22,
    fontSize: 7, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });

  // Strategic Value
  const overviewY = contentY + 0.35;
  slide1.addText('STRATEGIC VALUE', {
    x: rightColX, y: overviewY, w: rightColW, h: 0.15,
    fontSize: 7, bold: true, color: COLORS.textPrimary
  });
  slide1.addText('Foundation Release \u2014', {
    x: rightColX, y: overviewY + 0.18, w: rightColW, h: 0.12,
    fontSize: 7, bold: true, color: COLORS.textPrimary
  });
  slide1.addText('Enable unified product discovery and purchase experience, reducing customer friction by 40% and establishing foundation for omni-channel growth across Gaming, Surface, and Xbox divisions.', {
    x: rightColX, y: overviewY + 0.32, w: rightColW, h: 0.35,
    fontSize: 6, color: COLORS.textBody
  });
  slide1.addText('Scale Release \u2014', {
    x: rightColX, y: overviewY + 0.7, w: rightColW, h: 0.12,
    fontSize: 7, bold: true, color: COLORS.textPrimary
  });
  slide1.addText('Unlock 2X transaction capacity with advanced personalization, supporting Gaming division growth targets without proportional infrastructure investment.', {
    x: rightColX, y: overviewY + 0.84, w: rightColW, h: 0.28,
    fontSize: 6, color: COLORS.textBody
  });

  // Benefits
  slide1.addText('BENEFITS', {
    x: rightColX, y: overviewY + 1.2, w: rightColW, h: 0.15,
    fontSize: 7, bold: true, color: COLORS.textPrimary
  });
  const benefits = [
    'Revenue enablement: Support 2X Gaming growth without platform constraints',
    'Operational efficiency: Reduce manual order intervention by 60%',
    'Speed to market: Launch new experiences in weeks vs. months',
    'Customer experience: Unified journey across all touchpoints',
  ];
  benefits.forEach((item, i) => {
    slide1.addText(`\u2022 ${item}`, {
      x: rightColX, y: overviewY + 1.38 + (i * 0.15), w: rightColW, h: 0.15,
      fontSize: 6, color: '059669'
    });
  });

  // Risks
  slide1.addText('RISKS', {
    x: rightColX, y: overviewY + 2.05, w: rightColW, h: 0.15,
    fontSize: 7, bold: true, color: COLORS.textPrimary
  });
  const risks = [
    'Strategic alignment: Commerce priorities must align with enterprise digital strategy',
    'Competitive timing: Delayed launch risks market share to competitors',
    'Change adoption: Organization readiness for new operating model',
  ];
  risks.forEach((item, i) => {
    slide1.addText(`\u2022 ${item}`, {
      x: rightColX, y: overviewY + 2.23 + (i * 0.15), w: rightColW, h: 0.15,
      fontSize: 6, color: 'DC2626'
    });
  });

  // Bottom section (3 columns)
  const bottomY = 4.2;
  const bottomColW = 3.13;

  slide1.addShape('rect', {
    x: 0, y: bottomY, w: '100%', h: 0.02,
    fill: { color: COLORS.borderMedium }
  });

  // Key Dependencies
  slide1.addShape('rect', {
    x: 0.3, y: bottomY + 0.1, w: bottomColW - 0.2, h: 0.18,
    fill: { color: COLORS.purple500 }
  });
  slide1.addText('KEY DEPENDENCIES', {
    x: 0.3, y: bottomY + 0.1, w: bottomColW - 0.2, h: 0.18,
    fontSize: 6, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });
  const deps = [
    'Strategic decisions on scope and phasing (Steering Committee)',
    'Funding approval for Phase 2 expansion',
    'Enterprise architecture alignment (CDO/CTO)',
    'Partner capacity and commitment confirmation',
    'Business process readiness for new capabilities',
  ];
  deps.forEach((item, i) => {
    slide1.addText(`\u2022 ${item}`, {
      x: 0.3, y: bottomY + 0.35 + (i * 0.13), w: bottomColW - 0.2, h: 0.13,
      fontSize: 5, color: COLORS.textBody
    });
  });
  slide1.addText('Teams Involved', {
    x: 0.3, y: bottomY + 1.05, w: 1, h: 0.1,
    fontSize: 5, bold: true, color: COLORS.textSecondary
  });
  slide1.addText('Microsoft Commerce, Global Technology, SI Partner', {
    x: 0.3, y: bottomY + 1.15, w: bottomColW - 0.2, h: 0.1,
    fontSize: 5, color: COLORS.textMuted
  });

  // Key Assumptions
  slide1.addShape('rect', {
    x: 0.3 + bottomColW, y: bottomY + 0.1, w: bottomColW - 0.2, h: 0.18,
    fill: { color: COLORS.purple500 }
  });
  slide1.addText('KEY ASSUMPTIONS', {
    x: 0.3 + bottomColW, y: bottomY + 0.1, w: bottomColW - 0.2, h: 0.18,
    fontSize: 6, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });
  const assumptions = [
    'Phase 1 scope is approved and funded',
    'Business stakeholders available for requirements validation',
    'No major organizational restructuring during implementation',
    'Enterprise priorities remain stable through Phase 2',
    'Partner delivery capacity aligned with timeline',
  ];
  assumptions.forEach((item, i) => {
    slide1.addText(`\u2022 ${item}`, {
      x: 0.3 + bottomColW, y: bottomY + 0.35 + (i * 0.13), w: bottomColW - 0.2, h: 0.13,
      fontSize: 5, color: COLORS.textBody
    });
  });

  // Next Steps
  slide1.addShape('rect', {
    x: 0.3 + (bottomColW * 2), y: bottomY + 0.1, w: bottomColW - 0.2, h: 0.18,
    fill: { color: COLORS.purple500 }
  });
  slide1.addText('NEXT STEPS', {
    x: 0.3 + (bottomColW * 2), y: bottomY + 0.1, w: bottomColW - 0.2, h: 0.18,
    fontSize: 6, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });
  const nextSteps = [
    'Validate strategic value proposition with business sponsors',
    'Confirm Phase 1 scope and success criteria',
    'Align on governance and decision-making model',
    'Secure executive sponsorship and funding',
    'Establish cross-functional steering committee',
    'Define business outcome metrics and targets',
  ];
  nextSteps.forEach((item, i) => {
    slide1.addText(`${i + 1}. ${item}`, {
      x: 0.3 + (bottomColW * 2), y: bottomY + 0.35 + (i * 0.13), w: bottomColW - 0.2, h: 0.13,
      fontSize: 5, color: COLORS.textBody
    });
  });

  // Footer
  slide1.addText('\u00A92024 Microsoft Corporation. All Rights Reserved. Confidential and proprietary.', {
    x: 0.3, y: 5.35, w: 5, h: 0.12,
    fontSize: 5, color: COLORS.textMuted
  });
  slide1.addText('* Timeline for directional purposes only and dependent on final scope', {
    x: 5.5, y: 5.35, w: 3, h: 0.12,
    fontSize: 5, italic: true, color: COLORS.textMuted, align: 'center'
  });
  slide1.addText('MICROSOFT', {
    x: 8.8, y: 5.35, w: 1, h: 0.12,
    fontSize: 8, bold: true, color: COLORS.textSecondary, align: 'right'
  });

  // ---- SLIDE 2: Instructions ----
  const slide2 = pptx.addSlide();

  slide2.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.05,
    fill: { color: COLORS.purple500 }
  });

  slide2.addText('Level 1 vs Level 2: Content Transformation', {
    x: 0.3, y: 0.2, w: 9, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.textPrimary
  });

  slide2.addText('Same layout structure, different content focus. Level 1 answers "How and When we deliver value" instead of "What we are building."', {
    x: 0.3, y: 0.6, w: 9, h: 0.25,
    fontSize: 10, color: COLORS.textBody
  });

  // Comparison table
  const tableData = [
    ['Section', 'Level 2 (Avoid)', 'Level 1 (Use)'],
    ['Timeline Items', '\u2022 Commerce Platform Selected\n\u2022 MVE Functional Scope Finalized\n\u2022 Project Tools Provisioned', '\u2022 Strategic Value Defined\n\u2022 Foundation Capabilities\n\u2022 Foundation Release \u25C6'],
    ['Overview', 'Establish core commerce functionality through native SFCC frontend and backend components...', 'Enable unified product discovery and purchase experience, reducing customer friction by 40%...'],
    ['Benefits', '\u2022 Common platform that allows delivering unique experiences\n\u2022 Control of capabilities', '\u2022 Revenue enablement: Support 2X Gaming growth\n\u2022 Operational efficiency: Reduce intervention 60%'],
    ['Risks', '\u2022 Alignment with broader enterprise roadmap\n\u2022 Alignment of 3rd Party integrations', '\u2022 Strategic alignment with enterprise strategy\n\u2022 Competitive timing risks market share'],
    ['Dependencies', '\u2022 MVE functional scope decisions\n\u2022 Required 3rd party system integrations', '\u2022 Strategic decisions on scope (Steering Committee)\n\u2022 Funding approval for Phase 2'],
    ['Next Steps', '1. Socialize high-level functional architecture\n2. Engage GT teams for integration', '1. Validate value proposition with sponsors\n2. Confirm Phase 1 scope and success criteria'],
  ];

  const tableY = 0.95;
  const colWidths = [1.3, 4.0, 4.0];
  const rowHeight = 0.55;

  tableData.forEach((row, rowIdx) => {
    let xOffset = 0.3;
    row.forEach((cell, colIdx) => {
      const isHeader = rowIdx === 0;
      const isAvoid = colIdx === 1 && rowIdx > 0;
      const isUse = colIdx === 2 && rowIdx > 0;

      let fillColor = COLORS.white;
      if (isHeader) fillColor = COLORS.textSecondary;
      else if (isAvoid) fillColor = 'FFEBEE';
      else if (isUse) fillColor = 'E8F5E9';

      slide2.addShape('rect', {
        x: xOffset, y: tableY + (rowIdx * rowHeight), w: colWidths[colIdx], h: rowHeight - 0.02,
        fill: { color: fillColor },
        line: { color: COLORS.borderLight, width: 0.5 }
      });
      slide2.addText(cell, {
        x: xOffset + 0.05, y: tableY + (rowIdx * rowHeight) + 0.03, w: colWidths[colIdx] - 0.1, h: rowHeight - 0.08,
        fontSize: 6, color: isHeader ? COLORS.white : COLORS.textBody,
        bold: isHeader || colIdx === 0, valign: 'top'
      });
      xOffset += colWidths[colIdx];
    });
  });

  // Key Principle
  slide2.addText('Key Principle', {
    x: 0.3, y: 4.9, w: 9, h: 0.2,
    fontSize: 12, bold: true, color: COLORS.purple500
  });
  slide2.addText('Level 1 speaks to executives deciding whether to invest. Level 2 speaks to teams deciding how to build.', {
    x: 0.3, y: 5.15, w: 9, h: 0.2,
    fontSize: 10, bold: true, color: COLORS.textPrimary
  });

  return pptx;
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  const outputDir = path.join(__dirname, '..', 'templates', 'strategic');

  console.log('Generating PowerPoint files...\n');

  // Generate Master Roadmap PPTX
  const masterPptx = createMasterRoadmapPptx();
  const masterPath = path.join(outputDir, 'msft-store-master-roadmap.pptx');
  await masterPptx.writeFile(masterPath);
  console.log(`\u2713 Created: ${masterPath}`);

  // Generate Level 1 Template PPTX
  const templatePptx = createLevel1TemplatePptx();
  const templatePath = path.join(outputDir, 'level-1-roadmap-template.pptx');
  await templatePptx.writeFile(templatePath);
  console.log(`\u2713 Created: ${templatePath}`);

  console.log('\nDone! Generated 2 PowerPoint files with 2 slides each.');
}

main().catch(console.error);
