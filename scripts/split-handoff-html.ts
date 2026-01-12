import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = '/Users/nino/Workspace/dev/apps/signal-forge/projects/signet/aeo/v4/handoff/index.html';
const OUTPUT_DIR = '/Users/nino/Workspace/dev/apps/signal-forge/projects/signet/aeo/v4/handoff';

interface Section {
  filename: string;
  title: string;
  startLine: number;
  endLine: number | null;
  h2Ids: string[];
  includeDocHeader: boolean; // Whether to include the main h1 and metadata
}

// Section boundaries - custom organization based on content grouping
const sections: Section[] = [
  {
    filename: '00-executive-summary.html',
    title: 'Executive Summary',
    // Includes: Executive Summary, Week 1-2 Deliverables, Exit Criteria, Business Context,
    //           Stakeholder Map, Risk Management, Week 1-2 Action Plan
    startLine: 729, // Line with <main class="main-content"> (0-indexed: line 730 in file)
    endLine: 1985, // Line before <h2 id="technical-deep-dives"> (0-indexed: line 1986 in file)
    h2Ids: ['executive-summary', 'architecture-diagrams-reference', 'business-context',
            'stakeholder-map-amp-dependencies', 'risk-management', 'week-1-2-action-plan'],
    includeDocHeader: true
  },
  {
    filename: '01-architecture-design.html',
    title: 'Technical Architecture',
    // Includes: Technical Architecture (C4), ADRs, Technology Stack Deep Dive, Technical Deep Dives
    startLine: 883, // <h2 id="technical-architecture"> (0-indexed: line 884 in file)
    endLine: 1714, // Line before <h2 id="stakeholder-map"> (0-indexed: line 1715 in file)
    h2Ids: ['technical-architecture', 'architecture-decision-records-adrs',
            'technology-stack-deep-dive', 'technical-deep-dives'],
    includeDocHeader: false
  },
  {
    filename: '02-implementation-guide.html',
    title: 'Implementation Guide',
    // Includes: Data Flows, Integration Requirements, Design Phase Deliverables, Common Pitfalls
    startLine: 1081, // <h2 id="data-flows"> (0-indexed: line 1082 in file)
    endLine: 1642, // Line before <h2 id="technology-stack-deep-dive"> (0-indexed: line 1643 in file)
    h2Ids: ['data-flows', 'integration-requirements', 'design-phase-deliverables-detail', 'common-pitfalls-amp-how-to-avoid'],
    includeDocHeader: false
  },
  {
    filename: '03-lambda-patterns.html',
    title: 'Lambda Implementation Patterns',
    // Appendix E (E.1 through E.6)
    startLine: 2129, // <h2 id="appendix-e-lambda-implementation-patterns"> (0-indexed: line 2130 in file)
    endLine: 2793, // Line before <h2 id="appendix-f-observability-specification"> (0-indexed: line 2794 in file)
    h2Ids: ['appendix-e-lambda-implementation-patterns'],
    includeDocHeader: false
  },
  {
    filename: '04-operations-testing.html',
    title: 'Operations & Testing',
    // Appendix F (Observability), G (Cost Model), H (Security), I (Testing)
    startLine: 2793, // <h2 id="appendix-f-observability-specification"> (0-indexed: line 2794 in file)
    endLine: 3789, // Line before <h2 id="appendix-j-complete-openapi-specifications"> (0-indexed: line 3790 in file)
    h2Ids: ['appendix-f-observability-specification', 'appendix-g-cost-model',
            'appendix-h-security-checklist', 'appendix-i-testing-toolkit'],
    includeDocHeader: false
  },
  {
    filename: '05-api-specifications.html',
    title: 'API Specifications',
    // Appendix J (J.1 and J.2) - OpenAPI Specifications
    startLine: 3789, // <h2 id="appendix-j-complete-openapi-specifications"> (0-indexed: line 3790 in file)
    endLine: null, // End of file
    h2Ids: ['appendix-j-complete-openapi-specifications'],
    includeDocHeader: false
  }
];

interface NavItem {
  filename: string;
  title: string;
}

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

  // Find where the CSS ends and the sidebar navigation starts
  const styleEndLine = lines.findIndex(line => line.trim() === '</style>');
  const sidebarStartLine = lines.findIndex(line => line.includes('<aside class="sidebar">'));
  const sidebarEndLine = lines.findIndex(line => line.includes('</aside>'));
  const mainContentStartLine = lines.findIndex(line => line.includes('<main class="main-content">'));

  console.log(`Style ends at line: ${styleEndLine}`);
  console.log(`Sidebar starts at line: ${sidebarStartLine}`);
  console.log(`Sidebar ends at line: ${sidebarEndLine}`);
  console.log(`Main content starts at line: ${mainContentStartLine}`);

  // Extract the CSS block (from <style> to </style>)
  const styleStartLine = lines.findIndex(line => line.includes('<style>'));
  const cssBlock = lines.slice(styleStartLine, styleEndLine + 1).join('\n');

  // Extract header and opening tags
  const headerBlock = lines.slice(0, styleStartLine).join('\n');

  for (const section of sections) {
    console.log(`\nProcessing: ${section.filename}`);

    // Determine actual end line
    const actualEndLine = section.endLine || lines.length;

    // Extract content for this section
    const sectionContent = lines.slice(section.startLine, actualEndLine).join('\n');

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
    console.log(`Written: ${outputPath}`);
  }

  console.log('\nAll files created successfully!');
}

main().catch(console.error);
