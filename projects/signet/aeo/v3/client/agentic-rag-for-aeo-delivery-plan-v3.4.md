# Agentic RAG for AEO: Solution Architecture & Delivery Plan

**Version**: 3.4
**Mode**: Executive Advisory
**Last Updated**: December 2025

---

## Slide 1: Implementation Roadmap

![excalidraw](diagrams/implementation-roadmap.excalidraw)

### Phase Details

| Phase | Weeks | Scope | Success Criteria | Team Focus |
|-------|:-----:|-------|------------------|------------|
| **0. Plan/Analyze/Design** | 0-2 | Solution design, Profound setup, PIM/Prodevix integration design | Architecture finalized, integration contracts defined | Lead Architect, Content Strategist |
| **1. Mobilization** | 2-3 | Team onboarding, artifact collection | All input artifacts delivered | All |
| **2. Data Foundation** | 3-5 | S3 + Lambda ingestion + OpenSearch | Daily ingestion working | Lead Architect |
| **3. Agent Core** | 4-7 | Bedrock agent + tools + prompts | Correct intent routing; grounded responses | GenAI Engineer |
| **4. Measurement** | 6-8 | Distillation Lambda + reporting | Weekly delta calculation working | Data Analyst |
| **5. Integration & Polish** | 7-9 | API Gateway + Auth + S3 outbound bucket | End-to-end flow validated | All |
| **6. Pilot Execution** | 9-12 | Run with real data, measure results | Pilot Measurement Readout delivered | AEO Strategist |

### Key Milestones

| ID | Milestone | Week | Deliverable |
|:--:|-----------|:----:|-------------|
| M0 | Kickoff | 0 | Engagement started, discovery initiated |
| M1 | Design Complete | 2 | Architecture doc, integration contracts, Profound taxonomy finalized |
| M2 | Data Pipeline Ready | 4 | Ingestion Lambda processing sample data |
| M3 | Agent Demo | 6 | Bedrock agent answering queries with grounded responses |
| M4 | Measurement Operational | 8 | Weekly delta reports generating |
| M5 | System Ready | 9 | End-to-end flow validated in staging |
| M6 | Pilot Complete | 12 | Measurement Readout delivered to client |

---

## Slide 2: Resource Staffing Plan

### RACI-Based Effort Estimation

Effort estimated bottoms-up from individual tasks, mapped to roles, then rolled up to determine duration. See Appendix for detailed task breakdown and critical path analysis.

### Why 12 Weeks?

The 12-week duration is driven by:

1. **Plan/Analyze/Design Phase (Weeks 0-2)**: 2 weeks to finalize solution architecture, Profound taxonomy (topics/prompts to subcategory mapping), and AWS-PIM/Prodevix integration design
2. **Build Phase (Weeks 2-9)**: Sequential dependencies on critical path require 7 weeks minimum
3. **Pilot Phase (Weeks 9-12)**: 3 weeks required for multiple Profound scan cycles to demonstrate measurable visibility lift

The pilot measurement period cannot be compressed—multiple Profound scan cycles are required to demonstrate impact.

*Note: As a POC, testing is embedded within each technical role. Analysts and engineers validate their own deliverables.*

### Effort by Phase

| Phase | Weeks | Hours | Focus |
|-------|:-----:|------:|-------|
| P0: Plan/Analyze/Design | 0-2 | 134 | Solution architecture, Profound taxonomy, PIM/Prodevix integration design |
| P1: Mobilization | 2-3 | 72 | Team onboarding, artifact collection, environment validation |
| P2: Data Foundation | 3-5 | 134 | S3, Lambda, OpenSearch, embeddings |
| P3: Agent Core | 4-7 | 146 | Bedrock agent, tools, prompt engineering |
| P4: Measurement | 6-8 | 96 | Distillation, SOV, dashboards |
| P5: Integration | 7-9 | 92 | API Gateway, PIM integration, validation |
| P6: Pilot Execution | 9-12 | 256 | Monitoring, tuning, content QA, readouts |
| **Total** | | **930** | |

### Accenture Staffing & Pricing

| Role | Location | Hours | Rate/Hr | Total |
|------|:--------:|------:|--------:|------:|
| Lead Architect | Onshore | 264 | $382 | $100,848 |
| AI Engineer | Onshore | 144 | $382 | $55,008 |
| AEO/Data Strategist | Onshore | 176 | $253 | $44,528 |
| Content Strategist | Onshore | 146 | $347 | $50,662 |
| DL/PM | Onshore | 200 | $421 | $84,200 |
| **Total** | | **930** | | **$335,246** |

*Note: Profound licensing is a separate client responsibility.*

### Weekly Role Allocation (Hours per Week)

| Role | Wk 0 | Wk 1 | Wk 2 | Wk 3 | Wk 4 | Wk 5 | Wk 6 | Wk 7 | Wk 8 | Wk 9 | Wk 10 | Wk 11 | Wk 12 | **Total** |
|------|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|------:|------:|------:|----------:|
| Lead Architect | 40 | 40 | 8 | 24 | 28 | 28 | 8 | 16 | 24 | 16 | 16 | 8 | 8 | **264** |
| AI Engineer | – | – | 4 | 4 | 8 | 20 | 28 | 24 | 16 | 12 | 12 | 8 | 8 | **144** |
| AEO/Data Strategist | – | – | 8 | 8 | 4 | 8 | 16 | 20 | 20 | 24 | 24 | 24 | 20 | **176** |
| Content Strategist | – | 40 | 16 | 12 | 12 | 8 | 4 | 4 | 4 | 12 | 12 | 12 | 10 | **146** |
| DL/PM | 8 | 6 | 12 | 14 | 16 | 16 | 14 | 16 | 16 | 20 | 20 | 20 | 22 | **200** |
| **Weekly Total** | **48** | **86** | **48** | **62** | **68** | **80** | **70** | **80** | **80** | **84** | **84** | **72** | **68** | **930** |

### Allocation Principles

| Principle | Application |
|-----------|-------------|
| **Testing embedded in roles** | Technical roles validate their own deliverables (POC approach) |
| **Lead oversight throughout** | Lead Architect maintains oversight hours even when not primary builder |
| **Gradual ramp-down** | Roles taper off rather than abrupt cutoffs to ensure proper handoff and documentation |
| **PM continuous presence** | DL/PM maintains consistent hours throughout for governance and client coordination |
| **Content Strategist through pilot** | Remains engaged for output QA, prompt refinement, and content recommendations |

### Role Responsibilities

| Role | Primary Responsibilities |
|------|-------------------------|
| Lead Architect | Infrastructure (S3, Lambda, OpenSearch), API Gateway, Bedrock setup, deployment, technical oversight |
| AI Engineer | Bedrock agent configuration, tool Lambdas, prompt engineering, agent tuning, code review support |
| AEO/Data Strategist | Profound coordination, measurement system, distillation logic, dashboards, readouts |
| Content Strategist | Prompt bank (400 prompts), taxonomy, brand voice QA, pilot output analysis, prompt refinement |
| DL/PM | Project governance, status reporting, risk management, client coordination |

### Role Onboarding/Offboarding Pattern

| Role | Onboard | Peak | Offboard | Notes |
|------|---------|------|----------|-------|
| Lead Architect | Week 0 | Weeks 0-1 (design), 3-5, 7-9 | Week 12 | Full-time (40 hrs/wk) design phase; infrastructure-heavy mid-project; support during pilot |
| AI Engineer | Week 2 | Weeks 6-8 | Week 12 | Joins at mobilization; agent development peak; maintenance support late |
| AEO/Data Strategist | Week 2 | Weeks 7-12 | Week 12 | Joins at mobilization; peaks during measurement & pilot |
| Content Strategist | Week 1 | Week 1 (design), Weeks 2-4 | Week 12 | Full-time (40 hrs) week 1 for Profound taxonomy; prompt bank creation; pilot QA |
| DL/PM | Week 0 | All weeks | Week 12 | Consistent presence throughout engagement |

---

## Slide 3: Dependencies & Critical Path

### External Dependencies

| Dependency | Owner | Required By | Risk if Late |
|------------|-------|-------------|--------------|
| Profound API credentials | Client IT | Week 0 | Blocks design phase discovery |
| Profound taxonomy draft | Content Strategist | Week 1 | Blocks prompt-to-subcategory mapping |
| Competitor list | Client Stakeholder | Week 1 | Blocks SOV measurement design |
| PIM/Prodevix integration contact | Client | Week 0 | Blocks integration design |
| AWS account access | Client IT | Week 2 | Blocks infrastructure deployment |
| Sample Profound export | Profound | Week 2 | Blocks schema validation |
| Prompt bank (400 prompts) | Content Strategist | Week 2 | Blocks Profound scans |
| Output schema definition | AEO Strategist | Week 3 | Blocks ingestion Lambda |

### Internal Dependencies

![d2](diagrams/phase-dependencies-flowchart.d2)

### Critical Path

**Phase 0 (Design) → Phase 2 (Data Foundation) → Phase 3 (Agent Core) → Phase 5 (Integration) → Phase 6 (Pilot)**

Mobilization (Phase 1) and Measurement (Phase 4) run in parallel but must complete before their downstream dependencies.

---

## Slide 4: Delivery Team

### Team Composition

| Role | What They Do |
|------|--------------|
| **Lead Architect** | Builds the infrastructure—data pipelines, vector database, API integrations. Owns technical delivery. |
| **AI Engineer** | Configures the Bedrock agent, trains it to use tools effectively, and tunes response quality. |
| **AEO/Data Strategist** | Coordinates Profound setup, builds the measurement system, and delivers visibility reports. |
| **Content Strategist** | Creates the prompt bank, defines brand voice criteria, and validates output quality. |
| **Delivery Lead** | Your single point of contact. Owns status reporting, risk management, and stakeholder coordination. |

**Team Size**: 5 roles, part-time allocations (see Staffing Plan for hours)

*Note: As a POC, testing is embedded within each role rather than a dedicated QA function.*

### Your Point of Contact

The **Delivery Lead** is your single point of contact for this engagement:

- Weekly status updates
- Escalation path: Team → Delivery Lead → Client Stakeholder → Executive Sponsor
- Change request coordination
- Quality gate sign-offs

All client communication flows through the Delivery Lead to ensure clarity and accountability.

---

## Slide 5: Profound Setup Requirements

### Overview

Profound is the data source that powers the measurement system. **If this data is incomplete or incorrect, the system produces nothing of value.** Three specific artifacts must be delivered before development begins.

> **About Profound**: Profound is an enterprise AEO (Answer Engine Optimization) platform that tracks brand visibility across AI answer engines. The platform provides citation tracking, sentiment analysis, and share of voice metrics via REST API.

### Artifact A: The Prompt Bank

| Property | Details |
|----------|---------|
| **Owner** | Content Strategist (with AEO Strategist review) |
| **Format** | CSV or Excel |
| **Volume** | 400 prompts minimum (pilot scope) |
| **Due Date** | Week 2 (before build phase starts) |

**What it is**: A curated list of questions users ask AI answer engines, categorized by intent.

#### Required Columns

| Column | Description | Example |
|--------|-------------|---------|
| `prompt_id` | Unique identifier | `PRD-001` |
| `query_text` | The natural language prompt | "Best running shoes for flat feet" |
| `intent_category` | Primary user intent | `purchase`, `research`, `compare` |
| `sub_category` | Product/topic grouping | `footwear`, `accessories` |
| `priority` | Business importance (1-5) | `5` |

#### Example Prompts by Intent

| Intent | Example Prompt |
|--------|----------------|
| **Purchase** | "Best [product] under $500" |
| **Research** | "[Product category] trends 2025" |
| **Compare** | "[Brand A] vs [Brand B] quality" |
| **Trust** | "Is [brand] reliable?" |
| **How-to** | "How to choose [product] for [use case]" |

**Why needed**: Profound executes scans against these prompts across all configured answer engines. The prompts you track determine what visibility data you receive.

### Artifact B: Competitor List

**Owner**: Client Stakeholder + AEO Strategist | **Due**: Week 1

Provide 3-5 competitor domain names (e.g., `competitor-one.com`, `competitor-two.com`).

**Why needed**: Profound calculates Share of Voice by comparing your citation frequency against these competitors. Without this list, SOV metrics cannot be computed.

### Artifact C: API Access & Configuration

| Property | Details |
|----------|---------|
| **Owner** | Client IT + AEO Strategist |
| **Format** | API key and account confirmation |
| **Due Date** | Week 0 (before design phase starts) |

**What it is**: Credentials and account setup required to pull data from Profound.

#### Requirements

| Item | Description |
|------|-------------|
| **API Key** | Generated from Profound user profile; provides access to organization data |
| **Category Configuration** | At least one category created in Profound with prompts loaded |
| **Domain Configuration** | Client domain and competitor domains registered in Profound |

**Why needed**: Without API access, we cannot retrieve visibility data. The Profound account must be configured with prompts and competitors before scans produce useful data.

> **Note**: Profound's API is currently in beta. We will validate the integration during the design phase (Weeks 0-2) and adapt to any schema changes.

### Delivery Checklist

| Artifact | Owner | Due | Blocker? |
|----------|-------|-----|----------|
| API Key & Account Setup | Client IT | Week 0 | Yes (blocks design) |
| Profound Taxonomy Draft | Content Strategist | Week 1 | Yes (blocks prompt mapping) |
| Competitor List (3-5) | Client + AEO Strategist | Week 1 | Yes (blocks SOV design) |
| Prompt Bank (400+) | Content Strategist | Week 2 | Yes (blocks build phase) |

**Design phase requires API access and taxonomy draft. Build phase cannot begin until prompt bank is delivered and validated.**

---

## Slide 6: Next Steps

### Immediate Actions (Week 0)

| Action | Owner | Target Date | Status |
|--------|-------|-------------|--------|
| Finalize Profound API access credentials | Client IT | Day 1 | ☐ |
| Schedule PIM/Prodevix integration discovery call | Client + Lead Architect | Day 2 | ☐ |
| Begin Profound taxonomy analysis | Content Strategist | Day 1 | ☐ |
| Schedule weekly status reviews | Delivery Lead | Day 1 | ☐ |
| Provision AWS account access | Client IT | Week 2 | ☐ |
| Deliver Prompt Bank (400 prompts) | Content Strategist | Week 2 | ☐ |
| Confirm Competitor List | Client Stakeholder | Week 1 | ☐ |

### Decision Points Required

| Decision | Options | Recommendation | Needed By |
|----------|---------|----------------|-----------|
| PIM/Prodevix integration approach | Direct API / S3 file exchange / Hybrid | TBD (design phase) | Week 2 |
| Profound taxonomy structure | Topics → Subcategories mapping | TBD (design phase) | Week 2 |
| Data staleness tolerance | 1 day / 7 days / 14 days | 7 days | Week 3 |
| Human approval workflow | Required / Optional / None | Optional | Week 6 |
| Budget ceiling (Bedrock) | $1K / $5K / $10K monthly | $5K | Week 3 |
| Dashboard scope | Pilot / Post-pilot / Not planned | Post-pilot | Week 4 |

### Approval Request

- [ ] Approve architecture and proceed to Phase 0 (Plan/Analyze/Design)
- [ ] Request modifications (specify in discussion)
- [ ] Defer pending specific dependency resolution

---

## Slide 7: Appendix - Bottoms-Up Effort Estimates

### Estimation Methodology

Effort estimates derived bottoms-up from individual tasks, mapped to roles, then rolled up to determine duration based on dependencies and critical path analysis.

*Note: Testing is embedded within each technical role. As a POC, analysts and engineers perform validation of their own deliverables.*

### Phase 0: Plan/Analyze/Design (Weeks 0-2)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| Solution architecture design | 40 | Lead Architect | D0: Architecture Doc |
| PIM/Prodevix integration design | 24 | Lead Architect | D0: Integration Contract |
| AWS infrastructure design | 16 | Lead Architect | D0: Infrastructure Spec |
| Profound taxonomy analysis | 24 | Content Strategist | D0: Taxonomy Mapping |
| Topics-to-subcategory mapping | 16 | Content Strategist | D0: Prompt Structure |
| Project setup & governance | 8 | DL/PM | RAID log, status cadence |
| Stakeholder alignment & kickoff | 6 | DL/PM | Alignment confirmed |
| **Phase 0 Subtotal** | **134** | | |

*Note: Lead Architect is full-time (80 hrs) for weeks 0-1. Content Strategist joins week 1, full-time (40 hrs) for taxonomy work.*

### Phase 1: Mobilization (Weeks 2-3)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| Team onboarding & knowledge transfer | 8 | Lead Architect | Team aligned |
| Bedrock environment validation | 4 | AI Engineer | Model access confirmed |
| Prompt bank creation (start) | 28 | Content Strategist | D1: Prompt Bank (partial) |
| Profound API coordination | 8 | AEO/Data Strategist | API access validated |
| Project governance setup | 10 | DL/PM | RAID log, status cadence |
| Environment provisioning coordination | 14 | DL/PM | AWS access confirmed |
| **Phase 1 Subtotal** | **72** | | |

### Phase 2: Data Foundation (Weeks 3-5)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| S3 bucket setup + IAM policies | 12 | Lead Architect | D2: Data Pipeline |
| Ingestion Lambda (Profound JSON) | 28 | Lead Architect | D2: Data Pipeline |
| OpenSearch cluster configuration | 24 | Lead Architect | D3: Vector Store |
| Titan embeddings integration | 16 | Lead Architect | D3: Vector Store |
| Embeddings pipeline design review | 8 | AI Engineer | Vector search validated |
| Prompt bank completion & validation | 16 | Content Strategist | D1: Prompt Bank |
| Sample data validation | 12 | AEO/Data Strategist | Schema verified |
| Project management | 12 | DL/PM | 4 hrs/week × 3 weeks |
| Weekly stakeholder demos | 6 | DL/PM | Progress visibility |
| **Phase 2 Subtotal** | **134** | | |

### Phase 3: Agent Core (Weeks 4-7)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| Bedrock agent configuration | 20 | AI Engineer | D4: Bedrock Agent |
| Tool Lambdas (search, analyze, recommend) | 28 | AI Engineer | D4: Bedrock Agent |
| System prompt engineering | 20 | AI Engineer | D4: Bedrock Agent |
| Agent testing & accuracy tuning | 20 | AI Engineer | Grounded responses |
| Technical oversight & code review | 8 | Lead Architect | Architecture compliance |
| Brand voice QA framework | 6 | Content Strategist | QA criteria defined |
| Prompt testing & iteration | 6 | Content Strategist | Prompts validated |
| Measurement requirements definition | 8 | AEO/Data Strategist | Data schema for outputs |
| Project management | 24 | DL/PM | 6 hrs/week × 4 weeks |
| Weekly stakeholder demos | 6 | DL/PM | Progress visibility |
| **Phase 3 Subtotal** | **146** | | |

### Phase 4: Measurement (Weeks 6-8)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| Distillation Lambda (weekly deltas) | 16 | AEO/Data Strategist | D5: Measurement System |
| SOV calculation logic | 12 | AEO/Data Strategist | D5: Measurement System |
| QuickSight dashboard setup | 16 | AEO/Data Strategist | D5: Dashboards |
| Executive report templates | 8 | AEO/Data Strategist | Report format |
| Measurement validation & refinement | 4 | AEO/Data Strategist | Metrics accuracy |
| Infrastructure support for measurement | 8 | Lead Architect | Lambda deployment support |
| Technical documentation | 4 | Lead Architect | Architecture docs |
| Agent-dashboard integration review | 4 | AI Engineer | Query optimization |
| Project management | 18 | DL/PM | 6 hrs/week × 3 weeks |
| Weekly stakeholder demos | 6 | DL/PM | Progress visibility |
| **Phase 4 Subtotal** | **96** | | |

### Phase 5: Integration & Polish (Weeks 7-9)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| API Gateway setup + auth | 16 | Lead Architect | D6: API Layer |
| S3 outbound bucket (PIM integration) | 8 | Lead Architect | D6: PIM Integration |
| End-to-end flow validation | 20 | Lead Architect | D7: Deployment |
| Integration testing support | 4 | AI Engineer | Agent stability validation |
| Performance baseline testing | 4 | AI Engineer | Benchmarks established |
| Content integration validation | 4 | Content Strategist | Content pipeline QA |
| Content audit & recommendations | 4 | Content Strategist | Optimization roadmap |
| Dashboard UAT & measurement validation | 8 | AEO/Data Strategist | Metrics accuracy confirmed |
| Stakeholder demo preparation | 4 | AEO/Data Strategist | Executive materials |
| Project management | 14 | DL/PM | 5 hrs/week × 3 weeks |
| Change management & documentation | 6 | DL/PM | Runbooks, handoff docs |
| **Phase 5 Subtotal** | **92** | | |

### Phase 6: Pilot Execution (Weeks 9-12)

| Task | Hours | Role | Deliverable |
|------|------:|------|-------------|
| Issue resolution & bug fixes | 24 | Lead Architect | Stability |
| Handoff documentation | 8 | Lead Architect | Technical handoff |
| Agent performance tuning | 32 | AI Engineer | Optimizations |
| Pilot output analysis & prompt iteration | 42 | Content Strategist | Content recommendations |
| Pilot monitoring (4 weeks) | 24 | AEO/Data Strategist | System health |
| Weekly measurement readouts (3) | 36 | AEO/Data Strategist | D8: Weekly Reports |
| Final measurement readout | 20 | AEO/Data Strategist | D9: Final Readout |
| Project management | 48 | DL/PM | 12 hrs/week × 4 weeks |
| Executive readout preparation | 22 | DL/PM | Final presentation |
| **Phase 6 Subtotal** | **256** | | |

### Effort Summary by Role

| Role | P0 | P1 | P2 | P3 | P4 | P5 | P6 | **Total** |
|------|---:|---:|---:|---:|---:|---:|---:|----------:|
| Lead Architect | 80 | 8 | 80 | 8 | 12 | 44 | 32 | **264** |
| AI Engineer | – | 4 | 8 | 88 | 4 | 8 | 32 | **144** |
| AEO/Data Strategist | – | 8 | 12 | 8 | 56 | 12 | 80 | **176** |
| Content Strategist | 40 | 28 | 16 | 12 | – | 8 | 42 | **146** |
| DL/PM | 14 | 24 | 18 | 30 | 24 | 20 | 70 | **200** |
| **Phase Total** | **134** | **72** | **134** | **146** | **96** | **92** | **256** | **930** |

*Total phase hours: 134+72+134+146+96+92+256 = 930*

*Note: "–" indicates role not active in that phase.*

### Critical Path Analysis

```
Week:  0    1    2    3    4    5    6    7    8    9   10   11   12
       │    │    │    │    │    │    │    │    │    │    │    │    │
P0 ────████████████                                                 Plan/Analyze/Design
P1               ████████                                           Mobilization
P2                    ████████████████                              Data Foundation
P3                         ████████████████████████                 Agent Core
P4                                   ████████████████               Measurement
P5                                        ████████████████          Integration
P6                                                  ████████████████ Pilot
       │    │    │    │    │    │    │    │    │    │    │    │    │
       └────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
```

**Critical Path**: P0 → P1 → P2 → P3 → P5 → P6

- **P0 (Plan/Analyze/Design)**: Must complete before team mobilization and build begins
- **P1 (Mobilization)**: Team onboarding and artifact collection
- **P2 (Data Foundation)**: OpenSearch required before agent can query
- **P3 (Agent Core)**: Agent must work before integration testing
- **P4 (Measurement)**: Parallel with P3, not on critical path
- **P5 (Integration)**: Requires working agent, gates pilot
- **P6 (Pilot)**: Fixed 3-week duration (cannot compress—requires multiple Profound scan cycles)

### Duration Justification

The 12-week timeline is driven by:

1. **Plan/Analyze/Design Phase (Weeks 0-2)**: 2 weeks to finalize architecture, Profound taxonomy, and PIM/Prodevix integration design
2. **Build Phase (Weeks 2-9)**: Sequential dependencies on critical path require 7 weeks minimum
3. **Pilot Phase (Weeks 9-12)**: 3 weeks required for multiple Profound scan cycles to demonstrate measurable visibility lift

**Compression opportunities are limited**:

- Phases 3, 4, 5 have some parallelism (already exploited)
- Pilot phase cannot be compressed (measurement validity)
- Design phase ensures fewer rework cycles during build
- Additional parallelism would require more headcount

### Cost Calculation

| Role | Hours | Rate/Hr | Total |
|------|------:|--------:|------:|
| Lead Architect | 264 | $382 | $100,848 |
| AI Engineer | 144 | $382 | $55,008 |
| AEO/Data Strategist | 176 | $253 | $44,528 |
| Content Strategist | 146 | $347 | $50,662 |
| DL/PM | 200 | $421 | $84,200 |
| **Total** | **930** | | **$335,246** |

*Note: Profound licensing is a separate client responsibility.*

---

## Slide 8: Appendix - AWS Bill of Materials

### Purpose

This Bill of Materials (BOM) provides the AWS service specifications required for the pilot. Hand this document to your AWS Account Team for pricing and provisioning.

**Request**: "Please price this for the pilot scope: 400 prompts tracked weekly via Profound, with Bedrock agent queries and QuickSight reporting."

### Region Requirement

| Setting | Value | Rationale |
|---------|-------|-----------|
| **Primary Region** | US-East-1 (N. Virginia) | Bedrock model availability, lowest latency |

---

### 1. Generative AI (Amazon Bedrock)

The Bedrock agent provides grounded responses for content optimization recommendations.

| Property | Specification |
|----------|---------------|
| **Service** | Amazon Bedrock |
| **Model** | Anthropic Claude 3.5 Sonnet (or Claude 3 Sonnet) |
| **Pricing Mode** | On-Demand (pilot volume does not justify batch) |
| **Region** | US-East-1 |

**Token Estimation (Monthly)**

| Metric | Calculation | Tokens |
|--------|-------------|--------|
| Input Tokens | 400 prompts × 2,000 context tokens × 4 weeks | 3,200,000/month |
| Output Tokens | 400 prompts × 500 response tokens × 4 weeks | 800,000/month |

**Note**: Pilot volumes are low. On-demand pricing is appropriate. Batch inference (50% discount) requires minimum 100 records per job and is better suited for production scale.

**Additional Bedrock Components**

| Component | Purpose |
|-----------|---------|
| **Bedrock Agent** | Orchestrates tool calls and response generation |
| **Action Groups** | 3 tool Lambdas (search, analyze, recommend) |
| **Knowledge Base** | Optional—evaluate vs. direct OpenSearch query |

---

### 2. Vector Database (Amazon OpenSearch Service)

Stores Profound scan data as vector embeddings for semantic search.

| Property | Specification |
|----------|---------------|
| **Service** | Amazon OpenSearch Service |
| **Deployment Type** | Provisioned (Managed Domain) |
| **Instance Type** | `r6g.large.search` |
| **Node Count** | 2 (Multi-AZ for high availability) |
| **Storage Type** | EBS gp3 |
| **Storage Volume** | 50 GB per node |
| **Dedicated Master Nodes** | None (optional: 3× `t3.small.search` for production) |

---

### 3. Embeddings (Amazon Bedrock - Titan)

| Property | Specification |
|----------|---------------|
| **Service** | Amazon Bedrock |
| **Model** | Amazon Titan Text Embeddings V2 |
| **Dimension** | 1024 (default) |
| **Est. Tokens** | 800,000/month |

---

### 4. Compute (AWS Lambda)

| Property | Specification |
|----------|---------------|
| **Service** | AWS Lambda |
| **Architecture** | ARM64 (Graviton2) — 20% cost savings |
| **Runtime** | Python 3.12 |
| **Memory** | 512 MB |
| **Timeout** | 30-60 seconds |

**Lambda Functions Required**

| Function | Purpose | Est. Invocations/Month |
|----------|---------|------------------------|
| `ingestion-lambda` | Process Profound JSON exports | 4 (weekly) |
| `search-tool` | Query OpenSearch for relevant content | 2,000 |
| `analyze-tool` | Analyze visibility gaps | 1,000 |
| `recommend-tool` | Generate content recommendations | 1,000 |
| `distillation-lambda` | Calculate weekly deltas and SOV | 4 (weekly) |
| **Total** | | ~4,100/month |

---

### 5. File Storage (Amazon S3)

| Property | Specification |
|----------|---------------|
| **Service** | Amazon S3 |
| **Storage Class** | S3 Standard |
| **Buckets** | 3 (inbound, processed, outbound) |
| **Total Storage** | ~7 GB |
| **PUT/POST Requests** | 5,000/month |
| **GET Requests** | 20,000/month |

---

### 6. API Layer (Amazon API Gateway)

| Property | Specification |
|----------|---------------|
| **Service** | Amazon API Gateway |
| **API Type** | HTTP API (71% cheaper than REST API) |
| **Authentication** | IAM or API Key |
| **Est. Requests** | 10,000/month |

---

### 7. Dashboards (Amazon QuickSight)

| Property | Specification |
|----------|---------------|
| **Service** | Amazon QuickSight |
| **Edition** | Enterprise |
| **Authors** | 1 ($24/month) |
| **Readers** | 5 ($3/month each) |
| **Est. Monthly Cost** | ~$39/month |

---

### 8. Supporting Services

| Service | Purpose | Specification |
|---------|---------|---------------|
| **Amazon EventBridge** | Weekly job scheduling | 2 rules |
| **AWS Secrets Manager** | Credential storage | 3-5 secrets |
| **Amazon CloudWatch** | Logging and monitoring | 5 GB logs/month, 5 alarms |

---

### Summary: AWS Services for Pilot

| # | Service | Purpose | Key Specification |
|---|---------|---------|-------------------|
| 1 | Amazon Bedrock | Agent + Embeddings | Claude 3.5 Sonnet, Titan Embeddings |
| 2 | Amazon OpenSearch Service | Vector database | 2× r6g.large.search, 100 GB |
| 3 | AWS Lambda | Compute | 6 functions, ARM64, 512 MB |
| 4 | Amazon S3 | Data lake | 3 buckets, ~7 GB |
| 5 | Amazon API Gateway | API layer | HTTP API |
| 6 | Amazon QuickSight | Dashboards | 1 Author, 5 Readers |
| 7 | Amazon EventBridge | Scheduling | 2 rules |
| 8 | AWS Secrets Manager | Credentials | 3-5 secrets |
| 9 | Amazon CloudWatch | Monitoring | Logs + 5 alarms |

---

### IAM Roles Required

| Role | Purpose |
|------|---------|
| `aeo-lambda-execution` | Lambda function execution (S3, OpenSearch, Bedrock, CloudWatch) |
| `aeo-bedrock-agent` | Bedrock agent service role (Lambda invoke, S3, OpenSearch) |
| `aeo-eventbridge-scheduler` | EventBridge rule execution (Lambda invoke) |
| `aeo-quicksight-service` | QuickSight data access (S3) |

---

### Services NOT Required for Pilot

| Service | Reason Not Included |
|---------|---------------------|
| **AWS Fargate / App Runner** | No admin UI in pilot scope (QuickSight only) |
| **Batch Inference** | Pilot volume too low (min 100 records/batch) |
| **Dedicated Master Nodes** | Not needed for 2-node OpenSearch cluster |

---

### Next Steps for AWS Account Team

1. **Enable Bedrock Access**: Request model access for Claude 3.5 Sonnet and Titan Embeddings in US-East-1
2. **Provision OpenSearch Domain**: Create managed domain with specifications above
3. **Create S3 Buckets**: Three buckets with appropriate lifecycle policies
4. **Set Up IAM Roles**: Create roles per specification with least-privilege policies
5. **Provide Cost Estimate**: Generate pricing based on specifications above

**Contact**: Delivery Lead coordinates with Client IT for AWS provisioning.

---

**Document Version**: 3.4
**Last Updated**: December 2025
**Mode**: Executive Advisory
