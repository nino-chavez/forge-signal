# Demo Reel Template

Produces TTS-narrated MP4 videos from screenshots + captions. Each scene is a still image with a translucent caption overlay and AI-generated voiceover.

## Quick start

```bash
# 1. Create a demo-reel directory in your project
mkdir -p scripts/demo-reel/screenshots

# 2. Copy the generator and template
cp templates/demo-reel/generate.mjs your-project/scripts/demo-reel/
cp templates/demo-reel/captions.template.json your-project/scripts/demo-reel/captions.json

# 3. Capture screenshots at 1440x900
# 4. Edit captions.json with your scenes
# 5. Generate

ELEVENLABS_API_KEY=sk_... node scripts/demo-reel/generate.mjs
```

## Prerequisites

- `ffmpeg`, `ffprobe`, `magick` (ImageMagick 7+) installed
- ElevenLabs API key (preferred) or OpenAI API key (fallback)
- Screenshots at 1440x900 resolution

## Pipeline

```
captions.json → TTS audio per scene → ImageMagick caption overlay → ffmpeg clips → concat → MP4
```

## File structure

```
scripts/demo-reel/
├── captions.json      # Voice, model, scenes array
├── generate.mjs       # Pipeline runner
├── screenshots/       # 1440x900 PNGs (demo-NN-slug.png)
├── audio/             # [generated] TTS MP3s
├── frames/            # [generated] Screenshots with caption burn-in
├── clips/             # [generated] Per-scene MP4s
└── out/               # [generated] Final MP4
```

## captions.json

```json
{
  "voice": "l30f87tf05uxyknGdDw6",
  "model": "eleven_multilingual_v2",
  "defaultHoldSeconds": 0.5,
  "scenes": [
    {
      "image": "demo-01-slug.png",
      "title": "Short scene title",
      "caption": "Narration text.",
      "captionPosition": "bottom",
      "holdSeconds": 0.8
    }
  ]
}
```

| Field | Required | Default | Description |
|---|---|---|---|
| `voice` | yes | — | ElevenLabs voice ID or name from the built-in map |
| `model` | no | `eleven_multilingual_v2` | TTS model |
| `defaultHoldSeconds` | no | `0.4` | Silence after each scene's audio |
| `scenes[].image` | yes | — | Filename in `screenshots/` |
| `scenes[].title` | yes | — | Bold title burned into the caption band |
| `scenes[].caption` | yes | — | Narration text (also rendered as body text) |
| `scenes[].captionPosition` | no | `bottom` | `top` or `bottom` — flip when UI is anchored to the same edge |
| `scenes[].holdSeconds` | no | `defaultHoldSeconds` | Override per-scene |

## Voices

### Built-in map (pass the name, not the ID)
| Name | ID | Description |
|---|---|---|
| george | JBFqnCBsd6RMkjVDRZzb | British, warm, narration |
| rachel | 21m00Tcm4TlvDq8ikWAM | American, clear, professional |
| adam | pNInz6obpgDQGcFmaJgB | American, deep, confident |
| josh | TxGEqnHWrfWFTfGW9XjX | American, conversational |
| sam | yoZ06aMxZJJ28mfd3POQ | American, casual |
| charlie | IKne3meq5aSn9XLyUdCD | Australian, friendly |

Or pass any ElevenLabs voice ID directly.

### Voice settings (in generate.mjs)
```json
{
  "stability": 0.55,       // 0-1. Lower = more expressive, less consistent
  "similarity_boost": 0.80,
  "style": 0.25,           // 0-1. Lower = subtle, higher = theatrical
  "use_speaker_boost": true
}
```

For technical demos, keep stability ≥0.5 and style ≤0.3. Theatrical voices sound fake on technical content.

## Runtime options

```bash
# ElevenLabs (preferred)
ELEVENLABS_API_KEY=sk_... node generate.mjs

# OpenAI fallback
OPENAI_API_KEY=sk-... node generate.mjs

# Override voice
TTS_VOICE=l30f87tf05uxyknGdDw6 node generate.mjs

# Skip steps (reuse cached assets)
SKIP_TTS=1 node generate.mjs      # reuse audio/*.mp3
SKIP_FRAMES=1 node generate.mjs   # reuse frames/*.png
```

## Caption-only variant (no voiceover)

For silent reels with on-screen captions only (e.g., muted exec room playback):
- Keep captions to 2 lines max per scene
- Set `defaultHoldSeconds` to 2.0–3.0 so each frame lingers
- Don't set an API key — the generator skips TTS and creates silent clips
- The caption overlay still burns in via ImageMagick

## Capturing screenshots

1. Use chrome-devtools MCP or Playwright
2. Resize to 1440x900: `resize_page({width: 1440, height: 900})`
3. Drive real interactions — click, type, wait for responses
4. Capture when visually compelling (response complete, no spinners)
5. For scrollable content, scroll the inner container first
6. Close devtools, bookmarks, extra tabs before capture

## Cost

| Provider | Cost per run (~5K chars) |
|---|---|
| ElevenLabs Starter (30K chars/mo included) | $0.00 within tier |
| ElevenLabs overage | ~$1.50 per run |
| OpenAI gpt-4o-mini-tts | ~$0.003 per run |
