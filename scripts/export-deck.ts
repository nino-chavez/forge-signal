#!/usr/bin/env tsx
/**
 * Export Deck Script
 *
 * Converts markdown deck files directly to HTML without AI processing.
 * Supports multiple diagram formats:
 * - Excalidraw (.excalidraw JSON) - rendered via Kroki API
 * - D2 (.d2) - rendered via local d2 CLI
 * - Mermaid - rendered via mermaid-cli
 *
 * Usage:
 *   npx tsx scripts/export-deck.ts <input.md> [output.html]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { marked } from 'marked';
import path from 'path';
import { execSync } from 'child_process';

interface Slide {
  title: string;
  content: string;
  type: 'title' | 'content' | 'diagram' | 'table';
  hasDiagram: boolean;
  diagramType?: 'excalidraw' | 'd2' | 'mermaid';
}

function parseArchitectureDeck(markdown: string): Slide[] {
  const slides: Slide[] = [];

  // Split by ## Slide headers
  const sections = markdown.split(/^## Slide \d+:/m);

  // First section is the header/frontmatter
  const header = sections[0];
  const titleMatch = header.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Architecture Deck';

  // Add title slide
  slides.push({
    title: title,
    content: '',
    type: 'title',
    hasDiagram: false
  });

  // Process remaining sections
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i].trim();
    if (!section) continue;

    const lines = section.split('\n');
    const slideTitle = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();

    // Check for diagrams
    const hasExcalidraw = content.includes('```excalidraw') || content.includes('![excalidraw]');
    const hasD2 = content.includes('```d2');
    const hasMermaid = content.includes('```mermaid');
    const hasDiagram = hasExcalidraw || hasD2 || hasMermaid;

    let diagramType: Slide['diagramType'];
    if (hasExcalidraw) diagramType = 'excalidraw';
    else if (hasD2) diagramType = 'd2';
    else if (hasMermaid) diagramType = 'mermaid';

    // Detect content type
    let type: Slide['type'] = 'content';
    if (hasDiagram) {
      type = 'diagram';
    } else if (content.includes('| ') && content.includes(' |')) {
      type = 'table';
    }

    slides.push({
      title: slideTitle,
      content: content,
      type: type,
      hasDiagram: hasDiagram,
      diagramType: diagramType
    });
  }

  return slides;
}

function renderExcalidrawToSvg(filePath: string): string {
  if (!existsSync(filePath)) {
    console.error(`   ⚠️  Excalidraw file not found: ${filePath}`);
    return `<div class="diagram-error">Diagram file not found: ${filePath}</div>`;
  }

  const diagramSource = readFileSync(filePath, 'utf-8');

  try {
    // Use Kroki API to render Excalidraw
    const result = execSync(
      `curl -s -X POST "https://kroki.io/excalidraw/svg" -H "Content-Type: application/json" -d '{"diagram_source": ${JSON.stringify(diagramSource)}}'`,
      { encoding: 'utf-8', timeout: 30000 }
    );

    if (result.startsWith('Error') || result.includes('"error"')) {
      throw new Error(result);
    }

    return result;
  } catch (error: any) {
    console.error(`   ⚠️  Failed to render Excalidraw: ${error.message}`);
    return `<div class="diagram-error">Failed to render Excalidraw diagram</div>`;
  }
}

function renderD2ToSvg(code: string, index: number): string {
  const tempFile = `/tmp/d2-diagram-${index}.d2`;
  const outputFile = `/tmp/d2-diagram-${index}.svg`;

  writeFileSync(tempFile, code);

  try {
    execSync(`d2 --theme 0 --layout elk "${tempFile}" "${outputFile}"`, {
      stdio: 'pipe',
      timeout: 30000
    });

    const svg = readFileSync(outputFile, 'utf-8');
    return svg;
  } catch (error: any) {
    console.error(`   ⚠️  Failed to render D2: ${error.message}`);
    return `<div class="diagram-error">Failed to render D2 diagram</div>`;
  }
}

function processContent(content: string, basePath: string): string {
  let diagramIndex = 0;

  // Process Excalidraw file references: ![excalidraw](filename.excalidraw)
  let processed = content.replace(
    /!\[excalidraw\]\(([^)]+)\)/g,
    (match, filename) => {
      diagramIndex++;
      console.log(`   📊 Rendering Excalidraw diagram ${diagramIndex}: ${filename}`);
      const filePath = path.join(basePath, filename);
      const svg = renderExcalidrawToSvg(filePath);
      return `<div class="diagram excalidraw-diagram">${svg}</div>`;
    }
  );

  // Process inline Excalidraw code blocks
  processed = processed.replace(
    /```excalidraw\n([\s\S]*?)```/g,
    (match, code) => {
      diagramIndex++;
      console.log(`   📊 Rendering inline Excalidraw diagram ${diagramIndex}...`);
      // Write to temp file and render
      const tempFile = `/tmp/excalidraw-${diagramIndex}.excalidraw`;
      writeFileSync(tempFile, code.trim());
      const svg = renderExcalidrawToSvg(tempFile);
      return `<div class="diagram excalidraw-diagram">${svg}</div>`;
    }
  );

  // Process D2 code blocks
  processed = processed.replace(
    /```d2\n([\s\S]*?)```/g,
    (match, code) => {
      diagramIndex++;
      console.log(`   📊 Rendering D2 diagram ${diagramIndex}...`);
      const svg = renderD2ToSvg(code, diagramIndex);
      return `<div class="diagram d2-diagram">${svg}</div>`;
    }
  );

  // Process other code blocks (like JSON) to styled pre
  processed = processed.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      return `<pre class="code-block${lang ? ` language-${lang}` : ''}"><code>${escapeHtml(code.trim())}</code></pre>`;
    }
  );

  // Convert markdown to HTML
  return marked.parse(processed) as string;
}

function generateHTML(title: string, slides: Slide[], basePath: string): string {
  const slidesHTML = slides.map((slide, index) => {
    const isTitle = slide.type === 'title';
    const slideClass = isTitle ? 'slide-title' : 'slide-content';
    const activeClass = index === 0 ? 'active' : '';

    let contentHTML = '';
    if (slide.content) {
      contentHTML = processContent(slide.content, basePath);
    }

    return `
    <div class="slide ${slideClass} ${activeClass}" data-slide="${index}">
      <div class="slide-inner">
        <h1 class="slide-heading">${escapeHtml(slide.title)}</h1>
        <div class="slide-body">
          ${contentHTML}
        </div>
      </div>
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>

  <style>
    :root {
      --color-brand-violet: #7c3aed;
      --color-brand-navy: #1a365d;
      --color-text-primary: #171717;
      --color-text-secondary: #404040;
      --color-text-body: #525252;
      --color-bg-primary: #ffffff;
      --color-bg-secondary: #f5f5f5;
      --color-bg-dark: #111827;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--color-bg-secondary);
      color: var(--color-text-body);
      line-height: 1.6;
    }

    /* Navigation */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--color-bg-primary);
      border-bottom: 1px solid #e5e5e5;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }

    .nav-title {
      font-weight: 700;
      color: var(--color-brand-violet);
      font-size: 14px;
    }

    .nav-controls {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .nav-btn {
      padding: 8px 16px;
      border: 1px solid #d4d4d4;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.15s;
    }

    .nav-btn:hover:not(:disabled) {
      border-color: var(--color-brand-violet);
      color: var(--color-brand-violet);
    }

    .nav-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .nav-btn-primary {
      background: var(--color-brand-violet);
      color: white;
      border-color: var(--color-brand-violet);
    }

    .nav-btn-primary:hover:not(:disabled) {
      background: var(--color-brand-navy);
      border-color: var(--color-brand-navy);
      color: white;
    }

    .nav-counter {
      font-size: 14px;
      color: var(--color-text-secondary);
      min-width: 60px;
      text-align: center;
    }

    /* Slides Container */
    .slides-container {
      margin-top: 60px;
      padding: 40px;
      min-height: calc(100vh - 60px);
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .slide {
      display: none;
      width: 100%;
      max-width: 1200px;
      background: var(--color-bg-primary);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .slide.active {
      display: block;
    }

    .slide-inner {
      padding: 48px;
      min-height: 600px;
    }

    /* Title Slide */
    .slide-title .slide-inner {
      background: linear-gradient(135deg, var(--color-brand-violet) 0%, var(--color-brand-navy) 100%);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 70vh;
    }

    .slide-title .slide-heading {
      font-size: 3rem;
      font-weight: 800;
      border: none;
      margin-bottom: 24px;
      color: white;
    }

    .slide-title .slide-body {
      color: rgba(255,255,255,0.9);
      font-size: 1.25rem;
    }

    /* Content Slides */
    .slide-heading {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--color-brand-violet);
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 3px solid var(--color-brand-violet);
    }

    .slide-body {
      font-size: 0.95rem;
    }

    .slide-body h2 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-top: 28px;
      margin-bottom: 12px;
    }

    .slide-body h3 {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-top: 20px;
      margin-bottom: 8px;
    }

    .slide-body p {
      margin-bottom: 12px;
    }

    .slide-body ul, .slide-body ol {
      margin: 12px 0;
      padding-left: 24px;
    }

    .slide-body li {
      margin-bottom: 6px;
    }

    .slide-body strong {
      color: var(--color-text-primary);
      font-weight: 600;
    }

    /* Tables */
    .slide-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 0.85rem;
    }

    .slide-body th {
      background: var(--color-bg-secondary);
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid var(--color-brand-violet);
      color: var(--color-text-primary);
    }

    .slide-body td {
      padding: 8px 12px;
      border-bottom: 1px solid #e5e5e5;
    }

    .slide-body tr:hover {
      background: #fafafa;
    }

    /* Diagrams */
    .diagram {
      background: #fafafa;
      border-radius: 8px;
      padding: 24px;
      margin: 20px 0;
      text-align: center;
      overflow-x: auto;
    }

    .diagram svg {
      max-width: 100%;
      height: auto;
    }

    .excalidraw-diagram {
      background: #ffffff;
      border: 1px solid #e5e5e5;
    }

    .d2-diagram {
      background: #fafafa;
    }

    .diagram-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 16px;
      color: #dc2626;
    }

    /* Code blocks */
    .code-block {
      background: var(--color-bg-dark);
      color: #e5e5e5;
      padding: 16px 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.8rem;
      margin: 16px 0;
      font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    }

    .code-block code {
      background: none;
      padding: 0;
      font-size: inherit;
    }

    .slide-body code {
      background: var(--color-bg-secondary);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.85em;
      font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
      color: var(--color-brand-violet);
    }

    /* Blockquotes */
    .slide-body blockquote {
      border-left: 4px solid var(--color-brand-violet);
      padding-left: 16px;
      margin: 16px 0;
      color: var(--color-text-secondary);
      font-style: italic;
    }

    /* Progress dots */
    .nav-progress {
      display: flex;
      gap: 6px;
    }

    .progress-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #d4d4d4;
      cursor: pointer;
      transition: all 0.2s;
    }

    .progress-dot:hover {
      background: var(--color-brand-violet);
      opacity: 0.6;
    }

    .progress-dot.active {
      width: 24px;
      border-radius: 4px;
      background: var(--color-brand-violet);
    }

    /* Keyboard hint */
    .keyboard-hint {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-bg-dark);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .keyboard-hint:hover {
      opacity: 1;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .slide-inner {
        padding: 24px;
      }

      .slide-heading {
        font-size: 1.25rem;
      }

      .nav-progress {
        display: none;
      }

      .slides-container {
        padding: 20px;
      }
    }

    /* Print styles */
    @media print {
      .nav, .keyboard-hint {
        display: none;
      }

      .slides-container {
        margin-top: 0;
        padding: 0;
      }

      .slide {
        display: block !important;
        page-break-after: always;
        box-shadow: none;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-title">${escapeHtml(title)}</div>
    <div class="nav-controls">
      <button class="nav-btn" id="prevBtn">← Prev</button>
      <div class="nav-progress" id="progressDots"></div>
      <span class="nav-counter"><span id="currentSlide">1</span> / <span id="totalSlides">${slides.length}</span></span>
      <button class="nav-btn nav-btn-primary" id="nextBtn">Next →</button>
    </div>
  </nav>

  <div class="slides-container">
    ${slidesHTML}
  </div>

  <div class="keyboard-hint">← → Arrow keys to navigate</div>

  <script>
    let current = 0;
    const slides = document.querySelectorAll('.slide');
    const total = slides.length;

    function showSlide(n) {
      slides.forEach((s, i) => s.classList.toggle('active', i === n));
      document.getElementById('currentSlide').textContent = n + 1;
      document.getElementById('prevBtn').disabled = n === 0;
      document.getElementById('nextBtn').disabled = n === total - 1;
      updateDots();
    }

    function updateDots() {
      const container = document.getElementById('progressDots');
      container.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot' + (i === current ? ' active' : '');
        dot.onclick = () => { current = i; showSlide(current); };
        container.appendChild(dot);
      }
    }

    document.getElementById('nextBtn').onclick = () => { if (current < total - 1) showSlide(++current); };
    document.getElementById('prevBtn').onclick = () => { if (current > 0) showSlide(--current); };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (current < total - 1) showSlide(++current); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (current > 0) showSlide(--current); }
      if (e.key === 'Home') { e.preventDefault(); current = 0; showSlide(current); }
      if (e.key === 'End') { e.preventDefault(); current = total - 1; showSlide(current); }
    });

    // Touch/swipe support
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    document.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < total - 1) showSlide(++current);
        if (diff < 0 && current > 0) showSlide(--current);
      }
    });

    showSlide(0);
  </script>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Main
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: npx tsx scripts/export-deck.ts <input.md> [output.html]');
  console.log('');
  console.log('Diagram formats supported:');
  console.log('  - Excalidraw: ![excalidraw](filename.excalidraw) or ```excalidraw code block');
  console.log('  - D2: ```d2 code block');
  console.log('  - Mermaid: ```mermaid code block (deprecated, use Excalidraw or D2)');
  process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1] || inputPath.replace(/\.md$/, '.html');
const basePath = path.dirname(inputPath);

console.log(`📄 Reading: ${inputPath}`);
const markdown = readFileSync(inputPath, 'utf-8');

console.log('🔨 Parsing slides...');
const slides = parseArchitectureDeck(markdown);
console.log(`   Found ${slides.length} slides`);

const diagramCount = slides.filter(s => s.hasDiagram).length;
if (diagramCount > 0) {
  console.log(`   Found ${diagramCount} slides with diagrams`);
}

const titleMatch = markdown.match(/^# (.+)$/m);
const title = titleMatch ? titleMatch[1] : 'Architecture Deck';

console.log('🎨 Generating HTML...');
const html = generateHTML(title, slides, basePath);

console.log(`💾 Writing: ${outputPath}`);
writeFileSync(outputPath, html);

console.log(`\n✅ Done! Open ${outputPath} in a browser.`);
