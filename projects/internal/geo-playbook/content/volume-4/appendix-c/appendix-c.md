# Appendix C: Industry Templates

## Overview

This appendix provides industry-specific GEO implementation templates that adapt the core methodologies from Volume 1-3 to the unique characteristics, regulatory requirements, and customer behaviors of key vertical markets. Each template includes tailored prompt bank categories, content priorities, success metrics benchmarks, and industry-specific considerations.

Use these templates as starting points, adapting them to the specific needs of the client's business model, competitive landscape, and organizational maturity.

---

## C.1 Retail/CPG Template

### C.1.1 Industry-Specific GEO Challenges

Retail and consumer packaged goods brands face unique challenges in the AI-era discovery landscape:

**High Competition Density**
- Hundreds of competing brands per category
- Low differentiation in product attributes
- Price-focused consumer queries
- Generic product descriptions across competitors

**Product Catalog Complexity**
- Thousands to millions of SKUs
- Seasonal product turnover
- Regional availability variations
- Inventory volatility affecting recommendation accuracy

**Multi-Channel Attribution**
- Consumers research on AI, purchase in-store or marketplace
- Difficult to connect AI citations to revenue
- Third-party reviews shape AI perception more than owned content
- Marketplace data fragmentation (separate catalogs per platform)

**Agentic Commerce Disruption**
- AI agents may purchase generic equivalents instead of branded products
- Price comparison happens automatically at purchase moment
- Brand loyalty diminishes when agents optimize for value
- Subscription services vulnerable to agent-driven switching

### C.1.2 Key Query Categories

Retail GEO success requires coverage across four primary query patterns:

| Query Category | User Intent | Example Prompts | Content Requirements |
|----------------|-------------|-----------------|---------------------|
| Product Discovery | Finding options for a need | "best running shoes for plantar fasciitis", "eco-friendly cleaning products" | Category pages, buying guides, attribute-rich PDPs |
| Product Comparison | Evaluating specific options | "compare wireless earbuds under $150", "Nike Pegasus vs Adidas Ultraboost" | Detailed specifications, feature matrices, use case guidance |
| Purchase Guidance | Making buy decision | "is [product] worth the price", "where to buy [product] cheapest" | Reviews, value propositions, availability data |
| Usage Support | Post-purchase help | "how to care for leather shoes", "best settings for espresso machine" | How-to content, troubleshooting guides, maintenance tips |

### C.1.3 Content Priorities Matrix

Prioritize content development based on citation impact and business value:

| Content Type | Citation Impact | Business Value | Development Effort | Priority |
|--------------|-----------------|----------------|-------------------|----------|
| Product Detail Pages | High | High | Low (existing) | P0 |
| Category Hub Pages | High | Medium | Medium | P0 |
| Product Comparison Guides | Very High | High | High | P0 |
| Buying Guides by Use Case | Very High | Medium | High | P1 |
| Product Reviews (aggregated) | High | Medium | Low (syndicate) | P1 |
| How-To Content | Medium | Low | Medium | P2 |
| Editorial Content | Low | Low | High | P3 |

**P0 (0-30 days):** Essential for baseline GEO visibility
**P1 (30-90 days):** Improves competitive positioning
**P2 (90+ days):** Incremental gains, resource permitting
**P3 (Backlog):** Nice-to-have, low ROI

### C.1.4 Agentic Commerce Considerations

Prepare product data and content for agent-to-agent transactions:

**Structured Product Data Requirements**
- Complete attribute coverage (size, color, material, dimensions, weight)
- Real-time inventory status by location
- Dynamic pricing with promotion eligibility
- Shipping options and estimated delivery
- Compatibility and requirement information

**Agent-Friendly Content Patterns**
- Clear product hierarchies (category > subcategory > product > variant)
- Explicit feature vs benefit separation
- Use case mappings (problem → product)
- Substitute and complement relationships
- Machine-readable return policies and warranties

**Optimization Tactics**
- Implement structured data (Product, Offer, Review schemas)
- Provide API access for real-time agent queries
- Create comparison endpoints (competitive context)
- Maintain consistent SKU identifiers across platforms
- Enable subscription and bulk purchase options programmatically

### C.1.5 Sample Prompt Categories

A comprehensive retail prompt bank should include 400-600 prompts across these categories:

**Category 1: Branded Awareness (15% of bank)**
- "what is [brand] known for"
- "who owns [brand]"
- "where is [brand] made"
- "is [brand] sustainable"

**Category 2: Product Discovery (30% of bank)**
- "best [product category] for [use case]"
- "top rated [product type] under [price]"
- "[attribute] [product category] options"
- "alternatives to [competitor product]"

**Category 3: Product Comparison (25% of bank)**
- "compare [product A] vs [product B]"
- "differences between [model X] and [model Y]"
- "which is better [product A] or [product B] for [use case]"
- "[product] pros and cons"

**Category 4: Purchase Intent (20% of bank)**
- "is [product] worth buying"
- "where to buy [product]"
- "[product] price comparison"
- "when does [product] go on sale"

**Category 5: Support & Usage (10% of bank)**
- "how to use [product]"
- "how to clean [product]"
- "[product] troubleshooting"
- "[product] warranty information"

### C.1.6 Success Metrics Benchmarks

Typical performance ranges for retail/CPG GEO programs:

| Metric | Pilot Baseline | 90-Day Target | Mature Program |
|--------|---------------|---------------|----------------|
| Share of Voice (SOV) | 5-15% | 20-30% | 35-50% |
| Citation Rate | 15-25% | 35-45% | 50-65% |
| Sentiment Score | 60-70% | 75-85% | 85-95% |
| Brand Mention First | 10-20% | 25-35% | 40-55% |
| Product Visibility | 20-30% | 40-50% | 60-75% |

**Performance Factors:**
- Category competition level (higher competition = lower SOV ceiling)
- Content volume and quality (more unique content = higher citation rate)
- Review volume and recency (more recent reviews = better sentiment capture)
- Market leadership position (category leaders see 2-3x SOV vs challengers)

---

## C.2 Financial Services Template

### C.2.1 Industry-Specific GEO Challenges

Financial services organizations face heightened complexity due to regulatory constraints and trust requirements:

**Regulatory Compliance Requirements**
- Advertising disclosures required in AI responses
- FINRA/SEC review requirements for content
- Regional licensing and product availability restrictions
- Risk disclosure and suitability considerations

**Trust and Authority Barriers**
- High consequences of misinformation (financial harm)
- Consumer skepticism of AI financial advice
- Preference for human advisor validation
- Brand reputation vulnerabilities from AI hallucinations

**Product Complexity**
- Technical financial concepts difficult for LLMs to explain accurately
- Product variations by state, customer type, account balance
- Time-sensitive information (rates, markets, offers)
- Personalization requirements (advice depends on individual circumstances)

**Competitive Dynamics**
- Rate shopping dominates consumer queries
- Limited product differentiation in commoditized categories
- Aggregators and comparison sites capture early-funnel queries
- Regulatory constraints limit messaging differentiation

### C.2.2 Regulatory Considerations

GEO implementation in financial services requires additional governance:

**Content Review Requirements**
- All AI-facing content must complete compliance review
- Rate information must include effective date and disclosure
- Product descriptions require risk disclosure language
- Marketing claims require substantiation documentation

**Monitoring and Control**
- Regular audits of AI responses mentioning the brand
- Escalation process for inaccurate or non-compliant AI output
- Documentation of attempts to correct AI misinformation
- Legal review of prompt bank queries

**Disclosure Management**
- Structured data must include required disclosures
- Disclosure text must be machine-readable but human-understandable
- Links to full terms and conditions required
- Member FDIC, Equal Housing Lender, and similar badges

**Risk Mitigation**
- Avoid content that could be construed as personalized advice
- Generic information only (use "customers may" not "you should")
- Clear disclaimers that AI responses are not financial advice
- Monitoring for unauthorized use of brand in AI tools

### C.2.3 Key Query Categories

Financial services query patterns reflect information-seeking and comparison behaviors:

| Query Category | User Intent | Example Prompts | Content Requirements |
|----------------|-------------|-----------------|---------------------|
| Product Education | Understanding options | "what is a high yield savings account", "how do 401k loans work" | Educational content, product explainers, glossary |
| Rate Shopping | Finding best rates | "best mortgage rates today", "highest CD rates" | Real-time rate data, structured comparison tables |
| Product Comparison | Evaluating providers | "compare credit cards for travel rewards", "[bank] vs [bank] checking account" | Feature matrices, fee structures, benefit comparisons |
| Qualification | Determining eligibility | "credit score needed for mortgage", "can I open account online" | Eligibility criteria, requirement lists, application process |
| Problem Solving | Resolving issues | "how to dispute credit card charge", "forgot online banking password" | Support content, troubleshooting, contact information |

### C.2.4 Content Priorities Matrix

Financial services content development should prioritize trust-building and compliance:

| Content Type | Citation Impact | Business Value | Compliance Risk | Priority |
|--------------|-----------------|----------------|-----------------|----------|
| Product Pages (compliant) | High | High | High | P0 |
| Rate Tables (current) | Very High | High | Medium | P0 |
| Educational Guides | High | Medium | Low | P0 |
| Comparison Tools | Very High | High | High | P1 |
| FAQ Content | Medium | Medium | Medium | P1 |
| Calculator Tools | Medium | Medium | High | P2 |
| Market Commentary | Low | Low | High | P3 |

**Compliance Risk:** High = requires legal review; Medium = compliance review; Low = standard content review

### C.2.5 Sample Prompt Categories

A financial services prompt bank should include 500-700 prompts across these categories:

**Category 1: Product Awareness (20% of bank)**
- "what is [product type]"
- "how does [product] work"
- "who should use [product type]"
- "[product] benefits and drawbacks"

**Category 2: Rate Shopping (25% of bank)**
- "best [product] rates"
- "highest [account type] interest rates"
- "lowest [loan type] rates today"
- "[institution] rates vs [competitor]"

**Category 3: Product Comparison (20% of bank)**
- "compare [product A] vs [product B]"
- "[product type] comparison"
- "best [product type] for [use case]"
- "alternatives to [competitor product]"

**Category 4: Qualification & Requirements (15% of bank)**
- "requirements for [product]"
- "credit score needed for [product]"
- "how to qualify for [product]"
- "can I get [product] with [condition]"

**Category 5: Process & Support (15% of bank)**
- "how to apply for [product]"
- "how to [action] with [institution]"
- "where to [action]"
- "[problem] troubleshooting"

**Category 6: Advice & Guidance (5% of bank)**
- "should I [financial action]"
- "when to [financial action]"
- "is [financial product] worth it"
- "how much should I [save/invest/borrow]"

### C.2.6 Success Metrics Benchmarks

Financial services GEO benchmarks reflect higher trust requirements:

| Metric | Pilot Baseline | 90-Day Target | Mature Program |
|--------|---------------|---------------|----------------|
| Share of Voice (SOV) | 8-18% | 18-28% | 30-45% |
| Citation Rate | 20-30% | 35-50% | 55-70% |
| Sentiment Score | 65-75% | 80-90% | 90-98% |
| Accuracy Score | 70-80% | 85-95% | 95-99% |
| Rate Visibility | 40-50% | 60-70% | 75-85% |

**Performance Notes:**
- Accuracy Score: percentage of AI responses with correct product information
- Rate Visibility: percentage of rate queries where brand is mentioned
- Higher citation rates than retail due to limited authoritative sources
- Sentiment heavily influenced by customer service reputation and reviews

---

## C.3 Healthcare Template

### C.3.1 Industry-Specific GEO Challenges

Healthcare organizations face the most stringent content and regulatory requirements:

**Patient Safety Concerns**
- Misinformation can cause physical harm
- Liability for inaccurate medical information
- Self-diagnosis and self-treatment risks
- Medication interaction and dosage errors

**Regulatory Complexity**
- HIPAA compliance for any patient data
- FDA regulations for medical devices and drugs
- State medical board requirements for advice
- Advertising restrictions (no off-label promotion)

**Trust and Authority Requirements**
- Medical information requires physician authorship or review
- Source credibility heavily weighted by LLMs
- Preference for .gov, .edu, established medical sites
- Patient reviews and outcomes data influence AI perception

**Information Sensitivity**
- Symptom queries require careful, non-diagnostic language
- Treatment information must include risks and alternatives
- Provider recommendations must be geographically relevant
- Mental health content requires crisis resource inclusion

### C.3.2 Regulatory Considerations (HIPAA & Beyond)

Healthcare GEO requires comprehensive compliance integration:

**HIPAA Compliance**
- No patient information in prompt banks or content examples
- De-identified data only for analytics
- Secure handling of any health information in workflows
- Business Associate Agreements for GEO measurement platforms

**FDA Regulations**
- Medical device content must align with approved indications
- No off-label use promotion
- Adverse event reporting requirements apply to AI mentions
- Clinical claims require substantiation

**Medical Board Requirements**
- Content providing medical advice must be authored by licensed professionals
- Physician review and attestation for clinical content
- Credentials and qualifications must be machine-readable
- Scope of practice limitations by provider type

**Advertising Standards**
- No false or misleading health claims
- Disease-state education vs product promotion separation
- Fair balance (benefits and risks presented equally)
- Substantiation for comparative claims

### C.3.3 Key Query Categories

Healthcare queries span patient education, provider search, and clinical decision support:

| Query Category | User Intent | Example Prompts | Content Requirements |
|----------------|-------------|-----------------|---------------------|
| Symptom Research | Understanding symptoms | "what causes [symptom]", "is [symptom] serious" | Symptom guides (non-diagnostic), when-to-seek-care criteria |
| Condition Education | Learning about diagnosis | "what is [condition]", "how is [condition] treated" | Condition overviews, treatment options, prognosis information |
| Treatment Information | Exploring options | "treatments for [condition]", "[treatment] side effects" | Evidence-based treatment info, risk/benefit data, alternatives |
| Provider Search | Finding care | "best [specialist] near me", "[provider type] accepting new patients" | Provider directories, credentials, specialties, availability |
| Prevention & Wellness | Staying healthy | "how to prevent [condition]", "screening guidelines for [condition]" | Prevention guidance, screening recommendations, wellness tips |

### C.3.4 Content Priorities Matrix

Healthcare content prioritization balances visibility with safety and compliance:

| Content Type | Citation Impact | Patient Value | Compliance Risk | Priority |
|--------------|-----------------|---------------|-----------------|----------|
| Condition Overviews | Very High | Very High | Medium | P0 |
| Symptom Guides | Very High | High | High | P0 |
| Provider Directories | High | Very High | Low | P0 |
| Treatment Information | High | Very High | High | P1 |
| Prevention Content | Medium | High | Low | P1 |
| Procedure Explanations | Medium | High | Medium | P2 |
| Wellness Content | Low | Medium | Low | P3 |

**Compliance Risk Mitigation:**
- High Risk: Physician review + legal review required
- Medium Risk: Clinical review required
- Low Risk: Standard editorial review

### C.3.5 Trust and Authority Requirements

Healthcare GEO success depends on establishing and maintaining authority:

**Author Credentials**
- Physician authorship or review for clinical content
- Author bios with credentials, certifications, affiliations
- Structured data for author qualifications (Person schema)
- Regular review cycles (clinical content reviewed annually minimum)

**Content Quality Signals**
- Citations to peer-reviewed research
- Dates of publication and last review
- Editorial process transparency
- Conflict of interest disclosures

**Organizational Authority**
- Accreditations and certifications (Joint Commission, NCQA)
- Hospital rankings and quality measures
- Medical staff credentials and specialties
- Research and academic affiliations

**Patient Trust Factors**
- Patient experience ratings and reviews
- Quality outcomes data (when available)
- Patient education and shared decision-making resources
- Accessibility and language support

### C.3.6 Sample Prompt Categories

A healthcare prompt bank should include 600-800 prompts across these categories:

**Category 1: Symptom & Diagnosis (25% of bank)**
- "what causes [symptom]"
- "symptoms of [condition]"
- "when to see doctor for [symptom]"
- "is [symptom] normal"

**Category 2: Condition Education (20% of bank)**
- "what is [condition]"
- "how serious is [condition]"
- "[condition] prognosis"
- "living with [condition]"

**Category 3: Treatment Information (20% of bank)**
- "treatments for [condition]"
- "how to treat [condition]"
- "[treatment] side effects"
- "alternatives to [treatment]"

**Category 4: Provider Search (15% of bank)**
- "best [specialist] near [location]"
- "[specialist] accepting new patients"
- "how to choose [provider type]"
- "[provider name] reviews"

**Category 5: Prevention & Wellness (10% of bank)**
- "how to prevent [condition]"
- "[condition] screening guidelines"
- "risk factors for [condition]"
- "lifestyle changes for [condition]"

**Category 6: Healthcare Navigation (10% of bank)**
- "when to go to emergency room for [symptom]"
- "urgent care vs emergency room"
- "how to prepare for [procedure]"
- "what to expect during [procedure]"

### C.3.7 Success Metrics Benchmarks

Healthcare GEO metrics emphasize accuracy and authority over volume:

| Metric | Pilot Baseline | 90-Day Target | Mature Program |
|--------|---------------|---------------|----------------|
| Share of Voice (SOV) | 3-10% | 10-20% | 20-35% |
| Citation Rate | 10-20% | 25-40% | 45-60% |
| Accuracy Score | 85-90% | 95-98% | 98-99.5% |
| Authority Mention | 50-60% | 70-80% | 85-95% |
| Provider Visibility | 30-40% | 50-65% | 70-85% |

**Performance Notes:**
- Authority Mention: percentage of citations that include credentials or qualifications
- Lower SOV ceiling due to dominance of .gov and .edu sources
- Accuracy is paramount—must validate AI responses for clinical correctness
- Provider Visibility: local search results mentioning specific providers or organization

---

## C.4 Technology/SaaS Template

### C.4.1 Industry-Specific GEO Challenges

Technology and SaaS companies face unique GEO challenges driven by rapid innovation and technical audiences:

**Product Complexity**
- Technical products require detailed explanations
- Feature-rich platforms difficult to summarize
- Integration and compatibility considerations
- Technical specifications and API capabilities

**Rapid Change Velocity**
- Frequent product updates and new releases
- Deprecation of features and versions
- Competitive landscape shifts quickly
- LLM training data becomes stale rapidly

**Technical Audience Needs**
- Developer documentation is critical content
- Code examples and API references
- Architectural guidance and best practices
- Performance benchmarks and technical specifications

**Buyer Journey Complexity**
- Multiple stakeholders (technical, business, procurement)
- Long evaluation cycles (30-180 days typical)
- Proof-of-concept and trial requirements
- Security and compliance vetting

### C.4.2 Key Query Categories

Technology/SaaS queries reflect both high-level exploration and deep technical investigation:

| Query Category | User Intent | Example Prompts | Content Requirements |
|----------------|-------------|-----------------|---------------------|
| Product Discovery | Finding solutions | "best [category] tools", "tools for [use case]" | Category pages, use case guides, capability overviews |
| Product Comparison | Evaluating options | "[product] vs [competitor]", "[product] alternatives" | Feature comparison, pricing, integration capabilities |
| Technical Evaluation | Assessing fit | "[product] integrations", "[product] API capabilities" | Technical documentation, API references, architecture guides |
| Implementation | Getting started | "how to set up [product]", "[product] configuration guide" | Onboarding docs, quickstart guides, tutorials |
| Troubleshooting | Resolving issues | "[product] error [code]", "why isn't [feature] working" | Support docs, troubleshooting guides, known issues |

### C.4.3 Content Priorities Matrix

Technology/SaaS content strategy balances marketing and technical documentation:

| Content Type | Citation Impact | Business Value | Technical Depth | Priority |
|--------------|-----------------|----------------|-----------------|----------|
| Product Overview Pages | High | High | Low | P0 |
| Technical Documentation | Very High | High | Very High | P0 |
| Integration Guides | Very High | High | High | P0 |
| Feature Comparison Pages | Very High | Very High | Medium | P0 |
| API Reference | High | Medium | Very High | P1 |
| Use Case Guides | High | High | Low | P1 |
| Tutorial Content | Medium | Medium | Medium | P2 |
| Blog/Thought Leadership | Low | Low | Low | P3 |

**Technical Depth:** Very High = developers only; High = technical users; Medium = business + technical; Low = general audience

### C.4.4 Developer Documentation Considerations

Developer-focused content is uniquely important for technology GEO:

**Documentation Structure**
- Getting Started (installation, quickstart, first API call)
- Concepts (architecture, data models, authentication)
- Guides (common use cases, step-by-step tutorials)
- Reference (API endpoints, parameters, response schemas)
- Resources (SDKs, code samples, changelogs)

**Code Example Requirements**
- Multiple language support (Python, JavaScript, Java, etc.)
- Complete, runnable examples
- Inline comments explaining logic
- Error handling demonstrated
- Authentication patterns included

**API Reference Best Practices**
- OpenAPI/Swagger specification available
- Request/response examples for each endpoint
- Parameter descriptions with types and constraints
- Error code reference with resolution steps
- Rate limiting and pagination documentation

**Developer Experience Optimization**
- Searchable documentation
- Version-specific documentation (no mixed versions)
- Copy-to-clipboard code snippets
- Interactive API explorers
- SDK and library maintenance

### C.4.5 Sample Prompt Categories

A technology/SaaS prompt bank should include 500-700 prompts across these categories:

**Category 1: Product Awareness (15% of bank)**
- "what is [product]"
- "what does [product] do"
- "who uses [product]"
- "is [product] good"

**Category 2: Product Comparison (30% of bank)**
- "[product] vs [competitor]"
- "best [category] software"
- "[product] alternatives"
- "differences between [product] and [competitor]"

**Category 3: Technical Evaluation (20% of bank)**
- "[product] integrations"
- "[product] API documentation"
- "[product] technical requirements"
- "does [product] support [feature/standard]"

**Category 4: Implementation & Setup (15% of bank)**
- "how to install [product]"
- "[product] configuration"
- "getting started with [product]"
- "[product] setup guide"

**Category 5: Use Cases & How-To (15% of bank)**
- "how to [task] with [product]"
- "[product] use cases"
- "[product] best practices"
- "[use case] using [product]"

**Category 6: Troubleshooting (5% of bank)**
- "[product] error [message]"
- "why isn't [product] [functioning]"
- "[product] troubleshooting"
- "[product] common issues"

### C.4.6 Success Metrics Benchmarks

Technology/SaaS GEO programs show high citation rates due to technical content authority:

| Metric | Pilot Baseline | 90-Day Target | Mature Program |
|--------|---------------|---------------|----------------|
| Share of Voice (SOV) | 10-20% | 25-40% | 45-65% |
| Citation Rate | 25-40% | 50-65% | 70-85% |
| Documentation Visibility | 40-55% | 65-80% | 85-95% |
| Comparison Mentions | 30-45% | 55-70% | 75-90% |
| Technical Query Coverage | 20-35% | 45-60% | 65-80% |

**Performance Notes:**
- Documentation Visibility: percentage of technical queries citing official documentation
- Comparison Mentions: percentage of comparison queries where brand is included
- Technical Query Coverage: percentage of deep technical queries receiving brand citations
- Higher citation rates reflect preference for authoritative technical sources
- Developer-focused content outperforms marketing content significantly

---

## C.5 Cross-Industry Patterns

### C.5.1 Universal Best Practices

Certain GEO principles apply regardless of industry vertical:

**Content-First Prompt Derivation**
- Work backwards from existing content to identify winnable queries
- Avoid tracking prompts without content backing
- Semantic alignment between prompts and content is critical
- Regular prompt bank refresh based on content updates

**Measurement Infrastructure**
- Minimum 400 prompts for statistically valid baseline
- Weekly measurement cadence for trend detection
- Competitor benchmarking (3-5 comparable brands)
- Platform diversity (measure across ChatGPT, Perplexity, Gemini minimum)

**Structured Data Implementation**
- Schema.org markup on all key content types
- Organization, Product, Article, FAQPage, BreadcrumbList minimum
- JSON-LD format preferred over microdata
- Regular validation against schema specifications

**Authority Building**
- Author credentials and expertise signals
- Citations to authoritative third-party sources
- Content freshness indicators
- Editorial process transparency

**Technical Foundation**
- Fast page load times (Core Web Vitals compliance)
- Mobile-responsive design
- Secure (HTTPS) and accessible content
- Crawlable architecture (no JavaScript-only content)

### C.5.2 Industry-Agnostic Optimization Techniques

These tactics improve GEO performance across all verticals:

**Entity Optimization**
- Clear entity definitions on first mention
- Consistent entity naming across content
- Entity relationships explicitly stated
- Disambiguation for ambiguous terms

**Query Intent Matching**
- Content format matches query intent (informational vs transactional)
- Depth appropriate to query specificity
- Direct answer to query in first paragraph
- Supporting detail and context follow

**Semantic Completeness**
- Comprehensive topic coverage
- Related concepts and questions addressed
- Context sufficient for LLM understanding
- No implicit assumptions about reader knowledge

**Citation Worthiness**
- Unique insights or data not available elsewhere
- Clear, quotable statements
- Attributable facts with dates and sources
- Contrarian or newsworthy perspectives

**Freshness Signals**
- Publication and update dates visible
- Current year in content where relevant
- "As of [date]" for time-sensitive information
- Regular content review and refresh cycles

### C.5.3 Adaptation Guidelines

Tailor the industry templates to specific client contexts:

**Step 1: Assess Industry Maturity**
- How established is GEO in the industry?
- What are competitors doing (ahead or behind)?
- Are there industry-specific measurement benchmarks?
- What regulatory constraints apply?

**Step 2: Map Business Model**
- B2B, B2C, or B2B2C?
- Transactional or lead generation?
- Multi-channel or direct-to-consumer?
- Product-focused or service-focused?

**Step 3: Evaluate Content Readiness**
- What content exists today?
- What content quality issues exist?
- What content gaps are critical?
- What content creation capacity exists?

**Step 4: Prioritize Query Categories**
- Which query categories drive most business value?
- Which categories have lowest competition?
- Which categories align with existing content strength?
- Which categories are table stakes vs differentiators?

**Step 5: Set Realistic Targets**
- What is category average SOV and citation rate?
- What is client's current position relative to competitors?
- What investment level is available (content, technical, measurement)?
- What timeline expectations are realistic?

**Step 6: Customize Prompt Bank**
- Use industry template as starting point
- Add client-specific products, services, terminology
- Include regional/market-specific variations
- Balance branded vs non-branded queries (typically 20/80)

**Step 7: Define Success Metrics**
- Adapt benchmark ranges to industry and competitive context
- Include business outcome metrics (leads, sales, revenue) where trackable
- Set incremental milestones (30-day, 60-day, 90-day)
- Plan for long-term maturity (6-12 month trajectory)

### C.5.4 Common Patterns Across Industries

**High-Performing Content Characteristics**
1. Comprehensive (covers topic thoroughly)
2. Structured (clear headings and organization)
3. Authoritative (expert authors, cited sources)
4. Current (recently published or updated)
5. Unique (information not available elsewhere)
6. Actionable (helps users make decisions)
7. Accessible (clear language, readable format)

**Consistent Success Factors**
1. Executive sponsorship and cross-functional alignment
2. Dedicated GEO resources (strategy, content, technical)
3. Regular measurement and optimization cycles
4. Content creation and refresh processes
5. Technical infrastructure for structured data
6. Integration with existing SEO and content programs
7. Patient, long-term perspective (not quick wins)

**Universal Anti-Patterns**
1. Thin content (insufficient depth or detail)
2. Duplicate content (across pages or sites)
3. Stale content (outdated information, old dates)
4. Promotional tone (marketing speak vs informative)
5. Technical barriers (slow sites, JavaScript-only, blocked crawlers)
6. Inconsistent terminology (same concept, different terms)
7. Missing structured data (no schema markup)

### C.5.5 Template Selection Decision Tree

Use this decision tree to select and adapt the appropriate industry template:

```
START: What is the primary business model?
│
├─ Retail/CPG
│  ├─ High SKU count (>1000)? → Use Retail Template, emphasize catalog optimization
│  ├─ Marketplace presence? → Add agentic commerce considerations
│  └─ Omnichannel? → Include in-store availability structured data
│
├─ Financial Services
│  ├─ Regulated products? → Use Financial Services Template, emphasize compliance
│  ├─ Banking? → Prioritize rate visibility and product comparison
│  ├─ Insurance? → Focus on qualification queries and quote processes
│  └─ Investment? → Add risk disclosure requirements, educational content
│
├─ Healthcare
│  ├─ Provider organization? → Use Healthcare Template, emphasize provider directories
│  ├─ Medical device/pharma? → Add FDA compliance, clinical evidence requirements
│  ├─ Health plan? → Focus on plan comparison, provider networks, coverage
│  └─ Wellness/fitness? → Lower regulatory burden, emphasize prevention content
│
├─ Technology/SaaS
│  ├─ Developer audience? → Use Technology Template, prioritize documentation
│  ├─ Enterprise B2B? → Add security/compliance content, ROI calculators
│  ├─ SMB focus? → Emphasize ease-of-use, quick-start content
│  └─ API/platform? → Technical documentation and integration guides critical
│
└─ Other Industries
   ├─ Professional services? → Adapt Financial Services Template (thought leadership)
   ├─ Hospitality/travel? → Adapt Retail Template (availability, reviews, location)
   ├─ Education? → Adapt Healthcare Template (authority, accreditation)
   └─ Manufacturing/B2B? → Adapt Technology Template (technical specs, use cases)
```

### C.5.6 Template Combination Strategies

Many organizations span multiple industries or business models:

**Scenario 1: Healthcare Technology (EMR software)**
- Primary: Technology Template (documentation, integrations)
- Secondary: Healthcare Template (regulatory compliance, clinical workflows)
- Emphasis: Technical evaluation queries + HIPAA compliance content

**Scenario 2: Financial Services Marketplace (lending platform)**
- Primary: Financial Services Template (rates, compliance)
- Secondary: Technology Template (API for lender partners)
- Emphasis: Rate comparison queries + developer documentation for partners

**Scenario 3: Retail with Service Component (automotive)**
- Primary: Retail Template (product catalog, comparisons)
- Secondary: Healthcare Template (safety, recalls, maintenance)
- Emphasis: Product discovery + service/maintenance content

**Combination Approach:**
1. Identify primary template based on core business
2. Identify secondary template(s) for adjacent models
3. Develop 70% of prompt bank from primary template
4. Develop 30% of prompt bank from secondary template(s)
5. Ensure content priorities address both areas
6. Set separate metrics for each business area

---

## Next Steps

After selecting and adapting an industry template:

1. **Review Core Methodology:** Return to Volume 1 (Foundations) and Volume 2 (Implementation) to ensure alignment with universal GEO principles
2. **Assess Content Gaps:** Audit existing content against industry-specific content priorities matrix
3. **Build Prompt Bank:** Use industry-specific sample categories as starting point, customize with actual products/services
4. **Establish Measurement:** Implement tracking across prompt bank categories with industry benchmark targets
5. **Plan Content Development:** Prioritize content creation based on citation impact and business value
6. **Monitor and Optimize:** Weekly measurement, monthly optimization cycles, quarterly strategic reviews

For technology implementation guidance, see Appendix A: Technical Reference Architectures.

For measurement platform evaluation, see Appendix B: Measurement Tools Evaluation Framework.

For industry-specific case studies, see Volume 3: Advanced Strategies.
