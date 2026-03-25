# Annotations Convention for AI-Generated Documents

## The Problem

AI-assisted content generation produces two things: the document and the reasoning that shaped it. The document ships. The reasoning dies when the conversation closes.

This matters because:
- **Readers can't distinguish grounded claims from plausible guesses.** A sentence sourced from API documentation looks identical to one the AI hallucinated.
- **Teams that inherit the document can't modify it safely.** Without knowing why a section exists or what alternatives were rejected, they either treat it as sacred text or rewrite it from scratch.
- **Assumptions are invisible.** The author knows which claims need validation. The next reader does not.

## The Convention

Every AI-generated document of sufficient complexity carries an optional **annotations layer** — structured rationale for each section, captured during the conversation that produced it.

### Annotation Structure

Each annotation answers four questions:

| Field | Question |
|-------|----------|
| **Why this section exists** | What decision, discovery, or conversation turn created it? |
| **What changed** | How does it differ from earlier drafts and why? |
| **Source tier** | Is the claim confirmed (docs, data), internal knowledge (author), or assumption (unvalidated)? |
| **Origin** | Where did the thinking come from? (conversation turn, research, domain expertise) |

### Delivery

Annotations are delivered as a **side drawer** in HTML output:

- **Invisible by default.** The document reads clean. No visual clutter.
- **Accessible on demand.** Click a section header to open the drawer.
- **Stripped on print.** Annotations do not appear in printed or PDF output.
- **Escape to close.** Keyboard accessible.
- **Mobile: full-screen overlay.** On narrow viewports, the drawer replaces the document view.

### When to Use

| Document Type | Annotations? | Why |
|--------------|-------------|-----|
| Strategy docs, roadmaps, planning frameworks | Yes | Teams inherit these. Reasoning prevents misinterpretation. |
| Executive briefs, recommendations | Yes | Stakeholders need to trace recommendations to evidence. |
| Architecture docs, ADRs | Optional | ADRs already capture rationale; annotations add conversation context. |
| Blog posts, thought leadership | No | The thinking IS the content. |
| Tutorials, guides, references | No | Instructions stand alone. |
| Short-form content (<1 page) | No | Not enough structure to annotate. |

### Anti-Patterns

1. **Auto-generating annotations.** If the rationale wasn't part of the actual conversation, don't fabricate it. The value is in real reasoning, not plausible-sounding meta-commentary.
2. **Annotating everything.** A blog post doesn't need a "why this paragraph exists" overlay. Reserve annotations for documents that will be read by people who weren't in the room.
3. **Putting annotations in the body.** The whole point is separation. The document is for the reader. The annotations are for the inheritor.
4. **Substituting annotations for inline flags.** If a claim is an assumption, flag it in the document AND explain it in the annotation. They serve different audiences.

## Implementation

### For HTML documents

Use the drawer component at `templates/annotations/drawer.html`.

1. Wrap your document content in `<div class="page">`
2. Add `class="annotated" data-note="sectionKey"` to any `<h2>` you want annotated
3. Define annotations as a JS object keyed by section ID
4. Include the drawer CSS, HTML, and JS from the template

### For other formats

- **Word/PDF:** Annotations could be delivered as a separate "Rationale Appendix" or as comments in the Word document. The drawer pattern doesn't translate to static formats.
- **PPTX:** Speaker notes can carry annotation content per slide.
- **Markdown:** A collapsible `<details>` block under each heading, or a separate `*-annotations.md` companion file.

### For other tools

This convention is not Signal Forge-specific. Any tool that generates documents from AI conversations should consider it. The implementation details change (drawer, comments, companion file), but the principle is the same:

**Ship the reasoning with the artifact.**

The cost of including annotations is low (a JSON object and a reusable UI component). The cost of losing the reasoning is high (misinterpreted assumptions, sacred-text syndrome, documents that can't be safely modified).

## Origin

Developed during a BigCommerce "Enterprise for SMB" strategy session (2026-03-25). The document went through multiple iterations:

1. First draft: AI-generated strategy with plausible but ungrounded claims
2. Second draft: Stripped to Internal Strategy voice — scannable, tables, no fluff
3. Third draft: Grounded in actual BigCommerce REST/GraphQL API docs, Makeswift docs, Feedonomics docs
4. Fourth draft: Audited for assumptions — ungrounded claims flagged inline
5. Fifth draft: Annotations drawer added — reasoning from the conversation travels with the document

Each iteration made the document more honest. The annotations capture why.
