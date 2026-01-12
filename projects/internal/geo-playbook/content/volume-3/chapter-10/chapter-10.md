# Chapter 10: Team & Staffing

## TL;DR

- **Right roles at the right time**: GEO engagements require 4-6 FTE for POC scope, 10-17 FTE for enterprise, with role allocation varying by phase
- **Strategic shore mix**: Optimize costs through balanced distribution—80% onshore for POC, 55% onshore for enterprise—with specific roles best suited for each shore
- **Phase-based staffing**: Content roles peak during discovery and measurement, technical roles during build, delivery leadership throughout
- **Bottom-up estimation**: Start with work breakdown structure, apply role-based hourly rates, add 15-20% contingency for GEO-specific unknowns

---

## Introduction

Staffing a GEO engagement differs from traditional SEO or web development projects. The work requires a rare blend of content strategy expertise, AI/ML engineering capability, and measurement sophistication. Understaff the engagement and you risk delayed timelines or incomplete solutions. Overstaff and you inflate costs without proportional benefit.

This chapter provides the templates, patterns, and decision frameworks needed to staff GEO engagements correctly. You will learn which roles are essential versus optional, how team composition changes across POC, enterprise, and managed services scopes, and how to balance onshore, nearshore, and offshore allocation for optimal quality and cost.

---

## 10.1 Role Definitions

GEO delivery teams combine traditional delivery roles with specialized GEO and AI capabilities. Below are the core roles, their responsibilities, and how they contribute to engagement success.

### Delivery Lead

**Primary Responsibility**: Overall delivery accountability, client relationship management, and cross-functional coordination.

**Key Activities**:
- Owns the delivery plan, timeline, and budget
- Serves as primary client contact for escalations and strategic decisions
- Facilitates weekly status reviews and steering committee meetings
- Manages risk register and mitigation plans
- Coordinates across technical, content, and strategy workstreams
- Ensures handoff readiness and post-go-live support transition

**Success Metrics**:
- On-time delivery within approved timeline variance (±5%)
- Budget adherence within approved contingency
- Client satisfaction (CSAT) score of 4.5+/5.0
- Zero critical escalations unresolved for >48 hours

**Allocation Pattern**: Full-time (100%) throughout the engagement, from kickoff through hypercare.

---

### GEO Strategist

**Primary Responsibility**: GEO methodology application, measurement design, and optimization strategy.

**Key Activities**:
- Defines success pillars (Brand Sentiment, Topical Visibility, Quality & Value, Product Discovery)
- Designs prompt bank methodology and oversees prompt derivation
- Establishes baseline measurement and defines target KPIs
- Analyzes weekly measurement scans and identifies optimization opportunities
- Provides strategic recommendations based on share of voice (SOV) and citation data
- Trains client teams on GEO principles and ongoing optimization

**Success Metrics**:
- Prompt bank quality score (semantic alignment >85%)
- Baseline established within first 2 weeks
- Measurable SOV improvement during pilot (target: 15-25%)
- Client team GEO literacy (validated through knowledge transfer assessment)

**Allocation Pattern**:
- Phase 0-1 (Discovery): 80-100%
- Phase 2-3 (Build): 20-30%
- Phase 4 (Measurement): 100%
- Phase 5-6 (Pilot): 60-80%

---

### Content Strategist

**Primary Responsibility**: Content architecture, taxonomy design, prompt bank creation, and content quality assurance.

**Key Activities**:
- Maps client content corpus to funnel stages and user intents
- Designs taxonomy for content classification (Content Type, User Intent, Funnel Stage)
- Executes content-first prompt derivation methodology
- Validates semantic alignment between prompts and content chunks
- Defines content enhancement requirements for improved citation rates
- Creates content optimization runbooks for client teams

**Success Metrics**:
- Taxonomy coverage (>95% of content mapped)
- Prompt-content match rate (>85%)
- Content quality audit complete with prioritized improvement backlog
- Runbook clarity (client team can execute without support)

**Allocation Pattern**:
- Phase 0-1 (Discovery): 100%
- Phase 2-3 (Build): 40-60%
- Phase 4-5 (Measurement/Integration): 20-30%
- Phase 6 (Pilot): 40-50%

---

### Technical Architect

**Primary Responsibility**: Infrastructure design, integration architecture, and technical oversight.

**Key Activities**:
- Designs reference architecture for data ingestion, storage, indexing, and API layers
- Defines integration contracts with client systems (CMS, PIM, CDP, analytics)
- Establishes technology stack (vector database, LLM platform, embedding model)
- Reviews technical implementations for adherence to architecture
- Defines security, scalability, and performance requirements
- Creates technical documentation and architecture diagrams

**Success Metrics**:
- Architecture document signed off within Phase 0
- Zero critical architectural rework during build
- Integration contracts validated with client technical teams
- Technical documentation complete and client-approved

**Allocation Pattern**:
- Phase 0 (Design): 100%
- Phase 1-2 (Mobilization/Data Foundation): 60-80%
- Phase 3 (Core Build): 40-60%
- Phase 4-6 (Measurement/Integration/Pilot): 20-30%

---

### AI/ML Engineer

**Primary Responsibility**: Agent development, LLM configuration, prompt engineering, and RAG implementation.

**Key Activities**:
- Builds agentic commerce capabilities (product discovery, comparison, recommendation)
- Configures LLM parameters (temperature, top-p, max tokens, system prompts)
- Implements retrieval-augmented generation (RAG) pipelines
- Develops tool calling capabilities for structured actions
- Optimizes prompt templates for accuracy and citation rate
- Conducts agent testing and validation against success criteria

**Success Metrics**:
- Agent accuracy (correct product recommendations >90%)
- Citation rate (brand mentioned in >40% of relevant prompts)
- Response latency (p95 <2 seconds)
- Tool calling success rate (>95% for structured queries)

**Allocation Pattern**:
- Phase 0-1 (Design/Mobilization): 20-40%
- Phase 2 (Data Foundation): 60-80%
- Phase 3 (Core Build): 100%
- Phase 4-6 (Measurement/Integration/Pilot): 40-60%

---

### Data Engineer

**Primary Responsibility**: Data pipelines, vector store configuration, product feed optimization, and data quality.

**Key Activities**:
- Builds ingestion pipelines for product catalog, content corpus, and third-party data
- Configures vector database with appropriate indexing strategy
- Generates embeddings for semantic search
- Implements data quality validation and monitoring
- Optimizes product feed structure for AI consumption
- Creates data observability dashboards

**Success Metrics**:
- Pipeline uptime (>99.5%)
- Data freshness (product updates reflected within SLA)
- Embedding quality (semantic search precision >85%)
- Zero data quality incidents during pilot

**Allocation Pattern**:
- Phase 0-1 (Design/Mobilization): 40-60%
- Phase 2 (Data Foundation): 100%
- Phase 3-4 (Build/Measurement): 60-80%
- Phase 5-6 (Integration/Pilot): 20-40%

---

### Supporting Roles

**Program Manager (PM)**:
- Manages day-to-day work allocation and task tracking
- Facilitates stand-ups and sprint planning
- Maintains RACI matrix and communication plan
- Allocation: 50-60% throughout engagement

**Quality Assurance (QA) Engineer**:
- Develops test plans and test cases
- Executes functional, integration, and user acceptance testing
- Tracks defects and validates fixes
- Allocation: 20-30% in Phases 0-3, 60-80% in Phases 4-5, 40-60% in Phase 6

**DevOps Engineer**:
- Configures CI/CD pipelines
- Manages infrastructure provisioning and monitoring
- Implements security and access controls
- Allocation: 40-60% in Phases 2-3, 20-30% in Phases 4-6

**UX/UI Designer** (for owned ecosystem optimization):
- Designs content presentation optimized for AI parsing
- Creates structured data visualizations
- Develops user flows for agentic commerce touchpoints
- Allocation: 40-60% in Phase 0, 20-40% in Phases 3-5

---

## 10.2 Staffing Models by Scope

### POC Team Structure (4-6 FTE)

**Total FTE**: 4-6 full-time equivalent resources across all phases.

**Core Team**:
- **Delivery Lead**: 1 FTE (100% allocation) - Senior consultant with GEO experience
- **GEO Strategist**: 0.6 FTE - Owns prompt bank and measurement design
- **Content Strategist**: 0.6 FTE - Executes content-first prompt derivation
- **Technical Architect**: 0.5 FTE - Designs architecture, reviews implementations
- **AI/ML Engineer**: 1 FTE - Builds core agent and RAG capabilities
- **Data Engineer**: 0.8 FTE - Implements data pipelines and vector store

**Optional/Embedded**:
- **PM**: Embedded in Delivery Lead role
- **QA**: Embedded in technical roles (developer testing)
- **DevOps**: Embedded in Data Engineer role

**Total**: ~4.5 FTE average across 12-week timeline.

**Best For**:
- Single-track engagements (e.g., Owned Ecosystem only or Agentic Strategy only)
- Clients with strong internal technical capabilities
- Proof-of-concept or pilot scope
- Budget-constrained engagements

**Key Assumptions**:
- Client provides infrastructure (cloud account, LLM platform access)
- Limited customization requirements
- Single line of business or product category
- Standard integrations (no complex API development)

---

### Enterprise Team Structure (10-17 FTE)

**Total FTE**: 10-17 full-time equivalent resources across all phases.

**Core Team**:
- **Delivery Lead**: 1 FTE - Overall delivery accountability
- **Track Lead - Owned Ecosystem**: 0.8 FTE - Dedicated lead for owned content track
- **Track Lead - Agentic Strategy**: 0.8 FTE - Dedicated lead for agentic commerce track
- **GEO Strategist**: 1 FTE - Full-time strategy and measurement ownership
- **Content Strategist (Senior)**: 1 FTE - Taxonomy and prompt bank design
- **Content Strategist (Mid-level)**: 0.6 FTE - Content audit and optimization
- **Technical Architect**: 1 FTE - Architecture design and technical oversight
- **AI/ML Engineer (Senior)**: 1.5 FTE - Agent development and LLM configuration
- **AI/ML Engineer (Mid-level)**: 1 FTE - Tool development and testing
- **Data Engineer (Senior)**: 1 FTE - Pipeline architecture and vector store
- **Data Engineer (Mid-level)**: 0.8 FTE - Data quality and monitoring

**Supporting Team**:
- **Program Manager**: 1 FTE - Day-to-day coordination and tracking
- **QA Engineer**: 0.8 FTE - Test planning and execution
- **DevOps Engineer**: 0.6 FTE - Infrastructure and CI/CD
- **UX/UI Designer**: 0.4 FTE - Content presentation and structured data design

**Total**: ~14 FTE average across 16-week timeline.

**Best For**:
- Multi-track engagements (Owned Ecosystem + Agentic Strategy + Offsite Influence)
- Multiple lines of business or product categories
- Complex integration requirements
- Enterprise clients with governance and compliance requirements
- Long-term managed services transition planned

**Key Characteristics**:
- Dedicated track leads for parallel workstream execution
- Layered staffing (senior + mid-level) for knowledge transfer
- Full supporting functions (PM, QA, DevOps)
- Capacity for scope expansion without team disruption

---

### Managed Services Team Structure (3-5 FTE)

**Total FTE**: 3-5 full-time equivalent resources on ongoing basis.

**Core Team**:
- **Service Delivery Manager**: 0.5 FTE - Client relationship and escalation management
- **GEO Strategist**: 0.6 FTE - Weekly measurement analysis and optimization recommendations
- **Content Analyst**: 0.8 FTE - Ongoing prompt bank refinement and content updates
- **AI/ML Engineer**: 0.6 FTE - Agent optimization and feature enhancements
- **Data Engineer**: 0.5 FTE - Pipeline monitoring and data quality management
- **Support Engineer**: 0.4 FTE - Incident response and troubleshooting

**Total**: ~3.4 FTE average for steady-state operations.

**Best For**:
- Post-implementation ongoing optimization
- Clients without internal GEO capabilities
- Continuous measurement and reporting requirements
- Regular content refresh and prompt bank updates

**Key Activities**:
- Weekly measurement scans and reporting
- Monthly optimization recommendations
- Quarterly prompt bank refresh
- Continuous data quality monitoring
- Incident response and resolution (SLA-based)

---

### Role Allocation by Phase

The following table shows when roles peak across the standard 6-phase engagement model:

| Role | Phase 0 (Design) | Phase 1 (Mobilization) | Phase 2 (Data Foundation) | Phase 3 (Core Build) | Phase 4 (Measurement) | Phase 5 (Integration) | Phase 6 (Pilot) |
|------|------------------|------------------------|---------------------------|----------------------|-----------------------|-----------------------|-----------------|
| **Delivery Lead** | 100% | 100% | 100% | 100% | 100% | 100% | 100% |
| **GEO Strategist** | 80% | 60% | 20% | 30% | 100% | 60% | 80% |
| **Content Strategist** | 100% | 80% | 40% | 50% | 20% | 30% | 50% |
| **Technical Architect** | 100% | 80% | 60% | 50% | 20% | 30% | 20% |
| **AI/ML Engineer** | 30% | 40% | 80% | 100% | 50% | 60% | 50% |
| **Data Engineer** | 40% | 60% | 100% | 80% | 40% | 30% | 30% |
| **Program Manager** | 50% | 60% | 60% | 60% | 60% | 60% | 50% |
| **QA Engineer** | 20% | 20% | 30% | 60% | 80% | 70% | 50% |
| **DevOps Engineer** | 20% | 30% | 60% | 50% | 30% | 30% | 20% |

**Key Patterns**:
- **Strategy roles** (GEO Strategist, Content Strategist) peak during discovery (Phase 0-1) and measurement (Phase 4-6)
- **Technical roles** (AI/ML Engineer, Data Engineer) peak during build (Phase 2-3)
- **Quality roles** (QA Engineer) peak during integration and testing (Phase 4-5)
- **Delivery Lead** maintains consistent allocation throughout

This phasing allows for efficient resource utilization—strategy roles can support multiple concurrent engagements during build phases, while technical roles can rotate between engagements during discovery phases.

---

## 10.3 Shore Mix Considerations

### Decision Framework

Shore mix decisions balance cost, quality, communication overhead, and time zone considerations. Use this framework to determine optimal allocation:

**Onshore** (client location or same country):
- **Best for**: Client-facing roles, strategic decision-making, workshops, complex integrations
- **Cost multiplier**: 1.0x (baseline)
- **Communication**: Real-time collaboration, same time zone
- **Ramp-up**: Faster due to direct client access

**Nearshore** (adjacent time zone, ±3 hours):
- **Best for**: Core development, testing, content production, data engineering
- **Cost multiplier**: 0.6-0.7x
- **Communication**: 4-6 hour overlap window
- **Ramp-up**: Moderate, some time zone coordination required

**Offshore** (8+ hour time zone difference):
- **Best for**: Data processing, monitoring, support functions, documentation
- **Cost multiplier**: 0.4-0.5x
- **Communication**: Asynchronous workflows, handoff-based
- **Ramp-up**: Slower, requires strong documentation

---

### Role-Specific Shore Recommendations

| Role | Recommended Shore | Rationale |
|------|-------------------|-----------|
| **Delivery Lead** | Onshore (100%) | Client relationship management requires real-time availability and cultural alignment |
| **GEO Strategist** | Onshore (100%) | Strategic guidance and client workshops benefit from direct interaction |
| **Content Strategist** | Onshore (70%) / Nearshore (30%) | Senior strategist onshore for client alignment; mid-level nearshore for execution |
| **Technical Architect** | Onshore (100%) | Integration decisions require direct client technical team collaboration |
| **AI/ML Engineer** | Onshore (40%) / Nearshore (60%) | Senior engineer onshore for architecture; development work nearshore |
| **Data Engineer** | Onshore (30%) / Nearshore (70%) | Senior engineer onshore for pipeline design; implementation nearshore |
| **Program Manager** | Onshore (60%) / Nearshore (40%) | Coordination benefits from client time zone; tracking can be nearshore |
| **QA Engineer** | Nearshore (80%) / Offshore (20%) | Testing execution less dependent on real-time collaboration |
| **DevOps Engineer** | Nearshore (70%) / Offshore (30%) | Infrastructure work can be asynchronous with proper documentation |

---

### Shore Mix by Scope

**POC (4-6 FTE)**:
- **Onshore**: 80% (3.6 FTE)
- **Nearshore**: 20% (0.9 FTE)
- **Offshore**: 0%

**Rationale**: POC scope requires high client interaction, rapid iteration, and minimal communication overhead. Keep most roles onshore with selective nearshore support for execution-heavy tasks.

**Recommended Nearshore**: Data engineering execution, QA testing, documentation.

---

**Enterprise (10-17 FTE)**:
- **Onshore**: 55% (7.7 FTE)
- **Nearshore**: 45% (6.3 FTE)
- **Offshore**: 0%

**Rationale**: Enterprise scale allows for offshore-onshore pairing. Strategic and client-facing roles remain onshore, while technical execution shifts nearshore for cost optimization.

**Recommended Nearshore**: Mid-level AI/ML engineers, data engineers, QA engineers, DevOps engineers, content analysts.

---

**Managed Services (3-5 FTE)**:
- **Onshore**: 40% (1.4 FTE)
- **Nearshore**: 60% (2.0 FTE)
- **Offshore**: 0%

**Rationale**: Steady-state operations benefit from nearshore execution with onshore strategic oversight. Measurement and optimization can be asynchronous.

**Recommended Nearshore**: Content analyst, AI/ML engineer, data engineer, support engineer.

---

### Communication and Collaboration Patterns

**Daily Standups**:
- **Onshore teams**: 9:00 AM local time
- **Nearshore teams**: 8:00 AM nearshore time (overlaps with onshore 11:00 AM)
- **Format**: 15 minutes, async updates via Slack for offshore

**Weekly Client Status**:
- **Always onshore-led**: Delivery Lead + Track Leads present
- **Nearshore support**: Technical leads available for deep dives
- **Timing**: Client time zone, mid-week (Tuesday-Thursday)

**Sprint Planning & Retrospectives**:
- **Onshore + Nearshore joint sessions**: Scheduled during overlap window
- **Offshore**: Async input via documentation, attendance optional

**Ad-hoc Collaboration**:
- **Onshore-to-onshore**: Real-time Slack, video calls
- **Onshore-to-nearshore**: 4-hour response SLA during overlap window
- **Onshore-to-offshore**: 24-hour response SLA, documented in project management tool

---

### Cost Optimization Strategies

**Right-size onshore allocation**:
- Start with 100% onshore, identify tasks with low client interaction
- Shift execution-heavy, well-defined tasks to nearshore
- Target 40-60% onshore for enterprise engagements

**Leverage time zones for 24-hour cycles**:
- Onshore team hands off to nearshore at end of day
- Nearshore completes execution overnight
- Onshore reviews next morning (accelerates timeline)

**Invest in documentation**:
- Clear requirements reduce communication overhead
- Architecture decision records (ADRs) enable asynchronous decision-making
- Runbooks allow nearshore teams to execute without constant onshore support

**Avoid false economies**:
- Do not offshore client-facing strategy roles (poor outcomes, low client satisfaction)
- Do not nearshore Delivery Lead (relationship degradation risk)
- Do not split single roles across shores (coordination overhead exceeds savings)

---

## 10.4 Effort Estimation Templates

### Bottom-Up Estimation Methodology

**Step 1: Work Breakdown Structure (WBS)**

Decompose the engagement into phases, then into deliverables, then into tasks.

Example for Phase 2 (Data Foundation):

```
Phase 2: Data Foundation
├── Product Catalog Ingestion
│   ├── Extract product feed from client PIM
│   ├── Transform to standard schema
│   ├── Load to object storage
│   ├── Validate data quality
├── Vector Store Configuration
│   ├── Provision vector database instance
│   ├── Configure indexing strategy
│   ├── Optimize query performance
│   ├── Implement backup/recovery
├── Embedding Generation
│   ├── Select embedding model
│   ├── Generate embeddings for product corpus
│   ├── Validate semantic search quality
│   ├── Implement incremental embedding updates
└── Data Quality Framework
    ├── Define data quality rules
    ├── Implement validation pipeline
    ├── Create data observability dashboards
    ├── Establish alerting thresholds
```

---

**Step 2: Estimate Hours per Task**

For each task, estimate hours required using historical data or analogous projects.

| Task | Role | Estimated Hours | Confidence |
|------|------|----------------|------------|
| Extract product feed from client PIM | Data Engineer | 16 | High |
| Transform to standard schema | Data Engineer | 24 | Medium |
| Load to object storage | Data Engineer | 8 | High |
| Validate data quality | Data Engineer | 16 | Medium |

**Confidence levels**:
- **High**: Similar work completed before, clear requirements
- **Medium**: Partial experience, some unknowns
- **Low**: Novel work, significant unknowns (apply higher contingency)

---

**Step 3: Apply Role-Based Rates**

Multiply hours by role-specific rates to calculate labor cost.

| Role | Onshore Rate | Nearshore Rate | Offshore Rate |
|------|--------------|----------------|---------------|
| Delivery Lead | $200/hour | N/A | N/A |
| GEO Strategist | $185/hour | N/A | N/A |
| Content Strategist (Senior) | $175/hour | $120/hour | N/A |
| Technical Architect | $190/hour | N/A | N/A |
| AI/ML Engineer (Senior) | $180/hour | $125/hour | N/A |
| AI/ML Engineer (Mid-level) | $150/hour | $105/hour | N/A |
| Data Engineer (Senior) | $170/hour | $115/hour | N/A |
| Data Engineer (Mid-level) | $140/hour | $95/hour | N/A |
| Program Manager | $145/hour | $100/hour | N/A |
| QA Engineer | $125/hour | $85/hour | $60/hour |
| DevOps Engineer | $160/hour | $110/hour | $75/hour |

**Note**: Rates are illustrative examples. Adjust for market conditions, seniority, and geography.

---

**Step 4: Sum by Phase and Role**

Aggregate all tasks within a phase, group by role.

**Phase 2 (Data Foundation) - Example Rollup**:

| Role | Total Hours | Shore | Rate | Subtotal |
|------|-------------|-------|------|----------|
| Data Engineer (Senior) | 120 | Onshore | $170 | $20,400 |
| Data Engineer (Mid-level) | 200 | Nearshore | $95 | $19,000 |
| Technical Architect | 40 | Onshore | $190 | $7,600 |
| DevOps Engineer | 60 | Nearshore | $110 | $6,600 |
| **Phase 2 Total** | **420 hours** | | | **$53,600** |

---

**Step 5: Add Contingency**

Apply contingency based on engagement risk profile:

- **Low risk** (POC, single track, standard tech stack): 10-15%
- **Medium risk** (enterprise, multi-track, some integration complexity): 15-20%
- **High risk** (novel technology, complex integrations, unclear requirements): 20-30%

**GEO-specific risk factors**:
- Prompt bank derivation (new methodology, LLM variability): +5%
- Multi-platform measurement (API rate limits, data consistency): +5%
- Agentic commerce (agent behavior unpredictability): +5-10%

**Example**: Phase 2 with 20% contingency:
- Base: $53,600
- Contingency (20%): $10,720
- **Total Phase 2**: $64,320

---

### Phase-Based Effort Patterns

The following table shows typical effort distribution across phases for a **12-week POC engagement (4.5 FTE average)**:

| Phase | Duration | Total Hours | % of Total | Key Effort Drivers |
|-------|----------|-------------|------------|--------------------|
| **Phase 0: Design** | 2 weeks | 360 | 16% | Architecture design, taxonomy definition, integration contracts |
| **Phase 1: Mobilization** | 1 week | 180 | 8% | Team onboarding, artifact collection, environment setup |
| **Phase 2: Data Foundation** | 2 weeks | 450 | 20% | Data pipelines, vector store, embedding generation |
| **Phase 3: Core Build** | 3 weeks | 675 | 30% | Agent development, RAG implementation, tool building |
| **Phase 4: Measurement** | 2 weeks | 315 | 14% | Measurement infrastructure, baseline scans, KPI dashboards |
| **Phase 5: Integration & Polish** | 2 weeks | 270 | 12% | E2E testing, documentation, UAT, refinement |
| **Total (Phases 0-5)** | **12 weeks** | **2,250 hours** | **100%** | |

**Plus Phase 6 (Pilot Execution)**: 3 weeks, ongoing measurement and optimization (300 hours).

**Grand Total**: 2,550 hours over 15 weeks (12 weeks build + 3 weeks pilot).

---

### Role-Based Allocation Template

For a **POC engagement (4.5 FTE)**, hours allocated by role across all phases:

| Role | Total Hours | % of Total | Avg Hours/Week |
|------|-------------|------------|----------------|
| Delivery Lead | 600 | 24% | 40 (full-time) |
| GEO Strategist | 450 | 18% | 30 |
| Content Strategist | 420 | 16% | 28 |
| Technical Architect | 330 | 13% | 22 |
| AI/ML Engineer | 480 | 19% | 32 |
| Data Engineer | 270 | 11% | 18 |
| **Total** | **2,550 hours** | **100%** | **170 hours/week** |

**Validation**: 170 hours/week ÷ 40 hours/FTE = **4.25 FTE average** (within 4-6 FTE range).

---

### Contingency and Buffer Planning

**Types of Contingency**:

1. **Schedule Contingency**: Time buffer for critical path tasks
   - Apply to integration dependencies (client systems, third-party APIs)
   - Apply to client approval gates (architecture sign-off, UAT)
   - **Recommendation**: 1-2 weeks of float in 12-week timeline

2. **Effort Contingency**: Labor hours for rework or unknowns
   - Apply to novel GEO methodologies (prompt derivation, agentic commerce)
   - Apply to client-specific complexity (legacy systems, data quality issues)
   - **Recommendation**: 15-20% of base labor hours

3. **Budget Contingency**: Financial reserve for scope changes
   - Apply to change requests approved mid-engagement
   - Apply to unexpected third-party costs (API usage, LLM inference costs)
   - **Recommendation**: 10-15% of total contract value

**Contingency Release Process**:
- Contingency is **not** free labor for scope expansion
- Requires Delivery Lead approval for use
- Track contingency burn weekly (early burn indicates risk)
- Replenish contingency if risk is mitigated (e.g., integration completed smoothly)

---

## 10.5 Skills & Hiring Guidance

### Core Competencies by Role

#### Delivery Lead

**Must-Have**:
- 8+ years in delivery management, 3+ years in AI/ML or digital transformation projects
- Proven client relationship management for enterprise accounts ($500K+ engagements)
- Risk management and escalation handling in complex technical projects
- Experience managing cross-functional teams (technical + strategy)

**Nice-to-Have**:
- GEO or SEO background (understands content optimization challenges)
- Experience with managed services transition
- Certifications: PMP, Agile/Scrum, Prosci Change Management

**Red Flags**:
- Lacks client-facing experience (operational PM background only)
- No experience with ambiguous, fast-changing requirements (waterfall-only mindset)
- Cannot articulate risk mitigation strategies in interview

---

#### GEO Strategist

**Must-Have**:
- 5+ years in SEO, content strategy, or digital marketing analytics
- Deep understanding of search engine and LLM ranking factors
- Experience with measurement platforms (Google Search Console, analytics tools)
- Ability to translate data insights into actionable optimization strategies

**Nice-to-Have**:
- Hands-on experience with AI search platforms (Perplexity, ChatGPT, Google AI Overviews)
- Background in prompt engineering or LLM evaluation
- Experience with A/B testing or experimentation frameworks

**Red Flags**:
- Purely theoretical SEO knowledge (no hands-on campaign experience)
- Cannot explain how AI differs from traditional search ranking
- Lacks data literacy (cannot interpret measurement dashboards)

---

#### Content Strategist

**Must-Have**:
- 5+ years in content strategy, information architecture, or UX writing
- Experience with taxonomy design and content classification
- Strong writing skills (ability to create clear, authoritative content)
- Proficiency with NLP tools or semantic analysis (spaCy, BERT, entity extraction)

**Nice-to-Have**:
- SEO background (understands content optimization for ranking)
- Experience with content management systems (CMS) and product information management (PIM)
- Background in linguistics, library science, or knowledge management

**Red Flags**:
- Only copywriting experience (no strategic content architecture background)
- Cannot explain taxonomy design principles
- Lacks analytical mindset (content creation only, no optimization)

---

#### Technical Architect

**Must-Have**:
- 10+ years in software architecture, 3+ years in cloud-native architectures (AWS, Azure, GCP)
- Experience designing data pipelines and API integrations
- Proficiency with microservices, event-driven architectures, and serverless patterns
- Strong documentation skills (architecture diagrams, technical specifications)

**Nice-to-Have**:
- AI/ML infrastructure experience (vector databases, LLM serving)
- Experience with e-commerce or content platform integrations
- Certifications: AWS Solutions Architect, Azure Architect, GCP Cloud Architect

**Red Flags**:
- Only hands-on development experience (no architecture design background)
- Cannot articulate trade-offs between architectural options
- Lacks experience with third-party integrations (monolithic mindset)

---

#### AI/ML Engineer

**Must-Have**:
- 3+ years in AI/ML engineering, 1+ years with LLMs or generative AI
- Hands-on experience with LLM APIs (OpenAI, Anthropic, AWS Bedrock, Azure OpenAI)
- Proficiency with Python and AI frameworks (LangChain, LlamaIndex, Haystack)
- Experience with prompt engineering and RAG implementations

**Nice-to-Have**:
- Experience with agentic AI or tool-calling patterns
- Background in NLP or information retrieval
- Familiarity with vector databases (Pinecone, Weaviate, Chroma, OpenSearch)

**Red Flags**:
- Only traditional ML experience (lacks LLM-specific knowledge)
- Cannot explain RAG architecture or prompt engineering best practices
- No production AI deployment experience (notebook-only development)

---

#### Data Engineer

**Must-Have**:
- 4+ years in data engineering, 2+ years with cloud data platforms
- Experience building ETL/ELT pipelines (Airflow, Fivetran, dbt)
- Proficiency with SQL and Python
- Experience with data quality validation and monitoring

**Nice-to-Have**:
- Experience with vector databases or semantic search
- Background in e-commerce or product data (PIM, catalog management)
- Familiarity with streaming data pipelines (Kafka, Kinesis)

**Red Flags**:
- Only data analysis experience (no pipeline engineering background)
- Lacks understanding of data quality best practices
- No experience with cloud-native data platforms (on-prem only)

---

### Interview Focus Areas

**Delivery Lead Interview**:
1. **Case study**: "A client requests a major scope change in week 8 of a 12-week engagement. Walk me through your approach."
   - **Look for**: Risk assessment, stakeholder communication, impact analysis, decision framework
2. **Scenario**: "Your technical team reports a critical integration blocker. The client is expecting a demo tomorrow. What do you do?"
   - **Look for**: Escalation strategy, contingency planning, client expectation management
3. **Behavioral**: "Describe a project where you had to manage a difficult client relationship. What was the outcome?"
   - **Look for**: Conflict resolution, empathy, proactive communication

---

**GEO Strategist Interview**:
1. **Technical assessment**: "Explain the difference between traditional SEO and GEO. What changes in optimization strategy?"
   - **Look for**: Understanding of AI ranking factors, citation vs. click metrics, content quality focus
2. **Case study**: "A client's share of voice is 12%, but they want to reach 40% in 3 months. Is this realistic? How would you approach it?"
   - **Look for**: Baseline assessment, optimization prioritization, realistic goal-setting
3. **Hands-on**: "Given this product catalog, how would you derive 100 prompts for a pilot measurement?"
   - **Look for**: Content-first methodology, semantic alignment validation, prompt diversity

---

**AI/ML Engineer Interview**:
1. **Technical deep-dive**: "Design a RAG system for product recommendations. Walk me through the architecture."
   - **Look for**: Retrieval strategy, embedding model selection, re-ranking, LLM configuration
2. **Coding exercise**: "Write a prompt template that retrieves product features and generates a comparison table."
   - **Look for**: Prompt engineering skills, structured output handling, error handling
3. **Scenario**: "Your agent is citing incorrect product information 15% of the time. How do you debug and fix this?"
   - **Look for**: Systematic debugging approach, data quality checks, prompt refinement

---

### Ramp-Up Time Expectations

| Role | Ramp-Up Period | Productive Work Starts | Full Productivity |
|------|----------------|------------------------|-------------------|
| **Delivery Lead** | 3-5 days | Week 1 | Week 2 |
| **GEO Strategist** | 5-7 days | Week 2 | Week 3 |
| **Content Strategist** | 5-7 days | Week 2 | Week 3 |
| **Technical Architect** | 7-10 days | Week 2 | Week 4 |
| **AI/ML Engineer** | 7-10 days | Week 2 | Week 4 |
| **Data Engineer** | 7-10 days | Week 2 | Week 4 |

**Ramp-up accelerators**:
- **Pre-engagement onboarding**: Share architecture docs, taxonomy examples, prior project artifacts
- **Shadowing**: New team members shadow experienced team members for first 3-5 days
- **Starter tasks**: Assign low-risk, well-defined tasks during ramp-up period
- **Buddy system**: Pair new hires with experienced team members for first 2 weeks

**Ramp-up costs**:
- Expect 50% productivity in Week 1, 75% in Week 2, 90%+ in Week 3
- Factor ramp-up time into timeline (do not assume full productivity from Day 1)
- For short engagements (8-12 weeks), prioritize experienced hires to minimize ramp-up impact

---

### Training Requirements

**GEO Fundamentals** (all team members):
- **Duration**: 4 hours
- **Topics**: GEO vs. SEO, success pillars, citation economy, measurement methodology
- **Format**: Self-paced e-learning + live Q&A
- **Validation**: Quiz with 80% passing score

**Content-First Prompt Derivation** (Content Strategist, GEO Strategist):
- **Duration**: 8 hours
- **Topics**: Taxonomy design, semantic extraction, prompt generation, validation methodology
- **Format**: Hands-on workshop with sample product catalog
- **Validation**: Derive 50 prompts from sample content, achieve >85% match rate

**RAG Architecture & Agentic AI** (AI/ML Engineer, Technical Architect):
- **Duration**: 12 hours
- **Topics**: Vector databases, embedding models, retrieval strategies, tool calling, agent orchestration
- **Format**: Live instruction + coding exercises
- **Validation**: Build sample RAG system, pass accuracy benchmarks

**Client-Specific Training** (all team members):
- **Duration**: 2-4 hours
- **Topics**: Client business model, product catalog structure, existing tech stack, stakeholder map
- **Format**: Client-led walkthrough + documentation review
- **Timing**: Week 1 of engagement

---

## Common Pitfalls

**Understaffing Strategy Roles**:
- **Problem**: Technical roles dominate staffing, GEO Strategist and Content Strategist under-allocated
- **Impact**: Strong technical implementation, weak measurement design and content optimization
- **Solution**: Allocate 40-50% of budget to strategy roles; GEO success depends on methodology, not just technology

**No Mid-Level Resources**:
- **Problem**: Team composed entirely of senior resources
- **Impact**: Inflated costs, senior resources executing junior tasks, no bench strength
- **Solution**: Layer staffing with 60% senior, 40% mid-level for cost efficiency and knowledge transfer

**Ignoring Ramp-Up Time**:
- **Problem**: Assuming full productivity from Day 1
- **Impact**: Timeline slips, quality issues from under-prepared team
- **Solution**: Add 1-2 weeks to timeline for team ramp-up, or start team 1 week before client kickoff

**Inconsistent Shore Mix**:
- **Problem**: Ad-hoc decisions on role location without strategy
- **Impact**: Communication breakdowns, onshore resources burned on low-value tasks
- **Solution**: Define shore mix strategy upfront, validate with Delivery Lead before staffing

**No Succession Planning**:
- **Problem**: Key resources (Delivery Lead, Technical Architect) have no backup
- **Impact**: Single point of failure, engagement at risk if resource leaves
- **Solution**: Cross-train secondary resources, document key decisions in ADRs, maintain up-to-date runbooks

---

## Next Steps

1. **For Delivery Leads**: Use the staffing models in Section 10.2 as templates. Adjust for client-specific complexity and timeline.

2. **For Hiring Managers**: Incorporate the competencies and interview questions from Section 10.5 into role profiles and interview guides.

3. **For Estimators**: Apply the bottom-up methodology from Section 10.4 to your next proposal. Validate effort against historical actuals.

4. **For Program Managers**: Use the phase-based allocation table (Section 10.2) to create resource loading plans and identify capacity gaps early.

5. **For Finance Teams**: Leverage the shore mix recommendations (Section 10.3) to optimize engagement profitability without compromising delivery quality.

---

## Related Chapters

- **Chapter 9: Communication & Reporting**: Defines status reporting cadence and stakeholder communication patterns that inform Delivery Lead and PM allocation
- **Chapter 11: Risk Management**: Provides risk categories and mitigation strategies that Technical Architect and Delivery Lead must address
- **Chapter 12: Knowledge Transfer**: Details training and enablement requirements that Content Strategist and GEO Strategist deliver
- **Appendix B: Estimation Templates**: Includes role-based rate cards and effort estimation worksheets referenced in this chapter
