# Chapter 11: Risk & Dependencies

## TL;DR

- **Risk management is proactive, not reactive**: Identify and mitigate risks before they become issues
- **Client dependencies are the primary constraint**: Most delays stem from missing client inputs, not delivery team capacity
- **Escalation requires clear thresholds**: Define triggers and paths before issues arise
- **Anti-patterns are predictable**: Learn from common mistakes to avoid repeating them

## Introduction

GEO implementations face unique risks compared to traditional digital initiatives. The technology is emerging, client organizations lack familiarity with AI agent development, and success depends on factors outside the delivery team's direct control—content quality, stakeholder alignment, platform stability. Without structured risk management, these challenges compound into delivery delays, scope creep, and missed objectives.

This chapter provides a comprehensive framework for identifying, tracking, and mitigating risks throughout the engagement lifecycle. It includes dependency checklists that ensure client readiness at each phase, escalation protocols that define when and how to surface issues, and anti-pattern catalogs that help teams avoid common pitfalls.

The goal is not to eliminate risk—that's impossible in any innovation initiative—but to make risks visible, manageable, and resolvable before they derail delivery.

---

## 11.1 Common Risk Patterns

### Content Risks

Content risks are the most common category in GEO engagements. AI systems can only cite what exists, and citation quality depends on content quality.

#### Content Quality Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Content lacks semantic structure | High | High | Pages have thin metadata, missing headings, no schema markup |
| Content not optimized for natural language queries | High | Medium | Content targets keywords, not conversational questions |
| Product descriptions are too brief or generic | Medium | High | Descriptions under 100 words, lack unique value propositions |
| Content contains outdated information | Medium | Medium | Last update timestamps over 12 months old |
| Content has brand inconsistencies | Low | Medium | Tone/terminology varies across pages and authors |

**Mitigation**: Conduct content audit during Phase 0. Identify gaps and work with client to prioritize content improvements in parallel with technical build.

#### Content Volume Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Insufficient product catalog depth | Medium | High | Less than 50 products in target category |
| Limited topic coverage | Medium | High | Fewer than 10 cornerstone content pieces per category |
| Narrow content types | High | Medium | Only PDPs exist, no guides/comparisons/FAQs |
| Missing competitive differentiation content | High | High | No head-to-head comparisons or "why choose us" content |

**Mitigation**: Define minimum content thresholds during design phase. If client cannot meet thresholds, adjust scope to narrower category or delay pilot until content backlog is addressed.

#### Content Freshness Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Stale pricing information | Low | High | Pricing not synced with source system |
| Seasonal content not updated | Medium | Medium | Winter product recommendations in summer |
| Discontinued products still indexed | Medium | Medium | Vector store contains products no longer sold |
| Outdated competitive information | Medium | Low | Competitor references are 6+ months old |

**Mitigation**: Establish automated content refresh pipeline. Define SLAs for critical content updates (pricing: real-time, availability: hourly, general content: weekly).

### Technical Risks

Technical risks span integration complexity, platform dependencies, and performance requirements.

#### Integration Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Client API lacks required endpoints | Medium | High | Product API doesn't support semantic search or faceting |
| Authentication/authorization gaps | Medium | Medium | No service account provisioned for agent access |
| Rate limiting constraints | High | Medium | API throttles requests below agent needs |
| Data format incompatibility | Medium | Medium | Client feeds in proprietary format, not JSON/XML |
| Network/firewall restrictions | Low | High | Agent platform cannot reach client APIs from cloud |

**Mitigation**: Complete integration mapping during Phase 0. Test authentication and sample data calls before build phase begins. Document all client API requirements in architecture doc.

#### Platform Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| LLM platform outage or degradation | Medium | High | Model API latency spikes or errors |
| Embedding model changes | Low | High | Provider deprecates embedding model, requiring re-indexing |
| Vector database performance issues | Medium | Medium | Query latency exceeds 500ms at scale |
| Cost overruns from API usage | High | Medium | Token consumption exceeds budget estimates |

**Mitigation**: Design for multi-model fallback. Monitor platform status daily during pilot. Implement token budgeting and circuit breakers to prevent runaway costs.

#### Performance Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Agent response time exceeds acceptable threshold | High | High | Responses take over 5 seconds |
| Vector search recall too low | Medium | High | Relevant products not surfaced in top 10 results |
| Hallucination rate unacceptable | Medium | High | Agent fabricates product details or recommendations |
| Concurrent user limit reached | Low | Medium | System cannot handle expected load |

**Mitigation**: Define performance SLAs during design. Implement monitoring and alerting from day one. Load test before pilot launch.

### Organizational Risks

Organizational risks stem from stakeholder dynamics, change management, and internal alignment challenges.

#### Stakeholder Alignment Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Executive sponsor disengaged | Low | High | Sponsor skips steering meetings, doesn't respond to escalations |
| Competing priorities shift resources | High | Medium | Client SMEs pulled to other projects mid-engagement |
| Political resistance to AI initiatives | Medium | High | Key stakeholders oppose AI strategy, block decisions |
| Siloed teams don't collaborate | High | Medium | Content, tech, and marketing teams operate independently |

**Mitigation**: Establish governance structure with clear RACI from day one. Schedule executive sponsor touchpoints monthly minimum. Surface alignment issues early and often.

#### Change Management Risks

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| End users resist new tools | Medium | Medium | Internal teams don't adopt agent-generated insights |
| Training insufficient for client team | High | Medium | Client cannot operate or maintain solution post-launch |
| Process changes not documented | High | Low | New workflows assumed but not formalized |
| Lack of internal champions | Medium | High | No client advocate to drive adoption post-engagement |

**Mitigation**: Identify and empower internal champions early. Build training and documentation into project scope. Conduct formal knowledge transfer sessions, not just "throw it over the wall" handoffs.

### External Risks

External risks are outside direct control but must be monitored and managed.

#### AI Platform Changes

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| ChatGPT/Claude/Gemini changes citation behavior | High | High | Platform updates reduce or alter how sources are cited |
| Search Generative Experience (SGE) sunset | Medium | Medium | Google discontinues SGE, requiring strategy pivot |
| New AI platforms emerge | High | Low | New entrants (e.g., Perplexity) require strategy expansion |
| Regulatory restrictions on AI usage | Low | High | Government mandates limit AI capabilities or data usage |

**Mitigation**: Design platform-agnostic content strategies. Monitor AI platform updates weekly. Maintain flexibility to pivot tactics while preserving strategic content investments.

#### Competitive Dynamics

| Risk | Probability | Impact | Indicator |
|------|------------|--------|-----------|
| Competitor launches superior GEO program | Medium | High | Competitor share of voice increases significantly |
| Industry shifts to different AI approach | Low | Medium | Market adopts different technology stack or strategy |
| Client-competitor relationship changes | Low | High | Merger/partnership requires strategy adjustment |

**Mitigation**: Conduct competitive benchmark quarterly. Build adaptability into solution architecture. Focus on sustainable content quality, not just tactical optimization.

### Risk Probability and Impact Matrix

Use this matrix to prioritize risk mitigation efforts:

```
IMPACT →        Low          Medium         High
           ┌─────────────┬──────────────┬──────────────┐
           │             │              │              │
PROBABILITY│   Monitor   │   Monitor    │   Mitigate   │
HIGH       │             │   & Plan     │   Now        │
           │             │              │              │
           ├─────────────┼──────────────┼──────────────┤
           │             │              │              │
MEDIUM     │   Accept    │   Plan       │   Mitigate   │
           │             │   Mitigation │   & Monitor  │
           │             │              │              │
           ├─────────────┼──────────────┼──────────────┤
           │             │              │              │
LOW        │   Accept    │   Accept     │   Plan       │
           │             │              │   Mitigation │
           │             │              │              │
           └─────────────┴──────────────┴──────────────┘
```

**Risk Treatment Definitions**:
- **Mitigate Now**: Active mitigation required immediately; assign owner and timeline
- **Mitigate & Monitor**: Implement mitigation plan and track closely
- **Plan Mitigation**: Develop contingency plan but don't execute yet
- **Monitor**: Track indicator but take no action unless status changes
- **Accept**: Document risk but no action required

---

## 11.2 Client Dependency Checklist

Client dependencies are the single largest source of engagement delays. Use these checklists to ensure client readiness at each phase gate.

### Pre-Engagement Dependencies

Confirm these before signing the statement of work:

- [ ] **Executive Sponsor Identified**: Named individual with budget authority and organizational influence
- [ ] **Budget Approved**: Funding secured through engagement completion, including pilot period
- [ ] **Team Capacity Committed**: Client SMEs have time allocated (typically 10-20 hours/week during peak phases)
- [ ] **Technical Access Confirmed**: Delivery team can access necessary client systems (APIs, databases, analytics)
- [ ] **Legal/Security Review Complete**: Standard data processing, security, and IP terms agreed
- [ ] **Success Criteria Defined**: Clear definition of what "good" looks like at pilot completion

**Escalation Trigger**: If any item cannot be confirmed within 1 week of kickoff, escalate to Delivery Lead and client executive sponsor.

### Phase 0 (Design) Dependencies

Required inputs for architecture and solution design:

- [ ] **Product Catalog Export**: Complete product data feed with all attributes (typically 50-500 products for pilot)
- [ ] **Content Inventory**: List of key URLs (product pages, category pages, guides, FAQs)
- [ ] **Competitor List**: 3-5 primary competitors for SOV benchmarking
- [ ] **Brand Guidelines**: Brand voice, tone, terminology standards
- [ ] **Technical Architecture Diagrams**: Client's current tech stack, API documentation, integration patterns
- [ ] **API Credentials**: Service accounts and keys for any systems the agent must access
- [ ] **Sample Queries**: 20-50 example questions customers ask (from support, sales, search logs)
- [ ] **Success Metrics Access**: Baseline data for KPIs (current organic traffic, conversion rates, etc.)

**Escalation Trigger**: If 50% or fewer items are provided by end of week 1 in Phase 0, flag risk to steering committee.

### Build Phase Dependencies

Required throughout Phases 1-3 (Mobilization, Data Foundation, Core Build):

- [ ] **SME Availability**: Content and technical SMEs available for 2-hour working sessions weekly
- [ ] **Content Review Cycles**: Client team can review and approve content/taxonomy within 48 hours
- [ ] **API Environment Access**: Development and staging environments available for integration testing
- [ ] **Test Data**: Sufficient product and customer data for realistic testing (anonymized if necessary)
- [ ] **Infrastructure Provisioning**: Cloud resources, network access, service accounts created per architecture doc
- [ ] **Security/Compliance Approval**: Any required security reviews completed before deployment to staging
- [ ] **Feedback Loops**: Designated client reviewers for sprint demos and UAT

**Escalation Trigger**: If client review cycles exceed 72 hours twice in same sprint, escalate to Delivery Lead.

### Pilot Phase Dependencies

Required for successful pilot execution (Phase 6):

- [ ] **Measurement Platform Access**: API keys for GEO measurement platform (e.g., Profound, AEO Monitor)
- [ ] **Prompt Bank Finalized**: 400+ prompts validated and loaded for tracking
- [ ] **Competitor Tracking Configured**: Competitor domains added to measurement platform
- [ ] **Baseline Metrics Captured**: Pre-pilot SOV and citation rate established
- [ ] **Optimization Budget**: Client content team has capacity to implement recommended content changes during pilot
- [ ] **Weekly Review Cadence**: Client stakeholders committed to weekly pilot review meetings
- [ ] **Reporting Distribution List**: All stakeholders identified for pilot readouts

**Escalation Trigger**: If weekly review meetings are canceled or rescheduled more than once, escalate immediately.

### Dependency Tracking Template

Use this format to track dependencies in weekly status reports:

| Dependency | Owner | Due Date | Status | Blocker | Escalation Date |
|------------|-------|----------|--------|---------|-----------------|
| Product catalog export | Client Data Team | 2024-02-15 | At Risk | API access pending | 2024-02-12 |
| Brand guidelines | Client Marketing | 2024-02-10 | Complete | - | - |
| API credentials | Client IT | 2024-02-20 | Blocked | Security review delayed | 2024-02-18 |

**Status Definitions**:
- **On Track**: Dependency will be met by due date
- **At Risk**: Potential delay but mitigation in progress
- **Blocked**: Cannot proceed without external resolution
- **Complete**: Dependency satisfied

**Escalation Protocol**: Blocked items escalate after 3 business days. At Risk items escalate if not resolved within 1 week.

---

## 11.3 Mitigation Strategies

### Risk-Specific Mitigation Approaches

#### Content Quality Mitigation

**Approach**: Content audit and prioritized remediation

1. **Audit Existing Content** (Week 1 of Phase 0):
   - Use automated tools (Screaming Frog, custom scripts) to crawl client domain
   - Score pages on: word count, semantic structure, schema markup, freshness
   - Categorize: High Quality (ready), Medium Quality (needs improvement), Low Quality (exclude or rewrite)

2. **Prioritize Remediation**:
   - Focus on top 20% of pages that drive 80% of organic traffic
   - Prioritize product pages over blog posts for commerce clients
   - Set minimum thresholds: 300+ words, clear headings, schema markup

3. **Parallel Track Content Improvements**:
   - Don't block technical build on content remediation
   - Client content team works in parallel to delivery team
   - Phase pilot to launch when minimum content quality threshold is met

**Success Criteria**: 80% of pilot content meets quality threshold before pilot launch.

#### Integration Complexity Mitigation

**Approach**: Early integration testing with fallback options

1. **Proof-of-Concept Integration** (Week 2 of Phase 0):
   - Test authentication against client APIs
   - Execute sample calls for all required endpoints
   - Validate data format and response times
   - Document any gaps or limitations

2. **Design Fallback Mechanisms**:
   - If client API is unavailable, can agent fall back to web scraping?
   - If real-time pricing fails, can agent use cached pricing with disclaimer?
   - If product API is slow, can agent pre-fetch and cache common queries?

3. **Incremental Integration**:
   - Start with read-only operations (product lookup)
   - Add write operations (order placement) only after read stability proven
   - Implement circuit breakers to prevent cascading failures

**Success Criteria**: All critical integrations tested end-to-end in staging before pilot.

#### Stakeholder Alignment Mitigation

**Approach**: Governance structure with clear RACI and regular touchpoints

1. **Establish Steering Committee**:
   - Membership: Executive sponsor, client workstream leads, Delivery Lead
   - Cadence: Bi-weekly 30-minute meetings
   - Purpose: Decision-making, risk escalation, strategic alignment

2. **Define RACI for Key Decisions**:
   - **Responsible**: Who does the work?
   - **Accountable**: Who has final approval?
   - **Consulted**: Who provides input?
   - **Informed**: Who needs to know?

3. **Surface Issues Early**:
   - Use steering committee meetings to flag risks before they become blockers
   - No surprises: escalate early, escalate often
   - Document decisions and action items in meeting minutes

**Success Criteria**: No major scope or timeline decisions made outside governance structure.

### Contingency Planning

Contingency plans are pre-defined responses to specific risk scenarios. Develop these during Phase 0 and keep them updated throughout engagement.

#### Contingency Plan Template

**Risk**: [Name of risk from risk register]

**Trigger Condition**: [Specific, measurable condition that activates this plan]

**Contingency Actions**:
1. [Immediate action to contain impact]
2. [Medium-term action to resolve root cause]
3. [Long-term action to prevent recurrence]

**Owners**: [Who executes each action]

**Resources Required**: [Budget, people, tools needed]

**Timeline**: [How long contingency plan takes to execute]

**Example Contingency Plan**:

**Risk**: LLM platform (e.g., AWS Bedrock) suffers extended outage

**Trigger Condition**: Platform uptime below 95% for 24 consecutive hours, or complete outage lasting more than 2 hours

**Contingency Actions**:
1. **Immediate (0-4 hours)**: Switch to backup LLM provider (e.g., Azure OpenAI). Validate core functionality works with backup model.
2. **Medium-term (4-24 hours)**: Notify client of platform switch. Monitor backup platform performance and costs. Document any behavioral differences.
3. **Long-term (1 week)**: Evaluate whether to switch back to primary platform or permanently adopt backup. Update architecture documentation.

**Owners**: Technical Architect (immediate), Delivery Lead (medium-term), Client + Delivery Lead (long-term)

**Resources Required**: Pre-configured backup platform account, API keys, monitoring dashboards

**Timeline**: Failover within 4 hours, full assessment within 1 week

### Early Warning Indicators

Early warning indicators are metrics or signals that predict risk materialization before it happens. Monitor these weekly.

#### Content Risk Indicators

| Indicator | Green | Yellow | Red | Action |
|-----------|-------|--------|-----|--------|
| Content audit completion | 80%+ pages scored | 50-79% pages scored | <50% pages scored | Escalate to client content lead |
| Average content quality score | 70+ / 100 | 50-69 / 100 | <50 / 100 | Reduce pilot scope or delay pilot |
| Content approval cycle time | <48 hours | 48-72 hours | >72 hours | Flag bottleneck in steering meeting |

#### Technical Risk Indicators

| Indicator | Green | Yellow | Red | Action |
|-----------|-------|--------|-----|--------|
| API uptime (client systems) | >99% | 95-99% | <95% | Implement caching/fallback |
| LLM API latency (p95) | <2 seconds | 2-5 seconds | >5 seconds | Optimize prompts or switch model |
| Token cost per query | Within budget | 10-25% over budget | >25% over budget | Implement token budgeting/circuit breakers |
| Hallucination rate | <5% | 5-10% | >10% | Strengthen grounding/citations |

#### Organizational Risk Indicators

| Indicator | Green | Yellow | Red | Action |
|-----------|-------|--------|-----|--------|
| Steering meeting attendance | 80%+ attendees | 60-79% attendees | <60% attendees | Re-engage executive sponsor |
| Client SME availability | As planned | 75% of planned hours | <75% of planned hours | Escalate resourcing issue |
| Decision approval time | <3 days | 3-7 days | >7 days | Escalate decision authority |

**Monitoring Cadence**: Review all indicators in weekly status meeting. Update risk register when any indicator moves from Green to Yellow or Yellow to Red.

### Escalation Triggers and Paths

Define clear triggers for when to escalate, and to whom.

#### Escalation Trigger Definitions

**Level 1 - Team Escalation** (Delivery Lead + Client Project Manager):
- Any Yellow indicator that doesn't improve within 1 week
- Any dependency that shifts from "On Track" to "At Risk"
- Any minor scope change request

**Level 2 - Steering Committee Escalation**:
- Any Red indicator
- Any dependency that shifts from "At Risk" to "Blocked" for more than 3 days
- Any scope change impacting timeline or budget by more than 10%
- Any stakeholder conflict that cannot be resolved at team level

**Level 3 - Executive Sponsor Escalation**:
- Multiple Red indicators persisting for more than 1 week
- Any issue that threatens engagement success or timeline by more than 2 weeks
- Any escalation requiring budget increase or contract amendment
- Any irresolvable conflict between steering committee members

**Escalation SLA**: Escalated issues must be acknowledged within 24 hours and resolved (or further escalated) within 72 hours.

---

## 11.4 Escalation Framework

### Escalation Levels and Authority

| Level | Audience | Authority | Typical Issues |
|-------|----------|-----------|----------------|
| **Level 0** | Delivery Team | Tactical decisions within defined scope | Sprint planning, task allocation, technical implementation details |
| **Level 1** | Delivery Lead + Client PM | Minor scope adjustments, resource re-allocation | Dependency delays, minor technical blockers, SME availability |
| **Level 2** | Steering Committee | Scope changes, timeline adjustments, risk mitigation | Blocked dependencies, technical architecture changes, multi-week delays |
| **Level 3** | Executive Sponsors | Budget changes, contract amendments, engagement success/failure | Fundamental scope pivot, resourcing crisis, irresolvable conflicts |

**Escalation Path Diagram**:

```
┌─────────────────────────────────────────────────────────────┐
│                      LEVEL 3                                │
│                 Executive Sponsors                          │
│         (Budget, Contract, Strategic Decisions)             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Escalate if unresolved
                         │ within 72 hours
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      LEVEL 2                                │
│                 Steering Committee                          │
│      (Scope, Timeline, Architecture Changes)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Escalate if unresolved
                         │ within 72 hours
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      LEVEL 1                                │
│            Delivery Lead + Client PM                        │
│         (Dependencies, Minor Blockers)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Escalate if unresolved
                         │ within 24 hours
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      LEVEL 0                                │
│                  Delivery Team                              │
│            (Day-to-Day Execution)                           │
└─────────────────────────────────────────────────────────────┘
```

### Communication Protocols

#### Escalation Email Template

**Subject**: [ESCALATION - Level X] [Brief Description]

**To**: [Appropriate level recipients]

**CC**: [Stakeholders who need visibility]

**Priority**: High

**Body**:

**Issue Summary**: [1-2 sentence description of the issue]

**Impact**: [How this affects timeline, scope, budget, or quality]

**Root Cause**: [What caused this issue, if known]

**Actions Taken**: [What the team has already tried]

**Decision Required**: [Specific decision or action needed from recipient]

**Deadline**: [When decision is needed to avoid further impact]

**Recommended Path Forward**: [Team's recommendation]

**Example**:

**Subject**: [ESCALATION - Level 2] Product API Integration Blocked

**To**: Steering Committee (Jane Executive Sponsor, Bob Client IT Lead, Sarah Delivery Lead)

**CC**: Project Team

**Priority**: High

**Issue Summary**: Integration with client product API is blocked due to security review process that was not anticipated in original timeline.

**Impact**: 1-week delay to Phase 2 (Data Foundation) completion. Pilot start date shifts from March 1 to March 8.

**Root Cause**: Client security policy requires formal review for any external system accessing product data. This review typically takes 2 weeks and was not included in dependency checklist.

**Actions Taken**: Delivery team submitted security review request on Feb 1. Followed up daily with security team. Explored alternative data sources (product feed export) but these lack real-time pricing required for agent.

**Decision Required**:
1. Can security review be expedited?
2. If not, do we accept 1-week delay to pilot, or explore alternative scope (e.g., pilot with cached product data)?

**Deadline**: Decision needed by Feb 15 to avoid further timeline impact.

**Recommended Path Forward**: Accept 1-week delay. Use delay week to advance content strategy work that was originally planned for later phase.

### Decision-Making Timelines

| Decision Type | Required Level | SLA | Format |
|---------------|----------------|-----|--------|
| **Tactical Implementation** | Level 0 | Same day | Slack or standup |
| **Minor Scope Adjustment** | Level 1 | 2 business days | Email or quick call |
| **Scope/Timeline Change** | Level 2 | 5 business days | Steering meeting |
| **Budget/Contract Change** | Level 3 | 10 business days | Formal amendment |

**Decision Documentation**: All Level 2 and Level 3 decisions must be documented in meeting minutes or email and shared with all steering committee members.

### Resolution Tracking

Track escalations in a simple log updated weekly:

| ID | Date Raised | Issue | Level | Owner | Status | Resolution Date | Outcome |
|----|-------------|-------|-------|-------|--------|-----------------|---------|
| ESC-001 | 2024-02-01 | API security review blocking integration | 2 | Bob IT Lead | Resolved | 2024-02-10 | Expedited review; 3-day delay only |
| ESC-002 | 2024-02-15 | Content quality below threshold | 2 | Jane Sponsor | Open | - | Client adding content resource |
| ESC-003 | 2024-02-20 | LLM platform cost 30% over budget | 3 | Sarah Delivery Lead | Open | - | Evaluating options |

**Status Definitions**:
- **Open**: Escalation raised, awaiting decision or action
- **In Progress**: Decision made, action being executed
- **Resolved**: Issue resolved, no further action needed
- **Closed - Workaround**: Issue not resolved but alternative path identified

**Review Cadence**: Review escalation log in every steering committee meeting. Close resolved items. Escalate up if open items exceed SLA.

---

## 11.5 Anti-Patterns to Avoid

Anti-patterns are common mistakes that lead to poor outcomes. Learn from these to avoid repeating them.

### Common Delivery Anti-Patterns

#### Anti-Pattern: Skipping Design Phase

**Problem**: Teams rush from kickoff straight into build to "show progress quickly." This leads to rework when fundamental design flaws are discovered mid-build.

**Why It Happens**: Pressure to show tangible output early, underestimating complexity of GEO architecture

**Consequences**:
- Technical debt from architecture shortcuts
- Costly rework in later phases
- Timeline delays of 2-4 weeks overall

**How to Recognize**:
- Client pushes to "start building immediately"
- No formal architecture document created and approved
- Team jumps into coding before integration contracts are defined

**Correction**:
- Insist on 2-week Phase 0 (Design) minimum
- Require signed architecture document before build begins
- Show client that 2 weeks up front saves 4+ weeks later

**Success Story**: One client initially resisted design phase. Team demonstrated that without API contract definition, 40% of build sprint would be rework. Client approved design phase and engagement delivered on time.

#### Anti-Pattern: Compressed Pilot Period

**Problem**: Pilot period shortened to less than 3 weeks, providing insufficient data to demonstrate measurable impact.

**Why It Happens**: Pressure to "launch quickly," misunderstanding that GEO measurement requires weekly data collection cycles

**Consequences**:
- No measurable ROI to justify continued investment
- Results dismissed as "noise" rather than "signal"
- Client doesn't renew or expand program

**How to Recognize**:
- Client suggests "1-week pilot is enough"
- No discussion of statistical significance or measurement cycles
- Pilot scheduled to end right before executive readout

**Correction**:
- Educate client on measurement methodology: baseline week + 3 optimization weeks minimum
- Show example pilot data demonstrating week-over-week trend
- Explain that AI platforms refresh responses over days, not hours

**Reference**: See Chapter 8 (Success Metrics & Measurement) for pilot measurement methodology.

### Content Strategy Anti-Patterns

#### Anti-Pattern: Prompt Generation Without Content Backing

**Problem**: Creating a prompt bank of queries the brand cannot realistically rank for because corresponding content doesn't exist.

**Why It Happens**: Starting with "ideal" queries rather than working backwards from existing content capabilities

**Consequences**:
- Low baseline citation rates that don't improve (because there's nothing to cite)
- Wasted measurement spend tracking unwinnable queries
- Client concludes "GEO doesn't work for us"

**How to Recognize**:
- Prompt bank created before content audit
- Prompts based on keyword research, not actual content inventory
- Prompt bank includes 500+ prompts but client has less than 100 pages of content

**Correction**:
- Use content-first prompt derivation methodology (see abstractions.json)
- Start with content inventory, extract topics, then derive prompts
- Validate that 80%+ of prompts can be answered by existing content

**Reference**: See Chapter 3 (Prompt Bank Development) for content-first methodology.

#### Anti-Pattern: Optimizing for Single AI Platform

**Problem**: Building strategies or content that only work on ChatGPT (or Claude, or Perplexity) without considering platform portability.

**Why It Happens**: Focusing on current market leader, underestimating pace of platform evolution

**Consequences**:
- Brittle strategy that breaks when platform changes citation behavior
- Wasted investment if users shift to different platform
- Competitive disadvantage if competitor has platform-agnostic approach

**How to Recognize**:
- All measurement is on a single platform
- Content optimizations are platform-specific (e.g., "ChatGPT loves lists")
- No discussion of multi-platform strategy

**Correction**:
- Invest in platform-agnostic content quality: semantic structure, accurate information, authoritative sources
- Measure across 3+ platforms (ChatGPT, Claude, Perplexity, SGE)
- Use platform-specific tactics as supplementary, not primary, strategy

**Reference**: See Chapter 1 (Introduction to GEO) for platform-agnostic principles.

### Technical Anti-Patterns

#### Anti-Pattern: No Change Control

**Problem**: Accepting client scope changes without formal change request process, leading to unbounded scope creep.

**Why It Happens**: Desire to be "flexible" and "client-friendly," lack of governance maturity

**Consequences**:
- Timeline slips as team works on out-of-scope items
- Budget overruns from untracked effort
- Team burnout from constantly shifting priorities

**How to Recognize**:
- Client adds requirements in casual conversations or Slack messages
- No documentation of what's in scope vs. out of scope
- Team says "yes" to everything to avoid conflict

**Correction**:
- Implement lightweight change request process appropriate to engagement size (see Chapter 10: Change Management)
- Document baseline scope clearly in SOW
- Require written approval (even just email) for any scope change
- Track effort impact: "This change adds 1 week to timeline. Approve?"

**Reference**: See abstractions.json governance_categories for change management patterns.

#### Anti-Pattern: Insufficient Error Handling and Monitoring

**Problem**: Agent deployed without robust error handling, monitoring, or alerting infrastructure.

**Why It Happens**: Focus on "happy path" functionality, treating monitoring as "Phase 2" concern

**Consequences**:
- Silent failures that aren't detected until user reports issue
- No visibility into performance degradation
- Inability to diagnose issues when they occur

**How to Recognize**:
- No logging infrastructure defined in architecture
- Monitoring is "out of scope" for pilot
- Team doesn't know current agent error rate or latency

**Correction**:
- Treat observability as Day 1 requirement, not Phase 2 nice-to-have
- Implement structured logging, metrics, and alerting from first deployment
- Define SLOs (Service Level Objectives) during design phase
- Dashboard accessible to both delivery team and client

**Tooling Examples**: CloudWatch, Datadog, Grafana, Langfuse (for LLM observability)

### Governance Anti-Patterns

#### Anti-Pattern: Missing Knowledge Transfer

**Problem**: Delivery team completes build and pilot but doesn't transfer knowledge to client team, creating post-engagement dependency.

**Why It Happens**: Knowledge transfer treated as "nice to have" rather than deliverable, insufficient time allocated

**Consequences**:
- Client cannot operate or maintain solution
- Client dependent on delivery team for basic troubleshooting
- Client perceives solution as "black box"

**How to Recognize**:
- No knowledge transfer sessions scheduled in project plan
- Documentation is code comments only, no operational runbook
- Client team never sees system architecture or troubleshooting steps

**Correction**:
- Include knowledge transfer as formal deliverable in SOW
- Create operational runbook covering: architecture, deployment, monitoring, troubleshooting, FAQs
- Conduct formal training sessions (not just "show and tell")
- Offer office hours period (e.g., 2 weeks post-launch) for client questions

**Knowledge Transfer Template**:
1. **Architecture Walkthrough** (2 hours): High-level design, components, data flows
2. **Operational Training** (2 hours): How to deploy, monitor, troubleshoot
3. **Content Management Training** (2 hours): How to update content, refresh prompt bank, optimize for new queries
4. **Office Hours** (4 hours total over 2 weeks): On-call support for client questions

**Reference**: See abstractions.json governance_categories for knowledge transfer patterns.

#### Anti-Pattern: No Post-Go-Live Support Plan

**Problem**: Pilot ends and delivery team immediately disengages, leaving client unsupported during critical early operation period.

**Why It Happens**: Assumption that "pilot completion" means "engagement over"

**Consequences**:
- Issues discovered in first week of live operation go unresolved
- Client loses confidence in solution
- Opportunity for optimization based on real usage is lost

**Correction**:
- Include 1-week minimum "hypercare" period in SOW for POC engagements
- For enterprise engagements, define 4-week transition to managed services or client operations
- Schedule check-ins at 1 week, 2 weeks, and 1 month post-launch
- Document escalation path for post-launch issues

**Hypercare Period Activities**:
- Daily monitoring of system performance and errors
- Rapid response to client questions (4-hour SLA)
- Collection of optimization opportunities for future iterations
- Final knowledge transfer session incorporating lessons from live operation

---

## Risk Register Template

Use this template to maintain a living risk register throughout the engagement:

```markdown
# Risk Register - [Client Name] GEO Engagement

**Last Updated**: [Date]
**Owner**: [Delivery Lead Name]

## Active Risks

| ID | Risk | Category | Probability | Impact | Score | Mitigation | Owner | Status |
|----|------|----------|-------------|--------|-------|------------|-------|--------|
| R-001 | Product API lacks real-time pricing endpoint | Technical | High | High | 9 | Use cached pricing with refresh SLA | Tech Architect | Mitigating |
| R-002 | Content quality below threshold for 40% of pages | Content | Medium | High | 6 | Parallel content improvement track | Content Strategist | Monitoring |
| R-003 | Client SME availability reduced due to Q4 priorities | Organizational | High | Medium | 6 | Adjust sprint plan to reduce SME dependency | Delivery Lead | Mitigating |

**Score**: Probability (Low=1, Med=2, High=3) × Impact (Low=1, Med=2, High=3)

## Resolved Risks

| ID | Risk | Resolution | Date Resolved |
|----|------|------------|---------------|
| R-004 | Security review delay | Expedited through executive sponsor | 2024-02-10 |

## Risk Trend

| Week | New Risks | Resolved Risks | Active Risks | Avg Score |
|------|-----------|----------------|--------------|-----------|
| 2024-02-05 | 3 | 0 | 3 | 7.0 |
| 2024-02-12 | 1 | 1 | 3 | 6.3 |
```

**Review Cadence**: Update risk register weekly. Review in steering committee meetings bi-weekly.

---

## Next Steps

**Immediate Actions**:
1. **Create Risk Register**: Initialize risk register template during Phase 0 kickoff
2. **Complete Dependency Checklist**: Review pre-engagement checklist with client before SOW signature
3. **Define Escalation Path**: Document escalation levels and contacts in project charter
4. **Identify Top 3 Risks**: During first week of engagement, identify and mitigate top 3 risks

**Ongoing Activities**:
- Review risk register weekly in team status meetings
- Track dependencies in every client touchpoint
- Monitor early warning indicators and escalate Yellow/Red status promptly
- Document lessons learned when risks materialize (or are successfully mitigated)

**Related Chapters**:
- **Chapter 9 (Stakeholder Engagement)**: Governance structure and stakeholder management to prevent organizational risks
- **Chapter 10 (Change Management)**: Formal change control process to manage scope risks
- **Chapter 8 (Success Metrics & Measurement)**: Measurement methodology that mitigates pilot timeline risks
- **Appendix C (Templates & Checklists)**: Additional risk management templates and tools

**Key Principle**: Risk management is not a Phase 0 activity—it's a continuous practice throughout the engagement lifecycle. The teams that succeed are those that make risks visible early, mitigate proactively, and escalate decisively when needed.
