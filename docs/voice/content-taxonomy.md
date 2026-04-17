# Signal Forge Content Taxonomy

## Purpose

This document defines the three content modes Signal Forge supports, ensuring the right voice, structure, and workflow is applied to each content type. The fundamental insight: **blog voice principles optimized for thought leadership are counterproductive for technical architecture documentation**.

---

## The Three Content Modes

| Mode | Purpose | Voice | Structure | Primary Audience |
|------|---------|-------|-----------|------------------|
| **Thought Leadership** | Establish expertise, share insights, provoke thinking | Narrative, provisional, question-led | Story arc, tension/resolution | Broad professional audience |
| **Solution Architecture** | Document technical decisions, enable implementation | Precise, confident, reference-grade | arc42/C4, ADRs, diagrams | Technical teams, architects |
| **Executive Advisory** | Recommend strategy, align stakeholders | Consultant voice, pattern-based | SCR, Before-After-Breakthrough | Executives, decision-makers |
| **Internal Strategy** | Drive internal decisions, align teams | Direct, factual, "we/our" | Short prose + tables + bullets | Leadership, cross-functional teams |

---

## Mode 1: Thought Leadership

### When to Use
- Blog posts and articles
- Conference presentations and keynotes
- Opinion pieces and POVs (when exploring ideas)
- Podcast scripts and speaking notes
- Personal brand content

### Voice Characteristics
Reference: `docs/strategic-content-voice-guide.md`

| Principle | Application |
|-----------|-------------|
| Open with tension | Lead with questions, not answers |
| Show the work | Make thinking process visible |
| Provisional conclusions | "Here's where I've landed—for now" |
| Self-interrogation | Question your own assumptions publicly |
| Intentional fragments | Use rhythm and pacing for emphasis |

### Structure Patterns
- Question-First Hook
- The Evolution Pattern ("I used to think X, now I think Y")
- Compare/Contrast
- The "Here's Where I've Landed" closing

### Anti-Patterns to Avoid
- ❌ Corporate jargon
- ❌ Academic distance
- ❌ Prescriptive authority ("You should always...")
- ❌ Humble bragging

### Output Types
- `pov` - Short-form strategy POV (800-1200 words)
- `paper` - Long-form thought leadership (3000-8000 words)
- `post` - Blog post format

---

## Mode 2: Solution Architecture

### When to Use
- Technical architecture documentation
- Solution design documents
- System integration specifications
- API documentation
- Infrastructure designs
- Technical whitepapers (implementation-focused)

### Voice Characteristics
Reference: `docs/solution-architecture-guide.md`

| Principle | Application |
|-----------|-------------|
| Lead with conclusions | State decisions first, rationale second |
| Be definitive | "The system uses X" not "Here's where I've landed" |
| Complete sentences | No fragments; every statement should be implementable |
| Diagrams over prose | Visual > verbal for architecture |
| Reference-grade precision | Someone should be able to implement from this |

### Structure Patterns
Based on arc42 template, adapted for consulting:

```
1. Executive Summary
2. Context & Scope (C4 Level 1)
3. Solution Strategy
4. Building Blocks View (C4 Level 2-3)
5. Runtime View (Sequences)
6. Deployment View
7. Cross-Cutting Concerns
8. Risks & Mitigations
9. Implementation Roadmap
```

### Anti-Patterns to Avoid
- ❌ Narrative storytelling
- ❌ Provisional language ("I think", "perhaps", "for now")
- ❌ Rhetorical questions
- ❌ Self-interrogation as content
- ❌ Prose where diagrams would be clearer

### Output Types
- `architecture` - Full solution architecture document
- `adr` - Architecture Decision Record
- `tech-deck` - Technical architecture presentation
- `spec` - Technical specification

---

## Mode 3: Executive Advisory

### When to Use
- Strategy decks for client presentations
- Executive briefings and recommendations
- Business case documents
- Transformation roadmaps
- Stakeholder alignment materials
- Whitepapers (strategy-focused)

### Voice Characteristics
Reference: `docs/executive-advisory-guide.md`

| Principle | Application |
|-----------|-------------|
| Pattern recognition | "I've seen this across retail, manufacturing, and enterprise clients" |
| Confident recommendations | "I recommend..." not "You might consider..." |
| Grounded in context | Reference actual meetings, stakeholder quotes |
| Outcome-focused | Lead with business value, not technical details |
| Structured clarity | Clear sections, scannable format |

### Structure Patterns

**Situation-Complication-Resolution (SCR)**
```
SITUATION: Where you are today
COMPLICATION: The challenge or tension
RESOLUTION: The recommended path forward
```

**Before-After-Breakthrough**
```
BEFORE: Current state and pain points
AFTER: Vision of the solved state
BREAKTHROUGH: How to bridge the gap
```

### Anti-Patterns to Avoid
- ❌ Too much technical detail for executives
- ❌ Too much narrative for action items
- ❌ Uncertainty language where confidence is needed
- ❌ Missing the "so what?" (business impact)

### Output Types
- `deck` - Strategic slide deck
- `brief` - Executive brief (1-3 pages)
- `roadmap` - Strategic roadmap document
- `whitepaper` - Strategy whitepaper
<<<<<<< HEAD
- `memo` - High-density 1-page decision memo

---

## Mode 3a: High-Density Memo (Executive Advisory Variant)

### When to Use
- Decision memos requiring immediate action
- Cross-functional alignment under time pressure
- Any document where the reader has < 5 minutes
- Strategy pivots or go/no-go decisions

### Voice Characteristics
Reference: `docs/voice/high-density-memo-voice.md`

| Principle | Application |
|-----------|-------------|
| One page maximum | Constraint forces ruthless prioritization |
| High entropy | Every sentence introduces new information |
| No prose lists | Write in paragraphs; dates embedded in narrative |
| Clinical tone | State facts, draw conclusions, no hedging |
| SCQR structure | Situation-Complication-Question-Recommendation |

### Structure Pattern
```
MEMORANDUM
To / From / Date / Subject

EXECUTIVE SUMMARY (SCQR)
- Situation: 1 sentence
- Complication: 1 sentence
- Question: 1 sentence
- Recommendation: 1 sentence

THE ARGUMENT (1 paragraph)
Why the recommended path is correct; why alternatives fail.

THE SOLUTION (1 paragraph)
Technical approach in plain language.

THE PLAN (1 paragraph)
Phases described as narrative, not date lists.

THE ASK (3 bullets)
Blocking decisions required to proceed.
```

### Anti-Patterns to Avoid
- ❌ Narrative bloat ("It's worth noting that...")
- ❌ Passive recommendations ("We might consider...")
- ❌ Vertical date lists (embed in prose)
- ❌ Unquantified claims ("many merchants" → "~60% of merchants")
- ❌ Hedging language ("possibly", "might", "could")

### Prompt Template
```
Role: You are a Principal Product Manager at Stripe.
Task: Rewrite the attached document as a High-Density 1-Page Memo.
Constraints:
1. Maximum Length: 1 page (~500 words). No exceptions.
2. No Lists/Tables in Body: Prose paragraphs only. Exception: SCQR header, final Ask.
3. High Entropy: Remove filler. If it works without an adjective, remove it.
4. Structure: SCQR → Argument → Solution → Plan → Ask
Tone: Clinical, decisive, urgent.
```
=======
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

---

## Mode 4: Internal Strategy

### When to Use
- Solution plans and proposals (internal)
- CX / product strategy documents
- Sequencing arguments and priority cases
- Technical proposals with business framing
- Any internal doc that needs to drive decisions across teams

### Voice Characteristics
Reference: `docs/voice/internal-strategy-voice.md`

| Principle | Application |
|-----------|-------------|
| Scannable first | VP finds risks in 5 sec, the ask in 10 |
| Short context, then structure | 1-3 sentence paragraphs, then bullets/tables for facts |
| "We" not "you" | Internal team voice, named people and systems |
| Options with rationale | Benefit / trade-off / risk for each option |
| Tables for structured data | Risks, open questions, next steps — always tables |

### Structure Patterns

```
1. Title + one-line subtitle
2. Overview (2-3 sentences)
3. The Problem (short prose + data table)
4. What's Changing (bullet list)
5. Options / Approach (numbered with rationale)
6. What Must Ship (priorities with scope + blockers)
7. Risks (table: ID | Risk | Impact | Mitigation | Owner)
8. Open Questions (table: # | Question | Blocks | Owner | Deadline)
9. Next Steps (table: Action | Owner | Deadline)
10. Success Metrics (table: Metric | Current | Target)
```

### Anti-Patterns to Avoid
- ❌ Narrative arcs (Tension → Pattern → Framework)
- ❌ Blog voice ("here's where I've landed," "I used to think X")
- ❌ Dense prose with buried facts (wall of text)
- ❌ Metadata fluff (Type: POV / Mode: advisory / Status: Provisional)
- ❌ Consultant framing ("your organization," "I recommend to the client")
- ❌ Rhetorical questions

### Output Types
- `plan` - Solution plan or strategy proposal
- `report` - Internal analysis or assessment
- `proposal` - Technical or business proposal

### Workflow
Internal Strategy documents should **not** run through the ghost-writer/copywriter pipeline, which applies blog voice. Write the markdown directly in the correct format, then convert to HTML + Word.

```
Raw Input → Direct Format (no AI rewrite) → md-to-docs converter → Final
```

---

## Content Type Detection

Signal Forge automatically classifies content based on input signals:

### Classification Signals

| Signal | Thought Leadership | Solution Architecture | Executive Advisory | Internal Strategy |
|--------|-------------------|----------------------|-------------------|-------------------|
| **Keywords** | "explore", "reflect", "I've been thinking" | "system", "component", "data flow", "API" | "recommend", "strategy", "roadmap", "investment" | "plan", "proposal", "must ship", "blocker", "owner" |
| **Artifacts** | Notes, observations, questions | Diagrams, schemas, technical specs | Meeting notes, stakeholder concerns, business context | Research, data analysis, competitive analysis, BRDs |
| **Audience markers** | "readers", "community" | "engineers", "developers", "ops team" | "leadership", "executives", "stakeholders" | "team", "we", cross-functional names |
| **Output request** | "blog post", "article", "POV" | "architecture", "design doc", "spec" | "deck", "brief", "presentation" | "plan", "proposal", "report", "document" |

### Override Mechanism

Users can explicitly specify mode:
```bash
npm run generate --mode architecture --input context.md
npm run generate --mode advisory --input meeting-notes.md
npm run generate --mode thought-leadership --input observations.md
```

---

## Workflow by Mode

### Thought Leadership Workflow
```
Raw Input → Ghost Writer → Copywriter → Editor → Final
           (blog voice)   (polish)     (QA)
```

### Solution Architecture Workflow
```
Raw Input → Architect → Tech Reviewer → Editor → Final
           (structure)  (accuracy)      (QA)
```

### Executive Advisory Workflow
```
Raw Input → Strategist → Copywriter → Editor → Final
           (framing)    (polish)      (QA)
```

---

## Cross-Mode Considerations

### When Modes Overlap

Some deliverables require multiple modes:

| Deliverable | Primary Mode | Secondary Mode | Guidance |
|-------------|--------------|----------------|----------|
| Technical whitepaper | Solution Architecture | Executive Advisory | Lead with business context, follow with architecture |
| Architecture deck for executives | Executive Advisory | Solution Architecture | Visual architecture, minimal technical prose |
| Thought leadership on architecture patterns | Thought Leadership | Solution Architecture | Narrative wrapper, accurate technical content |
| Internal solution plan with architecture | Internal Strategy | Solution Architecture | Business framing + tables, ADRs in appendix |
| Internal CX/product strategy | Internal Strategy | Executive Advisory | "We" voice, not consultant voice; tables for data |

### Hybrid Documents

For documents that span modes, use clear section breaks:

```markdown
## Executive Summary
[Executive Advisory voice - outcome-focused, recommendation-led]

## Technical Architecture
[Solution Architecture voice - precise, diagram-heavy]

## Strategic Implications
[Executive Advisory voice - pattern recognition, recommendations]
```

---

## Quality Gates by Mode

### Thought Leadership Quality Checklist
- [ ] Opens with tension or question, not thesis
- [ ] Shows the work, not just conclusions
- [ ] Includes self-interrogation without self-doubt
- [ ] Provisional conclusions ("for now", "today")
- [ ] Conversational but deliberate tone

### Solution Architecture Quality Checklist
- [ ] Includes C4-style diagrams at appropriate levels
- [ ] All decisions documented with rationale (ADR format)
- [ ] Complete sentences, no fragments
- [ ] Reference-grade precision (implementable)
- [ ] Risks documented with mitigations
- [ ] No provisional or uncertain language

### Executive Advisory Quality Checklist
- [ ] Leads with business value/outcomes
- [ ] Clear recommendations with confidence
- [ ] Pattern recognition from experience
- [ ] Appropriate level of technical detail
- [ ] Actionable next steps
- [ ] Scannable structure with clear headers

---

<<<<<<< HEAD
## Annotations Convention

### The Problem

AI-generated documents lose their reasoning the moment the conversation closes. The reader sees the conclusion but not the discovery process, the rejected alternatives, or the assumptions that shaped the structure. When a team inherits the document, they cannot distinguish grounded claims from plausible guesses.

### The Convention

Any document generated from an AI conversation SHOULD carry an optional **annotations layer** — structured rationale for each section, captured during generation.

### What Goes in an Annotation

Each annotation answers four questions about its section:

| Field | Question | Example |
|-------|----------|---------|
| **Why this section exists** | What decision or discovery created it? | "Added after API research showed Promotions API is still beta" |
| **What changed** | How does it differ from earlier drafts? | "First draft stated underutilization as fact; flagged as assumption after audit" |
| **Source tier** | Confirmed, internal knowledge, or assumption? | "Platform readiness column: API research only. Bucket names: conversation." |
| **Origin** | Where did the thinking come from? | "Nino's framing + Gemini brainstorm + BigCommerce REST API docs" |

### When to Include Annotations

| Mode | Annotations? | Rationale |
|------|-------------|-----------|
| **Internal Strategy** | Yes | Teams inherit these docs. Reasoning prevents misinterpretation. |
| **Executive Advisory** | Yes | Stakeholders need to trace recommendations to evidence. |
| **Solution Architecture** | Optional | ADRs already capture rationale; annotations add conversation context. |
| **Thought Leadership** | No | The thinking IS the content. Annotations would be redundant. |
| **Documentation** | No | Reasoning is less relevant; the instructions stand alone. |
| **High-Density Memo** | No | One page maximum. No room for meta-layer. |

### Implementation

Annotations are delivered as a **side drawer** in HTML output — a slide-out panel triggered by clicking section headers. Design principles:

- **Invisible by default.** The document reads clean without annotations.
- **Accessible on demand.** Click a section header to see its rationale.
- **Stripped on print.** Annotations do not appear in printed or PDF output.
- **Not auto-generated.** Annotations must come from the actual conversation, not be hallucinated after the fact.

The reusable drawer component lives at `templates/annotations/drawer.html`. Annotations are passed as a JSON object keyed by section ID.

### Anti-Patterns

- Annotating every document regardless of audience (blog posts don't need it)
- Auto-generating rationale that wasn't part of the actual conversation
- Putting annotations in the document body (defeats the separation principle)
- Using annotations as a substitute for flagging assumptions inline (do both)
=======
## Quality Gate

All content, regardless of mode, should pass the Document Quality Audit before sharing. See `docs/voice/document-quality-audit.md` for the four-check framework.
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-25 | Initial taxonomy based on RAG-for-AEO learnings |
<<<<<<< HEAD
| 1.1 | 2026-02-05 | Added Mode 3a: High-Density Memo variant for decision memos |
| 1.2 | 2026-03-13 | Added Internal Strategy as fourth mode. Learned from P&P deliverable iterations — blog voice and dense prose are wrong for internal strategy docs. |
| 1.3 | 2026-03-25 | Added Annotations Convention. Learned from BigCommerce strategy doc — AI conversations produce reasoning that dies when the session closes. Annotations externalize it. |
=======
| 1.1 | 2026-03-13 | Added Internal Strategy as fourth mode. Learned from P&P deliverable iterations — blog voice and dense prose are wrong for internal strategy docs. |
| 1.2 | 2026-03-15 | Added Quality Gate reference and document-quality-audit.md |
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
