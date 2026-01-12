# The Signal Forge Method

## A Framework for Professional Document Generation with AI

**Purpose:** Transform raw research, notes, and ideas into polished client-facing deliverables through a structured, multi-phase workflow.

**Core Insight:** Different document types require fundamentally different voices, structures, and generation approaches. Blog voice principles applied to architecture docs produce unusable output. Executive briefs written like technical specs lose the audience.

---

## Part 1: The Framework

### 1.1 Content Classification

Before generating anything, classify what you're making. This determines everything downstream.

| Mode | Purpose | Voice | Primary Audience |
|------|---------|-------|------------------|
| **Thought Leadership** | Establish expertise, share insights | Narrative, provisional, question-led | Broad professional audience |
| **Executive Advisory** | Recommend strategy, align stakeholders | Confident consultant, pattern-based | Executives, decision-makers |
| **Solution Architecture** | Document technical decisions | Precise, definitive, reference-grade | Technical teams, architects |

#### Output Types by Mode

**Thought Leadership:**
- Blog posts and articles
- Opinion pieces and POVs
- Conference presentations
- Personal brand content

**Executive Advisory:**
- Strategy decks
- Executive briefs (1-3 pages)
- Recommendations and roadmaps
- Stakeholder alignment materials

**Solution Architecture:**
- Technical architecture documents
- Architecture Decision Records (ADRs)
- API and integration specifications
- System design documents

---

### 1.2 Voice Calibration

Each content type has a distinct voice that must be applied consistently.

#### Thought Leadership Voice

| Principle | Application |
|-----------|-------------|
| Open with tension | Lead with questions, not answers |
| Show the work | Make thinking process visible |
| Provisional conclusions | "Here's where I've landed—for now" |
| Self-interrogation | Question your own assumptions publicly |
| Intentional fragments | Use rhythm and pacing for emphasis |

**Example Opening:**
> "I've been wrestling with a question that keeps surfacing in enterprise AI conversations. What happens when the metrics we optimize for become invisible?"

**Anti-patterns:**
- Corporate jargon
- Academic distance
- Prescriptive authority ("You should always...")
- Humble bragging

#### Executive Advisory Voice

| Principle | Application |
|-----------|-------------|
| Lead with outcomes | Business impact first, details second |
| Confident recommendations | "I recommend..." not "You might consider..." |
| Pattern recognition | "I've seen this across retail, manufacturing..." |
| Ground in context | Reference actual conversations, stakeholder concerns |
| Structured clarity | Scannable headers, bullets, tables |

**Example Opening:**
> "I recommend implementing semantic search for product discovery. This approach improves conversion by 25% based on patterns I've observed across retail and manufacturing clients."

**Anti-patterns:**
- Technical deep-dives without business context
- Provisional hedging
- Generic frameworks without application
- Too much "we" (you're external)

#### Solution Architecture Voice

| Principle | Application |
|-----------|-------------|
| Lead with conclusions | State decisions first, rationale second |
| Be definitive | "The system uses X" not "Here's where I've landed" |
| Complete sentences | Every statement should be implementable |
| Diagrams over prose | Visual > verbal for architecture |
| Reference-grade precision | Someone should be able to implement from this |

**Example Opening:**
> "The system uses vector embeddings stored in OpenSearch with HNSW indexing. Query latency targets 50ms at P99 with 1M documents."

**Anti-patterns:**
- Narrative storytelling
- Provisional language ("I think", "perhaps", "for now")
- Rhetorical questions
- Prose where diagrams would be clearer

---

### 1.3 Role-Based Generation Workflow

Signal Forge uses specialized roles based on content type. Each role has distinct responsibilities.

```
                         Raw Input
                             │
                    ┌────────┴────────┐
                    │   CLASSIFIER    │
                    │ (Detect Mode)   │
                    └────────┬────────┘
           ┌─────────────────┼─────────────────┐
           ↓                 ↓                 ↓
    THOUGHT            EXECUTIVE          SOLUTION
    LEADERSHIP         ADVISORY          ARCHITECTURE
           ↓                 ↓                 ↓
    Ghost Writer        Strategist         Architect
           ↓                 ↓                 ↓
    Copywriter          Copywriter      Tech Reviewer
           ↓                 ↓                 ↓
       Editor             Editor            Editor
           ↓                 ↓                 ↓
      MARKDOWN           MARKDOWN          MARKDOWN
           ↓                 ↓                 ↓
     HTML/PPTX           HTML/PPTX         HTML/PPTX
```

#### Role Definitions

**Ghost Writer (Thought Leadership)**
- Transforms notes into narrative content
- Opens with tension or questions
- Makes thinking process visible
- Uses provisional language

**Strategist (Executive Advisory)**
- Frames raw input into strategic recommendations
- Applies narrative frameworks (SCR, Before-After-Breakthrough)
- Leads with business outcomes
- Demonstrates pattern recognition

**Architect (Solution Architecture)**
- Creates structured technical documentation
- Generates diagrams (C4, sequence, deployment)
- Documents decisions in ADR format
- Ensures reference-grade precision

---

### 1.4 Structural Templates

#### Executive Advisory Templates

**Template: Situation-Complication-Resolution (SCR)**

```markdown
## Situation
[Neutral description of where the client is today]

## Complication
[The tension, challenge, or change that creates urgency]

## Resolution
[Your recommended path forward]
```

**Template: Recommendation Stack**

```markdown
## The Recommendation
[Clear, unambiguous statement of what you're recommending]

## Why Now
[Urgency drivers, market timing, competitive pressure]

## What It Takes
[Investment, timeline, resources, dependencies]

## What You Get
[Outcomes, metrics, business value]

## What Could Go Wrong
[Risks with mitigations—show you've thought it through]

## Next Steps
[Immediate actions with owners]
```

**Template: Strategy Document (Confident)**

```markdown
# [Title]

## Executive Summary
[3 key metrics: Current State | Target State | Key Outcome]

> **Core Insight:** [One-sentence strategic thesis]

## Strategic Framework
[Visual or conceptual model of the approach]

## Phase Overview
| Phase | Duration | Investment | Markets/Scope |
|-------|----------|------------|---------------|

## Phase Details

### Phase 0: Foundation
**Objective:** [What this phase achieves]
**Key Activities:** [Bulleted list]
**Investment:** [Cost]
**Success Criteria:** [How we know it's done]

[Repeat for each phase]

## Investment Summary
| Approach | Total Investment | Per-Unit Cost |
|----------|------------------|---------------|
| Old way | $X | $Y |
| New way | $X | $Y |
| **Savings** | **$X** | **X% reduction** |

## Governance Model
| Global (Non-Negotiable) | Local (Flexible) |
|-------------------------|------------------|

## Success Metrics
| Category | Metric | Target |
|----------|--------|--------|

## Recommended Next Steps
1. [Action] — [Owner] — [Timeline]
2. [Action] — [Owner] — [Timeline]
```

**Template: Hypothesis Document (Honest)**

```markdown
# [Title]

**Status:** Hypothesis Requiring Validation
**Date:** [Date]
**Purpose:** Framework for developing a detailed plan

---

## Context & Starting Assumptions

### What We Believe to Be True
- [Assumption 1]
- [Assumption 2]
- [Assumption 3]

### What We Don't Know (Validation Required)

| Question | Why It Matters | How to Validate |
|----------|----------------|-----------------|
| [Question] | [Impact] | [Method] |

---

## Strategic Hypothesis

> **Core Thesis:** [Statement of the proposed approach]

### Why This Should Work
- [Supporting factor 1]
- [Supporting factor 2]

### Why This Might Not Work (Risks)
- [Risk 1]
- [Risk 2]

---

## Directional Critical Path

### Phase Sequence

| Phase | Name | Cannot Start Until |
|-------|------|-------------------|
| 0 | Foundation | Architecture decisions finalized |
| 1 | Pilots | Template complete, markets selected |
| 2 | Expansion | Pilots stable, cost model validated |
| 3 | Factory | Runbooks validated, team scaled |

> **Warning:** Do not rush Phase 1 to Phase 2 transition. Scaling with a broken template creates technical debt across all deployments.

---

## Confidence Assessment

| Statement | Confidence | Rationale |
|-----------|------------|-----------|
| [Claim] | High | [Why] |
| [Claim] | Medium | [Why] |
| [Claim] | Low | [Why] |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | High/Med/Low | High/Med/Low | [Strategy] |

---

## Validation Plan

### Phase 0 Validation Activities
| Activity | Output | Timing |
|----------|--------|--------|

### Key Learning Questions
- [ ] [Question to answer during pilots]
- [ ] [Question to answer during pilots]

---

## Document Purpose

| What This Document Is NOT | What This Document IS |
|---------------------------|----------------------|
| Not a project plan | A strategic framework |
| Not a cost estimate | A sequencing guide |
| Not a commitment | A risk identification tool |
| | A validation roadmap |
```

---

### 1.5 Design System

Define your visual language once, then apply consistently.

#### Color Palette

```css
:root {
  /* Brand Colors */
  --brand-primary: #A100FF;      /* Purple - main accent */
  --brand-secondary: #0078D4;    /* Blue - secondary accent */

  /* Semantic Colors */
  --success: #107C10;            /* Green */
  --warning: #F59E0B;            /* Amber */
  --error: #DC2626;              /* Red */

  /* Text Hierarchy */
  --text-primary: #1A1A1A;       /* Headings */
  --text-secondary: #333333;     /* Subheadings */
  --text-body: #666666;          /* Body text */
  --text-muted: #999999;         /* Captions */

  /* Backgrounds */
  --bg-white: #FFFFFF;
  --bg-light: #FAFAFA;
  --bg-dark: #1A1A2E;            /* Page background */
  --border-light: #E5E5E5;
}
```

#### Typography Scale

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (Title) | 42px | 700 | Primary brand |
| H2 (Section) | 28px | 700 | Primary brand |
| H3 (Subsection) | 18px | 600 | Text primary |
| Body | 14-16px | 400 | Text body |
| Caption | 12px | 400 | Text muted |

#### Component Patterns

**Summary Cards (3-column)**
- Light background (#FAFAFA)
- Colored left border (4px)
- Label (uppercase, muted) → Value (large, colored) → Detail (body)

**Insight/Callout Box**
- Light purple background
- Purple left border (4px)
- Label + Text

**Phase Timeline**
- Horizontal flow with arrow connectors
- Color-coded by phase
- Phase number → Title → Duration → Key metric

**Confidence Badges**
- Pill-shaped inline elements
- Green (High), Amber (Medium), Red (Low)

**Tables**
- Header row with light background
- Hover state on rows
- Clear borders

---

## Part 2: Implementation Workflow

### Step 1: Gather Raw Input

Collect all source material:
- Meeting notes and transcripts
- Research findings
- Data points and metrics
- Stakeholder quotes and concerns
- Existing documentation

### Step 2: Classify Content Type

Ask:
1. Who is the audience? (Executives, technical teams, broad professional)
2. What action should they take? (Decide, implement, think)
3. What format is expected? (Deck, document, article)

### Step 3: Apply Voice and Structure

Select the appropriate:
- Voice principles
- Structural template
- Quality checklist

### Step 4: Generate Markdown

Use AI to generate structured markdown:
1. First pass: Structure and content
2. Second pass: Voice consistency
3. Third pass: Quality review

### Step 5: Convert to Final Format

Transform markdown to:
- **HTML**: For web viewing and sharing
- **PPTX**: For presentations
- **DOCX**: For Word documents
- **PDF**: For formal delivery

---

## Part 3: Quality Checklists

### Thought Leadership Quality

- [ ] Opens with tension or question, not thesis
- [ ] Shows the work, not just conclusions
- [ ] Includes self-interrogation without self-doubt
- [ ] Ends provisionally ("for now", "today")
- [ ] No corporate jargon

### Executive Advisory Quality

- [ ] Clear recommendation in first section
- [ ] Business outcomes lead, technical details follow
- [ ] Pattern recognition demonstrated
- [ ] Grounded in client context
- [ ] Scannable structure with clear headers
- [ ] Risks acknowledged with mitigations
- [ ] Next steps with owners

### Solution Architecture Quality

- [ ] Includes diagrams at appropriate levels
- [ ] All decisions documented with rationale
- [ ] No provisional language
- [ ] Reference-grade precision (implementable)
- [ ] Risks documented with mitigations
- [ ] Complete sentences, no fragments

---

## Appendix A: Reusable Prompts

### A.1 Classification Prompt

```
I need to create a document about [TOPIC].

Before generating content, help me classify:

1. **Content Mode**: Is this Thought Leadership, Executive Advisory, or Solution Architecture?
2. **Voice Principles**: What voice characteristics should apply?
3. **Structural Template**: Which template fits best?
4. **Key Sections**: What must be included?

Context:
[PASTE RAW NOTES, RESEARCH, MEETING TRANSCRIPTS]

Audience: [WHO WILL READ THIS]
Expected format: [DECK / DOCUMENT / ARTICLE / SPEC]
```

### A.2 Executive Advisory Generation Prompt

```
Generate an executive advisory document using the [TEMPLATE NAME] structure.

**Voice Requirements:**
- Consultant perspective: Use "I recommend..." not "You might consider..."
- Lead with business outcomes, not technical details
- Demonstrate pattern recognition: "I've seen this across [industries]..."
- Ground in specific context: Reference actual stakeholder concerns
- Confident with acknowledged caveats

**Structure:**
[PASTE TEMPLATE STRUCTURE]

**Input Context:**
[PASTE RAW MATERIAL]

**Specific Requirements:**
- Target audience: [EXECUTIVES / STAKEHOLDERS / BOARD]
- Include specific numbers for: [COSTS / TIMELINES / METRICS]
- Address these stakeholder concerns: [LIST]
- Length constraint: [PAGES / SLIDES]

**Output Format:**
Clean markdown with:
- Clear header hierarchy (# ## ###)
- Tables for data comparisons
- Callout blocks for key insights (use > blockquotes)
- ASCII diagrams for timelines/flows if needed
```

### A.3 Strategy Document Prompt (Confident Version)

```
Create a client-ready strategy recommendation document.

**Topic:** [DESCRIBE THE STRATEGY]

**Voice:**
- External consultant perspective
- Confident recommendations with specific numbers
- Pattern recognition from experience
- Business outcomes first

**Required Sections:**
1. Executive Summary with 3 key metrics (Current State | Target State | Outcome)
2. Core Insight callout box
3. Strategic Framework (conceptual model)
4. Phase Overview (timeline with costs)
5. Phase Details (for each phase: objective, activities, investment, success criteria)
6. Investment Summary (old vs new approach comparison)
7. Governance Model (global vs local)
8. Success Metrics (operational, business, cost)
9. Recommended Next Steps (with owners and timing)

**Data Points to Include:**
- [SPECIFIC NUMBERS]
- [COST FIGURES]
- [TIMELINE]
- [METRICS]

**Input Context:**
[PASTE RAW MATERIAL]
```

### A.4 Hypothesis Document Prompt

```
Create a hypothesis document - explicitly positioned as requiring validation.

**Topic:** [DESCRIBE THE STRATEGY]

**Critical Framing:**
This document distinguishes what is KNOWN vs UNKNOWN. It's a framework for thinking, not a commitment.

**Voice:**
- Confident about the approach, but honest about uncertainties
- Use confidence ratings: High / Medium / Low
- Explicitly state risks to the hypothesis

**Required Sections:**
1. Context & Starting Assumptions
   - "What We Believe to Be True" (bulleted)
   - "What We Don't Know" table (Question | Why It Matters | How to Validate)

2. Strategic Hypothesis
   - Core thesis in callout box
   - "Why This Should Work"
   - "Why This Might Not Work"

3. Directional Critical Path
   - Phase sequence with dependencies
   - "Cannot start until:" conditions
   - Warning about not rushing transitions

4. Confidence Assessment
   - Table with statements and High/Medium/Low ratings

5. Risk Register
   - Risk | Likelihood | Impact | Mitigation

6. Validation Plan
   - Activities by phase
   - Key learning questions

7. Document Purpose (CRITICAL)
   - "What This Document Is NOT" (not a plan, not an estimate, not a commitment)
   - "What This Document IS" (framework, sequencing guide, risk tool, validation roadmap)

**Input Context:**
[PASTE RAW MATERIAL]
```

### A.5 Thought Leadership Generation Prompt

```
Generate a thought leadership piece using blog voice principles.

**Topic:** [DESCRIBE THE TOPIC]

**Voice Requirements:**
- Open with tension or a question, never a thesis statement
- Show the work: Make your thinking process visible
- Include self-interrogation: "But that raises a question..."
- Use provisional language: "Here's where I've landed—for now"
- Intentional fragments for rhythm and emphasis
- Conversational but deliberate

**Structure Patterns (choose one):**
- Question-First Hook
- Evolution Pattern ("I used to think X, now I think Y")
- Compare/Contrast
- The "Here's Where I've Landed" arc

**Anti-patterns to AVOID:**
- Corporate jargon
- Academic distance
- Prescriptive authority ("You should always...")
- Starting with "In today's rapidly evolving..."
- Humble bragging

**Input Context:**
[PASTE OBSERVATIONS, REFLECTIONS, IDEAS]

**Target Length:** [WORD COUNT]
```

### A.6 Solution Architecture Generation Prompt

```
Generate a solution architecture document.

**System/Solution:** [DESCRIBE]

**Voice Requirements:**
- Lead with conclusions, not questions
- Be definitive: "The system uses X" not "Here's where I've landed"
- Complete sentences, no fragments
- Reference-grade precision (someone should implement from this)
- NO provisional language

**Required Sections:**
1. Executive Summary (one page, key decisions upfront)
2. Context & Scope (C4 Level 1 - System Context)
3. Solution Strategy (key architectural decisions)
4. Building Blocks View (C4 Level 2 - Containers)
5. Component View (C4 Level 3 where needed)
6. Runtime View (sequence diagrams for key flows)
7. Deployment View (infrastructure, environments)
8. Cross-Cutting Concerns (security, monitoring, logging)
9. Architecture Decision Records (ADR format)
10. Risks & Mitigations
11. Implementation Roadmap

**ADR Format:**
## ADR-[NUMBER]: [TITLE]
**Status:** [Proposed/Accepted/Deprecated]
**Context:** [Why this decision is needed]
**Decision:** [What we decided]
**Consequences:** [What this means]

**Diagram Format:**
Use ASCII diagrams or describe for C4/Mermaid generation:
- System Context (Level 1)
- Container Diagram (Level 2)
- Sequence diagrams for key flows

**Input Context:**
[PASTE ARCHITECTURE NOTES, REQUIREMENTS, DECISIONS]
```

### A.7 Markdown to HTML Conversion Prompt

```
Convert this markdown document to professional HTML suitable for client delivery.

**Design Requirements:**

Color Palette:
- Primary: #A100FF (purple)
- Secondary: #0078D4 (blue)
- Success: #107C10 (green)
- Warning: #F59E0B (amber)
- Error: #DC2626 (red)
- Text: #1A1A1A / #333333 / #666666 / #999999
- Background: #1A1A2E (outer), #FFFFFF (document)

Typography:
- Font: 'Segoe UI', system-ui, sans-serif
- H1: 42px, 700 weight
- H2: 28px, 700 weight, border-bottom
- H3: 18px, 600 weight
- Body: 14px, 400 weight

**Layout Components:**
1. Header
   - Gradient background (purple)
   - White text
   - Document metadata badges
   - Subtitle

2. Summary Cards (3-column grid)
   - Light background
   - Colored left border (4px)
   - Label (uppercase, small) → Value (large, colored) → Detail

3. Insight/Callout Boxes
   - Light purple background (#F3E8FF)
   - Purple left border
   - Label + text

4. Phase Timeline
   - Horizontal flow
   - Arrow connectors between phases
   - Color-coded phases
   - Phase number, title, duration, key metric

5. Tables
   - Header row with light background
   - Hover states
   - Clear borders

6. Cost Comparison Cards
   - Side by side
   - Red styling for "old" approach
   - Green styling for "new" approach

7. Governance Grid
   - Two columns
   - Numbered items with icons

8. Next Steps
   - Numbered cards
   - Step number → Title → Timing

9. Footer
   - Dark background
   - Copyright
   - Logo placeholders

**Include:**
- CSS custom properties (:root variables)
- Print-friendly @media styles
- Max-width container (1200px)
- Box shadows for depth
- Border-radius: 8px for cards

**For HYPOTHESIS documents, modify:**
- Gray header instead of purple
- "Requires Validation" badge
- Confidence badges (green/amber/red pills)
- More subdued styling

[PASTE MARKDOWN CONTENT]
```

### A.8 Dual Version Generation Prompt

```
Generate TWO versions of this strategy document:

**VERSION A - CONFIDENT (Client-Ready)**
- Specific numbers and costs
- Confident recommendations
- Purple/brand color header
- "Strategic Recommendation" badge
- No hedging language

**VERSION B - HYPOTHESIS (Internal/Draft)**
- Same core content
- Framed as "requires validation"
- Gray header (signals draft status)
- Confidence ratings on each major claim
- "What We Don't Know" sections
- Risk register with likelihood/impact
- Explicit "What this IS vs IS NOT" section
- "Hypothesis Document" badge

**Topic:** [DESCRIBE]

**Input Context:**
[PASTE RAW MATERIAL]

**Output:**
1. First, generate VERSION A markdown
2. Then, generate VERSION B markdown
3. Note key differences between versions
```

---

## Appendix B: Building Your Own Signal Forge

### B.1 Project Setup Prompt

```
I want to build a document generation system similar to Signal Forge.

**Core Capabilities Needed:**
1. Content classification (Thought Leadership / Executive Advisory / Solution Architecture)
2. Voice-calibrated generation using templates
3. Markdown to HTML conversion with professional styling
4. Markdown to PPTX export (optional)
5. Markdown to DOCX export (optional)

**Tech Stack Preferences:**
- Language: [TypeScript / Python / Other]
- AI Provider: [OpenAI / Anthropic / Other]
- CLI or Web interface: [CLI / Web / Both]

**Please provide:**
1. Project structure recommendation
2. Key modules/components needed
3. Data models for content types and templates
4. Initial implementation plan

I'll be using this with Claude/GPT to generate the actual documents.
```

### B.2 Content Taxonomy Implementation Prompt

```
Help me implement a content taxonomy system for document generation.

**Requirements:**

1. Define three content modes:
   - Thought Leadership (blog voice, exploratory)
   - Executive Advisory (consultant voice, directive)
   - Solution Architecture (technical voice, precise)

2. For each mode, I need:
   - Voice principles (what to do / what to avoid)
   - Structural templates (reusable document structures)
   - Quality checklists (validation criteria)
   - Example prompts

3. Classification logic:
   - Keyword-based signals
   - Output type mapping
   - Audience detection
   - Manual override capability

**Output Format:**
- TypeScript interfaces/types for the data model
- JSON/YAML configuration files for templates
- Markdown files for voice guides
```

### B.3 Template System Implementation Prompt

```
Help me build a template system for document generation.

**Requirements:**

1. Template Definition:
   - Name and description
   - Content mode (which voice applies)
   - Required sections
   - Optional sections
   - Section descriptions/guidance
   - Example content for each section

2. Template Storage:
   - Store as markdown files with frontmatter
   - Or as JSON/YAML configuration
   - Support for template inheritance/composition

3. Template Application:
   - Parse input content
   - Map to template sections
   - Generate structured output
   - Validate completeness

**Example Templates Needed:**
- SCR (Situation-Complication-Resolution)
- Recommendation Stack
- Strategy Document (Confident)
- Hypothesis Document
- Architecture Document (arc42-based)
- ADR (Architecture Decision Record)

**Output:**
- Data model for templates
- Example template files
- Template loading/parsing logic
```

### B.4 Voice Guide System Prompt

```
Help me implement a voice guide system for consistent document generation.

**Requirements:**

1. Voice Guide Definition:
   - Mode name
   - Core principles (list)
   - Do's and Don'ts
   - Example openings
   - Example transitions
   - Anti-patterns to avoid
   - Quality checklist

2. Voice Application:
   - System prompt generation for AI
   - Post-generation validation
   - Voice consistency scoring

3. Voice Guides Needed:
   - Thought Leadership (exploratory, provisional)
   - Executive Advisory (confident, directive)
   - Solution Architecture (precise, definitive)

**Output:**
- Data model for voice guides
- Markdown files for each voice guide
- Function to generate AI system prompts from voice guides
```

### B.5 HTML Exporter Implementation Prompt

```
Help me build an HTML exporter for converting markdown documents to styled HTML.

**Requirements:**

1. Markdown Parsing:
   - Parse standard markdown (headers, lists, tables, code blocks)
   - Support for callout blocks (blockquotes with special formatting)
   - Support for custom components via HTML comments or special syntax

2. Design System:
   - CSS custom properties for theming
   - Color palette (primary, secondary, semantic colors)
   - Typography scale
   - Component styles

3. Layout Components:
   - Document container with shadow
   - Header with gradient background
   - Summary cards (3-column grid)
   - Insight/callout boxes
   - Phase timeline (horizontal)
   - Data tables with hover states
   - Cost comparison cards
   - Governance grid
   - Next steps cards
   - Footer

4. Variants:
   - Confident (purple header, polished)
   - Hypothesis (gray header, draft feel)

**Tech Stack:**
- [marked / markdown-it / remark] for parsing
- Template literals or template engine for HTML generation
- Inline CSS or separate stylesheet

**Output:**
- HTML template structure
- CSS stylesheet
- Markdown-to-HTML conversion function
- Example usage
```

### B.6 CLI Implementation Prompt

```
Help me build a CLI for document generation.

**Commands Needed:**

1. `generate` - Generate a document
   ```
   signal-forge generate --mode advisory --template strategy --input notes.md --output strategy.md
   ```

2. `export` - Convert markdown to other formats
   ```
   signal-forge export --format html --input strategy.md --output strategy.html
   signal-forge export --format pptx --input strategy.md --output strategy.pptx
   ```

3. `classify` - Classify input content
   ```
   signal-forge classify --input notes.md
   ```

4. `templates` - List available templates
   ```
   signal-forge templates --mode advisory
   ```

5. `init` - Initialize a new project
   ```
   signal-forge init --name "Client Project"
   ```

**Tech Stack:**
- [Commander / Yargs / Oclif] for CLI framework
- TypeScript
- AI provider SDK for generation

**Output:**
- CLI command structure
- Argument parsing
- Help text
- Example implementations
```

### B.7 Full System Architecture Prompt

```
Design the full architecture for a Signal Forge-like document generation system.

**System Components:**

1. **Core Engine**
   - Content classifier
   - Template manager
   - Voice guide manager
   - Generation orchestrator

2. **AI Integration**
   - Provider abstraction (OpenAI, Anthropic, etc.)
   - Prompt builder (combines template + voice + input)
   - Response parser
   - Multi-pass generation (structure → voice → polish)

3. **Export Pipeline**
   - Markdown parser
   - HTML renderer with design system
   - PPTX generator (optional)
   - DOCX generator (optional)
   - PDF generator (via HTML)

4. **Configuration**
   - Templates (markdown/YAML)
   - Voice guides (markdown)
   - Design system (CSS/JSON)
   - Project settings

5. **CLI Interface**
   - Commands: generate, export, classify, templates, init
   - Configuration file support
   - Watch mode for development

**Project Structure:**
```
signal-forge/
├── src/
│   ├── cli/              # CLI commands
│   ├── classifier/       # Content classification
│   ├── templates/        # Template loading/management
│   ├── voice/            # Voice guide system
│   ├── generator/        # AI generation orchestration
│   ├── exporters/        # HTML, PPTX, DOCX exporters
│   └── providers/        # AI provider integrations
├── templates/            # Template definitions
├── voice-guides/         # Voice guide markdown files
├── design-system/        # CSS and component definitions
└── docs/                 # Documentation
```

**Output:**
- Architecture diagram
- Module interfaces
- Data flow description
- Implementation sequence recommendation
```

### B.8 CLAUDE.md Configuration Prompt

```
Create a CLAUDE.md file that configures Claude Code to work as a document generation system.

**The CLAUDE.md should include:**

1. Project Overview
   - What Signal Forge does
   - Core concepts (modes, templates, voice guides)

2. Content Taxonomy
   - Three modes with voice principles
   - When to use each mode
   - Quality checklists

3. Templates Reference
   - Available templates by mode
   - Template structures

4. Voice Guides Summary
   - Key principles per mode
   - Do's and Don'ts

5. Generation Workflow
   - Step-by-step process
   - Role definitions

6. Export Formats
   - HTML styling requirements
   - Component library

7. Commands/Skills
   - Available slash commands
   - When to use each

**Format:**
Standard markdown that Claude Code will read as project instructions.

**Output:**
Complete CLAUDE.md file ready to use
```

---

## Appendix C: Quick Reference

### Content Mode Selection

| If the output is... | And the audience is... | Use this mode |
|---------------------|------------------------|---------------|
| Blog post, article, opinion piece | Broad professional | Thought Leadership |
| Strategy deck, brief, roadmap | Executives, decision-makers | Executive Advisory |
| Architecture doc, spec, ADR | Technical teams | Solution Architecture |

### Voice Quick Reference

| Mode | Opens With | Hedging | Key Phrase |
|------|------------|---------|------------|
| Thought Leadership | Question/tension | Encouraged | "Here's where I've landed—for now" |
| Executive Advisory | Problem + recommendation | Minimal | "I recommend..." |
| Solution Architecture | Executive summary | Prohibited | "The system uses..." |

### Template Selection

| Situation | Template |
|-----------|----------|
| Presenting a problem and solution | SCR (Situation-Complication-Resolution) |
| Making a specific recommendation | Recommendation Stack |
| Transformation initiative | Before-After-Breakthrough |
| Full strategy with phases | Strategy Document |
| Early-stage planning | Hypothesis Document |
| Technical design | Architecture Document |
| Single technical decision | ADR |

### Generation Workflow

```
1. CLASSIFY  →  2. STRUCTURE  →  3. GENERATE  →  4. REVIEW  →  5. EXPORT
   (Mode)         (Template)       (AI + Voice)    (Checklist)   (HTML/PPTX)
```

---

*This guide is designed to be shared and adapted. Use it as a starting point for your own document generation workflow.*
