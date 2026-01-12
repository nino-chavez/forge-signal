#!/usr/bin/env npx tsx
/**
 * Generate Discovery Deck PowerPoint
 *
 * Converts the Agentic Commerce Discovery HTML deck to PowerPoint format.
 * Uses dark theme with cyan/orange accent colors to match the HTML version.
 */

import PptxGenJSImport from "pptxgenjs";
import * as path from "path";

const PptxGenJS = (PptxGenJSImport as any).default || PptxGenJSImport;

// Color palette matching discovery.html
const colors = {
  bg: "0f172a",
  bgCard: "1e293b",
  bgCardElevated: "263548",
  bgDivider: "0a1018",
  text: "e2e8f0",
  textMuted: "94a3b8",
  textDim: "64748b",
  accentPrimary: "22d3ee", // Cyan
  accentSecondary: "f97316", // Orange
  positive: "34d399",
  negative: "f87171",
  border: "334155",
  song: "a78bfa",
  strategy: "fbbf24",
  workco: "34d399",
  white: "FFFFFF",
};

// ============================================================================
// NATIVE PPTXGENJS HELPERS
// ============================================================================

/**
 * Add a bulleted list using native PptxGenJS bullet support
 * This ensures proper alignment without manual positioning hacks
 */
function addBulletList(
  slide: any,
  items: string[],
  options: {
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize?: number;
    color?: string;
    bulletColor?: string;
    bulletCode?: string; // Unicode hex code, e.g., "25A0" for square
    lineSpacing?: number;
  }
) {
  const {
    x, y, w, h,
    fontSize = 11,
    color = colors.text,
    bulletColor = colors.accentPrimary,
    bulletCode = "25A0", // Square bullet by default
    lineSpacing = 20,
  } = options;

  // Each item needs breakLine:true to appear on separate lines
  // bullet:true with color sets both bullet and text color
  const textItems = items.map((item, i) => ({
    text: item,
    options: {
      bullet: true,
      color: bulletColor,
      breakLine: i < items.length - 1, // All except last need breakLine
    },
  }));

  slide.addText(textItems, {
    x,
    y,
    w,
    h,
    fontSize,
    fontFace: "Inter",
    color,
    valign: "top",
    lineSpacingMultiple: 1.5,
  });
}

/**
 * Add a horizontal line using native line shape
 */
function addLine(
  slide: any,
  x: number,
  y: number,
  w: number,
  color: string = colors.border,
  width: number = 1
) {
  slide.addShape("line", {
    x,
    y,
    w,
    h: 0,
    line: { color, width, dashType: "solid" },
  });
}

interface SlideContent {
  type: "hero" | "divider" | "content";
  section?: string;
  title: string;
  subtitle?: string;
  content?: any;
  pageNum: string;
}

const slides: SlideContent[] = [
  // Slide 1: Hero
  {
    type: "hero",
    title: "Agentic Commerce\nFY'27 Discovery",
    subtitle: "How Best Buy shows up when AI answers product questions — and what it takes to get there.",
    pageNum: "1 / 17"
  },
  // Slide 2: Section Divider - Strategic Context
  {
    type: "divider",
    section: "01",
    title: "Strategic Context",
    subtitle: "What we've heard from stakeholders, the platform landscape, and success pillars for FY'27",
    pageNum: "2 / 17"
  },
  // Slide 3: Executive Summary
  {
    type: "content",
    section: "01 Strategic Context",
    title: "Executive Summary",
    content: {
      imperatives: [
        { title: "Build the Intelligence", desc: "Own the decision engine. Control the context. Your proprietary data—purchase history, repair logs, return reasons—is the competitive moat." },
        { title: "Connect the Plumbing", desc: "Use vendors (Feedonomics, Rithum) for connectivity. Keep decision logic and data enrichment in your GCP environment." },
        { title: "Defend the Brand", desc: "Protect brand perception in AI responses. Ensure agents represent Best Buy accurately across all platforms." },
      ],
      callout: "Core Thesis: Generic AI platforms are 'tourists' in your customers' lives. You win by leveraging context that only you have. If you don't own the intelligence layer, you become just another feed in a generic AI's database."
    },
    pageNum: "3 / 17"
  },
  // Slide 4: What We Heard
  {
    type: "content",
    section: "01 Strategic Context",
    title: "What We Heard",
    subtitle: "Key themes from Nov 21, Dec 5, and Dec 9 stakeholder sessions",
    content: {
      quotes: [
        { text: '"How do we tackle all of this, all at the same time? Where do we focus first?"', attr: "— Amy Williams" },
        { text: '"Feedonomics promises you the world and then does not follow through."', attr: "— Ram Raipati" },
        { text: '"Devil is in the details integrating with Best Buy APIs and legacy systems."', attr: "— Dec 9 Workshop" },
      ],
      themes: [
        "Build vs. Buy — ACP server: cost, sustainability, integration complexity",
        "Cloud Portability — GCP-first, but solutions must remain vendor-agnostic",
        "Architecture Foundation — Standardized tooling and protocols (ACP, MCP, A2A)",
        "Cost Concern — Slim margins; stacked fees (advertising, licensing) under scrutiny",
      ]
    },
    pageNum: "4 / 17"
  },
  // Slide 5: Platform Matrix
  {
    type: "content",
    section: "01 Strategic Context",
    title: "The Platform Matrix",
    subtitle: "Channel strategy differs fundamentally between owned and third-party agent surfaces",
    content: {
      onPlatform: [
        { name: "Best Buy App", desc: "Authenticated, personalized, membership-aware" },
        { name: "Website Chat", desc: "Session context, browsing history, cart state" },
        { name: "In-Store Agents", desc: "Inventory-aware, associate complement" },
        { name: "Geek Squad", desc: "Post-purchase, service history, repair logs" },
      ],
      offPlatform: [
        { name: "ChatGPT", desc: "Largest consumer audience; ACP enables commerce actions" },
        { name: "Microsoft Copilot", desc: "Enterprise reach via M365; Bing shopping integration" },
        { name: "Google SGE", desc: "Search traffic at stake; Schema.org compliance critical" },
        { name: "Perplexity/Others", desc: "Citation-driven; 20-30% spec data exposure risk" },
      ]
    },
    pageNum: "5 / 17"
  },
  // Slide 6: Success Pillars
  {
    type: "content",
    section: "01 Strategic Context",
    title: "Success Pillars",
    content: {
      pillars: [
        { icon: "shield", title: "Brand Sentiment", desc: "Protect and enhance brand perception in AI responses." },
        { icon: "search", title: "Topical Visibility", desc: "Be found for the right topics. Optimize for GEO, not just SEO." },
        { icon: "star", title: "Value & Service", desc: "Lead with differentiation: Geek Squad, Total Tech, in-store expertise." },
        { icon: "target", title: "Product Discovery", desc: "Enable agents to find, understand, and recommend your products." },
      ],
      callout: "The Question: When a customer asks an AI 'What laptop should I buy for video editing?', will the agent confidently recommend Best Buy—or will you be just another option in a generic comparison?"
    },
    pageNum: "6 / 17"
  },
  // Slide 7: Section Divider - Workstreams
  {
    type: "divider",
    section: "02",
    title: "Workstreams",
    subtitle: "Four parallel tracks: Channels, Retail Media, Marketing Performance, and Technical Foundation",
    pageNum: "7 / 17"
  },
  // Slide 8: Channels Strategy
  {
    type: "content",
    section: "02 Workstreams",
    title: "Channels Strategy",
    subtitle: "Translating workshop feedback into channel priorities",
    content: {
      quotes: [
        { text: '"Needs to create API ready infrastructure for the LLMs"', attr: "— Adam Sand" },
        { text: '"Do we build, buy, or enable hybrid technology when creating agent ready infrastructure"', attr: "— Amy Williams" },
      ],
      recommendations: [
        "API & Feed Structure — Create machine-readable data layer for agent consumption",
        "LLM Merchant Submission — Register with ChatGPT, Google, Bing for off-platform visibility",
        "Content Structure & IA — Address top-of-funnel gaps with helpful guides and FAQs",
        "Schema.org Compliance — Ensure product data is structured for AI extraction",
      ]
    },
    pageNum: "8 / 17"
  },
  // Slide 9: RMN
  {
    type: "content",
    section: "02 Workstreams",
    title: "Retail Media Network",
    subtitle: "Uncharted territory — experiment early and build measurement infrastructure",
    content: {
      hypotheses: [
        "Structured Data Placement — Test sponsored content within agent responses",
        "Agent API Sponsorship — Explore embedding sponsored units directly, tagged for transparency",
        "Upper-Funnel Experiments — Pilot category-level content that naturally hosts RMN placements",
      ],
      measurement: [
        "Forward-Compatible Hooks — API impression tokens, inclusion tracking",
        "IAB/MRC Monitoring — Tracking emerging industry standards",
        "Learn-as-We-Go — Instrument now, refine attribution models as patterns emerge",
      ]
    },
    pageNum: "9 / 17"
  },
  // Slide 10: Technical Foundation
  {
    type: "content",
    section: "02 Workstreams",
    title: "Technical Foundation",
    subtitle: "Table-stakes: Ensuring AI systems can access and interpret your site",
    content: {
      steps: [
        "Enhanced Product Schema — Structured data for AI extraction",
        "API & Feed Structure — Machine-readable data layer",
        "LLM Merchant Submission — Register with ChatGPT, Google, Bing",
        "Service Integrations — Connect existing services to agent layer",
        "RMN Schema Integration — Sponsored content in structured feeds",
      ],
      comparison: {
        today: ["Inefficient ingestion", "Incomplete information", "Legacy constraints", "Human-optimized"],
        tomorrow: ["Structured, machine-readable", "Real-time access", "Fresh, unified content", "Foundation for monetization"]
      },
      callout: "Key Integration: OpenAI's ACP (Agent Commerce Protocol) enables commerce actions — checkout, cart, inventory — directly within AI conversations."
    },
    pageNum: "10 / 17"
  },
  // Slide 11: Section Divider - Roadmap
  {
    type: "divider",
    section: "03",
    title: "Roadmap",
    subtitle: "Assessment → Readiness → Enrichment → Optimization → Use Cases",
    pageNum: "11 / 17"
  },
  // Slide 12: Roadmap Overview
  {
    type: "content",
    section: "03 Roadmap",
    title: "Phase Overview",
    content: {
      phases: [
        { num: "1", name: "Assessment", desc: "Understand current state. Audit, measure, identify gaps.", color: colors.positive },
        { num: "2", name: "Data Readiness", desc: "Prepare infrastructure. APIs, feeds, structured data.", color: colors.accentPrimary },
        { num: "3", name: "Enrichment", desc: "Build out content. Schema, guides, FAQs, integrations.", color: colors.song },
        { num: "4", name: "Optimization", desc: "Refine and measure. Content enrichment, measurement.", color: colors.accentSecondary },
        { num: "5", name: "Use Cases", desc: "Apply and scale. Agentic UX, brand monitoring.", color: colors.accentSecondary },
      ],
      callout: "Phasing Principle: Each phase builds on the previous. Assessment first — you can't plan without understanding current state."
    },
    pageNum: "12 / 17"
  },
  // Slide 13: Roadmap Detail
  {
    type: "content",
    section: "03 Roadmap",
    title: "Detailed Initiatives",
    content: {
      table: [
        { phase: "Phase 1", name: "Assessment", initiatives: "Schema.org audit • Baseline GEO measurement • Content gaps • API assessment", outcome: "Clear picture of current state" },
        { phase: "Phase 2", name: "Data Readiness", initiatives: "API & Feed structure • LLM Merchant Submission • Structured data templates", outcome: "Infrastructure ready for agents" },
        { phase: "Phase 3", name: "Enrichment", initiatives: "Enhanced product schema • Content Structure & IA • Helpful guides • Service integrations", outcome: "Rich, machine-readable content" },
        { phase: "Phase 4", name: "Optimization", initiatives: "PDP/category content • Sponsored alignment • UGC & reviews • Measurement hooks", outcome: "Optimized with measurement" },
        { phase: "Phase 5", name: "Use Cases", initiatives: "Agentic search UX • Brand sentiment monitoring • Off-platform optimization • Full GEO attribution", outcome: "Scaled use cases" },
      ]
    },
    pageNum: "13 / 17"
  },
  // Slide 14: Section Divider - Partnership
  {
    type: "divider",
    section: "04",
    title: "Partner Ecosystem",
    subtitle: "Assessing current partners, managing technical requirements, and balancing consolidation vs. diversification",
    pageNum: "14 / 17"
  },
  // Slide 15: Build vs Buy
  {
    type: "content",
    section: "04 Partner Ecosystem",
    title: "Build vs. Buy vs. Partner",
    subtitle: "These are emerging capabilities — we're figuring out how to achieve outcomes",
    content: {
      options: [
        { type: "Build In-House", color: colors.song, items: ["Decision logic & intelligence layer", "Customer context & matchmaking", "Proprietary data enrichment"] },
        { type: "Buy / License", color: colors.accentPrimary, items: ["Feed management (Feedonomics, Rithum)", "API connectivity & plumbing", "Schema validation tools"] },
        { type: "Partner / Integrate", color: colors.strategy, items: ["LLM platforms (OpenAI, Google, Microsoft)", "ACP protocol compliance", "Merchant submission programs"] },
      ],
      questions: [
        "How to balance multiple partners vs. consolidating?",
        "How to assess current partners' agentic commerce capabilities?",
        "How to manage different technical requirements across ecosystem?",
        "What's the risk vs. reward of building technology for LLM search?",
      ]
    },
    pageNum: "15 / 17"
  },
  // Slide 16: Decision Framework
  {
    type: "content",
    section: "04 Partner Ecosystem",
    title: "Decision Framework",
    subtitle: "How to evaluate which approach for which capability",
    content: {
      matrix: [
        { capability: "Intelligence Layer", approach: "Build", rationale: "Proprietary advantage. Customer context, decision logic — this is the competitive moat." },
        { capability: "Data Enrichment", approach: "Build", rationale: "Your data is unique. Purchase history, repair logs, return reasons — no vendor has this." },
        { capability: "Feed Management", approach: "Buy", rationale: "Commodity capability. Feedonomics, Rithum — use for connectivity, but monitor delivery." },
        { capability: "Schema & Structured Data", approach: "Buy + Build", rationale: "Buy validation tools, but build custom enrichment for your catalog structure." },
        { capability: "LLM Platform Access", approach: "Partner", rationale: "OpenAI (ACP), Google, Microsoft — integrate with their protocols." },
      ],
      callout: "Guiding Principle: Own what differentiates you (intelligence, context, data). Buy what is commodity (plumbing, connectivity). Partner where you need platform access."
    },
    pageNum: "16 / 17"
  },
  // Slide 17: Next Steps
  {
    type: "content",
    section: "04 Partner Ecosystem",
    title: "Where We Go From Here",
    subtitle: "Accenture has navigated emerging tech transitions before — mobile, cloud, AI/ML",
    content: {
      accenture: [
        "Cross-industry pattern recognition — what's working in retail, CPG, financial services",
        "Platform relationships — direct access to Google, Microsoft, OpenAI engineering teams",
        "Methodology for emerging tech — assess, pilot, scale framework we've applied before",
        "Execution capacity — ability to staff and deliver across technical and strategic workstreams",
      ],
      actions: [
        "Current State Assessment — Schema audit, API readiness, content gap analysis",
        "Success Criteria Definition — What does 'good' look like? Measurement framework.",
        "Pilot Program — Targeted experiment with one LLM platform to validate approach",
        "Governance Framework — How Best Buy adapts as protocols and standards evolve",
      ],
      callout: "Immediate Next Step: Schedule a working session with engineering and data leadership to scope the assessment phase. Foundations first — then we build."
    },
    pageNum: "17 / 17"
  },
];

async function generateDiscoveryDeck() {
  const pptx = new PptxGenJS();

  pptx.author = "Accenture";
  pptx.title = "Agentic Commerce: FY'27 Discovery — Best Buy × Accenture";
  pptx.subject = "Strategic Initiative Discovery";
  pptx.company = "Accenture";
  pptx.layout = "LAYOUT_WIDE"; // 13.33" x 7.5"

  for (const slideData of slides) {
    const slide = pptx.addSlide();

    if (slideData.type === "hero") {
      createHeroSlide(slide, slideData);
    } else if (slideData.type === "divider") {
      createDividerSlide(slide, slideData);
    } else {
      createContentSlide(slide, slideData, pptx);
    }
  }

  const outputPath = path.join(
    process.cwd(),
    "projects/bby/decks/agentic-discovery/discovery.pptx"
  );

  await pptx.writeFile({ fileName: outputPath });
  console.log(`PowerPoint saved to: ${outputPath}`);
}

function createHeroSlide(slide: any, data: SlideContent) {
  // Dark gradient background
  slide.background = { color: colors.bg };

  // Brand header
  slide.addText("Best Buy × Accenture", {
    x: 0.5,
    y: 0.4,
    w: 4,
    h: 0.3,
    fontSize: 12,
    fontFace: "Inter",
    bold: true,
    color: colors.accentSecondary,
  });

  slide.addText("Internal Document", {
    x: 9,
    y: 0.4,
    w: 4,
    h: 0.3,
    fontSize: 10,
    fontFace: "Inter",
    color: colors.textMuted,
    align: "right",
  });

  // Subhead
  slide.addText("FY'27 Strategic Initiative", {
    x: 0.5,
    y: 2.5,
    w: 12.3,
    h: 0.4,
    fontSize: 14,
    fontFace: "Inter",
    color: colors.textMuted,
    align: "center",
  });

  // Main title
  const titleLines = data.title.split("\n");
  slide.addText(titleLines[0], {
    x: 0.5,
    y: 3,
    w: 12.3,
    h: 0.8,
    fontSize: 44,
    fontFace: "Inter",
    color: colors.text,
    align: "center",
  });

  if (titleLines[1]) {
    slide.addText(titleLines[1], {
      x: 0.5,
      y: 3.7,
      w: 12.3,
      h: 0.7,
      fontSize: 44,
      fontFace: "Inter",
      color: colors.accentPrimary,
      align: "center",
    });
  }

  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 2,
      y: 4.8,
      w: 9.3,
      h: 0.6,
      fontSize: 16,
      fontFace: "Inter",
      color: colors.textMuted,
      align: "center",
    });
  }

  // Footer
  addFooter(slide, data.pageNum, "December 2025 — v10.2");
}

function createDividerSlide(slide: any, data: SlideContent) {
  slide.background = { color: colors.bgDivider };

  // Section number (large, faded)
  slide.addText(data.section || "", {
    x: 0,
    y: 2,
    w: 13.33,
    h: 1.5,
    fontSize: 120,
    fontFace: "IBM Plex Mono",
    color: colors.accentPrimary,
    align: "center",
    transparency: 80,
  });

  // Title
  slide.addText(data.title, {
    x: 0.5,
    y: 3.3,
    w: 12.3,
    h: 0.8,
    fontSize: 36,
    fontFace: "Inter",
    color: colors.text,
    align: "center",
  });

  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 2,
      y: 4.2,
      w: 9.3,
      h: 0.6,
      fontSize: 16,
      fontFace: "Inter",
      color: colors.textMuted,
      align: "center",
    });
  }

  addFooter(slide, data.pageNum, `Section ${data.section}`);
}

function createContentSlide(slide: any, data: SlideContent, pptx: any) {
  slide.background = { color: colors.bg };

  // Breadcrumb
  slide.addText(data.section || "", {
    x: 0.5,
    y: 0.3,
    w: 3,
    h: 0.25,
    fontSize: 10,
    fontFace: "IBM Plex Mono",
    bold: true,
    color: colors.accentPrimary,
  });

  slide.addText("→", {
    x: 3.5,
    y: 0.3,
    w: 0.3,
    h: 0.25,
    fontSize: 10,
    fontFace: "Inter",
    color: colors.border,
  });

  slide.addText(data.title, {
    x: 3.9,
    y: 0.3,
    w: 6,
    h: 0.25,
    fontSize: 14,
    fontFace: "Inter",
    bold: true,
    color: colors.text,
  });

  // Divider line (native line shape)
  addLine(slide, 0.5, 0.65, 12.3, colors.border, 1);

  // Subtitle if present
  let contentStartY = 0.9;
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 0.5,
      y: 0.75,
      w: 12.3,
      h: 0.3,
      fontSize: 12,
      fontFace: "Inter",
      color: colors.textMuted,
    });
    contentStartY = 1.15;
  }

  // Content varies by slide
  if (data.content) {
    renderSlideContent(slide, data, contentStartY, pptx);
  }

  addFooter(slide, data.pageNum, `Section ${data.section?.split(" ")[0]}: ${data.section?.split(" ").slice(1).join(" ")}`);
}

function renderSlideContent(slide: any, data: SlideContent, startY: number, pptx: any) {
  const content = data.content;

  // Executive Summary style (3 imperatives + callout)
  if (content.imperatives) {
    const impWidth = 4;
    content.imperatives.forEach((imp: any, i: number) => {
      const x = 0.5 + i * (impWidth + 0.15);

      // Card background
      slide.addShape("rect", {
        x: x,
        y: startY,
        w: impWidth,
        h: 2,
        fill: { color: colors.bgCard },
        line: { color: colors.border, width: 1 },
      });

      // Left accent
      slide.addShape("rect", {
        x: x,
        y: startY,
        w: 0.05,
        h: 2,
        fill: { color: colors.accentPrimary },
      });

      slide.addText(`Strategic Imperative #${i + 1}`, {
        x: x + 0.2,
        y: startY + 0.15,
        w: impWidth - 0.3,
        h: 0.25,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });

      slide.addText(imp.title, {
        x: x + 0.2,
        y: startY + 0.45,
        w: impWidth - 0.3,
        h: 0.35,
        fontSize: 16,
        fontFace: "Inter",
        bold: true,
        color: colors.text,
      });

      slide.addText(imp.desc, {
        x: x + 0.2,
        y: startY + 0.85,
        w: impWidth - 0.3,
        h: 1,
        fontSize: 11,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    // Callout
    if (content.callout) {
      addCallout(slide, content.callout, 0.5, startY + 2.2, 12.3, 1.2);
    }
  }

  // Quotes + themes style
  if (content.quotes && content.themes) {
    // Quotes panel
    slide.addShape("rect", {
      x: 0.5,
      y: startY,
      w: 6,
      h: 3.5,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Executive Priorities", {
      x: 0.7,
      y: startY + 0.15,
      w: 5.5,
      h: 0.3,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    content.quotes.forEach((q: any, i: number) => {
      const qY = startY + 0.6 + i * 0.95;
      slide.addShape("rect", {
        x: 0.7,
        y: qY,
        w: 0.04,
        h: 0.7,
        fill: { color: colors.accentPrimary },
      });
      slide.addText(q.text, {
        x: 0.9,
        y: qY,
        w: 5.3,
        h: 0.5,
        fontSize: 11,
        fontFace: "Inter",
        italic: true,
        color: colors.text,
      });
      slide.addText(q.attr, {
        x: 0.9,
        y: qY + 0.5,
        w: 5.3,
        h: 0.2,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    // Themes panel
    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 6.1,
      h: 3.5,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Dec 9 Workshop Themes", {
      x: 6.9,
      y: startY + 0.15,
      w: 5.7,
      h: 0.3,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for themes
    addBulletList(slide, content.themes, {
      x: 6.9,
      y: startY + 0.5,
      w: 5.7,
      h: 2.8,
      fontSize: 11,
      color: colors.text,
      bulletColor: colors.accentPrimary,
      lineSpacing: 14,
    });
  }

  // Platform matrix style
  if (content.onPlatform && content.offPlatform) {
    // On-platform panel
    slide.addShape("rect", {
      x: 0.5,
      y: startY,
      w: 6,
      h: 3.8,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("On-Platform (Owned)", {
      x: 0.7,
      y: startY + 0.15,
      w: 5.5,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      color: colors.textMuted,
    });

    slide.addText("Full Control, Full Context", {
      x: 0.7,
      y: startY + 0.45,
      w: 5.5,
      h: 0.35,
      fontSize: 18,
      fontFace: "Inter",
      bold: true,
      color: colors.text,
    });

    content.onPlatform.forEach((item: any, i: number) => {
      slide.addText(item.name, {
        x: 0.7,
        y: startY + 1.1 + i * 0.65,
        w: 2,
        h: 0.3,
        fontSize: 11,
        fontFace: "Inter",
        bold: true,
        color: colors.text,
      });
      slide.addText(item.desc, {
        x: 2.7,
        y: startY + 1.1 + i * 0.65,
        w: 3.5,
        h: 0.5,
        fontSize: 10,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    // Off-platform panel
    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 6.1,
      h: 3.8,
      fill: { color: colors.bgCardElevated },
      line: { color: colors.border, width: 1 },
    });

    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 0.05,
      h: 3.8,
      fill: { color: colors.accentPrimary },
    });

    slide.addText("Off-Platform (Third-Party)", {
      x: 6.9,
      y: startY + 0.15,
      w: 5.7,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      color: colors.accentPrimary,
    });

    slide.addText("Optimize for Discoverability", {
      x: 6.9,
      y: startY + 0.45,
      w: 5.7,
      h: 0.35,
      fontSize: 18,
      fontFace: "Inter",
      bold: true,
      color: colors.text,
    });

    content.offPlatform.forEach((item: any, i: number) => {
      slide.addText(item.name, {
        x: 6.9,
        y: startY + 1.1 + i * 0.65,
        w: 2,
        h: 0.3,
        fontSize: 11,
        fontFace: "Inter",
        bold: true,
        color: colors.text,
      });
      slide.addText(item.desc, {
        x: 8.9,
        y: startY + 1.1 + i * 0.65,
        w: 3.7,
        h: 0.5,
        fontSize: 10,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });
  }

  // Pillars style (4 cards)
  if (content.pillars) {
    const pillarW = 3;
    const pillarIcons = ["🛡", "🔍", "⭐", "🎯"]; // Shield, Search, Star, Target

    content.pillars.forEach((pillar: any, i: number) => {
      const x = 0.5 + i * (pillarW + 0.15);

      // Card background
      slide.addShape("rect", {
        x: x,
        y: startY,
        w: pillarW,
        h: 2.4,
        fill: { color: colors.bgCard },
        line: { color: colors.border, width: 1 },
      });

      // Icon as text symbol (centered)
      slide.addText(pillarIcons[i] || "●", {
        x: x,
        y: startY + 0.2,
        w: pillarW,
        h: 0.7,
        fontSize: 28,
        fontFace: "Segoe UI Emoji",
        color: colors.accentPrimary,
        align: "center",
        valign: "middle",
      });

      // Title
      slide.addText(pillar.title, {
        x: x + 0.15,
        y: startY + 1,
        w: pillarW - 0.3,
        h: 0.35,
        fontSize: 14,
        fontFace: "Inter",
        bold: true,
        color: colors.text,
        align: "center",
      });

      // Description
      slide.addText(pillar.desc, {
        x: x + 0.15,
        y: startY + 1.4,
        w: pillarW - 0.3,
        h: 0.9,
        fontSize: 10,
        fontFace: "Inter",
        color: colors.textMuted,
        align: "center",
      });
    });

    if (content.callout) {
      addCallout(slide, content.callout, 0.5, startY + 2.6, 12.3, 1);
    }
  }

  // Quotes + recommendations style
  if (content.quotes && content.recommendations) {
    // Quotes
    slide.addShape("rect", {
      x: 0.5,
      y: startY,
      w: 6,
      h: 3,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("What We Heard", {
      x: 0.7,
      y: startY + 0.15,
      w: 5.5,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    content.quotes.forEach((q: any, i: number) => {
      const qY = startY + 0.5 + i * 0.9;
      slide.addShape("rect", {
        x: 0.7,
        y: qY,
        w: 0.04,
        h: 0.6,
        fill: { color: colors.accentPrimary },
      });
      slide.addText(q.text, {
        x: 0.9,
        y: qY,
        w: 5.3,
        h: 0.4,
        fontSize: 10,
        fontFace: "Inter",
        italic: true,
        color: colors.text,
      });
      slide.addText(q.attr, {
        x: 0.9,
        y: qY + 0.45,
        w: 5.3,
        h: 0.2,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    // Recommendations
    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 6.1,
      h: 3,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("What We Recommend Exploring", {
      x: 6.9,
      y: startY + 0.15,
      w: 5.7,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for recommendations (with varied colors per item)
    const recColors = [colors.song, colors.song, colors.workco, colors.strategy];
    const recItems = content.recommendations.map((rec: string, i: number) => ({
      text: rec,
      options: {
        bullet: true,
        color: recColors[i] || colors.accentPrimary,
        breakLine: i < content.recommendations.length - 1,
      },
    }));
    slide.addText(recItems, {
      x: 6.9,
      y: startY + 0.45,
      w: 5.7,
      h: 2.4,
      fontSize: 10,
      fontFace: "Inter",
      color: colors.text,
      valign: "top",
      lineSpacingMultiple: 1.5,
    });
  }

  // Hypotheses + measurement style
  if (content.hypotheses && content.measurement) {
    // Hypotheses
    slide.addShape("rect", {
      x: 0.5,
      y: startY,
      w: 6,
      h: 3.3,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Hypotheses to Test", {
      x: 0.7,
      y: startY + 0.15,
      w: 5.5,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for hypotheses
    addBulletList(slide, content.hypotheses, {
      x: 0.7,
      y: startY + 0.5,
      w: 5.5,
      h: 2.6,
      fontSize: 11,
      color: colors.text,
      bulletColor: colors.accentSecondary,
      lineSpacing: 18,
    });

    // Measurement
    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 6.1,
      h: 3.3,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Measurement Approach", {
      x: 6.9,
      y: startY + 0.15,
      w: 5.7,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for measurement
    addBulletList(slide, content.measurement, {
      x: 6.9,
      y: startY + 0.5,
      w: 5.7,
      h: 2.6,
      fontSize: 11,
      color: colors.text,
      bulletColor: colors.accentPrimary,
      lineSpacing: 18,
    });
  }

  // Steps + comparison + callout style
  if (content.steps && content.comparison) {
    // Steps panel
    slide.addShape("rect", {
      x: 0.5,
      y: startY,
      w: 6,
      h: 2.4,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Initial Steps (Technical)", {
      x: 0.7,
      y: startY + 0.15,
      w: 5.5,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for steps
    addBulletList(slide, content.steps, {
      x: 0.7,
      y: startY + 0.45,
      w: 5.5,
      h: 1.9,
      fontSize: 10,
      color: colors.text,
      bulletColor: colors.accentPrimary,
      lineSpacing: 8,
    });

    // Comparison panel
    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 6.1,
      h: 2.4,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("The Machine Lane", {
      x: 6.9,
      y: startY + 0.15,
      w: 5.7,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Today column
    slide.addText("Web (Today)", {
      x: 6.9,
      y: startY + 0.5,
      w: 2.7,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });
    content.comparison.today.forEach((item: string, i: number) => {
      slide.addText(item, {
        x: 6.9,
        y: startY + 0.8 + i * 0.35,
        w: 2.7,
        h: 0.3,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    // Tomorrow column
    slide.addText("API (Tomorrow)", {
      x: 9.8,
      y: startY + 0.5,
      w: 2.8,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.accentSecondary,
    });
    content.comparison.tomorrow.forEach((item: string, i: number) => {
      slide.addText(item, {
        x: 9.8,
        y: startY + 0.8 + i * 0.35,
        w: 2.8,
        h: 0.3,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.text,
      });
    });

    if (content.callout) {
      addCallout(slide, content.callout, 0.5, startY + 2.6, 12.3, 0.9);
    }
  }

  // Phases style
  if (content.phases) {
    const phaseW = 2.4;
    content.phases.forEach((phase: any, i: number) => {
      const x = 0.5 + i * (phaseW + 0.15);

      // Top border
      slide.addShape("rect", {
        x: x,
        y: startY,
        w: phaseW,
        h: 0.08,
        fill: { color: phase.color },
      });

      slide.addShape("rect", {
        x: x,
        y: startY + 0.08,
        w: phaseW,
        h: 2,
        fill: { color: colors.bgCard },
        line: { color: colors.border, width: 1 },
      });

      slide.addText(`Phase ${phase.num}`, {
        x: x + 0.15,
        y: startY + 0.2,
        w: phaseW - 0.3,
        h: 0.25,
        fontSize: 9,
        fontFace: "IBM Plex Mono",
        bold: true,
        color: phase.color,
      });

      slide.addText(phase.name, {
        x: x + 0.15,
        y: startY + 0.5,
        w: phaseW - 0.3,
        h: 0.35,
        fontSize: 14,
        fontFace: "Inter",
        bold: true,
        color: colors.text,
      });

      slide.addText(phase.desc, {
        x: x + 0.15,
        y: startY + 0.9,
        w: phaseW - 0.3,
        h: 1,
        fontSize: 10,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    if (content.callout) {
      addCallout(slide, content.callout, 0.5, startY + 2.3, 12.3, 1);
    }
  }

  // Table style
  if (content.table) {
    const tableY = startY;
    const rowH = 0.7;
    const colWidths = [1.5, 8, 3];

    // Header
    slide.addShape("rect", {
      x: 0.5,
      y: tableY,
      w: 12.3,
      h: 0.4,
      fill: { color: colors.bgCard },
    });

    slide.addText("Phase", {
      x: 0.6,
      y: tableY + 0.1,
      w: colWidths[0],
      h: 0.25,
      fontSize: 9,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    slide.addText("Initiatives", {
      x: 2.2,
      y: tableY + 0.1,
      w: colWidths[1],
      h: 0.25,
      fontSize: 9,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    slide.addText("Outcomes", {
      x: 10.3,
      y: tableY + 0.1,
      w: colWidths[2],
      h: 0.25,
      fontSize: 9,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Rows
    content.table.forEach((row: any, i: number) => {
      const y = tableY + 0.5 + i * rowH;
      const phaseColors = [colors.positive, colors.accentPrimary, colors.song, colors.accentSecondary, colors.accentSecondary];

      // Row background
      slide.addShape("rect", {
        x: 0.5,
        y: y,
        w: 12.3,
        h: rowH - 0.05,
        fill: { color: i % 2 === 0 ? colors.bg : colors.bgCard },
        line: { color: colors.border, width: 0.5 },
      });

      // Phase badge
      slide.addShape("rect", {
        x: 0.6,
        y: y + 0.15,
        w: 0.9,
        h: 0.25,
        fill: { type: "solid", color: colors.bg },
        line: { color: phaseColors[i], width: 1 },
      });
      slide.addText(row.phase, {
        x: 0.6,
        y: y + 0.15,
        w: 0.9,
        h: 0.25,
        fontSize: 8,
        fontFace: "IBM Plex Mono",
        bold: true,
        color: phaseColors[i],
        align: "center",
      });

      // Initiatives
      slide.addText(row.initiatives, {
        x: 2.2,
        y: y + 0.1,
        w: 7.8,
        h: rowH - 0.15,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });

      // Outcome
      slide.addText(row.outcome, {
        x: 10.3,
        y: y + 0.1,
        w: 2.4,
        h: rowH - 0.15,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });
  }

  // Build/Buy/Partner options style
  if (content.options && content.questions) {
    const optW = 4;
    content.options.forEach((opt: any, i: number) => {
      const x = 0.5 + i * (optW + 0.15);

      // Card with left accent
      slide.addShape("rect", {
        x: x,
        y: startY,
        w: optW,
        h: 2.2,
        fill: { color: colors.bgCard },
        line: { color: colors.border, width: 1 },
      });

      slide.addShape("rect", {
        x: x,
        y: startY,
        w: 0.05,
        h: 2.2,
        fill: { color: opt.color },
      });

      slide.addText(opt.type, {
        x: x + 0.2,
        y: startY + 0.15,
        w: optW - 0.3,
        h: 0.3,
        fontSize: 11,
        fontFace: "Inter",
        bold: true,
        color: opt.color,
      });

      // Native bullet list for option items
      addBulletList(slide, opt.items, {
        x: x + 0.2,
        y: startY + 0.55,
        w: optW - 0.4,
        h: 1.5,
        fontSize: 10,
        color: colors.text,
        bulletColor: opt.color,
        lineSpacing: 10,
      });
    });

    // Questions panel
    slide.addShape("rect", {
      x: 0.5,
      y: startY + 2.4,
      w: 12.3,
      h: 1.4,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Questions to Resolve", {
      x: 0.7,
      y: startY + 2.55,
      w: 5.5,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet lists for questions (2 columns)
    const leftQuestions = content.questions.slice(0, 2);
    const rightQuestions = content.questions.slice(2, 4);

    addBulletList(slide, leftQuestions, {
      x: 0.7,
      y: startY + 2.85,
      w: 5.8,
      h: 0.9,
      fontSize: 10,
      color: colors.text,
      bulletColor: colors.accentSecondary,
      lineSpacing: 10,
    });

    if (rightQuestions.length > 0) {
      addBulletList(slide, rightQuestions, {
        x: 6.9,
        y: startY + 2.85,
        w: 5.8,
        h: 0.9,
        fontSize: 10,
        color: colors.text,
        bulletColor: colors.accentSecondary,
        lineSpacing: 10,
      });
    }
  }

  // Decision matrix style
  if (content.matrix) {
    const tableY = startY;
    const rowH = 0.65;

    // Header
    slide.addShape("rect", {
      x: 0.5,
      y: tableY,
      w: 12.3,
      h: 0.4,
      fill: { color: colors.bgCard },
    });

    const headers = ["Capability", "Approach", "Rationale"];
    const headerX = [0.6, 3.3, 5];
    const headerW = [2.5, 1.5, 7.5];
    headers.forEach((h, i) => {
      slide.addText(h, {
        x: headerX[i],
        y: tableY + 0.1,
        w: headerW[i],
        h: 0.25,
        fontSize: 9,
        fontFace: "Inter",
        bold: true,
        color: colors.textMuted,
      });
    });

    content.matrix.forEach((row: any, i: number) => {
      const y = tableY + 0.5 + i * rowH;
      const badgeColors: any = { "Build": colors.song, "Buy": colors.accentPrimary, "Buy + Build": colors.accentPrimary, "Partner": colors.strategy };

      slide.addShape("rect", {
        x: 0.5,
        y: y,
        w: 12.3,
        h: rowH - 0.05,
        fill: { color: i % 2 === 0 ? colors.bg : colors.bgCard },
        line: { color: colors.border, width: 0.5 },
      });

      slide.addText(row.capability, {
        x: 0.6,
        y: y + 0.15,
        w: 2.5,
        h: 0.35,
        fontSize: 10,
        fontFace: "Inter",
        bold: true,
        color: colors.text,
      });

      // Approach badge
      slide.addShape("rect", {
        x: 3.3,
        y: y + 0.15,
        w: 1.2,
        h: 0.3,
        fill: { type: "solid", color: colors.bg },
        line: { color: badgeColors[row.approach] || colors.accentPrimary, width: 1 },
      });
      slide.addText(row.approach, {
        x: 3.3,
        y: y + 0.15,
        w: 1.2,
        h: 0.3,
        fontSize: 8,
        fontFace: "Inter",
        bold: true,
        color: badgeColors[row.approach] || colors.accentPrimary,
        align: "center",
      });

      slide.addText(row.rationale, {
        x: 5,
        y: y + 0.1,
        w: 7.7,
        h: rowH - 0.15,
        fontSize: 9,
        fontFace: "Inter",
        color: colors.textMuted,
      });
    });

    if (content.callout) {
      addCallout(slide, content.callout, 0.5, startY + 3.8, 12.3, 0.9);
    }
  }

  // Accenture value + actions style
  if (content.accenture && content.actions) {
    // Accenture panel
    slide.addShape("rect", {
      x: 0.5,
      y: startY,
      w: 6,
      h: 2.8,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("What Accenture Brings", {
      x: 0.7,
      y: startY + 0.15,
      w: 5.5,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for Accenture items
    addBulletList(slide, content.accenture, {
      x: 0.7,
      y: startY + 0.45,
      w: 5.5,
      h: 2.2,
      fontSize: 10,
      color: colors.text,
      bulletColor: colors.song,
      lineSpacing: 12,
    });

    // Actions panel
    slide.addShape("rect", {
      x: 6.7,
      y: startY,
      w: 6.1,
      h: 2.8,
      fill: { color: colors.bgCard },
      line: { color: colors.border, width: 1 },
    });

    slide.addText("Recommended Actions", {
      x: 6.9,
      y: startY + 0.15,
      w: 5.7,
      h: 0.25,
      fontSize: 10,
      fontFace: "Inter",
      bold: true,
      color: colors.textMuted,
    });

    // Native bullet list for actions
    addBulletList(slide, content.actions, {
      x: 6.9,
      y: startY + 0.45,
      w: 5.7,
      h: 2.2,
      fontSize: 10,
      color: colors.text,
      bulletColor: colors.accentPrimary,
      lineSpacing: 12,
    });

    if (content.callout) {
      addCallout(slide, content.callout, 0.5, startY + 3, 12.3, 1);
    }
  }
}

function addCallout(slide: any, text: string, x: number, y: number, w: number, h: number) {
  // Background - subtle cyan tint matching HTML's rgba(34, 211, 238, 0.15)
  slide.addShape("rect", {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: "0f2937" }, // Very subtle cyan-tinted dark
    line: { color: colors.border, width: 0.5 },
  });

  // Left accent bar - thicker to match HTML's 4px border
  slide.addShape("rect", {
    x: x,
    y: y,
    w: 0.08,
    h: h,
    fill: { color: colors.accentPrimary },
  });

  slide.addText(text, {
    x: x + 0.3,
    y: y + 0.15,
    w: w - 0.5,
    h: h - 0.3,
    fontSize: 11,
    fontFace: "Inter",
    color: colors.text,
  });
}

function addFooter(slide: any, pageNum: string, caption: string) {
  // Divider line (native line shape)
  addLine(slide, 0.5, 6.9, 12.3, colors.border, 0.5);

  slide.addText(pageNum, {
    x: 0.5,
    y: 7,
    w: 2,
    h: 0.25,
    fontSize: 10,
    fontFace: "IBM Plex Mono",
    color: colors.textMuted,
  });

  slide.addText(caption, {
    x: 10,
    y: 7,
    w: 2.8,
    h: 0.25,
    fontSize: 10,
    fontFace: "Inter",
    color: colors.textMuted,
    align: "right",
  });
}

generateDiscoveryDeck().catch(console.error);
