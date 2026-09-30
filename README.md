# Forge Signal

Voice-aware content generation with mode-specific AI pipelines and multi-format export.

## Why

Content generation tools produce generic output. An architecture doc shouldn't read like a blog post. A strategy deck shouldn't read like a technical spec. Forge Signal enforces voice consistency through mode-specific pipelines — each content mode has its own voice principles, validation rules, and workflow, so the output matches the intent.

## Content Modes

| Mode | Use for | Voice |
|------|---------|-------|
| **Thought Leadership** | Blog posts, POVs, papers | Composed, evidence-aware, provisional where warranted |
| **Solution Architecture** | Architecture docs, ADRs, specs | Definitive, diagram-heavy, precise |
| **Executive Advisory** | Strategy decks, briefs, roadmaps | Confident, outcome-focused |
| **Documentation** | Guides, tutorials, references, explanations | Task-matched, direct, reader-aware |

Modes are extensible — add your own via the registry system without modifying core code.

## Features

- Four built-in content modes with voice validation
- Multi-provider AI (OpenAI, Anthropic, Gemini, Perplexity)
- Multi-format export (Word, PDF, PowerPoint, Google Slides, HTML)
- **Demo-reel workflow** — TTS-narrated MP4 videos from screenshots (ElevenLabs / OpenAI + ffmpeg + ImageMagick)
- Extensible registry system for modes, voices, workflows, templates, and themes
- Configurable perspective (consultant, internal, neutral)
- Presentation theme system with design tokens

## Getting Started

```bash
# 1. Clone and install
git clone git@github.com:nino-chavez/forge-signal.git
cd forge-signal
npm install

# 2. Configure API keys
cp .env.example .env
# Edit .env — add at least one provider API key

# 3. Initialize user config
npm run dev -- init
# Interactive prompts write ~/.signal-forge/config.json
# (author, persona, company, perspective, default mode)

# 4. Generate content
npm run dev -- generate pov --input notes.txt
```

After building (`npm run build`), you can link the CLI globally:

```bash
npm run build
npm link
forge generate deck --input recap.md --format pptx,html
```

## Configuration

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
npm run dev -- generate explanation --input system-context.md

# Explicit mode override
npm run dev -- generate deck --mode architecture --input tech-context.md

# Agentic mode with research and iterative refinement
npm run dev -- agent generate deck --input strategy.md --research --iterate
```

### Reader contracts

Every generation path can state who will read the artifact and what they need from it. `--audience` names the reader; `--reader-job` names the decision, understanding, or action the artifact must enable. Use `--assumed-knowledge` to avoid explaining what the reader already knows, `--plainness` to choose `lay`, `practitioner`, or `specialist`, and `--precision-locks` for terms, facts, or voice traits that must survive revision.

When the current repository contains `reader-contract.json`, Forge loads it automatically. A single declared surface is selected automatically; for a multi-surface project, pass `--surface "merchant documentation"`. Use `--reader-contract path/to/file.json` for another contract or `--ignore-reader-contract` to opt out. CLI reader flags override the selected file values.

```bash
npm run dev -- generate explanation \
  --input architecture-notes.md \
  --audience "support lead" \
  --reader-job "explain why retries can arrive out of order" \
  --assumed-knowledge "webhooks,HTTP status codes" \
  --plainness practitioner \
  --precision-locks "idempotency,event ID"
```

The content type still controls the artifact's job: tutorials teach by doing, guides help complete a task, references support lookup, and explanations build understanding. Reader plainness changes the language inside that job; it does not force every document into the same structure.

### Demo Reels

The demo-reel template makes narrated MP4s from screenshots and scene copy. Its `script`, `audio`, `storyboard`, and `render` commands stop for review. Rendering requires current inputs and previews; unchanged generated assets are reused.

Scaffold a new reel directory with `bash templates/demo-reel/scaffold.sh your-project/scripts/demo-reel`, then follow [the review flow](templates/demo-reel/README.md#review-flow).

Script and storyboard previews need no provider credentials. Supply narration credentials in the process environment from 1Password when generating new audio. Read [NARRATION.md](templates/demo-reel/NARRATION.md) before writing scene copy.

Interactive walkthroughs use Render Kit. Authored product promos use the existing [HyperFrames marketing-video workflow](templates/marketing-video/README.md).

## Project Structure

```
forge-signal/
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
│   ├── presets/          # Built-in preset definitions
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
    ├── architecture/     # ADR, architecture deck templates
    ├── demo-reel/        # TTS-narrated video pipeline
    └── governance/       # Playbook templates
```

## Extensibility

Forge Signal separates engine from presets. Add custom content modes, voices, workflows, templates, and themes without modifying core code.

See [Extensibility Guide](docs/guides/extensibility.md).

## Development

```bash
npm run build    # Build TypeScript
npm run dev      # Run CLI in development mode
```

## License

MIT
