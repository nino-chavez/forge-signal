# AEO Optimization Service: Delivery Plan v4

**Version**: 4.0
**Mode**: Executive Advisory
**Last Updated**: December 16, 2025
**Target Start Date**: January 5, 2025
**SOW Draft Target**: December 16, 2025

---

## Executive Summary

Signet has selected **Option C: Full Automation** with an amended staffing model. Signet will assume the AEO Strategist and Content Strategist roles internally, with Accenture retaining responsibility for technical implementation, LLM tuning, and delivery leadership.

### Key Changes from v3.5

| Change | Impact |
|--------|--------|
| Option C selected | Full automation pipeline with Bedrock Agent |
| AEO Strategist → Signet | Client provides prompt taxonomy, data analysis expertise |
| Content Strategist → Signet | Client provides content optimization expertise |
| LLM tuning retained by Accenture | +40 hours to AI Engineer for agent prompt engineering |
| Start date: January 5, 2025 | 12-week delivery through March 28, 2025 |

### Investment Summary

| Party | Hours | Investment |
|-------|------:|------------|
| **Accenture** | 648 | $255,336 |
| **Signet** (internal) | ~280 | Internal resource allocation |
| **Total Effort** | ~928 | |

**Accenture investment reduced by $79,910** from original Option C ($335,246) due to Signet taking on strategist roles.

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
| Measurement | Lambda + QuickSight | SOV deltas, custom dashboards |
| Integration | API Gateway | Optional PIM API integration |

### Ownership Model

| Component | Accenture | Signet |
|-----------|:---------:|:------:|
| AWS infrastructure design & build | ● | |
| Data pipeline implementation | ● | |
| Bedrock Agent development | ● | |
| LLM/Agent prompt tuning | ● | |
| Measurement system | ● | |
| Profound prompt taxonomy (400) | | ● |
| Content gap analysis | | ● |
| Optimization recommendations review | | ● |
| PIM updates | | ● |
| Profound licensing | | ● |

---

## Staffing Plan

### Accenture Team

| Role | Hours | Rate | Total | Weeks Active | Peak Hrs/Wk |
|------|------:|-----:|------:|:------------:|:-----------:|
| Lead Architect | 264 | $382 | $100,848 | 1-12 | 40 |
| AI Engineer | 184 | $382 | $70,288 | 3-12 | 28 |
| DL/PM | 200 | $421 | $84,200 | 1-12 | 18 |
| **Total** | **648** | | **$255,336** | | |

**Note**: AI Engineer hours increased by 40 (from 144) to absorb LLM tuning responsibilities previously shared with strategist roles.

### Signet Team (Internal)

| Role | Estimated Hours | Weeks Active | Responsibilities |
|------|---------------:|:------------:|------------------|
| AEO/Data Strategist | ~156 | 3-12 | Prompt taxonomy, Profound configuration, SOV analysis, data interpretation |
| Content Strategist | ~126 | 2-12 | Content gap identification, recommendation review, PIM coordination |
| **Total** | **~282** | | |

### Collaboration Model

```
Week 1-2:   Accenture-led architecture, Signet provides business context
Week 3-9:   Parallel workstreams - Accenture builds, Signet configures Profound
Week 10-12: Joint pilot execution, Signet reviews AI recommendations
```

---

## Delivery Timeline

**Start Date**: January 5, 2025
**End Date**: March 28, 2025
**Duration**: 12 weeks

### Phase Overview

```
Week:  1    2    3    4    5    6    7    8    9   10   11   12
       │    │    │    │    │    │    │    │    │    │    │    │
       Jan 5     Jan 19    Feb 2     Feb 16    Mar 2     Mar 16   Mar 28
       │    │    │    │    │    │    │    │    │    │    │    │
Design ████████                                                 Architecture
Build       ████████████████████████████████████                Pipeline + Agent
Profound         ████████████████████                           Signet configures
Pilot                                        ████████████████████ Real data (3 weeks)
       │    │    │    │    │    │    │    │    │    │    │    │
```

### Detailed Phase Breakdown

#### Phase 1: Foundation (Weeks 1-2)
**Jan 5 - Jan 17**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| Solution architecture finalization | Lead Architect | 40 |
| Profound API integration design | Lead Architect | 24 |
| AWS environment setup | AI Engineer | 16 |
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
| **LLM prompt tuning & optimization** | AI Engineer | 32 |
| Tool definitions (query, analyze, recommend) | Lead Architect | 32 |
| API Gateway setup | AI Engineer | 16 |
| Content strategy alignment | Signet Content Strategist | - |
| Project coordination | DL/PM | 40 |

#### Phase 4: Measurement & Integration (Weeks 8-10)
**Feb 24 - Mar 14**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| QuickSight dashboards | Lead Architect | 32 |
| SOV delta calculations | AI Engineer | 24 |
| End-to-end testing | Lead Architect | 40 |
| Integration validation | DL/PM | 24 |

#### Phase 5: Pilot Execution (Weeks 10-12)
**Mar 3 - Mar 28**

| Deliverable | Owner | Hours |
|-------------|-------|------:|
| Pilot monitoring & tuning | Lead Architect | 24 |
| Agent refinement | AI Engineer | 16 |
| Pilot readout preparation | DL/PM | 40 |
| Recommendation review | Signet Content Strategist | - |
| PIM updates | Signet | - |
| Knowledge transfer | All | 16 |

---

## Deliverables

### Accenture Deliverables

| Deliverable | Description | Delivery |
|-------------|-------------|----------|
| Solution Architecture Document | Detailed technical design, ADRs | Week 2 |
| Data Pipeline | Automated Profound → S3 → OpenSearch | Week 5 |
| Bedrock Agent | RAG-enabled recommendation engine | Week 9 |
| **Tuned Agent Prompts** | Optimized system prompts for recommendation quality | Week 9 |
| Measurement Dashboards | QuickSight visibility metrics | Week 10 |
| Pilot Readout | ROI analysis, visibility lift measurement | Week 12 |
| Knowledge Transfer | Technical documentation, runbooks | Week 12 |

### Signet Deliverables

| Deliverable | Description | Delivery |
|-------------|-------------|----------|
| Profound Configuration | 400 prompts, taxonomy, competitor list | Week 5 |
| Content Strategy Input | Optimization priorities, brand guidelines | Week 4 |
| PIM Access/Credentials | Integration requirements | Week 1 |
| Recommendation Reviews | Weekly review of AI-generated content | Weeks 10-12 |
| PIM Updates | Execute approved recommendations | Weeks 10-12 |

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
| Lead Architect | 264 | $382 | $100,848 |
| AI Engineer | 184 | $382 | $70,288 |
| DL/PM | 200 | $421 | $84,200 |
| **Total** | **648** | | **$255,336** |

### AWS Infrastructure (Estimated Monthly)

| Service | Est. Monthly Cost |
|---------|------------------:|
| OpenSearch | $800 |
| Bedrock (Claude + Titan) | $400 |
| Lambda | $100 |
| S3 | $50 |
| QuickSight | $100 |
| API Gateway | $50 |
| **Total** | **~$1,500/mo** |

### Comparison to Original Option C

| Category | Original (v3.5) | Amended (v4) | Savings |
|----------|----------------:|-------------:|--------:|
| Accenture Services | $335,246 | $255,336 | $79,910 |
| AWS Setup | ~$2,000 | ~$2,000 | $0 |
| **Total Investment** | **$337,246** | **$257,336** | **$79,910** |

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
| Coordination gaps (Accenture/Signet) | Medium | Medium | Weekly syncs, clear RACI |
| Knowledge transfer incomplete | Low | Medium | Documentation-first approach |

### Mitigation: Strategist Coordination

With AEO and Content Strategist roles moving to Signet, clear coordination protocols are critical:

| Touchpoint | Frequency | Participants |
|------------|-----------|--------------|
| Technical sync | 2x/week | Lead Architect + Signet Strategists |
| Agent tuning review | Weekly | AI Engineer + Signet Content Strategist |
| Prompt taxonomy review | Weekly (Phase 2-5) | AI Engineer + Signet AEO Strategist |
| Executive status | Weekly | DL/PM + Signet Leadership |

---

## Assumptions & Dependencies

### Assumptions

1. Signet provides AEO Strategist and Content Strategist resources by Week 2
2. Profound API access confirmed and stable
3. AWS account and permissions available Week 1
4. PIM integration scope limited to API specifications (no custom build)

### Dependencies

| Dependency | Owner | Required By |
|------------|-------|-------------|
| Profound API credentials | Signet | Week 1 |
| AWS account access | Signet | Week 1 |
| PIM API documentation | Signet | Week 3 |
| Signet strategist onboarding | Signet | Week 2 |
| Brand/content guidelines | Signet | Week 4 |
| **ESI Team data delivery process** | **Signet (ESI)** | **Week 3** |
| **Infoverity API schema/access** | **Signet (Infoverity)** | **Week 8** |

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
| Signet strategist identification | Signet | December 20, 2025 |
| Contract execution | Both | December 27, 2025 |
| AWS account provisioning | Signet | January 3, 2025 |
| Kickoff meeting | Both | January 5, 2025 |

---

## Appendix A: Role Responsibilities Detail

### Lead Architect (Accenture)

- Solution architecture design and documentation
- OpenSearch vector store design and implementation
- RAG retrieval chain architecture
- Tool definitions for Bedrock Agent
- QuickSight dashboard design
- Technical quality assurance
- Knowledge transfer leadership

### AI Engineer (Accenture)

- AWS infrastructure implementation (Lambda, S3, API Gateway)
- Bedrock Agent development and deployment
- Titan embeddings integration
- **LLM/Agent prompt engineering and tuning**
- **Recommendation quality optimization**
- Data pipeline development
- Performance optimization

### DL/PM (Accenture)

- Project governance and status reporting
- Risk and issue management
- Stakeholder coordination
- SOW and contract management
- Resource coordination
- Pilot readout preparation

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

**Document Version**: 4.0
**Prepared By**: Accenture Delivery Team
**Status**: Draft for SOW
