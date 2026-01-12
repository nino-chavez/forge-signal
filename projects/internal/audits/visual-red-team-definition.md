# Visual Design Red Team — Definition

**Purpose:** Audit the Agentic Commerce Architecture package for visual quality, typography, color consistency, layout effectiveness, and presentation readiness.

---

## Red Team Composition

| Role | Perspective | Audit Focus |
|------|-------------|-------------|
| **Visual Designer** | Aesthetic quality, hierarchy | Typography, spacing, alignment, visual balance |
| **Brand Designer** | Identity consistency | Color palette, visual language, professional polish |
| **Accessibility Specialist** | Inclusive design | Contrast ratios, color blindness, readability |
| **Data Viz Specialist** | Information clarity | Diagram effectiveness, density, labeling |
| **Production Designer** | Output quality | Print readiness, resolution, export formats |
| **UX Designer** | Usability | Scannability, visual wayfinding, cognitive flow |

---

## Audit Scope

### Files to Audit

| File | Type | Priority |
|------|------|----------|
| `00-executive-summary.html` | Entry point | Critical |
| `00-index.html` | Navigation | Critical |
| `architecture/c4-1-context.html` | Diagram | High |
| `architecture/c4-2-container.html` | Diagram | High |
| `architecture/c4-3-component.html` | Diagram | Critical |
| `companion/01-implementation-roadmap.html` | Diagram | High |
| `companion/02-data-flow-order-lifecycle.html` | Diagram | High |

*Note: Markdown files (03-08) are text-based and excluded from visual audit.*

---

## Audit Criteria

### 1. Typography (Visual Designer)

| Criterion | What to Check |
|-----------|---------------|
| **Font selection** | Is Inter appropriate? Consistent application? |
| **Hierarchy** | Clear distinction between H1, H2, body, labels? |
| **Size scale** | Logical progression? Readable at intended size? |
| **Line height** | Comfortable reading rhythm? |
| **Font weight** | Proper use of bold/semibold/regular? |
| **Text alignment** | Consistent? Left-aligned for readability? |
| **Orphans/widows** | Single words on lines? Awkward breaks? |

**Scoring:**
- 10: Professional typography, clear hierarchy, no issues
- 7-9: Minor inconsistencies, still readable
- 4-6: Noticeable issues affecting comprehension
- 1-3: Poor typography, hard to read

---

### 2. Color (Brand Designer)

| Criterion | What to Check |
|-----------|---------------|
| **Palette consistency** | Same colors used across all files? |
| **Semantic meaning** | Colors convey meaning consistently? (green=good, red=critical) |
| **Saturation/vibrancy** | Professional, not garish? |
| **Background/foreground** | Sufficient contrast? |
| **Color coding** | Phase colors (green/blue/purple) consistent? |
| **Accent usage** | Highlights used sparingly and purposefully? |
| **Neutral balance** | Enough gray/white space to rest the eye? |

**Palette to Audit:**
```
Primary:     #A100FF (purple)
Accent:      #00D4AA (teal)
Phase 1:     #22c55e (green)
Phase 2:     #3b82f6 (blue)
Phase 3:     #a855f7 (purple)
Critical:    #dc2626 (red)
Neutral:     #1e293b, #6b7280, #f8f9fa
```

---

### 3. Accessibility (Accessibility Specialist)

| Criterion | What to Check | Standard |
|-----------|---------------|----------|
| **Contrast ratio** | Text on background | WCAG AA: 4.5:1 (normal), 3:1 (large) |
| **Color blindness** | Meaning not conveyed by color alone | Deuteranopia, Protanopia, Tritanopia |
| **Focus indicators** | Keyboard navigation visible | N/A for static slides |
| **Text size** | Minimum readable size | 9px minimum, 11px preferred |
| **Information density** | Not overwhelming | Subjective |
| **Alt text** | Images described | N/A (no raster images) |

**Tools:**
- Contrast checker: WebAIM Contrast Checker
- Color blindness: Stark plugin, Coblis simulator
- Accessibility audit: axe DevTools

---

### 4. Layout (Data Viz Specialist)

| Criterion | What to Check |
|-----------|---------------|
| **Grid alignment** | Elements aligned to consistent grid? |
| **White space** | Adequate breathing room? |
| **Information density** | Too crowded? Too sparse? |
| **Visual grouping** | Related items grouped? Gestalt principles? |
| **Flow direction** | Clear reading order? (L→R, T→B) |
| **Symmetry/balance** | Visually balanced composition? |
| **Box sizing** | Consistent component sizes? |
| **Connector lines** | Clear relationships? Not crossing? |

**Diagram-Specific:**
- Are arrows/lines clearly directional?
- Are labels positioned clearly?
- Is the legend visible and complete?
- Can relationships be traced easily?

---

### 5. Production Quality (Production Designer)

| Criterion | What to Check |
|-----------|---------------|
| **Resolution** | Sharp at 1920x1080? |
| **Print readiness** | Printable to PDF cleanly? |
| **Browser compatibility** | Renders in Chrome, Safari, Firefox? |
| **Responsive hints** | Graceful at smaller sizes? (optional) |
| **Asset quality** | No pixelation, clean vectors? |
| **Slide dimensions** | Consistent 16:9 aspect ratio? |
| **Margins** | Consistent padding from edges? |

**Export Formats to Test:**
- Screen (HTML in browser)
- PDF (print)
- PNG (screenshot)

---

### 6. Visual Wayfinding (UX Designer)

| Criterion | What to Check |
|-----------|---------------|
| **Entry point clarity** | Obvious where to start? |
| **Progress indicators** | Know where you are in the package? |
| **Cross-references** | Links/references to related content? |
| **Consistent navigation** | Same patterns across files? |
| **Visual hierarchy** | Most important info stands out? |
| **Scannability** | Can extract key info without reading all? |
| **Chunking** | Information in digestible pieces? |

---

## Audit Checklist Template

### Per-File Audit

```markdown
## File: [filename]

### Typography
- [ ] Font hierarchy clear
- [ ] Sizes appropriate
- [ ] Weights used correctly
- [ ] Alignment consistent
- Issues:
- Score: /10

### Color
- [ ] Palette consistent with system
- [ ] Semantic colors correct
- [ ] Professional appearance
- Issues:
- Score: /10

### Accessibility
- [ ] Contrast ratios pass WCAG AA
- [ ] Not color-dependent
- [ ] Readable text sizes
- Issues:
- Score: /10

### Layout
- [ ] Grid alignment
- [ ] Adequate white space
- [ ] Clear grouping
- [ ] Readable flow
- Issues:
- Score: /10

### Production
- [ ] Sharp rendering
- [ ] Clean PDF export
- [ ] Consistent dimensions
- Issues:
- Score: /10

### Wayfinding
- [ ] Clear purpose
- [ ] Scannable structure
- [ ] Links to related content
- Issues:
- Score: /10

### Overall Score: /10
### Priority Issues:
1.
2.
3.
```

---

## Scoring Framework

| Score | Definition |
|-------|------------|
| 10 | Publication-ready, no changes needed |
| 9 | Minor polish only, no functional issues |
| 8 | Few small issues, doesn't affect comprehension |
| 7 | Several minor issues, still professional |
| 6 | Noticeable issues, needs attention |
| 5 | Multiple issues affecting quality |
| 4 | Significant problems, requires revision |
| 3 | Major issues throughout |
| 2 | Fundamentally problematic |
| 1 | Not usable |

---

## Expected Deliverable

After audit, produce:

1. **Per-file scores** across all 6 dimensions
2. **Priority issues list** (must fix before client delivery)
3. **Polish recommendations** (nice to have)
4. **Overall visual score** (weighted average)

---

## Target Scores for Client Delivery

| Dimension | Minimum | Target |
|-----------|---------|--------|
| Typography | 8 | 9+ |
| Color | 8 | 9+ |
| Accessibility | 8 | 9+ |
| Layout | 8 | 9+ |
| Production | 9 | 10 |
| Wayfinding | 8 | 9+ |
| **Overall** | **8** | **9+** |

---

*Red Team Definition Complete — Ready for Audit Execution*
