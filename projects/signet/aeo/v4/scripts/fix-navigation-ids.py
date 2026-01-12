#!/usr/bin/env python3
"""
Add ID attributes to H2 and H3 headings to match sidebar anchor links
"""

import re
from pathlib import Path

HANDOFF_DIR = Path(__file__).parent.parent / 'handoff'
INDEX_HTML = HANDOFF_DIR / 'index.html'

print(f"📖 Reading {INDEX_HTML}...")
with open(INDEX_HTML, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract all anchor hrefs from sidebar navigation
anchor_pattern = r'<a href="#([^"]+)" class="nav-link">'
anchors = re.findall(anchor_pattern, html)

print(f"✅ Found {len(anchors)} navigation anchors")

# Function to convert heading text to expected ID format
def text_to_id(text):
    """Convert heading text to expected ID (lowercase, hyphens)"""
    # Remove special characters, replace spaces with hyphens
    id_text = text.lower()
    id_text = re.sub(r'[^\w\s-]', '', id_text)  # Remove special chars
    id_text = re.sub(r'\s+', '-', id_text.strip())  # Replace spaces with hyphens
    return id_text

# Find all H2 and H3 headings and add IDs
heading_count = 0

# Process H2 headings
h2_pattern = r'<h2>([^<]+)</h2>'
def add_h2_id(match):
    global heading_count
    text = match.group(1).strip()
    expected_id = text_to_id(text)

    # Check if this ID is in our anchor list
    if expected_id in anchors:
        heading_count += 1
        return f'<h2 id="{expected_id}">{text}</h2>'
    else:
        # Add ID anyway for consistency
        heading_count += 1
        return f'<h2 id="{expected_id}">{text}</h2>'

html = re.sub(h2_pattern, add_h2_id, html)

# Process H3 headings
h3_pattern = r'<h3>([^<]+)</h3>'
def add_h3_id(match):
    global heading_count
    text = match.group(1).strip()
    expected_id = text_to_id(text)

    # Check if this ID is in our anchor list
    if expected_id in anchors:
        heading_count += 1
        return f'<h3 id="{expected_id}">{text}</h3>'
    else:
        # Add ID anyway for consistency
        heading_count += 1
        return f'<h3 id="{expected_id}">{text}</h3>'

html = re.sub(h3_pattern, add_h3_id, html)

# Write updated HTML
with open(INDEX_HTML, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✅ Added ID attributes to {heading_count} headings")
print(f"✅ Updated {INDEX_HTML}")
print("")
print("🔍 Sidebar navigation should now work - test by opening index.html in browser")
