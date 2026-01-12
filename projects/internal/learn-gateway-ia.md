# Learning Gateway: Information Architecture

**Version:** 2.0
**Structure:** Progressive Disclosure (Option C)
**Last Updated:** December 2024

---

## Design Principles

### 1. Progressive Disclosure
- **Surface:** Simplified view for newcomers (Builder Track prominent)
- **Depth:** Advanced tracks revealed on demand
- **Goal:** Don't overwhelm beginners, don't limit experts

### 2. Ship-First Philosophy
- Every level ends with a tangible artifact
- "Show me what you've built" remains the filter
- Examples from real corpus demonstrate "what good looks like"

### 3. Track Independence
- Tracks can be taken in any order
- No prerequisites between tracks (except Enterprise assumes some prior exposure)
- Each track is self-contained with its own philosophy, levels, and checkpoints

### 4. Corpus-Backed
- Every track references real artifacts from signal-forge
- No theoretical exercises—all examples are production work
- Learners can inspect actual source files

---

## Site Structure

```
ninochavez.co/learn
├── /learn                    # Gateway landing (all tracks overview)
│   ├── #builder              # Anchor to Builder section (primary)
│   ├── #advanced-tracks      # Anchor to reveal advanced tracks
│   └── #resources            # Shared resources across all tracks
│
├── /learn/builder            # Full Builder Track page
│   ├── #orientation          # Level 0
│   ├── #first-contact        # Level 1
│   ├── #structured           # Level 2
│   ├── #agents               # Level 3
│   ├── #production           # Level 4
│   └── #projects             # Example projects gallery
│
├── /learn/architect          # Full Architect Track page
│   ├── #foundations          # Level 0: arc42, C4 basics
│   ├── #document             # Level 1: Document existing system
│   ├── #decisions            # Level 2: ADRs and trade-offs
│   ├── #complete             # Level 3: Full solution architecture
│   ├── #integration          # Level 4: Multi-system documentation
│   └── #examples             # Corpus examples (Signet AEO)
│
├── /learn/strategist         # Full Strategist Track page
│   ├── #voice                # Level 0: Consultant voice patterns
│   ├── #pov                  # Level 1: Write your first POV
│   ├── #patterns             # Level 2: Cross-domain recognition
│   ├── #briefs               # Level 3: Strategic briefs
│   ├── #executive            # Level 4: Board-level communication
│   └── #examples             # Corpus examples (BBY briefs)
│
├── /learn/author             # Full Author Track page
│   ├── #structure            # Level 0: Playbook architecture
│   ├── #chapter              # Level 1: Single chapter mastery
│   ├── #consistency          # Level 2: Voice across chapters
│   ├── #reference            # Level 3: Appendices & cross-refs
│   ├── #frameworks           # Level 4: Client-agnostic IP
│   └── #examples             # Corpus examples (GEO Playbook)
│
├── /learn/voice              # Full Voice Designer Track page
│   ├── #analysis             # Level 0: Analyze your writing
│   ├── #document             # Level 1: First voice guide
│   ├── #contexts             # Level 2: Multiple voice profiles
│   ├── #validation           # Level 3: Automated checks
│   ├── #systems              # Level 4: Multi-voice orchestration
│   └── #examples             # Corpus examples (voice guides)
│
├── /learn/enterprise         # Full Enterprise Track page
│   ├── #workflows            # Level 0: Multi-role patterns
│   ├── #quality              # Level 1: Rubrics & scoring
│   ├── #templates            # Level 2: Reusable skills
│   ├── #export               # Level 3: Multi-format output
│   ├── #governance           # Level 4: Team governance
│   └── #examples             # Corpus examples (skills, workflows)
│
└── /learn/corpus             # Browsable corpus index
    ├── #projects             # By client (BBY, Signet, etc.)
    ├── #skills               # By skill type
    ├── #artifacts            # By artifact type (POV, deck, etc.)
    └── #stats                # Word counts, file counts, etc.
```

---

## Page Templates

### Template A: Gateway Landing (`/learn`)

```
┌─────────────────────────────────────────────────────────────────┐
│ HERO                                                            │
│ ─────────────────────────────────────────────────────────────── │
│ The Agentic Learning Gateway                                    │
│ How I learned this — and how you can too.                       │
│                                                                 │
│ [Builder Track ▼]  [All Tracks]                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ WHO THIS IS FOR (existing content)                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ THE HARD TRUTH (existing content)                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BUILDER TRACK (PRIMARY - expanded by default)                   │
│ ─────────────────────────────────────────────────────────────── │
│ For developers who want to build production apps with AI.       │
│                                                                 │
│ [Accordion: Level 0-4 as currently implemented]                 │
│                                                                 │
│ [View Full Builder Track →]                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BEYOND BUILDING: ADVANCED TRACKS                                │
│ ─────────────────────────────────────────────────────────────── │
│ Building apps is just the beginning. Here's the full map.       │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │ ARCHITECT   │ │ STRATEGIST  │ │ AUTHOR      │                │
│ │ Design      │ │ Advise      │ │ Create      │                │
│ │ systems     │ │ clients     │ │ frameworks  │                │
│ │ [5 levels]  │ │ [5 levels]  │ │ [5 levels]  │                │
│ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐                                │
│ │ VOICE       │ │ ENTERPRISE  │                                │
│ │ Define      │ │ Scale       │                                │
│ │ consistency │ │ with teams  │                                │
│ │ [5 levels]  │ │ [5 levels]  │                                │
│ └─────────────┘ └─────────────┘                                │
│                                                                 │
│ [Expand All Tracks ▼]                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ THE CORPUS: What I've Actually Built                            │
│ ─────────────────────────────────────────────────────────────── │
│ 882,786 words │ 6 clients │ 5 skills │ 100+ artifacts          │
│                                                                 │
│ [Browse the Corpus →]                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ RESOURCES / TECH STACK / ENGAGEMENT (existing content)          │
└─────────────────────────────────────────────────────────────────┘
```

### Template B: Track Detail Page (`/learn/{track}`)

```
┌─────────────────────────────────────────────────────────────────┐
│ TRACK HERO                                                      │
│ ─────────────────────────────────────────────────────────────── │
│ [← Back to Gateway]                                             │
│                                                                 │
│ THE ARCHITECT TRACK                                             │
│ Design systems. Write implementation-ready documentation.       │
│                                                                 │
│ Timeline: 8-12 weeks │ Artifact: arc42 Solution Architecture    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ WHAT YOU'LL BUILD                                               │
│ ─────────────────────────────────────────────────────────────── │
│ By the end of this track, you'll have:                          │
│ • Complete arc42 documentation for a real system                │
│ • C4 diagrams (Context, Container, Component)                   │
│ • Architecture Decision Records with trade-off analysis         │
│ • Cross-system integration documentation                        │
│                                                                 │
│ Example from corpus: [Signet AEO Architecture →]                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ THE LEVELS                                                      │
│ ─────────────────────────────────────────────────────────────── │
│ [Accordion for each level with:]                                │
│   • Duration                                                    │
│   • Description                                                 │
│   • Checkpoint artifact                                         │
│   • Resources (expanded content)                                │
│     - Read these                                                │
│     - Understand these concepts                                 │
│     - Tools to use                                              │
│   • Corpus example (link to real artifact)                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FROM THE CORPUS                                                 │
│ ─────────────────────────────────────────────────────────────── │
│ Real examples of this track's artifacts:                        │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│ │ Signet AEO v2   │ │ Signet AEO v3.5 │ │ BBY ACP-AP2     │    │
│ │ Architecture    │ │ Delivery Plan   │ │ Integration     │    │
│ │ 51,386 words    │ │ 31 KB           │ │ Technical doc   │    │
│ │ [View →]        │ │ [View →]        │ │ [View →]        │    │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ TOOLS & TEMPLATES                                               │
│ ─────────────────────────────────────────────────────────────── │
│ • solution-architecture skill (SKILL.md)                        │
│ • arc42 template                                                │
│ • ADR template                                                  │
│ • C4 diagram guide                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ READY?                                                          │
│ ─────────────────────────────────────────────────────────────── │
│ Complete Level 3 and show me your arc42 document.               │
│                                                                 │
│ [Email Me (After Level 3)]                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Track Definitions

### Track 1: Builder
**Tagline:** Build production applications with AI assistance.
**Audience:** Developers, engineers, technical founders
**Timeline:** 8-12 weeks
**Final Artifact:** Deployed production application with auth, database, tests

| Level | Name | Duration | Focus | Checkpoint |
|-------|------|----------|-------|------------|
| 0 | Orientation | 1-2 days | Understand AI-assisted dev landscape | Explain difference from "using ChatGPT" |
| 1 | First Contact | 1 week | Build anything with AI | Deployed application |
| 2 | Structured Development | 2-4 weeks | Repeatable workflows, specs | App with database + auth + spec doc |
| 3 | Multi-Model & Agents | 4-8 weeks | Orchestrated systems | Agent-like functionality |
| 4 | Production & Governance | 8+ weeks | Production-grade systems | Metrics, cost tracking, validation |

**Corpus Examples:**
- signal-forge CLI (TypeScript, multi-provider)
- Exporters (PPTX, PDF, Word, HTML)
- Voice checker implementation

---

### Track 2: Architect
**Tagline:** Design systems. Write implementation-ready documentation.
**Audience:** Technical leads, solutions architects, senior engineers
**Timeline:** 8-12 weeks
**Final Artifact:** Complete arc42 solution architecture document

| Level | Name | Duration | Focus | Checkpoint |
|-------|------|----------|-------|------------|
| 0 | Foundations | 1-2 days | arc42 structure, C4 model | Explain 4 C4 diagram levels |
| 1 | Document | 1-2 weeks | Document an existing system | Context + Container diagrams |
| 2 | Decisions | 2-3 weeks | ADRs and trade-offs | 3 ADRs with rationale |
| 3 | Complete | 3-4 weeks | Full solution architecture | Complete arc42 document |
| 4 | Integration | 4+ weeks | Multi-system dependencies | Cross-system documentation |

**Corpus Examples:**
- `signet/aeo/agentic-rag-for-aeo-architecture-v2.md` (51K words)
- `signet/aeo/diagrams/` (40+ Excalidraw/D2/SVG)
- `bby/docs/ACP-AP2-INTEGRATION-PLAN.md`

**Key Resources:**
- `skills/solution-architecture/SKILL.md`
- `skills/solution-architecture/references/adr-template.md`
- `docs/solution-architecture-guide.md` (17,295 words)

---

### Track 3: Strategist
**Tagline:** Write consulting-grade strategic documents.
**Audience:** Consultants, advisors, product strategists, executives
**Timeline:** 6-10 weeks
**Final Artifact:** Executive-ready strategic brief with recommendations

| Level | Name | Duration | Focus | Checkpoint |
|-------|------|----------|-------|------------|
| 0 | Voice | 1-2 days | Consultant voice patterns | Identify 5 patterns in sample POV |
| 1 | POV | 1-2 weeks | Write your first POV | 2,000 word POV with recommendations |
| 2 | Patterns | 2-3 weeks | Cross-domain recognition | Reference 3+ industries/contexts |
| 3 | Briefs | 2-3 weeks | Strategic briefs with options | Options analysis + recommendation |
| 4 | Executive | 3+ weeks | Board-level communication | Executive summary + detailed appendix |

**Corpus Examples:**
- `bby/povs/bby-fy27-brief-refined.md` (8,374 words)
- `bby/povs/bby-fy27-brief-input.md` (raw → refined comparison)
- `signet/povs/aeo-pilot-gap-analysis.md` (9,906 words)

**Key Resources:**
- `skills/executive-pov/SKILL.md`
- `skills/executive-pov/references/voice-guide.md`
- `docs/executive-advisory-guide.md` (11,610 words)

---

### Track 4: Author
**Tagline:** Create comprehensive, multi-chapter reference works.
**Audience:** Knowledge workers, documentation leads, content strategists
**Timeline:** 12-20 weeks
**Final Artifact:** Multi-volume playbook or framework (20,000+ words)

| Level | Name | Duration | Focus | Checkpoint |
|-------|------|----------|-------|------------|
| 0 | Structure | 2-3 days | Playbook architecture | Outline 4-volume structure |
| 1 | Chapter | 2-3 weeks | Single chapter mastery | 5,000 word chapter with sections |
| 2 | Consistency | 3-4 weeks | Voice across chapters | 3 chapters, consistent terminology |
| 3 | Reference | 3-4 weeks | Appendices & cross-refs | Templates, worksheets, decision trees |
| 4 | Frameworks | 4+ weeks | Client-agnostic IP | Variable substitution, reusable |

**Corpus Examples:**
- `geo-playbook/content/` (87,740 words, 15 chapters)
- `geo-playbook/config/quality-rubric.json` (scoring system)
- `geo-playbook/config/style-guide.json` (terminology)

**Key Resources:**
- `skills/governance-playbook/SKILL.md`
- `skills/governance-playbook/references/chapter-template.md`
- `skills/governance-playbook/references/quality-rubric.json`

---

### Track 5: Voice Designer
**Tagline:** Define and maintain consistent voice at scale.
**Audience:** Brand strategists, content leads, anyone managing AI-generated content
**Timeline:** 6-10 weeks
**Final Artifact:** Complete voice system with validation

| Level | Name | Duration | Focus | Checkpoint |
|-------|------|----------|-------|------------|
| 0 | Analysis | 1-2 days | Analyze your writing | Identify 5 patterns in your posts |
| 1 | Document | 1-2 weeks | First voice guide | 3,000 word voice specification |
| 2 | Contexts | 2-3 weeks | Multiple voice profiles | 2 distinct voice profiles |
| 3 | Validation | 2-3 weeks | Automated checks | Voice checker implementation |
| 4 | Systems | 3+ weeks | Multi-voice orchestration | Different voices for audiences |

**Corpus Examples:**
- `docs/strategic-content-voice-guide.md` (18,309 words, 156 posts analyzed)
- `docs/solution-architecture-guide.md` (inverted voice example)
- `src/voice/voice-checker.ts` (validation implementation)

**Key Resources:**
- `skills/thought-leadership/SKILL.md`
- `skills/thought-leadership/references/signal-dispatch-voice.md`

---

### Track 6: Enterprise
**Tagline:** Scale AI-assisted work across teams with governance.
**Audience:** Team leads, managers, enterprise architects, ops
**Timeline:** 10-16 weeks
**Final Artifact:** Reusable skill with multi-format export and quality gates

| Level | Name | Duration | Focus | Checkpoint |
|-------|------|----------|-------|------------|
| 0 | Workflows | 1-2 days | Multi-role patterns | Map Ghost Writer → Copywriter → Editor |
| 1 | Quality | 2-3 weeks | Rubrics & scoring | Quality system with dimensions |
| 2 | Templates | 2-3 weeks | Reusable skills | Complete skill with SKILL.md |
| 3 | Export | 2-3 weeks | Multi-format output | Same content → HTML, PPTX, PDF, Word |
| 4 | Governance | 3+ weeks | Team governance | Roles, escalation, quality gates |

**Corpus Examples:**
- `skills/*/` (5 complete skills)
- `src/roles/` (ghost-writer, copywriter, editor)
- `src/exporters/` (5 export formats)
- `signet/aeo/v3/` (versioned delivery with governance)

**Key Resources:**
- `docs/role-definitions.md` (9,491 words)
- All skill SKILL.md files as templates

---

## Corpus Index Structure

### By Client/Project
```
├── Best Buy (BBY)
│   ├── POVs (FY27 briefs)
│   ├── Decks (Agentic Commerce v5-v6)
│   ├── Docs (ACP-AP2 Integration)
│   └── Workshops
│
├── Signet
│   ├── AEO Architecture (v1-v4)
│   ├── Delivery Plans (v3.0-v3.5)
│   ├── Diagrams (40+)
│   ├── Feedonomics (3 versions)
│   └── POVs (gap analysis)
│
├── Conagra
│   └── GEO Implementation
│
├── REI
│   └── Agentic Commerce
│
├── GEO Playbook (Client-Agnostic)
│   ├── Volume 1: Strategic Framework (3 chapters)
│   ├── Volume 2: Methodology Playbooks (5 chapters)
│   ├── Volume 3: Delivery Execution (3 chapters)
│   └── Volume 4: Reference Appendices (4 appendices)
│
└── Internal
    ├── Templates
    └── Skills (5)
```

### By Artifact Type
```
├── POVs & Strategic Briefs
│   ├── BBY FY27 Brief (input + refined)
│   ├── AEO Pilot Gap Analysis
│   └── Consulting Delivery Template
│
├── Architecture Documents
│   ├── Signet AEO (5 versions)
│   ├── BBY ACP-AP2 Integration
│   └── ADR examples
│
├── Presentation Decks
│   ├── BBY Agentic Commerce (v5-v6)
│   ├── Signet Feedonomics (v1-v3)
│   ├── Conagra GEO
│   └── REI Agentic
│
├── Playbooks & Frameworks
│   └── GEO Governance Playbook (87,740 words)
│
├── Voice Guides
│   ├── Strategic Content (18,309 words)
│   ├── Solution Architecture (17,295 words)
│   └── Executive Advisory (11,610 words)
│
├── Skills & Templates
│   ├── executive-pov
│   ├── solution-architecture
│   ├── strategic-deck
│   ├── governance-playbook
│   └── thought-leadership
│
└── Diagrams
    ├── Excalidraw (25+)
    ├── D2 (10+)
    └── SVG exports
```

### Stats Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│ CORPUS STATS                                                    │
│ ─────────────────────────────────────────────────────────────── │
│                                                                 │
│ Total Words:        882,786                                     │
│ Total Files:        200+                                        │
│ Clients:            6 (BBY, Signet, Conagra, REI, GEO, Internal)│
│ Skills:             5                                           │
│ Voice Guides:       3 (54,000+ words)                           │
│ Diagrams:           40+                                         │
│                                                                 │
│ Largest Artifact:   GEO Playbook (87,740 words, 15 chapters)    │
│ Most Versions:      Signet AEO (5 architecture versions)        │
│ Most Refined:       BBY FY27 Brief (raw → refined comparison)   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Navigation & UX

### Primary Navigation
```
[Learn]  [About]  [CV]  [Signal Dispatch]
   │
   └── Hover/Click reveals:
       ├── Overview (Gateway landing)
       ├── Builder Track
       ├── Architect Track
       ├── Strategist Track
       ├── Author Track
       ├── Voice Designer Track
       ├── Enterprise Track
       └── Browse Corpus
```

### Progress Indicators
- Each track shows completion status (if user opts in)
- Checkboxes persist via localStorage
- Optional: "Share my progress" generates shareable link

### Mobile Considerations
- Tracks collapse to single-column cards
- Accordion pattern works well on mobile
- Corpus browser simplified to list view

---

## Content Relationships

### Cross-Track References
```
Builder Level 3 (Agents) ──────────► Architect Level 2 (ADRs)
"When you build agents,                "Document your agent's
document the decisions"                 architecture decisions"

Strategist Level 2 (Patterns) ─────► Author Level 2 (Consistency)
"Pattern recognition across            "Maintain consistent voice
industries"                             across chapters"

Voice Level 3 (Validation) ─────────► Enterprise Level 1 (Quality)
"Automated voice checks"                "Quality rubrics for teams"
```

### Skill ↔ Track Mapping
```
┌─────────────────────────────────────────────────────────────────┐
│ Track           │ Primary Skill              │ Secondary Skills │
├─────────────────────────────────────────────────────────────────┤
│ Builder         │ (code-focused, no skill)   │ —                │
│ Architect       │ solution-architecture      │ strategic-deck   │
│ Strategist      │ executive-pov              │ thought-leadership│
│ Author          │ governance-playbook        │ thought-leadership│
│ Voice           │ thought-leadership         │ executive-pov    │
│ Enterprise      │ (all skills)               │ —                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### Phase 1: Enhance Current /learn
1. Add "Advanced Tracks" section with cards
2. Add "Browse Corpus" link
3. Keep Builder Track as primary focus

### Phase 2: Individual Track Pages
1. Create `/learn/architect` first (strongest corpus examples)
2. Add `/learn/strategist` (BBY briefs as examples)
3. Add remaining tracks

### Phase 3: Corpus Browser
1. Build searchable/filterable corpus index
2. Link artifacts to tracks
3. Add stats dashboard

### Technical Implementation
- Static site (Next.js or current stack)
- localStorage for progress tracking
- Markdown-driven content (easy to update)
- Corpus files hosted or linked from GitHub

---

## Success Metrics

### Engagement
- Track page views (which tracks are popular?)
- Level completion rates (where do people drop off?)
- Corpus artifact views (what examples resonate?)

### Conversion
- Email submissions after Level 1+ completion
- Track completion → engagement requests
- Corpus browse → track enrollment

### Quality
- Time on page (are people reading?)
- Return visits (are people coming back?)
- Shares (are people recommending?)

---

## Appendix: Content Migration

### From Current /learn
- Hero section → Keep, add track selector
- Who This Is For → Keep as-is
- The Hard Truth → Keep as-is
- The Levels → Becomes Builder Track (primary)
- My Writing → Moves to Resources or Voice Track
- What I Actually Use → Moves to Resources
- External Resources → Moves to Resources (shared)
- How to Engage → Keep at bottom of each track

### New Content Needed
- Advanced Tracks section (cards + descriptions)
- 5 track detail pages
- Corpus browser
- Updated homepage copy
