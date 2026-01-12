# AEO Optimization Service: Technical Handoff

**Project**: Signet AEO Optimization Service
**Version**: 2.0 (Streamlined)
**Date**: December 25, 2024
**Phase**: Plan, Analyze, Design (Weeks 1-2)
**Audience**: Incoming Accenture Delivery Team (Lead Architect, AI Engineer, DL/PM)

---

## Executive Summary

AWS-native agentic RAG system that ingests brand visibility data from Profound API, stores in OpenSearch vector database, analyzes gaps using Bedrock Agent (Claude), recommends optimizations, measures SOV lift, and exports to Infoverity PIM.

### Week 1-2 Deliverables

| Deliverable | Owner | Due | Acceptance Criteria |
|-------------|-------|-----|---------------------|
| **D1: Solution Architecture Document** | Lead Architect | Week 2 | Updated v2 with client feedback, ADRs finalized |
| **D2: Inbound API Specification** | Lead Architect | Week 1 | OpenAPI 3.0, reviewed by ESI Team |
| **D3: OpenSearch Index Schema** | Lead Architect | Week 1 | JSON mapping, vector config (1024-dim) |
| **D4: IAM Role Definitions** | Lead Architect | Week 2 | Least-privilege policies, reviewed by Signet IT |
| **D5: CDK Infrastructure Skeleton** | Lead Architect | Week 2 | S3 buckets, Lambda stubs, OpenSearch cluster |
| **D6: Bedrock Agent Design** | AI Engineer | Week 2 | 3 action groups, system prompt draft |
| **D7: Risk Register (Updated)** | DL/PM | Week 1 | Project-specific risks added |
| **D8: Week 3-5 Sprint Plan** | DL/PM | Week 2 | Task breakdown, resource allocation |

### Exit Criteria

**Week 1**:
- [ ] AWS account access validated
- [ ] Profound API credentials confirmed
- [ ] Prompt bank delivery date confirmed with AEO Strategist
- [ ] Inbound API specification drafted (70% complete)
- [ ] Governance cadence established

**Week 2**:
- [ ] Solution Architecture Document finalized
- [ ] IAM roles approved by Signet IT
- [ ] CDK infrastructure deployed to dev
- [ ] Bedrock Agent design documented
- [ ] Milestone M1 achieved: Data pipeline design complete

---

## Document Inventory

### Primary Documents

| Document | Location | Purpose |
|----------|----------|---------|
| **Delivery Plan v4.1** | `v4/client/agentic-rag-for-aeo-delivery-plan-v4.1.md` | 12-week roadmap, staffing, $237,716 budget |
| **SOW Draft** | `v4/client/sow-aeo-optimization-service-v1.md` | Contract scope, rates, deliverables |
| **Architecture v2** | `aeo/agentic-rag-for-aeo-architecture-v2.md` | Technical architecture, ADRs, C4 diagrams |
| **Architecture Diagrams** | `v4/diagrams/*.svg` | C4 diagrams, data flows, deployment architecture |

### Architecture Diagrams

| Diagram | File | Purpose |
|---------|------|---------|
| **System Context (C4 Level 1)** | `01-system-context.svg` | External actors, system boundary |
| **Container Diagram (C4 Level 2)** | `02-container-diagram.svg` | AWS services, Lambda functions, data stores |
| **Data Ingestion Flow** | `03-data-ingestion-flow.svg` | Profound → S3 → OpenSearch |
| **Query Flow** | `04-query-flow.svg` | Agentic RAG: User → Agent → Tools → Response |
| **Measurement Flow** | `05-measurement-flow.svg` | Weekly SOV delta calculation |
| **Deployment Architecture** | `06-deployment-architecture.svg` | Dev/Staging/Prod environments |
| **IAM Security** | `07-iam-security.svg` | Least-privilege IAM roles |
| **Stakeholder Integration** | `08-stakeholder-integration.svg` | RACI matrix, integration boundaries |

---

## Business Context

### The Problem

LLMs (ChatGPT, Perplexity, Google AI) increasingly influence jewelry purchases. Signet has no visibility into how they're represented in LLM responses, no tools to improve representation, and no measurement of optimization impact.

### The Solution

AWS-native agentic RAG system:
1. **Ingest**: Profound API visibility data (daily LLM scans)
2. **Store**: OpenSearch vector database (semantic search)
3. **Analyze**: Bedrock Agent identifies gaps
4. **Recommend**: Content optimizations to close gaps
5. **Measure**: Weekly SOV delta calculation
6. **Export**: Recommendations to Infoverity PIM

---

## Technical Architecture

### C4 Level 1: System Context

![System Context Diagram](../diagrams/01-system-context.svg)

**Actors**:
- **Brand Manager**: Queries system for insights
- **AEO Strategist**: Configures 400 prompts in Profound, interprets SOV results
- **Content Strategist**: Reviews AI recommendations, approves PIM updates

**External Systems**:
- **Profound API**: Provides visibility audit data
- **Infoverity PIM**: Consumes optimized content
- **ESI Team**: Integration layer (Profound → S3)

**System Boundary**: Everything inside AWS environment

### C4 Level 2: Container Diagram

![Container Diagram](../diagrams/02-container-diagram.svg)

| Container | Technology | Responsibility |
|-----------|------------|----------------|
| **API Gateway** | AWS API Gateway | Public REST endpoint, authentication |
| **Request Handler** | Lambda (Python 3.11) | Request validation, routing to agent |
| **Bedrock Agent** | AWS Bedrock (Claude 3 Sonnet) | Intent classification, tool orchestration |
| **Query Tool** | Lambda (Python 3.11) | Search knowledge base via k-NN |
| **Analyze Tool** | Lambda (Python 3.11) | Gap identification, recommendations |
| **Measure Tool** | Lambda (Python 3.11) | Pre-calculated report retrieval |
| **Ingestion Lambda** | Lambda (Python 3.11) | S3 → OpenSearch data pipeline |
| **Distillation Lambda** | Lambda (Python 3.11) | Weekly SOV delta calculation |
| **OpenSearch** | OpenSearch Service 2.x | Vector store (1024-dim embeddings) |
| **S3 Buckets** | S3 Standard → Glacier | Raw data, reports, manual uploads |

---

## Architecture Decision Records (ADRs)

### ADR-001: Agentic Intent Routing

**Decision**: Use Bedrock Agent for orchestration instead of rule-based routing.

**Context**: User queries are ambiguous. "Why is visibility dropping on gold chains and what should I do?" requires semantic search, delta analysis, and recommendation generation. Traditional routing would require complex conditional logic.

**Consequences**:
- ✅ Natural language understanding handles ambiguity
- ✅ New tools can be added via configuration (no code changes)
- ✅ Multi-step queries handled automatically
- ❌ Added latency (~200-400ms for agent reasoning)
- ❌ Less predictable behavior vs deterministic routing

**Trade-off**: Flexibility > Latency (2s target still achievable)

---

### ADR-002: Pre-Calculated Measurement

**Decision**: Run weekly distillation jobs instead of real-time delta queries.

**Context**: Measurement queries require comparing T0 vs T1 data across 400 prompts. Real-time calculation would take 5-10 seconds per query, cost $0.50+ per query, and return inconsistent results.

**Consequences**:
- ✅ Instant response (<100ms to retrieve pre-calculated report)
- ✅ Consistent metrics across all users
- ✅ 95% cost reduction vs real-time
- ❌ Data can be up to 7 days stale
- ❌ Cannot answer ad-hoc time range queries

**Trade-off**: Performance + Cost > Freshness (weekly cadence aligns with content optimization cycles)

---

### ADR-003: Grounding Enforcement

**Decision**: Require citations for every agent response. Reject responses without grounding.

**Context**: LLM hallucination is unacceptable for client-facing recommendations. All suggestions must trace back to Profound data or pre-calculated measurements.

**Implementation**:
```python
# Bedrock Agent system prompt (partial)
You MUST cite sources for every claim. Format: [Source: Profound scan 2024-01-15, query "gold chains"]
If data does not exist to answer a query, respond: "Insufficient data. Available data covers..."
NEVER generate recommendations without citing specific visibility gaps from OpenSearch.
```

**Consequences**:
- ✅ Eliminates hallucination risk
- ✅ Builds client trust (every claim is verifiable)
- ✅ Supports audit trail for compliance
- ❌ Reduces response flexibility (cannot extrapolate)
- ❌ May return "no data" for edge cases

**Trade-off**: Reliability > Flexibility (non-negotiable for production)

---

### ADR-004: No Low-Code Orchestration

**Decision**: Use code-based Lambda functions instead of Step Functions for workflow orchestration.

**Context**: Evaluation of AWS Step Functions for data ingestion pipeline (S3 → Validation → Embeddings → OpenSearch) vs Lambda-only approach.

**Rationale**:
- Step Functions add visual debugging but increase latency (50-100ms per state transition)
- Team has strong Python skills; code-based error handling is more maintainable
- Pipeline is linear (no complex branching); Step Functions visual flow adds minimal value
- Lambda invocation chaining is simpler for this use case

**Consequences**:
- ✅ Lower latency (no state machine overhead)
- ✅ Easier debugging (standard Python logging)
- ✅ Simpler deployment (fewer resources in CDK)
- ❌ No visual workflow diagram in AWS Console
- ❌ Error handling in code vs configuration

**Trade-off**: Performance + Simplicity > Visual Debugging

---

## Data Flows

### Flow 1: Data Ingestion (Daily)

![Data Ingestion Flow](../diagrams/03-data-ingestion-flow.svg)

**Process**:
1. **Profound Export**: ESI Team delivers JSON to S3 bucket (`aeo-raw-data/profound-exports/`)
2. **S3 PUT Event**: Triggers Ingestion Lambda
3. **Schema Validation**: Validate JSON structure against expected schema
4. **Generate Embeddings**: Call Bedrock Titan (1024-dim vectors)
5. **Index to OpenSearch**: Write document + vector
6. **Log Success**: CloudWatch metrics

**Error Handling**: Schema validation failure → Dead-letter queue → Manual intervention

**Performance Targets** (P95):
- Validation: <50ms
- Embedding: <200ms
- Indexing: <100ms
- **Total: <5 seconds**

**Trigger**: S3 PUT event (event-driven, not scheduled)

---

### Flow 2: Query Flow (On-Demand)

![Query Flow](../diagrams/04-query-flow.svg)

**Process**:
1. **User Query**: "Why is visibility dropping on gold chains?"
2. **API Gateway**: HTTPS POST, API Key auth
3. **Request Handler**: Input sanitization, routing to agent
4. **Bedrock Agent**: Claude 3 Sonnet classifies intent (Query vs Analyze vs Measure)
5. **Tool Invocation**: Agent selects appropriate Lambda (Query Tool for this example)
6. **OpenSearch k-NN Search**: Retrieve top 10 similar documents
7. **Response Generation**: Agent synthesizes grounded response with citations
8. **Response to User**: JSON with confidence score

**Latency Budget** (P95):
- API Gateway: 10ms
- Request Handler: 50ms
- Agent Intent: 200ms
- Tool Invocation: 100ms
- OpenSearch: 100ms
- Response Gen: 500ms
- **Total: <1000ms**

---

### Flow 3: Measurement Flow (Weekly)

![Measurement Flow](../diagrams/05-measurement-flow.svg)

**Process**:
1. **EventBridge Schedule**: Sunday 2am UTC trigger
2. **Distillation Lambda**: 4GB memory, 15-min timeout
3. **Query T0 Data**: OpenSearch (T-14d to T-7d)
4. **Query T1 Data**: OpenSearch (T-7d to T)
5. **Calculate Deltas**: Per-query SOV delta + aggregate metrics
6. **Generate Report**: Compressed JSON summary
7. **Write to S3**: `aeo-reports/weekly/YYYY-MM-DD.json`
8. **Log to CloudWatch**: Execution metrics

**Report Structure**:
```json
{
  "report_date": "2024-12-15",
  "aggregate_delta": 0.05,
  "improved_count": 234,
  "declined_count": 156,
  "top_gainers": [...],
  "top_decliners": [...]
}
```

---

## Integration Requirements

### Inbound API: Profound → S3

**Responsibility**: ESI Team implements, Accenture designs spec

**API Specification**: See Appendix J for complete OpenAPI 3.0 spec

**Endpoint**: `PUT /profound/scans`

**Request Format**:
```json
{
  "batch_id": "2024-01-15-daily",
  "scans": [
    {
      "query": "best engagement rings under $5000",
      "scan_date": "2024-01-15T08:00:00Z",
      "llm_provider": "ChatGPT-4",
      "brand_mentioned": true,
      "share_of_voice": 0.15,
      "competitors": ["Blue Nile", "James Allen"],
      "response_text": "..."
    }
  ]
}
```

**Validation Rules**:
- Max 100 scans per batch
- `query` must match prompt bank (400 prompts)
- `scan_date` must be within last 24 hours
- `share_of_voice` must be 0-1

**Error Responses**:
- `400`: Schema validation failed
- `413`: Batch size exceeds limit
- `429`: Rate limit exceeded (100 requests/hour)

**Delivery to S3**: ESI Team writes to `s3://aeo-raw-data/profound-exports/YYYY/MM/DD/{batch_id}.json`

---

### Outbound API: Recommendations → PIM

**Responsibility**: Infoverity implements, Accenture designs spec

**API Specification**: See Appendix J for complete OpenAPI 3.0 spec

**Endpoint**: `POST /pim/recommendations`

**Request Format**:
```json
{
  "recommendation_id": "rec-abc123",
  "created_at": "2024-01-15T10:30:00Z",
  "product_category": "engagement-rings",
  "visibility_gap": {
    "query": "best engagement rings under $5000",
    "current_sov": 0.15,
    "target_sov": 0.30
  },
  "recommended_changes": [
    {
      "field": "product_description",
      "current_value": "Classic engagement ring",
      "suggested_value": "Affordable engagement ring under $5000 with lab-grown diamond",
      "rationale": "LLMs prioritize price point and diamond type in this query segment"
    }
  ]
}
```

**Implementation Notes**:
- Week 6+ deliverable (not blocking Week 1-2)
- Fallback: Manual CSV export to S3 if Infoverity API delayed

---

## Design Phase Deliverables (Detail)

### D1: Solution Architecture Document

**Owner**: Lead Architect
**Due**: Week 2 End
**Estimated Effort**: 24 hours

**Objective**: Update Architecture v2 document with client feedback and finalize all ADRs.

**Tasks**:
1. Review Architecture v2 with client stakeholders (Week 1)
2. Incorporate feedback on C4 diagrams (update D2 sources if needed)
3. Finalize 4 ADRs (add any new decisions from Week 1 discussions)
4. Document Lambda function signatures (see Appendix E for patterns)
5. Document OpenSearch index mapping (see Appendix E.4)
6. Get sign-off from Signet IT on architecture approach

**Acceptance Criteria**:
- [ ] C4 diagrams updated with client feedback
- [ ] All 4 ADRs finalized with consequences documented
- [ ] Lambda implementation patterns documented (Appendix E added)
- [ ] OpenSearch schema defined (Appendix E.4 added)
- [ ] Signet IT has reviewed and approved architecture

**Deliverable Format**: Markdown document + SVG diagrams (update existing Architecture v2)

---

### D2: Inbound API Specification

**Owner**: Lead Architect
**Due**: Week 1 End
**Estimated Effort**: 8 hours

**Objective**: Define OpenAPI 3.0 spec for ESI Team to implement (Profound → S3).

**Tasks**:
1. Use Appendix J template as starting point
2. Review with ESI Team for feasibility (Week 1 Day 2)
3. Define error responses and retry logic
4. Document S3 bucket structure and naming conventions
5. Specify IAM roles for ESI Team's Lambda (cross-account access if needed)

**Acceptance Criteria**:
- [ ] Complete OpenAPI 3.0 YAML file
- [ ] Sample cURL command for testing
- [ ] ESI Team has reviewed and confirmed feasibility
- [ ] S3 bucket structure documented
- [ ] IAM cross-account policy defined (if needed)

**Deliverable Format**: YAML file + integration guide (Markdown)

**Location**: `v4/specs/inbound-api-profound.yaml`

---

### D3: OpenSearch Index Schema

**Owner**: Lead Architect
**Due**: Week 1 End
**Estimated Effort**: 6 hours

**Objective**: Define JSON mapping for OpenSearch index (vector config, field types).

**Tasks**:
1. Use Appendix E.4 template as starting point
2. Define vector field configuration (1024-dim, cosinesimil)
3. Define text fields (query, response_text, product_category)
4. Define numeric fields (share_of_voice, scan_date)
5. Configure HNSW algorithm parameters (m=16, ef_construction=100)
6. Test mapping in dev OpenSearch cluster

**Acceptance Criteria**:
- [ ] JSON mapping file complete
- [ ] Vector search validated in dev (test with 10 sample documents)
- [ ] Query performance meets <100ms target (P95)
- [ ] Index settings documented (shards, replicas)

**Deliverable Format**: JSON mapping file + validation test results

**Location**: `v4/schemas/opensearch-index-mapping.json`

**Example** (see Appendix E.4 for complete schema):
```json
{
  "mappings": {
    "properties": {
      "query_vector": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib"
        }
      },
      "query": {"type": "text"},
      "share_of_voice": {"type": "float"}
    }
  }
}
```

---

### D4: IAM Role Definitions

**Owner**: Lead Architect
**Due**: Week 2 End
**Estimated Effort**: 8 hours

**Objective**: Define least-privilege IAM policies for all Lambda functions and Bedrock Agent.

**Tasks**:
1. Use Appendix H security checklist as guide
2. Define 4 IAM roles (see below)
3. Document trust relationships and permission boundaries
4. Get Signet IT security review and approval
5. Create CDK code for IAM role provisioning

**IAM Roles**:

**1. aeo-ingestion-role** (Ingestion Lambda):
```json
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject"
  ],
  "Resource": "arn:aws:s3:::aeo-raw-data/profound-exports/*"
},
{
  "Effect": "Allow",
  "Action": [
    "es:ESHttpPut"
  ],
  "Resource": "arn:aws:es:us-east-1:*:domain/aeo-kb/*"
},
{
  "Effect": "Allow",
  "Action": [
    "bedrock:InvokeModel"
  ],
  "Resource": "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1"
}
```

**2. aeo-agent-role** (Bedrock Agent):
- `es:ESHttpGet` (OpenSearch read)
- `s3:GetObject` (reports bucket read)
- `lambda:InvokeFunction` (tool Lambdas)
- `bedrock:InvokeModel` (Claude 3 Sonnet)

**3. aeo-tool-role** (Tool Lambdas: Query, Analyze, Measure):
- `es:ESHttpGet`, `es:ESHttpPost` (OpenSearch read/write)
- `s3:GetObject` (reports bucket read)

**4. aeo-distillation-role** (Distillation Lambda):
- `es:ESHttpGet` (OpenSearch read)
- `s3:PutObject` (reports bucket write)

**Acceptance Criteria**:
- [ ] All 4 IAM roles defined with least-privilege policies
- [ ] Signet IT has reviewed and approved policies
- [ ] CDK code written for IAM provisioning
- [ ] Trust relationships documented (which services can assume roles)

**Deliverable Format**: CDK TypeScript code + IAM policy JSON documentation

---

### D5: CDK Infrastructure Skeleton

**Owner**: Lead Architect
**Due**: Week 2 End
**Estimated Effort**: 16 hours

**Objective**: Deploy dev environment infrastructure (S3, Lambda stubs, OpenSearch cluster).

**Tasks**:
1. Create CDK app structure (`lib/`, `bin/`, `test/`)
2. Define 3 environments (dev, staging, prod) with config files
3. Provision S3 buckets (raw-data, reports, manual-uploads)
4. Provision OpenSearch cluster (t3.small.search for dev)
5. Provision Lambda stubs (empty handlers, correct runtime)
6. Provision EventBridge schedule (distillation trigger)
7. Deploy to dev AWS account
8. Validate deployment (smoke test: S3 PUT triggers Lambda)

**S3 Buckets**:
- `aeo-raw-data-dev`: Raw Profound exports (7-day retention)
- `aeo-reports-dev`: Weekly measurement reports (30-day retention)
- `aeo-manual-uploads-dev`: Manual data seeding for testing

**OpenSearch Cluster** (Dev):
- Instance: t3.small.search (single node)
- Storage: 10GB EBS
- Public endpoint with IAM auth (no VPC for dev)

**Lambda Stubs**:
- Ingestion Lambda: Empty handler, 1GB memory, 5-min timeout
- Distillation Lambda: Empty handler, 4GB memory, 15-min timeout
- Request Handler: Empty handler, 512MB memory, 30s timeout
- Query/Analyze/Measure Tools: Empty handlers, 1GB memory, 30s timeout

**Acceptance Criteria**:
- [ ] CDK code deploys successfully to dev account
- [ ] All S3 buckets created with correct retention policies
- [ ] OpenSearch cluster accessible via IAM auth
- [ ] Lambda stubs invokable (return "Not implemented" message)
- [ ] EventBridge schedule configured (disabled for now)

**Deliverable Format**: CDK TypeScript codebase in `infrastructure/`

---

### D6: Bedrock Agent Design

**Owner**: AI Engineer
**Due**: Week 2 End
**Estimated Effort**: 12 hours

**Objective**: Design Bedrock Agent configuration (action groups, system prompt, tool schemas).

**Tasks**:
1. Define 3 action groups (Query, Analyze, Measure)
2. Write system prompt with grounding enforcement (see ADR-003)
3. Define tool schemas (JSON format for each Lambda)
4. Document expected input/output for each tool
5. Create test queries for validation (50 sample queries)
6. Document prompt tuning methodology (see Appendix E.5)

**Action Groups**:

**1. query_knowledge_base**:
- **Tool**: Query Lambda
- **Purpose**: Search OpenSearch for visibility data
- **Input**: `{"query_text": str, "filters": {...}, "top_k": int}`
- **Output**: `{"results": [...], "count": int, "confidence": float}`

**2. analyze_gaps**:
- **Tool**: Analyze Lambda
- **Purpose**: Identify visibility gaps and generate recommendations
- **Input**: `{"query": str, "current_sov": float, "target_sov": float}`
- **Output**: `{"recommendations": [...], "expected_impact": float}`

**3. measure_performance**:
- **Tool**: Measure Lambda
- **Purpose**: Retrieve pre-calculated SOV delta report
- **Input**: `{"report_date": str}` (defaults to most recent)
- **Output**: `{"aggregate_delta": float, "top_gainers": [...], "top_decliners": [...]}`

**System Prompt** (Draft):
```
You are an AEO (Answer Engine Optimization) analyst helping Signet improve brand visibility in LLM responses.

Your knowledge base contains Profound API scans showing how LLMs respond to 400 jewelry-related queries.

When answering queries:
1. ALWAYS cite sources: [Source: Profound scan YYYY-MM-DD, query "..."]
2. NEVER generate recommendations without data to support them
3. If data is insufficient, say: "Insufficient data. Available data covers..."
4. Use tools to retrieve data; do not speculate

Available tools:
- query_knowledge_base: Search for visibility data by query text
- analyze_gaps: Identify gaps and generate recommendations
- measure_performance: Retrieve SOV delta reports

Grounding enforcement is CRITICAL. Every claim must trace to data.
```

**Acceptance Criteria**:
- [ ] 3 action groups defined with tool schemas
- [ ] System prompt drafted with grounding enforcement
- [ ] 50 test queries prepared for Week 3 validation
- [ ] Prompt tuning methodology documented (Appendix E.5)

**Deliverable Format**: Bedrock Agent configuration JSON + system prompt Markdown

---

### D7: Risk Register (Updated)

**Owner**: DL/PM
**Due**: Week 1 End
**Estimated Effort**: 4 hours

**Objective**: Update risk register with project-specific risks (beyond template risks).

**Tasks**:
1. Review existing risk register from Gap Analysis document
2. Add project-specific risks identified during Week 1
3. Assign risk owners and mitigation plans
4. Review with client stakeholders
5. Establish weekly risk review cadence

**Project-Specific Risks** (examples to add):

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Signet PM not assigned by Week 1 | Medium | High | Escalate to Accenture Engagement Owner Day 1 |
| Profound API credentials delayed | Medium | High | Request credentials in kickoff email (Week -1) |
| ESI Team capacity constraints (inbound API) | High | Medium | Identify fallback: Accenture implements temporary mock API |
| Bedrock quota limits hit during testing | Low | Medium | Request quota increase in Week 1 |
| OpenSearch cluster undersized (dev) | Medium | Low | Monitor performance; resize if P95 >200ms |

**Acceptance Criteria**:
- [ ] Risk register updated with 10+ project-specific risks
- [ ] Each risk has owner, mitigation plan, and review date
- [ ] Client stakeholders have reviewed risks
- [ ] Weekly risk review meeting scheduled

**Deliverable Format**: Risk register spreadsheet (Excel or Google Sheets)

---

### D8: Week 3-5 Sprint Plan

**Owner**: DL/PM
**Due**: Week 2 End
**Estimated Effort**: 8 hours

**Objective**: Break down Week 3-5 work into sprint tasks with resource allocation.

**Tasks**:
1. Review Delivery Plan v4.1 for Week 3-5 milestones
2. Break down milestones into 2-week sprint tasks
3. Assign tasks to Lead Architect and AI Engineer
4. Estimate effort for each task (story points or hours)
5. Identify dependencies and critical path
6. Review with team for feasibility

**Week 3-5 Milestones** (from Delivery Plan v4.1):
- **M2 (Week 5)**: Data pipeline complete (Lambda functions implemented)
- Agent demo preparation (Week 4-5)

**Sprint Breakdown** (example):

**Sprint 1 (Week 3-4)**:
- [ ] Implement Ingestion Lambda (Lead Architect, 16h)
- [ ] Implement Query Tool Lambda (AI Engineer, 12h)
- [ ] Configure Bedrock Agent (AI Engineer, 16h)
- [ ] Write unit tests for Lambdas (Lead Architect, 12h)
- [ ] Deploy to dev and validate (Lead Architect, 8h)

**Sprint 2 (Week 5)**:
- [ ] Implement Analyze Tool Lambda (AI Engineer, 16h)
- [ ] Implement Measure Tool Lambda (Lead Architect, 12h)
- [ ] Implement Distillation Lambda (Lead Architect, 16h)
- [ ] Integration testing (AI Engineer, 12h)
- [ ] Performance testing (Lead Architect, 8h)

**Acceptance Criteria**:
- [ ] All Week 3-5 tasks identified and estimated
- [ ] Resource allocation balanced (no >40h weeks)
- [ ] Dependencies documented (critical path identified)
- [ ] Team has reviewed and agreed to plan

**Deliverable Format**: Sprint plan (Jira, Trello, or spreadsheet)

---

## Technology Stack Deep Dive

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Compute** | AWS Lambda | Python 3.11 | Serverless functions (ingestion, tools, distillation) |
| **API** | API Gateway | REST | Public endpoint, authentication |
| **Agent** | AWS Bedrock | Claude 3 Sonnet | Intent classification, orchestration |
| **Embeddings** | AWS Bedrock | Titan Embed Text v1 | 1024-dim vector generation |
| **Vector DB** | OpenSearch Service | 2.x | k-NN search, document storage |
| **Storage** | S3 | Standard → Glacier | Raw data (90-day retention) |
| **Scheduler** | EventBridge | - | Weekly distillation trigger |
| **Monitoring** | CloudWatch | - | Logs, metrics, dashboards |
| **IaC** | AWS CDK | TypeScript | Infrastructure provisioning |
| **Testing** | pytest + moto | - | Unit tests with AWS mocking |

---

## Stakeholder Map & Dependencies

![Stakeholder Integration Map](../diagrams/08-stakeholder-integration.svg)

### Accenture Team

| Role | Responsibility |
|------|----------------|
| **Lead Architect** | AWS infrastructure, API specs, OpenSearch, IAM |
| **AI Engineer** | Bedrock Agent, Lambda development, prompt engineering |
| **DL/PM** | Governance, status reporting, risk management |

### Signet Teams

| Team | Responsibility | Integration Point |
|------|----------------|-------------------|
| **Signet PM** | Client coordination, strategist management | Joint governance with DL/PM |
| **AEO Strategist** | Prompt taxonomy (400 prompts), Profound config | Provides prompt bank Week 1 |
| **Content Strategist** | Recommendation review, brand guidelines | Reviews agent outputs |
| **ESI Team** | Profound integration, S3 data delivery | Implements inbound API (Week 3) |
| **Infoverity** | PIM API integration | Implements outbound API (Week 10) |
| **Signet IT** | AWS provisioning, ARB approval | Approves architecture (Week 2) |

### Critical Dependencies

| Dependency | Owner | Due | Blocker For |
|------------|-------|-----|-------------|
| Signet PM assigned | Signet | Week 0 | All coordination |
| AWS account ready | Signet IT | Week 0 | Infrastructure deployment |
| Profound API credentials | AEO Strategist | Week 1 | Dev testing |
| Prompt bank delivered | AEO Strategist | Week 1 | Ingestion testing |
| Inbound API spec | Lead Architect | Week 1 | ESI Team implementation |
| ESI integration | ESI Team | Week 3 | Production data flow |
| Outbound API spec | Lead Architect | Week 6 | Infoverity implementation |

---

## Risk Management

### Top 5 Risks (Week 1-2)

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **Signet PM not assigned** | Medium | High | Escalate to Engagement Owner Day 1; non-negotiable for kickoff |
| **AWS account delayed** | Medium | High | Request account provisioning in pre-kickoff email (Week -1) |
| **Profound API credentials delayed** | Medium | Medium | Request credentials in kickoff; use synthetic data for dev if delayed |
| **ESI Team capacity constraints** | High | Medium | Identify fallback: Accenture implements temporary mock API for dev |
| **Bedrock quota limits** | Low | Medium | Request quota increase in Week 1 kickoff |

**Risk Review Cadence**: Weekly status meeting (Fridays)

---

## Week 1-2 Action Plan

### Week 1 Daily Breakdown

**Day 1 (Monday)**:
- [ ] Client kickoff meeting (all Accenture roles + client stakeholders)
- [ ] Validate AWS account access (Lead Architect)
- [ ] Validate Profound API credentials (AI Engineer)
- [ ] Confirm Signet PM assignment (DL/PM)
- [ ] Distribute Week 1 action plan (DL/PM)

**Day 2 (Tuesday)**:
- [ ] Draft Inbound API spec (Lead Architect, 4h)
- [ ] Review API spec with ESI Team (Lead Architect, 1h)
- [ ] Begin OpenSearch schema definition (Lead Architect, 3h)
- [ ] Read Bedrock Agent documentation (AI Engineer, 4h)
- [ ] Update risk register (DL/PM, 2h)

**Day 3 (Wednesday)**:
- [ ] Finalize Inbound API spec (Lead Architect, 2h)
- [ ] Finalize OpenSearch schema (Lead Architect, 3h)
- [ ] Test OpenSearch schema in dev cluster (Lead Architect, 2h)
- [ ] Draft Bedrock Agent action groups (AI Engineer, 4h)
- [ ] Review risks with client (DL/PM, 1h)

**Day 4 (Thursday)**:
- [ ] Begin CDK infrastructure code (Lead Architect, 6h)
- [ ] Draft system prompt (AI Engineer, 4h)
- [ ] Prepare 50 test queries (AI Engineer, 2h)
- [ ] Finalize risk register (DL/PM, 1h)

**Day 5 (Friday)**:
- [ ] Week 1 status review (all roles, 1h)
- [ ] Validate Week 1 exit criteria (all roles)
- [ ] Plan Week 2 tasks (DL/PM)

### Week 2 Daily Breakdown

**Day 1 (Monday)**:
- [ ] Continue CDK infrastructure (Lead Architect, 6h)
- [ ] Define IAM roles (Lead Architect, 4h)
- [ ] Finalize Bedrock Agent design (AI Engineer, 4h)

**Day 2 (Tuesday)**:
- [ ] Deploy CDK to dev (Lead Architect, 4h)
- [ ] Smoke test infrastructure (Lead Architect, 2h)
- [ ] Document agent configuration (AI Engineer, 4h)

**Day 3 (Wednesday)**:
- [ ] Update Architecture v2 document (Lead Architect, 6h)
- [ ] Get Signet IT review on IAM roles (Lead Architect, 1h)
- [ ] Begin Week 3-5 sprint plan (DL/PM, 4h)

**Day 4 (Thursday)**:
- [ ] Finalize Architecture v2 (Lead Architect, 4h)
- [ ] Get client sign-off on architecture (Lead Architect, 1h)
- [ ] Finalize sprint plan (DL/PM, 3h)

**Day 5 (Friday)**:
- [ ] Week 2 status review (all roles, 1h)
- [ ] Validate Week 2 exit criteria (all roles)
- [ ] Celebrate Milestone M1: Data pipeline design complete

---

## Technical Deep Dives

### Deep Dive 1: Bedrock Agent Architecture

**How Bedrock Agents Work**:

1. **User Query Arrives**: "Why is visibility dropping on gold chains and what should I do?"

2. **Agent Processes Query**:
   - Claude 3 Sonnet analyzes intent
   - Determines 2 tools needed: `query_knowledge_base` + `analyze_gaps`
   - Plans execution order

3. **Tool 1: query_knowledge_base**:
   - Agent constructs Lambda input: `{"query_text": "gold chains", "top_k": 10}`
   - Lambda invokes OpenSearch k-NN search
   - Returns top 10 visibility scans for "gold chains" + related queries

4. **Tool 2: analyze_gaps**:
   - Agent constructs Lambda input: `{"query": "gold chains", "current_sov": 0.12, "target_sov": 0.25}`
   - Lambda analyzes gap, generates recommendations
   - Returns: "Add 'gold chain styles' to product descriptions (expected +8% SOV)"

5. **Response Synthesis**:
   - Agent combines tool outputs
   - Adds grounding citations: [Source: Profound scan 2024-01-15]
   - Returns: "Visibility on 'gold chains' dropped 5% last week (SOV: 0.12 → 0.07). Gap analysis suggests adding 'gold chain styles' to product descriptions. [Source: ...]"

**Key Configuration**:
- **Model**: Claude 3 Sonnet (faster than Opus, cheaper than Haiku, good balance)
- **Temperature**: 0.1 (low variance for consistency)
- **Max Tokens**: 2000 (allows detailed responses with citations)
- **Top P**: 0.9 (slightly creative but grounded)

**Prompt Engineering Best Practices** (see Appendix E.5):
- Use few-shot examples for tool selection
- Enforce citation format in every response
- Test on 50 sample queries before production

---

### Deep Dive 2: OpenSearch k-NN Search

**How Vector Search Works**:

1. **Document Ingestion**:
   - Profound scan arrives: `{"query": "best engagement rings under $5000", "response_text": "..."}`
   - Bedrock Titan generates 1024-dim embedding from `query` field
   - Document + vector indexed to OpenSearch

2. **Query Time**:
   - User searches: "affordable engagement rings"
   - Bedrock Titan generates query embedding (1024-dim)
   - OpenSearch HNSW algorithm finds k-nearest neighbors (cosine similarity)
   - Returns top 10 most similar documents

**HNSW Algorithm Parameters**:
- **m**: 16 (number of bi-directional links per node; higher = better recall, slower indexing)
- **ef_construction**: 100 (controls index quality; higher = better recall, slower indexing)
- **ef_search**: 512 (controls search quality; higher = better recall, slower search)

**Why HNSW vs Other Algorithms**:
- **HNSW**: Fast search (100ms), good recall (95%+), scales to millions of vectors
- **IVF**: Faster indexing, slower search, lower recall
- **Flat (brute force)**: Perfect recall, too slow for >10K vectors

**Performance Tuning**:
- Target: <100ms P95 latency for 10-result queries
- If too slow: Reduce `ef_search` to 256
- If recall too low: Increase `m` to 32

---

## Common Pitfalls & How to Avoid

### Pitfall 1: Bedrock Agent Latency Spiral

**Problem**: Agent takes >5 seconds to respond.

**Cause**: Agent is making 3+ tool calls sequentially for a single query.

**Solution**:
- Optimize system prompt to reduce unnecessary tool calls
- Pre-calculate common query patterns (e.g., "SOV for category X" → distillation report)
- Set tool timeout to 2 seconds (fail fast if tool hangs)

**Prevention**: Test with 50 sample queries in Week 2; measure P95 latency before Week 3 implementation.

---

### Pitfall 2: OpenSearch Index Bloat

**Problem**: OpenSearch cluster runs out of storage after 2 weeks.

**Cause**: Retaining all historical scans without deletion policy.

**Solution**:
- Implement index lifecycle management (ILM)
- Keep 90 days in "hot" storage (fast SSDs)
- Move 90-365 days to "warm" storage (cheaper HDDs)
- Delete after 365 days (or archive to S3 Glacier)

**Prevention**: Configure ILM policies in D3 deliverable (Week 1).

---

### Pitfall 3: Prompt Bank Mismatch

**Problem**: Profound scans arrive for queries not in the 400-prompt bank.

**Cause**: AEO Strategist updated Profound config without notifying team.

**Solution**:
- Validate `query` field against prompt bank in Ingestion Lambda
- Log mismatches to CloudWatch for review
- Set up weekly sync with AEO Strategist (Fridays)

**Prevention**: Include prompt bank versioning in Inbound API spec (D2).

---

### Pitfall 4: Bedrock Quota Exceeded

**Problem**: Agent returns 429 errors (rate limit exceeded).

**Cause**: Default Bedrock quota is 10 requests/minute for Claude 3 Sonnet.

**Solution**:
- Request quota increase to 100 requests/minute in Week 1
- Implement exponential backoff in Request Handler Lambda
- Cache frequent queries (e.g., weekly SOV report) in S3

**Prevention**: Test quota limits in dev before Week 3 go-live.

---

### Pitfall 5: Hallucinated Recommendations

**Problem**: Agent recommends changes that don't align with brand guidelines.

**Cause**: Grounding enforcement not working (agent ignoring system prompt).

**Solution**:
- Use Bedrock Guardrails to block responses without citations
- Implement post-processing check: Reject responses without `[Source: ...]` pattern
- Add human-in-the-loop review for recommendations (Content Strategist approval)

**Prevention**: Test grounding enforcement with adversarial queries in Week 2 (e.g., "Recommend changes for diamonds" when only gold chain data exists).

---

## Appendix E: Lambda Implementation Patterns

### E.1: Base Lambda Handler Pattern

All Lambda functions follow this pattern:

```python
#!/usr/bin/env python3
import json
import boto3
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger()
tracer = Tracer()
metrics = Metrics()

# Initialize clients outside handler for reuse
s3 = boto3.client('s3')
opensearch = get_opensearch_client()  # See E.2
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

@tracer.capture_lambda_handler
@logger.inject_lambda_context
@metrics.log_metrics
def handler(event, context):
    """
    Lambda function description.

    Triggered by: S3 PUT / API Gateway / EventBridge

    Input: event structure (see below)
    Output: response structure (see below)
    """
    try:
        # 1. Validate input
        validate_input(event)

        # 2. Process request
        result = process_request(event)

        # 3. Log success metrics
        metrics.add_metric(name="SuccessCount", unit=MetricUnit.Count, value=1)

        # 4. Return response
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }

    except ValidationError as e:
        logger.error(f"Validation failed: {str(e)}")
        metrics.add_metric(name="ValidationErrorCount", unit=MetricUnit.Count, value=1)
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Validation failed', 'details': str(e)})
        }

    except Exception as e:
        logger.exception(f"Unexpected error: {str(e)}")
        metrics.add_metric(name="ErrorCount", unit=MetricUnit.Count, value=1)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }
```

**Key Packages**:
```txt
# requirements.txt
aws-lambda-powertools==2.30.0
boto3==1.34.0
opensearch-py==2.4.0
requests-aws4auth==1.2.3
```

---

### E.2: OpenSearch Client Initialization

```python
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import boto3
import os

def get_opensearch_client():
    """
    Initialize OpenSearch client with IAM authentication.

    Environment Variables:
    - OPENSEARCH_ENDPOINT: OpenSearch domain endpoint (e.g., aeo-kb.us-east-1.es.amazonaws.com)
    - AWS_REGION: AWS region (default: us-east-1)
    """
    host = os.environ['OPENSEARCH_ENDPOINT']
    region = os.environ.get('AWS_REGION', 'us-east-1')

    # Get AWS credentials from Lambda execution role
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(
        credentials.access_key,
        credentials.secret_key,
        region,
        'es',
        session_token=credentials.token
    )

    client = OpenSearch(
        hosts=[{'host': host, 'port': 443}],
        http_auth=awsauth,
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection,
        timeout=30,
        max_retries=3,
        retry_on_timeout=True
    )

    return client
```

---

### E.3: Ingestion Lambda Handler

```python
import json
import boto3
from datetime import datetime
from typing import Dict, List

s3 = boto3.client('s3')
opensearch = get_opensearch_client()
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

@tracer.capture_lambda_handler
@logger.inject_lambda_context
def handler(event, context):
    """
    Ingestion Lambda: S3 PUT → Validate → Embeddings → OpenSearch

    Triggered by: S3 PUT event on aeo-raw-data/profound-exports/

    Input event structure:
    {
      "Records": [
        {
          "s3": {
            "bucket": {"name": "aeo-raw-data"},
            "object": {"key": "profound-exports/2024/01/15/batch-abc123.json"}
          }
        }
      ]
    }
    """
    successful = 0
    failed = 0

    for record in event['Records']:
        try:
            # 1. Fetch from S3
            bucket = record['s3']['bucket']['name']
            key = record['s3']['object']['key']

            logger.info(f"Processing {bucket}/{key}")

            response = s3.get_object(Bucket=bucket, Key=key)
            raw_data = json.loads(response['Body'].read().decode('utf-8'))

            # 2. Validate schema
            batch = validate_profound_batch(raw_data)

            # 3. Process each scan
            for scan in batch['scans']:
                process_scan(scan)
                successful += 1

        except ValidationError as e:
            logger.error(f"Validation failed for {key}: {str(e)}")
            failed += 1
            # Send to DLQ for manual review
            send_to_dlq(record, str(e))

        except Exception as e:
            logger.exception(f"Processing failed for {key}: {str(e)}")
            failed += 1

    metrics.add_metric(name="SuccessfulScans", unit=MetricUnit.Count, value=successful)
    metrics.add_metric(name="FailedScans", unit=MetricUnit.Count, value=failed)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'successful': successful,
            'failed': failed
        })
    }

def validate_profound_batch(data: Dict) -> Dict:
    """
    Validate Profound batch structure.

    Required fields:
    - batch_id (str)
    - scans (list, max 100 items)

    Each scan requires:
    - query (str, must be in prompt bank)
    - scan_date (ISO 8601)
    - llm_provider (str)
    - brand_mentioned (bool)
    - share_of_voice (float, 0-1)
    - response_text (str)
    """
    if 'batch_id' not in data:
        raise ValidationError("Missing batch_id")

    if 'scans' not in data or not isinstance(data['scans'], list):
        raise ValidationError("Missing or invalid scans array")

    if len(data['scans']) > 100:
        raise ValidationError(f"Batch size {len(data['scans'])} exceeds limit of 100")

    for i, scan in enumerate(data['scans']):
        validate_scan(scan, i)

    return data

def validate_scan(scan: Dict, index: int):
    """Validate individual scan structure."""
    required_fields = ['query', 'scan_date', 'llm_provider', 'brand_mentioned', 'share_of_voice', 'response_text']

    for field in required_fields:
        if field not in scan:
            raise ValidationError(f"Scan {index}: Missing field '{field}'")

    # Validate share_of_voice range
    if not (0 <= scan['share_of_voice'] <= 1):
        raise ValidationError(f"Scan {index}: share_of_voice must be 0-1, got {scan['share_of_voice']}")

    # Validate scan_date is recent (within last 48 hours)
    scan_date = datetime.fromisoformat(scan['scan_date'].replace('Z', '+00:00'))
    age_hours = (datetime.now(scan_date.tzinfo) - scan_date).total_seconds() / 3600
    if age_hours > 48:
        raise ValidationError(f"Scan {index}: scan_date is {age_hours:.1f} hours old (max 48)")

def process_scan(scan: Dict):
    """
    Process single scan: Generate embedding → Index to OpenSearch.
    """
    # 1. Generate embedding for query text
    embedding = generate_embedding(scan['query'])

    # 2. Prepare document
    document = {
        'query': scan['query'],
        'query_vector': embedding,
        'scan_date': scan['scan_date'],
        'llm_provider': scan['llm_provider'],
        'brand_mentioned': scan['brand_mentioned'],
        'share_of_voice': scan['share_of_voice'],
        'response_text': scan['response_text'],
        'competitors': scan.get('competitors', []),
        'indexed_at': datetime.utcnow().isoformat()
    }

    # 3. Index to OpenSearch
    doc_id = f"{scan['query']}_{scan['scan_date']}"  # Unique ID

    opensearch.index(
        index='aeo-scans',
        id=doc_id,
        body=document,
        refresh=False  # Don't force immediate refresh (performance optimization)
    )

    logger.info(f"Indexed document: {doc_id}")

def generate_embedding(text: str) -> List[float]:
    """
    Generate 1024-dim embedding using Bedrock Titan.

    Args:
        text: Input text (query)

    Returns:
        1024-dimensional vector
    """
    request_body = json.dumps({
        'inputText': text
    })

    response = bedrock_runtime.invoke_model(
        modelId='amazon.titan-embed-text-v1',
        contentType='application/json',
        accept='application/json',
        body=request_body
    )

    response_body = json.loads(response['body'].read())
    embedding = response_body['embedding']

    return embedding

class ValidationError(Exception):
    pass

def send_to_dlq(record: Dict, error_message: str):
    """Send failed record to Dead Letter Queue for manual review."""
    sqs = boto3.client('sqs')
    dlq_url = os.environ['DLQ_URL']

    sqs.send_message(
        QueueUrl=dlq_url,
        MessageBody=json.dumps({
            'record': record,
            'error': error_message,
            'timestamp': datetime.utcnow().isoformat()
        })
    )
```

**Environment Variables**:
```bash
OPENSEARCH_ENDPOINT=aeo-kb-dev.us-east-1.es.amazonaws.com
DLQ_URL=https://sqs.us-east-1.amazonaws.com/123456789/aeo-ingestion-dlq
AWS_REGION=us-east-1
```

**Memory**: 1GB
**Timeout**: 5 minutes
**Concurrency**: 10 (limit concurrent executions to avoid overwhelming OpenSearch)

---

### E.4: OpenSearch Index Schema

**Index Name**: `aeo-scans`

**Mapping**:
```json
{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 1,
      "knn": true,
      "knn.algo_param.ef_search": 512
    }
  },
  "mappings": {
    "properties": {
      "query": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "query_vector": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib",
          "parameters": {
            "m": 16,
            "ef_construction": 100
          }
        }
      },
      "scan_date": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "llm_provider": {
        "type": "keyword"
      },
      "brand_mentioned": {
        "type": "boolean"
      },
      "share_of_voice": {
        "type": "float"
      },
      "response_text": {
        "type": "text"
      },
      "competitors": {
        "type": "keyword"
      },
      "indexed_at": {
        "type": "date"
      }
    }
  }
}
```

**Index Creation** (run once in dev):
```python
opensearch.indices.create(
    index='aeo-scans',
    body=index_mapping  # JSON above
)
```

**Query Example** (k-NN search):
```python
def search_similar_queries(query_text: str, top_k: int = 10) -> List[Dict]:
    """
    Search for similar queries using k-NN vector search.
    """
    # 1. Generate query embedding
    query_embedding = generate_embedding(query_text)

    # 2. k-NN search
    response = opensearch.search(
        index='aeo-scans',
        body={
            'size': top_k,
            'query': {
                'knn': {
                    'query_vector': {
                        'vector': query_embedding,
                        'k': top_k
                    }
                }
            },
            '_source': ['query', 'scan_date', 'share_of_voice', 'brand_mentioned']
        }
    )

    results = []
    for hit in response['hits']['hits']:
        results.append({
            'query': hit['_source']['query'],
            'scan_date': hit['_source']['scan_date'],
            'share_of_voice': hit['_source']['share_of_voice'],
            'brand_mentioned': hit['_source']['brand_mentioned'],
            'score': hit['_score']  # Cosine similarity score
        })

    return results
```

---

### E.5: Bedrock Agent Tool Lambda (Query Tool)

```python
import json
from typing import Dict, List

@tracer.capture_lambda_handler
@logger.inject_lambda_context
def handler(event, context):
    """
    Query Tool Lambda: Search knowledge base via k-NN.

    Invoked by: Bedrock Agent

    Input event structure:
    {
      "messageVersion": "1.0",
      "agent": {...},
      "inputText": "What's our visibility on gold chains?",
      "sessionId": "session-abc123",
      "actionGroup": "query_knowledge_base",
      "function": "search",
      "parameters": [
        {"name": "query_text", "type": "string", "value": "gold chains"},
        {"name": "top_k", "type": "integer", "value": "10"}
      ]
    }

    Output structure:
    {
      "messageVersion": "1.0",
      "response": {
        "actionGroup": "query_knowledge_base",
        "function": "search",
        "functionResponse": {
          "responseBody": {
            "TEXT": {
              "body": "{\"results\": [...], \"count\": 10, \"confidence\": 0.87}"
            }
          }
        }
      }
    }
    """
    # 1. Extract parameters
    parameters = {p['name']: p['value'] for p in event['parameters']}
    query_text = parameters['query_text']
    top_k = int(parameters.get('top_k', 10))

    logger.info(f"Searching for: {query_text}, top_k={top_k}")

    # 2. Search OpenSearch
    results = search_similar_queries(query_text, top_k)

    # 3. Calculate confidence (average similarity score)
    confidence = sum(r['score'] for r in results) / len(results) if results else 0

    # 4. Format response for Bedrock Agent
    response_body = {
        'results': results,
        'count': len(results),
        'confidence': round(confidence, 2)
    }

    return {
        'messageVersion': '1.0',
        'response': {
            'actionGroup': event['actionGroup'],
            'function': event['function'],
            'functionResponse': {
                'responseBody': {
                    'TEXT': {
                        'body': json.dumps(response_body)
                    }
                }
            }
        }
    }
```

**Memory**: 1GB
**Timeout**: 30 seconds

---

### E.6: Distillation Lambda (Weekly SOV Delta)

```python
import json
from datetime import datetime, timedelta
from typing import Dict, List

@tracer.capture_lambda_handler
@logger.inject_lambda_context
def handler(event, context):
    """
    Distillation Lambda: Calculate weekly SOV delta (T0 vs T1).

    Triggered by: EventBridge schedule (Sunday 2am UTC)

    Process:
    1. Query T0 data (T-14d to T-7d)
    2. Query T1 data (T-7d to T)
    3. Calculate deltas per query
    4. Generate aggregate report
    5. Write to S3
    """
    # 1. Define time windows
    now = datetime.utcnow()
    t1_end = now
    t1_start = now - timedelta(days=7)
    t0_end = t1_start
    t0_start = now - timedelta(days=14)

    logger.info(f"T0: {t0_start} to {t0_end}")
    logger.info(f"T1: {t1_start} to {t1_end}")

    # 2. Query T0 and T1 data
    t0_data = query_time_window(t0_start, t0_end)
    t1_data = query_time_window(t1_start, t1_end)

    # 3. Calculate deltas
    deltas = calculate_deltas(t0_data, t1_data)

    # 4. Generate report
    report = generate_report(deltas, t1_end)

    # 5. Write to S3
    report_key = f"weekly/{t1_end.strftime('%Y-%m-%d')}.json"
    write_report_to_s3(report, report_key)

    logger.info(f"Report written to s3://aeo-reports/{report_key}")

    return {
        'statusCode': 200,
        'body': json.dumps({
            'report_date': t1_end.isoformat(),
            'aggregate_delta': report['aggregate_delta'],
            'improved_count': report['improved_count'],
            'declined_count': report['declined_count']
        })
    }

def query_time_window(start: datetime, end: datetime) -> Dict[str, float]:
    """
    Query OpenSearch for average SOV per query in time window.

    Returns:
        {"query1": 0.25, "query2": 0.18, ...}
    """
    response = opensearch.search(
        index='aeo-scans',
        body={
            'size': 0,  # No individual hits, just aggregations
            'query': {
                'range': {
                    'scan_date': {
                        'gte': start.isoformat(),
                        'lt': end.isoformat()
                    }
                }
            },
            'aggs': {
                'by_query': {
                    'terms': {
                        'field': 'query.keyword',
                        'size': 500  # Assume <500 unique queries
                    },
                    'aggs': {
                        'avg_sov': {
                            'avg': {
                                'field': 'share_of_voice'
                            }
                        }
                    }
                }
            }
        }
    )

    result = {}
    for bucket in response['aggregations']['by_query']['buckets']:
        query = bucket['key']
        avg_sov = bucket['avg_sov']['value']
        result[query] = avg_sov

    return result

def calculate_deltas(t0_data: Dict[str, float], t1_data: Dict[str, float]) -> List[Dict]:
    """
    Calculate SOV delta for each query.

    Returns:
        [
          {"query": "gold chains", "t0_sov": 0.20, "t1_sov": 0.25, "delta": 0.05},
          ...
        ]
    """
    deltas = []

    all_queries = set(t0_data.keys()) | set(t1_data.keys())

    for query in all_queries:
        t0_sov = t0_data.get(query, 0)
        t1_sov = t1_data.get(query, 0)
        delta = t1_sov - t0_sov

        deltas.append({
            'query': query,
            't0_sov': round(t0_sov, 3),
            't1_sov': round(t1_sov, 3),
            'delta': round(delta, 3)
        })

    # Sort by absolute delta (biggest changes first)
    deltas.sort(key=lambda x: abs(x['delta']), reverse=True)

    return deltas

def generate_report(deltas: List[Dict], report_date: datetime) -> Dict:
    """Generate summary report."""
    improved = [d for d in deltas if d['delta'] > 0]
    declined = [d for d in deltas if d['delta'] < 0]

    aggregate_delta = sum(d['delta'] for d in deltas) / len(deltas) if deltas else 0

    return {
        'report_date': report_date.isoformat(),
        'aggregate_delta': round(aggregate_delta, 3),
        'improved_count': len(improved),
        'declined_count': len(declined),
        'total_queries': len(deltas),
        'top_gainers': improved[:10],  # Top 10 improvements
        'top_decliners': declined[:10],  # Top 10 declines
        'all_deltas': deltas
    }

def write_report_to_s3(report: Dict, key: str):
    """Write report to S3."""
    s3.put_object(
        Bucket='aeo-reports',
        Key=key,
        Body=json.dumps(report, indent=2),
        ContentType='application/json'
    )
```

**Memory**: 4GB (handles large aggregation queries)
**Timeout**: 15 minutes
**EventBridge Schedule**: `cron(0 2 ? * SUN *)` (Sunday 2am UTC)

---

## Appendix F: Observability Specification

### F.1: CloudWatch Dashboard

**Dashboard Name**: `AEO-System-Overview`

**Widgets**:

1. **API Gateway Requests** (Line chart, 5-min intervals)
   - Metrics: `Count`, `4XXError`, `5XXError`
   - Dimension: ApiName=aeo-api

2. **Lambda Invocations** (Line chart, 5-min intervals)
   - Metrics: `Invocations`, `Errors`, `Throttles`
   - Dimension: FunctionName (one line per Lambda)

3. **Lambda Duration** (Line chart, P50/P95/P99)
   - Metrics: `Duration` (P50, P95, P99)
   - Dimension: FunctionName

4. **OpenSearch Query Latency** (Line chart, P95)
   - Custom metric from Lambda: `OpenSearchQueryLatency`
   - Unit: Milliseconds

5. **Bedrock Token Usage** (Stacked area chart)
   - Custom metric: `BedrockInputTokens`, `BedrockOutputTokens`
   - Unit: Count

6. **Ingestion Success Rate** (Number widget)
   - Metric: `SuccessfulScans / (SuccessfulScans + FailedScans)`
   - Target: >95%

**Dashboard JSON** (CloudFormation):
```json
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "title": "API Gateway Requests",
        "metrics": [
          ["AWS/ApiGateway", "Count", {"stat": "Sum", "label": "Total Requests"}],
          [".", "4XXError", {"stat": "Sum", "label": "Client Errors"}],
          [".", "5XXError", {"stat": "Sum", "label": "Server Errors"}]
        ],
        "period": 300,
        "stat": "Sum",
        "region": "us-east-1",
        "yAxis": {"left": {"min": 0}}
      }
    },
    {
      "type": "metric",
      "properties": {
        "title": "Lambda P95 Duration (Target: <2s end-to-end)",
        "metrics": [
          ["AWS/Lambda", "Duration", {"stat": "p95", "label": "Ingestion Lambda"}],
          ["...", {"stat": "p95", "label": "Query Tool"}],
          ["...", {"stat": "p95", "label": "Request Handler"}]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "yAxis": {"left": {"max": 2000, "label": "ms"}}
      }
    }
  ]
}
```

---

### F.2: CloudWatch Alarms

**Alarm 1: High Error Rate**

```yaml
Alarm:
  Name: AEO-HighErrorRate
  Description: Lambda error rate >5% over 5 minutes
  MetricName: Errors
  Namespace: AWS/Lambda
  Statistic: Sum
  Period: 300
  EvaluationPeriods: 1
  Threshold: 5
  ComparisonOperator: GreaterThanThreshold
  TreatMissingData: notBreaching
  AlarmActions:
    - arn:aws:sns:us-east-1:123456789:aeo-alerts
```

**Alarm 2: P95 Latency Breach**

```yaml
Alarm:
  Name: AEO-P95LatencyBreach
  Description: Query flow P95 latency >2 seconds
  Metrics:
    - Id: m1
      MetricStat:
        Metric:
          Namespace: AEO/Custom
          MetricName: QueryFlowLatency
        Period: 300
        Stat: p95
  Threshold: 2000
  ComparisonOperator: GreaterThanThreshold
  EvaluationPeriods: 2
  AlarmActions:
    - arn:aws:sns:us-east-1:123456789:aeo-alerts
```

**Alarm 3: Ingestion Success Rate Drop**

```yaml
Alarm:
  Name: AEO-IngestionSuccessRateDrop
  Description: Ingestion success rate <90% over 15 minutes
  Metrics:
    - Id: success_rate
      Expression: "successful / (successful + failed) * 100"
    - Id: successful
      MetricStat:
        Metric:
          Namespace: AEO/Custom
          MetricName: SuccessfulScans
        Period: 900
        Stat: Sum
    - Id: failed
      MetricStat:
        Metric:
          Namespace: AEO/Custom
          MetricName: FailedScans
        Period: 900
        Stat: Sum
  Threshold: 90
  ComparisonOperator: LessThanThreshold
  EvaluationPeriods: 1
  AlarmActions:
    - arn:aws:sns:us-east-1:123456789:aeo-alerts
```

---

### F.3: Structured Logging Pattern

All Lambda functions use AWS Lambda Powertools for structured JSON logging:

```python
from aws_lambda_powertools import Logger

logger = Logger(service="aeo-ingestion")

# Log with context
logger.info("Processing batch", extra={
    "batch_id": "2024-01-15-daily",
    "scan_count": 100,
    "bucket": "aeo-raw-data"
})

# Log errors with stack trace
try:
    process_scan(scan)
except Exception as e:
    logger.exception("Scan processing failed", extra={
        "scan_id": scan['id'],
        "query": scan['query']
    })
```

**Log Output** (JSON):
```json
{
  "level": "INFO",
  "location": "handler:42",
  "message": "Processing batch",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "aeo-ingestion",
  "batch_id": "2024-01-15-daily",
  "scan_count": 100,
  "bucket": "aeo-raw-data",
  "cold_start": false,
  "function_name": "aeo-ingestion-lambda",
  "function_memory_size": 1024,
  "function_arn": "arn:aws:lambda:us-east-1:123456789:function:aeo-ingestion-lambda",
  "function_request_id": "abc-123-def"
}
```

**Benefits**:
- Easy to query in CloudWatch Insights
- Automatic correlation (request ID, function name)
- Supports dashboards and alarms

---

### F.4: CloudWatch Insights Queries

**Query 1: Top 10 Slowest Queries**

```sql
fields @timestamp, query_text, latency_ms
| filter service = "aeo-query-tool"
| sort latency_ms desc
| limit 10
```

**Query 2: Error Rate by Lambda Function**

```sql
fields function_name, count(*) as error_count
| filter level = "ERROR"
| stats count(*) by function_name
| sort error_count desc
```

**Query 3: Bedrock Token Usage by Day**

```sql
fields @timestamp, input_tokens, output_tokens
| filter service = "aeo-bedrock-agent"
| stats sum(input_tokens) as total_input, sum(output_tokens) as total_output by bin(1d)
```

---

### F.5: X-Ray Tracing

Enable X-Ray tracing for end-to-end request flow visibility:

**Configuration** (CDK):
```typescript
const requestHandler = new lambda.Function(this, 'RequestHandler', {
  // ... other config
  tracing: lambda.Tracing.ACTIVE  // Enable X-Ray
});
```

**Instrumentation** (Python):
```python
from aws_lambda_powertools import Tracer

tracer = Tracer()

@tracer.capture_lambda_handler
def handler(event, context):
    # Automatically traced
    result = call_opensearch()
    return result

@tracer.capture_method
def call_opensearch():
    # Also traced (subsegment)
    response = opensearch.search(...)
    return response
```

**X-Ray Service Map**:
- Shows: API Gateway → Request Handler → Bedrock Agent → Query Tool → OpenSearch
- Metrics: Latency, error rate, throttles per service
- Drill-down: Individual traces with timing breakdown

---

## Appendix G: Cost Model

### G.1: Monthly Cost Breakdown (Production)

**OpenSearch** (3x r6g.large.search, Multi-AZ):
- Compute: $0.209/hour × 3 nodes × 730 hours = **$458.50/month**
- Storage: 100GB × $0.135/GB = **$13.50/month**
- Data transfer (within AZ): $0
- **Subtotal: $472/month**

**Lambda**:
- Invocations: 10,000 queries/day × 30 days = 300,000 invocations
  - Request Handler: 300K × $0.20/1M = $0.06
  - Tool Lambdas (avg 1.5 tools/query): 450K × $0.20/1M = $0.09
  - Ingestion (400 scans/day): 12K × $0.20/1M = $0.002
  - Distillation (4/month): negligible
- Compute (GB-seconds):
  - Request Handler: 300K × 0.5GB × 0.05s = 7,500 GB-s × $0.0000166667 = $0.13
  - Tool Lambdas: 450K × 1GB × 0.5s = 225,000 GB-s × $0.0000166667 = $3.75
  - Ingestion: 12K × 1GB × 3s = 36,000 GB-s × $0.0000166667 = $0.60
  - Distillation: 4 × 4GB × 300s = 4,800 GB-s × $0.0000166667 = $0.08
- **Subtotal: $4.71/month**

**Bedrock - Claude 3 Sonnet** (Agent orchestration):
- Input tokens: 10,000 queries/day × 500 tokens/query × 30 days = 150M tokens
  - Cost: 150M × $3/1M = **$450/month**
- Output tokens: 10,000 queries/day × 200 tokens/response × 30 days = 60M tokens
  - Cost: 60M × $15/1M = **$900/month**
- **Subtotal: $1,350/month**

**Bedrock - Titan Embeddings**:
- Ingestion: 400 scans/day × 50 tokens/query × 30 days = 600K tokens
  - Cost: 600K × $0.0001/1K = **$0.06/month**
- Query embeddings: 10,000 queries/day × 20 tokens × 30 days = 6M tokens
  - Cost: 6M × $0.0001/1K = **$0.60/month**
- **Subtotal: $0.66/month**

**S3**:
- Standard (30 days): 10GB × $0.023/GB = **$0.23/month**
- Glacier (90+ days): 50GB × $0.004/GB = **$0.20/month**
- PUT requests (ingestion): 12K × $0.005/1K = **$0.06/month**
- **Subtotal: $0.49/month**

**API Gateway**:
- Requests: 300K × $3.50/1M = **$1.05/month**

**CloudWatch**:
- Logs (5GB ingestion): 5GB × $0.50/GB = **$2.50/month**
- Metrics (100 custom metrics): 100 × $0.30 = **$30/month**
- Dashboards (1 dashboard): $3/month
- **Subtotal: $35.50/month**

**EventBridge**:
- Invocations: 4/month (weekly distillation) = **$0**

**Total Monthly Cost (Production)**: **$1,864.41/month**

**Budget Headroom**: $5,000 - $1,864.41 = **$3,135.59** (63% under budget)

---

### G.2: Cost Optimization Recommendations

**Optimization 1: Reserved OpenSearch Instances**
- Current: On-demand r6g.large.search = $0.209/hour
- Reserved (1-year, no upfront): $0.146/hour
- Savings: ($0.209 - $0.146) × 3 nodes × 730 hours = **$138/month**

**Optimization 2: Bedrock Token Caching**
- Cache frequent queries (e.g., weekly SOV report) in S3
- Estimated 20% of queries are repeats
- Savings: 20% × $1,350 = **$270/month**

**Optimization 3: OpenSearch Reserved Capacity**
- Use OpenSearch Serverless Reserved Capacity Units (RCUs)
- Estimated savings: 20% on compute = **$92/month**

**Optimization 4: Lambda Reserved Concurrency** (only if predictable traffic)
- Not recommended for pilot (unpredictable usage)

**Total Potential Savings**: $138 + $270 + $92 = **$500/month**
**Optimized Cost**: $1,864 - $500 = **$1,364/month** (73% under budget)

---

### G.3: Cost by Environment

| Environment | OpenSearch | Lambda | Bedrock | S3 | Other | **Total** |
|-------------|------------|--------|---------|----|----|-----------|
| **Dev** | $50 (t3.small) | $5 | $50 | $1 | $10 | **$116/month** |
| **Staging** | $200 (t3.medium × 3) | $10 | $150 | $2 | $20 | **$382/month** |
| **Prod** | $472 (r6g.large × 3) | $15 | $1,351 | $0.49 | $38 | **$1,876/month** |

**Total All Environments**: **$2,374/month** (53% under $5K budget)

---

### G.4: Budget Alerts

**Alert 1: 50% Budget Threshold**
- Threshold: $1,000/month
- Action: Email DL/PM + Lead Architect
- Frequency: Daily check

**Alert 2: 80% Budget Threshold**
- Threshold: $1,600/month
- Action: Email + Slack alert
- Frequency: Hourly check

**Alert 3: 100% Budget Threshold**
- Threshold: $2,000/month
- Action: Email + PagerDuty + Auto-disable non-critical resources
- Frequency: Hourly check

**Configuration** (AWS Budgets):
```yaml
Budget:
  Name: AEO-Production-Monthly-Budget
  BudgetLimit:
    Amount: 2000
    Unit: USD
  TimeUnit: MONTHLY
  BudgetType: COST
  CostFilters:
    TagKeyValue:
      - "Project$AEO"
      - "Environment$Production"
  NotificationsWithSubscribers:
    - Notification:
        NotificationType: ACTUAL
        ComparisonOperator: GREATER_THAN
        Threshold: 50
      Subscribers:
        - SubscriptionType: EMAIL
          Address: dl-pm@accenture.com
    - Notification:
        NotificationType: FORECASTED
        ComparisonOperator: GREATER_THAN
        Threshold: 100
      Subscribers:
        - SubscriptionType: SNS
          Address: arn:aws:sns:us-east-1:123456789:aeo-budget-alerts
```

---

## Appendix H: Security Checklist

### H.1: API Gateway Security

- [ ] **API Key Authentication**: Require API key for all requests
- [ ] **WAF Enabled**: AWS WAF rules for rate limiting and SQL injection blocking
- [ ] **Rate Limiting**: 100 requests/minute per API key
- [ ] **CORS Configured**: Restrict to approved domains only
- [ ] **TLS 1.2+**: Enforce minimum TLS version
- [ ] **CloudWatch Logging**: Enable access logs for audit trail

**WAF Rules**:
```yaml
WebACL:
  Name: AEO-API-WAF
  Rules:
    - Name: RateLimitRule
      Priority: 1
      Statement:
        RateBasedStatement:
          Limit: 100
          AggregateKeyType: IP
      Action:
        Block: {}

    - Name: SQLInjectionRule
      Priority: 2
      Statement:
        ManagedRuleGroupStatement:
          VendorName: AWS
          Name: AWSManagedRulesSQLiRuleSet
      Action:
        Block: {}

    - Name: IPReputationRule
      Priority: 3
      Statement:
        ManagedRuleGroupStatement:
          VendorName: AWS
          Name: AWSManagedRulesAmazonIpReputationList
      Action:
        Block: {}
```

---

### H.2: Lambda Security

- [ ] **Least-Privilege IAM Roles**: Each Lambda has minimal required permissions
- [ ] **Environment Variable Encryption**: Use AWS-managed keys or customer-managed KMS
- [ ] **VPC Configuration** (if needed): Attach to private subnets, no public IPs
- [ ] **Resource Policies**: Restrict which services can invoke Lambdas
- [ ] **Code Signing**: Enable code signing for production Lambdas (optional for pilot)
- [ ] **Secrets Manager Integration**: Store API keys in Secrets Manager, not env vars

**Environment Variable Encryption** (CDK):
```typescript
const ingestionLambda = new lambda.Function(this, 'IngestionLambda', {
  // ... other config
  environmentEncryption: kms.Key.fromKeyArn(this, 'LambdaKey',
    'arn:aws:kms:us-east-1:123456789:key/abc-123'),
  environment: {
    OPENSEARCH_ENDPOINT: ssm.StringParameter.valueForStringParameter(
      this, '/aeo/opensearch-endpoint'
    )
  }
});
```

---

### H.3: OpenSearch Security

- [ ] **Encryption at Rest**: Enable encryption for all indices
- [ ] **Encryption in Transit**: Enforce HTTPS for all connections
- [ ] **IAM Authentication**: Use IAM roles, not username/password
- [ ] **VPC Endpoint** (if needed): Restrict access to VPC only
- [ ] **Index Permissions**: Least-privilege read/write per role
- [ ] **Audit Logging**: Enable audit logs for compliance

**IAM Policy** (OpenSearch read-only):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "es:ESHttpGet",
        "es:ESHttpPost"
      ],
      "Resource": "arn:aws:es:us-east-1:123456789:domain/aeo-kb/*"
    }
  ]
}
```

---

### H.4: S3 Security

- [ ] **Bucket Encryption**: Enable SSE-S3 or SSE-KMS for all buckets
- [ ] **Block Public Access**: Enable for all buckets (default)
- [ ] **Versioning**: Enable for critical buckets (reports)
- [ ] **Lifecycle Policies**: Auto-delete after retention period
- [ ] **Bucket Policies**: Least-privilege access per role
- [ ] **Access Logging**: Enable S3 access logs for audit

**Bucket Policy** (Ingestion Lambda read-only):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789:role/aeo-ingestion-role"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aeo-raw-data/profound-exports/*"
    }
  ]
}
```

---

### H.5: Bedrock Security

- [ ] **No Data Retention**: Bedrock does not retain customer data (AWS-managed)
- [ ] **Guardrails Enabled**: Configure Bedrock Guardrails for content filtering
- [ ] **Model Access**: Restrict to approved models only (Claude 3 Sonnet, Titan)
- [ ] **CloudTrail Logging**: Enable for all Bedrock API calls
- [ ] **Token Limits**: Set max tokens to prevent runaway costs

**Bedrock Guardrails Configuration**:
```yaml
Guardrail:
  Name: AEO-Content-Filter
  BlockedInputMessaging: "Input violates content policy"
  BlockedOutputMessaging: "Output violates content policy"
  ContentPolicyConfig:
    FiltersConfig:
      - Type: SEXUAL
        InputStrength: HIGH
        OutputStrength: HIGH
      - Type: VIOLENCE
        InputStrength: HIGH
        OutputStrength: HIGH
      - Type: HATE
        InputStrength: HIGH
        OutputStrength: HIGH
      - Type: INSULTS
        InputStrength: MEDIUM
        OutputStrength: MEDIUM
  TopicPolicyConfig:
    TopicsConfig:
      - Name: FinancialAdvice
        Definition: "Providing financial or investment advice"
        Type: DENY
```

---

### H.6: Secrets Management

- [ ] **AWS Secrets Manager**: Store all API keys, credentials
- [ ] **Rotation Enabled**: Auto-rotate secrets every 90 days
- [ ] **Lambda Integration**: Use SDK to retrieve secrets at runtime
- [ ] **Least-Privilege Access**: Only necessary Lambdas can read secrets
- [ ] **Audit Logging**: CloudTrail logs all secret access

**Secrets Manager Usage** (Lambda):
```python
import boto3
import json

def get_secret(secret_name: str) -> dict:
    """Retrieve secret from AWS Secrets Manager."""
    client = boto3.client('secretsmanager', region_name='us-east-1')

    response = client.get_secret_value(SecretId=secret_name)
    secret = json.loads(response['SecretString'])

    return secret

# Usage
profound_api_key = get_secret('aeo/profound-api-key')['api_key']
```

---

### H.7: Compliance Requirements

**Data Classification**: Internal Use (not PII, not PCI)

**Retention Policies**:
- Raw data (S3): 90 days → Glacier (365 days) → Delete
- Reports (S3): 365 days → Delete
- Logs (CloudWatch): 90 days → Delete
- OpenSearch indices: 365 days → Delete

**Access Control**:
- Production data: Read-only for Signet stakeholders
- Modify access: Accenture team only (until handoff)
- Admin access: Signet IT only

**Audit Requirements**:
- CloudTrail: Enable for all API calls
- CloudWatch: Retain logs for 90 days
- Quarterly access review: Verify IAM roles are still needed

---

## Appendix I: Testing Toolkit

### I.1: Unit Testing Pattern (pytest + moto)

**Test Structure**:
```
tests/
├── unit/
│   ├── test_ingestion_lambda.py
│   ├── test_query_tool.py
│   └── test_distillation_lambda.py
├── integration/
│   ├── test_opensearch_integration.py
│   └── test_s3_integration.py
└── conftest.py  # Shared fixtures
```

**Example Unit Test** (Ingestion Lambda):
```python
import pytest
import json
from moto import mock_s3, mock_secretsmanager
from unittest.mock import patch, MagicMock
from lambdas.ingestion import handler, validate_scan, generate_embedding

# Fixtures
@pytest.fixture
def s3_event():
    """Sample S3 PUT event."""
    return {
        'Records': [{
            's3': {
                'bucket': {'name': 'aeo-raw-data'},
                'object': {'key': 'profound-exports/2024/01/15/batch-123.json'}
            }
        }]
    }

@pytest.fixture
def valid_scan():
    """Sample valid Profound scan."""
    return {
        'query': 'best engagement rings under $5000',
        'scan_date': '2024-01-15T08:00:00Z',
        'llm_provider': 'ChatGPT-4',
        'brand_mentioned': True,
        'share_of_voice': 0.15,
        'response_text': 'Top options include...',
        'competitors': ['Blue Nile', 'James Allen']
    }

# Tests
@mock_s3
def test_handler_success(s3_event):
    """Test successful ingestion."""
    # Setup mock S3
    import boto3
    s3 = boto3.client('s3', region_name='us-east-1')
    s3.create_bucket(Bucket='aeo-raw-data')

    # Upload test data
    batch_data = {
        'batch_id': 'batch-123',
        'scans': [{
            'query': 'gold chains',
            'scan_date': '2024-01-15T08:00:00Z',
            'llm_provider': 'ChatGPT-4',
            'brand_mentioned': True,
            'share_of_voice': 0.20,
            'response_text': 'Signet offers...'
        }]
    }
    s3.put_object(
        Bucket='aeo-raw-data',
        Key='profound-exports/2024/01/15/batch-123.json',
        Body=json.dumps(batch_data)
    )

    # Mock OpenSearch and Bedrock
    with patch('lambdas.ingestion.opensearch') as mock_os, \
         patch('lambdas.ingestion.bedrock_runtime') as mock_bedrock:

        # Configure mocks
        mock_bedrock.invoke_model.return_value = {
            'body': MagicMock(read=lambda: json.dumps({
                'embedding': [0.1] * 1024
            }).encode())
        }

        # Execute Lambda
        response = handler(s3_event, None)

        # Assertions
        assert response['statusCode'] == 200
        body = json.loads(response['body'])
        assert body['successful'] == 1
        assert body['failed'] == 0

        # Verify OpenSearch was called
        mock_os.index.assert_called_once()

def test_validate_scan_missing_field(valid_scan):
    """Test validation fails with missing field."""
    invalid_scan = valid_scan.copy()
    del invalid_scan['query']

    with pytest.raises(Exception, match="Missing field 'query'"):
        validate_scan(invalid_scan, 0)

def test_validate_scan_invalid_sov(valid_scan):
    """Test validation fails with invalid SOV."""
    invalid_scan = valid_scan.copy()
    invalid_scan['share_of_voice'] = 1.5  # Invalid: >1

    with pytest.raises(Exception, match="share_of_voice must be 0-1"):
        validate_scan(invalid_scan, 0)

def test_generate_embedding():
    """Test embedding generation."""
    with patch('lambdas.ingestion.bedrock_runtime') as mock_bedrock:
        # Mock Bedrock response
        mock_bedrock.invoke_model.return_value = {
            'body': MagicMock(read=lambda: json.dumps({
                'embedding': [0.1] * 1024
            }).encode())
        }

        # Generate embedding
        embedding = generate_embedding('test query')

        # Assertions
        assert len(embedding) == 1024
        assert all(isinstance(x, float) for x in embedding)
```

**Run Tests**:
```bash
pytest tests/unit/ -v
```

---

### I.2: Integration Testing (LocalStack)

**LocalStack Setup** (Docker Compose):
```yaml
version: '3.8'
services:
  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"  # LocalStack gateway
    environment:
      - SERVICES=s3,secretsmanager,lambda
      - DEBUG=1
      - DATA_DIR=/tmp/localstack/data
    volumes:
      - ./localstack-data:/tmp/localstack/data
```

**Integration Test** (OpenSearch + S3):
```python
import pytest
import boto3
from opensearchpy import OpenSearch

@pytest.fixture(scope="module")
def localstack_s3():
    """LocalStack S3 client."""
    return boto3.client('s3', endpoint_url='http://localhost:4566')

@pytest.fixture(scope="module")
def opensearch_client():
    """OpenSearch test cluster (requires separate container)."""
    return OpenSearch(
        hosts=[{'host': 'localhost', 'port': 9200}],
        use_ssl=False
    )

def test_ingestion_to_opensearch(localstack_s3, opensearch_client):
    """Test full ingestion flow: S3 → Lambda → OpenSearch."""
    # 1. Create test bucket
    localstack_s3.create_bucket(Bucket='aeo-raw-data')

    # 2. Upload test data
    batch_data = {...}  # Sample batch
    localstack_s3.put_object(
        Bucket='aeo-raw-data',
        Key='profound-exports/2024/01/15/batch-123.json',
        Body=json.dumps(batch_data)
    )

    # 3. Trigger Lambda (manual invocation for test)
    from lambdas.ingestion import handler
    event = {
        'Records': [{
            's3': {
                'bucket': {'name': 'aeo-raw-data'},
                'object': {'key': 'profound-exports/2024/01/15/batch-123.json'}
            }
        }]
    }

    response = handler(event, None)

    # 4. Verify data in OpenSearch
    opensearch_client.indices.refresh(index='aeo-scans')

    search_response = opensearch_client.search(
        index='aeo-scans',
        body={'query': {'match_all': {}}}
    )

    assert search_response['hits']['total']['value'] == 1
    assert search_response['hits']['hits'][0]['_source']['query'] == 'gold chains'
```

**Run Integration Tests**:
```bash
docker-compose up -d  # Start LocalStack
pytest tests/integration/ -v
docker-compose down
```

---

### I.3: Synthetic Test Data

**Test Data Generator** (`scripts/generate-test-data.py`):
```python
import json
from datetime import datetime, timedelta
import random

def generate_synthetic_batch(scan_count: int = 100) -> dict:
    """Generate synthetic Profound scan batch."""
    queries = [
        'best engagement rings under $5000',
        'gold chain necklace for men',
        'diamond stud earrings 1 carat',
        'wedding bands white gold',
        'tennis bracelet diamond'
    ]

    llm_providers = ['ChatGPT-4', 'Perplexity', 'Google-AI']

    scans = []
    base_date = datetime.utcnow() - timedelta(hours=2)

    for i in range(scan_count):
        query = random.choice(queries)
        scan = {
            'query': query,
            'scan_date': (base_date + timedelta(seconds=i*10)).isoformat() + 'Z',
            'llm_provider': random.choice(llm_providers),
            'brand_mentioned': random.random() > 0.3,
            'share_of_voice': round(random.uniform(0.05, 0.40), 2),
            'response_text': f'Sample response for "{query}"...',
            'competitors': random.sample(['Blue Nile', 'James Allen', 'Brilliant Earth'], k=2)
        }
        scans.append(scan)

    return {
        'batch_id': f"test-batch-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}",
        'scans': scans
    }

if __name__ == '__main__':
    # Generate 10 batches of 100 scans each
    for i in range(10):
        batch = generate_synthetic_batch(100)

        with open(f'test-data/batch-{i+1}.json', 'w') as f:
            json.dump(batch, f, indent=2)

    print("Generated 10 synthetic batches (1,000 total scans)")
```

**Usage**:
```bash
python scripts/generate-test-data.py
# Output: test-data/batch-1.json, batch-2.json, ..., batch-10.json
```

---

### I.4: Load Testing (Locust)

**Locust Script** (`locustfile.py`):
```python
from locust import HttpUser, task, between
import json
import random

class AEOUser(HttpUser):
    wait_time = between(1, 3)  # 1-3 seconds between requests

    def on_start(self):
        """Setup: Get API key (in real test, use actual key)."""
        self.headers = {
            'x-api-key': 'test-api-key-123',
            'Content-Type': 'application/json'
        }

    @task(3)  # Weight: 3x more frequent than other tasks
    def query_knowledge_base(self):
        """Simulate user query."""
        queries = [
            'What is our visibility on gold chains?',
            'Why is visibility dropping for engagement rings?',
            'Show me SOV for diamond earrings',
            'Recommend optimizations for wedding bands'
        ]

        payload = {
            'query': random.choice(queries)
        }

        self.client.post(
            '/query',
            headers=self.headers,
            json=payload,
            name='Query Knowledge Base'
        )

    @task(1)
    def get_weekly_report(self):
        """Simulate weekly report retrieval."""
        self.client.get(
            '/reports/latest',
            headers=self.headers,
            name='Get Weekly Report'
        )
```

**Run Load Test**:
```bash
# Simulate 10 concurrent users
locust -f locustfile.py --host=https://api-dev.aeo.signet.com --users 10 --spawn-rate 2 --run-time 5m

# Output:
# - P50 latency
# - P95 latency
# - Requests/second
# - Error rate
```

**Target Metrics**:
- P95 latency: <2 seconds
- Error rate: <1%
- Throughput: 10 requests/second (sustained)

---

### I.5: Test Coverage Requirements

| Component | Unit Test Coverage | Integration Test Coverage |
|-----------|-------------------|---------------------------|
| Ingestion Lambda | >80% | S3 → OpenSearch flow |
| Query Tool Lambda | >80% | OpenSearch k-NN search |
| Analyze Tool Lambda | >80% | Gap analysis logic |
| Measure Tool Lambda | >80% | S3 report retrieval |
| Distillation Lambda | >80% | OpenSearch aggregations |
| Request Handler | >70% | API Gateway integration |

**Run Coverage Report**:
```bash
pytest --cov=lambdas --cov-report=html tests/unit/
# Output: htmlcov/index.html
```

---

## Appendix J: Complete OpenAPI Specifications

### J.1: Inbound API (Profound → S3)

**File**: `v4/specs/inbound-api-profound.yaml`

```yaml
openapi: 3.0.0
info:
  title: AEO Profound Ingestion API
  description: |
    API for ESI Team to deliver Profound scan batches to AEO system.

    **Delivery Method**: Write JSON to S3 bucket (event-driven ingestion)

    **S3 Path Structure**: s3://aeo-raw-data/profound-exports/{YYYY}/{MM}/{DD}/{batch_id}.json
  version: 1.0.0
  contact:
    name: Accenture AEO Team
    email: aeo-team@accenture.com

servers:
  - url: s3://aeo-raw-data/profound-exports
    description: S3 bucket (not HTTP endpoint)

paths:
  /{YYYY}/{MM}/{DD}/{batch_id}.json:
    put:
      summary: Upload Profound scan batch
      description: |
        ESI Team writes JSON file to S3 bucket. Lambda automatically triggered by S3 PUT event.

        **Validation Rules**:
        - Max 100 scans per batch
        - query must match prompt bank (400 prompts)
        - scan_date must be within last 48 hours
        - share_of_voice must be 0-1
      parameters:
        - name: YYYY
          in: path
          required: true
          schema:
            type: string
            pattern: '^\d{4}$'
          example: '2024'
        - name: MM
          in: path
          required: true
          schema:
            type: string
            pattern: '^(0[1-9]|1[0-2])$'
          example: '01'
        - name: DD
          in: path
          required: true
          schema:
            type: string
            pattern: '^(0[1-9]|[12]\d|3[01])$'
          example: '15'
        - name: batch_id
          in: path
          required: true
          schema:
            type: string
            pattern: '^[a-zA-Z0-9-]+$'
          example: 'daily-morning-batch'

      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProfoundBatch'
            example:
              batch_id: 'daily-morning-batch'
              scans:
                - query: 'best engagement rings under $5000'
                  scan_date: '2024-01-15T08:00:00Z'
                  llm_provider: 'ChatGPT-4'
                  brand_mentioned: true
                  share_of_voice: 0.15
                  response_text: 'Top options include Kay Jewelers...'
                  competitors: ['Blue Nile', 'James Allen']

      responses:
        '200':
          description: File uploaded successfully (S3 PUT succeeded)
        '400':
          description: Validation failed (detected by Lambda, sent to DLQ)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '413':
          description: Batch size exceeds 100 scans

components:
  schemas:
    ProfoundBatch:
      type: object
      required:
        - batch_id
        - scans
      properties:
        batch_id:
          type: string
          description: Unique identifier for this batch
          example: 'daily-morning-batch'
        scans:
          type: array
          maxItems: 100
          items:
            $ref: '#/components/schemas/ProfoundScan'

    ProfoundScan:
      type: object
      required:
        - query
        - scan_date
        - llm_provider
        - brand_mentioned
        - share_of_voice
        - response_text
      properties:
        query:
          type: string
          description: Search query (must be in 400-prompt bank)
          example: 'best engagement rings under $5000'
        scan_date:
          type: string
          format: date-time
          description: When the LLM was queried (ISO 8601)
          example: '2024-01-15T08:00:00Z'
        llm_provider:
          type: string
          enum: ['ChatGPT-4', 'Perplexity', 'Google-AI', 'Claude']
          example: 'ChatGPT-4'
        brand_mentioned:
          type: boolean
          description: Was Signet brand mentioned in response?
          example: true
        share_of_voice:
          type: number
          format: float
          minimum: 0
          maximum: 1
          description: Signet SOV (0-1 range)
          example: 0.15
        response_text:
          type: string
          description: Full LLM response text
          example: 'Top options include Kay Jewelers...'
        competitors:
          type: array
          items:
            type: string
          description: Competitors mentioned in response
          example: ['Blue Nile', 'James Allen']

    Error:
      type: object
      properties:
        error:
          type: string
          example: 'Validation failed'
        details:
          type: string
          example: 'Scan 0: Missing field "query"'
```

**IAM Policy** (ESI Team S3 write access):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::aeo-raw-data/profound-exports/*"
    }
  ]
}
```

---

### J.2: Outbound API (Recommendations → PIM)

**File**: `v4/specs/outbound-api-pim.yaml`

```yaml
openapi: 3.0.0
info:
  title: AEO PIM Recommendations API
  description: |
    API for AEO system to send content recommendations to Infoverity PIM.

    **Implementation**: Infoverity team implements this API.
    **Timeline**: Week 6+ (not blocking Week 1-2)
  version: 1.0.0

servers:
  - url: https://pim-api.infoverity.com/v1
    description: Production PIM API
  - url: https://pim-api-staging.infoverity.com/v1
    description: Staging PIM API

security:
  - ApiKeyAuth: []

paths:
  /recommendations:
    post:
      summary: Submit content recommendation
      description: |
        AEO system sends recommendation for PIM content update.

        **Workflow**:
        1. AEO Analyze Tool generates recommendation
        2. Content Strategist reviews (optional)
        3. POST to this endpoint
        4. Infoverity creates P360 task for content update

      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Recommendation'
            example:
              recommendation_id: 'rec-abc123'
              created_at: '2024-01-15T10:30:00Z'
              product_category: 'engagement-rings'
              visibility_gap:
                query: 'best engagement rings under $5000'
                current_sov: 0.15
                target_sov: 0.30
              recommended_changes:
                - field: 'product_description'
                  current_value: 'Classic engagement ring'
                  suggested_value: 'Affordable engagement ring under $5000 with lab-grown diamond'
                  rationale: 'LLMs prioritize price point and diamond type in this query segment'

      responses:
        '201':
          description: Recommendation accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RecommendationAccepted'
        '400':
          description: Invalid recommendation format
        '429':
          description: Rate limit exceeded (max 100/hour)

components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

  schemas:
    Recommendation:
      type: object
      required:
        - recommendation_id
        - created_at
        - product_category
        - visibility_gap
        - recommended_changes
      properties:
        recommendation_id:
          type: string
          example: 'rec-abc123'
        created_at:
          type: string
          format: date-time
          example: '2024-01-15T10:30:00Z'
        product_category:
          type: string
          example: 'engagement-rings'
        visibility_gap:
          $ref: '#/components/schemas/VisibilityGap'
        recommended_changes:
          type: array
          items:
            $ref: '#/components/schemas/ContentChange'

    VisibilityGap:
      type: object
      properties:
        query:
          type: string
          example: 'best engagement rings under $5000'
        current_sov:
          type: number
          format: float
          example: 0.15
        target_sov:
          type: number
          format: float
          example: 0.30

    ContentChange:
      type: object
      required:
        - field
        - suggested_value
        - rationale
      properties:
        field:
          type: string
          enum: ['product_description', 'product_title', 'meta_description', 'keywords']
          example: 'product_description'
        current_value:
          type: string
          example: 'Classic engagement ring'
        suggested_value:
          type: string
          example: 'Affordable engagement ring under $5000 with lab-grown diamond'
        rationale:
          type: string
          example: 'LLMs prioritize price point and diamond type in this query segment'

    RecommendationAccepted:
      type: object
      properties:
        recommendation_id:
          type: string
          example: 'rec-abc123'
        p360_task_id:
          type: string
          description: Informatica P360 task ID (for tracking)
          example: 'P360-TASK-456'
        status:
          type: string
          enum: ['pending_review', 'approved', 'rejected']
          example: 'pending_review'
```

**Example cURL Command**:
```bash
curl -X POST https://pim-api.infoverity.com/v1/recommendations \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "recommendation_id": "rec-abc123",
    "created_at": "2024-01-15T10:30:00Z",
    "product_category": "engagement-rings",
    "visibility_gap": {
      "query": "best engagement rings under $5000",
      "current_sov": 0.15,
      "target_sov": 0.30
    },
    "recommended_changes": [
      {
        "field": "product_description",
        "current_value": "Classic engagement ring",
        "suggested_value": "Affordable engagement ring under $5000 with lab-grown diamond",
        "rationale": "LLMs prioritize price point and diamond type in this query segment"
      }
    ]
  }'
```

---

**Document End**
**Version**: 2.0 (Streamlined)
**Total Length**: ~2,200 lines (25% reduction from v1.1)
