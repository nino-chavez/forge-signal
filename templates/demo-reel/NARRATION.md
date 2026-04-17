# Narration Guide

The narration is the difference between a forgettable slideshow and a compelling demo. These rules are non-negotiable.

## Core principle

**The narration is NOT a description of what's on screen.** The viewer has eyes. The narration explains WHY it matters.

## Rules

### 1. Never announce features
Don't say "this feature allows..." or "here you can see..."

Instead, show what happened and land the insight:
- Bad: "This screen shows the KPI summary with six cards displaying metrics."
- Good: "I asked for a store summary. What came back isn't markdown — those are real React components rendered inline."

### 2. Don't label your insights
Never say "the so what is" or "this matters because" or "the key takeaway here is." Let the insight land naturally. If you have to announce that something is important, you haven't written it well enough.

- Bad: "The so what for the merchant is that they don't need to learn a new tool."
- Good: "The merchant doesn't learn a new tool — they just talk to the one they already have."

### 3. Conversational, not scripted
- Use contractions (they're, it's, doesn't, can't)
- Start sentences with "And" or "But" occasionally
- React to what's on screen as if showing it live to a colleague
- No passive voice ("the data is displayed" → "it shows the data")
- No marketing language ("leverage," "empower," "unlock," "seamless")

### 4. Three layers per scene
Every scene should touch three layers. Weave them in naturally — never label them as "functionally" / "technically" / "architecturally."

- **Functional**: what does the end user get? (faster answer, fewer clicks, stays in control)
- **Technical**: how does the system achieve it? (parallel API calls, sandboxed execution, typed SDK)
- **Architectural**: why does this approach matter beyond this product? (pattern for others, scales without code changes, credential isolation)

Not every scene needs all three in equal measure. A demo scene might be mostly functional. An architecture slide is mostly technical/architectural. But the best scenes weave all three in one breath.

### 5. Build momentum
Structure the reel as an escalation:

**Act 1 — Surface (scenes 1–3):** Show where it lives and that it works. Simple queries. Establish production reality, not prototype vibes.

**Act 2 — Capability (scenes 4–7):** Escalate complexity. Multi-step operations, writes, data joins. Show UX polish (follow-ups, tool indicators). Prove it's not a toy.

**Act 3 — Architecture (scenes 8–10):** How and why. System diagrams, generated code, tool surface. Connect the capabilities back to the architecture that makes them possible.

**Close (scene 11–12):** Short. Restate the product in one sentence. End with a line that sticks.

### 6. Numbers and terms
- Write out numbers: "twenty-nine tools" not "29 tools"
- Keep natural acronyms: API, AI, SDK, UI, URL
- Expand awkward ones: "version two" not "V2"
- Currency: "thirty-two ninety-nine dollars" not "$3,299"
- Technical terms the audience knows: keep them. Terms they don't: define in context.

### 7. Scene pacing
- Vary length. Quick scenes (15s) for simple points, longer (30–40s) for complex ones.
- Don't front-load every scene with setup. Some scenes should start mid-thought: "And here's where it gets interesting—"
- End scenes with forward momentum, not summary. The last line of scene N should make you want to hear scene N+1.

### 8. The close
The final scene should be:
- One sentence restating what the product is
- One sentence on what the pattern is (why this approach, not just this product)
- One line that sticks — a phrase the audience repeats to each other after the meeting

Good closes:
- "The merchant doesn't learn a new tool — they just talk to the one they already have."
- "The competitive moat isn't the AI. Anyone can call an LLM. The moat is teaching it to write like a specific brand for a specific domain."

## Anti-patterns

| Don't | Do |
|---|---|
| "This feature allows merchants to view their KPI data" | "Six metrics in six seconds — instead of four admin pages" |
| "As you can see on the screen, there is a DataTable" | "Products table with real SKUs. But look below it—" |
| "The so what here is trust" | "When an AI tells a merchant their revenue number, the merchant needs to know where that came from" |
| "Let me walk you through the architecture" | "Here's the core of it—" |
| "In conclusion, we've demonstrated that..." | "That's Ask BC. Codemode plus curated tools plus generative UI. That's the pattern. It works." |
| Same cadence every scene | Vary: short punchy scenes, longer exploratory ones |

## Before generating TTS

Read every caption aloud. If it sounds like a slide deck, rewrite it. If you stumble on a sentence, the TTS will too. If a scene is boring when you read it, it'll be boring when the audience hears it.

TTS credits cost money. Fix the text first.
