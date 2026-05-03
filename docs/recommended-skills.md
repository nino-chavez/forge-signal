# Recommended Claude Code Skills

forge-signal ships its own project-specific skills (see `.claude/skills/`). For best results, install these general-purpose skills at the workspace level — they are referenced by forge-signal's skills and CLAUDE.md but not bundled.

## Project-bundled skills (already here)

Located in [`.claude/skills/`](../.claude/skills/):

| Skill | Purpose |
|---|---|
| `executive-pov` | POV/strategic-brief drafting in consultant voice |
| `thought-leadership` | Blog/article generation in Signal Dispatch voice |
| `solution-architecture` | arc42 architecture documents |
| `technical-specification` | Open-source specs and standards |
| `documentation` | User guides and tutorials |
| `governance-playbook` | Multi-volume governance frameworks |
| `strategic-deck` | Strategy and architecture presentations |
| `validate-content` | Drift detection vs. source material + brand canon |
| `project-discovery` | Four-pass codebase discovery |
| `project-config` | Per-project configuration generator |
| `project-organization` | Project structure conventions |

## Recommended workspace skills (install separately)

These are not bundled to avoid maintenance drift. Install once at `~/.claude/skills/` and reuse across all projects.

### From [matt-pocock/skills](https://github.com/mattpocock/skills) (MIT)

| Skill | Why forge-signal benefits |
|---|---|
| `tdd` | Use when adding generators or pipeline roles — voice-checker logic especially benefits from test-first |
| `diagnose` | Hard generation bugs (output drift, mode misclassification, iteration stalls) |
| `grill-with-docs` | Stress-test new content modes or voice rules against the existing taxonomy + ADRs before adding them |
| `to-prd` | Capture conversation-driven feature decisions as PRDs |
| `triage` | Manage incoming issues — content quality complaints often need careful state-machine triage |

### Custom workspace skills (Nino's setup)

| Skill | Why |
|---|---|
| `deepen` | Architecture review of pipeline roles — surface shallow modules, apply deletion test to optional steps |
| `simplify` | Code-quality review on diffs (built-in to Claude Code) |

## Installation

```bash
# General-purpose skills (one-time, workspace-level)
mkdir -p ~/.claude/skills
git clone https://github.com/mattpocock/skills /tmp/pocock-skills
for skill in tdd diagnose grill-with-docs to-prd triage; do
  cp -r /tmp/pocock-skills/skills/*/$skill ~/.claude/skills/$skill 2>/dev/null
done

# forge-signal's bundled skills work automatically when you run from the repo
```

## Convention: don't bundle general skills

This project deliberately does **not** redistribute upstream general-purpose skills, even though their MIT license permits it. Reasons:

1. Workspace-level install means one copy across all projects — no drift between forks
2. Upstream maintenance happens upstream
3. Project README stays focused on what's actually project-specific

If you contribute a new skill that's genuinely general-purpose, propose it upstream rather than bundling it here.
