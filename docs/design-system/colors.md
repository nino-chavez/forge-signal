# Design System: Color Palette

## Accenture Brand Colors

This project uses the Accenture brand color palette, with purple as the primary accent color.

### Primary Accent Color

**Accenture Purple:** `#7500C0` (RGB: 117, 0, 192)

This is the primary brand color used for:
- Primary accents and highlights
- Borders and dividers
- Interactive elements
- Navigation indicators
- Section headings

### Purple Color Scale

```css
:root {
    --accenture-purple-50: #F5E6FF;
    --accenture-purple-100: #E6CCFF;
    --accenture-purple-200: #D199FF;
    --accenture-purple-300: #B866FF;
    --accenture-purple-400: #9F33FF;
    --accenture-purple-500: #7500C0; /* Primary Accenture purple */
    --accenture-purple-600: #5C0099;
    --accenture-purple-700: #4A148C;
    --accenture-purple-800: #330066;
    --accenture-purple-900: #1A0033;
}
```

### Text Color Hierarchy

```css
:root {
    --accenture-text-primary: #1A1A1A;   /* Very dark gray for headings */
    --accenture-text-secondary: #333333;  /* Dark gray */
    --accenture-text-body: #666666;       /* Medium gray for body text */
    --accenture-text-muted: #999999;       /* Light gray for muted text */
}
```

### CSS Utility Classes

#### Background Colors
```css
.bg-accenture-purple-50 { background-color: var(--accenture-purple-50); }
.bg-accenture-purple-100 { background-color: var(--accenture-purple-100); }
.bg-accenture-purple-200 { background-color: var(--accenture-purple-200); }
.bg-accenture-purple-300 { background-color: var(--accenture-purple-300); }
.bg-accenture-purple-400 { background-color: var(--accenture-purple-400); }
.bg-accenture-purple-500 { background-color: var(--accenture-purple-500); }
.bg-accenture-purple-600 { background-color: var(--accenture-purple-600); }
.bg-accenture-purple-700 { background-color: var(--accenture-purple-700); }
.bg-accenture-purple-800 { background-color: var(--accenture-purple-800); }
.bg-accenture-purple-900 { background-color: var(--accenture-purple-900); }
```

#### Text Colors
```css
.text-accenture-purple-50 { color: var(--accenture-purple-50); }
.text-accenture-purple-100 { color: var(--accenture-purple-100); }
.text-accenture-purple-200 { color: var(--accenture-purple-200); }
.text-accenture-purple-300 { color: var(--accenture-purple-300); }
.text-accenture-purple-400 { color: var(--accenture-purple-400); }
.text-accenture-purple-500 { color: var(--accenture-purple-500); }
.text-accenture-purple-600 { color: var(--accenture-purple-600); }
.text-accenture-purple-700 { color: var(--accenture-purple-700); }
.text-accenture-purple-800 { color: var(--accenture-purple-800); }
.text-accenture-purple-900 { color: var(--accenture-purple-900); }

.text-accenture-text-primary { color: var(--accenture-text-primary); }
.text-accenture-text-secondary { color: var(--accenture-text-secondary); }
.text-accenture-text-body { color: var(--accenture-text-body); }
.text-accenture-text-muted { color: var(--accenture-text-muted); }
```

#### Border Colors
```css
.border-accenture-purple-50 { border-color: var(--accenture-purple-50); }
.border-accenture-purple-100 { border-color: var(--accenture-purple-100); }
.border-accenture-purple-200 { border-color: var(--accenture-purple-200); }
.border-accenture-purple-300 { border-color: var(--accenture-purple-300); }
.border-accenture-purple-400 { border-color: var(--accenture-purple-400); }
.border-accenture-purple-500 { border-color: var(--accenture-purple-500); }
.border-accenture-purple-600 { border-color: var(--accenture-purple-600); }
.border-accenture-purple-700 { border-color: var(--accenture-purple-700); }
.border-accenture-purple-800 { border-color: var(--accenture-purple-800); }
.border-accenture-purple-900 { border-color: var(--accenture-purple-900); }
```

### Usage Guidelines

1. **Primary Accent:** Use `accenture-purple-500` (#7500C0) for primary interactive elements, borders, and highlights
2. **Text Hierarchy:**
   - Use `accenture-text-primary` for main headings
   - Use `accenture-text-secondary` for subheadings
   - Use `accenture-text-body` for body text
   - Use `accenture-text-muted` for secondary/muted text
3. **Backgrounds:** Use lighter purple shades (50-200) for subtle backgrounds and highlights
4. **Contrast:** Ensure sufficient contrast ratios for accessibility (WCAG AA minimum)

### Implementation Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        :root {
            --accenture-purple-500: #7500C0;
            --accenture-text-primary: #1A1A1A;
            --accenture-text-body: #666666;
        }
        
        .primary-button {
            background-color: var(--accenture-purple-500);
            color: white;
        }
        
        h1 {
            color: var(--accenture-text-primary);
        }
        
        p {
            color: var(--accenture-text-body);
        }
    </style>
</head>
<body>
    <!-- Content -->
</body>
</html>
```

### Related Documentation

- See `docs/design-system-fonts.md` for typography configuration
- See `docs/strategic-content-voice-guide.md` for content guidelines

---

**Last Updated:** November 2024  
**Maintained By:** Signal Forge Project

