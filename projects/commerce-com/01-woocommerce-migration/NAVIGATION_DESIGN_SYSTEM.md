# Navigation Design System

## Overview

This design system defines the consistent "What's Next" navigation patterns used across all documents in the WooCommerce Migration Strategy Kit.

---

## Design Tokens

```css
:root {
    /* Backgrounds */
    --bg: #0f172a;
    --bg-card: #1e293b;
    --bg-card-elevated: #263548;

    /* Text */
    --text: #e2e8f0;
    --text-muted: #94a3b8;
    --text-dim: #64748b;

    /* Accents */
    --accent-primary: #22d3ee;        /* Cyan - primary actions */
    --accent-secondary: #f97316;      /* Orange - secondary emphasis */
    --accent-purple: #a78bfa;         /* Purple - special sections */
    --positive: #34d399;              /* Green - success/go */
    --negative: #f87171;              /* Red - warning/stop */

    /* Borders */
    --border: #334155;
    --border-subtle: #1e293b;
}
```

---

## Typography

```css
/* Labels */
font-family: 'IBM Plex Mono', monospace;
font-size: 0.6875rem;  /* 11px */
font-weight: 600;
letter-spacing: 0.05em;
text-transform: uppercase;

/* Titles */
font-family: 'Inter', system-ui, sans-serif;
font-size: 0.9375rem;  /* 15px */
font-weight: 500;
color: var(--text);

/* Descriptions */
font-size: 0.875rem;  /* 14px */
color: var(--text-muted);
```

---

## Components

### 1. Sequence Navigation Bar

Fixed bottom bar showing position in sequence and prev/next navigation.

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Previous              2 / 4                    Next →        │
│    Title                                          Title         │
└─────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Position: fixed, bottom: 0
- Height: ~64px
- Background: var(--bg) with border-top
- Z-index: 100
- Padding: 1rem 2rem

### 2. What's Next Section

Full-width section appearing before the sequence bar, offering navigation choices.

**Variants:**

#### A. Primary Path (Execution Flow)
```
┌─────────────────────────────────────────────────────────────────┐
│  CONTINUE THE JOURNEY                                           │
│  ─────────────────────                                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  NEXT IN SEQUENCE                                        │   │
│  │  Document Title                                          │   │
│  │  Brief description of what's in this document            │   │
│  │                                              [ Continue → ]  │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Or explore related:  [Link A]  [Link B]  [Link C]             │
└─────────────────────────────────────────────────────────────────┘
```

#### B. Branch Point (Choices)
```
┌─────────────────────────────────────────────────────────────────┐
│  WHAT'S NEXT                                                    │
│  Choose Your Path                                               │
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ PATH A             │  │ PATH B             │                │
│  │ Description        │  │ Description        │                │
│  │        [Go →]      │  │        [Go →]      │                │
│  └────────────────────┘  └────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

#### C. Completion (End of Sequence)
```
┌─────────────────────────────────────────────────────────────────┐
│  SEQUENCE COMPLETE                                              │
│  You've reviewed the [Execution Plan / Evidence].               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Return to the Strategic Assessment to make your         │   │
│  │  decision, or continue exploring.                        │   │
│  │                                                          │   │
│  │  [ Back to Strategic Assessment ]                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Document Type Patterns

### Strategic Assessment (Hub)
- What's Next: Branch point with two paths (Execute / Evidence)
- Sequence Bar: None (it's the hub)

### Execution Documents (1-4)
- What's Next: Primary path to next document
- Sequence Bar: Shows position (1/4, 2/4, 3/4, 4/4)
- Final doc: Completion pattern returning to Assessment

### Appendices (A-C)
- What's Next: Primary path to next appendix
- Sequence Bar: Shows position (A/C, B/C, C/C)
- Final doc: Completion pattern returning to Assessment

---

## CSS Classes

```css
/* Section wrapper */
.whats-next { }

/* Section label */
.whats-next-label { }

/* Primary CTA card */
.next-card { }
.next-card-label { }
.next-card-title { }
.next-card-desc { }
.next-card-cta { }

/* Related links row */
.related-row { }
.related-link { }

/* Completion card */
.completion-card { }

/* Sequence bar */
.sequence-nav { }
.sequence-link { }
.sequence-text { }
.sequence-label { }
.sequence-title { }
.sequence-position { }
.sequence-current { }
.sequence-total { }
```

---

## Spacing

- Section padding: 4rem 2rem
- Card padding: 2rem
- Card border-radius: 12px
- Gap between elements: 1.5rem
- CTA button padding: 1.25rem 1.5rem

---

## Interaction States

```css
/* Links */
:hover { color: var(--accent-primary); }

/* CTA buttons */
:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(34, 211, 238, 0.3);
}

/* Cards */
:hover {
    border-color: var(--accent-primary);
    background: var(--bg-card-elevated);
}
```

---

## Responsive Behavior

- Max content width: 900px
- Mobile breakpoint: 768px
- On mobile: Stack related links vertically
- Sequence bar: Remains full-width fixed

---

## Implementation Checklist

For each document:
- [ ] CSS variables defined in :root
- [ ] Font imports (Inter, IBM Plex Mono)
- [ ] What's Next section with appropriate variant
- [ ] Sequence nav bar with correct prev/next/position
- [ ] Main content padding-bottom to clear sequence bar
- [ ] Hover states on all interactive elements
