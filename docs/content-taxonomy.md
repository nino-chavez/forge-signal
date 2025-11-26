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

---

## Content Type Detection

Signal Forge automatically classifies content based on input signals:

### Classification Signals

| Signal | Thought Leadership | Solution Architecture | Executive Advisory |
|--------|-------------------|----------------------|-------------------|
| **Keywords** | "explore", "reflect", "I've been thinking" | "system", "component", "data flow", "API" | "recommend", "strategy", "roadmap", "investment" |
| **Artifacts** | Notes, observations, questions | Diagrams, schemas, technical specs | Meeting notes, stakeholder concerns, business context |
| **Audience markers** | "readers", "community" | "engineers", "developers", "ops team" | "leadership", "executives", "stakeholders" |
| **Output request** | "blog post", "article", "POV" | "architecture", "design doc", "spec" | "deck", "brief", "presentation" |

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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-25 | Initial taxonomy based on RAG-for-AEO learnings |
