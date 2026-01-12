import PptxGenJSImport from "pptxgenjs";
import * as path from "path";

// Handle both default export and namespace export
const PptxGenJS = (PptxGenJSImport as any).default || PptxGenJSImport;

// Color palette
const colors = {
  navy: "1a365d",
  teal: "0d9488",
  tealLight: "14b8a6",
  cyan: "0891b2",
  cyanDark: "0e7490",
  slate: "64748b",
  slateLight: "f1f5f9",
  slateMed: "e2e8f0",
  white: "FFFFFF",
  black: "000000",
  // Vendor colors
  adobe: "ff0000",
  sap: "0070f2",
  msft: "0078d4",
  signifyd: "00d4aa",
  adyen: "0abf53",
  emerald: "059669",
  purple: "7c3aed",
  orange: "ea580c",
  pink: "db2777",
  indigo: "4f46e5",
  rose: "e11d48",
};

async function generateArchitectureSlide() {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.author = "Accenture";
  pptx.title = "Microsoft Store - Composable Commerce Reference Architecture";
  pptx.subject = "Future State Architecture";
  pptx.company = "Accenture";
  pptx.layout = "LAYOUT_WIDE"; // 13.33" x 7.5"

  const slide = pptx.addSlide();

  // ============ HEADER ============
  // Title
  slide.addText("Microsoft Store Composable Commerce Architecture", {
    x: 0.4,
    y: 0.25,
    w: 9,
    h: 0.5,
    fontSize: 24,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.navy,
  });

  // Subtitle
  slide.addText("Future State Reference Architecture | Outsourcing Assessment", {
    x: 0.4,
    y: 0.7,
    w: 6,
    h: 0.25,
    fontSize: 11,
    fontFace: "Segoe UI",
    color: colors.slate,
  });

  // Future State Label
  slide.addText("FUTURE STATE", {
    x: 11,
    y: 0.3,
    w: 2,
    h: 0.35,
    fontSize: 16,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.teal,
    align: "right",
  });

  slide.addText("December 2024", {
    x: 11,
    y: 0.6,
    w: 2,
    h: 0.2,
    fontSize: 9,
    fontFace: "Segoe UI",
    color: colors.slate,
    align: "right",
  });

  // ============ CLOUD LAYER ============
  const cloudY = 1.0;

  // Cloud background
  slide.addShape("rect", {
    x: 0.4,
    y: cloudY,
    w: 12.5,
    h: 0.9,
    fill: { color: colors.slateLight },
    line: { color: colors.slateMed, width: 1 },
  });

  slide.addText("Cloud (Azure Primary)", {
    x: 0.5,
    y: cloudY + 0.05,
    w: 2,
    h: 0.2,
    fontSize: 8,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.slate,
  });

  // Channel boxes
  const channels = [
    { label: "Website", sub: "microsoft.com/store" },
    { label: "Mobile Web", sub: "Responsive" },
    { label: "Store Assistant", sub: "AI Chatbot" },
    { label: "Copilot", sub: "Embedded Commerce", highlight: true },
    { label: "Agentic / AEO", sub: "LLM Discovery", highlight: true },
    { label: "Social", sub: "Marketplace" },
  ];

  const channelWidth = 1.95;
  const channelStartX = 0.5;
  channels.forEach((ch, i) => {
    const lineOpts: any = { color: ch.highlight ? colors.orange : "5eead4", width: 1.5 };
    if (ch.highlight) {
      lineOpts.dashType = "dash";
    }
    slide.addShape("rect", {
      x: channelStartX + i * (channelWidth + 0.1),
      y: cloudY + 0.3,
      w: channelWidth,
      h: 0.5,
      fill: { color: ch.highlight ? "fff7ed" : "f0fdfa" },
      line: lineOpts,
    });
    slide.addText(ch.label, {
      x: channelStartX + i * (channelWidth + 0.1),
      y: cloudY + 0.32,
      w: channelWidth,
      h: 0.25,
      fontSize: 10,
      fontFace: "Segoe UI",
      bold: true,
      color: ch.highlight ? colors.orange : colors.navy,
      align: "center",
    });
    slide.addText(ch.sub, {
      x: channelStartX + i * (channelWidth + 0.1),
      y: cloudY + 0.52,
      w: channelWidth,
      h: 0.2,
      fontSize: 8,
      fontFace: "Segoe UI",
      color: ch.highlight ? colors.orange : colors.slate,
      align: "center",
    });
  });

  // ============ CDN & API GATEWAY ============
  const cdnY = 1.95;

  slide.addShape("rect", {
    x: 0.4,
    y: cdnY,
    w: 12.5,
    h: 0.25,
    fill: { color: colors.cyan },
  });
  slide.addText("CDN (Azure Front Door)", {
    x: 0.4,
    y: cdnY,
    w: 12.5,
    h: 0.25,
    fontSize: 9,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  slide.addShape("rect", {
    x: 0.4,
    y: cdnY + 0.3,
    w: 12.5,
    h: 0.25,
    fill: { color: colors.cyanDark },
  });
  slide.addText("API Gateway (Azure API Management)", {
    x: 0.4,
    y: cdnY + 0.3,
    w: 12.5,
    h: 0.25,
    fontSize: 9,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  // ============ ORCHESTRATION LAYER 1 ============
  const orchY = 2.55;

  slide.addShape("rect", {
    x: 0.4,
    y: orchY,
    w: 12.5,
    h: 0.28,
    fill: { type: "solid", color: colors.teal },
  });
  slide.addText("Orchestration Layer (Events, Notifications, Pub-Sub, Message Queues)", {
    x: 0.4,
    y: orchY,
    w: 12.5,
    h: 0.28,
    fontSize: 9,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  // ============ DOMAIN COLUMNS ============
  const domainY = 2.9;
  const domainHeight = 2.2;
  const domainWidth = 2.35;
  const domainGap = 0.1;
  const startX = 0.65;

  const domains = [
    {
      name: "CONTENT DOMAIN",
      services: [
        { name: "Content & Experience Mgmt", sub: "Web Templates • Digital Assets", vendors: ["Adobe AEM"], status: "RETAIN" },
        { name: "Content Personalization", sub: "A/B Testing • Targeting", vendors: ["Adobe Target"] },
        { name: "DAM", sub: "Digital Asset Repository", vendors: ["AEM Assets"] },
      ],
    },
    {
      name: "COMMERCE DOMAIN",
      services: [
        { name: "Headless Commerce Platform", sub: "Cart • Checkout • Payment", vendors: ["Adobe", "SAP", "BigCommerce"] },
        { name: "Pricing & Promotions", sub: "Dynamic Pricing • Trade-In", vendors: ["Platform Native"] },
        { name: "Search & Merchandising", sub: "AI Search • Facets", vendors: ["Algolia", "Bloomreach"] },
      ],
    },
    {
      name: "CATALOGUE DOMAIN",
      services: [
        { name: "Product Information Mgmt", sub: "Catalog • Dropship", vendors: ["Syndigo", "Salsify", "Stibo"] },
        { name: "Recommendation Engine", sub: "Upsell / Cross-sell", vendors: ["Adobe Sensei"] },
        { name: "Catalogue Services", sub: "Data Aggregation", vendors: ["Platform Native"] },
      ],
    },
    {
      name: "MARKETING DOMAIN",
      services: [
        { name: "Journey Orchestration", sub: "Campaigns • Cross-Channel", vendors: ["Adobe AJO", "Braze"] },
        { name: "Loyalty & Offers", sub: "Rewards • Vouchers", vendors: ["TBD"] },
        { name: "DMP / Audience Mgmt", sub: "Data Management", vendors: ["Adobe Audience"] },
      ],
    },
    {
      name: "CUSTOMER DOMAIN",
      services: [
        { name: "Customer Data Platform", sub: "Unified Profiles • Identity", vendors: ["RT-CDP", "Segment", "Tealium"] },
        { name: "CRM / Account Services", sub: "CIAM • Profile", vendors: ["SAP CRM"] },
        { name: "Social Media Mgmt", sub: "Listening • Analytics", vendors: ["TBD"] },
      ],
    },
  ];

  // Engagement Layer label (horizontal, left side)
  slide.addShape("rect", {
    x: 0.15,
    y: domainY + 0.8,
    w: 0.42,
    h: 1.2,
    fill: { color: "f1f5f9" },
    line: { color: colors.slateMed, width: 0.5 },
  });
  slide.addText("E\nN\nG\nA\nG\nE\nM\nE\nN\nT", {
    x: 0.15,
    y: domainY + 0.85,
    w: 0.42,
    h: 1.1,
    fontSize: 7,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.slate,
    align: "center",
    valign: "middle",
  });

  domains.forEach((domain, domainIdx) => {
    const x = startX + domainIdx * (domainWidth + domainGap);

    // Domain header
    slide.addShape("rect", {
      x: x,
      y: domainY,
      w: domainWidth,
      h: 0.3,
      fill: { color: "1e293b" },
    });
    slide.addText(domain.name, {
      x: x,
      y: domainY,
      w: domainWidth,
      h: 0.3,
      fontSize: 9,
      fontFace: "Segoe UI",
      bold: true,
      color: colors.white,
      align: "center",
      valign: "middle",
    });

    // Domain content area
    slide.addShape("rect", {
      x: x,
      y: domainY + 0.3,
      w: domainWidth,
      h: domainHeight - 0.3,
      fill: { color: "f8fafc" },
      line: { color: colors.slateMed, width: 1 },
    });

    // Services
    domain.services.forEach((service, svcIdx) => {
      const svcY = domainY + 0.4 + svcIdx * 0.62;
      const svcH = 0.58;

      // Service box
      slide.addShape("rect", {
        x: x + 0.08,
        y: svcY,
        w: domainWidth - 0.16,
        h: svcH,
        fill: { color: "e0f2fe" },
        line: { color: "7dd3fc", width: 0.5 },
      });

      // Service name
      slide.addText(service.name, {
        x: x + 0.08,
        y: svcY + 0.04,
        w: domainWidth - 0.16,
        h: 0.18,
        fontSize: 8,
        fontFace: "Segoe UI",
        bold: true,
        color: colors.navy,
        align: "center",
      });

      // Service sub
      slide.addText(service.sub, {
        x: x + 0.08,
        y: svcY + 0.2,
        w: domainWidth - 0.16,
        h: 0.15,
        fontSize: 7,
        fontFace: "Segoe UI",
        color: colors.slate,
        align: "center",
      });

      // Vendors
      const vendorText = service.vendors.join(" | ");
      slide.addText(vendorText, {
        x: x + 0.08,
        y: svcY + 0.38,
        w: domainWidth - 0.16,
        h: 0.15,
        fontSize: 7,
        fontFace: "Segoe UI",
        bold: true,
        color: colors.teal,
        align: "center",
      });

      // Status badge if exists
      if (service.status) {
        slide.addShape("rect", {
          x: x + domainWidth - 0.55,
          y: svcY + 0.02,
          w: 0.45,
          h: 0.15,
          fill: { color: colors.emerald },
        });
        slide.addText(service.status, {
          x: x + domainWidth - 0.55,
          y: svcY + 0.02,
          w: 0.45,
          h: 0.15,
          fontSize: 6,
          fontFace: "Segoe UI",
          bold: true,
          color: colors.white,
          align: "center",
          valign: "middle",
        });
      }
    });
  });

  // ============ INTEGRATION LAYER ============
  const intY = 5.15;

  slide.addShape("rect", {
    x: 0.4,
    y: intY,
    w: 12.5,
    h: 0.28,
    fill: { color: colors.teal },
  });
  slide.addText("Integration Layer (ESB / iPaaS / Azure Integration Services)", {
    x: 0.4,
    y: intY,
    w: 12.5,
    h: 0.28,
    fontSize: 9,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  // ============ BACKEND LAYER ============
  const backendY = 5.5;
  const backendHeight = 1.05;

  // Backend Layer label (vertical text as stacked letters)
  slide.addShape("rect", {
    x: 0.15,
    y: backendY + 0.1,
    w: 0.42,
    h: 0.9,
    fill: { color: "f1f5f9" },
    line: { color: colors.slateMed, width: 0.5 },
  });
  slide.addText("B\nA\nC\nK\nE\nN\nD", {
    x: 0.15,
    y: backendY + 0.15,
    w: 0.42,
    h: 0.8,
    fontSize: 7,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.slate,
    align: "center",
    valign: "middle",
  });

  // Payments & Trust Section
  const payX = 0.65;
  const payW = 4;

  slide.addShape("rect", {
    x: payX,
    y: backendY,
    w: payW,
    h: 0.25,
    fill: { color: "475569" },
  });
  slide.addText("PAYMENTS & TRUST", {
    x: payX,
    y: backendY,
    w: payW,
    h: 0.25,
    fontSize: 8,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  slide.addShape("rect", {
    x: payX,
    y: backendY + 0.25,
    w: payW,
    h: backendHeight - 0.25,
    fill: { color: "f8fafc" },
    line: { color: colors.slateMed, width: 1 },
  });

  // Payment boxes
  const payBoxes = [
    { name: "Payment Processing", sub: "Cards • Wallets • BNPL", vendor: "Adyen", status: "RETAIN" },
    { name: "Fraud Prevention", sub: "AI/ML Detection", vendor: "Signifyd | Forter" },
    { name: "Gift Card Services", sub: "Issuance • Balance", vendor: "Blackhawk" },
  ];

  payBoxes.forEach((box, i) => {
    const bx = payX + 0.08 + i * 1.3;
    slide.addShape("rect", {
      x: bx,
      y: backendY + 0.33,
      w: 1.22,
      h: 0.65,
      fill: { color: colors.cyanDark },
    });
    slide.addText(box.name, {
      x: bx,
      y: backendY + 0.36,
      w: 1.22,
      h: 0.18,
      fontSize: 7,
      fontFace: "Segoe UI",
      bold: true,
      color: colors.white,
      align: "center",
    });
    slide.addText(box.sub, {
      x: bx,
      y: backendY + 0.52,
      w: 1.22,
      h: 0.15,
      fontSize: 6,
      fontFace: "Segoe UI",
      color: "a5f3fc",
      align: "center",
    });
    slide.addText(box.vendor, {
      x: bx,
      y: backendY + 0.72,
      w: 1.22,
      h: 0.15,
      fontSize: 6,
      fontFace: "Segoe UI",
      bold: true,
      color: "67e8f9",
      align: "center",
    });
    if (box.status) {
      slide.addShape("rect", {
        x: bx + 0.75,
        y: backendY + 0.35,
        w: 0.42,
        h: 0.12,
        fill: { color: colors.emerald },
      });
      slide.addText(box.status, {
        x: bx + 0.75,
        y: backendY + 0.35,
        w: 0.42,
        h: 0.12,
        fontSize: 5,
        fontFace: "Segoe UI",
        bold: true,
        color: colors.white,
        align: "center",
        valign: "middle",
      });
    }
  });

  // Order Management Section
  const omsX = 4.8;
  const omsW = 4.2;

  slide.addShape("rect", {
    x: omsX,
    y: backendY,
    w: omsW,
    h: 0.25,
    fill: { color: "475569" },
  });
  slide.addText("ORDER MANAGEMENT", {
    x: omsX,
    y: backendY,
    w: omsW,
    h: 0.25,
    fontSize: 8,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  slide.addShape("rect", {
    x: omsX,
    y: backendY + 0.25,
    w: omsW,
    h: backendHeight - 0.25,
    fill: { color: "f8fafc" },
    line: { color: colors.slateMed, width: 1 },
  });

  // OMS boxes
  const omsBoxes = ["Unified Inventory\nVisibility", "Order\nOrchestration", "Cross-Channel\nOrder History"];
  omsBoxes.forEach((box, i) => {
    slide.addShape("rect", {
      x: omsX + 0.1 + i * 1.35,
      y: backendY + 0.33,
      w: 1.28,
      h: 0.4,
      fill: { color: i === 0 ? "0891b2" : i === 1 ? "0e7490" : "155e75" },
    });
    slide.addText(box, {
      x: omsX + 0.1 + i * 1.35,
      y: backendY + 0.33,
      w: 1.28,
      h: 0.4,
      fontSize: 7,
      fontFace: "Segoe UI",
      bold: true,
      color: colors.white,
      align: "center",
      valign: "middle",
    });
  });

  slide.addText("IBM Sterling | Manhattan | Fluent", {
    x: omsX,
    y: backendY + 0.78,
    w: omsW,
    h: 0.18,
    fontSize: 7,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.teal,
    align: "center",
  });

  // Influence badge
  slide.addShape("rect", {
    x: omsX + omsW - 0.7,
    y: backendY + 0.03,
    w: 0.62,
    h: 0.18,
    fill: { color: colors.purple },
  });
  slide.addText("INFLUENCE", {
    x: omsX + omsW - 0.7,
    y: backendY + 0.03,
    w: 0.62,
    h: 0.18,
    fontSize: 6,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  // Analytics Section
  const anaX = 9.15;
  const anaW = 3.75;

  slide.addShape("rect", {
    x: anaX,
    y: backendY,
    w: anaW,
    h: 0.25,
    fill: { color: "475569" },
  });
  slide.addText("ANALYTICS DOMAIN", {
    x: anaX,
    y: backendY,
    w: anaW,
    h: 0.25,
    fontSize: 8,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.white,
    align: "center",
    valign: "middle",
  });

  slide.addShape("rect", {
    x: anaX,
    y: backendY + 0.25,
    w: anaW,
    h: backendHeight - 0.25,
    fill: { color: "f8fafc" },
    line: { color: colors.slateMed, width: 1 },
  });

  // Analytics boxes
  const anaBoxes = [
    { name: "Web Analytics", sub: "Tracking • Funnel", vendor: "Adobe Analytics" },
    { name: "BI / Reporting", sub: "Dashboards • Insights", vendor: "Power BI" },
  ];
  anaBoxes.forEach((box, i) => {
    slide.addShape("rect", {
      x: anaX + 0.1 + i * 1.8,
      y: backendY + 0.33,
      w: 1.7,
      h: 0.58,
      fill: { color: "e0f2fe" },
      line: { color: "7dd3fc", width: 0.5 },
    });
    slide.addText(box.name, {
      x: anaX + 0.1 + i * 1.8,
      y: backendY + 0.36,
      w: 1.7,
      h: 0.18,
      fontSize: 8,
      fontFace: "Segoe UI",
      bold: true,
      color: colors.navy,
      align: "center",
    });
    slide.addText(box.sub, {
      x: anaX + 0.1 + i * 1.8,
      y: backendY + 0.52,
      w: 1.7,
      h: 0.15,
      fontSize: 7,
      fontFace: "Segoe UI",
      color: colors.slate,
      align: "center",
    });
    slide.addText(box.vendor, {
      x: anaX + 0.1 + i * 1.8,
      y: backendY + 0.72,
      w: 1.7,
      h: 0.15,
      fontSize: 7,
      fontFace: "Segoe UI",
      bold: true,
      color: colors.teal,
      align: "center",
    });
  });

  // ============ ENTERPRISE SYSTEMS ROW ============
  const entY = 6.6;
  const entBoxW = 2;
  const entSystems = [
    { name: "Subscription", sub: "Subscription Mgmt." },
    { name: "WMS", sub: "Fulfillment Logistics" },
    { name: "SAP CAR", sub: "Customer Activity" },
    { name: "ERP", sub: "Accounting, PLM, Mfg." },
    { name: "MDM", sub: "Master Data Governance" },
    { name: "Tax", sub: "Tax Compliance" },
  ];

  entSystems.forEach((sys, i) => {
    slide.addShape("rect", {
      x: 0.65 + i * (entBoxW + 0.1),
      y: entY,
      w: entBoxW,
      h: 0.5,
      fill: { color: "1e3a5f" },
    });
    slide.addText(sys.name, {
      x: 0.65 + i * (entBoxW + 0.1),
      y: entY + 0.05,
      w: entBoxW,
      h: 0.22,
      fontSize: 9,
      fontFace: "Segoe UI",
      bold: true,
      color: colors.white,
      align: "center",
    });
    slide.addText(sys.sub, {
      x: 0.65 + i * (entBoxW + 0.1),
      y: entY + 0.27,
      w: entBoxW,
      h: 0.18,
      fontSize: 7,
      fontFace: "Segoe UI",
      color: "94a3b8",
      align: "center",
    });
  });

  // ============ LEGEND ============
  const legY = 7.18;

  slide.addText("Legend:", {
    x: 0.4,
    y: legY,
    w: 0.6,
    h: 0.2,
    fontSize: 8,
    fontFace: "Segoe UI",
    bold: true,
    color: colors.slate,
  });

  const legendItems = [
    { color: colors.emerald, label: "Retain / Keep" },
    { color: colors.teal, label: "Outsource (3rd Party SaaS)" },
    { color: colors.purple, label: "Influence (Enterprise)" },
    { color: colors.orange, label: "New Capability" },
  ];

  legendItems.forEach((item, i) => {
    slide.addShape("rect", {
      x: 1.1 + i * 2.2,
      y: legY + 0.02,
      w: 0.15,
      h: 0.15,
      fill: { color: item.color },
    });
    slide.addText(item.label, {
      x: 1.3 + i * 2.2,
      y: legY,
      w: 1.8,
      h: 0.2,
      fontSize: 8,
      fontFace: "Segoe UI",
      color: colors.slate,
    });
  });

  // Footer
  slide.addText("Microsoft Store Platform Operations | Accenture", {
    x: 10,
    y: legY,
    w: 3,
    h: 0.2,
    fontSize: 8,
    fontFace: "Segoe UI",
    color: colors.slate,
    align: "right",
  });

  // Save the file
  const outputPath = path.join(
    process.cwd(),
    "projects/msft/decks/msft-store-platform-reference-architecture-v2.pptx"
  );

  await pptx.writeFile({ fileName: outputPath });
  console.log(`PowerPoint saved to: ${outputPath}`);
}

generateArchitectureSlide().catch(console.error);
