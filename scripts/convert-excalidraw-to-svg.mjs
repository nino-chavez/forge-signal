#!/usr/bin/env node

/**
 * Convert Excalidraw files to SVG
 *
 * This script reads .excalidraw JSON files and converts them to SVG
 * by extracting the elements and creating a basic SVG representation.
 */

import fs from 'fs';
import path from 'path';

const DIAGRAMS_DIR = '/Users/nino/Workspace/dev/apps/signal-forge/projects/signet/aeo/v4/handoff/diagrams';

// Read all .excalidraw files
const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.excalidraw'));

console.log(`Found ${files.length} Excalidraw files to convert...`);

for (const file of files) {
  const filePath = path.join(DIAGRAMS_DIR, file);
  const svgPath = filePath.replace('.excalidraw', '.svg');

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const elements = data.elements || [];

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
      text { font-family: 'Inter', -apple-system, sans-serif; fill: #f8fafc; }
      .rectangle { fill: #1e293b; stroke: #22d3ee; stroke-width: 2; }
      .arrow { stroke: #22d3ee; stroke-width: 2; fill: none; }
      .text-label { font-size: 14px; }
      .text-heading { font-size: 18px; font-weight: 600; }
    </style>
  </defs>
  <rect width="${width}" height="${height}" fill="#0f172a"/>
  <g transform="translate(${padding - minX}, ${padding - minY})">
`;

    // Render elements
    elements.forEach(el => {
      if (el.type === 'rectangle') {
        svg += `    <rect x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" class="rectangle" rx="8"/>\n`;
        if (el.text) {
          svg += `    <text x="${el.x + el.width/2}" y="${el.y + el.height/2}" text-anchor="middle" dominant-baseline="middle" class="text-label">${el.text}</text>\n`;
        }
      } else if (el.type === 'arrow') {
        const points = el.points || [[0,0], [el.width || 100, el.height || 0]];
        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${el.x + p[0]} ${el.y + p[1]}`).join(' ');
        svg += `    <path d="${pathData}" class="arrow" marker-end="url(#arrowhead)"/>\n`;
      } else if (el.type === 'text') {
        const fontSize = el.fontSize || 14;
        svg += `    <text x="${el.x}" y="${el.y}" class="text-label" style="font-size: ${fontSize}px">${el.text || ''}</text>\n`;
      } else if (el.type === 'ellipse') {
        svg += `    <ellipse cx="${el.x + el.width/2}" cy="${el.y + el.height/2}" rx="${el.width/2}" ry="${el.height/2}" class="rectangle"/>\n`;
        if (el.text) {
          svg += `    <text x="${el.x + el.width/2}" y="${el.y + el.height/2}" text-anchor="middle" dominant-baseline="middle" class="text-label">${el.text}</text>\n`;
        }
      }
    });

    svg += `  </g>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#22d3ee"/>
    </marker>
  </defs>
</svg>`;

    fs.writeFileSync(svgPath, svg);
    console.log(`✓ Converted ${file} → ${path.basename(svgPath)}`);

  } catch (error) {
    console.error(`✗ Failed to convert ${file}:`, error.message);
  }
}

console.log('\nConversion complete!');
