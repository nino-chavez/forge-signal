# High-Density Memo Voice Guide

## Overview

This voice guide defines the "High-Density Memo" style used for executive strategy documents. This style prioritizes **information density** over narrative flow. Every sentence must add new information. If a word can be removed without losing meaning, remove it.

This style is inspired by internal memos at companies like Amazon, Stripe, and Bridgewater—organizations where executives read dozens of documents daily and have zero tolerance for padding.

---

## Core Principles

### 1. One Page Maximum

The entire memo must fit on one printed page. No exceptions. This constraint forces ruthless prioritization. If you can't fit it on one page, you don't understand it well enough.

### 2. High Entropy Writing

Every sentence should introduce new information. Remove:
- Filler phrases ("It's worth noting that...", "As we discussed...")
- Redundant adjectives ("very unique", "extremely critical")
- Throat-clearing ("Before we begin...", "Let me start by saying...")
- Obvious statements ("This is an important decision")

**Low entropy:** "It is important to note that the WP Engine platform, which is widely used by many of our target merchants, does not allow external MySQL connections to their hosted databases."

**High entropy:** "WP Engine blocks external MySQL connections. This eliminates DMS for ~60% of our target market."

### 3. No Lists or Tables in Body

The body of the memo uses prose paragraphs only. Lists and tables belong in appendices. The exception is the SCQR header, which uses a structured format for quick scanning.

### 4. Clinical Tone

Write like a surgeon's notes, not a salesperson's pitch. State facts. Draw conclusions. Make recommendations. Do not hedge, qualify, or soften.

**Hedging:** "We might want to consider potentially moving forward with Path A, which could possibly be the better option."

**Clinical:** "We will proceed with Path A. It is the only viable option given the WP Engine constraint."

---

## Document Structure

### Header Block

```
MEMORANDUM
To:       [Recipients]
From:     [Author]
Date:     [Date]
Subject:  [Specific, action-oriented subject line]
```

### Executive Summary (SCQR)

Four lines maximum. Each line is one sentence.

- **Situation:** What is the context? (The launch, the deadline, the commitment)
- **Complication:** What is the constraint or problem? (The blocker, the conflict, the risk)
- **Question:** What decision needs to be made? (Framed as a "how" or "which" question)
- **Recommendation:** What should we do? (Direct statement, not a suggestion)

### The Argument (1 paragraph)

Explain why the recommended path is correct and why alternatives fail. This paragraph should:
- State the constraint that makes the decision clear
- Quantify the impact (percentages, timelines, costs)
- Dismiss alternatives with evidence, not opinion

### The Solution (1 paragraph)

Explain the technical approach in plain language. This paragraph should:
- Name the specific fix (technology, architecture, approach)
- Explain why this fix addresses the constraint
- Note any dependencies or prerequisites

### The Plan (1 paragraph)

Describe execution phases as narrative, not a list of dates. This paragraph should:
- Name each phase and its goal
- Indicate duration and key milestones
- Highlight what must be true for each phase to succeed

### The Ask (3 bullet points)

End with exactly three blocking decisions required to proceed. Each bullet should:
- Name the decision domain (Infrastructure, Resources, Authorization)
- Specify what needs to be confirmed
- Indicate the deadline

---

## Prompt Template

Use this prompt to generate high-density memos:

```
Role: You are a Principal Product Manager at Stripe.

Task: Rewrite the attached strategy document as a High-Density 1-Page Memo.

Constraints:
1. Maximum Length: 1 page (approximately 500 words). No exceptions.
2. No Lists/Tables in Body: Write in narrative prose paragraphs only. Exception: SCQR header and final Ask section.
3. High Entropy: Remove all filler words. If a sentence works without an adjective, remove it. If a paragraph works without a sentence, remove it.
4. Structure:
   - SCQR Header: 4 lines max, one sentence each.
   - The Argument: One paragraph explaining why the recommended path is correct.
   - The Solution: One paragraph explaining the technical approach.
   - The Plan: One paragraph describing phases as narrative, not date lists.
   - The Ask: 3 bullet points for immediate blocking decisions.

Tone: Clinical, decisive, urgent. No hedging. No throat-clearing. State facts, draw conclusions, make recommendations.

Format: Plain text or simple HTML suitable for printing on letter paper with 1-inch margins.
```

---

## Anti-Patterns

### Narrative Bloat

**Problem:** AI interprets "narrative" as "write more words."

**Solution:** Emphasize "high entropy" and "one page maximum" as hard constraints. Count words if necessary.

### Passive Recommendations

**Problem:** "We might consider..." or "One option would be..."

**Solution:** Use imperative voice. "We will proceed with X." "I recommend Y."

### Date Listing

**Problem:** Converting tables to vertical lists of dates.

**Solution:** Embed dates in narrative. "Phase 1 runs Feb 10–21 and concludes with infrastructure decision."

### Missing Quantification

**Problem:** "Many merchants use WP Engine" instead of "~60% of target merchants."

**Solution:** Always include percentages, timelines, or counts. Vague is weak.

---

## Examples

### Before (Low Density)

> It's worth noting that one of the key challenges we face is the fact that WP Engine, which is a popular hosting platform used by many of our potential customers, has a security policy that prevents external services from connecting directly to the MySQL databases they host. This means that our current Data Migration Service, which relies on direct database connections for data extraction, would not be able to work properly for merchants hosted on WP Engine.

### After (High Density)

> WP Engine blocks external MySQL connections. This eliminates DMS for ~60% of our target market. We must use REST API extraction instead.

---

## When to Use This Voice

- Executive decision memos requiring approval
- Strategy documents with fixed deadlines
- Cross-functional alignment documents
- Any document where the reader has < 5 minutes

## When NOT to Use This Voice

- Technical specifications (need detail)
- User documentation (need completeness)
- Thought leadership content (need exploration)
- Training materials (need repetition and examples)

---

## Related Documents

- `/docs/voice/executive-advisory-voice.md` — For longer strategic documents
- `/docs/voice/solution-architecture-voice.md` — For technical specifications
- `/templates/architecture/adr-template.md` — For architecture decisions
