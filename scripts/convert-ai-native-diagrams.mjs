#!/usr/bin/env node

/**
 * Convert AI-Native Org Excalidraw files to SVG
 *
 * Custom converter that builds SVGs manually from Excalidraw JSON,
 * applying dark theme styling consistent with the deck.
 */

import fs from 'fs';
import path from 'path';

const DIAGRAMS_DIR = './projects/ai-native-org/diagrams';

// Color mappings for dark theme (Excalidraw light → deck dark)
const COLOR_MAP = {
  '#ffffff': '#0f172a',      // white bg → navy
  '#f8f9fa': '#1e293b',      // light gray → navy-light
  '#1e1e1e': '#f8fafc',      // black text → white
  '#495057': '#94a3b8',      // gray → slate-400
  '#868e96': '#64748b',      // gray → slate-500
  '#1864ab': '#38bdf8',      // blue → sky-400
  '#1971c2': '#0ea5e9',      // blue → sky-500
  '#a5d8ff': 'rgba(14, 165, 233, 0.2)',  // light blue → sky with opacity
  '#2b8a3e': '#4ade80',      // green → green-400
  '#2f9e44': '#22c55e',      // green → green-500
  '#b2f2bb': 'rgba(34, 197, 94, 0.2)',   // light green → green with opacity
  '#e67700': '#fbbf24',      // orange → amber-400
  '#f08c00': '#f59e0b',      // orange → amber-500
  '#ffec99': 'rgba(245, 158, 11, 0.2)',  // light yellow → amber with opacity
  '#5f3dc4': '#a78bfa',      // purple → violet-400
  '#7048e8': '#8b5cf6',      // purple → violet-500
  '#d0bfff': 'rgba(139, 92, 246, 0.2)',  // light purple → violet with opacity
  '#e03131': '#f43f5e',      // red → rose-500
};

function mapColor(color) {
  if (!color) return '#f8fafc';
  return COLOR_MAP[color.toLowerCase()] || color;
}

// Read all .excalidraw files
const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.excalidraw'));

console.log(`Found ${files.length} Excalidraw files to convert...\n`);

for (const file of files) {
  const filePath = path.join(DIAGRAMS_DIR, file);
  const svgPath = filePath.replace('.excalidraw', '.svg');

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const elements = data.elements || [];
    const bgColor = mapColor(data.appState?.viewBackgroundColor || '#ffffff');

    // Calculate bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    elements.forEach(el => {
      if (el.x !== undefined && el.y !== undefined) {
        minX = Math.min(minX, el.x);
        minY = Math.min(minY, el.y);
        maxX = Math.max(maxX, el.x + (el.width || 0));
        maxY = Math.max(maxY, el.y + (el.height || 0));
      }
    });

    const padding = 40;
    const width = maxX - minX + (padding * 2);
    const height = maxY - minY + (padding * 2);

    // Create SVG
    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap');
      text { font-family: 'Inter', -apple-system, sans-serif; }
    </style>
  </defs>
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <g transform="translate(${padding - minX}, ${padding - minY})">
`;

    // Render elements
    elements.forEach(el => {
      const strokeColor = mapColor(el.strokeColor);
      const fillColor = mapColor(el.backgroundColor);
      const textColor = mapColor(el.strokeColor);

      if (el.type === 'rectangle') {
        const rx = el.roundness?.type === 3 ? 8 : 0;
        const fill = el.fillStyle === 'solid' ? fillColor : 'none';
        const opacity = el.opacity ? el.opacity / 100 : 1;
        svg += `    <rect x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" fill="${fill}" stroke="${strokeColor}" stroke-width="${el.strokeWidth || 1}" rx="${rx}" opacity="${opacity}"/>\n`;
      } else if (el.type === 'line' || el.type === 'arrow') {
        const points = el.points || [[0, 0], [el.width || 100, el.height || 0]];
        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${el.x + p[0]} ${el.y + p[1]}`).join(' ');
        const dashArray = el.strokeStyle === 'dashed' ? 'stroke-dasharray="8 10"' : '';
        svg += `    <path d="${pathData}" stroke="${strokeColor}" stroke-width="${el.strokeWidth || 2}" fill="none" ${dashArray}`;
        if (el.type === 'arrow') {
          svg += ` marker-end="url(#arrowhead-${strokeColor.replace('#', '')})"`;
        }
        svg += `/>\n`;
      } else if (el.type === 'text') {
        const fontSize = el.fontSize || 14;
        const lines = (el.text || '').split('\n');
        const textAnchor = el.textAlign === 'center' ? 'middle' : el.textAlign === 'right' ? 'end' : 'start';
        const xOffset = el.textAlign === 'center' ? el.width / 2 : el.textAlign === 'right' ? el.width : 0;

        lines.forEach((line, i) => {
          const y = el.y + (i + 1) * (fontSize * 1.2);
          svg += `    <text x="${el.x + xOffset}" y="${y}" font-size="${fontSize}px" fill="${textColor}" text-anchor="${textAnchor}">${escapeXml(line)}</text>\n`;
        });
      } else if (el.type === 'ellipse') {
        const fill = el.fillStyle === 'solid' ? fillColor : 'none';
        svg += `    <ellipse cx="${el.x + el.width / 2}" cy="${el.y + el.height / 2}" rx="${el.width / 2}" ry="${el.height / 2}" fill="${fill}" stroke="${strokeColor}" stroke-width="${el.strokeWidth || 1}"/>\n`;
      }
    });

    svg += `  </g>
  <defs>
    <marker id="arrowhead-f43f5e" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#f43f5e"/>
    </marker>
  </defs>
</svg>`;

    fs.writeFileSync(svgPath, svg);
    console.log(`✓ Converted ${file} → ${path.basename(svgPath)}`);

  } catch (error) {
    console.error(`✗ Failed to convert ${file}:`, error.message);
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

console.log('\nConversion complete!');
