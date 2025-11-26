# Signal Forge - Project Instructions

## Project Overview

Signal Forge is a strategic content generation system that produces high-fidelity text (emails, Word docs, PDFs) and slides (PowerPoint/Google Slides) using multiple AI providers.

**Tech Stack**: Node.js, TypeScript, CLI tool

---

## Content Taxonomy (CRITICAL)

Signal Forge supports **three content modes** with distinct voice, structure, and workflows. **Selecting the correct mode is essential** for quality output.

Reference: `/docs/content-taxonomy.md`

### Mode 1: Thought Leadership
**Use for**: Blog posts, opinion pieces, reflections, POVs exploring ideas
**Voice**: Narrative, provisional, question-led, show-the-work
**Guide**: `/docs/strategic-content-voice-guide.md`

### Mode 2: Solution Architecture
**Use for**: Technical architecture docs, ADRs, specs, technical decks
**Voice**: Precise, definitive, diagram-heavy, reference-grade
**Guide**: `/docs/solution-architecture-guide.md`

### Mode 3: Executive Advisory
**Use for**: Strategy decks, executive briefs, roadmaps, recommendations
**Voice**: Confident consultant, outcome-focused, pattern-recognizing
**Guide**: `/docs/executive-advisory-guide.md`

### Mode Selection

1. **Explicit**: User specifies `--mode thought-leadership|architecture|advisory`
2. **Output type**: Map output to default mode (see taxonomy)
3. **Content signals**: Classify based on keywords and patterns
4. **Default**: Executive Advisory (safest for client work)

Reference: `/src/classifier/content-type-classifier.md`

---

## Voice Principles by Mode

### Thought Leadership Voice
1. **Open with tension or questions**, never with thesis statements
2. **Show the work**, not just conclusions
3. **Include self-interrogation** without self-doubt
4. **End provisionally** ("Here's what I think today")
5. **Use intentional fragments** for rhythm
6. **Avoid corporate jargon** and academic distance
7. **Ground in actual experience**, not theory

### Solution Architecture Voice
1. **Lead with conclusions**, not questions
2. **Be definitive**: "The system uses X" not "Here's where I've landed"
3. **Complete sentences**, no fragments
4. **Diagrams over prose**
5. **Reference-grade precision** (implementable from documentation)
6. **No provisional language** ("I think", "perhaps", "for now")
7. **Structured templates** (arc42, C4, ADR)

### Executive Advisory Voice
1. **Lead with business outcomes**, not technical details
2. **Confident recommendations**: "I recommend..." not "You might consider..."
3. **Pattern recognition**: "I've seen this across retail, manufacturing..."
4. **Ground in client context**: Reference actual conversations
5. **Structured clarity**: Scannable headers, tables, bullets
6. **Consultant perspective**: External advisor, not internal team

---

## Workflows by Mode

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

Reference: `/docs/role-definitions.md`

---

## Content Types and Default Modes

| Output Type | Default Mode | Description |
|-------------|--------------|-------------|
| `post`, `article` | Thought Leadership | Blog/opinion content |
| `pov` | Thought Leadership | Short-form strategy POV (800-1200 words) |
| `paper` | Thought Leadership | Long-form thought leadership (3000-8000 words) |
| `architecture` | Solution Architecture | Full solution design document |
| `adr` | Solution Architecture | Architecture Decision Record |
| `tech-deck` | Solution Architecture | Technical architecture presentation |
| `spec` | Solution Architecture | Technical specification |
| `deck` | Executive Advisory | Strategic slide deck |
| `brief` | Executive Advisory | Executive brief (1-3 pages) |
| `roadmap` | Executive Advisory | Strategic implementation roadmap |
| `whitepaper` | (Classify by content) | Can be any mode |

---

## Templates

### Thought Leadership
- No rigid template; follow structural patterns in voice guide
- Evolution Pattern, Question-First Hook, Compare/Contrast

### Solution Architecture
- `/templates/architecture/adr-template.md` - Architecture decisions
- `/templates/architecture/architecture-deck-template.md` - Tech presentations
- arc42 structure for full documents (see solution-architecture-guide.md)

### Executive Advisory
- SCR (Situation-Complication-Resolution)
- Before-After-Breakthrough
- Recommendation Stack

---

## Usage

```bash
# Thought Leadership
npm run generate post --input observations.md
npm run generate pov --input notes.txt --provider claude

# Solution Architecture
npm run generate architecture --input meeting-notes.md --output solution-design.md
npm run generate adr --input decision-context.md
npm run generate tech-deck --input architecture.md

# Executive Advisory
npm run generate deck --input recap.md --output deck.pptx
npm run generate brief --input meeting-notes.md
npm run generate roadmap --input strategy-session.md

# Explicit mode override
npm run generate deck --mode architecture --input tech-context.md
```

---

## Quality Checklists

### Before Generating Content
- [ ] Correct mode identified (thought-leadership, architecture, advisory)
- [ ] Appropriate voice guide referenced
- [ ] Input contains sufficient context for the mode

### Thought Leadership Quality
- [ ] Opens with tension or question
- [ ] Shows evolution of thinking
- [ ] Ends provisionally
- [ ] No corporate jargon

### Solution Architecture Quality
- [ ] Includes appropriate C4 diagrams
- [ ] All decisions in ADR format
- [ ] No provisional language
- [ ] Specifications are implementable

### Executive Advisory Quality
- [ ] Clear recommendation stated early
- [ ] Business outcomes lead
- [ ] Grounded in client context
- [ ] Scannable structure

---

## Configuration

Set API keys in `.env`:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `PERPLEXITY_API_KEY`
- `DEFAULT_AI_PROVIDER` (default: anthropic)

---

## Project Structure

```
signal-forge/
├── src/
│   ├── cli/           # CLI interface
│   ├── roles/         # Role implementations (Ghost Writer, Architect, etc.)
│   ├── classifier/    # Content type classification
│   ├── providers/     # AI provider implementations
│   ├── exporters/     # Export formats (PPTX, DOCX, PDF)
│   ├── templates/     # Content templates
│   └── voice/         # Voice validation
├── docs/
│   ├── content-taxonomy.md              # Mode definitions
│   ├── strategic-content-voice-guide.md # Thought Leadership voice
│   ├── solution-architecture-guide.md   # Architecture voice
│   ├── executive-advisory-guide.md      # Advisory voice
│   └── role-definitions.md              # Role specifications
├── templates/
│   └── architecture/
│       ├── adr-template.md
│       └── architecture-deck-template.md
├── content/           # Generated content
└── refs/              # Reference materials
```

---

## Development

```bash
npm run build    # Build TypeScript
npm run dev      # Run in development mode
npm run generate # Generate content
```

---

## Common Mistakes to Avoid

### Mode Mismatches

| Mistake | Impact | Correction |
|---------|--------|------------|
| Using blog voice for architecture docs | Prose-heavy, unimplementable output | Switch to architecture mode |
| Using architecture voice for strategy decks | Too technical for executives | Switch to advisory mode |
| Using advisory voice for technical specs | Lacks precision for implementation | Switch to architecture mode |

### Voice Contamination

| Contamination | Example | Fix |
|---------------|---------|-----|
| Provisional language in architecture | "I think we should use Lambda" | "The system uses Lambda" |
| Technical depth in executive brief | Full API specifications | Move to appendix or separate doc |
| Missing self-interrogation in thought leadership | Pure assertion without questioning | Add "But that raises a question..." |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Initial | Single voice guide, three-role workflow |
| 2.0 | 2024-11-25 | Three content modes, specialized roles, classification logic |
