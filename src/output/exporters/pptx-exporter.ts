import PptxGenJS from 'pptxgenjs';
import { parseDeckFromMarkdown } from '../../content/templates/deck-template.js';
import { marked } from 'marked';
import { getDesignTokens } from '../../content/design-system/presentation-theme.js';
import { loadConfig } from '../../core/config.js';

export interface PPTXExportOptions {
  title: string;
  content: string;
  outputPath: string;
  author?: string;
}

/**
 * Convert hex color to PowerPoint RGB format
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '363636';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Convert CSS font size (rem) to PowerPoint points
 */
function remToPoints(rem: string): number {
  const remValue = parseFloat(rem);
  // Assuming 16px base = 1rem, and 1px ≈ 0.75pt
  return Math.round(remValue * 16 * 0.75);
}

/**
 * Export content to PowerPoint (.pptx)
 * Professional design with design system integration
 */
export async function exportToPPTX(options: PPTXExportOptions): Promise<void> {
  const config = loadConfig();
  const { title, content, outputPath, author = config.author } = options;
  const tokens = getDesignTokens();
  
  // Handle both default export and namespace export
  const PptxGen = (PptxGenJS as any).default || PptxGenJS;
  const pres = new PptxGen();
  pres.author = author;
  pres.title = title;
  
  // Set slide size (16:9)
  pres.layout = 'LAYOUT_WIDE';
  
  // Define color scheme based on design system
  pres.defineLayout({
    name: 'CUSTOM_WIDE',
    width: 13.33,
    height: 7.5,
  });
  
  // Parse markdown to get slides
  const deckStructure = parseDeckFromMarkdown(content);
  
  // If we have a structured deck, use it
  if (deckStructure.slides.length > 0) {
    for (let i = 0; i < deckStructure.slides.length; i++) {
      const slide = deckStructure.slides[i];
      const pptxSlide = pres.addSlide();
      
      // Title slide gets special treatment
      if (i === 0) {
        // Title slide with gradient background effect
        pptxSlide.background = { color: hexToRgb(tokens.colors.brand.violet) };
        
        // Title
        pptxSlide.addText(slide.title, {
          x: 0.5,
          y: 2.5,
          w: 12.33,
          h: 1.5,
          fontSize: remToPoints(tokens.typography.fontSize.display),
          fontFace: 'rival-sans',
          bold: true,
          color: 'FFFFFF',
          align: 'center',
        });
        
        // Subtitle if available
        if (slide.content.length > 0) {
          const subtitle = slide.content[0];
          pptxSlide.addText(subtitle, {
            x: 0.5,
            y: 4.5,
            w: 12.33,
            h: 1,
            fontSize: remToPoints(tokens.typography.fontSize.h3),
            fontFace: 'rival-sans',
            color: 'FFFFFF',
            align: 'center',
            opacity: 0.9,
          });
        }
      } else {
        // Content slides
        // Add subtle background color
        pptxSlide.background = { color: 'FFFFFF' };
        
        // Add accent line at top
        pptxSlide.addShape(pres.ShapeType.rect, {
          x: 0,
          y: 0,
          w: 13.33,
          h: 0.15,
          fill: { color: hexToRgb(tokens.colors.brand.violet) },
          line: { color: 'FFFFFF', width: 0 },
        });
        
        // Title
        pptxSlide.addText(slide.title, {
          x: 0.5,
          y: 0.5,
          w: 12.33,
          h: 0.8,
          fontSize: remToPoints(tokens.typography.fontSize.h1),
          fontFace: 'rival-sans',
          bold: true,
          color: hexToRgb(tokens.colors.brand.violet),
          align: 'left',
        });
        
        // Add divider line under title
        pptxSlide.addShape(pres.ShapeType.rect, {
          x: 0.5,
          y: 1.4,
          w: 12.33,
          h: 0.05,
          fill: { color: hexToRgb(tokens.colors.brand.violet) },
          line: { color: 'FFFFFF', width: 0 },
        });
        
        // Content
        if (slide.content.length > 0) {
          const contentY = 1.8;
          const contentHeight = 5;
          const lineHeight = 0.3;
          
          slide.content.forEach((item: string, index: number) => {
            // Parse markdown formatting
            let formatted = item;
            // Remove markdown bold/italic for now (PowerPoint handles formatting differently)
            formatted = formatted.replace(/\*\*(.+?)\*\*/g, '$1');
            formatted = formatted.replace(/\*(.+?)\*/g, '$1');
            
            // Calculate position
            const yPos = contentY + (index * lineHeight);
            
            // Add bullet point
            pptxSlide.addText(`• ${formatted}`, {
              x: 0.7,
              y: yPos,
              w: 12,
              h: lineHeight,
              fontSize: remToPoints(tokens.typography.fontSize.body),
              fontFace: 'rival-sans',
              color: hexToRgb(tokens.colors.semantic.text.body),
              align: 'left',
              bullet: {
                type: 'number',
                code: '2022', // Bullet character
                style: 'bullet',
              },
            });
          });
        }
      }
    }
  } else {
    // Fallback: parse markdown and create slides from headings
    const tokens_marked = marked.lexer(content);
    let currentSlide: { title: string; content: string[] } | null = null;
    
    for (const token of tokens_marked) {
      if (token.type === 'heading' && token.depth <= 2) {
        if (currentSlide) {
          addSlideToPresentation(pres, currentSlide, tokens);
        }
        currentSlide = {
          title: token.text,
          content: [],
        };
      } else if (token.type === 'paragraph' && currentSlide) {
        currentSlide.content.push(token.text);
      } else if (token.type === 'list' && currentSlide) {
        for (const item of token.items || []) {
          currentSlide.content.push(`• ${item.text}`);
        }
      }
    }
    
    if (currentSlide) {
      addSlideToPresentation(pres, currentSlide, tokens);
    }
  }
  
  await pres.writeFile({ fileName: outputPath });
}

function addSlideToPresentation(
  pres: PptxGenJS,
  slide: { title: string; content: string[] },
  tokens: any
): void {
  const pptxSlide = pres.addSlide();
  
  // Add accent line at top
  pptxSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.15,
    fill: { color: hexToRgb(tokens.colors.brand.violet) },
    line: { color: 'FFFFFF', width: 0 },
  });
  
  // Title
  pptxSlide.addText(slide.title, {
    x: 0.5,
    y: 0.5,
    w: 12.33,
    h: 0.8,
    fontSize: remToPoints(tokens.typography.fontSize.h1),
    fontFace: 'Inter',
    bold: true,
    color: hexToRgb(tokens.colors.brand.violet),
    align: 'left',
  });
  
  // Add divider line under title
  pptxSlide.addShape(pres.ShapeType.rect, {
    x: 0.5,
    y: 1.4,
    w: 12.33,
    h: 0.05,
    fill: { color: hexToRgb(tokens.colors.brand.violet) },
    line: { color: 'FFFFFF', width: 0 },
  });
  
  // Content
  if (slide.content.length > 0) {
    const contentY = 1.8;
    const lineHeight = 0.3;
    
    slide.content.forEach((item: string, index: number) => {
      const yPos = contentY + (index * lineHeight);
      
      pptxSlide.addText(item, {
        x: 0.7,
        y: yPos,
        w: 12,
        h: lineHeight,
        fontSize: remToPoints(tokens.typography.fontSize.body),
        fontFace: 'Inter',
        color: hexToRgb(tokens.colors.semantic.text.body),
        align: 'left',
        bullet: {
          type: 'number',
          code: '2022',
        },
      });
    });
  }
}
