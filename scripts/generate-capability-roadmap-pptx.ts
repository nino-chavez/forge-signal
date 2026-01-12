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
  yellow500: 'F7B500',
  textPrimary: '1A1A1A',
  textSecondary: '333333',
  textBody: '666666',
  textMuted: '999999',
  white: 'FFFFFF',
  borderLight: 'E5E5E5',
  borderMedium: 'CCCCCC',
  bgLight: 'FAFAFA',
  mobilize: '5C5C5C',
  foundation: '0078D4',
  scale: '107C10',
  optimize: 'A100FF',
};

// Initiative data structure
interface Initiative {
  title: string;
  description: string;
  enabler: string;
  owners: ('microsoft' | 'si' | 'vendor')[];
}

interface CapabilityRow {
  name: string;
  mobilize: Initiative[];
  foundation: Initiative[];
  scale: Initiative[];
}

// Data for the capability roadmap
const capabilityRows: CapabilityRow[] = [
  {
    name: 'Commerce &\nStorefront',
    mobilize: [
      {
        title: 'Vendor Selection & Contracts',
        description: 'Finalize Adobe Commerce selection, negotiate contracts, establish governance',
        enabler: 'Procurement + Legal',
        owners: ['microsoft', 'si']
      }
    ],
    foundation: [
      {
        title: 'Headless Commerce Platform',
        description: 'API-first commerce enabling 2X feature velocity with React storefront',
        enabler: 'Adobe Commerce + Edge Delivery',
        owners: ['vendor', 'si']
      },
      {
        title: 'Dynamic Pricing Engine',
        description: 'Complex bundling and promotional capabilities without engineering',
        enabler: 'Adobe Commerce',
        owners: ['vendor']
      }
    ],
    scale: [
      {
        title: 'Global Storefront Rollout',
        description: 'Scale to 100+ markets with localized pricing, tax, and fulfillment',
        enabler: 'Adobe Commerce + Avalara',
        owners: ['vendor', 'si']
      }
    ]
  },
  {
    name: 'Customer Data &\nPersonalization',
    mobilize: [
      {
        title: 'CDP Strategy & Vendor Eval',
        description: 'Define unified customer data strategy, evaluate Segment vs Adobe RT-CDP',
        enabler: 'Data Architecture Team',
        owners: ['microsoft', 'si']
      }
    ],
    foundation: [
      {
        title: 'Unified Customer Profile',
        description: 'Real-time customer profile enabling authenticated experiences across touchpoints',
        enabler: 'Segment CDP',
        owners: ['vendor', 'microsoft']
      },
      {
        title: 'Journey Orchestration',
        description: 'Cross-channel campaign orchestration with real-time triggers',
        enabler: 'Adobe Journey Optimizer',
        owners: ['vendor']
      }
    ],
    scale: [
      {
        title: 'Real-time Decisioning',
        description: 'AI-powered next-best-action recommendations at scale',
        enabler: 'Adobe Target + Azure ML',
        owners: ['vendor', 'microsoft']
      }
    ]
  },
  {
    name: 'Product Data &\nContent',
    mobilize: [
      {
        title: 'PIM Governance Model',
        description: 'Define product data ownership, quality standards, and enrichment workflows',
        enabler: 'PMG + Category Teams',
        owners: ['microsoft']
      }
    ],
    foundation: [
      {
        title: 'Centralized Product Master',
        description: 'Single source of truth for all product information enabling dropship',
        enabler: 'Syndigo PIM',
        owners: ['vendor', 'si']
      },
      {
        title: 'AEM Rearchitecture',
        description: 'Modernize content management with Edge Delivery Services',
        enabler: 'Adobe AEM',
        owners: ['vendor']
      }
    ],
    scale: [
      {
        title: 'AI Content Generation',
        description: 'Automated product descriptions and localized content at scale',
        enabler: 'Azure OpenAI + Workfront',
        owners: ['vendor', 'microsoft']
      }
    ]
  },
  {
    name: 'Order &\nFulfillment',
    mobilize: [
      {
        title: 'OMS Assessment & Design',
        description: 'Evaluate IBM Sterling capabilities, design target state architecture',
        enabler: 'Supply Chain Team',
        owners: ['microsoft', 'si']
      }
    ],
    foundation: [
      {
        title: 'OMS Build & Dropship MVP',
        description: 'Unified order orchestration with dropship capability for US market',
        enabler: 'IBM Sterling OMS',
        owners: ['vendor', 'si']
      },
      {
        title: 'Carrier Integration',
        description: 'Multi-carrier rate shopping and label generation',
        enabler: 'Parcel Labs',
        owners: ['vendor']
      }
    ],
    scale: [
      {
        title: 'Intelligent Order Routing',
        description: 'AI-optimized sourcing for cost, speed, and sustainability',
        enabler: 'IBM Sterling + ML',
        owners: ['vendor', 'microsoft']
      }
    ]
  },
  {
    name: 'Trust &\nPayments',
    mobilize: [
      {
        title: 'Fraud Vendor Selection',
        description: 'Evaluate and select ML-based fraud detection platform',
        enabler: 'Finance + Risk',
        owners: ['microsoft']
      }
    ],
    foundation: [
      {
        title: 'Automated Risk Management',
        description: 'Reduce manual fraud review from 40% to <5% with ML-based decisions',
        enabler: 'Signifyd',
        owners: ['vendor', 'si']
      },
      {
        title: 'Gift Card Platform',
        description: 'B2B and B2C gift card issuance and redemption',
        enabler: 'Blackhawk Network',
        owners: ['vendor']
      }
    ],
    scale: [
      {
        title: 'Regional Payment Expansion',
        description: 'Local payment methods for APAC, LATAM, EMEA markets',
        enabler: 'Adyen',
        owners: ['vendor']
      }
    ]
  }
];

// Business outcomes by phase
const businessOutcomes = {
  mobilize: [
    'Vendor contracts signed',
    'Data governance established',
    'Risk reduced (fraud baseline)',
    'Foundation team mobilized'
  ],
  foundation: [
    'US Pilot live (Surface + Gaming)',
    '2X feature velocity achieved',
    'Dropship capability enabled',
    'Fraud review reduced to <10%'
  ],
  scale: [
    '100+ markets supported',
    'Omni-channel scale achieved',
    'Gaming growth 2X target',
    'Surface +50% target on track'
  ]
};

function createCapabilityRoadmapPptx() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Signal Forge';
  pptx.title = 'Microsoft Store Platform Transformation - Capability Roadmap';
  pptx.subject = 'Phase 2 Deliverable - Capability Roadmap';

  // Split capabilities across two slides
  const slide1Capabilities = capabilityRows.slice(0, 3); // Commerce, Customer Data, Product Data
  const slide2Capabilities = capabilityRows.slice(3);    // Order & Fulfillment, Trust & Payments

  // === SLIDE 1: Experience & Data Capabilities ===
  const slide1 = pptx.addSlide();
  createCapabilitySlide(slide1, slide1Capabilities, 'Experience & Data Capabilities', '1 of 2', false);

  // === SLIDE 2: Operations & Business Outcomes ===
  const slide2 = pptx.addSlide();
  createCapabilitySlide(slide2, slide2Capabilities, 'Operations & Business Outcomes', '2 of 2', true);

  return pptx;
}

function createCapabilitySlide(
  slide: any,
  capabilities: CapabilityRow[],
  subtitle: string,
  pageNum: string,
  includeOutcomes: boolean
) {

  // === HEADER ===

  // Purple accent bar at top
  slide.addShape('rect', {
    x: 0, y: 0, w: '100%', h: 0.03,
    fill: { color: COLORS.purple500 }
  });

  // Badge
  slide.addShape('rect', {
    x: 0.25, y: 0.12, w: 1.1, h: 0.2,
    fill: { color: COLORS.purple500 }
  });
  slide.addText('PHASE 2 DELIVERABLE', {
    x: 0.25, y: 0.12, w: 1.1, h: 0.2,
    fontSize: 6, bold: true, color: COLORS.white, align: 'center', valign: 'middle'
  });

  // Title
  slide.addText('Microsoft Store Platform Transformation', {
    x: 0.25, y: 0.38, w: 6, h: 0.3,
    fontSize: 20, bold: true, color: COLORS.textPrimary
  });

  // Subtitle (slide-specific)
  slide.addText(subtitle, {
    x: 0.25, y: 0.65, w: 6, h: 0.2,
    fontSize: 11, color: COLORS.textBody
  });

  // Legend (top right)
  slide.addText('Key', {
    x: 8.3, y: 0.15, w: 1.4, h: 0.15,
    fontSize: 8, bold: true, color: COLORS.textBody
  });

  const legendItems = [
    { label: 'Microsoft', color: COLORS.blue500 },
    { label: 'SI', color: COLORS.yellow500 },
    { label: 'Vendor', color: COLORS.purple500 },
  ];

  legendItems.forEach((item, i) => {
    const y = 0.32 + (i * 0.18);
    slide.addText(item.label, {
      x: 8.3, y: y, w: 0.8, h: 0.15,
      fontSize: 7, color: COLORS.textMuted, align: 'right'
    });
    slide.addShape('ellipse', {
      x: 9.2, y: y + 0.02, w: 0.12, h: 0.12,
      fill: { color: item.color }
    });
  });

  // Divider line
  slide.addShape('rect', {
    x: 0, y: 0.9, w: '100%', h: 0.02,
    fill: { color: COLORS.purple500 }
  });

  // === PHASE HEADERS ===
  const gridStartY = 1.0;
  const labelColWidth = 1.4;
  const phaseColWidth = 2.6;
  const headerHeight = 0.38;

  // Phase 1: Mobilize
  slide.addShape('rect', {
    x: labelColWidth + 0.02, y: gridStartY, w: phaseColWidth - 0.04, h: headerHeight,
    fill: { color: COLORS.mobilize }
  });
  slide.addText('PHASE 1: MOBILIZE', {
    x: labelColWidth, y: gridStartY, w: phaseColWidth, h: headerHeight * 0.5,
    fontSize: 9, bold: true, color: COLORS.white, align: 'center', valign: 'bottom'
  });
  slide.addText('Foundation & Risk Reduction\nQ1 2025', {
    x: labelColWidth, y: gridStartY + headerHeight * 0.4, w: phaseColWidth, h: headerHeight * 0.6,
    fontSize: 7, color: COLORS.white, align: 'center', valign: 'top'
  });

  // Phase 2: Foundation
  slide.addShape('rect', {
    x: labelColWidth + phaseColWidth + 0.02, y: gridStartY, w: phaseColWidth - 0.04, h: headerHeight,
    fill: { color: COLORS.foundation }
  });
  slide.addText('PHASE 2: FOUNDATION', {
    x: labelColWidth + phaseColWidth, y: gridStartY, w: phaseColWidth, h: headerHeight * 0.5,
    fontSize: 9, bold: true, color: COLORS.white, align: 'center', valign: 'bottom'
  });
  slide.addText('Platform Build & US Pilot\nQ2-Q4 2025', {
    x: labelColWidth + phaseColWidth, y: gridStartY + headerHeight * 0.4, w: phaseColWidth, h: headerHeight * 0.6,
    fontSize: 7, color: COLORS.white, align: 'center', valign: 'top'
  });

  // Phase 3: Scale
  slide.addShape('rect', {
    x: labelColWidth + (phaseColWidth * 2) + 0.02, y: gridStartY, w: phaseColWidth - 0.04, h: headerHeight,
    fill: { color: COLORS.scale }
  });
  slide.addText('PHASE 3: SCALE', {
    x: labelColWidth + (phaseColWidth * 2), y: gridStartY, w: phaseColWidth, h: headerHeight * 0.5,
    fontSize: 9, bold: true, color: COLORS.white, align: 'center', valign: 'bottom'
  });
  slide.addText('Global Expansion\nQ1-Q2 2026', {
    x: labelColWidth + (phaseColWidth * 2), y: gridStartY + headerHeight * 0.4, w: phaseColWidth, h: headerHeight * 0.6,
    fontSize: 7, color: COLORS.white, align: 'center', valign: 'top'
  });

  // === CAPABILITY ROWS ===
  const rowStartY = gridStartY + headerHeight + 0.08;
  // Calculate row height based on number of capabilities (more space when fewer rows)
  const availableHeight = includeOutcomes ? 3.4 : 4.0;
  const rowHeight = availableHeight / capabilities.length;

  capabilities.forEach((row, rowIdx) => {
    const y = rowStartY + (rowIdx * rowHeight);

    // Row label
    slide.addShape('rect', {
      x: 0.02, y: y, w: labelColWidth - 0.04, h: rowHeight - 0.04,
      fill: { color: COLORS.bgLight }
    });
    slide.addText(row.name, {
      x: 0.08, y: y, w: labelColWidth - 0.16, h: rowHeight - 0.04,
      fontSize: 9, bold: true, color: COLORS.textSecondary, valign: 'middle'
    });

    // Mobilize cell
    const mobilizeX = labelColWidth;
    slide.addShape('rect', {
      x: mobilizeX + 0.02, y: y, w: phaseColWidth - 0.04, h: rowHeight - 0.04,
      fill: { color: COLORS.white },
      line: { color: COLORS.borderLight, width: 0.5 }
    });
    drawInitiatives(slide, row.mobilize, mobilizeX + 0.06, y + 0.06, phaseColWidth - 0.12, rowHeight - 0.16, 'mobilize');

    // Foundation cell
    const foundationX = labelColWidth + phaseColWidth;
    slide.addShape('rect', {
      x: foundationX + 0.02, y: y, w: phaseColWidth - 0.04, h: rowHeight - 0.04,
      fill: { color: COLORS.white },
      line: { color: COLORS.borderLight, width: 0.5 }
    });
    drawInitiatives(slide, row.foundation, foundationX + 0.06, y + 0.06, phaseColWidth - 0.12, rowHeight - 0.16, 'foundation');

    // Scale cell
    const scaleX = labelColWidth + (phaseColWidth * 2);
    slide.addShape('rect', {
      x: scaleX + 0.02, y: y, w: phaseColWidth - 0.04, h: rowHeight - 0.04,
      fill: { color: COLORS.white },
      line: { color: COLORS.borderLight, width: 0.5 }
    });
    drawInitiatives(slide, row.scale, scaleX + 0.06, y + 0.06, phaseColWidth - 0.12, rowHeight - 0.16, 'scale');
  });

  // === BUSINESS OUTCOMES ROW (only on slide 2) ===
  if (includeOutcomes) {
    const outcomesY = rowStartY + (capabilities.length * rowHeight) + 0.1;
    const outcomesHeight = 0.7;

    // Separator line
    slide.addShape('rect', {
      x: 0, y: outcomesY - 0.05, w: '100%', h: 0.015,
      fill: { color: COLORS.borderMedium }
    });

    // Label
    slide.addShape('rect', {
      x: 0.02, y: outcomesY, w: labelColWidth - 0.04, h: outcomesHeight,
      fill: { color: COLORS.white }
    });
    slide.addText('BUSINESS\nOUTCOMES', {
      x: 0.08, y: outcomesY, w: labelColWidth - 0.16, h: outcomesHeight,
      fontSize: 8, bold: true, color: COLORS.purple500, valign: 'middle'
    });

    // Mobilize outcomes
    slide.addShape('rect', {
      x: labelColWidth + 0.02, y: outcomesY, w: phaseColWidth - 0.04, h: outcomesHeight,
      fill: { color: COLORS.white },
      line: { color: COLORS.borderLight, width: 0.5 }
    });
    businessOutcomes.mobilize.forEach((outcome, i) => {
      slide.addShape('ellipse', {
        x: labelColWidth + 0.1, y: outcomesY + 0.1 + (i * 0.15), w: 0.06, h: 0.06,
        fill: { color: COLORS.mobilize }
      });
      slide.addText(outcome, {
        x: labelColWidth + 0.2, y: outcomesY + 0.06 + (i * 0.15), w: phaseColWidth - 0.28, h: 0.14,
        fontSize: 7, color: COLORS.textSecondary
      });
    });

    // Foundation outcomes
    slide.addShape('rect', {
      x: labelColWidth + phaseColWidth + 0.02, y: outcomesY, w: phaseColWidth - 0.04, h: outcomesHeight,
      fill: { color: COLORS.white },
      line: { color: COLORS.borderLight, width: 0.5 }
    });
    businessOutcomes.foundation.forEach((outcome, i) => {
      slide.addShape('ellipse', {
        x: labelColWidth + phaseColWidth + 0.1, y: outcomesY + 0.1 + (i * 0.15), w: 0.06, h: 0.06,
        fill: { color: COLORS.foundation }
      });
      slide.addText(outcome, {
        x: labelColWidth + phaseColWidth + 0.2, y: outcomesY + 0.06 + (i * 0.15), w: phaseColWidth - 0.28, h: 0.14,
        fontSize: 7, color: COLORS.textSecondary
      });
    });

    // Scale outcomes
    slide.addShape('rect', {
      x: labelColWidth + (phaseColWidth * 2) + 0.02, y: outcomesY, w: phaseColWidth - 0.04, h: outcomesHeight,
      fill: { color: COLORS.white },
      line: { color: COLORS.borderLight, width: 0.5 }
    });
    businessOutcomes.scale.forEach((outcome, i) => {
      slide.addShape('ellipse', {
        x: labelColWidth + (phaseColWidth * 2) + 0.1, y: outcomesY + 0.1 + (i * 0.15), w: 0.06, h: 0.06,
        fill: { color: COLORS.scale }
      });
      slide.addText(outcome, {
        x: labelColWidth + (phaseColWidth * 2) + 0.2, y: outcomesY + 0.06 + (i * 0.15), w: phaseColWidth - 0.28, h: 0.14,
        fontSize: 7, color: COLORS.textSecondary
      });
    });
  }

  // === FOOTER ===
  slide.addText('\u00A92025 Accenture. All Rights Reserved. Confidential.', {
    x: 0.25, y: 5.35, w: 4, h: 0.15,
    fontSize: 5, color: COLORS.textMuted
  });

  slide.addText(pageNum, {
    x: 4.5, y: 5.35, w: 1, h: 0.15,
    fontSize: 7, color: COLORS.textBody, align: 'center'
  });

  slide.addText('accenture', {
    x: 8.0, y: 5.35, w: 0.8, h: 0.15,
    fontSize: 8, bold: true, color: COLORS.purple500, align: 'right'
  });

  slide.addText('MICROSOFT', {
    x: 8.9, y: 5.35, w: 0.8, h: 0.15,
    fontSize: 8, bold: true, color: COLORS.blue500, align: 'right'
  });
}

function drawInitiatives(slide: any, initiatives: Initiative[], x: number, y: number, width: number, availableHeight: number, phase: string) {
  const phaseColor = phase === 'mobilize' ? COLORS.mobilize :
                     phase === 'foundation' ? COLORS.foundation : COLORS.scale;

  if (initiatives.length === 0) return;

  const cardGap = 0.04;
  const totalGaps = (initiatives.length - 1) * cardGap;
  const cardHeight = Math.min((availableHeight - totalGaps) / initiatives.length, 0.6);

  initiatives.forEach((init, i) => {
    const cardY = y + (i * (cardHeight + cardGap));

    // Card background with left border
    slide.addShape('rect', {
      x: x, y: cardY, w: width, h: cardHeight,
      fill: { color: COLORS.bgLight }
    });
    slide.addShape('rect', {
      x: x, y: cardY, w: 0.04, h: cardHeight,
      fill: { color: phaseColor }
    });

    // Owner dots
    const dotSize = 0.1;
    let dotX = x + 0.08;
    init.owners.forEach((owner) => {
      const dotColor = owner === 'microsoft' ? COLORS.blue500 :
                       owner === 'si' ? COLORS.yellow500 : COLORS.purple500;
      slide.addShape('ellipse', {
        x: dotX, y: cardY + 0.05, w: dotSize, h: dotSize,
        fill: { color: dotColor }
      });
      dotX += dotSize + 0.03;
    });

    // Title
    slide.addText(init.title, {
      x: dotX + 0.02, y: cardY + 0.03, w: width - (dotX - x) - 0.06, h: 0.15,
      fontSize: 8, bold: true, color: COLORS.textPrimary
    });

    // Description
    slide.addText(init.description, {
      x: x + 0.08, y: cardY + 0.2, w: width - 0.14, h: 0.18,
      fontSize: 6, color: COLORS.textBody
    });

    // Enabler (only if card is tall enough)
    if (cardHeight >= 0.45) {
      slide.addText(`Enabler: ${init.enabler}`, {
        x: x + 0.08, y: cardY + cardHeight - 0.15, w: width - 0.14, h: 0.12,
        fontSize: 6, color: COLORS.textMuted
      });
    }
  });
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  const outputDir = path.join(__dirname, '..', 'templates', 'strategic');

  console.log('Generating Capability Roadmap PowerPoint...\n');

  const pptx = createCapabilityRoadmapPptx();
  const outputPath = path.join(outputDir, 'msft-store-capability-roadmap.pptx');
  await pptx.writeFile(outputPath);
  console.log(`\u2713 Created: ${outputPath}`);

  console.log('\nDone!');
}

main().catch(console.error);
