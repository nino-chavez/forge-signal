# AEO Optimization Service: Delivery Plan

**Version**: 4.1
**Mode**: Executive Advisory
**Last Updated**: December 16, 2025
**Target Start Date**: January 5, 2025

---

## Executive Summary

Signet has selected **Option C: Full Automation** with an amended staffing model. Signet will assume the AEO Strategist and Content Strategist roles internally, with Accenture retaining responsibility for technical implementation, LLM tuning, and delivery leadership.

### Key Decisions

| Decision | Detail |
|----------|--------|
| Option C selected | Full automation pipeline with Bedrock Agent |
| AEO Strategist → Signet | Client provides prompt taxonomy, data analysis expertise |
| Content Strategist → Signet | Client provides content optimization expertise |
| LLM tuning retained by Accenture | AI Engineer handles agent prompt engineering |
| Start date: January 5, 2025 | 12-week delivery through March 28, 2025 |

### Investment Summary

| Party | Hours | Investment |
|-------|------:|------------|
| **Accenture** | 608 | $237,716 |
| **Signet** (internal) | ~372 | Internal resource allocation |
| **Total Effort** | ~980 | |

---

## Solution Overview

### Architecture

A fully automated pipeline that ingests Profound data via API, stores it in a vector database, and uses a Bedrock Agent with RAG capabilities to generate context-aware recommendations.

```
Profound → ESI Team → AWS Environment → Bedrock Agent → Infoverity → PIM
           (ingest)   (process/RAG)    (recommend)      (execute)
```

**Integration Boundaries:**
- **Inbound**: ESI Team delivers Profound data to AWS S3
- **Outbound**: Recommendations exported via API to Infoverity for PIM updates

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Data Ingestion | Lambda + EventBridge | Pull from Profound API weekly |
| Data Lake | S3 | Raw and processed data storage |
| Vector Store | OpenSearch | Semantic search for RAG |
| Embeddings | Bedrock Titan | Convert text to vectors |
| AI Agent | Bedrock Agent (Claude) | Multi-tool recommendation engine |
| Measurement | Lambda | SOV delta calculations |
| Integration | API Gateway | PIM API integration |

---

## RACI Matrix

### Legend
- **R** = Responsible (does the work)
- **A** = Accountable (owns the outcome)
- **C** = Consulted (provides input)
- **I** = Informed (kept in loop)

### Full Stakeholder View

This RACI reflects the amended model where Signet assumes AEO and Content Strategist roles internally, with integration responsibilities distributed across Signet teams.

#### Accenture Responsibilities

| Activity | Accenture | Signet IT | ESI | Infoverity | Profound | ecom merch/SEO | Notes |
|----------|:---------:|:---------:|:---:|:----------:|:--------:|:--------------:|-------|
| **E2E Infrastructure Design** | C | R | | C | | | Signet IT owns overall design |
| **Infrastructure Procurement** | C | R/A | | | | | ARB, AI committee, JAD |
| **OpenSearch Setup** | R | A | | C | | | Embeddings and vector store |
| **S3 Data Buckets Setup** | R | A | | C | C | | Data ingestion pipeline |
| **API Router Development** | R | A | | C | C | | RESTful standards, auth |
| **Bedrock Agent Build** | R | A | | | | | RAG chain, tool definitions |
| **LLM Prompt Tuning** | R | | | | C | C | Agent persona, recommendations |

#### Signet Team Responsibilities

| Activity | Accenture | Signet IT | ESI | Infoverity | Profound | ecom merch/SEO | Notes |
|----------|:---------:|:---------:|:---:|:----------:|:--------:|:--------------:|-------|
| **Outbound API Schema Definition** | C | A | | R | | | Infoverity owns schema |
| **Profound Integration Design/Build** | C | A | R | | | | ESI owns Profound integration |
| **Connection to Signet Systems** | C | R/A | | C | C | | Trigger product events |
| **LLM Visibility Content Strategy** | C | | | C | C | R/A | Analytics-driven guidance |
| **Profound Analytics Dashboard** | C | I | | | R | A | Monitoring, KPI alignment |
| **Integration with PIM Workflow** | C | C | | R | | I | Via Prodevix |
| **Compliance & Human QA** | I | I | | | | R/A | Legal review required |

#### Infoverity PIM Activities (Signet Internal)

| Activity | Accenture | Signet IT | ESI | Infoverity | ecom merch/SEO | Notes |
|----------|:---------:|:---------:|:---:|:----------:|:--------------:|-------|
| Update P360 | I | C | | R/A | I | POC; production requires robust design |
| Add AEO Variant Status | I | C | | R/A | I | POC only |
| Update ActiveVOS Workflow | I | C | | R/A | I | POC only |
| Look for products in AEO status | I | C | | R/A | I | POC only |
| Call Prodevix with AEO flag | I | C | | R/A | I | POC only |
| Update Prodevix (AEO flag true) | I | C | | R/A | I | POC only |
| Call AEO Service | I | C | | R/A | I | POC only |
| Use results in description gen | I | C | | R/A | I | POC only |

#### Project Governance

| Activity | Lead Arch | AI Eng | DL/PM | Signet PM | ecom merch/SEO | Notes |
|----------|:---------:|:------:|:-----:|:---------:|:--------------:|-------|
| **Technical Coordination** | A/R | C | I | I | | Lead Arch owns |
| **Client Coordination** | C | I | C | A/R | | Signet PM owns |
| **Risk Management** | C | I | A/R | C | | |
| **Status Reporting** | C | I | R | A | | Shared |
| **Pilot Readout** | C | C | A/R | C | C | |
| **Post Go-Live Success Criteria** | C | | | | A | Accenture consulted |

### Ownership Summary

| Owner | Responsibilities |
|-------|------------------|
| **Accenture** | OpenSearch, S3, API Router, Bedrock Agent, LLM Tuning, Project Governance |
| **Signet IT** | Infrastructure procurement, E2E design accountability, system connections |
| **ESI** | Profound integration design and build |
| **Infoverity** | API schema definition, PIM workflow, P360 updates, Prodevix integration |
| **Profound** | Analytics dashboard, visibility data |
| **ecom merch/SEO** | Content strategy, compliance QA, success criteria |

---

## Staffing Plan

### Accenture Team

| Role | Hours | Rate | Total |
|------|------:|-----:|------:|
| Lead Architect | 284 | $382 | $108,488 |
| AI Engineer | 184 | $382 | $70,288 |
| DL/PM | 140 | $421 | $58,940 |
| **Total** | **608** | | **$237,716** |

### Signet Team (Internal)

| Role | Estimated Hours | Weeks Active | Responsibilities |
|------|---------------:|:------------:|------------------|
| AEO/Data Strategist | ~156 | 3-12 | Prompt taxonomy, Profound configuration, SOV analysis, data interpretation |
| Content Strategist | ~126 | 2-12 | Content gap identification, recommendation review, PIM coordination |
| Signet PM | ~90 | 1-12 | Coordinate strategists, joint governance, client-side escalation |
| **Total** | **~372** | | |

### Weekly Staffing Allocation

| Week | Dates | Lead Architect | AI Engineer | DL/PM | Weekly Total |
|-----:|-------|---------------:|------------:|------:|-------------:|
| 1 | Jan 5-10 | 32 | - | 14 | 46 |
| 2 | Jan 13-17 | 32 | - | 10 | 42 |
| 3 | Jan 20-24 | 24 | 16 | 10 | 50 |
| 4 | Jan 27-31 | 24 | 24 | 10 | 58 |
| 5 | Feb 3-7 | 24 | 24 | 10 | 58 |
| 6 | Feb 10-14 | 24 | 24 | 10 | 58 |
| 7 | Feb 17-21 | 24 | 24 | 10 | 58 |
| 8 | Feb 24-28 | 24 | 24 | 10 | 58 |
| 9 | Mar 3-7 | 20 | 24 | 10 | 54 |
| 10 | Mar 10-14 | 20 | 16 | 14 | 50 |
| 11 | Mar 17-21 | 18 | 8 | 16 | 42 |
| 12 | Mar 24-28 | 18 | - | 16 | 34 |
| **Total** | | **284** | **184** | **140** | **608** |

### Role Start/End and Peak Allocation

| Role | Start | End | Peak Weeks | Peak Hrs/Wk | Focus During Peak |
|------|-------|-----|------------|------------:|-------------------|
| Lead Architect | Week 1 | Week 12 | 1-2 | 32 | Architecture design, API integration |
| AI Engineer | Week 3 | Week 11 | 4-9 | 24 | Pipeline build, agent development, LLM tuning |
| DL/PM | Week 1 | Week 12 | 11-12 | 16 | Pilot oversight, readout delivery |

### Staffing Visualization

```
Week:     1    2    3    4    5    6    7    8    9   10   11   12
          |    |    |    |    |    |    |    |    |    |    |    |
Lead Arch ████████████████████████████████████████████████████████  284 hrs (full)
          32   32   24   24   24   24   24   24   20   20   18   18

AI Eng              ████████████████████████████████████████       184 hrs (Wk 3-11)
                    16   24   24   24   24   24   24   16    8

DL/PM     ████████████████████████████████████████████████████████  140 hrs (governance)
          14   10   10   10   10   10   10   10   10   14   16   16

Total     46   42   50   58   58   58   58   58   54   50   42   34  = 608 hrs
```

---

## Delivery Timeline

**Start Date**: January 5, 2025
**End Date**: March 28, 2025
**Duration**: 12 weeks

### Phase Overview

```
Week:  1    2    3    4    5    6    7    8    9   10   11   12
       |    |    |    |    |    |    |    |    |    |    |    |
       Jan 5     Jan 19    Feb 2     Feb 16    Mar 2     Mar 16   Mar 28
       |    |    |    |    |    |    |    |    |    |    |    |
Design ========                                                 Lead Arch (64 hrs)
Build       ====================================                AI Eng + Arch (344 hrs)
Coord  ==================================================       Lead Arch ongoing
Govern ====  ====  ====  ====  ====  ====  ====  ====  ====     DL/PM checkpoints
Pilot                                        ==================== Joint (3 weeks)
       |    |    |    |    |    |    |    |    |    |    |    |
```

### Detailed Phase Breakdown

#### Phase 1: Foundation (Weeks 1-2)
**Jan 5 - Jan 17**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| Solution architecture finalization | Lead Architect | 40 |
| Inbound data pipeline design (S3 → OpenSearch) | Lead Architect | 24 |
| Project kickoff & governance | DL/PM | 24 |
| Business context workshops | Signet | - |

#### Phase 2: Data Pipeline (Weeks 3-5)
**Jan 20 - Feb 7**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| Lambda ingestion functions | AI Engineer | 40 |
| S3 data lake structure | AI Engineer | 16 |
| OpenSearch vector store setup | Lead Architect | 32 |
| Titan embeddings integration | AI Engineer | 24 |
| Profound prompt taxonomy (400) | Signet AEO Strategist | - |
| Project coordination | DL/PM | 30 |

#### Phase 3: AI Agent Development (Weeks 6-9)
**Feb 10 - Mar 7**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| Bedrock Agent implementation | AI Engineer | 48 |
| RAG retrieval chain | Lead Architect | 40 |
| LLM prompt tuning & optimization | AI Engineer | 32 |
| Tool definitions (query, analyze, recommend) | Lead Architect | 32 |
| API Gateway setup | AI Engineer | 16 |
| Content strategy alignment | Signet Content Strategist | - |
| Project coordination | DL/PM | 40 |

#### Phase 4: Integration & Testing (Weeks 8-10)
**Feb 24 - Mar 14**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| SOV delta calculations | AI Engineer | 24 |
| End-to-end testing | Lead Architect | 40 |
| Integration validation | DL/PM | 12 |

#### Phase 5: Pilot Execution (Weeks 10-12)
**Mar 3 - Mar 28**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| Pilot monitoring & tuning | Lead Architect | 32 |
| Agent refinement | AI Engineer | 8 |
| Pilot support & coordination | DL/PM | 40 |
| Recommendation review | Signet Content Strategist | - |
| PIM updates | Signet | - |

---

## Deliverables

### Accenture Deliverables

| Deliverable | Description | Delivery |
|-------------|-------------|----------|
| Solution Architecture | High-level design, key decisions | Week 2 |
| Data Pipeline | Automated Profound → S3 → OpenSearch | Week 5 |
| Bedrock Agent | RAG-enabled recommendation engine | Week 9 |
| Tuned Agent Prompts | Optimized system prompts for recommendation quality | Week 9 |

### Signet Deliverables

| Deliverable | Description | Delivery |
|-------------|-------------|----------|
| Profound Configuration | 400 prompts, taxonomy, competitor list | Week 5 |
| Content Strategy Input | Optimization priorities, brand guidelines | Week 4 |
| PIM Access/Credentials | Integration requirements | Week 1 |
| Recommendation Reviews | Weekly review of AI-generated content | Weeks 10-12 |
| PIM Updates | Execute approved recommendations | Weeks 10-12 |

---

## Coordination Model

| Touchpoint | Frequency | Owner | Participants |
|------------|-----------|-------|--------------|
| Technical standup | Daily (15 min) | Lead Architect | AI Engineer |
| Cross-team sync | 2x/week | Lead Architect | Signet Strategists |
| Governance checkpoint | Weekly | DL/PM | All + Signet PM |
| Executive status | Bi-weekly | Signet PM + DL/PM | Leadership |
| Risk review | Weekly | DL/PM | Lead Architect |

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Visibility Gap Closure | 60% reduction in "I don't know" responses | 90-day post-pilot |
| Content Optimizations | 100+ optimizations per month | Ongoing |
| System Availability | 99.5% uptime | Continuous |
| Query Performance | <2 second response (P95) | Continuous |
| Recommendation Acceptance | >70% of AI recommendations approved | Pilot period |

---

## Cost Summary

### Accenture Professional Services

| Role | Hours | Rate | Total |
|------|------:|-----:|------:|
| Lead Architect | 284 | $382 | $108,488 |
| AI Engineer | 184 | $382 | $70,288 |
| DL/PM | 140 | $421 | $58,940 |
| **Total** | **608** | | **$237,716** |

### AWS Infrastructure (Estimated Monthly)

| Service | Est. Monthly Cost |
|---------|------------------:|
| OpenSearch | $800 |
| Bedrock (Claude + Titan) | $400 |
| Lambda | $100 |
| S3 | $50 |
| API Gateway | $50 |
| **Total** | **~$1,400/mo** |

---

## Risk Management

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|:----------:|:------:|------------|
| Profound API instability | Medium | High | Design phase validation, fallback to exports |
| Bedrock performance issues | Low | Medium | Load testing in Phase 3 |
| OpenSearch scaling | Low | Medium | Right-size during pilot |

### Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|------|:----------:|:------:|------------|
| Signet strategist availability | Medium | High | Early identification, backup resources |
| Signet PM not assigned | Medium | High | Make explicit in SOW as dependency |
| Coordination gaps | Medium | Medium | Clear RACI, defined touchpoints |
| Lead Architect overloaded | Medium | Medium | Monitor velocity, escalate early |
| Knowledge transfer incomplete | Low | Medium | Documentation-first approach |

---

## Assumptions & Dependencies

### Assumptions

1. Signet provides AEO Strategist and Content Strategist resources by Week 2
2. Signet provides a PM or Project Lead (~0.5 FTE) to coordinate their resources by Week 1
3. Profound API access confirmed and stable
4. AWS account and permissions available Week 1
5. PIM integration scope limited to API specifications (no custom build)

### Dependencies

| Dependency | Owner | Required By |
|------------|-------|-------------|
| Profound API credentials | Signet | Week 1 |
| AWS account access | Signet | Week 1 |
| Signet PM assignment | Signet | Week 1 |
| PIM API documentation | Signet | Week 3 |
| Signet strategist onboarding | Signet | Week 2 |
| Brand/content guidelines | Signet | Week 4 |
| ESI Team data delivery process | Signet (ESI) | Week 3 |
| Infoverity API schema/access (for integration build) | Signet (Infoverity) | Week 6 |

### External Team Dependencies

| Team | Responsibility | Integration Point |
|------|----------------|-------------------|
| **ESI Team** | Deliver Profound data to AWS S3 | Inbound data pipeline |
| **Infoverity** | Consume recommendation output for PIM updates | Outbound API integration |

> **Note**: ESI and Infoverity are Signet internal teams. Accenture will design integration specifications; Signet teams execute their respective integrations.

---

## Next Steps

| Action | Owner | Due Date |
|--------|-------|----------|
| SOW draft completion | Accenture DL | December 16, 2025 |
| Confirm Signet PM availability | Signet | December 18, 2025 |
| Signet strategist identification | Signet | December 20, 2025 |
| Contract execution | Both | December 27, 2025 |
| AWS account provisioning | Signet | January 3, 2025 |
| Kickoff meeting | Both | January 5, 2025 |

---

## Appendix A: Role Responsibilities Detail

### Lead Architect (Accenture)

- High-level solution architecture and key decisions
- OpenSearch vector store design and implementation
- RAG retrieval chain architecture
- Tool definitions for Bedrock Agent
- Technical coordination (standups, cross-team sync)
- End-to-end testing and pilot monitoring

### AI Engineer (Accenture)

- AWS infrastructure implementation (Lambda, S3, API Gateway)
- Bedrock Agent development and deployment
- Titan embeddings integration
- LLM/Agent prompt engineering and tuning
- Data pipeline development
- Agent refinement during pilot

### DL/PM (Accenture)

- Project governance and status reporting
- Risk and issue management
- Executive stakeholder coordination
- SOW and contract management
- Resource coordination
- Pilot support and coordination

### Signet PM (Signet)

- Coordinate AEO and Content Strategist resources
- Client-side status reporting
- Interface with Accenture DL/PM on governance
- Escalate Signet-side risks and issues

### AEO/Data Strategist (Signet)

- Profound prompt taxonomy design (400 prompts)
- Competitor identification and tracking
- SOV analysis and interpretation
- Data quality validation
- Business context for AI recommendations

### Content Strategist (Signet)

- Content gap prioritization
- Brand voice and guidelines
- Recommendation review and approval
- PIM update coordination
- Optimization effectiveness assessment

---

## Appendix B: LLM Tuning Scope

With strategist roles moving to Signet, the following LLM tuning responsibilities remain with Accenture (AI Engineer):

| Tuning Activity | Hours | Description |
|-----------------|------:|-------------|
| System prompt design | 12 | Core agent persona and behavior definition |
| Recommendation prompt templates | 12 | Templates for content optimization suggestions |
| RAG retrieval tuning | 8 | Optimize context retrieval for relevance |
| Output format standardization | 4 | Consistent recommendation structure |
| Quality evaluation loops | 4 | Iterative improvement based on strategist feedback |
| **Total** | **40** | |

Signet strategists will provide:
- Domain expertise for prompt refinement
- Feedback on recommendation quality
- Acceptance criteria for AI outputs

---

## Appendix C: Accenture Role Profiles (Staffing Guide)

### Lead Architect

**Level**: Senior Manager
**Hours**: 284 | **Rate**: $382/hr | **Total**: $108,488
**Duration**: Weeks 1-12 (full engagement)

#### Required Skillset

| Category | Requirements |
|----------|--------------|
| **AWS Expertise** | OpenSearch (vector search, k-NN), S3, Lambda, API Gateway, IAM |
| **AI/ML** | RAG architecture, embeddings (Titan), Bedrock Agent configuration |
| **Architecture** | Solution design, ADR authorship, C4 diagrams, API design (OpenAPI) |
| **Integration** | REST API patterns, event-driven architecture, data pipeline design |
| **Leadership** | Technical coordination, cross-team facilitation, client communication |

#### Key Responsibilities

- Design and document end-to-end solution architecture
- Configure OpenSearch vector store with Titan embeddings
- Architect RAG retrieval chain for Bedrock Agent
- Define tool specifications (query, analyze, recommend)
- Lead technical standups and cross-team syncs
- Own technical quality assurance and code review
- Drive knowledge transfer and documentation

#### Ideal Candidate Profile

- 8+ years enterprise architecture experience
- 3+ years AWS (Solutions Architect certification preferred)
- Prior RAG/LLM implementation experience
- Retail or e-commerce domain experience a plus
- Strong client-facing communication skills

---

### AI Engineer

**Level**: Manager
**Hours**: 184 | **Rate**: $382/hr | **Total**: $70,288
**Duration**: Weeks 3-11

#### Required Skillset

| Category | Requirements |
|----------|--------------|
| **AWS Services** | Lambda (Python/Node), S3, EventBridge, API Gateway, CloudWatch |
| **AI/ML** | Bedrock Agent development, Claude prompt engineering, Titan embeddings |
| **Data Engineering** | ETL pipelines, JSON/Parquet processing, data validation |
| **Development** | Python or TypeScript, Infrastructure as Code (CDK/Terraform) |
| **LLM Tuning** | System prompt design, few-shot examples, output formatting |

#### Key Responsibilities

- Implement Lambda functions for data ingestion pipeline
- Configure S3 data lake structure (raw, processed, embeddings)
- Develop and deploy Bedrock Agent with RAG capabilities
- Engineer and tune LLM prompts for recommendation quality
- Integrate Titan embeddings into OpenSearch
- Set up API Gateway for agent invocation
- Build SOV delta calculation logic

#### Ideal Candidate Profile

- 5+ years software engineering experience
- 2+ years AWS serverless development
- Hands-on Bedrock Agent or similar LLM framework experience
- Prompt engineering portfolio demonstrating quality tuning
- Comfortable with ambiguity; can iterate based on feedback

---

### Delivery Lead / PM

**Level**: Senior Manager
**Hours**: 140 | **Rate**: $421/hr | **Total**: $58,940
**Duration**: Weeks 1-12 (full engagement)

#### Required Skillset

| Category | Requirements |
|----------|--------------|
| **Project Management** | Agile delivery, risk management, status reporting, SOW management |
| **Governance** | RACI ownership, escalation protocols, change control |
| **Stakeholder Management** | Executive communication, multi-vendor coordination |
| **Domain Knowledge** | AI/ML project delivery, retail/e-commerce experience preferred |
| **Tools** | Jira, Confluence, PowerPoint, Excel |

#### Key Responsibilities

- Own project governance framework and risk register
- Facilitate weekly governance checkpoints
- Manage executive status reporting (shared with Signet PM)
- Coordinate SOW, change requests, and contract matters
- Prepare and deliver pilot readout presentation
- Ensure resource coordination and timeline adherence
- Escalate blockers and manage dependencies

#### Ideal Candidate Profile

- 7+ years delivery/project management experience
- Experience with AI/ML or data platform implementations
- Strong executive presence and communication skills
- Proven multi-stakeholder coordination ability
- Retail or e-commerce client experience preferred

---

### Role Allocation Summary

| Role | % of Hours | Peak Period | Critical Deliverables |
|------|-----------|-------------|----------------------|
| Lead Architect | 47% | Weeks 1-2 | Architecture, OpenSearch, RAG chain |
| AI Engineer | 30% | Weeks 6-9 | Bedrock Agent, LLM tuning, pipeline |
| DL/PM | 23% | Weeks 11-12 | Governance, readout, KT |

### Staffing Timeline

```
Role          Week: 1  2  3  4  5  6  7  8  9 10 11 12
Lead Architect      ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██  Full engagement
AI Engineer               ██ ██ ██ ██ ██ ██ ██ ██ ██     Weeks 3-11
DL/PM               ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██  Full engagement
```

### Staffing Notes

1. **Lead Architect** should be identified first - they drive architecture decisions in Weeks 1-2
2. **AI Engineer** can onboard Week 3 after architecture is finalized
3. **DL/PM** hours are lean (12 hrs/wk avg) - requires experienced resource who can work efficiently
4. All roles should have retail/e-commerce context or quick ramp capability
5. Bedrock Agent experience is highly desirable but not mandatory if candidate has strong LLM/RAG background

---

**Document Version**: 4.1
**Prepared By**: Accenture Delivery Team
**Status**: Final
