# Agentic RAG for AEO: Solution Architecture & Delivery Plan (V2)

**Mode**: Solution Architecture + Consulting Delivery
**Template**: architecture-deck-template.md
**Voice Guide**: solution-architecture-guide.md
**Consulting Framework**: Accenture Song Delivery Model

---

## Slide 1: Title

**Agentic RAG for Answer Engine Optimization**

End-to-End Solution Architecture & Delivery Plan

November 2024 | V2.0

---

## Slide 2: Executive Summary

### Problem

LLMs increasingly influence purchase decisions. When a consumer asks an AI assistant about products, brands have no visibility into how they're represented—or tools to improve that representation.

### Solution

An AWS-native agentic RAG system that:
- Ingests brand visibility data from Profound API
- Enables semantic gap analysis via vector search
- Generates optimized content addressing coverage gaps
- Measures before/after impact with quantifiable metrics

### Approach: AWS-Native "Special Forces"

This architecture removes low-code orchestration layers (e.g., n8n) in favor of a lean, highly-skilled team with deep Python/Boto3 and AWS security expertise. The result is a more performant, maintainable, and cost-effective solution.

### Key Architecture Decisions

| Decision | Choice | Trade-off |
|----------|--------|-----------|
| Intent Routing | AWS Bedrock Agent | +Flexibility, -Latency (~300ms) |
| Search | OpenSearch with vectors | +Semantic matching, -Embedding lock-in |
| Measurement | Pre-calculated weekly | +Performance, -Freshness (7 days) |
| Orchestration | Native AWS (Lambda + EventBridge) | +Control, -Requires stronger team skills |

### Expected Outcomes

- **60% gap closure** on "visibility blind spots" for tracked queries
- **Sub-2-second response time** for analysis queries
- **Measurable lift** via before/after optimization tracking
- **Pilot-ready** in 6 weeks with defined success criteria

---

## Slide 3: Delivery Team & Skills (AWS-Native "Special Forces")

### Team Composition

| Role | FTE | Skills Required | Primary Responsibility |
|------|-----|-----------------|------------------------|
| **Lead AWS Architect / Backend** | 1.0 | Python, AWS Lambda, EventBridge, IAM, OpenSearch | The Builder. Writes Lambdas for data movement. Configures vector database. Sets up IAM roles for Bedrock ↔ S3 communication. Owns QA and testing. |
| **AEO / SEO Strategist (+ Engagement Manager)** | 1.0 | SEO, Prompt Engineering, Excel/Data Analysis, Client Management | The Content Brain + Client Lead. Creates 400 prompts for Profound. Defines "Gold Standard" for product descriptions. **Owns client relationship, status reporting, and escalation management.** |
| **GenAI Engineer** | 1.0 | Bedrock Agents, Prompt Chaining, JSON Schema | The Agent Trainer. Configures Bedrock Agent action groups. Teaches agent to use tools vs. hallucinate. Writes Profound data interpretation logic. Owns knowledge transfer sessions. |
| **Data Analyst / Engineer** | 0.5 | Python (Pandas), QuickSight/Tableau | The Measurer. Writes distillation scripts for visibility lift calculation. Transforms JSON data into executive readouts. |

**Total Team Size**: 4.0 FTE (including distributed QA/KT effort)

### Engagement Manager Accountability

The **AEO Strategist** serves as the de facto **Engagement Manager** for this pilot, responsible for:
- Weekly status reporting to client stakeholders
- Escalation management (Team → Lead Architect → Client Stakeholder → Executive Sponsor)
- Change request triage and approval coordination
- Quality gate sign-offs
- Client satisfaction and relationship health

*Note: This is a combined role appropriate for a 10-week POC. Larger engagements would have a dedicated EM.*

### Skills Matrix

| Skill | Lead Architect | AEO Strategist | GenAI Engineer | Data Analyst |
|-------|:--------------:|:--------------:|:--------------:|:------------:|
| Python / Boto3 | ● | ○ | ● | ● |
| AWS Lambda / EventBridge | ● | ○ | ◐ | ○ |
| IAM / Security | ● | ○ | ◐ | ○ |
| OpenSearch / Vector DB | ● | ○ | ◐ | ○ |
| Bedrock Agents | ◐ | ○ | ● | ○ |
| Prompt Engineering | ◐ | ● | ● | ○ |
| SEO / AEO Domain | ○ | ● | ◐ | ◐ |
| Data Visualization | ○ | ◐ | ○ | ● |

**Legend**: ● Primary | ◐ Secondary | ○ Awareness

### Role Dependencies

![excalidraw](diagrams/role-dependencies.excalidraw)

---

## Slide 4: Profound Setup Requirements (The Input)

### Overview

The "Profound Setup" is the fuel for the AWS engine. **If this data is incomplete or incorrect, the system produces nothing of value.** Three specific artifacts must be delivered to the AWS team before coding begins.

### Artifact A: The Prompt Bank (CSV/Excel)

| Property | Details |
|----------|---------|
| **Owner** | AEO Strategist |
| **Format** | CSV or Excel with columns: `prompt_id`, `query_text`, `intent_category`, `sub_category`, `priority` |
| **Volume** | 400 prompts minimum (pilot scope) |
| **Due Date** | Week 0 (before development starts) |

**What it is**: A curated list of questions users ask LLMs, categorized by intent.

**Example prompts**:
- "Best diamond necklace under $500" (Purchase Intent)
- "Is Kay Jewelers gold real?" (Trust/Quality Intent)
- "Engagement ring trends 2024" (Research Intent)

**Why needed**: Profound executes scans against these prompts. The sub-category selection (Watches vs. Rings) directly determines prompt content.

**Quality Criteria**:
- [ ] All prompts validated for relevance to pilot sub-category
- [ ] Intent categories mapped to business objectives
- [ ] Priority scoring applied (1-5 scale)
- [ ] Reviewed by client stakeholder

### Artifact B: The Competitor List

| Property | Details |
|----------|---------|
| **Owner** | Client Stakeholder + AEO Strategist |
| **Format** | Simple list of 3-5 competitor domains |
| **Due Date** | Week 0 (before development starts) |

**What it is**: Domains against which Share of Voice (SOV) is measured.

**Example**:
```
1. zales.com
2. jared.com
3. tiffany.com
4. brilliantearth.com
5. bluenile.com
```

**Why needed**: Profound measures relative visibility. Without defined competitors, the Measurement Tool returns "Unknown Competitor" for SOV calculations.

**Validation**: Confirm competitors represent actual market positioning (not aspirational).

### Artifact C: The Output Schema Definition

| Property | Details |
|----------|---------|
| **Owner** | AEO Strategist + GenAI Engineer |
| **Format** | Sample JSON file documenting exact Profound export structure |
| **Due Date** | Week 1 (before Ingestion Lambda development) |

**What it is**: The precise JSON structure Profound exports.

**Critical**: The AWS Ingestion Lambda **will fail** if this schema changes without corresponding code updates.

**Example Schema**:
```json
{
  "scan_id": "prf_20241115_001",
  "timestamp": "2024-11-15T08:00:00Z",
  "query": "best gold chain for men",
  "llm_source": "chatgpt",
  "response_rank": 2,
  "sentiment": "positive",
  "citations": ["kay.com", "jared.com"],
  "content_snippet": "Kay Jewelers offers a wide selection...",
  "visibility_score": 0.72,
  "competitor_mentions": [
    {"domain": "jared.com", "rank": 1, "sentiment": "positive"},
    {"domain": "zales.com", "rank": 3, "sentiment": "neutral"}
  ]
}
```

**Schema Governance**:
- [ ] Schema version tracked in documentation
- [ ] Change notification process defined with Profound
- [ ] Backwards-compatible parsing implemented in Lambda

---

## Slide 5: System Context (C4 Level 1)

![excalidraw](diagrams/system-context.excalidraw)

### Actors

| Actor | Type | Interaction |
|-------|------|-------------|
| Brand Manager | Human | Queries system for visibility insights, requests content optimization |
| AEO Strategist | Human | Configures prompts, interprets results, guides optimization strategy |
| Profound API | External System | Provides daily brand visibility audit data (JSON export to S3) |
| Client PIM/CMS | External System | Receives optimized content for publication (manual for pilot) |

### Scope

**In Scope (Pilot)**:
- Data ingestion from Profound API
- Semantic search and gap analysis
- Content optimization recommendations
- Before/after measurement
- Executive readout generation

**Out of Scope (Phase 1)**:
- Direct PIM integration (manual upload path provided)
- Real-time LLM response monitoring
- Multi-brand competitive benchmarking
- Automated content publishing

---

## Slide 6: Solution Strategy

### Architecture Approach

Event-driven, serverless architecture on AWS with agentic orchestration for intent routing. No low-code orchestration layer—requires AWS-native expertise.

### ADR-001: Agentic Intent Routing

**Decision**: Route user requests through AWS Bedrock as an agent rather than conditional logic.

**Rationale**:
- User intent is ambiguous ("Why is visibility dropping and what should I do?")
- Requests may require chaining multiple tools in sequence
- New tools can be added via configuration, not code changes

**Trade-off**: +Flexibility for complex queries, -Latency (~200-400ms added)

### ADR-002: Pre-Calculated Reporting

**Decision**: Run weekly distillation jobs rather than real-time delta queries.

**Rationale**:
- Measurement queries need historical comparison (T0 vs T1)
- Pre-calculation enables instant response for "Did it work?" queries
- Weekly cadence aligns with content optimization cycles

**Trade-off**: +Performance (instant answers), -Freshness (up to 7 days stale)

### ADR-003: Grounding Enforcement

**Decision**: System prompt enforces retrieval before generation.

**Rationale**:
- Prevents LLM from hallucinating insights not grounded in Profound data
- Creates auditable link between response and source data
- Enables confidence scoring based on retrieval quality

**Trade-off**: +Accuracy and trust, -Flexibility for creative responses

### ADR-004: No Low-Code Orchestration

**Decision**: Use native AWS services (Lambda, EventBridge, Step Functions) instead of n8n or similar tools.

**Rationale**:
- Reduces operational complexity (no additional platform to manage)
- Improves performance (no middleware latency)
- Better cost control (pure serverless billing)
- Requires smaller but more skilled team

**Trade-off**: +Performance and control, -Requires Python/AWS expertise (no citizen developer path)

---

## Slide 7: Container Diagram (C4 Level 2)

![excalidraw](diagrams/container-diagram.excalidraw)

### Container Specifications

| Container | Technology | Purpose | Scaling |
|-----------|------------|---------|---------|
| API Gateway | AWS API Gateway | Public REST endpoint, auth | Auto |
| Request Handler | Lambda (Python 3.11) | Validation, routing to agent | 1000 concurrent |
| Bedrock Agent | AWS Bedrock (Claude 3 Sonnet) | Intent classification, orchestration | Per-request |
| AEO Guiding Tool | Lambda (Python 3.11) | Gap identification, optimization | Event-driven |
| Reporting Tool | Lambda (Python 3.11) | Pre-calculated report retrieval | Event-driven |
| Distillation Lambda | Lambda (Python 3.11) | Weekly delta calculation | Scheduled |
| OpenSearch | OpenSearch Service 2.x | Vector store, semantic search | 3-node cluster |

---

## Slide 8: Data Ingestion Flow

![excalidraw](diagrams/data-ingestion-flow.excalidraw)

### Data Ingestion Lambda Specification

| Property | Value |
|----------|-------|
| Runtime | Python 3.11 |
| Memory | 1024 MB |
| Timeout | 5 minutes |
| Trigger | S3 PUT event on `profound-exports` bucket |
| Output | Documents indexed to `aeo-knowledge-base` OpenSearch index |

### Embedding Configuration

| Property | Value |
|----------|-------|
| Model | Amazon Titan Embeddings v2 |
| Dimensions | 1024 |
| Fields Embedded | `query_text`, `content_snippet` |
| Batch Size | 25 documents per invocation |

### Ingestion Process

1. S3 event triggers Lambda on new file upload
2. Lambda validates JSON against expected schema
3. Text fields extracted and sent to Titan for embedding
4. Document + vector written to OpenSearch
5. Success/failure logged to CloudWatch

---

## Slide 9: Query Flow (Optimization Request)

![excalidraw](diagrams/query-flow.excalidraw)

### Query Types Supported

| Query Type | Example | Tool Invoked |
|------------|---------|--------------|
| Gap Analysis | "Why is visibility dropping on gold chains?" | AEO Guiding Tool |
| Optimization Request | "How should I improve ring descriptions?" | AEO Guiding Tool |
| Measurement | "Did last week's changes help?" | Reporting Tool |
| Coverage Check | "What queries are we not ranking for?" | AEO Guiding Tool |

### Latency Budget

| Stage | Target | Notes |
|-------|--------|-------|
| API Gateway | 10ms | Auth + routing |
| Request Handler | 50ms | Validation |
| Bedrock Intent | 200ms | Intent classification |
| Tool Invocation | 100ms | Lambda cold start amortized |
| OpenSearch Query | 100ms | kNN + filter |
| Bedrock Generation | 500ms | Content generation |
| **Total P95** | **~1000ms** | Under 2s target |

---

## Slide 10: Measurement Flow

![excalidraw](diagrams/measurement-flow.excalidraw)

### Measurement Tool Specification

| Property | Value |
|----------|-------|
| Runtime | Python 3.11 |
| Memory | 2048 MB |
| Timeout | 15 minutes |
| Trigger | User request via Bedrock Agent OR weekly EventBridge schedule |
| Output | Measurement report with S3 link for detailed data |

### Distillation Lambda Specification

| Property | Value |
|----------|-------|
| Runtime | Python 3.11 |
| Memory | 4096 MB |
| Timeout | 15 minutes |
| Trigger | Weekly EventBridge rule (Sunday 2am UTC) |
| Output | Compressed JSON summary to `s3://aeo-reports/weekly/` |

### Measurement Calculation Logic

```python
def calculate_visibility_delta(week1_data, week2_data):
    """
    Compare visibility scores across two time periods.
    Returns aggregate and per-query deltas.
    """
    deltas = []
    for query_id in week1_data.keys():
        if query_id in week2_data:
            delta = week2_data[query_id]['visibility_score'] - week1_data[query_id]['visibility_score']
            deltas.append({
                'query_id': query_id,
                'query_text': week1_data[query_id]['query_text'],
                'delta': delta,
                'week1_score': week1_data[query_id]['visibility_score'],
                'week2_score': week2_data[query_id]['visibility_score']
            })

    aggregate_delta = sum(d['delta'] for d in deltas) / len(deltas)
    return {
        'aggregate_delta': aggregate_delta,
        'per_query_deltas': sorted(deltas, key=lambda x: x['delta'], reverse=True),
        'improved_count': len([d for d in deltas if d['delta'] > 0]),
        'declined_count': len([d for d in deltas if d['delta'] < 0]),
        'unchanged_count': len([d for d in deltas if d['delta'] == 0])
    }
```

---

## Slide 11: AWS Analysis & Measurement Flows (The Black Box)

### Flow A: Analysis (The "Update" Cycle)

This is the intelligence gathering phase—processing new Profound data and making it queryable.

![excalidraw](diagrams/analysis-flow.excalidraw)

### Flow B: Measurement (The "Report" Cycle)

This is the accountability phase—calculating whether optimizations worked.

![excalidraw](diagrams/measurement-report-flow.excalidraw)

---

## Slide 12: Data Architecture

### Data Stores

| Store | Purpose | Technology | Retention |
|-------|---------|------------|-----------|
| Raw Exports | Audit trail, reprocessing | S3 Standard | 90 days (then Glacier) |
| Vector Index | Semantic search | OpenSearch | Rolling 90 days |
| Compressed Reports | Pre-calculated analytics | S3 Standard | 1 year |
| Manual Uploads | PIM fallback content | S3 Standard | 90 days |

### OpenSearch Index Schema

```json
{
  "mappings": {
    "properties": {
      "scan_id": { "type": "keyword" },
      "brand_name": { "type": "keyword" },
      "query_text": { "type": "text" },
      "query_vector": {
        "type": "knn_vector",
        "dimension": 1024
      },
      "share_of_voice": { "type": "float" },
      "sentiment_score": { "type": "float" },
      "response_rank": { "type": "integer" },
      "timestamp": { "type": "date" },
      "llm_source": { "type": "keyword" },
      "product_category": { "type": "keyword" },
      "competitor_mentions": { "type": "nested" },
      "citations": { "type": "keyword" }
    }
  }
}
```

### Data Retention Policy

| Data Type | Hot Storage | Archive | Deletion |
|-----------|-------------|---------|----------|
| Raw Profound JSON | 90 days (S3 Standard) | S3 Glacier (1 year) | After 2 years |
| Vector Embeddings | 90 days (OpenSearch) | N/A (re-index from raw) | Rolling delete |
| Compressed Reports | 1 year (S3 Standard) | S3 Glacier (2 years) | After 3 years |

---

## Slide 13: Post-AWS Monitoring & Reporting (The Output)

### The Last Mile Problem

The AWS architecture generates **data**, not a **PowerPoint**. A human or automated process must bridge this gap.

### Option A: Manual Readout (Pilot Scope) ✓ Recommended for Phase 1

| Step | Action | Owner | Output |
|------|--------|-------|--------|
| 1 | Download distilled report (JSON/CSV) from S3 | Data Analyst | Raw measurement data |
| 2 | Calculate "60% Gap Closure" metric | Data Analyst | Gap closure percentage |
| 3 | Build executive slide deck | Data Analyst + AEO Strategist | Pilot Measurement Readout |
| 4 | Present to stakeholders | AEO Strategist | Client deliverable |

**Pilot Measurement Readout Contents**:
- Executive summary (1 slide)
- Visibility lift by sub-category (1-2 slides)
- Top 10 improved queries (1 slide)
- Top 10 still-underperforming queries (1 slide)
- Recommended next actions (1 slide)

### Option B: Automated Dashboard (Future/Stretch)

| Component | Technology | Purpose |
|-----------|------------|---------|
| Data Source | S3 Compressed Reports | Pre-calculated metrics |
| Visualization | Amazon QuickSight | Interactive dashboards |
| Refresh | Daily (via EventBridge) | Near-real-time visibility |

**Dashboard Views**:
- Share of Voice trends (line chart)
- Competitor comparison (bar chart)
- Sentiment distribution (pie chart)
- Query coverage heatmap

**Note**: Dashboard implementation is **not in pilot scope** but is a high-value add-on for Phase 2 discussion.

---

## Slide 14: Technology Stack

![excalidraw](diagrams/technology-stack.excalidraw)

### Technology Rationale

| Layer | Technology | Why |
|-------|------------|-----|
| Compute | AWS Lambda (Python 3.11) | Serverless, pay-per-use, auto-scaling |
| Intelligence | Bedrock + Claude 3 Sonnet | Enterprise security, native AWS, best reasoning |
| Embeddings | Titan Embeddings v2 | Native integration, good quality/cost ratio |
| Storage | S3 + OpenSearch | Durability, semantic search, managed |
| Scheduling | EventBridge | Serverless-native cron replacement |
| Integration | API Gateway | REST endpoints with auth |

---

## Slide 15: Security Architecture

![excalidraw](diagrams/security-architecture.excalidraw)

### Security Controls

| Layer | Control |
|-------|---------|
| Transport | TLS 1.3 enforced |
| API Auth | API Key + IAM Signature |
| Service Auth | IAM Roles (least privilege) |
| Data at Rest | S3 SSE-S3, OpenSearch encryption |
| Grounding | System prompt enforces retrieval before generation |

### IAM Role Design

| Role | Permissions | Assigned To |
|------|-------------|-------------|
| `aeo-ingestion-role` | S3 read (raw bucket), OpenSearch write, Bedrock invoke (Titan) | Ingestion Lambda |
| `aeo-agent-role` | OpenSearch read, S3 read (reports), Bedrock invoke (Claude) | Bedrock Agent |
| `aeo-reporting-role` | OpenSearch read, S3 read/write (reports bucket) | Distillation Lambda |

### Grounding Enforcement

The Bedrock agent system prompt enforces:
> "You MUST query the knowledge base before generating any response. NEVER generate content without retrieved context. Include confidence level based on retrieval quality. If retrieval returns no results, respond with 'I don't have data on that query—please check if it's in the Profound scan scope.'"

---

## Slide 16: Risks & Mitigations

### Technical Risks

| ID | Risk | Severity | Likelihood | Mitigation |
|----|------|----------|------------|------------|
| R1 | LLM hallucination | High | Medium | System prompt enforces retrieval-before-generation |
| R2 | Incomplete Profound coverage | Medium | High | Surface coverage metrics; recommend expansion when <70% |
| R3 | OpenSearch cluster failure | High | Low | Multi-AZ deployment; 6-hour snapshots |
| R4 | Bedrock cost overrun | Medium | Medium | Token budgets (4K in, 2K out); 80% alerts |
| R5 | Stale pre-calculated reports | Low | High | Display "data as of" timestamp; manual refresh option |
| R6 | Embedding model drift | Medium | Low | Version embeddings; A/B test before migration |
| R7 | Profound API rate limiting | Medium | Medium | Back-off logic in ingestion Lambda; queued retries |
| R8 | Schema change from Profound | High | Medium | Schema validation on ingest; alert on parse failures |

### Operational Risks

| ID | Risk | Severity | Likelihood | Mitigation |
|----|------|----------|------------|------------|
| R9 | PIM integration delays | Medium | High | Manual upload path (S3 drop folder) as fallback |
| R10 | Prompt bank quality issues | High | Medium | Strategist review gate; pilot with subset first |
| R11 | Team skill gaps | High | Low | Skills matrix validation; training plan for gaps |
| R12 | Client stakeholder availability | Medium | Medium | Defined RACI; escalation path for blockers |

### Open Questions for Client

1. What is acceptable data staleness for reporting queries? (Current: 7 days)
2. Should optimization recommendations require human approval before action?
3. What is the monthly budget ceiling for Bedrock usage? (Recommend: $5K)
4. Are there specific product categories requiring >90% coverage?
5. Who owns the PIM relationship for manual upload coordination?

---

## Slide 17: Deployment Architecture

![excalidraw](diagrams/deployment-architecture.excalidraw)

### Environments

| Environment | Purpose | Data | Access |
|-------------|---------|------|--------|
| Development | Feature development | Synthetic/sample | Engineering |
| Staging | Integration testing | Sanitized prod copy | Engineering + QA |
| Production | Live system | Real Profound data | All stakeholders |

### CI/CD Pipeline

```
PR Merge → Unit Tests → CDK Synth → Staging Deploy → Integration Tests → Approval Gate → Prod Deploy
```

### Infrastructure as Code

All infrastructure defined in AWS CDK (Python):
- Lambda functions
- OpenSearch domain
- S3 buckets with lifecycle policies
- EventBridge rules
- IAM roles and policies
- API Gateway endpoints

---

## Slide 18: Implementation Roadmap

![excalidraw](diagrams/implementation-roadmap.excalidraw)

### Phase Details

| Phase | Weeks | Scope | Success Criteria | Team Focus |
|-------|-------|-------|------------------|------------|
| **0. Mobilization** | 0-1 | Team onboarding, artifact collection | All 3 input artifacts delivered | All |
| **1. Data Foundation** | 1-3 | S3 + Lambda ingestion + OpenSearch | Daily ingestion working | Lead Architect |
| **2. Agent Core** | 2-5 | Bedrock agent + tools + prompts | Correct intent routing; grounded responses | GenAI Engineer |
| **3. Measurement** | 4-6 | Distillation Lambda + reporting | Weekly delta calculation working | Data Analyst |
| **4. Integration & Polish** | 5-7 | API Gateway + Auth + manual upload path | End-to-end flow validated | All |
| **5. Pilot Execution** | 7-10 | Run with real data, measure results | Pilot Measurement Readout delivered | AEO Strategist |

### Gantt View

```
Week:        0    1    2    3    4    5    6    7    8    9   10
             │    │    │    │    │    │    │    │    │    │    │
Phase 0      ████
Phase 1           █████████
Phase 2                ██████████████
Phase 3                     ███████████
Phase 4                          ██████████
Phase 5                                    ████████████████
             │    │    │    │    │    │    │    │    │    │    │
Milestone:   M0   M1        M2        M3   M4        M5
```

### Key Milestones

| ID | Milestone | Week | Deliverable |
|----|-----------|------|-------------|
| M0 | Kickoff | 0 | Team mobilized, artifacts collected |
| M1 | Data Pipeline Ready | 2 | Ingestion Lambda processing sample data |
| M2 | Agent Demo | 4 | Bedrock agent answering queries with grounded responses |
| M3 | Measurement Operational | 6 | Weekly delta reports generating |
| M4 | System Ready | 7 | End-to-end flow validated in staging |
| M5 | Pilot Complete | 10 | Measurement Readout delivered to client |

---

## Slide 19: Dependencies & Critical Path

### External Dependencies

| Dependency | Owner | Required By | Risk if Late |
|------------|-------|-------------|--------------|
| Profound API credentials | Client IT | Week 0 | Blocks all development |
| Prompt bank (400 prompts) | AEO Strategist | Week 0 | Blocks Profound scans |
| Competitor list | Client Stakeholder | Week 0 | Blocks SOV measurement |
| Output schema definition | AEO Strategist | Week 1 | Blocks ingestion Lambda |
| AWS account access | Client IT | Week 0 | Blocks infrastructure deployment |
| Sample Profound export | Profound | Week 1 | Blocks schema validation |
| PIM contact for fallback path | Client | Week 3 | Blocks manual upload testing |

### Internal Dependencies

![excalidraw](diagrams/phase-dependencies.excalidraw)

### Critical Path

**Phase 0 → Phase 1 → Phase 2 → Phase 5**

Measurement (Phase 3) and Integration (Phase 4) can run in parallel with Agent Core (Phase 2) but must complete before Pilot Execution.

---

## Slide 20: Resource Staffing Plan

### Weekly Allocation (Hours)

| Role | W0 | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | Total |
|------|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|----:|------:|
| Lead Architect | 20 | 40 | 40 | 40 | 30 | 30 | 20 | 30 | 20 | 10 | 10 | 290 |
| AEO Strategist | 40 | 30 | 20 | 20 | 30 | 30 | 30 | 20 | 30 | 40 | 40 | 330 |
| GenAI Engineer | 10 | 20 | 30 | 40 | 40 | 40 | 30 | 20 | 20 | 10 | 10 | 270 |
| Data Analyst | 0 | 10 | 10 | 20 | 20 | 30 | 30 | 20 | 20 | 20 | 20 | 200 |

### Role by Phase

| Phase | Lead Architect | AEO Strategist | GenAI Engineer | Data Analyst |
|-------|:--------------:|:--------------:|:--------------:|:------------:|
| 0. Mobilization | ◐ | ● | ○ | ○ |
| 1. Data Foundation | ● | ○ | ○ | ○ |
| 2. Agent Core | ◐ | ◐ | ● | ○ |
| 3. Measurement | ○ | ◐ | ○ | ● |
| 4. Integration | ● | ○ | ◐ | ◐ |
| 5. Pilot Execution | ○ | ● | ◐ | ● |

**Legend**: ● Primary | ◐ Supporting | ○ Minimal

### Cost Estimate (Illustrative)

| Cost Category | Monthly | 10-Week Pilot | Notes |
|---------------|--------:|--------------:|-------|
| Team (4.0 FTE @ blended rate) | $78,000 | $195,000 | Includes distributed QA/KT effort |
| AWS Infrastructure | $3,000 | $7,500 | OpenSearch, Lambda, S3 |
| Bedrock Usage | $5,000 | $12,500 | ~500K tokens/day estimate |
| Profound Licensing | TBD | TBD | Client responsibility |
| **Total (excl. Profound)** | **$86,000** | **$215,000** | |

*Note: Actual rates subject to SOW negotiation. Profound licensing separate. Budget includes testing, knowledge transfer, and 1-week hypercare.*

---

## Slide 21: Success Metrics

### Technical Metrics

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Query Latency (P95) | < 2s | CloudWatch | > 3s |
| System Availability | 99.5% | Uptime monitoring | < 99% |
| Error Rate | < 1% | CloudWatch Logs | > 2% |
| Ingestion Latency | < 5s | Custom metric | > 30s |
| OpenSearch Query Time | < 200ms | OpenSearch metrics | > 500ms |
| Grounding Rate | > 95% | Agent logs | < 90% |

### GenAI-Specific Metrics

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Grounding Rate | > 95% | Custom metric (citations per response) | < 90% |
| Daily Token Usage | < 500K tokens | Bedrock usage metrics | > 750K tokens |
| Daily Bedrock Cost | < $150 | AWS Cost Explorer tags | > $200 |
| Hallucination Flags | 0 | Bedrock Guardrails (if enabled) | Any flagged |
| Agent Tool Invocation Rate | > 90% | Agent trace logs | < 80% |

*Note: GenAI metrics are critical for cost control and output quality. Review weekly during pilot.*

### Business Metrics

| Metric | Target | Measurement | Timeline |
|--------|--------|-------------|----------|
| Visibility Gap Closure | 60% | Profound delta | Pilot end |
| Share of Voice Lift | +5% aggregate | Profound delta | Pilot end |
| Content Optimizations Applied | 50+ | System logs + PIM | Pilot end |
| User Adoption | 80% target users | Active user count | 60 days |
| Time to Insight | < 30s | Session logs | Ongoing |

### Pilot Success Criteria

The pilot is considered successful if:
- [ ] 60% of identified visibility gaps addressed with optimized content
- [ ] Measurable SOV lift in at least one sub-category
- [ ] System operational with <1% error rate
- [ ] Stakeholder satisfaction (qualitative feedback)
- [ ] Clear path to Phase 2 expansion identified

---

## Slide 22: Missing Items & Additional Risks

### 1. PIM Integration "Manual Override"

**Problem**: PIM integration is out of scope, but team needs original product descriptions for analysis.

**Solution**: Manual Upload Tool
- S3 drop folder (`s3://aeo-raw/manual-uploads/`)
- Simple Python script or S3 console upload
- Ingestion Lambda processes these files identically

**Risk**: If PIM team is slow, analysis is blocked. Mitigation: Early stakeholder alignment on upload cadence.

### 2. Rate Limiting

**Problem**: Profound API might have rate limits that crash the ingestion script.

**Solution**: Back-off logic in Ingestion Lambda
```python
import time
from botocore.exceptions import ClientError

def ingest_with_backoff(data, max_retries=5):
    for attempt in range(max_retries):
        try:
            return process_data(data)
        except RateLimitError:
            wait = 2 ** attempt  # exponential backoff
            time.sleep(wait)
    raise Exception("Max retries exceeded")
```

### 3. Data Retention Policy

**Recommendation**:
| Data Type | Pilot (90 days) | Post-Pilot |
|-----------|-----------------|------------|
| Raw Profound JSON | S3 Standard | Archive to Glacier after 90 days |
| Vector Embeddings | OpenSearch | Rolling 90-day window |
| Reports | S3 Standard | Keep 1 year for trend analysis |

**Cost Savings**: Glacier storage = ~$0.004/GB vs $0.023/GB for Standard.

### 4. Schema Drift Detection

**Problem**: Profound may change their export schema without notice.

**Solution**: Schema validation on every ingest
- Compare incoming JSON against stored schema
- Alert on any new/missing fields
- Graceful degradation (process known fields, log unknowns)

### 5. Bedrock Model Updates

**Problem**: AWS may update Claude model, affecting behavior.

**Solution**: Pin to specific model version in CDK
```python
agent = bedrock.Agent(
    self, "AEOAgent",
    foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V3_SONNET_20240229,
    ...
)
```

---

## Slide 23: Assumptions & Constraints

### Key Assumptions

| ID | Assumption | Impact if Invalid |
|----|------------|-------------------|
| A1 | Profound API provides stable JSON exports with documented schema | Ingestion Lambda redesign required |
| A2 | Client has AWS account with Bedrock access enabled | Procurement delay (2-4 weeks) |
| A3 | AEO Strategist has SEO/content expertise | Quality of prompt bank compromised |
| A4 | 400 prompts sufficient for pilot sub-category | Incomplete visibility measurement |
| A5 | Weekly measurement cadence acceptable to stakeholders | Architecture change for real-time |
| A6 | Manual PIM upload acceptable for pilot | Process bottleneck risk |
| A7 | Client IT can provision IAM roles within 1 week | Deployment blocked |
| A8 | Profound data includes competitor mention data | SOV calculation not possible |

### Constraints

| ID | Constraint | Rationale |
|----|------------|-----------|
| C1 | No direct PIM integration in pilot | Reduce scope, accelerate delivery |
| C2 | Single sub-category for pilot | Limit variables for measurement |
| C3 | English language only | Titan Embeddings optimization |
| C4 | US-East-1 region | Bedrock availability, latency |
| C5 | 10-week timeline fixed | Client budget cycle |
| C6 | 3.5 FTE maximum | Resource availability |

### Out of Scope (Explicit)

The following are explicitly excluded from the pilot engagement:

- Real-time LLM monitoring (crawling ChatGPT, Perplexity, etc.)
- Multi-brand or multi-tenant support
- Automated content publishing to CMS/PIM
- Custom dashboard development (QuickSight setup only)
- Training client staff on system administration
- Production support beyond pilot period
- Integration with marketing automation platforms
- A/B testing of optimized content

---

## Slide 24: Deliverables Summary

### Pilot Deliverables

| ID | Deliverable | Description | Owner | Due |
|----|-------------|-------------|-------|-----|
| D1 | **Architecture Document** | This document (v2) | Lead Architect | Week 0 |
| D2 | **Prompt Bank** | 400 validated prompts for Profound | AEO Strategist | Week 0 |
| D3 | **Infrastructure (Dev)** | CDK-deployed AWS resources in dev | Lead Architect | Week 2 |
| D4 | **Working Ingestion Pipeline** | S3 → Lambda → OpenSearch flow | Lead Architect | Week 3 |
| D5 | **Bedrock Agent MVP** | Agent responding to queries with grounding | GenAI Engineer | Week 5 |
| D6 | **Measurement System** | Distillation Lambda + reports | Data Analyst | Week 6 |
| D7 | **Production Deployment** | Full system in production | Lead Architect | Week 7 |
| D8 | **Runbook** | Operational documentation | Lead Architect | Week 7 |
| D9 | **Pilot Measurement Readout** | Executive summary of pilot results | AEO Strategist | Week 10 |
| D10 | **Phase 2 Recommendations** | Expansion roadmap | All | Week 10 |

### Deliverable Acceptance Criteria

| Deliverable | Acceptance Criteria |
|-------------|---------------------|
| D4 - Ingestion Pipeline | Processes sample Profound export within 5 seconds; documents indexed in OpenSearch |
| D5 - Bedrock Agent | Correctly routes 90%+ of test queries; responses cite source data |
| D6 - Measurement System | Calculates accurate delta between two data sets; generates readable summary |
| D7 - Production Deployment | All smoke tests pass; no critical security findings |
| D9 - Pilot Readout | Includes visibility delta, gap closure %, recommendations |

### Client Responsibilities

| Responsibility | Owner | Due |
|----------------|-------|-----|
| Profound API credentials | Client IT | Week 0 |
| AWS account provisioning | Client IT | Week 0 |
| Competitor list approval | Client Stakeholder | Week 0 |
| Prompt bank review/approval | Client Stakeholder | Week 1 |
| Weekly status meeting attendance | Client Stakeholder | Ongoing |
| PIM data upload (manual) | Client Content Team | Week 3+ |
| UAT participation | Client Stakeholder | Week 7 |
| Go/No-Go decision for production | Client Executive | Week 7 |

---

## Slide 25: Testing Strategy

### Testing Phases

| Phase | Scope | Owner | Entry Criteria | Exit Criteria |
|-------|-------|-------|----------------|---------------|
| **Unit Testing** | Lambda functions, utilities | Lead Architect | Code complete | 70% coverage, all tests pass |
| **Integration Testing (SIT)** | API → Lambda → OpenSearch flow | Lead Architect | Unit tests pass | E2E flow verified manually |
| **System Testing** | Full agent workflow, all tools | Lead Architect | SIT complete | All 10 test scenarios pass |
| **User Acceptance Testing (UAT)** | Business scenarios | AEO Strategist (coord) | System testing complete | Client sign-off |
| **Smoke Testing** | Production deployment verification | Lead Architect | UAT complete | Core flows functional |

### UAT Scenarios (Client Validates)

| ID | Scenario | Expected Outcome |
|----|----------|------------------|
| UAT-1 | "Why is visibility dropping on gold chains?" | Agent returns grounded insight with Profound data citations |
| UAT-2 | "How should I improve ring descriptions?" | Agent provides optimization recommendations based on gap analysis |
| UAT-3 | "Did last week's changes help?" | Agent retrieves measurement report with delta % |
| UAT-4 | Upload new Profound export | Data ingested and searchable within 5 minutes |
| UAT-5 | Generate weekly measurement report | Report accurately reflects visibility changes |

### Quality Gates

| Gate | Week | Criteria | Sign-off |
|------|------|----------|----------|
| G1: Requirements Complete | 1 | Prompt bank delivered, schema validated | AEO Strategist |
| G2: Design Approved | 2 | Architecture reviewed, security approved | Lead Architect |
| G3: Build Complete | 5 | All components developed, unit tests pass | Lead Architect |
| G4: Integration Verified | 6 | SIT complete, no critical defects | Lead Architect |
| G5: UAT Passed | 7 | All UAT scenarios pass, client sign-off | Client Stakeholder |
| G6: Production Ready | 7 | Smoke tests pass, runbook complete | Engagement Manager |

*Note: This is a lightweight testing approach appropriate for a 10-week POC. Enterprise deployments would include performance testing, security penetration testing, and formal defect tracking.*

---

## Slide 26: Change Control Process

### Change Control Overview

For this POC engagement, we use a **lightweight change control process** to balance governance with agility.

### Change Request Process

![excalidraw](diagrams/change-control-flow.excalidraw)

### Change Categories

| Category | Definition | Approval Authority | Turnaround |
|----------|------------|-------------------|------------|
| **Emergency** | Production issue or blocker | Lead Architect (immediate) | Same day |
| **Minor** | <1 day effort, no timeline impact | Engagement Manager | 24 hours |
| **Major** | >1 day effort or timeline impact | Client Stakeholder | 48-72 hours |
| **Scope Change** | New requirements or features | Client Stakeholder + Executive | 1 week |

### What Requires a Change Request

- New features or requirements not in original scope
- Changes to agreed deliverables or acceptance criteria
- Timeline adjustments (acceleration or delay)
- Budget increases
- Team composition changes

### What Does NOT Require a Change Request

- Bug fixes within existing scope
- Technical implementation decisions within architecture boundaries
- Minor documentation updates
- Internal process improvements

---

## Slide 27: Knowledge Transfer & Enablement

### Knowledge Transfer Plan

| Deliverable | Format | Audience | Owner | Timing |
|-------------|--------|----------|-------|--------|
| **Runbook** | Markdown/Confluence | Client IT | Lead Architect | Week 7 |
| **System Walkthrough** | 1-hour live session | All client users | GenAI Engineer | Week 8 |
| **Q&A Office Hours** | 30-min weekly calls | All client users | Rotating team | Weeks 8-10 |
| **Pilot Readout** | PowerPoint presentation | Executives + stakeholders | AEO Strategist | Week 10 |

### Runbook Contents

The operational runbook will include:

1. **System Overview**
   - Architecture diagram
   - Component descriptions
   - Data flow summary

2. **Day-to-Day Operations**
   - How to query the system
   - How to interpret responses
   - How to upload manual data

3. **Troubleshooting Guide**
   - Common error messages and resolutions
   - How to check system health
   - When to escalate

4. **Administrative Tasks**
   - How to monitor costs
   - How to access CloudWatch dashboards
   - How to run manual measurement reports

### System Walkthrough Agenda (1 hour)

| Time | Topic | Presenter |
|------|-------|-----------|
| 0-10 min | Architecture overview | Lead Architect |
| 10-30 min | Live demo: Querying the system | GenAI Engineer |
| 30-40 min | Live demo: Interpreting measurement reports | Data Analyst |
| 40-50 min | Runbook walkthrough | Lead Architect |
| 50-60 min | Q&A | All |

### Client Readiness Checklist

By end of pilot, client team should be able to:
- [ ] Submit queries to the Bedrock Agent and interpret responses
- [ ] Understand when responses are grounded vs. uncertain
- [ ] Upload manual data to S3 (if PIM integration unavailable)
- [ ] Access and interpret weekly measurement reports
- [ ] Know when and how to escalate issues

---

## Slide 28: Hypercare & Post-Go-Live Support

### Hypercare Period

**Duration**: Week 8-9 (1 week intensive support after production deployment)

### Support Model

| Channel | Purpose | Response Time |
|---------|---------|---------------|
| **Slack Channel** | Real-time issue reporting | < 1 hour during business hours |
| **Email** | Non-urgent questions | < 4 hours |
| **Weekly Call** | Status review, Q&A | Scheduled (30 min) |

### Issue Severity & Response

| Severity | Definition | Response SLA | Resolution Target |
|----------|------------|--------------|-------------------|
| **P1 - Critical** | System down, data loss | 1 hour | 4 hours |
| **P2 - High** | Major feature broken | 4 hours | 1 business day |
| **P3 - Medium** | Minor issue, workaround exists | 1 business day | 3 business days |
| **P4 - Low** | Enhancement request, cosmetic | Document for Phase 2 | N/A |

### Hypercare Activities

| Day | Activity | Owner |
|-----|----------|-------|
| Day 1 | Production smoke test, monitor error rates | Lead Architect |
| Day 1-3 | Active monitoring of all queries and responses | GenAI Engineer |
| Day 2 | First daily stand-up with client (15 min) | AEO Strategist |
| Day 3-5 | Address any issues; continue monitoring | All |
| Day 5 | Hypercare exit assessment | AEO Strategist |

### Hypercare Exit Criteria

Hypercare ends when:
- [ ] System stable for 3 consecutive business days (no P1/P2 issues)
- [ ] All P1/P2 defects resolved
- [ ] Client team has successfully used system independently
- [ ] Knowledge transfer session completed
- [ ] Runbook delivered and reviewed

### Post-Hypercare Support

After Week 9, support transitions to:
- **Q&A Office Hours**: Weekly 30-minute calls through Week 10
- **Email Support**: Best-effort response for questions
- **Defect Warranty**: 2 weeks for critical defects discovered post-hypercare

*Note: Extended support or SLA-based support requires separate SOW.*

### Rollback Plan

If critical issues arise during deployment:

1. **Lambda Rollback**: Revert to previous version via AWS Console
2. **OpenSearch Rollback**: Restore from most recent snapshot (6-hour intervals)
3. **Full Rollback**: Redirect traffic to staging environment while investigating

Rollback decision authority: Lead Architect (technical) + Engagement Manager (business)

---

## Slide 29: Next Steps

### Immediate Actions (Week 0)

| Action | Owner | Target Date | Status |
|--------|-------|-------------|--------|
| Finalize Profound API access credentials | Client IT | Day 1 | ☐ |
| Deliver Prompt Bank (400 prompts) | AEO Strategist | Day 3 | ☐ |
| Confirm Competitor List | Client Stakeholder | Day 3 | ☐ |
| Provision AWS account access | Client IT | Day 1 | ☐ |
| Schedule weekly status reviews | PM | Day 1 | ☐ |
| Kick off team onboarding | All | Day 1 | ☐ |

### Decision Points Required

| Decision | Options | Recommendation | Needed By |
|----------|---------|----------------|-----------|
| Data staleness tolerance | 1 day / 7 days / 14 days | 7 days | Week 1 |
| Human approval workflow | Required / Optional / None | Optional | Week 4 |
| Budget ceiling (Bedrock) | $1K / $5K / $10K monthly | $5K | Week 1 |
| Dashboard scope | Pilot / Post-pilot / Not planned | Post-pilot | Week 2 |
| PIM fallback owner | Client / Accenture / Shared | Shared | Week 1 |

### Approval Request

- [ ] Approve architecture and proceed to Phase 0 mobilization
- [ ] Request modifications (specify in discussion)
- [ ] Defer pending specific dependency resolution

---

## Appendix A: RACI Matrix

| Activity | Lead Architect | AEO Strategist | GenAI Engineer | Data Analyst | Client IT | Client Stakeholder |
|----------|:--------------:|:--------------:|:--------------:|:------------:|:---------:|:------------------:|
| Prompt Bank Creation | I | R/A | C | I | - | A |
| Competitor List Definition | I | R | - | - | - | A |
| Schema Documentation | C | R | A | I | - | I |
| Infrastructure Deployment | R/A | I | C | I | C | I |
| Ingestion Lambda Development | R/A | I | C | I | - | - |
| Agent Configuration | C | C | R/A | I | - | - |
| Distillation Logic | C | C | I | R/A | - | - |
| Pilot Measurement Readout | I | R/A | C | R | - | A |
| Security Review | R/A | - | C | - | C | I |

**Legend**: R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## Appendix B: Reference Architecture Video

**Amazon Bedrock Agents Tutorial - Architecture and Orchestration**

This video demonstrates the specific "Agentic" workflow referenced in this architecture:
- Action Groups configuration
- Lambda trigger setup
- Knowledge Base integration
- How the "AEO Guiding Tool" connects to the LLM

*[Link to be provided by client or Accenture enablement team]*

---

## Appendix C: Full Architecture Decision Records (ADRs)

### ADR-001: Agentic Intent Routing

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | November 2024 |
| **Decision Maker** | Lead Architect |

**Context**: User queries to the AEO system are ambiguous and may require multiple operations. Traditional rule-based routing would require extensive conditional logic and constant updates.

**Decision**: Route all user requests through AWS Bedrock as an agent with defined action groups rather than conditional branching logic.

**Consequences**:
- (+) Natural language understanding handles ambiguous queries
- (+) New tools can be added via configuration
- (+) Multi-step queries handled automatically
- (-) Added latency (~200-400ms)
- (-) Less predictable behavior vs deterministic routing
- (-) Requires prompt engineering expertise

**Alternatives Considered**:
1. Rule-based routing (rejected: too rigid)
2. Keyword matching (rejected: poor accuracy)
3. Custom ML classifier (rejected: maintenance overhead)

---

### ADR-002: Pre-Calculated Reporting

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | November 2024 |
| **Decision Maker** | Lead Architect + Data Analyst |

**Context**: Measurement queries require comparing data across time periods. Real-time delta calculations would be expensive and slow.

**Decision**: Run weekly distillation jobs via EventBridge scheduled Lambda. Store pre-calculated reports in S3 for instant retrieval.

**Consequences**:
- (+) Instant response for measurement queries
- (+) Reduced compute costs (batch vs on-demand)
- (+) Consistent metrics across users
- (-) Data can be up to 7 days stale
- (-) Cannot answer ad-hoc time range queries

**Alternatives Considered**:
1. Real-time calculation (rejected: too slow/expensive)
2. Daily distillation (rejected: higher cost, marginal benefit)
3. On-demand with caching (rejected: cold cache problem)

---

### ADR-003: Grounding Enforcement

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | November 2024 |
| **Decision Maker** | GenAI Engineer |

**Context**: LLMs can hallucinate insights that sound plausible but aren't grounded in actual Profound data. This creates trust issues and potential business risk.

**Decision**: System prompt enforces retrieval-before-generation pattern. Agent must call knowledge base before responding.

**Consequences**:
- (+) Responses always tied to source data
- (+) Auditable citations
- (+) Increased stakeholder trust
- (-) Cannot answer questions outside Profound data scope
- (-) Longer prompts increase token costs

---

### ADR-004: No Low-Code Orchestration

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | November 2024 |
| **Decision Maker** | Lead Architect |

**Context**: Low-code platforms (n8n, Zapier, etc.) could accelerate development but add operational complexity and potential security concerns.

**Decision**: Use native AWS services (Lambda, EventBridge, Step Functions) exclusively.

**Consequences**:
- (+) Single platform to secure and monitor
- (+) Better performance (no middleware)
- (+) Cost efficiency (pure serverless)
- (-) Requires stronger AWS/Python skills
- (-) No visual workflow designer for non-engineers

---

## Appendix D: Governance & Change Management

### Change Request Process

| Change Type | Approval Required | Turnaround |
|-------------|-------------------|------------|
| Bug fix | GenAI Engineer or Lead Architect | Same day |
| Minor enhancement | Lead Architect | 2 business days |
| Schema change | Lead Architect + AEO Strategist | 1 week |
| New tool/capability | Full team + Client stakeholder | 2 weeks |

### Weekly Status Meeting Agenda

1. **Progress Review** (15 min)
   - Tasks completed this week
   - Blockers encountered
   - Milestones achieved

2. **Risk Review** (10 min)
   - New risks identified
   - Risk mitigation updates
   - Escalations needed

3. **Demo** (15 min, when applicable)
   - Working functionality
   - Stakeholder feedback

4. **Next Week Planning** (10 min)
   - Priority tasks
   - Dependencies to resolve
   - Resource needs

### Escalation Path

![excalidraw](diagrams/escalation-path.excalidraw)

### Documentation Standards

| Document | Owner | Update Frequency | Location |
|----------|-------|------------------|----------|
| Architecture Decision Records | Lead Architect | As needed | `/docs/adr/` |
| API Documentation | Lead Architect | Per release | `/docs/api/` |
| Runbook | Lead Architect | Weekly | `/docs/runbook/` |
| Status Reports | PM | Weekly | SharePoint |
| Measurement Readouts | Data Analyst | Weekly | SharePoint |

---

## Appendix E: Glossary

| Term | Definition |
|------|------------|
| **AEO** | Answer Engine Optimization - optimizing content for AI/LLM visibility |
| **SOV** | Share of Voice - percentage of AI responses mentioning your brand vs competitors |
| **Grounding** | Ensuring LLM responses are based on retrieved data, not hallucination |
| **Distillation** | Process of computing summary metrics from raw data |
| **Profound** | Third-party API providing LLM brand visibility audit data |
| **Vector Embedding** | Numerical representation of text enabling semantic search |
| **kNN** | k-Nearest Neighbors - algorithm for finding similar vectors |

---

**Document Version**: 2.1
**Last Updated**: November 2024
**Mode**: Solution Architecture + Consulting Delivery
**Framework**: Accenture Song Delivery Model
**Total Slides**: 29 + 5 Appendices
**Classification**: Client Confidential

**V2.1 Changes**:
- Added Engagement Manager accountability to AEO Strategist role
- Added Testing Strategy slide with quality gates
- Added Change Control Process slide
- Added Knowledge Transfer & Enablement slide
- Added Hypercare & Post-Go-Live Support slide
- Added GenAI-specific monitoring metrics
- Updated team size to 4.0 FTE and budget to $215K
