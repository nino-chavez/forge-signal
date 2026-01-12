# The Architect Track

**Tagline:** Design systems. Write implementation-ready documentation.
**Timeline:** 8-12 weeks
**Final Artifact:** Complete arc42 solution architecture document

---

## Hero Section

### The Architect Track

Design systems. Write implementation-ready documentation.

Most architecture diagrams are lies. Pretty boxes that promise clarity but deliver confusion. The diagram says one thing; the code does another; the team argues about both.

I spent a year watching LLMs help me build systems—and realized they could also help me *document* systems. Not the hand-wavy "here's roughly how it works" kind of documentation. The kind where someone could build it without asking clarifying questions.

This track teaches you to create that kind of documentation—with AI assistance.

**Timeline:** 8-12 weeks
**You'll build:** Complete arc42 solution architecture with C4 diagrams, ADRs, and component specifications

---

## Who This Is For

### This track is for you if:

- You've built systems but struggle to document them clearly
- You want architecture decisions to be traceable and defensible
- You need to communicate technical complexity to mixed audiences
- You're tired of diagrams that don't match reality

### This track is NOT for you if:

- You've never built a production system (do Builder Track first)
- You want to learn system design theory (this is documentation, not design)
- You're looking for a certification (this produces artifacts, not credentials)

---

## The Voice Shift

**Critical concept:** Architecture documentation requires a *different voice* than thought leadership.

| Thought Leadership | Architecture |
|-------------------|--------------|
| "Here's where I've landed—for now" | "The system uses X" |
| Question-first, exploratory | Statement-first, definitive |
| Shows the thinking process | Shows the conclusions |
| Invites dialogue | Invites implementation |
| Provisional | Reference-grade |

Most people who write well in one mode struggle with the other. Consultants who write great POVs produce vague architecture docs. Engineers who write precise specs sound robotic in blog posts.

This track teaches the architecture voice specifically.

---

## What You'll Learn

### The arc42 Template

arc42 is a pragmatic template for documenting software architectures. Not because it's the only option—but because it's battle-tested and comprehensive.

The 12 sections:
1. Introduction and Goals
2. Constraints
3. Context and Scope
4. Solution Strategy
5. Building Block View
6. Runtime View
7. Deployment View
8. Cross-cutting Concepts
9. Architecture Decisions
10. Quality Requirements
11. Risks and Technical Debt
12. Glossary

You don't need all 12 for every system. But knowing the full structure helps you know what to skip consciously vs. what you're missing accidentally.

### The C4 Model

C4 provides four levels of abstraction for diagramming:

| Level | Name | Shows | Audience |
|-------|------|-------|----------|
| 1 | Context | System + external actors | Everyone |
| 2 | Container | Applications, databases, services | Technical + Product |
| 3 | Component | Internal structure of containers | Developers |
| 4 | Code | Class/function level | Deep implementation |

Most documentation stops at Level 1 (if it has diagrams at all). Levels 2-3 are where clarity lives.

### Architecture Decision Records (ADRs)

Every architecture has decisions. Most are invisible—buried in Slack threads, lost in memory, or implied by code that "just is."

ADRs make decisions explicit:

```markdown
# ADR-001: Use PostgreSQL for Primary Data Store

## Status
Accepted

## Context
We need a primary data store for user data, transactions, and content.

## Decision
Use PostgreSQL (via Supabase) rather than MongoDB or DynamoDB.

## Rationale
- Relational model fits our domain (users → teams → projects)
- Supabase provides auth, realtime, and edge functions in one
- Team has PostgreSQL experience; MongoDB would require upskilling
- Cost model is predictable vs. DynamoDB's pay-per-request

## Consequences
- Must handle connection pooling for serverless (Supabase handles this)
- Schema migrations require planning (not schemaless)
- Vendor lock-in to Supabase specifically (acceptable for this project)

## Alternatives Considered
- MongoDB Atlas: Better for unstructured data, but our data is structured
- DynamoDB: Better scalability ceiling, but overkill for our scale
- PlanetScale: Strong option, but Supabase's bundled features won
```

The discipline isn't in the format. It's in *writing them at all*.

---

## The Levels

### Level 0: Foundations (1-2 days)

**Goal:** Understand the templates before you start filling them.

#### Read These

1. **arc42 Documentation** — [arc42.org](https://arc42.org)
   The full template with explanations for each section.

2. **C4 Model** — [c4model.com](https://c4model.com)
   Simon Brown's introduction to the four levels.

3. **Documenting Architecture Decisions** — Michael Nygard's original ADR post
   Why ADRs matter and how to write them.

4. **From my corpus:** `solution-architecture-guide.md` (17,295 words)
   My implementation of arc42 with voice guidelines.

#### Understand These Concepts

| Concept | Definition |
|---------|------------|
| **Context Diagram** | Shows your system as a box, with lines to users and external systems |
| **Container** | A separately deployable unit (API, database, web app, mobile app) |
| **Component** | A logical grouping within a container (auth module, payment service) |
| **ADR** | A record of a significant architectural decision with rationale |
| **Quality Attribute** | A non-functional requirement (performance, security, scalability) |
| **Trade-off** | What you gave up to get what you chose |

#### Checkpoint

You can explain:
- The difference between Context, Container, and Component diagrams
- Why ADRs include "Alternatives Considered"
- What makes architecture documentation "implementation-ready"

---

### Level 1: Document (1-2 weeks)

**Goal:** Create your first architecture document for an existing system.

Pick a system you've already built. Not a toy project—something with:
- At least 2 containers (e.g., frontend + API, or API + database)
- At least 1 external integration
- At least 3 decisions you remember making

#### Create These Artifacts

1. **Context Diagram**
   - Your system as a single box
   - All users/actors who interact with it
   - All external systems it connects to
   - Use arrows with labels (not just lines)

2. **Container Diagram**
   - Break your system box into its deployable parts
   - Show the technology for each (e.g., "Next.js on Vercel")
   - Show how they communicate (HTTP, WebSocket, database connection)

3. **3 ADRs**
   - Pick 3 decisions that shaped the system
   - Use the template: Status, Context, Decision, Rationale, Consequences, Alternatives

#### Tools to Use

| Tool | Purpose | Why |
|------|---------|-----|
| **Excalidraw** | Quick diagrams | Hand-drawn feel, low friction |
| **D2** | Diagram-as-code | Version control, reproducible |
| **Mermaid** | Embedded diagrams | Lives in markdown, renders anywhere |

#### From the Corpus

**Example: Signet AEO Context Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┐         ┌───────────────────────────────┐    │
│  │ Brand Manager│────────▶│   Agentic RAG for AEO        │    │
│  └──────────────┘         │   (Our System)                │    │
│                           └───────────────────────────────┘    │
│                                      │                          │
│                    ┌─────────────────┼─────────────────┐        │
│                    ▼                 ▼                 ▼        │
│            ┌─────────────┐   ┌─────────────┐   ┌─────────────┐ │
│            │ Profound API│   │ Client CMS  │   │ AWS Bedrock │ │
│            │ (Visibility │   │ (Content    │   │ (LLM        │ │
│            │  Data)      │   │  Publish)   │   │  Processing)│ │
│            └─────────────┘   └─────────────┘   └─────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

See the full implementation: `signet/aeo/agentic-rag-for-aeo-architecture.md`

#### Checkpoint

You have:
- A Context diagram showing your system's boundaries
- A Container diagram showing internal structure
- 3 ADRs with rationale and alternatives
- All artifacts in a single markdown file or repo

---

### Level 2: Decisions (2-3 weeks)

**Goal:** Develop discipline around capturing decisions as they happen.

The real skill isn't writing ADRs for past decisions. It's writing them *before* or *as* you decide.

#### Practice This Workflow

For every significant decision in your current work:

1. **Before deciding:** Write the Context section
   - What problem are you solving?
   - What constraints exist?

2. **While deciding:** Write the Alternatives section
   - What are 2-3 real options?
   - What would each cost/enable?

3. **After deciding:** Write Decision, Rationale, Consequences
   - What did you choose?
   - Why?
   - What trade-offs did you accept?

#### Create These Artifacts

Write **5 new ADRs** for decisions in active work. Not historical—current.

Include at least:
- 1 technology selection (database, framework, service)
- 1 architectural pattern (monolith vs. microservices, sync vs. async)
- 1 integration approach (REST vs. GraphQL, polling vs. webhooks)
- 1 security/compliance decision
- 1 "we decided NOT to do X" (scope/deferral decisions count)

#### The Trade-off Table

For each ADR, add a trade-off analysis:

| Option | Pros | Cons | Fit |
|--------|------|------|-----|
| PostgreSQL | Relational, familiar, Supabase bundle | Schema rigidity | Best fit |
| MongoDB | Flexible schema, document model | Team unfamiliar, separate auth | Considered |
| DynamoDB | Infinite scale, AWS native | Cost unpredictable, learning curve | Rejected |

This table often goes in the Rationale section.

#### From the Corpus

**Example: ADR-001 from Signet AEO**

```markdown
### ADR-001: Agentic Intent Routing

**Decision**: Route user requests through AWS Bedrock as an agent
rather than conditional logic.

**Rationale**:
- User intent is ambiguous ("Why is visibility dropping and what should I do?")
- Requests may require chaining multiple tools in sequence
- New tools can be added via configuration, not code changes

**Trade-off**: +Flexibility for complex queries, -Latency (~200-400ms added)
```

See the full ADR set: `signet/aeo/agentic-rag-for-aeo-architecture-v2.md`

#### Checkpoint

You have:
- 5 ADRs written during active decision-making
- Trade-off tables for each
- A sense of when a decision is "significant" enough to document

---

### Level 3: Complete (3-4 weeks)

**Goal:** Create a complete arc42 solution architecture document.

This is the capstone. Pick a system—ideally one you're actively building—and document it fully.

#### Create These Sections

1. **Introduction and Goals**
   - What is the system?
   - What problem does it solve?
   - Who are the stakeholders?
   - What are the quality goals?

2. **Constraints**
   - Technical constraints (must use X technology)
   - Organizational constraints (team size, timeline)
   - Regulatory constraints (GDPR, SOC2)

3. **Context and Scope**
   - Context diagram (Level 1 C4)
   - Business context (who uses it, why)
   - Technical context (what it integrates with)

4. **Solution Strategy**
   - Key architectural approaches
   - Technology decisions summary
   - Decomposition strategy

5. **Building Block View**
   - Container diagram (Level 2 C4)
   - Component diagrams for key containers (Level 3 C4)
   - Interface definitions

6. **Runtime View**
   - Key scenarios as sequence diagrams
   - At least: happy path, error path, async flow

7. **Deployment View**
   - Infrastructure diagram
   - Environment differences (dev, staging, prod)
   - Deployment process overview

8. **Cross-cutting Concepts**
   - Authentication/Authorization
   - Error handling
   - Logging/Monitoring
   - Security measures

9. **Architecture Decisions**
   - All ADRs (from Level 2 plus new ones)
   - Decision log with status

10. **Quality Requirements**
    - Quality tree
    - Quality scenarios

11. **Risks and Technical Debt**
    - Known risks with mitigation
    - Technical debt backlog

12. **Glossary**
    - Domain terms
    - Technical terms

#### Recommended Length

| Section | Target Length |
|---------|--------------|
| Introduction | 500-1,000 words |
| Constraints | 300-500 words |
| Context | 500-800 words + diagrams |
| Solution Strategy | 800-1,200 words |
| Building Blocks | 1,500-2,500 words + diagrams |
| Runtime | 500-1,000 words + diagrams |
| Deployment | 500-800 words + diagrams |
| Cross-cutting | 1,000-1,500 words |
| Decisions | 200-400 words per ADR |
| Quality | 500-800 words |
| Risks | 300-500 words |

**Total: 8,000-15,000 words** (varies by system complexity)

#### From the Corpus

**Example: Signet AEO v2 Architecture**

The Signet AEO architecture document is 51,386 words across:
- Full arc42 structure
- 15 Excalidraw diagrams
- 8 ADRs
- Deployment specifications
- Quality scenarios

This is more comprehensive than you need for Level 3—but shows what "complete" looks like.

See: `signet/aeo/agentic-rag-for-aeo-architecture-v2.md`

#### Checkpoint

You have:
- Complete arc42 document (all 12 sections)
- At least 5 diagrams (Context, Container, Component, Runtime, Deployment)
- At least 5 ADRs
- Document is implementation-ready (someone could build from it)

**This is your Level 3 artifact. Show it to me.**

---

### Level 4: Integration (4+ weeks)

**Goal:** Document cross-system dependencies and integration patterns.

Most systems don't exist alone. They integrate with other systems—some you control, some you don't.

#### Document These

1. **System-of-Systems Context**
   - Your system as one box among many
   - All systems it depends on
   - All systems that depend on it

2. **Integration Patterns**
   - Sync vs. async for each integration
   - Data flow direction
   - Contract ownership (who defines the API?)

3. **Failure Modes**
   - What happens when each dependency fails?
   - Retry strategies
   - Circuit breaker patterns
   - Fallback behaviors

4. **Data Consistency**
   - What's the source of truth for each data type?
   - How is consistency maintained across systems?
   - Eventual consistency windows

5. **Integration ADRs**
   - Why this integration approach vs. alternatives?
   - What contracts were negotiated?
   - What compromises were made?

#### From the Corpus

**Example: BBY ACP-AP2 Integration Plan**

The Best Buy integration plan documents how to integrate with two external protocols (ACP from OpenAI/Stripe, AP2 from Google) in a single commerce system.

Key sections:
- Protocol comparison table
- Integration architecture (both protocols)
- Phased rollout plan
- Risk assessment

See: `bby/docs/ACP-AP2-INTEGRATION-PLAN.md`

#### Checkpoint

You have:
- System-of-systems context diagram
- Integration pattern documentation for 3+ external systems
- Failure mode analysis
- Integration-specific ADRs

---

## Tools & Templates

### The solution-architecture Skill

Location: `skills/solution-architecture/`

Contains:
- `SKILL.md` — Full skill definition with voice guidelines
- `references/solution-architecture-guide.md` — 17,295 word guide
- `references/adr-template.md` — ADR template

Use with Claude:
```
"Document the architecture for [system] using the solution-architecture skill"
```

### Diagram Tools

| Tool | Best For | Format |
|------|----------|--------|
| Excalidraw | Quick sketches, collaborative | .excalidraw, PNG |
| D2 | Version-controlled diagrams | .d2, SVG |
| Mermaid | Embedded in markdown | Code blocks |
| PlantUML | Sequence diagrams | Code blocks |
| Structurizr | C4-native tooling | DSL |

### Templates

- **arc42 Template:** [arc42.org/download](https://arc42.org/download)
- **ADR Template:** `skills/solution-architecture/references/adr-template.md`
- **C4 Diagram Guide:** [c4model.com](https://c4model.com)

---

## From the Corpus: Complete Examples

### Signet AEO Architecture (Primary Example)

**What it is:** Solution architecture for an AI-powered brand visibility optimization system.

**Versions:**
| Version | Focus | Size |
|---------|-------|------|
| v1 | Initial architecture | 12,046 words |
| v2 | AWS-native refinement | 51,386 words |
| v3.4 | Delivery plan + governance | 17,000 words |
| v3.5 | Options analysis | 31,000 words |

**What it demonstrates:**
- Evolution of architecture through versions
- Complete arc42 structure
- 40+ diagrams (Excalidraw, D2, SVG)
- ADRs with trade-off analysis
- Delivery governance integration

**Location:** `projects/signet/aeo/`

### BBY ACP-AP2 Integration Plan

**What it is:** Technical integration plan for two external commerce protocols.

**What it demonstrates:**
- Protocol comparison documentation
- Integration architecture
- Phased rollout planning
- Risk assessment

**Location:** `projects/bby/docs/ACP-AP2-INTEGRATION-PLAN.md`

---

## The Architect's Voice

Remember: Architecture documentation is NOT thought leadership.

### Do This

- "The system uses AWS Bedrock for intent routing"
- "We chose PostgreSQL because..."
- "The API returns 429 when rate limited"
- "Authentication is handled by Supabase Auth"

### Not This

- "Here's where I've landed—for now on the database question"
- "I've been thinking about whether we should use..."
- "There's an interesting tension between..."
- "What if we considered..."

Architecture documents are **reference material**. Someone should be able to build from them without asking you questions.

The goal is clarity, not personality.

---

## Ready?

Complete Level 3 and show me your arc42 document.

Not a diagram. Not an outline. The complete document with all 12 sections, diagrams, and ADRs.

That's how I know you've internalized the template—not just read about it.

[Email Me (After Level 3)](mailto:abelino.chavez@gmail.com?subject=Architect%20Track%20-%20Level%203%20Complete)

---

## Related Tracks

**Before this:** [Builder Track](/learn/builder) — Build the systems you'll document
**After this:** [Enterprise Track](/learn/enterprise) — Scale documentation across teams
**Parallel:** [Strategist Track](/learn/strategist) — Different voice, same rigor
