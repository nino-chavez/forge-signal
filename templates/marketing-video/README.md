# marketing-video

A narrated product-promo pipeline built on HyperFrames' `/product-launch-video`
workflow — the sibling of `../demo-reel/` for a different format. Where
`demo-reel/` is a scripted `.mjs` pipeline you run unattended, this one has no
engine to write: HyperFrames' own capture → design-system → storyboard → build →
render loop already is the engine. What this template supplies is the thin layer
around it — a standing set of interview answers and the gotchas hit building the
first real video (rally-hq's promo) — not a script.

**Don't invent HTML/CSS by hand for this format.** `/product-launch-video`
dispatches one frame-worker sub-agent per beat, each instantiating a proven
motion blueprint (`hyperframes-animation/blueprints-index.md`) against your
real captured brand tokens. Hand-authoring a promo scene from scratch throws
that away.

## Pipeline

1. `npx hyperframes skills update product-launch-video` — installed lazily; do
   this before anything else, it's a silent no-op if already current.
2. `npx hyperframes init "videos/<project>" --non-interactive --example=blank`
3. Copy `BRIEF.template.md` → `<project>/BRIEF.md`, fill in the fields (see below).
4. Record the preference-backed fields with `media-use`'s `prefs.mjs record`
   (destination / aspect / language / flow / storyboard / style_preset) — the
   route's own Step 0 explains which.
5. `npx hyperframes capture "<url>" -o ./capture` — pulls real brand tokens +
   screens from the live site. Don't hand-author brand facts; this step is the
   canonical source.
6. Pick ONE frame preset (`hyperframes-creative/frame-presets/`) by structural
   fit, not literal color match — colors get remixed onto your captured tokens
   automatically. Run `build-frame.mjs --preset <name>`.
7. Write `STORYBOARD.md` + `SCRIPT.md` yourself (the orchestrator role) — real
   beats, real copy, no invented positioning. Pick each beat's blueprint from
   the role→blueprint menu; `compose` is legitimate when nothing fits (e.g. a
   single real screenshot with no interaction to demonstrate).
8. Generate narration + sync durations, THEN rewrite each frame's internal
   Scene timing to the REAL synced duration — estimates are usually wrong,
   sometimes by 2x in either direction. Never leave stale Scene timing against
   a re-synced frame duration.
9. Dispatch one frame-worker sub-agent per beat (parallel is fine).
10. `hyperframes lint && hyperframes check && hyperframes snapshot` before
    rendering. Check snapshots at FULL resolution, not the compressed contact
    sheet — the contact sheet's thumbnail grid understates type scale and can
    make a correctly-sized frame look under-scaled.
11. `hyperframes render --skill=product-launch-video --quality high`

Reuse `../demo-reel/reframe.mjs` to cut the finished 16:9 render into social
sizes (1080x1920 / 1080x1080 / 1080x1350) — don't duplicate that script here.

## Real gotchas hit building rally-hq's promo (first real use of this template)

- **`npx hyperframes auth status` exits 1 when signed out — that's normal, not
  a failure.** Don't retry it or chain it with `&&`.
- **ElevenLabs needs the Python package, not just the API key.**
  `pip install elevenlabs` — on a Homebrew-managed Python (PEP 668), that's
  `pip3 install --user --break-system-packages elevenlabs`. A missing-package
  failure looks identical to a bad key in `audio.mjs`'s output ("TTS failed —
  omitted") — check `python3 -c "import elevenlabs"` before assuming the key
  is wrong.
- **Real voice duration rarely matches your estimate.** One frame nearly
  doubled (7s estimated → 11.9s real), another shrank by half (9s → 4.3s) —
  short enough it couldn't carry the 3-beat CTA chain originally planned.
  Compress the shot, don't stretch the audio.
- **Captured `logo-*.svg` files are often false positives** — the capture
  step flags anything inside a `<header>`/home-link/aria-labeled-brand
  element as a logo candidate, which catches generic icons (a trophy, an X,
  a monitor) as often as the real mark. Open the candidates before using one.
  Same caution applies to any repo's own static app-icon file — it can be
  stale (rally-hq's `static/icons/icon-source.svg` was a pre-rebrand indigo
  mark, not the live Rally Gold brand). When no accurate logo asset exists,
  close on a typographic wordmark instead of shipping something off-brand.
- **Judge scale from the full-resolution snapshot, not the contact sheet.**
  The compressed grid view makes correctly-sized display type look small
  twice in the same build — checked at full res both times, both were fine.

## `BRIEF.template.md`

See the sibling file. Fields mirror `hyperframes-core/references/brief-format.md`
exactly — this template doesn't reinvent that contract, it just gives you a
starting point with the fields a marketing-promo brief actually needs filled.
