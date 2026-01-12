#!/usr/bin/env node
/**
 * Split complete-handoff.html into focused documents
 * Maps sections to separate HTML files for better navigation
 */

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HANDOFF_DIR = path.join(__dirname, '../handoff');
const SOURCE_HTML = path.join(HANDOFF_DIR, 'complete-handoff.html');

// Document structure mapping
const DOCS = {
  'solution-overview.html': {
    title: 'Solution Overview',
    sections: [
      'Executive Summary',
      'Business Context',
      'C4 Level 1: System Context',
      'Architecture Diagrams Reference'
    ]
  },
  'technical-architecture.html': {
    title: 'Technical Architecture',
    sections: [
      'C4 Level 2: Container Diagram',
      'Architecture Decision Records (ADRs)',
      'Data Flows',
      'Technology Stack Deep Dive',
      'Technical Deep Dives'
    ]
  },
  'deployment-guide.html': {
    title: 'Deployment Guide',
    sections: [
      'Design Phase Deliverables (Detail)', // Has CDK, IAM sections
      'Deployment Architecture' // If exists as separate section
    ]
  },
  'integration-guide.html': {
    title: 'Integration Guide',
    sections: [
      'Integration Requirements',
      'Stakeholder Map & Dependencies'
    ]
  },
  'week1-2-plan.html': {
    title: 'Week 1-2 Action Plan',
    sections: [
      'Week 1-2 Deliverables', // From Executive Summary
      'Exit Criteria', // From Executive Summary
      'Week 1-2 Action Plan'
    ]
  },
  'risks-and-pitfalls.html': {
    title: 'Risks & Common Pitfalls',
    sections: [
      'Risk Management',
      'Common Pitfalls & How to Avoid'
    ]
  }
};

console.log('📚 Splitting complete-handoff.html into focused documents...\\n');

// Read source HTML
const sourceHtml = readFileSync(SOURCE_HTML, 'utf-8');

// Extract common elements (head, styles, sidebar structure)
const headMatch = sourceHtml.match(/<head>([\s\S]*?)<\/head>/);
const styleMatch = sourceHtml.match(/<style>([\s\S]*?)<\/style>/);

if (!headMatch || !styleMatch) {
  console.error('❌ Could not extract head or styles from source HTML');
  process.exit(1);
}

const headContent = headMatch[1];
const styleContent = styleMatch[1];

// Split source HTML by H2 sections
const sections = {};
const h2Matches = [...sourceHtml.matchAll(/<h2>(.*?)<\/h2>([\s\S]*?)(?=<h2>|<\/div>\s*<\/main>|$)/g)];

h2Matches.forEach(match => {
  const sectionTitle = match[1];
  const sectionContent = match[0]; // Include H2 tag
  sections[sectionTitle] = sectionContent;
});

console.log(`Found ${Object.keys(sections).length} sections in source HTML\\n`);

// Generate each document
Object.entries(DOCS).forEach(([filename, config]) => {
  console.log(`📄 Generating ${filename}...`);

  let contentHtml = '';
  let foundSections = 0;

  config.sections.forEach(sectionTitle => {
    // Check for exact match or H3 match
    if (sections[sectionTitle]) {
      contentHtml += sections[sectionTitle] + '\\n<hr>\\n';
      foundSections++;
    } else {
      // Try to find section containing this as H3
      Object.entries(sections).forEach(([h2Title, h2Content]) => {
        if (h2Content.includes(`<h3>${sectionTitle}</h3>`)) {
          // Extract just this H3 section
          const h3Match = h2Content.match(new RegExp(`<h3>${sectionTitle}</h3>([\\s\\S]*?)(?=<h3>|<hr>|$)`));
          if (h3Match) {
            contentHtml += `<h2>${h2Title}</h2>\\n<h3>${sectionTitle}</h3>\\n${h3Match[1]}\\n<hr>\\n`;
            foundSections++;
          }
        }
      });
    }
  });

  if (foundSections === 0) {
    console.log(`   ⚠️  No sections found for ${filename}, skipping...`);
    return;
  }

  // Generate full HTML
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - AEO Optimization Service</title>
${headContent}
    <style>
${styleContent}
    </style>
</head>
<body>
    <div class="layout">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h1>AEO Optimization</h1>
                <div class="doc-type">${config.title}</div>
            </div>

            <nav>
                <div class="nav-section">
                    <div class="nav-section-title">Documents</div>
                    <a href="index.html" class="nav-link">← Back to Overview</a>
                    <a href="solution-overview.html" class="nav-link">Solution Overview</a>
                    <a href="technical-architecture.html" class="nav-link">Technical Architecture</a>
                    <a href="deployment-guide.html" class="nav-link">Deployment Guide</a>
                    <a href="integration-guide.html" class="nav-link">Integration Guide</a>
                    <a href="week1-2-plan.html" class="nav-link">Week 1-2 Plan</a>
                    <a href="risks-and-pitfalls.html" class="nav-link">Risks & Pitfalls</a>
                </div>

                <div class="nav-section">
                    <div class="nav-section-title">Resources</div>
                    <a href="diagrams/README.html" class="nav-link">Architecture Diagrams</a>
                    <a href="README.txt" class="nav-link">README.txt</a>
                </div>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content">
                <h1>${config.title}</h1>
                <hr>

${contentHtml}
            </div>
        </main>
    </div>
</body>
</html>`;

  // Write file
  const outputPath = path.join(HANDOFF_DIR, filename);
  writeFileSync(outputPath, fullHtml);
  console.log(`   ✓ Created ${filename} (${foundSections} sections)`);
});

console.log('\\n✅ Document splitting complete!');
