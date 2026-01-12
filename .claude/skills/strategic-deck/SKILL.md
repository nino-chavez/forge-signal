---
name: strategic-deck
description: Create professional presentation decks for strategy, architecture, and executive communication. Use when asked to create slide decks, presentations, visual strategy documents, or HTML-based presentations. Supports multiple workflows including HTML generation and PPTX export.
---

# Strategic Deck Generator

Generate professional presentation decks for consulting engagements, architecture reviews, and executive communication.

## When to Use This Skill

- Creating strategy presentations for client executives
- Building architecture overview decks
- Generating workshop materials
- Creating visual documentation for technical concepts

## Supported Output Formats

| Format | Best For | Method |
|--------|----------|--------|
| HTML | Interactive, web-based viewing | Direct generation with embedded styles |
| PPTX | Client delivery, editing | PptxGenJS or HTML-to-PPTX conversion |
| PDF | Print, archival | Export from HTML or PPTX |

## Workflow

### 1. Content Planning

Before generating slides:
1. Identify the audience (executive, technical, mixed)
2. Determine key messages (3-5 maximum)
3. Plan visual hierarchy and flow
4. Select appropriate layout patterns

### 2. Design Principles

**MANDATORY - Read `references/design-system.md` for complete design system specifications.**

Key principles:
- **Content-informed design**: Match palette and style to subject matter
- **Visual hierarchy**: Clear distinction between headers, body, and supporting text
- **Consistency**: Uniform styling across all slides
- **Readability**: High contrast, appropriate font sizes

### 3. Layout Patterns

**Two-column layout (PREFERRED):**
- Full-width header
- Two columns below for text/visuals
- Best for most content types

**Full-slide layout:**
- Maximum impact for key messages
- Use sparingly for emphasis

**NEVER:** Vertically stack charts/tables below text

### 4. Color Palettes

Select based on content tone:

| Palette | Use Case |
|---------|----------|
| Classic Blue | Professional, trustworthy |
| Teal & Coral | Modern, engaging |
| Black & Gold | Premium, executive |
| Forest Green | Sustainability, growth |
| Charcoal & Red | Bold, action-oriented |

### 5. Typography

**Web-safe fonts only:**
- Headers: Arial, Helvetica, Impact
- Body: Verdana, Tahoma, Georgia
- Code/Data: Courier New

### 6. Validation

After generating slides:
1. Check text cutoff and overflow
2. Verify visual alignment
3. Confirm color contrast
4. Review on multiple screen sizes

## HTML Deck Structure

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Slide container */
    .slide {
      width: 1280px;
      height: 720px;
      padding: 60px;
      page-break-after: always;
    }
    /* Headers */
    h1 { font-size: 48px; margin-bottom: 40px; }
    h2 { font-size: 36px; }
    /* Body text */
    p, li { font-size: 24px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="slide">
    <!-- Slide content -->
  </div>
</body>
</html>
```

## Quality Checklist

Before finalizing any deck:

- [ ] 3-5 key messages clearly communicated
- [ ] Consistent visual styling throughout
- [ ] No text overflow or cutoff
- [ ] High contrast for readability
- [ ] Appropriate for target audience
- [ ] All diagrams have clear labels
- [ ] Speaker notes included where needed

## Examples

See `projects/bby/decks/` for reference implementations.
