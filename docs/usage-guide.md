# Signal Forge Usage Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API keys**:
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

3. **Generate content**:
   ```bash
   npm run generate deck --input recap.md --output deck.pptx
   ```

## Commands

### Generate Content

```bash
forge generate <type> [options]
```

**Content Types**:
- `deck` - Strategic slide deck
- `pov` - Short-form strategy POV (800-1200 words)
- `paper` - Long-form strategy paper (3000-8000 words)

**Options**:
- `-i, --input <file>` - Input file (meeting notes, recap, etc.)
- `-o, --output <file>` - Output file path
- `-p, --provider <provider>` - AI provider: openai, anthropic, google, perplexity
- `-f, --format <formats>` - Output formats (comma-separated): word,pdf,pptx,slides
- `--audience <audience>` - Target audience
- `--no-edit` - Skip editor review

## Examples

### Generate a Deck

```bash
# From meeting recap
forge generate deck --input meeting-recap.md --output strategy-deck.pptx

# With specific provider
forge generate deck --input recap.md --provider claude --format pptx,pdf
```

### Generate a POV

```bash
# Short-form strategy POV
forge generate pov --input notes.txt --format word,pdf

# For executive audience
forge generate pov --input context.md --audience executive --format word
```

### Generate a Paper

```bash
# Long-form strategy paper
forge generate paper --input research-context.md --format word,pdf

# Skip editor review (faster, less polished)
forge generate paper --input context.md --no-edit --format word
```

## Output Formats

- **word/docx** - Microsoft Word document
- **pdf** - PDF document
- **pptx/powerpoint** - PowerPoint presentation
- **slides/googleslides** - Google Slides (requires credentials)
- **html/web/webpage** - Standalone HTML web page (interactive for decks, formatted for POVs/papers)

## Configuration

### Environment Variables

Set in `.env` file:

```env
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
GOOGLE_API_KEY=your_key
PERPLEXITY_API_KEY=your_key
DEFAULT_AI_PROVIDER=anthropic
GOOGLE_SLIDES_CREDENTIALS_PATH=path/to/credentials.json
```

### Google Slides Setup

1. Create a service account in Google Cloud Console
2. Enable Google Slides API
3. Download credentials JSON
4. Set `GOOGLE_SLIDES_CREDENTIALS_PATH` in `.env`

## Tips

1. **Input Quality**: Better input = better output. Include context, stakeholder concerns, and key questions.

2. **Provider Selection**: 
   - Anthropic (Claude) - Best for strategic thinking
   - OpenAI (GPT-4) - Good general purpose
   - Google (Gemini) - Strong for technical content
   - Perplexity - Best for research-heavy content

3. **Voice Consistency**: The system automatically applies voice principles. Review output to ensure it matches your style.

4. **Iteration**: If output doesn't match expectations, try:
   - Different provider
   - More detailed input context
   - Adjusting audience parameter

