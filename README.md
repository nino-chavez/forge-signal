# Signal Forge

<<<<<<< HEAD
Strategic content generation system for decks, POVs, and papers in your voice.

## Overview

Signal Forge generates high-fidelity strategic content using multiple AI providers (OpenAI, Anthropic, Perplexity, Gemini) with a three-role workflow:

1. **Ghost Writer** - Initial content generation from raw input
2. **Copywriter** - Refinement and polish
3. **Editor** - Quality assurance and final review

## Features

- Generate strategic decks (PowerPoint/Google Slides/HTML)
- Create short-form POVs (Word/PDF/HTML)
- Produce long-form strategy papers (Word/PDF/HTML)
- Multi-provider AI support (OpenAI, Anthropic, Gemini, Perplexity)
- Voice consistency using Signal Dispatch voice guide
- High-fidelity exports (Word, PDF, PowerPoint, Google Slides, HTML web pages)

## Installation

```bash
npm install
=======
Voice-aware content generation with mode-specific AI pipelines and multi-format export.

## Why

Content generation tools produce generic output. An architecture doc shouldn't read like a blog post. A strategy deck shouldn't read like a technical spec. Signal Forge enforces voice consistency through mode-specific pipelines — each content mode has its own voice principles, validation rules, and workflow, so the output matches the intent.

## Content Modes

| Mode | Use for | Voice |
|------|---------|-------|
| **Thought Leadership** | Blog posts, POVs, papers | Narrative, provisional, question-led |
| **Solution Architecture** | Architecture docs, ADRs, specs | Definitive, diagram-heavy, precise |
| **Executive Advisory** | Strategy decks, briefs, roadmaps | Confident, outcome-focused |
| **Documentation** | Guides, tutorials, references | Instructional, direct, copy-paste ready |

Modes are extensible — add your own via the registry system without modifying core code.

## Features

- Four built-in content modes with voice validation
- Multi-provider AI (OpenAI, Anthropic, Gemini, Perplexity)
- Multi-format export (Word, PDF, PowerPoint, Google Slides, HTML)
- Extensible registry system for modes, voices, workflows, templates, and themes
- Configurable perspective (consultant, internal, neutral)
- Presentation theme system with design tokens

## Getting Started

```bash
# 1. Clone and install
git clone <repo-url>
cd signal-forge
npm install

# 2. Configure API keys
cp .env.example .env
# Edit .env — add at least one provider API key

# 3. Initialize user config
npm run dev -- init
# Edit ~/.signal-forge/config.json to set your author, persona, company

# 4. Generate content
npm run dev -- generate pov --input notes.txt
```

After building (`npm run build`), you can also link the CLI globally:

```bash
npm run build
npm link
forge generate deck --input recap.md --format pptx,html
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
```

## Configuration

<<<<<<< HEAD
Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

## Usage

```bash
# Generate a deck
npm run generate deck --input recap.md --output deck.pptx

# Generate a POV
npm run generate pov --input notes.txt --provider claude

# Generate a paper
npm run generate paper --input context.md --format word,pdf,html

# Generate a deck as interactive web page
npm run generate deck --input recap.md --format html
```

## Design System

This project uses a consistent design system for all generated content:

- **Typography:** 
  - **Primary:** Rival Sans font family from Adobe Fonts (Typekit ID: `tjp7ihm`)
  - **Alternate:** Komet font family from Adobe Fonts (Typekit ID: `wbj0oqh`)
  - See [`docs/design-system-fonts.md`](docs/design-system-fonts.md) for complete font configuration
- **Colors:** Accenture brand color palette with purple accent (`#7500C0`)
  - See [`docs/design-system-colors.md`](docs/design-system-colors.md) for color palette and usage

All generated HTML, presentations, and documents use these design system defaults.

## Project Structure

- `src/cli/` - CLI interface
- `src/roles/` - Three-role workflow (Ghost Writer, Copywriter, Editor)
- `src/providers/` - AI provider implementations
- `src/exporters/` - Export formats (Word, PDF, PowerPoint, Google Slides)
- `src/templates/` - Content templates
- `src/voice/` - Voice guide and validation
- `docs/` - Documentation (including design system guides)
- `refs/` - Reference materials
=======
### User Config (`~/.signal-forge/config.json`)

```json
{
  "author": "Your Name",
  "persona": "your role",
  "company": "Your Company",
  "defaultMode": "advisory",
  "perspective": "consultant"
}
```

| Field | Purpose |
|-------|---------|
| `author` | Your name — used in voice instructions |
| `persona` | Your role/title |
| `company` | Your organization |
| `defaultMode` | Fallback mode when classifier has no signal |
| `perspective` | `consultant` (you/your org), `internal` (we/our team), or `neutral` |

### API Keys (`.env`)

At minimum, set one provider key. See `.env.example` for all options.

## Usage

```bash
# Thought Leadership
npm run dev -- generate pov --input notes.txt --provider anthropic
npm run dev -- generate paper --input context.md --format word,pdf,html

# Solution Architecture
npm run dev -- generate architecture --input meeting-notes.md
npm run dev -- generate adr --input decision-context.md

# Executive Advisory
npm run dev -- generate deck --input recap.md --format pptx,html --theme signal-forge
npm run dev -- generate brief --input meeting-notes.md

# Documentation
npm run dev -- generate guide --input product-notes.md
npm run dev -- generate tutorial --input workflow-notes.md

# Explicit mode override
npm run dev -- generate deck --mode architecture --input tech-context.md

# Agentic mode with research and iterative refinement
npm run dev -- agent generate deck --input strategy.md --research --iterate
```

## Project Structure

```
signal-forge/
├── src/
│   ├── cli/              # CLI interface
│   ├── core/
│   │   ├── registries/   # Mode, voice, workflow, template registries
│   │   ├── types/        # Domain-specific type definitions
│   │   └── utils/        # File utilities, slugs
│   ├── content/
│   │   ├── voice/        # Voice validation (delegates to voice registry)
│   │   ├── classifier/   # Content classification (uses mode registry)
│   │   ├── templates/    # Content templates and parsers
│   │   └── design-system/# Presentation themes
│   ├── pipeline/
│   │   ├── roles/        # Ghost Writer, Copywriter, Editor, Doc Writer
│   │   ├── agents/       # Orchestrator, Production, Research agents
│   │   └── memory/       # Session and long-term memory
│   ├── output/
│   │   ├── exporters/    # PPTX, DOCX, PDF, HTML exporters
│   │   └── publishers/   # Local file, CMS publishers
│   ├── presets/           # Built-in preset definitions
│   │   ├── modes/        # Content mode definitions
│   │   ├── voices/       # Voice definitions
│   │   ├── workflows/    # Workflow definitions
│   │   └── templates/    # Template definitions
│   └── providers/        # AI provider integrations
├── docs/
│   ├── voice/            # Voice guides by content mode
│   ├── design-system/    # Design system documentation
│   └── guides/           # Extensibility guide, user-facing docs
└── templates/            # Markdown templates for generation
```

## Extensibility

Signal Forge separates engine from presets. Add custom content modes, voices, workflows, templates, and themes without modifying core code.

See [Extensibility Guide](docs/guides/extensibility.md).
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

## Development

```bash
<<<<<<< HEAD
# Build
npm run build

# Run in development mode
npm run dev

# Migrate decks content
npm run migrate-decks
```

=======
npm run build    # Build TypeScript
npm run dev      # Run CLI in development mode
```

## License

MIT
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
