---
name: validate-content
description: Performs drift detection by comparing generated content against source materials. Identifies inconsistencies, outdated claims, and misalignments between documentation and implementation. Use after content generation or periodically to maintain accuracy.
---

# Content Validation & Drift Detection

Compare generated content against source materials to identify inconsistencies and drift. Ensures documentation remains accurate as systems evolve.

## When to Use This Skill

- After generating technical documentation
- Before publishing content that references specific implementations
- Periodically to audit existing documentation
- When source systems have changed

## Validation Protocol

### Pass 0: Glossary & Brand Canon Validation

Before checking implementation drift, validate against the project's own canonical language.

**Glossary check.** Load the project glossary in this order:
1. `CONTEXT.md` at project root (canonical glossary)
2. `forge-signal/.claude/CLAUDE.md` Content Taxonomy section (mode + voice taxonomy)
3. `docs/voice/*.md` (per-mode voice guides — authoritative for terminology)

For each canonical term, scan the content for:
- **Conflicts** — content uses the term to mean something different than the glossary defines
- **Drift** — content uses a synonym (e.g., "deck" when the glossary says "presentation") that erodes consistency
- **Missing terms** — content invents new terminology for a concept the glossary already names

**Brand canon check.** If the project links to a forge-brand kit (look for `brand-kit.json` reference in config or a sibling `*.voice.json` file produced by `forge brand export signal-forge-voice`):

1. Load the voice rules JSON.
2. For each `voice.attributes` entry, check the content reflects the trait.
3. For each `voice.antiPatterns` entry, scan the content for the pattern. Any match = drift.
4. For `openingPatterns`: if `questionFirst` is required, the content must open with a question or tension. If `avoidAcademic` lists terms, the content must not use them in the opening.
5. Score the alignment 0–10 (10 = full alignment, 0 = directly contradicts).

**ADR check.** If `docs/adr/` exists, scan ADRs that touch the content's subject area. Surface any contradictions: "Content claims X, but ADR-0007 standardized on Y."

Report Pass 0 findings before moving to source verification — these are higher-priority than implementation drift because they affect every consumer of the content.

### Pass 1: Source Material Inventory

Identify authoritative sources:

| Content Type | Check Against |
|--------------|---------------|
| Architecture docs | Actual code structure, configs |
| Technical specs | Implementation files |
| API documentation | Actual endpoints, schemas |
| Feature descriptions | Code behavior, UI |
| Configuration guides | Current config files |
| Diagrams | Current system topology |

### Pass 2: Claim Extraction

From the content being validated, extract:

1. **Technical Claims**
   - "The system uses X"
   - "Data flows from A to B"
   - "The API supports Y"

2. **Numerical Claims**
   - Performance numbers
   - Limits and thresholds
   - Counts and quantities

3. **Behavioral Claims**
   - "When X happens, Y occurs"
   - "Users can do Z"
   - "The process includes steps A, B, C"

### Pass 3: Source Verification

For each claim, verify against source:

```markdown
| Claim | Source | Status | Notes |
|-------|--------|--------|-------|
| "Uses PostgreSQL 14" | docker-compose.yml | ✅ Verified | Line 12 |
| "API rate limit is 100/min" | Not found | ⚠️ Unverifiable | No rate limit code found |
| "Users can export to CSV" | src/export.ts | ❌ Drift | Now also supports JSON |
```

### Pass 4: Drift Analysis

Categorize findings:

| Category | Description | Action |
|----------|-------------|--------|
| **Verified** | Claim matches source | None |
| **Drift - Minor** | Small discrepancy, not misleading | Update content |
| **Drift - Major** | Significant inaccuracy | Immediate correction |
| **Unverifiable** | Cannot find source | Flag for review |
| **Outdated** | Source has changed | Update to current |

---

## Output: Validation Report

```markdown
# Content Validation Report

**Content:** [Document name/path]
**Validated:** [Date]
**Sources Checked:** [List of source files/systems]

## Summary

| Status | Count |
|--------|-------|
| ✅ Verified | X |
| ⚠️ Unverifiable | X |
| ❌ Drift Detected | X |
| 📖 Glossary Conflicts | X |
| 🎨 Brand Voice Score | X/10 |
| 📋 ADR Contradictions | X |

**Overall Status:** [Pass | Needs Update | Requires Review]

## Verified Claims

| Claim | Source | Location |
|-------|--------|----------|
| [Claim text] | [File/system] | [Line/path] |

## Drift Detected

### Critical Drift

#### [Claim that is significantly wrong]

**In Content:** "[What the content says]"
**In Source:** "[What the source shows]"
**Source Location:** `path/to/file:line`
**Recommended Fix:** [How to correct]

### Minor Drift

#### [Claim that is slightly off]

**In Content:** "[Current text]"
**In Source:** "[Actual state]"
**Recommended Fix:** [Suggested update]

## Unverifiable Claims

| Claim | Searched Locations | Recommendation |
|-------|-------------------|----------------|
| [Claim] | [Where we looked] | [Verify manually / Remove / Flag] |

## Recommendations

1. **Immediate:** [Critical fixes needed]
2. **Short-term:** [Updates to schedule]
3. **Process:** [Suggestions to prevent future drift]

---

## Next Steps

- [ ] Apply critical fixes
- [ ] Review unverifiable claims with SME
- [ ] Schedule content refresh for minor drift
- [ ] Update sources if content is authoritative
```

---

## Automated Checks

For specific content types, automate verification:

### API Documentation

```bash
# Compare documented endpoints to actual routes
grep -r "router\." src/routes/ | extract-endpoints > actual.txt
grep "^###.*\`.*\`" docs/api.md | extract-endpoints > documented.txt
diff actual.txt documented.txt
```

### Configuration Documentation

```bash
# Compare documented env vars to actual usage
grep -r "process.env\." src/ | extract-vars > actual.txt
grep "^\|.*\|" docs/config.md | extract-vars > documented.txt
diff actual.txt documented.txt
```

### Dependency Documentation

```bash
# Compare documented versions to package.json
cat package.json | jq '.dependencies' > actual.json
# Compare to what's documented
```

---

## Integration

Run validation:
- Before publishing new content
- After significant code changes
- Monthly for critical documentation
- When onboarding reveals documentation issues

Output can feed into:
- Documentation update tasks
- Technical debt tracking
- Content refresh schedules
