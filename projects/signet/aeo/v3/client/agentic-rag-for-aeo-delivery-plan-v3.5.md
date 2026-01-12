# AEO Optimization Service: Solution Options & Delivery Plan

**Version**: 3.5
**Mode**: Executive Advisory
**Last Updated**: December 2025

---

## Slide 1: Executive Summary

### Three Paths to AEO Optimization

This document presents three distinct approaches to improving brand visibility in AI answer engines, each with different levels of automation, cost, and operational complexity.

| Approach | Description | Investment | Timeline | Best For |
|----------|-------------|-----------|----------|----------|
| **A: Services-Led** | Human-driven analysis using Profound reporting | $175K | 10 weeks | Proof of concept, budget-constrained |
| **B: Hybrid** | Profound reporting + AI-assisted recommendations | $255K | 11 weeks | Balanced automation, scalable foundation |
| **C: Full Automation** | End-to-end automated pipeline with Bedrock agent | $335K | 12 weeks | Scale operations, minimize ongoing labor |

### Recommendation

**Start with Option A or B** to validate the AEO optimization approach with real data before committing to full automation. Option C infrastructure can be built incrementally if pilot results justify the investment.

---

## Slide 2: Approach Comparison

### Architecture Overview

#### Option A: Services-Led (Profound + Human Analysis)

```
Profound Platform → Weekly Reports → Content Strategist → Recommendations Doc → Manual PIM Update
```

**Profound owns**: Data collection, SOV tracking, citation analysis, trend reporting, dashboards
**Accenture owns**: Report interpretation, content gap analysis, optimization recommendations, client coordination

#### Option B: Hybrid (Profound + AI-Assisted Recommendations)

```
Profound Platform → Weekly Reports → Bedrock Claude → Draft Recommendations → Human Review → PIM Update
```

**Profound owns**: Data collection, SOV tracking, citation analysis, trend reporting, dashboards
**Accenture owns**: AI prompt engineering, recommendation generation, quality review, client coordination

#### Option C: Full Automation (Custom Data Pipeline + Bedrock Agent)

```
Profound API → S3 → Lambda → OpenSearch → Bedrock Agent → Auto-Recommendations → Human Approval → PIM API
```

**Profound owns**: Raw data via API
**Accenture owns**: Entire data pipeline, vector storage, AI agent, measurement system, PIM integration

### Component Comparison

| Component | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Data ingestion | Profound | Profound | Custom Lambda |
| Data storage | Profound | Profound | S3 + OpenSearch |
| SOV calculation | Profound | Profound | Custom Lambda |
| Trend analysis | Profound | Profound | Custom Lambda |
| Dashboards | Profound | Profound | QuickSight |
| Recommendation engine | Human | Bedrock (simple) | Bedrock Agent (RAG) |
| PIM integration | Manual | Manual | API (optional) |
| Ongoing AWS cost | ~$0/mo | ~$200/mo | ~$1,500/mo |

---

## Slide 3: Option A - Services-Led

### Overview

A human-centric approach that leverages Profound's full platform capabilities for data and reporting, with Accenture providing strategic analysis and content recommendations.

### How It Works

1. **Week 1-2**: Configure Profound with 400 prompts, competitor list, taxonomy
2. **Week 3-10**: Weekly cycle:
   - Profound runs automated scans across AI engines
   - Content Strategist reviews Profound dashboards and reports
   - AEO Strategist identifies visibility gaps and trends
   - Team produces written recommendations document
   - Client manually updates PIM based on recommendations

### Deliverables

| Deliverable | Description | Frequency |
|-------------|-------------|-----------|
| Profound Configuration | 400 prompts, taxonomy, competitors | Once |
| Weekly Analysis Report | Gap analysis, trend identification | Weekly |
| Content Recommendations | Prioritized optimization actions | Weekly |
| Pilot Readout | ROI analysis, visibility lift measurement | End of pilot |

### Pros & Cons

| Pros | Cons |
|------|------|
| Lowest cost and risk | Manual effort doesn't scale |
| Fastest to deploy | Human bottleneck on analysis |
| Leverages Profound's mature platform | No real-time recommendations |
| No AWS infrastructure to maintain | Requires ongoing Content Strategist hours |
| Validates approach before automation investment | Limited to ~400 prompts practically |

### Effort & Cost

| Role | Hours | Rate | Total |
|------|------:|-----:|------:|
| Lead Architect | 40 | $382 | $15,280 |
| AEO/Data Strategist | 160 | $253 | $40,480 |
| Content Strategist | 200 | $347 | $69,400 |
| DL/PM | 140 | $421 | $58,940 |
| **Total** | **540** | | **$184,100** |

**Ongoing cost**: Profound licensing only (client responsibility)

---

## Slide 4: Option B - Hybrid

### Overview

Combines Profound's reporting capabilities with AI-assisted content recommendation generation, reducing manual analysis effort while maintaining human oversight.

### How It Works

1. **Week 1-3**: Configure Profound, develop AI prompts for recommendation generation
2. **Week 4-11**: Weekly cycle:
   - Profound runs automated scans
   - Export Profound data (CSV/JSON)
   - Bedrock Claude generates draft recommendations from data
   - Content Strategist reviews and refines AI output
   - Client updates PIM based on approved recommendations

### Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| Data & Reporting | Profound Platform | SOV, citations, trends, dashboards |
| AI Processing | Amazon Bedrock (Claude) | Generate recommendation drafts |
| Storage | S3 (simple) | Store exports and outputs |
| Compute | Lambda (minimal) | Trigger Bedrock processing |

### Deliverables

| Deliverable | Description | Frequency |
|-------------|-------------|-----------|
| Profound Configuration | 400 prompts, taxonomy, competitors | Once |
| AI Prompt Templates | Tuned prompts for recommendation generation | Once |
| AI-Generated Recommendations | Draft recommendations from Profound data | Weekly |
| Reviewed Recommendations | Human-validated optimization actions | Weekly |
| Pilot Readout | ROI analysis, visibility lift measurement | End of pilot |

### Pros & Cons

| Pros | Cons |
|------|------|
| Reduces manual analysis time by ~50% | Still requires human review |
| AI handles pattern recognition at scale | Simple AI (no RAG/context) |
| Foundation for future automation | Two systems to coordinate (Profound + AWS) |
| Lower AWS cost than full automation | Export/import workflow vs. real-time |
| Validates AI approach with lower risk | |

### Effort & Cost

| Role | Hours | Rate | Total |
|------|------:|-----:|------:|
| Lead Architect | 120 | $382 | $45,840 |
| AI Engineer | 80 | $382 | $30,560 |
| AEO/Data Strategist | 160 | $253 | $40,480 |
| Content Strategist | 160 | $347 | $55,520 |
| DL/PM | 160 | $421 | $67,360 |
| **Total** | **680** | | **$239,760** |

**Ongoing AWS cost**: ~$200/month (Bedrock tokens + minimal S3/Lambda)

---

## Slide 5: Option C - Full Automation

### Overview

A fully automated pipeline that ingests Profound data via API, stores it in a vector database, and uses a Bedrock Agent with RAG capabilities to generate context-aware recommendations.

### How It Works

1. **Week 1-2**: Architecture design, Profound API integration design
2. **Week 3-9**: Build data pipeline, vector store, Bedrock agent, measurement system
3. **Week 10-12**: Pilot execution with real data, measure results

### Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| Data Ingestion | Lambda + EventBridge | Pull from Profound API weekly |
| Data Lake | S3 | Raw and processed data storage |
| Vector Store | OpenSearch | Semantic search for RAG |
| Embeddings | Bedrock Titan | Convert text to vectors |
| AI Agent | Bedrock Agent (Claude) | Multi-tool recommendation engine |
| Measurement | Lambda + QuickSight | SOV deltas, custom dashboards |
| Integration | API Gateway | Optional PIM API integration |

### Deliverables

| Deliverable | Description | Frequency |
|-------------|-------------|-----------|
| Profound Configuration | 400 prompts, taxonomy, competitors | Once |
| Data Pipeline | Automated ingestion from Profound API | Automated |
| Vector Database | Searchable content repository | Automated |
| Bedrock Agent | RAG-enabled recommendation engine | Automated |
| Custom Dashboards | Visibility metrics beyond Profound | On-demand |
| Pilot Readout | ROI analysis, visibility lift measurement | End of pilot |

### Pros & Cons

| Pros | Cons |
|------|------|
| Scales to thousands of prompts | Highest upfront investment |
| Real-time, context-aware recommendations | 12-week build timeline |
| Minimal ongoing human effort | AWS infrastructure to maintain |
| Custom measurement beyond Profound | More technical risk |
| Foundation for production deployment | Requires Profound API stability |

### Effort & Cost

| Role | Hours | Rate | Total |
|------|------:|-----:|------:|
| Lead Architect | 264 | $382 | $100,848 |
| AI Engineer | 144 | $382 | $55,008 |
| AEO/Data Strategist | 176 | $253 | $44,528 |
| Content Strategist | 146 | $347 | $50,662 |
| DL/PM | 200 | $421 | $84,200 |
| **Total** | **930** | | **$335,246** |

**Ongoing AWS cost**: ~$1,500/month (OpenSearch, Bedrock, Lambda, S3, QuickSight)

---

## Slide 6: Cost Comparison

### One-Time Investment

| Category | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Professional Services | $184,100 | $239,760 | $335,246 |
| AWS Setup | $0 | ~$500 | ~$2,000 |
| **Total Investment** | **$184,100** | **$240,260** | **$337,246** |

### Ongoing Monthly Costs

| Category | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Profound Licensing | Client | Client | Client |
| AWS Infrastructure | $0 | ~$200 | ~$1,500 |
| Ongoing Services (optional) | ~$15K/mo | ~$10K/mo | ~$5K/mo |

*Ongoing services = continued Content Strategist/AEO support post-pilot*

### Total Cost of Ownership (12-Month View)

| Scenario | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Pilot only | $184K | $240K | $337K |
| Pilot + 6 months support | $274K | $300K | $367K |
| Pilot + 12 months support | $364K | $360K | $397K |

**Insight**: Option C has higher upfront cost but lowest ongoing operational cost. Break-even vs. Option A occurs around month 18-24 depending on scale.

---

## Slide 7: Timeline Comparison

### Option A: Services-Led (10 Weeks)

```
Week:  1    2    3    4    5    6    7    8    9   10
       │    │    │    │    │    │    │    │    │    │
Setup  ████████                                        Profound config, taxonomy
Pilot            ████████████████████████████████████  Weekly analysis cycles (8 weeks)
       │    │    │    │    │    │    │    │    │    │
```

### Option B: Hybrid (11 Weeks)

```
Week:  1    2    3    4    5    6    7    8    9   10   11
       │    │    │    │    │    │    │    │    │    │    │
Setup  ████████████                                        Profound + AI prompts
Build            ████████                                  Lambda + Bedrock setup
Pilot                 ████████████████████████████████████  AI-assisted cycles (8 weeks)
       │    │    │    │    │    │    │    │    │    │    │
```

### Option C: Full Automation (12 Weeks)

```
Week:  1    2    3    4    5    6    7    8    9   10   11   12
       │    │    │    │    │    │    │    │    │    │    │    │
Design ████████                                                 Architecture
Build       ████████████████████████████████████                Pipeline + Agent
Pilot                                        ████████████████████ Real data (3 weeks)
       │    │    │    │    │    │    │    │    │    │    │    │
```

---

## Slide 8: Decision Framework

### Choose Option A (Services-Led) If:

- Budget is constrained below $200K
- You want to validate the AEO approach before technical investment
- Your prompt volume will stay under 500
- You have internal resources to act on recommendations
- Speed to pilot results is the priority

### Choose Option B (Hybrid) If:

- You want AI assistance but aren't ready for full automation
- You need to reduce manual analysis effort
- You're evaluating whether to scale to Option C later
- Budget allows $240K investment
- You want a foundation that can evolve

### Choose Option C (Full Automation) If:

- You plan to scale beyond 1,000 prompts
- You want to minimize ongoing operational effort
- You need custom measurement beyond Profound's dashboards
- Budget allows $335K+ investment
- You're committed to AEO as a long-term capability

### Migration Path

```
Option A → Option B → Option C
   │           │           │
   │           │           └── Add RAG, vector store, agent tools
   │           └── Add Bedrock processing, S3 storage
   └── Start here to validate approach
```

Each option is designed to build on the previous, protecting your investment if you choose to upgrade.

---

## Slide 9: Profound Platform Capabilities

### What Profound Provides

| Capability | Description | Used In |
|------------|-------------|---------|
| Prompt Management | Configure and organize tracking prompts | All options |
| Multi-Engine Scanning | Track visibility across ChatGPT, Perplexity, Claude, etc. | All options |
| Citation Tracking | Monitor when/where your brand is cited | All options |
| Share of Voice | Compare citation frequency vs. competitors | All options |
| Sentiment Analysis | Understand how brands are portrayed | All options |
| Trend Reporting | Week-over-week visibility changes | All options |
| Dashboards | Visual reporting interface | Options A & B |
| API Access | Programmatic data retrieval | Option C |
| Data Export | CSV/JSON exports for external analysis | Option B |

### Profound Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| API in beta | Schema may change | Design phase validation |
| No content recommendations | Doesn't suggest what to write | Our service/AI adds this |
| No PIM integration | Can't push updates to PIM | Manual or custom build |
| Fixed reporting views | May not match all KPIs | Option C adds QuickSight |

> **Note**: Profound licensing is a separate client responsibility across all options.

---

## Slide 10: Staffing by Option

### Option A: Services-Led

| Role | Weeks Active | Peak Hours/Week | Total Hours |
|------|-------------|-----------------|-------------|
| Lead Architect | 1-2 | 20 | 40 |
| AEO/Data Strategist | 1-10 | 20 | 160 |
| Content Strategist | 1-10 | 24 | 200 |
| DL/PM | 1-10 | 14 | 140 |
| **Total** | | | **540** |

### Option B: Hybrid

| Role | Weeks Active | Peak Hours/Week | Total Hours |
|------|-------------|-----------------|-------------|
| Lead Architect | 1-4 | 32 | 120 |
| AI Engineer | 2-5 | 24 | 80 |
| AEO/Data Strategist | 1-11 | 18 | 160 |
| Content Strategist | 1-11 | 18 | 160 |
| DL/PM | 1-11 | 16 | 160 |
| **Total** | | | **680** |

### Option C: Full Automation

| Role | Weeks Active | Peak Hours/Week | Total Hours |
|------|-------------|-----------------|-------------|
| Lead Architect | 1-12 | 40 | 264 |
| AI Engineer | 3-12 | 28 | 144 |
| AEO/Data Strategist | 3-12 | 20 | 176 |
| Content Strategist | 2-12 | 16 | 146 |
| DL/PM | 1-12 | 18 | 200 |
| **Total** | | | **930** |

---

## Slide 11: Risk Comparison

### Technical Risk

| Risk | Option A | Option B | Option C |
|------|:--------:|:--------:|:--------:|
| Profound API instability | Low | Medium | High |
| AWS service issues | None | Low | Medium |
| Integration complexity | Low | Low | High |
| Data pipeline failures | None | Low | Medium |

### Operational Risk

| Risk | Option A | Option B | Option C |
|------|:--------:|:--------:|:--------:|
| Key person dependency | High | Medium | Low |
| Scaling limitations | High | Medium | Low |
| Ongoing cost overruns | Medium | Low | Low |
| Knowledge transfer | Medium | Medium | Low |

### Business Risk

| Risk | Option A | Option B | Option C |
|------|:--------:|:--------:|:--------:|
| Fails to demonstrate value | Low | Low | Low |
| Can't scale post-pilot | High | Medium | Low |
| Competitor catches up | Medium | Medium | Low |

---

## Slide 12: Recommendation & Next Steps

### Our Recommendation

**Start with Option B (Hybrid)** for the best balance of:
- Validated approach using Profound's mature platform
- AI-assisted efficiency gains
- Foundation for scaling to Option C if needed
- Moderate investment with clear upgrade path

### Alternative Paths

- **If budget-constrained**: Start with Option A, upgrade to B after pilot validates approach
- **If scale is certain**: Go directly to Option C if you're confident in 1,000+ prompt volume

### Immediate Next Steps

| Action | Owner | Timeline |
|--------|-------|----------|
| Select approach (A, B, or C) | Client | This week |
| Confirm Profound licensing | Client | Week 0 |
| Finalize SOW based on selected option | Delivery Lead | Week 0-1 |
| Begin Profound configuration | Content Strategist | Week 1 |

### Decision Requested

- [ ] **Option A**: Services-Led ($184K, 10 weeks)
- [ ] **Option B**: Hybrid ($240K, 11 weeks) — *Recommended*
- [ ] **Option C**: Full Automation ($335K, 12 weeks)
- [ ] Request additional information

---

**Document Version**: 3.5
**Last Updated**: December 2025
**Mode**: Executive Advisory
