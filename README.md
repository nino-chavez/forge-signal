# Signal Forge

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
```

## Configuration

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

## Development

```bash
# Build
npm run build

# Run in development mode
npm run dev

# Migrate decks content
npm run migrate-decks
```

