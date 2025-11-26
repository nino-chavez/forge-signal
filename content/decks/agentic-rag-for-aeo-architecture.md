# Agentic RAG for AEO: Solution Architecture

**Mode**: Solution Architecture
**Template**: architecture-deck-template.md
**Voice Guide**: solution-architecture-guide.md

---

## Slide 1: Title

**Agentic RAG for Answer Engine Optimization**

Technical Architecture Overview

November 2024

---

## Slide 2: Executive Summary

### Problem

LLMs increasingly influence purchase decisions. When a consumer asks an AI assistant about products, brands have no visibility into how they're represented—or tools to improve that representation.

### Solution

An agentic RAG system that:
- Ingests brand visibility data from Profound API
- Enables semantic gap analysis via vector search
- Generates optimized content addressing coverage gaps
- Measures before/after impact

### Key Architecture Decisions

| Decision | Choice | Trade-off |
|----------|--------|-----------|
| Intent Routing | AWS Bedrock Agent | +Flexibility, -Latency (~300ms) |
| Search | OpenSearch with vectors | +Semantic matching, -Embedding lock-in |
| Measurement | Pre-calculated weekly | +Performance, -Freshness (7 days) |

### Expected Outcomes

- 60% reduction in "I don't know" responses for tracked queries
- Sub-2-second response time for analysis queries
- Measurable before/after optimization tracking

---

## Slide 3: System Context (C4 Level 1)

![excalidraw](diagrams/system-context.excalidraw)

### Actors

| Actor | Type | Interaction |
|-------|------|-------------|
| Brand Manager | Human | Queries system for visibility insights, requests content optimization |
| Profound API | External System | Provides daily brand visibility audit data (JSON export to S3) |
| Client CMS | External System | Receives optimized content for publication (API or export) |

### Scope

**In Scope**:
- Data ingestion from Profound API
- Semantic search and gap analysis
- Content optimization recommendations
- Before/after measurement

**Out of Scope**:
- Direct content publication to channels
- Real-time LLM response monitoring
- Multi-brand competitive benchmarking (Phase 2)

---

## Slide 4: Solution Strategy

### Architecture Approach

Event-driven, serverless architecture on AWS with agentic orchestration for intent routing.

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

---

## Slide 5: Container Diagram (C4 Level 2)

![excalidraw](diagrams/container-diagram.excalidraw)

### Container Specifications

| Container | Technology | Purpose | Scaling |
|-----------|------------|---------|---------|
| API Gateway | AWS API Gateway | Public REST endpoint, auth | Auto |
| Request Handler | Lambda (Node.js 18) | Validation, routing to agent | 1000 concurrent |
| Bedrock Agent | AWS Bedrock (Claude 3) | Intent classification, orchestration | Per-request |
| AEO Guiding Tool | Lambda (Python 3.11) | Gap identification, optimization | Event-driven |
| Reporting Tool | Lambda (Python 3.11) | Pre-calculated report retrieval | Event-driven |
| OpenSearch | OpenSearch Service 2.x | Vector store, semantic search | 3-node cluster |

---

## Slide 6: Data Ingestion Flow

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
| Fields Embedded | `query_text` |

---

## Slide 7: Query Flow (Optimization Request)

![excalidraw](diagrams/query-flow.excalidraw)

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

## Slide 8: Measurement Flow

![excalidraw](diagrams/measurement-flow.excalidraw)

### Measurement Tool Specification

| Property | Value |
|----------|-------|
| Runtime | Python 3.11 |
| Memory | 2048 MB |
| Timeout | 15 minutes |
| Trigger | User request via Bedrock Agent |
| Output | Measurement report with S3 link for detailed data |

### Flow Overview

1. User requests brand measurement ("Measure brand X")
2. Tool queries OpenSearch for brand documents
3. Claude analyzes content for AEO signals
4. Scores and insights returned with S3 report link

---

## Slide 9: Data Architecture

### Data Stores

| Store | Purpose | Technology | Retention |
|-------|---------|------------|-----------|
| Raw Exports | Audit trail, reprocessing | S3 Standard | 2 years |
| Vector Index | Semantic search | OpenSearch | Rolling 90 days |
| Compressed Reports | Pre-calculated analytics | S3 Standard | 1 year |

### OpenSearch Index Schema

```json
{
  "mappings": {
    "properties": {
      "brand_name": { "type": "keyword" },
      "query_text": { "type": "text" },
      "query_vector": {
        "type": "knn_vector",
        "dimension": 1024
      },
      "share_of_voice": { "type": "float" },
      "sentiment_score": { "type": "float" },
      "timestamp": { "type": "date" },
      "llm_source": { "type": "keyword" },
      "product_category": { "type": "keyword" }
    }
  }
}
```

---

## Slide 10: Technology Stack

![excalidraw](diagrams/technology-stack.excalidraw)

### Technology Rationale

| Layer | Technology | Why |
|-------|------------|-----|
| Compute | AWS Lambda | Serverless, pay-per-use, auto-scaling |
| Intelligence | Bedrock + Claude 3 | Enterprise security, native AWS, best reasoning |
| Embeddings | Titan v2 | Native integration, good quality/cost ratio |
| Storage | S3 + OpenSearch | Durability, semantic search, managed |
| Integration | API Gateway + EventBridge | Serverless-native patterns |

---

## Slide 11: Security Architecture

![excalidraw](diagrams/security-architecture.excalidraw)

### Security Controls

| Layer | Control |
|-------|---------|
| Transport | TLS 1.3 enforced |
| API Auth | API Key + IAM Signature |
| Service Auth | IAM Roles (least privilege) |
| Data at Rest | S3 SSE-S3, OpenSearch encryption |
| Grounding | System prompt enforces retrieval before generation |

### Grounding Enforcement

The Bedrock agent system prompt enforces:
> "You MUST query the knowledge base before generating any response. NEVER generate content without retrieved context. Include confidence level based on retrieval quality."

---

## Slide 12: Risks & Mitigations

| ID | Risk | Severity | Likelihood | Mitigation |
|----|------|----------|------------|------------|
| R1 | LLM hallucination | High | Medium | System prompt enforces retrieval-before-generation |
| R2 | Incomplete Profound coverage | Medium | High | Surface coverage metrics; recommend expansion when <70% |
| R3 | OpenSearch cluster failure | High | Low | Multi-AZ deployment; 6-hour snapshots |
| R4 | Bedrock cost overrun | Medium | Medium | Token budgets (4K in, 2K out); 80% alerts |
| R5 | Stale pre-calculated reports | Low | High | Display "data as of" timestamp; manual refresh |
| R6 | Embedding model drift | Medium | Low | Version embeddings; A/B test before migration |

### Open Questions for Client

1. What is acceptable data staleness for reporting queries? (Current: 7 days)
2. Should optimization recommendations require human approval?
3. What is the monthly budget ceiling for Bedrock usage?
4. Are there specific product categories requiring >90% coverage?

---

## Slide 13: Deployment Architecture

![excalidraw](diagrams/deployment-architecture.excalidraw)

### Environments

| Environment | Purpose | Data | Access |
|-------------|---------|------|--------|
| Development | Feature development | Synthetic | Engineering |
| Staging | Integration testing | Sanitized prod copy | Engineering + QA |
| Production | Live system | Real Profound data | All stakeholders |

### CI/CD Pipeline

```
PR Merge → Tests → CDK Synth → Staging Deploy → Integration Tests → Approval → Prod
```

---

## Slide 14: Implementation Roadmap

![excalidraw](diagrams/implementation-roadmap.excalidraw)

### Phase Details

| Phase | Weeks | Scope | Success Criteria |
|-------|-------|-------|------------------|
| 1. Data Foundation | 1-2 | S3 + Lambda ingestion + OpenSearch | Daily ingestion working |
| 2. Agent Core | 2-4 | Bedrock agent + tools | Correct intent routing |
| 3. API & Integration | 3-5 | API Gateway + Auth + CMS integration | End-to-end flow working |

### Key Milestones

- **MVP Data Flow**: Data pipeline operational
- **Agent Ready**: Bedrock agent responding to queries
- **Go-Live**: Production deployment complete

### Dependencies

- Phase 2 requires Phase 1 (needs data to test)
- Phase 3 can overlap with Phase 2 (parallel workstreams)

---

## Slide 15: Success Metrics

### Technical Metrics

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Query Latency (P95) | < 2s | CloudWatch | > 3s |
| System Availability | 99.5% | Uptime monitoring | < 99% |
| Error Rate | < 1% | CloudWatch Logs | > 2% |
| Ingestion Latency | < 5s | Custom metric | > 30s |
| OpenSearch Query Time | < 200ms | OpenSearch metrics | > 500ms |

### Business Metrics

| Metric | Target | Measurement | Timeline |
|--------|--------|-------------|----------|
| Visibility Gap Closure | 60% | Profound delta | 90 days |
| Content Optimizations | 100/month | System logs | Ongoing |
| User Adoption | 80% target users | Active user count | 60 days |
| Time to Insight | < 30s | Session logs | Ongoing |

---

## Slide 16: Next Steps

### Immediate Actions

| Action | Owner | Target Date |
|--------|-------|-------------|
| Finalize Profound API access credentials | Client IT | Week 0 |
| Provision AWS infrastructure (staging) | Engineering | Week 1 |
| Begin Phase 1 implementation | Engineering | Week 1 |
| Schedule weekly status reviews | PM | Ongoing |

### Decision Points Required

| Decision | Options | Recommendation | Needed By |
|----------|---------|----------------|-----------|
| Data staleness tolerance | 1 day / 7 days / 14 days | 7 days | Week 1 |
| Human approval workflow | Required / Optional / None | Optional | Week 4 |
| Budget ceiling (Bedrock) | $1K / $5K / $10K monthly | $5K | Week 1 |

### Approval Request

- [ ] Approve architecture and proceed to Phase 1
- [ ] Request modifications (specify in discussion)
- [ ] Defer pending specific dependency resolution

---

## Appendix A: Full ADRs

[See templates/architecture/adr-template.md for complete format]

---

**Document Version**: 4.0 (Excalidraw diagrams)
**Last Updated**: November 2024
**Mode**: Solution Architecture
