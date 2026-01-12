#!/usr/bin/env python3
"""
Properly split complete-handoff.html into focused documents
Fixes the \n literal issue and updates diagram references to v3
"""

import re
from pathlib import Path
from bs4 import BeautifulSoup

# Paths
HANDOFF_DIR = Path(__file__).parent.parent / 'handoff'
SOURCE_HTML = HANDOFF_DIR / 'complete-handoff-backup.html'

# Read source HTML
print(f"📖 Reading {SOURCE_HTML}...")
with open(SOURCE_HTML, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Parse with BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Extract common elements
head = soup.find('head')
style_tag = soup.find('style')

# Find main content area
main_content = soup.find('main', class_='main-content')
if not main_content:
    main_content = soup.find('div', class_='content')

print(f"✓ Found main content area\n")

# Split by H2 sections
sections = {}
current_h2 = None
current_content = []

for element in main_content.children:
    if element.name == 'h2':
        # Save previous section
        if current_h2:
            sections[current_h2] = ''.join(str(e) for e in current_content)
        # Start new section
        current_h2 = element.get_text()
        current_content = [element]
    elif current_h2:
        current_content.append(element)

# Save last section
if current_h2:
    sections[current_h2] = ''.join(str(e) for e in current_content)

print(f"✓ Extracted {len(sections)} sections\n")

# Document mappings
DOCS = {
    'solution-overview.html': {
        'title': 'Solution Overview',
        'sections': ['Executive Summary', 'Business Context', 'Technical Architecture', 'Architecture Diagrams Reference']
    },
    'technical-architecture.html': {
        'title': 'Technical Architecture',
        'sections': ['Architecture Decision Records (ADRs)', 'Data Flows', 'Technology Stack Deep Dive', 'Technical Deep Dives']
    },
    'deployment-guide.html': {
        'title': 'Deployment Guide',
        'sections': ['Design Phase Deliverables (Detail)']
    },
    'integration-guide.html': {
        'title': 'Integration Guide',
        'sections': ['Integration Requirements', 'Stakeholder Map & Dependencies']
    },
    'week1-2-plan.html': {
        'title': 'Week 1-2 Action Plan',
        'sections': ['Week 1-2 Action Plan']
    },
    'risks-and-pitfalls.html': {
        'title': 'Risks & Common Pitfalls',
        'sections': ['Risk Management', 'Common Pitfalls & How to Avoid']
    }
}

# Sidebar navigation template
def get_sidebar_nav(current_doc_title):
    return f'''        <aside class="sidebar">
            <div class="sidebar-header">
                <h1>AEO Optimization</h1>
                <div class="doc-type">{current_doc_title}</div>
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
        </aside>'''

# Generate each document
for filename, config in DOCS.items():
    print(f"📄 Generating {filename}...")

    # Collect content for this document
    doc_content = []
    found_count = 0

    for section_title in config['sections']:
        if section_title in sections:
            content = sections[section_title]
            # Update diagram references to v3
            content = content.replace('01-system-context.svg', '01-system-context-v3.svg')
            content = content.replace('02-container-diagram-v2.svg', '02-container-diagram-v3.svg')
            content = content.replace('03-data-ingestion-flow.svg', '03-data-ingestion-flow-v3.svg')
            content = content.replace('04-query-flow.svg', '04-query-flow-v3.svg')
            content = content.replace('05-measurement-flow.svg', '05-measurement-flow-v3.svg')
            content = content.replace('06-deployment-architecture.svg', '06-deployment-architecture-v3.svg')
            content = content.replace('07-iam-security.svg', '07-iam-security-v3.svg')
            content = content.replace('08-stakeholder-integration.svg', '08-stakeholder-integration-v3.svg')

            doc_content.append(content)
            doc_content.append('<hr>')
            found_count += 1

    if found_count == 0:
        print(f"   ⚠️  No sections found for {filename}, skipping...")
        continue

    # Build full HTML
    full_html = f'''<!DOCTYPE html>
<html lang="en">
{head}
<body>
    <div class="layout">
{get_sidebar_nav(config['title'])}

        <!-- Main Content -->
        <main class="main-content">
            <div class="content">
                <h1>{config['title']}</h1>
                <hr>

{''.join(doc_content)}
            </div>
        </main>
    </div>
</body>
</html>'''

    # Write file
    output_path = HANDOFF_DIR / filename
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"   ✓ Created {filename} ({found_count} sections)")

print("\n✅ Document splitting complete!")
