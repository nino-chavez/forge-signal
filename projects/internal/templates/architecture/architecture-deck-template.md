# Architecture Deck Template

## Purpose

This template defines the structure for **Solution Architecture** presentations. Use this for technical architecture decks delivered to technical stakeholders, implementation teams, or mixed audiences requiring architectural understanding.

**Content Mode**: Solution Architecture
**Voice Guide**: `docs/solution-architecture-guide.md`

---

## Deck Structure

**Target Length**: 12-16 slides
**Presentation Time**: 20-30 minutes + discussion

---

### Slide 1: Title

**Content**:
- Solution/System Name
- Subtitle: "Technical Architecture Overview" or specific focus
- Date
- Author/Team

**Design**: Clean, minimal. Brand colors. No imagery needed.

---

### Slide 2: Executive Summary

**Content** (one page, scannable):
- **Problem** (1-2 sentences): What business/technical problem does this solve?
- **Solution** (1 paragraph): High-level approach
- **Key Decisions** (3-5 bullets): Major architectural choices
- **Expected Outcomes** (2-3 bullets): Measurable results

**Voice**: Definitive. No hedging. Facts and decisions.

**Example**:
```
PROBLEM
LLMs increasingly influence purchase decisions, but brands have no visibility
into AI-generated responses or tools to improve representation.

SOLUTION
An agentic RAG system that ingests brand visibility data, enables semantic
gap analysis, and generates optimized content to address coverage gaps.

KEY DECISIONS
• AWS Bedrock as agentic orchestrator for intent routing
• OpenSearch for semantic vector search
• Pre-calculated reporting for instant measurement queries

EXPECTED OUTCOMES
• 60% reduction in "I don't know" responses for tracked queries
• Sub-second response time for analysis queries
• Measurable before/after optimization tracking
```

---

### Slide 3: Context Diagram (C4 Level 1)

**Content**:
- System as single box in center
- All external actors (users, systems) around it
- Labeled relationships showing data/interaction flow
- Clear system boundary

**Design**: Diagram-first. Minimal text. Legend if needed.

**Required Elements**:
- [ ] System name in center box
- [ ] All human actors identified
- [ ] All external systems identified
- [ ] All integration points labeled
- [ ] Direction of data flow indicated

---

### Slide 4: Solution Strategy

**Content**:
- Architecture approach (1 sentence)
- 3-5 key architecture decisions in ADR summary format:
  - Decision name
  - One-line summary
  - Key trade-off

**Format**:
```
ARCHITECTURE APPROACH
Event-driven, serverless architecture on AWS with agentic orchestration.

KEY DECISIONS

ADR-001: Agentic Intent Routing
Route through Bedrock agent vs. conditional logic.
Trade-off: +Flexibility, -Latency (~300ms)

ADR-002: Pre-Calculated Reporting
Weekly batch vs. real-time queries.
Trade-off: +Performance, -Freshness (up to 7 days)

ADR-003: Grounding Enforcement
Forced retrieval before generation.
Trade-off: +Accuracy, -Flexibility
```

---

### Slide 5: Container Diagram (C4 Level 2)

**Content**:
- All deployable units (services, databases, queues, etc.)
- Technology labels on each container
- Data flow between containers
- External systems at edges

**Design**: Diagram-first. Color-code by type (compute, storage, external).

**Required Elements**:
- [ ] All containers identified with technology
- [ ] Data flow directions indicated
- [ ] External dependencies shown at boundary
- [ ] Grouping by logical domain if complex

---

### Slide 6-8: Component Deep-Dives (C4 Level 3)

**One slide per major component/flow**:

**Slide 6: Data Ingestion Flow**
- Component diagram for ingestion pipeline
- Step-by-step data transformation
- Technologies at each step

**Slide 7: Query/Analysis Flow**
- Component diagram for request handling
- Agent routing logic visualization
- Tool invocation sequence

**Slide 8: Measurement Flow**
- Component diagram for reporting
- Batch processing visualization
- Report generation and storage

**Format per slide**:
```
[FLOW NAME]

[Diagram showing components and sequence]

STEP 1: [Action] → [Technology]
STEP 2: [Action] → [Technology]
STEP 3: [Action] → [Technology]

KEY COMPONENT: [Name]
• Purpose: [One sentence]
• Input: [Format/source]
• Output: [Format/destination]
```

---

### Slide 9: Data Architecture

**Content**:
- Data stores and their purposes
- Schema overview (key fields, not full schema)
- Data flow between stores
- Retention and lifecycle

**Format**:
```
DATA STORES

┌─────────────────┬──────────────────┬─────────────────┐
│ Store           │ Purpose          │ Technology      │
├─────────────────┼──────────────────┼─────────────────┤
│ Raw Data        │ Audit trail      │ S3              │
│ Vector Store    │ Semantic search  │ OpenSearch      │
│ Reports         │ Pre-calculated   │ S3 (JSON)       │
└─────────────────┴──────────────────┴─────────────────┘

KEY SCHEMA: OpenSearch Index
• brand_name (keyword): Exact match filtering
• query_text (text): Full-text search
• query_vector (knn_vector): Semantic similarity
• timestamp (date): Time-series analysis
```

---

### Slide 10: Technology Stack

**Content**:
- All technologies organized by layer
- Rationale for key choices
- Version/configuration notes if relevant

**Format**:
```
TECHNOLOGY STACK

COMPUTE
• AWS Lambda (Python 3.11, Node.js 18)
• Rationale: Serverless, pay-per-use, auto-scaling

INTELLIGENCE
• AWS Bedrock (Claude 3 Sonnet)
• Rationale: Enterprise security, native AWS integration

STORAGE
• Amazon S3: Raw data, reports
• OpenSearch Service 2.x: Vector store
• Rationale: Managed services, semantic search capability

INTEGRATION
• API Gateway: REST endpoint
• EventBridge: Event routing
• Rationale: Serverless-native integration patterns
```

---

### Slide 11: Security & Cross-Cutting Concerns

**Content**:
- Authentication/Authorization approach
- Data encryption (at rest, in transit)
- Key security controls
- Observability strategy

**Format**:
```
SECURITY

Authentication: API Gateway + API Key + IAM
Authorization: Role-based via IAM policies
Encryption:
  • At rest: S3 SSE-S3, OpenSearch encryption
  • In transit: TLS 1.3

GROUNDING ENFORCEMENT
System prompt requires retrieval before generation.
Agent cannot generate content without retrieved context.

OBSERVABILITY

Logging: CloudWatch Logs (structured JSON)
Metrics: CloudWatch Metrics + custom business metrics
Tracing: AWS X-Ray for distributed tracing
Alerting: CloudWatch Alarms on error rates, latency
```

---

### Slide 12: Risks & Mitigations

**Content**:
- Top 5-7 risks in table format
- Severity and likelihood
- Specific mitigation for each

**Format**:
```
RISKS & MITIGATIONS

┌────┬─────────────────────────────┬────────┬────────┬─────────────────────────┐
│ ID │ Risk                        │ Sev.   │ Prob.  │ Mitigation              │
├────┼─────────────────────────────┼────────┼────────┼─────────────────────────┤
│ R1 │ LLM hallucination           │ High   │ Medium │ Forced retrieval        │
│ R2 │ Incomplete data coverage    │ Medium │ High   │ Coverage metrics        │
│ R3 │ OpenSearch failure          │ High   │ Low    │ Multi-AZ, snapshots     │
│ R4 │ Cost overrun (Bedrock)      │ Medium │ Medium │ Token budgets, alerts   │
│ R5 │ Stale reports               │ Low    │ High   │ Timestamp display       │
└────┴─────────────────────────────┴────────┴────────┴─────────────────────────┘
```

---

### Slide 13: Deployment Architecture

**Content**:
- Infrastructure diagram
- Environment overview (dev/staging/prod)
- CI/CD pipeline summary
- IaC approach

**Format**:
```
DEPLOYMENT

ENVIRONMENTS
• Development: Feature development, synthetic data
• Staging: Integration testing, sanitized prod data
• Production: Live system, real data

INFRASTRUCTURE AS CODE
• Framework: AWS CDK (TypeScript)
• Stacks: Network, Data, Compute, API

CI/CD PIPELINE
PR → Tests → CDK Synth → Staging Deploy → Integration Tests → Approval → Prod

[Infrastructure diagram showing VPC, subnets, services]
```

---

### Slide 14: Implementation Roadmap

**Content**:
- Phases with scope, duration, deliverables
- Dependencies between phases
- Success criteria per phase

**Format**:
```
IMPLEMENTATION ROADMAP

PHASE 1: DATA FOUNDATION (Weeks 1-3)
Scope: Ingestion pipeline + OpenSearch setup
Deliverables: S3 config, Lambda ingestion, OpenSearch cluster
Success: Daily data ingestion working

PHASE 2: AGENT CORE (Weeks 4-6)
Scope: Bedrock agent with tools
Deliverables: Agent config, AEO tool, Query tool
Success: Correct intent routing

PHASE 3: MEASUREMENT (Weeks 7-8)
Scope: Reporting capabilities
Deliverables: Distillation Lambda, Reporting tool
Success: Before/after comparisons available

PHASE 4: HARDENING (Weeks 9-10)
Scope: Security, monitoring, docs
Deliverables: Security audit, dashboards, runbooks
Success: Production-ready

[Timeline visualization]
```

---

### Slide 15: Success Metrics

**Content**:
- Technical metrics with targets
- Business metrics with targets
- Measurement approach

**Format**:
```
SUCCESS METRICS

TECHNICAL
┌────────────────────────┬───────────┬────────────────────┐
│ Metric                 │ Target    │ Measurement        │
├────────────────────────┼───────────┼────────────────────┤
│ Query latency (P95)    │ < 2s      │ CloudWatch         │
│ System availability    │ 99.5%     │ Uptime monitoring  │
│ Error rate             │ < 1%      │ CloudWatch Logs    │
└────────────────────────┴───────────┴────────────────────┘

BUSINESS
┌────────────────────────┬───────────┬────────────────────┐
│ Metric                 │ Target    │ Measurement        │
├────────────────────────┼───────────┼────────────────────┤
│ Visibility gap closure │ 60%       │ Profound delta     │
│ Content optimization   │ 100/month │ System logs        │
│ User adoption          │ 80%       │ Active users       │
└────────────────────────┴───────────┴────────────────────┘
```

---

### Slide 16: Next Steps / Discussion

**Content**:
- Immediate next steps (with owners if known)
- Open questions for discussion
- Decision points needed

**Format**:
```
NEXT STEPS

1. Finalize Profound API access credentials — [Owner] — [Date]
2. Provision AWS infrastructure (staging) — [Owner] — [Date]
3. Begin Phase 1 implementation — [Owner] — [Date]

OPEN QUESTIONS

• What is acceptable data staleness for reporting?
• Should optimization recommendations require approval before export?
• What is the monthly budget ceiling for Bedrock?

DECISION NEEDED

• Approve architecture and proceed to Phase 1
• Request modifications (specify)
• Defer pending [specific dependency]
```

---

## Slide Design Principles

### Typography
- Slide titles: 28-32pt, bold
- Section headers: 18-20pt, bold
- Body text: 14-16pt, regular
- Table text: 12-14pt

### Color Usage
- Primary accent: Brand purple for headers, diagram borders
- Secondary: Gray scale for body text
- Status colors: Green (success), Yellow (warning), Red (risk)
- Diagram colors: Consistent palette for component types

### Diagram Standards
- Use consistent shapes for component types
- Include legend on complex diagrams
- Label all connections with data/interaction type
- Maintain consistent spacing and alignment

### Content Density
- Prefer diagrams over text
- Maximum 6 bullets per slide
- Tables for comparative information
- White space is valuable

---

## Anti-Patterns to Avoid

| Avoid | Why | Instead |
|-------|-----|---------|
| Narrative prose on slides | Not scannable | Bullets, tables, diagrams |
| Questions as slide titles | Architecture should answer, not ask | Definitive statement titles |
| "I think" / "perhaps" | Undermines technical authority | Definitive statements |
| Dense text blocks | Won't be read | Visual hierarchy, spacing |
| Missing legends | Diagrams become unclear | Always include legend |
| Inconsistent iconography | Confuses audience | Standardize symbols |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-25 | Initial template based on content taxonomy |
