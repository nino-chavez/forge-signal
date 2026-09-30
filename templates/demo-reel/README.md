# demo-reel

Make a narrated MP4 from screenshots and scene copy. Generate the script, narration, and storyboard separately so you can review each before rendering.

`generate.mjs` owns this staged screenshot workflow. `generate-video.mjs` remains the separate recorded-video compositor; it does not use these stage commands.

Interactive walkthroughs and silent motion over captured app screens belong to Render Kit. Authored product promos use the existing [marketing-video workflow](../marketing-video/README.md).

## Setup

Run the scaffold once for a new reel directory:

```bash
bash templates/demo-reel/scaffold.sh your-project/scripts/demo-reel
```

It copies the generator, shared helper, narration guide, and scene template. It refuses to overwrite an existing `captions.json`.

Capture your screenshots into `screenshots/` at 1440 × 900. Read `NARRATION.md`, then replace the example scenes in `captions.json`.

The generator needs Node.js 20+, ImageMagick 7 (`magick`), `ffmpeg`, and `ffprobe`. Script export needs only Node.js.

## Review flow

Run one stage, review its output, then run the next. These commands stop after their named stage.

| Stage | Command inside the reel directory | What to review |
|---|---|---|
| Script | `node generate.mjs script` | Read `out/script.txt` aloud. Check the claims and scene order. |
| Audio | `node generate.mjs audio` | Open `out/audio.html`. Listen for pronunciation, pace, and continuity. |
| Storyboard | `node generate.mjs storyboard` | Open `out/storyboard.html`. Check captions and composition. Expand each full-size frame. |
| Render | `node generate.mjs render` | Play `out/demo-reel.mp4`. Check the complete result. |

The previews embed their media, so they can be opened without a server. A storyboard can be generated before narration, but regenerate it after audio is ready.

The render stage checks that the script, frames, narration, and previews still match their inputs. It refuses missing or changed work. It does not generate speech or replace reviewed frames.

The commands provide review pauses. They do not record human approval or authorize publication.

## generate.mjs

    node generate.mjs [script|audio|storyboard|render|all] [options]

- `--root directory`: use that directory's `captions.json`, screenshots, and output folders. The default is the generator's own directory.
- `--silent`: omit narration. Each scene's `holdSeconds` is its complete duration and must be positive.
- `--force`: regenerate the selected stage's output. The render stage still checks its prerequisites.
- `--help`: show the stages and options without reading a scene file.
- `all`, or no stage argument: run every stage without review pauses. Use this for an intentional unattended run.

For a captions-only reel, use `--silent` on each stage, or run `node generate.mjs all --silent`. Set scene durations with `holdSeconds` or `defaultHoldSeconds`.

`REEL_NO_AUDIO=1` also selects silent mode. A stage cannot combine `--force` with its corresponding skip flag.

## Narration

Supply `ELEVENLABS_API_KEY` or `OPENAI_API_KEY` in the process environment from 1Password when generating new audio. ElevenLabs is preferred when both are supplied.

`generate.mjs` no longer searches sibling projects' `.env` files. Current audio, script export, storyboard generation, and rendering need no provider credentials.

- `TTS_VOICE` overrides `captions.json`'s `voice`.
- `TTS_MODEL` overrides its `model`.
- When neither is specified, defaults follow the selected provider: `george` / `eleven_multilingual_v2` for ElevenLabs; `coral` / `gpt-4o-mini-tts` for OpenAI.
- The scaffold's example voice and model are for ElevenLabs. Set both fields to OpenAI values when using that provider.
- `instructions` supplies optional narration guidance to the existing provider helper.

The audio stage saves effective provider, voice, model, and instruction settings in `audio/settings.json`. Credentials are excluded. Those settings let later stages verify the take without needing a key.

## Scene data

```json
{
  "voice": "george",
  "model": "eleven_multilingual_v2",
  "defaultHoldSeconds": 0.5,
  "scenes": [
    {
      "image": "scene-01.png",
      "title": "Short scene title",
      "caption": "The words to speak and display.",
      "captionPosition": "bottom",
      "holdSeconds": 0.8
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `scenes[].image` | Required filename inside `screenshots/`. |
| `scenes[].title` | Required title displayed in the caption band. |
| `scenes[].caption` | Required narration, also displayed as caption text. |
| `scenes[].captionPosition` | `top` or `bottom`; defaults to `bottom`. Choose the edge that preserves the important UI. |
| `scenes[].holdSeconds` | Silence after narration, or the whole duration with `--silent`. Overrides `defaultHoldSeconds`. |
| `defaultHoldSeconds` | Default hold per scene; `0.4` when omitted. |
| `voice`, `model`, `instructions` | Optional narration settings. |

## Reuse

Generated assets have adjacent `.cache.json` receipts. Each receipt records fingerprints of the inputs and the generated file's bytes.

| Change | Work that becomes stale |
|---|---|
| Spoken text, scene order, provider, voice, model, or instructions | The narration take and affected previews. |
| Screenshot bytes, title, caption placement, or frame layout | Affected frames and the storyboard. |
| Hold time | Previews and affected clips. |
| Generated file bytes | That asset and anything that uses it. |

Narration is regenerated as one take when any line changes. This preserves the existing ElevenLabs continuity mechanism across scenes. Title or screenshot edits retain matching audio.

Files from older generators have no receipts and must be regenerated once. Matching files are reused automatically.

`SKIP_TTS=1` and `SKIP_FRAMES=1` now require valid receipts. They fail when work is missing or stale, rather than accepting whatever file exists.

`--force` can refresh unchanged work after a tool upgrade or when you want another narration take.

## Compare treatments

Keep the approved words, audio, scene order, and timing fixed when comparing visual treatments. Judge a representative scene before rendering the whole reel again.

For captured walkthroughs, Render Kit already accepts custom motion HTML through `--template` and brand values through `--tokens`. Use the same capture manifest for each treatment.

For authored promos, keep using [marketing-video](../marketing-video/README.md) and its HyperFrames storyboard. Its visual options should share the same script and narration.

## Files

```text
scripts/demo-reel/
├── captions.json         Scene input
├── generate.mjs          Staged screenshot generator
├── lib.mjs               Shared media and cache helpers
├── NARRATION.md           Narration guidance
├── screenshots/          Source PNGs
├── audio/                Narration and effective settings
├── frames/               Captioned PNGs
├── clips/                Per-scene MP4s
└── out/
    ├── script.txt        Ordered script
    ├── audio.html        Playable narration preview
    ├── storyboard.html   Composition and audio preview
    └── demo-reel.mp4      Final reel
```

## Verification

From the Forge Signal checkout, run `npm run test:demo-reel`. The regression script uses the shipped scaffold and real media tools.

Provider responses are replaced with a locally generated tone. This verifies stage boundaries, cache failures, and MP4 assembly without paying for narration. It does not judge a real voice or establish a publishing approval.
