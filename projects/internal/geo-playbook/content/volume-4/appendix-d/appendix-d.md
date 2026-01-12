# Appendix D: Worksheets & Templates

This appendix provides ready-to-use templates for GEO program management, measurement, and governance. Each template includes field definitions, sample data, and implementation guidance. Copy these formats directly into your preferred tools (spreadsheets, project management platforms, or collaboration software) and customize for your specific engagement.

## D.1 Prompt Bank Template

The prompt bank is the foundation of GEO measurement. It defines which queries you track across AI platforms to measure citation rate, share of voice, and brand sentiment.

### Column Definitions

| Column Name | Data Type | Required | Description |
|------------|-----------|----------|-------------|
| prompt_id | String | Yes | Unique identifier (format: PB-[category]-[number]) |
| query_text | String | Yes | The actual prompt/question as a user would ask it |
| intent_category | String | Yes | Primary intent: Navigational, Informational, Commercial, Transactional |
| sub_category | String | Yes | Specific topic or product category |
| funnel_stage | String | Yes | Awareness, Consideration, Decision, Retention |
| priority | Integer | Yes | 1 (High), 2 (Medium), 3 (Low) |
| content_url | String | Optional | URL of owned content that should rank for this prompt |
| expected_citation | Boolean | Optional | TRUE if brand should be cited for this query |
| competitor_relevant | Boolean | Optional | TRUE if tracking competitor SOV for this query |
| created_date | Date | Yes | Date prompt was added to bank |
| last_updated | Date | Yes | Date of last modification |
| tags | String | Optional | Comma-separated tags for filtering |
| notes | String | Optional | Context or special tracking instructions |

### Validation Rules

**Required Field Validation:**
- `prompt_id`: Must match pattern "PB-[A-Z]+-[0-9]+"
- `query_text`: Minimum 10 characters, maximum 500 characters
- `intent_category`: Must be one of: Navigational, Informational, Commercial, Transactional
- `priority`: Must be 1, 2, or 3

**Data Quality Rules:**
- No duplicate `prompt_id` values
- No duplicate `query_text` values (case-insensitive)
- All prompts should be conversational and natural (avoid keyword strings)
- Each priority level should represent 20-40% of total bank
- Minimum 60% of prompts should have `content_url` mapped

### Sample Data

| prompt_id | query_text | intent_category | sub_category | funnel_stage | priority | content_url | expected_citation | competitor_relevant |
|-----------|------------|-----------------|--------------|--------------|----------|-------------|-------------------|---------------------|
| PB-RUN-001 | What are the best running shoes for marathon training? | Commercial | Running Shoes | Consideration | 1 | /collections/marathon-shoes | TRUE | TRUE |
| PB-RUN-002 | How do I choose running shoes for flat feet? | Informational | Running Shoes | Awareness | 1 | /guides/flat-feet-running | TRUE | FALSE |
| PB-RUN-003 | Compare Nike Pegasus vs Adidas Ultraboost for daily training | Commercial | Running Shoes | Decision | 1 | /products/pegasus-40 | TRUE | TRUE |
| PB-APP-004 | What features should I look for in a running app? | Informational | Mobile App | Awareness | 2 | /app/features | TRUE | FALSE |
| PB-APP-005 | How accurate is Nike Run Club for tracking pace? | Informational | Mobile App | Consideration | 2 | /app/accuracy | TRUE | TRUE |
| PB-GEN-006 | What brand makes the most durable athletic wear? | Commercial | General Brand | Awareness | 1 | /about/quality | TRUE | TRUE |
| PB-SUS-007 | Which athletic brands use sustainable materials? | Informational | Sustainability | Awareness | 2 | /sustainability/materials | TRUE | TRUE |
| PB-NAV-008 | Nike return policy | Navigational | Customer Service | Decision | 3 | /customer-service/returns | TRUE | FALSE |
| PB-PRO-009 | Best basketball shoes for outdoor courts | Commercial | Basketball Shoes | Consideration | 1 | /collections/outdoor-basketball | TRUE | TRUE |
| PB-PRO-010 | How to clean white sneakers without damaging them | Informational | Shoe Care | Retention | 2 | /guides/sneaker-care | TRUE | FALSE |

### Import/Export Formats

**CSV Export Format:**
```csv
prompt_id,query_text,intent_category,sub_category,funnel_stage,priority,content_url,expected_citation,competitor_relevant,created_date,last_updated,tags,notes
PB-RUN-001,"What are the best running shoes for marathon training?",Commercial,"Running Shoes",Consideration,1,/collections/marathon-shoes,TRUE,TRUE,2025-01-15,2025-01-15,"running,marathon,shoes","Track against Adidas, Brooks, Hoka"
```

**JSON Export Format:**
```json
{
  "prompt_bank": {
    "version": "1.0",
    "generated_date": "2025-01-15",
    "total_prompts": 400,
    "prompts": [
      {
        "prompt_id": "PB-RUN-001",
        "query_text": "What are the best running shoes for marathon training?",
        "intent_category": "Commercial",
        "sub_category": "Running Shoes",
        "funnel_stage": "Consideration",
        "priority": 1,
        "content_url": "/collections/marathon-shoes",
        "expected_citation": true,
        "competitor_relevant": true,
        "created_date": "2025-01-15",
        "last_updated": "2025-01-15",
        "tags": ["running", "marathon", "shoes"],
        "notes": "Track against Adidas, Brooks, Hoka"
      }
    ]
  }
}
```

### Usage Instructions

1. **Initial Setup**: Start with 400-500 prompts for pilot measurement
2. **Content-First Approach**: Derive prompts from existing owned content using the methodology in Chapter 3
3. **Distribution Target**: 40% Awareness, 30% Consideration, 20% Decision, 10% Retention
4. **Weekly Maintenance**: Review and update prompts based on measurement results and content changes
5. **Expansion**: Add 50-100 prompts monthly as content library grows and new topics emerge

---

## D.2 Content Audit Template

The content audit identifies existing content assets, evaluates their GEO readiness, and surfaces gaps in coverage for key topics and entities.

### Template Structure

| URL | Page Title | Content Type | Primary Topic | Intent Category | Funnel Stage | Word Count | Structured Data | Quality Score | GEO Readiness | Gap Identified | Priority Action |
|-----|------------|--------------|---------------|-----------------|--------------|------------|-----------------|---------------|---------------|----------------|-----------------|
| /products/pegasus-40 | Nike Air Zoom Pegasus 40 | Product Detail | Running Shoes | Commercial | Decision | 350 | Product Schema | 85 | High | Missing FAQs | Add FAQ schema |
| /guides/marathon-training | Complete Marathon Training Guide | Guide | Running Training | Informational | Awareness | 2400 | Article Schema | 90 | High | None | Maintain |
| /collections/running-shoes | Running Shoes Collection | Category | Running Shoes | Commercial | Consideration | 180 | None | 60 | Medium | No structured data | Add CollectionPage schema |
| /blog/running-form-tips | 5 Tips for Better Running Form | Blog Post | Running Technique | Informational | Awareness | 850 | None | 55 | Low | Thin content, no schema | Expand + add schema |
| /app/features | Nike Run Club Features | App Marketing | Mobile App | Informational | Consideration | 420 | SoftwareApplication | 75 | Medium | Missing user reviews | Add Review schema |

### Field Definitions

**URL**: Full path of the content (relative or absolute)

**Page Title**: H1 or primary heading of the page

**Content Type**: Product Detail, Category, Guide, Blog Post, Landing Page, FAQ, About, etc.

**Primary Topic**: Main subject matter (use consistent taxonomy)

**Intent Category**: Navigational, Informational, Commercial, Transactional

**Funnel Stage**: Awareness, Consideration, Decision, Retention

**Word Count**: Total word count of main content (excluding navigation/footer)

**Structured Data**: Schema.org types present (Product, Article, FAQPage, etc.) or "None"

**Quality Score**: 0-100 based on criteria below

**GEO Readiness**: High (80+ quality score + structured data), Medium (60-79 or missing schema), Low (<60)

**Gap Identified**: Specific deficiency preventing GEO optimization

**Priority Action**: Recommended next step to improve GEO readiness

### Quality Scoring Criteria

Evaluate each page on a 100-point scale:

**Content Quality (40 points)**
- Comprehensive coverage of topic: 15 points
- Unique value vs. competitors: 10 points
- Natural language and readability: 10 points
- Regular updates/freshness: 5 points

**Technical Implementation (30 points)**
- Appropriate structured data: 15 points
- Semantic HTML structure: 10 points
- Internal linking: 5 points

**User Value (30 points)**
- Actionable information: 10 points
- Clear organization: 10 points
- Supporting media (images, videos): 10 points

### Gap Identification Guide

Common gaps to flag:

- **Missing Structured Data**: High-value pages without appropriate schema markup
- **Thin Content**: Pages under 300 words for informational content
- **Keyword-Stuffed**: Content optimized for traditional SEO, not natural language
- **Outdated Information**: Content over 12 months old without recent updates
- **No Clear Topic**: Page lacks focused subject matter or tries to cover too many topics
- **Missing Attribution**: Claims without sources or citations
- **Poor Internal Linking**: Isolated content not connected to related pages

### Usage Instructions

1. **Scope Definition**: Start with top 100 pages by traffic, then expand to full site
2. **Automated Collection**: Use crawling tools to gather URL, title, word count, structured data
3. **Manual Assessment**: Quality scoring requires human evaluation
4. **Gap Prioritization**: Focus on high-traffic, high-intent pages first
5. **Action Planning**: Group similar gaps for batch optimization (e.g., all pages missing FAQ schema)

---

## D.3 RACI Template

The RACI matrix clarifies accountability for GEO engagement activities across client and delivery teams. Use this to prevent confusion and ensure every task has a clear owner.

### RACI Key

- **R** - Responsible: Does the work
- **A** - Accountable: Owns the outcome (only one A per activity)
- **C** - Consulted: Provides input before action
- **I** - Informed: Notified of progress/decisions

### Sample RACI for GEO Engagement

| Activity Category | Specific Activity | Delivery Lead | GEO Strategist | Content Strategist | Technical Architect | AI/ML Engineer | Data Engineer | Client PM | Client Content | Client IT | Client Legal |
|-------------------|-------------------|---------------|----------------|--------------------|--------------------|----------------|---------------|-----------|----------------|-----------|--------------|
| **Program Management** | Weekly status reporting | A | C | C | C | I | I | I | I | I | - |
| | Risk & issue management | A | R | R | R | R | R | C | I | I | - |
| | Change request approval | C | C | C | C | I | I | A | C | C | C |
| **Discovery & Design** | Prompt bank creation | I | A | R | I | I | I | C | C | - | - |
| | Content audit execution | I | C | A | I | - | - | C | R | - | - |
| | Architecture design | I | A | I | R | C | C | C | - | C | - |
| **Development** | Agent development | I | C | C | C | A | R | I | I | C | - |
| | Data pipeline build | I | I | I | C | C | A | I | I | C | - |
| | Content optimization | I | A | R | I | I | I | C | C | - | - |
| **Testing & QA** | Functional testing | C | I | I | R | R | R | I | - | C | - |
| | UAT coordination | A | C | C | C | I | I | R | R | R | - |
| **Measurement** | Platform integration | I | A | I | R | C | I | C | - | C | - |
| | Baseline measurement | I | A | R | I | I | I | C | I | - | - |
| | Weekly scans | I | R | R | I | I | I | I | I | - | - |
| | Performance analysis | I | A | R | C | I | I | C | I | - | - |
| **Launch & Support** | Production deployment | C | I | I | A | C | R | C | - | R | - |
| | Runbook creation | I | R | R | R | R | R | C | I | C | - |
| | Knowledge transfer | A | R | R | R | I | I | R | R | R | - |
| | Post-launch monitoring | I | A | C | C | R | R | C | I | C | - |
| **Governance** | Legal/compliance review | C | C | I | I | - | - | C | I | I | A |
| | Budget management | A | I | I | I | I | I | C | - | - | - |
| | Stakeholder communication | A | C | C | C | I | I | R | I | I | I |

### Customization Guidance

**Adjust for Engagement Size:**
- **POC/Pilot**: Combine roles (e.g., GEO Strategist may also handle Content Strategy)
- **Enterprise**: Add specialized roles (QA Lead, Security Architect, etc.)
- **Managed Services**: Shift more R/A to delivery team, client becomes primarily C/I

**Client Organizational Variations:**
- **Client has dedicated GEO team**: They become R for optimization activities
- **Client has no technical resources**: Delivery team takes more R, client provides C/I
- **Multiple client stakeholders**: Break "Client PM" into Brand, Product, Marketing roles

**Activity Customization:**
- Add platform-specific activities (e.g., "AWS infrastructure provisioning")
- Include industry-specific requirements (e.g., "HIPAA compliance validation" for healthcare)
- Add activities from your project plan not covered in this template

### Usage Instructions

1. **Initial Draft**: Delivery Lead creates RACI in Week 1 of engagement
2. **Client Review**: Walk through matrix in kickoff meeting, adjust based on feedback
3. **Sign-Off**: Both parties approve final RACI before Phase 1 begins
4. **Maintenance**: Update when roles change or scope expands
5. **Reference**: Use in status meetings to clarify ownership when questions arise

---

## D.4 Status Report Template

Weekly status reports maintain alignment between delivery and client teams, surface risks early, and track progress against plan.

### Executive Summary Section

**Project Name**: [GEO Pilot Implementation - Client Name]
**Reporting Period**: [Start Date] - [End Date]
**Overall Status**: [Green/Yellow/Red]
**Phase**: [Current Phase Number and Name]

**This Week's Key Accomplishments:**
- [Major milestone completed]
- [Significant deliverable shipped]
- [Key decision made or blocker resolved]

**Next Week's Priorities:**
- [Critical path activity 1]
- [Critical path activity 2]
- [Key decision needed]

**Status Indicators:**
- Schedule: [Green/Yellow/Red] - [On track / 2 days behind due to X / 1 week behind, recovery plan in place]
- Budget: [Green/Yellow/Red] - [Within 5% of plan / 10% variance, investigating / Requires CR-004 approval]
- Scope: [Green/Yellow/Red] - [No changes / Minor additions via email approval / Major change pending]
- Quality: [Green/Yellow/Red] - [All tests passing / 2 open defects / Critical bug blocking progress]
- Risks: [Green/Yellow/Red] - [All mitigated / 1 high risk needs attention / 2 critical risks escalated]

### Progress Tracking Section

| Phase | Planned Start | Actual Start | Planned End | Forecast End | Completion % | Status |
|-------|---------------|--------------|-------------|--------------|--------------|--------|
| Phase 0: Design | 2025-01-06 | 2025-01-06 | 2025-01-17 | 2025-01-17 | 100% | Complete |
| Phase 1: Mobilization | 2025-01-20 | 2025-01-20 | 2025-01-24 | 2025-01-24 | 100% | Complete |
| Phase 2: Data Foundation | 2025-01-27 | 2025-01-27 | 2025-02-07 | 2025-02-07 | 85% | In Progress |
| Phase 3: Core Build | 2025-02-10 | - | 2025-02-28 | 2025-02-28 | 0% | Not Started |
| Phase 4: Measurement | 2025-03-03 | - | 2025-03-14 | 2025-03-14 | 0% | Not Started |
| Phase 5: Integration | 2025-03-17 | - | 2025-03-28 | 2025-03-28 | 0% | Not Started |
| Phase 6: Pilot Execution | 2025-03-31 | - | 2025-04-18 | 2025-04-18 | 0% | Not Started |

**Milestone Tracker:**

| Milestone | Target Date | Forecast Date | Status | Notes |
|-----------|-------------|---------------|--------|-------|
| Architecture approved | 2025-01-17 | 2025-01-17 | Complete | Signed off 1/17 |
| Prompt bank delivered | 2025-01-31 | 2025-01-31 | Complete | 425 prompts validated |
| Vector store configured | 2025-02-07 | 2025-02-07 | On Track | UAT scheduled 2/6 |
| Agent v1 functional | 2025-02-21 | 2025-02-21 | On Track | - |
| Baseline measurement | 2025-03-14 | 2025-03-14 | On Track | - |
| Pilot launch | 2025-03-31 | 2025-03-31 | On Track | - |

### Risk and Issue Log

**Open Risks:**

| Risk ID | Description | Impact | Probability | Severity | Mitigation Plan | Owner | Status |
|---------|-------------|--------|-------------|----------|-----------------|-------|--------|
| R-003 | Client API rate limits may throttle data ingestion | Schedule | Medium | Medium | Implement exponential backoff, request limit increase | Data Engineer | Mitigating |
| R-005 | LLM platform pricing changes during pilot | Budget | Low | High | Lock in pricing commitment before Phase 3 | Delivery Lead | Monitoring |
| R-007 | Client content team bandwidth for optimization | Quality | High | Medium | Prioritize top 20 pages, defer rest to Phase 2 | Content Strategist | Mitigating |

**Open Issues:**

| Issue ID | Description | Impact | Reported | Assigned To | Target Resolution | Status |
|----------|-------------|--------|----------|-------------|-------------------|--------|
| I-012 | Staging environment lacks VPC access for vector DB | Blocking | 2025-02-01 | Client IT | 2025-02-03 | In Progress |
| I-013 | Product feed missing brand attribute | Data Quality | 2025-02-02 | Data Engineer | 2025-02-05 | Investigating |

**Resolved This Week:**

| Issue ID | Description | Resolution | Resolved Date |
|----------|-------------|------------|---------------|
| I-010 | Duplicate prompts in initial bank | Deduped via case-insensitive match, reduced 450 to 425 | 2025-01-31 |
| I-011 | Schema.org validation errors on PDPs | Updated templates, validated on 5 test products | 2025-02-01 |

### Next Week Priorities

**Critical Path Items:**
1. Complete vector store UAT and migrate to production environment
2. Finalize agent tool definitions and integration contracts
3. Client approval on content optimization priority list (20 pages)

**Key Decisions Needed:**
- Approve CR-005: Add sentiment analysis to measurement scope (+$15K, +1 week)
- Select final LLM model (Claude vs GPT-4) for agent orchestration
- Confirm pilot launch date: keep 3/31 or shift to 4/7?

**Upcoming Meetings:**
- 2/5 10am: Vector Store UAT with client IT
- 2/6 2pm: Weekly Status Review
- 2/7 11am: Content Optimization Workshop

### Sample Full Status Report

**[Example for Week of Feb 3-7, 2025]**

**Project**: GEO Pilot - Nike Running
**Status**: Yellow (1 blocking issue, resolution in progress)
**Phase**: Phase 2 - Data Foundation (Week 2 of 2)

**Key Accomplishments:**
- Completed prompt bank with 425 validated prompts across all funnel stages
- Ingested 850K product records into vector store, embeddings generated
- Resolved schema validation errors on product detail pages

**Next Week:**
- Complete vector store UAT and production deployment
- Begin agent tool development (Phase 3 kickoff)
- Client content team workshop for optimization prioritization

**Budget**: Green (5% under forecast due to efficient nearshore allocation)
**Schedule**: Yellow (2-day slip on vector DB due to VPC access issue, no impact to Phase 3 start)
**Risks**: 1 High (content team bandwidth), mitigation plan approved

---

## D.5 Measurement Dashboard Template

The measurement dashboard tracks GEO performance metrics across AI platforms. While the exact implementation varies by platform (Tableau, Looker, Data Studio, etc.), this template defines the key metrics, structure, and update cadence.

### Dashboard Structure

**Page 1: Executive Overview**
- Timeframe selector (Last 7 days, Last 30 days, Last 90 days, Custom)
- Overall citation rate (current vs. baseline)
- Share of voice vs. top 3 competitors
- Trend line (week-over-week change)
- Top 5 performing topics
- Top 5 underperforming topics

**Page 2: Citation Performance**
- Citation rate by intent category (Navigational, Informational, Commercial, Transactional)
- Citation rate by funnel stage (Awareness, Consideration, Decision, Retention)
- Citation type breakdown (Direct URL, Inline attribution, Implicit reference)
- Citation rate by AI platform (ChatGPT, Perplexity, Claude, Gemini, etc.)
- Weekly citation trend (line chart)

**Page 3: Share of Voice**
- SOV by competitor (stacked bar chart)
- SOV trend over time (area chart)
- SOV by topic/category (heat map)
- Win/loss analysis (prompts where brand cited vs. not cited)

**Page 4: Content Performance**
- Top 20 pages by citation count
- Pages with declining citation rates
- Content gap analysis (high-priority prompts with no citation)
- Structured data coverage vs. citation rate correlation

**Page 5: Sentiment & Quality**
- Brand sentiment score (positive/neutral/negative)
- Sentiment trend over time
- Quality of response analysis (accurate vs. inaccurate brand information)
- Competitive positioning statements

### Key Metrics to Include

**Primary KPIs:**

| Metric | Definition | Calculation | Target |
|--------|------------|-------------|--------|
| Citation Rate | % of prompts where brand is cited | (Prompts with brand citation) / (Total prompts) × 100 | 40%+ for pilot |
| Share of Voice | % of citations brand receives vs. competitors | (Brand citations) / (Total citations in category) × 100 | Top 3 in category |
| Direct Citation Rate | % of citations with explicit URL reference | (Citations with URL) / (Total citations) × 100 | 25%+ |
| Average Rank Position | Average position when brand appears in list | Sum(position) / Count(citations) | Top 3 |
| Sentiment Score | Net sentiment of brand mentions | (Positive - Negative) / Total mentions × 100 | 60%+ positive |

**Secondary Metrics:**

| Metric | Definition | Update Frequency |
|--------|------------|------------------|
| Citation velocity | Week-over-week change in citation rate | Weekly |
| Topic coverage | % of tracked topics where brand cited | Weekly |
| Competitor gap | Percentage point difference vs. #1 competitor SOV | Weekly |
| Content ROI | Citation lift after optimization | Post-optimization |
| Platform diversity | Number of platforms citing brand | Weekly |

### Visualization Recommendations

**Citation Rate Trend (Line Chart)**
- X-axis: Week number
- Y-axis: Citation rate percentage
- Lines: Overall rate, by funnel stage (4 lines)
- Annotations: Mark content optimization deployments

**Share of Voice (Stacked Bar Chart)**
- X-axis: Week number or topic category
- Y-axis: Percentage (0-100%)
- Bars: Stacked by brand (client + 3-5 competitors)
- Highlight: Client brand in distinct color

**Content Performance (Table + Sparklines)**
- Columns: URL, Page Title, Citations (current week), Trend (7-week sparkline), Change (% vs. prior week)
- Sort: By citations descending
- Conditional formatting: Green for positive change, red for negative

**Sentiment Distribution (Donut Chart)**
- Segments: Positive, Neutral, Negative
- Center: Net sentiment score
- Drill-down: Click to see example mentions

### Update Frequency

**Weekly Scans (Core Measurement):**
- Run full prompt bank through measurement platform
- Update citation rates, SOV, sentiment scores
- Generate week-over-week delta reports
- Flag significant changes (>10% swing) for investigation

**Daily Monitoring (Optional for Enterprise):**
- Track subset of high-priority prompts (50-100)
- Monitor for significant events (viral content, competitor launches, etc.)
- Alert on anomalies

**Monthly Deep Dives:**
- Content performance analysis
- Prompt bank optimization (add/remove/modify prompts)
- Competitive landscape review
- Strategic recommendations

### Wireframe Description

```
+------------------------------------------------------------------+
|  GEO Performance Dashboard                    [Last 30 Days ▼]  |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+  +------------------+  +------------------+|
|  | Citation Rate    |  | Share of Voice   |  | Sentiment        ||
|  |      42.3%       |  |      31.2%       |  |      +68         ||
|  |   ▲ +5.2% WoW   |  |   ▲ +3.1% WoW   |  |   ▲ +4 WoW      ||
|  +------------------+  +------------------+  +------------------+|
|                                                                  |
|  Citation Rate Trend (Last 12 Weeks)                            |
|  +--------------------------------------------------------------+|
|  |                                                 ╱╲           ||
|  |                                        ╱╲      ╱  ╲          ||
|  |                               ╱╲      ╱  ╲    ╱    ╲         ||
|  |                      ╱╲      ╱  ╲    ╱    ╲  ╱      ╲        ||
|  | ___________╱╲_______╱__╲____╱____╲__╱______╲╱________╲______ ||
|  | W1  W2  W3  W4  W5  W6  W7  W8  W9  W10 W11 W12            ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  Share of Voice by Competitor          Top Performing Topics    |
|  +---------------------------+         +----------------------+ |
|  | Your Brand    [████░░░░░] 31%      | Marathon Training 78%| |
|  | Competitor A  [█████████░] 42%      | Running Shoes    65%| |
|  | Competitor B  [███░░░░░░░] 15%      | Injury Prevent   58%| |
|  | Competitor C  [██░░░░░░░░] 12%      | Nutrition        52%| |
|  +---------------------------+         | App Features     48%| |
|                                        +----------------------+ |
+------------------------------------------------------------------+
```

### Usage Instructions

1. **Setup**: Configure dashboard in measurement platform during Phase 4
2. **Baseline**: Capture Week 0 measurements before any optimization
3. **Weekly Cadence**: Run scans every Monday, review results in Tuesday status meeting
4. **Annotation**: Mark significant events (content launches, competitor activity) on trend charts
5. **Distribution**: Share executive summary with client stakeholders, detailed views with working team

---

## D.6 Change Request Template

Change requests document scope, schedule, or budget modifications that require approval beyond standard email communication. Use for any change with >$5K cost impact or >3 day schedule impact.

### Template Format

**CHANGE REQUEST #[Number]**

**Project**: [Project Name]
**Date Submitted**: [Date]
**Submitted By**: [Name, Role]
**Status**: [Draft / Pending Approval / Approved / Rejected / Deferred]

---

### Section 1: Request Information

**Change Title**: [Brief descriptive title]

**Change Category**:
- [ ] Scope Addition
- [ ] Scope Reduction
- [ ] Technical Approach
- [ ] Schedule Adjustment
- [ ] Resource Change
- [ ] Other: [Specify]

**Priority**:
- [ ] Critical (Blocking progress)
- [ ] High (Significant impact if not addressed)
- [ ] Medium (Valuable but not urgent)
- [ ] Low (Nice to have)

**Requested By**: [Client stakeholder name and role]

**Business Justification**:
[Why is this change needed? What business problem does it solve or opportunity does it enable?]

---

### Section 2: Detailed Description

**Current State**:
[What does the current scope/plan include regarding this area?]

**Proposed Change**:
[What specifically would change? Be explicit about additions, removals, or modifications.]

**Alternatives Considered**:
[What other options were evaluated? Why was this approach selected?]

---

### Section 3: Impact Assessment

**Scope Impact**:
- Deliverables Added: [List]
- Deliverables Removed: [List]
- Deliverables Modified: [List]

**Schedule Impact**:
- Phase(s) Affected: [List]
- Days Added to Timeline: [Number]
- New Completion Date: [Date]
- Critical Path Impact: [Yes/No, explain]

**Budget Impact**:
- Additional Costs: [Amount, breakdown by resource/expense]
- Cost Savings: [If applicable]
- Net Change: [Amount]

**Resource Impact**:
- Additional Hours Required: [By role]
- New Skills Needed: [List]
- Resource Availability: [Confirmed/To be confirmed]

**Risk Impact**:
- New Risks Introduced: [List with severity]
- Risks Mitigated: [List]
- Net Risk Change: [Positive/Negative/Neutral]

**Quality Impact**:
- Quality Improvements: [List]
- Quality Risks: [List]
- Testing Impact: [Additional testing required?]

**Dependencies**:
- Upstream Dependencies: [What must be completed first?]
- Downstream Dependencies: [What is blocked by this change?]
- External Dependencies: [Third-party deliverables needed?]

---

### Section 4: Approval Workflow

**Approval Required From**:
- [ ] Delivery Lead
- [ ] Technical Architect
- [ ] Client Project Manager
- [ ] Client Budget Owner
- [ ] Client Legal (if contract modification needed)
- [ ] Other: [Specify]

**Approval Routing**:

| Approver | Role | Date Sent | Date Responded | Decision | Comments |
|----------|------|-----------|----------------|----------|----------|
| [Name] | Delivery Lead | [Date] | [Date] | Approved / Rejected / Conditional | [Notes] |
| [Name] | Client PM | [Date] | [Date] | Approved / Rejected / Conditional | [Notes] |
| [Name] | Budget Owner | [Date] | - | Pending | - |

**Final Decision**: [Approved / Rejected / Deferred]
**Decision Date**: [Date]
**Implemented Date**: [Date change was executed]

---

### Section 5: Implementation Plan

**Tasks Required**:
1. [Specific task with owner and due date]
2. [Specific task with owner and due date]
3. [Specific task with owner and due date]

**Communication Plan**:
- [ ] Update project plan
- [ ] Update RACI
- [ ] Update budget tracker
- [ ] Notify extended team
- [ ] Update status report
- [ ] Other: [Specify]

**Rollback Plan** (if applicable):
[If this change is reversible, what is the process to undo it?]

---

### Sample Change Request

**CHANGE REQUEST #005**

**Project**: GEO Pilot - Nike Running
**Date Submitted**: 2025-02-10
**Submitted By**: Sarah Chen, GEO Strategist
**Status**: Approved

---

**Change Title**: Add Sentiment Analysis to Measurement Scope

**Change Category**: Scope Addition

**Priority**: High

**Requested By**: Michael Torres, VP of Brand Marketing (Client)

**Business Justification**:
Current measurement tracks citation rate and share of voice, but does not evaluate the quality or sentiment of how the brand is described by AI platforms. Client stakeholders need to understand not just if the brand is mentioned, but whether it's positioned positively, accurately, and competitively. This insight is critical for identifying content optimization opportunities and demonstrating brand health improvement.

---

**Current State**:
Measurement infrastructure tracks citation presence, rank position, and share of voice. Weekly reports show which prompts generate citations but do not analyze the tone or accuracy of the AI responses.

**Proposed Change**:
Add sentiment analysis and quality scoring to the measurement pipeline:
1. Classify each citation as positive/neutral/negative sentiment
2. Evaluate factual accuracy of brand information presented
3. Score competitive positioning (e.g., "better than," "similar to," "cheaper alternative to")
4. Add sentiment metrics to weekly dashboard and reports

**Alternatives Considered**:
- **Manual sentiment review**: Too time-intensive, limited to sample of prompts
- **Post-pilot addition**: Would miss baseline sentiment data, harder to measure improvement
- **Third-party sentiment API**: Evaluated but not tuned for brand context in AI responses

---

**Scope Impact**:
- Deliverables Added: Sentiment analysis model, quality scoring rubric, enhanced dashboard views
- Deliverables Removed: None
- Deliverables Modified: Measurement pipeline (add sentiment step), weekly reports (add sentiment section)

**Schedule Impact**:
- Phase(s) Affected: Phase 4 (Measurement)
- Days Added to Timeline: 5 days
- New Completion Date: Phase 4 end date moves from 3/14 to 3/21
- Critical Path Impact: No, pilot launch date (3/31) unchanged

**Budget Impact**:
- Additional Costs: $15,000 (30 hours ML Engineer for model tuning, 20 hours GEO Strategist for rubric development, 10 hours dashboard updates)
- Cost Savings: None
- Net Change: +$15,000

**Resource Impact**:
- Additional Hours Required: 30h ML Engineer, 20h GEO Strategist, 10h Data Engineer
- New Skills Needed: None (existing team capable)
- Resource Availability: Confirmed available

**Risk Impact**:
- New Risks Introduced: Sentiment model accuracy may require calibration period (Medium severity)
- Risks Mitigated: Better quality insights reduce risk of optimizing for citations without quality (High severity)
- Net Risk Change: Positive

**Dependencies**:
- Upstream Dependencies: Measurement pipeline integration (already in progress)
- Downstream Dependencies: None
- External Dependencies: None

---

**Approval Required From**:
- [x] Delivery Lead - Approved 2/11
- [x] Technical Architect - Approved 2/11
- [x] Client Project Manager - Approved 2/12
- [x] Client Budget Owner - Approved 2/13

**Final Decision**: Approved
**Decision Date**: 2025-02-13
**Implemented Date**: 2025-02-14 (work began Phase 4)

**Implementation Tasks**:
1. ML Engineer: Configure sentiment classifier, tune on 100 sample responses - Due 2/21
2. GEO Strategist: Develop quality scoring rubric with client input - Due 2/18
3. Data Engineer: Update measurement pipeline to include sentiment step - Due 2/25
4. GEO Strategist: Add sentiment visualizations to dashboard - Due 2/28

---

## D.7 Readout/Presentation Template

The final readout presents pilot results to client stakeholders and provides recommendations for next phases. This template structures the executive presentation.

### Slide Structure

**Slide 1: Title Slide**
- Project name: [GEO Pilot - Client Name]
- Presentation date
- Presenters (Delivery Lead, GEO Strategist)
- Audience (client stakeholders)

**Slide 2: Executive Summary**
- Pilot objective (1 sentence)
- Duration and scope
- Top 3 results (quantified)
- Primary recommendation

**Slide 3: Pilot Objectives Recap**
- What we set out to prove
- Success criteria defined at start
- Methodology overview (1-2 bullets)

**Slide 4-6: Results Overview**

*Slide 4 - Citation Performance*
- Baseline vs. end-of-pilot citation rate
- Visual: Before/after bar chart
- Callout: Percentage point improvement
- Context: vs. industry benchmark

*Slide 5 - Share of Voice*
- SOV by competitor at start and end
- Visual: Stacked bar showing shift
- Callout: Position vs. top competitor
- Trend: Week-over-week SOV growth

*Slide 6 - Content Impact*
- Number of pages optimized
- Citation lift on optimized pages
- Visual: Table of top 10 pages with improvement
- Callout: Best performer (specific page)

**Slide 7: By the Numbers**
- Total prompts tracked: [Number]
- AI platforms measured: [Number]
- Content pages optimized: [Number]
- Weeks of measurement: [Number]
- Citation rate improvement: [%]
- SOV improvement: [%]
- High-priority prompts with >50% citation rate: [Number]

**Slide 8-10: Key Insights**

*Slide 8 - What Worked*
- 3 tactics with strongest performance impact
- Evidence for each (data point)
- Example for each (specific page/prompt)

*Slide 9 - What Didn't Work*
- 2 tactics with limited impact
- Hypothesis for why
- Recommended course correction

*Slide 10 - Surprises*
- Unexpected finding #1
- Unexpected finding #2
- Implication for strategy

**Slide 11: Content Optimization ROI**
- Visual: Citation rate before/after optimization by content type
- Table: Effort (hours) vs. Impact (citation lift) by optimization type
- Callout: Highest ROI activity

**Slide 12: Competitive Landscape**
- SOV by competitor (current state)
- Gap to #1 competitor
- Opportunity areas (topics where competitors dominate)
- Visual: Heat map of SOV by topic and competitor

**Slide 13-14: Recommendations**

*Slide 13 - Immediate Next Steps (Next 30 Days)*
1. [Specific action with owner]
2. [Specific action with owner]
3. [Specific action with owner]

*Slide 14 - Phase 2 Roadmap (Next 90 Days)*
- Expand content optimization to [X] additional pages
- Add [New capability] to agent
- Extend measurement to [New area]
- Visual: Gantt chart or timeline

**Slide 15: Investment & Resourcing**
- Phase 2 estimated budget
- Required team structure
- Client resourcing needs
- Timeline and key milestones

**Slide 16: Questions & Discussion**

---

### Sample Executive Readout Format

**GEO Pilot Results - Nike Running**
**March 31, 2025**
**Presenters**: Amanda Park (Delivery Lead), Sarah Chen (GEO Strategist)

---

**Executive Summary**

Over 6 weeks, we optimized Nike Running's presence across 4 major AI platforms, tracking 425 prompts spanning the full customer journey from awareness to decision.

**Results**:
- Citation rate increased from 28% to 43% (+15 percentage points)
- Share of voice grew from 18% to 31%, moving Nike from #4 to #2 in competitive set
- Optimized content drove 3.2x higher citation rate than baseline content

**Recommendation**: Proceed to enterprise-scale implementation across all Nike product categories with priority on Basketball and Training.

---

**Pilot Objectives**

**Goal**: Validate that structured content optimization and agent architecture improve brand visibility in AI-powered product discovery.

**Success Criteria**:
- Achieve 40%+ citation rate on high-priority prompts
- Increase SOV by 10+ percentage points
- Demonstrate content optimization ROI (citation lift vs. effort)

**Methodology**: Content-first prompt derivation → Baseline measurement → Optimize 20 pages → Measure lift over 3 weeks

---

**Results: Citation Performance**

[Visual: Side-by-side bar chart]

**Baseline (Week 0)**: 28% citation rate
**End of Pilot (Week 6)**: 43% citation rate
**Improvement**: +15 percentage points (+54% relative improvement)

**Context**: Industry benchmark for retail brands: 35% citation rate
Nike Running is now **8 points above benchmark**

---

**Results: Share of Voice**

[Visual: Stacked horizontal bar chart showing Week 0 vs Week 6]

**Week 0**:
- Adidas: 38%
- Brooks: 24%
- Hoka: 20%
- Nike: 18%

**Week 6**:
- Adidas: 35%
- Nike: 31%
- Brooks: 19%
- Hoka: 15%

**Movement**: Nike climbed from #4 to #2, closing gap with Adidas from 20 points to 4 points

---

**Results: Content Impact**

**20 pages optimized** with structured data, enhanced Q&A content, and entity markup

**Citation lift on optimized pages**: +67% average (from 22% to 37%)

| Page | Baseline Citation % | Optimized Citation % | Lift |
|------|---------------------|----------------------|------|
| Marathon Training Guide | 35% | 78% | +43pt |
| Pegasus 40 PDP | 18% | 65% | +47pt |
| Running Shoe Buying Guide | 28% | 71% | +43pt |
| Injury Prevention Tips | 12% | 58% | +46pt |
| Running App Features | 25% | 62% | +37pt |

---

**By the Numbers**

- **425** prompts tracked across all funnel stages
- **4** AI platforms measured (ChatGPT, Perplexity, Claude, Gemini)
- **20** content pages optimized (PDPs, guides, category pages)
- **6** weeks of measurement (3 week baseline, 3 week optimized)
- **+15pt** citation rate improvement
- **+13pt** share of voice gain
- **82** high-priority prompts now achieving >50% citation rate (up from 23)

---

**Key Insights: What Worked**

**1. FAQ Schema + Natural Language Q&A**
- Pages with FAQ schema had 2.1x higher citation rate
- Example: Marathon Training Guide added 15 FAQs, citation rate went from 35% to 78%

**2. Product Attribute Structured Data**
- Detailed product schema (including sustainability, fit, use case) improved PDP citation 2.8x
- Example: Pegasus 40 PDP went from 18% to 65% after adding comprehensive attributes

**3. Entity Markup for Topics**
- Pages with clear topic entities (marked up via schema) surfaced 1.9x more often
- Example: "cushioning technology" entity markup helped Pegasus rank for cushioning-related prompts

---

**Key Insights: What Didn't Work**

**1. Keyword Density Optimization**
- Traditional SEO tactic of increasing keyword frequency had no measurable impact on AI citation
- Lesson: AI models prioritize semantic relevance over keyword matching

**2. Backlink Acquisition (Short-Term)**
- New backlinks added during pilot did not correlate with citation rate changes
- Hypothesis: AI models' knowledge bases don't update in real-time; offsite signals take longer to impact

---

**Key Insights: Surprises**

**1. Navigational Prompts Underperformed**
- Expected 80%+ citation on "Nike [product name]" prompts, actually achieved 52%
- Root cause: AI models often provide general category information before brand-specific results
- Implication: Can't rely on branded queries; must win category-level prompts

**2. Awareness-Stage Content Had Highest ROI**
- Top-of-funnel guides showed larger citation lift than product pages
- Hypothesis: Less competitive space, more opportunity to establish authority
- Implication: Prioritize educational content in Phase 2

---

**Content Optimization ROI**

[Visual: Scatter plot of Effort (hours) vs. Impact (citation lift %)]

**Highest ROI Activities**:
1. Add FAQ schema to existing guides: 3 hours → +35% citation lift
2. Enhance product attributes in schema: 2 hours per PDP → +28% citation lift
3. Add "How to Choose" sections to category pages: 5 hours → +24% citation lift

**Lower ROI Activities**:
1. Creating new blog posts: 8 hours → +8% citation lift
2. Extensive content rewrites: 6 hours → +12% citation lift

**Recommendation**: Focus Phase 2 on schema enhancement and structured Q&A, defer net-new content creation

---

**Competitive Landscape**

[Visual: Heat map showing SOV by topic (rows) and competitor (columns)]

**Current State**: Nike leads in "running apps" and "marathon training" topics, trails in "injury prevention" and "beginner running"

**Gap to Adidas**: 4 percentage points overall SOV, but 15+ point gap in "casual/lifestyle running" topic

**Opportunity Areas**:
- Beginner running content: Adidas 45% SOV, Nike 12%
- Trail running: Brooks 52% SOV, Nike 8%
- Sustainability: Hoka 38% SOV, Nike 22%

**Implication**: Targeted content creation in these topics could swing 8-10 points of SOV

---

**Recommendations: Immediate Next Steps**

**Next 30 Days**:

1. **Scale optimization to 100 pages** (current top traffic pages across Running category)
   Owner: Client Content Team with GEO Strategist support
   Estimated Impact: +8-10pt citation rate

2. **Implement automated schema validation** in CMS
   Owner: Client IT + Technical Architect
   Benefit: Prevent schema errors on new content

3. **Expand prompt bank to 1,000 prompts**
   Owner: GEO Strategist + Content Strategist
   Benefit: More comprehensive category coverage

---

**Recommendations: Phase 2 Roadmap**

**Next 90 Days**:

**Expand to Basketball & Training categories**
- Apply proven optimization playbook
- 200 additional pages optimized
- 800 new prompts added

**Build content gap closure pipeline**
- Create 15 new guides for high-opportunity, low-coverage topics
- Focus on beginner and sustainability topics

**Enhance agent capabilities**
- Add product comparison tool (vs. competitor products)
- Implement user review integration
- Enable multi-turn conversation optimization

[Visual: Timeline showing 3 parallel workstreams over 12 weeks]

---

**Investment & Resourcing**

**Phase 2 Budget Estimate**: $180,000

**Breakdown**:
- Content optimization (200 pages): $60K
- Agent enhancements: $50K
- Measurement expansion: $30K
- New content creation (15 guides): $40K

**Required Team**:
- Delivery Lead (25%)
- GEO Strategist (50%)
- Content Strategist (75%)
- AI/ML Engineer (40%)
- Data Engineer (25%)

**Client Resourcing Needs**:
- Content team: 1 FTE for 12 weeks (page optimization execution)
- IT/DevOps: 0.25 FTE (infrastructure support)
- Product team: 0.25 FTE (product data validation)

**Timeline**: 12 weeks (May 1 - July 31, 2025)

---

**Questions & Discussion**

[Open floor for stakeholder questions]

---

## Implementation Notes

**Template Customization**: Each template in this appendix is designed for copy-paste use but should be customized:
- Replace bracketed placeholders [like this] with actual project values
- Adjust columns and fields to match client taxonomy and organizational structure
- Modify approval workflows to align with client governance processes
- Scale complexity up or down based on engagement size (POC vs. enterprise)

**Tool Integration**: These templates work in:
- **Spreadsheets**: Google Sheets, Excel (best for prompt bank, content audit, RACI)
- **Project Management**: Jira, Asana, Monday (best for status reports, change requests)
- **BI Platforms**: Tableau, Looker, Power BI (best for measurement dashboard)
- **Presentations**: Google Slides, PowerPoint (best for readouts)

**Maintenance Cadence**:
- Prompt bank: Review weekly, update monthly
- Content audit: Update quarterly or after major site changes
- RACI: Review at phase transitions or when roles change
- Status report: Generate weekly
- Measurement dashboard: Update weekly, review in status meetings
- Change requests: Create as needed, archive when resolved
- Readout: Deliver at pilot end and major milestones

**Accessibility**: All templates use clear headers, consistent formatting, and logical structure to support screen readers and assistive technologies. Maintain these standards when customizing.

---

**End of Appendix D**

For related content, see:
- **Chapter 3**: Prompt bank creation methodology
- **Chapter 6**: Measurement and reporting strategies
- **Chapter 7**: Content optimization techniques
- **Appendix A**: Technology reference architectures
- **Appendix B**: Sample deliverables and artifacts
