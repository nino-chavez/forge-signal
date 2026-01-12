import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = '/Users/nino/Workspace/dev/apps/signal-forge/projects/signet/aeo/v4/handoff/index.html';
const OUTPUT_DIR = '/Users/nino/Workspace/dev/apps/signal-forge/projects/signet/aeo/v4/handoff';

interface ContentRange {
  start: number; // 0-indexed line number
  end: number;   // 0-indexed line number (exclusive)
}

interface Section {
  filename: string;
  title: string;
  ranges: ContentRange[]; // Multiple non-contiguous ranges
  includeDocHeader: boolean; // Whether to include the main h1 and metadata
}

interface NavItem {
  filename: string;
  title: string;
}

// Define sections based on user requirements
const sections: Section[] = [
  {
    filename: '00-executive-summary.html',
    title: 'Executive Summary',
    ranges: [
      { start: 729, end: 883 },   // Main content start through Business Context (includes h1, metadata, Executive Summary, Week 1-2 Deliverables, Exit Criteria, Architecture Diagrams Reference, Business Context)
      { start: 1714, end: 1985 }, // Stakeholder Map & Dependencies through end of Week 1-2 Action Plan
    ],
    includeDocHeader: true
  },
  {
    filename: '01-architecture-design.html',
    title: 'Technical Architecture',
    ranges: [
      { start: 883, end: 1081 },   // Technical Architecture (C4) and ADRs
      { start: 1642, end: 1714 },  // Technology Stack Deep Dive
      { start: 1985, end: 2072 },  // Technical Deep Dives
    ],
    includeDocHeader: false
  },
  {
    filename: '02-implementation-guide.html',
    title: 'Implementation Guide',
    ranges: [
      { start: 1081, end: 1642 },  // Data Flows, Integration Requirements, Design Phase Deliverables
      { start: 2072, end: 2129 },  // Common Pitfalls & How to Avoid
    ],
    includeDocHeader: false
  },
  {
    filename: '03-lambda-patterns.html',
    title: 'Lambda Implementation Patterns',
    ranges: [
      { start: 2129, end: 2793 },  // Appendix E: Lambda Implementation Patterns
    ],
    includeDocHeader: false
  },
  {
    filename: '04-operations-testing.html',
    title: 'Operations & Testing',
    ranges: [
      { start: 2793, end: 3789 },  // Appendix F, G, H, I
    ],
    includeDocHeader: false
  },
  {
    filename: '05-api-specifications.html',
    title: 'API Specifications',
    ranges: [
      { start: 3789, end: -1 },    // Appendix J (to end of file, -1 means end)
    ],
    includeDocHeader: false
  }
];

const navItems: NavItem[] = sections.map(s => ({
  filename: s.filename,
  title: s.title
}));

function generateNavigation(currentFilename: string): string {
  let nav = `
    <div class="nav-section">
      <div class="nav-section-title">Document Navigation</div>`;

  for (const item of navItems) {
    const activeClass = item.filename === currentFilename ? ' active' : '';
    nav += `
      <a href="${item.filename}" class="nav-link${activeClass}">${item.title}</a>`;
  }

  nav += `
    </div>`;

  return nav;
}

async function main() {
  console.log('Reading source file...');
  const content = fs.readFileSync(INPUT_FILE, 'utf-8');
  const lines = content.split('\n');

  // Find where the CSS ends
  const styleStartLine = lines.findIndex(line => line.includes('<style>'));
  const styleEndLine = lines.findIndex(line => line.trim() === '</style>');

  console.log(`Style block: lines ${styleStartLine}-${styleEndLine}`);

  // Extract the CSS block and header
  const cssBlock = lines.slice(styleStartLine, styleEndLine + 1).join('\n');
  const headerBlock = lines.slice(0, styleStartLine).join('\n');

  for (const section of sections) {
    console.log(`\nProcessing: ${section.filename}`);

    // Collect content from multiple ranges
    let sectionContent = '';
    for (const range of section.ranges) {
      const actualEnd = range.end === -1 ? lines.length : range.end;
      const rangeContent = lines.slice(range.start, actualEnd).join('\n');
      sectionContent += rangeContent;
      if (section.ranges.indexOf(range) < section.ranges.length - 1) {
        // Add a separator between non-contiguous sections (optional)
        sectionContent += '\n';
      }
      console.log(`  Range: lines ${range.start + 1}-${actualEnd} (file line numbers)`);
    }

    // Build the complete HTML file
    let html = headerBlock;
    html += cssBlock;
    html += `
</head>
<body>
    <div class="layout">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h1>AEO Optimization Service: Technical Handoff</h1>
                <div class="doc-type">AEO Optimization Service</div>
            </div>

`;

    // Add document navigation
    html += generateNavigation(section.filename);

    html += `
        </aside>

`;

    // For the first section, content already includes <main class="main-content">
    // For other sections, we need to add it
    if (section.includeDocHeader) {
      html += '        <!-- Main Content -->\n        ';
      html += sectionContent;
    } else {
      html += `        <!-- Main Content -->
        <main class="main-content">
`;
      html += sectionContent;
      html += `
        </main>`;
    }

    html += `
    </div>
</body>
</html>`;

    // Write the file
    const outputPath = path.join(OUTPUT_DIR, section.filename);
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`  Written: ${outputPath}`);
  }

  console.log('\nAll files created successfully!');
}

main().catch(console.error);
