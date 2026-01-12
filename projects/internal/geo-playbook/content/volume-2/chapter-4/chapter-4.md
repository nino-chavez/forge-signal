# Chapter 4: Discovery & Assessment

## TL;DR

- **Work backwards from content**: Derive prompts from existing content to measure what you can actually rank for, not arbitrary queries
- **Establish baselines early**: Use a minimum of 400 prompts for pilot measurement to capture meaningful share of voice (SOV) metrics
- **Competitive context matters**: Define 3-5 direct competitors to benchmark your AI visibility and identify strategic gaps
- **Prioritize ruthlessly**: Not all opportunities are equal—distinguish quick wins from strategic investments based on effort and impact

---

## Introduction

Discovery and assessment form the foundation of any successful GEO program. Unlike traditional SEO, where keyword research drives content creation, GEO requires a content-first approach. You must first understand what content you have, what signals it generates, and how AI systems currently perceive your brand before you can optimize effectively.

This chapter outlines the four critical components of the discovery phase:

1. **Content-First Prompt Derivation**: Working backwards from your existing content to identify the queries your brand should rank for
2. **AI Visibility Benchmarking**: Establishing baseline metrics for how AI platforms currently cite your brand
3. **Competitive Share of Voice Analysis**: Understanding your position relative to competitors in the AI citation economy
4. **Gap & Opportunity Identification**: Determining where to invest based on content, technical, and strategic gaps

The outputs from this phase become the measurement framework for your entire GEO program. Get this wrong, and you will optimize for the wrong metrics. Get it right, and you create a durable foundation for AI-era visibility.

---

## 4.1 Content-First Prompt Derivation

### The Fundamental Principle

Traditional keyword research starts with search volume data and competition analysis, then creates content to match those keywords. This approach fails in the AI era for one critical reason: **AI platforms synthesize answers from multiple sources based on semantic understanding, not keyword matching.**

The content-first methodology inverts this process. Instead of asking "What should we create content for?", ask "What prompts should our existing content already rank for?" This ensures your measurement reflects reality—the actual capability of your content to generate citations.

### Why Work Backwards from Content

Working backwards from content provides three advantages:

1. **Realistic expectations**: You measure against content you actually have, not aspirational queries
2. **Faster time to value**: You identify quick optimization wins in existing high-quality content
3. **Semantic alignment**: Derived prompts naturally match the semantic structure of your content, improving citation probability

### The Six-Step Process

The content-first prompt derivation methodology follows six sequential steps:

| Step | Action | Output | Purpose |
|------|--------|--------|---------|
| 1 | Collect key landing page URLs | URL list (50-100 pages) | Identify the content corpus for analysis |
| 2 | Extract content semantics | Content corpus with metadata | Capture title, description, body text, and structured data |
| 3 | Classify by taxonomy | Tagged content | Apply Content Type, User Intent, and Funnel Stage labels |
| 4 | Extract topics and entities | Topic/entity list | Use NLP to identify key concepts and named entities |
| 5 | Generate conversational prompts | Derived prompt set | Use LLM to expand topics into natural language queries |
| 6 | Validate semantic alignment | Match rate score | Ensure prompts align with content chunks |

#### Step 1: Collect Key Landing Page URLs

Start by identifying 50-100 of your most important pages. These typically include:

- **Product detail pages (PDPs)**: Top-selling or strategically important products
- **Category pages**: High-traffic category landing pages
- **Content assets**: Buying guides, how-to articles, comparison pages
- **Brand pages**: About, brand story, sustainability, values

Export these URLs from your analytics platform based on:
- Organic search traffic (top performers)
- Strategic importance (hero products, new launches)
- Content quality (comprehensive guides, authoritative content)

**Example URL list structure:**

```csv
URL,Page Type,Strategic Priority
https://example.com/products/trail-running-shoes,PDP,High
https://example.com/guides/choosing-running-shoes,Guide,High
https://example.com/collections/running,Category,Medium
https://example.com/sustainability,Brand,Medium
```

#### Step 2: Extract Content Semantics

For each URL, extract the semantic content that AI systems can access:

- **Metadata**: Title tag, meta description, Open Graph tags
- **Structured data**: Schema.org markup (Product, Article, FAQ, etc.)
- **Body content**: Main text content, headings, lists
- **Attributes**: Product specifications, features, technical details

Use a web scraping tool or content API to automate this extraction. The goal is to create a machine-readable representation of what information exists on each page.

**Example extraction:**

```json
{
  "url": "https://example.com/products/trail-running-shoes",
  "title": "Trail Runner Pro - All-Terrain Running Shoes",
  "description": "Lightweight trail running shoes with superior grip...",
  "body_text": "The Trail Runner Pro combines...",
  "schema_type": "Product",
  "attributes": {
    "category": "Trail Running Shoes",
    "features": ["Waterproof", "Vibram sole", "Lightweight"],
    "price": 129.99
  }
}
```

#### Step 3: Classify by Taxonomy

Apply a consistent taxonomy to each piece of content. This enables systematic prompt generation across different content types and user intents.

**Content Type Classification:**

- Product (PDP)
- Collection (Category page)
- Educational (Guide, How-to)
- Comparison (Product comparisons)
- Brand (About, Values, Story)

**User Intent Classification:**

- Informational (Learning about a topic)
- Navigational (Finding a specific brand/product)
- Transactional (Ready to purchase)
- Commercial Investigation (Comparing options)

**Funnel Stage Classification:**

- Awareness (Early research, topic exploration)
- Consideration (Evaluating options, comparisons)
- Decision (Ready to buy, product-specific)

**Example taxonomy tagging:**

```csv
URL,Content Type,User Intent,Funnel Stage
https://example.com/products/trail-runner-pro,Product,Transactional,Decision
https://example.com/guides/choosing-running-shoes,Educational,Informational,Awareness
```

#### Step 4: Extract Topics and Entities

Use Natural Language Processing (NLP) to identify the key topics and named entities within each content piece. This step transforms unstructured text into structured semantic concepts.

**Recommended tools:**

- **spaCy**: Named entity recognition and dependency parsing
- **KeyBERT**: Keyword extraction using BERT embeddings
- **LLM extraction**: Use Claude or GPT-4 to extract key concepts

**Example topic extraction:**

From a page about trail running shoes, extract:

- **Topics**: trail running, waterproof footwear, grip technology, lightweight design
- **Entities**: Vibram (brand), Gore-Tex (technology), marathon (use case)
- **Attributes**: cushioning, durability, breathability, traction

**Output format:**

```json
{
  "url": "https://example.com/products/trail-runner-pro",
  "topics": ["trail running", "waterproof footwear", "grip technology"],
  "entities": ["Vibram", "Gore-Tex"],
  "attributes": ["cushioning", "durability", "breathability"]
}
```

#### Step 5: Generate Conversational Prompts

Use an LLM to expand topics and entities into natural language prompts that real users might ask an AI assistant. The key is to generate **conversational** queries, not SEO-style keywords.

**Prompt template for LLM:**

```
Given the following content about [TOPIC], generate 10 conversational questions
that a user might ask an AI assistant. Include questions at different specificity
levels, from general topic exploration to specific product evaluation.

Content topics: [TOPICS]
Content type: [TYPE]
User intent: [INTENT]
Funnel stage: [STAGE]

Generate questions that:
- Use natural, conversational language
- Vary in length (short to detailed)
- Include different question types (what, how, why, which, best)
- Reflect realistic user scenarios
```

**Example generated prompts:**

From a page about trail running shoes:

1. "What should I look for in trail running shoes?"
2. "How do trail running shoes differ from regular running shoes?"
3. "What are the best waterproof trail running shoes for muddy conditions?"
4. "I'm training for a mountain ultra marathon. What shoes do you recommend?"
5. "Which trail running shoes have the best grip on rocky terrain?"

Generate 5-10 prompts per page, resulting in 250-1000 total prompts for a 50-100 page corpus.

#### Step 6: Validate Semantic Alignment

The final step ensures that derived prompts actually align with the content you have. Use semantic similarity scoring to verify that:

1. Each prompt has a corresponding content chunk that could answer it
2. The similarity score meets a minimum threshold (typically 0.7+ cosine similarity)
3. Prompts are distributed across your content taxonomy

**Validation process:**

```python
# Pseudocode for validation
for prompt in derived_prompts:
    best_match = find_most_similar_content(prompt, content_corpus)
    similarity_score = calculate_similarity(prompt, best_match)

    if similarity_score < 0.7:
        flag_for_review(prompt)
    else:
        add_to_prompt_bank(prompt, best_match)
```

**Target match rate**: Aim for 80%+ of prompts to have a strong semantic match (0.7+ similarity) with at least one content piece. Prompts that fail this threshold either need content created or should be removed from the measurement set.

---

### Intent Classification Taxonomy

A robust intent classification system ensures your prompt bank covers the full customer journey. Use this three-tier taxonomy:

#### Primary Intent Categories

| Intent | Description | Example Prompts | Content Types |
|--------|-------------|-----------------|---------------|
| Informational | Learning about a topic, no immediate purchase intent | "What is trail running?", "How do running shoes work?" | Guides, educational content, blog posts |
| Navigational | Finding a specific brand, product, or page | "Where can I buy [Brand] shoes?", "Tell me about [Brand's] sustainability" | Brand pages, store locators |
| Commercial Investigation | Comparing options, evaluating features | "What are the best trail running shoes?", "Compare [Product A] vs [Product B]" | Comparison pages, reviews, product collections |
| Transactional | Ready to purchase, seeking specific product | "Buy waterproof trail running shoes", "Show me [Product] in size 10" | PDPs, checkout pages |

#### Secondary Intent Modifiers

Layer these modifiers onto primary intents for nuanced classification:

- **Urgency**: Immediate need ("I need...") vs. future planning ("What should I get for...")
- **Specificity**: Broad topic vs. specific product/feature
- **Expertise level**: Beginner vs. advanced user
- **Use case**: Specific scenario ("for marathon training", "for wet conditions")

#### Why Intent Classification Matters

Different AI platforms prioritize different content types based on perceived user intent. A prompt classified as "Informational" will favor educational content, while "Transactional" prompts favor product pages. Accurate classification ensures you measure the right content against the right prompts.

---

## 4.2 AI Visibility Benchmarking

### Establishing Your Baseline

Before you can optimize for AI visibility, you must measure your current state. AI visibility benchmarking captures how frequently and favorably AI platforms cite your brand today. This baseline becomes the reference point for measuring improvement.

### Key Metrics to Capture

Track four primary metrics across your prompt bank:

1. **Citation rate**: Percentage of prompts where your brand is cited in AI responses
2. **Citation position**: Ranking of your brand when multiple sources are cited
3. **Citation type**: Direct URL attribution vs. implicit reference vs. inline attribution
4. **Sentiment**: Positive, neutral, or negative framing of your brand

**Example baseline metrics:**

```
Prompt Bank: 400 prompts
Citation Rate: 23% (92 prompts cite the brand)
Average Position: 3.2 (when cited)
Direct Attribution: 48% (44 of 92 citations include URL)
Positive Sentiment: 71%, Neutral: 24%, Negative: 5%
```

### Setting Up Measurement Infrastructure

AI visibility measurement requires three components:

1. **Prompt bank**: Your curated set of queries (minimum 400 for pilot)
2. **Measurement platform**: Tool to query AI platforms and extract citations
3. **Data pipeline**: Automated collection, storage, and reporting of metrics

#### Prompt Bank Requirements

Your prompt bank must be:

- **Comprehensive**: Cover all key topics, products, and use cases (400+ prompts for pilot)
- **Balanced**: Distribute across content types, intents, and funnel stages
- **Documented**: Include metadata (intent, category, expected content match)
- **Version-controlled**: Track changes over time to maintain consistency

**Prompt bank template:**

```csv
Prompt ID,Prompt Text,Content Type,User Intent,Funnel Stage,Expected URL,Category
P001,"What are the best trail running shoes?",Comparison,Commercial Investigation,Consideration,/collections/trail-running,Trail Running
P002,"How do I choose running shoes for marathons?",Educational,Informational,Awareness,/guides/marathon-training,Marathon
P003,"Buy waterproof trail running shoes",Product,Transactional,Decision,/products/trail-runner-pro,Trail Running
```

**Required columns:**

- **Prompt ID**: Unique identifier for tracking
- **Prompt Text**: The actual query to submit to AI platforms
- **Content Type**: Taxonomy classification
- **User Intent**: Informational, Navigational, Commercial Investigation, or Transactional
- **Funnel Stage**: Awareness, Consideration, or Decision
- **Expected URL**: The page that should rank for this prompt
- **Category**: Product category or topic area

**Optional columns:**

- Competitor URLs (for SOV comparison)
- Priority (High/Medium/Low)
- Last Updated date
- Notes

#### Measurement Platform Selection

Choose a measurement platform based on:

- **Platform coverage**: Which AI systems it can query (ChatGPT, Claude, Perplexity, Gemini, etc.)
- **Citation extraction**: Ability to parse and attribute sources
- **API access**: Programmatic query submission and result retrieval
- **Historical tracking**: Time-series data for trend analysis

**Minimum requirements for pilot:**

- Query at least 2-3 AI platforms (e.g., ChatGPT, Perplexity, Claude)
- Weekly measurement cadence (minimum)
- Export raw responses for manual validation
- Track citation rate and position metrics

#### Measurement Cadence

Establish a consistent measurement schedule:

- **Pilot phase**: Weekly scans (minimum 3 weeks, recommend 6-8 weeks)
- **Ongoing optimization**: Bi-weekly or monthly scans
- **High-priority prompts**: Weekly tracking for strategic queries

**Why weekly matters**: AI platforms update their knowledge and ranking algorithms continuously. Weekly measurement captures volatility and identifies trends faster than monthly scans.

### Baseline Capture Process

Follow this sequence to establish your baseline:

1. **Week -1**: Finalize prompt bank and validate measurement platform access
2. **Week 0**: Run initial scan across all prompts (this is your baseline)
3. **Week 1**: Run second scan to validate consistency
4. **Week 2**: Run third scan and calculate baseline average

Use the average of weeks 0-2 as your baseline to account for platform volatility. A single scan may not represent typical performance.

**Baseline reporting template:**

```markdown
## AI Visibility Baseline Report

**Measurement Period**: [Date Range]
**Prompt Bank Size**: [Number] prompts
**Platforms Measured**: [List platforms]

### Overall Citation Metrics
- Citation Rate: [X]%
- Average Position (when cited): [X.X]
- Direct URL Attribution: [X]%

### By Platform
| Platform | Citation Rate | Avg Position | Direct Attribution |
|----------|---------------|--------------|-------------------|
| ChatGPT  | X%            | X.X          | X%                |
| Perplexity | X%          | X.X          | X%                |
| Claude   | X%            | X.X          | X%                |

### By Intent Category
| Intent | Citation Rate | Prompts | Citations |
|--------|---------------|---------|-----------|
| Informational | X% | XXX | XX |
| Commercial Investigation | X% | XXX | XX |
| Transactional | X% | XXX | XX |
| Navigational | X% | XXX | XX |

### Top Performing Content
[List top 10 URLs by citation count]

### Zero-Citation Content
[List content with 0 citations despite expected ranking]
```

---

## 4.3 Competitive Share of Voice Analysis

### Defining Competitors for GEO Context

In the citation economy, your competitors are not just direct business rivals—they include any domain that AI platforms cite instead of you. This requires a broader competitive definition:

**Direct competitors**: Brands selling similar products to the same audience
**Content competitors**: Publishers and media sites with authoritative content on your topics
**Platform competitors**: Marketplaces and aggregators (Amazon, retailer sites)

For most pilots, focus on 3-5 direct competitors to keep analysis manageable.

### Competitor Selection Criteria

Choose competitors based on:

1. **Business relevance**: Direct market competitors
2. **Content quality**: Brands with strong content programs
3. **Domain authority**: Established online presence
4. **Product overlap**: At least 50% category overlap

**Example competitor set for athletic footwear brand:**

```
Primary Brand: example.com

Direct Competitors:
1. competitor-a.com (major athletic brand)
2. competitor-b.com (specialty running brand)
3. competitor-c.com (emerging DTC brand)

Content Competitors:
4. runningmagazine.com (authoritative publisher)
5. retailer.com (major marketplace)
```

Limit to 5 total competitors during pilot phase. Expanding competitive tracking is expensive and dilutes focus.

### SOV Calculation Methodology

Share of Voice (SOV) measures your brand's percentage of total citations across a prompt set relative to competitors.

**Formula:**

```
SOV = (Your Citations) / (Your Citations + All Competitor Citations) * 100
```

**Example calculation:**

```
Prompt: "What are the best trail running shoes?"

AI Response cites:
- example.com (you)
- competitor-a.com
- competitor-b.com
- runningmagazine.com

Your Citations: 1
Total Citations: 4
Your SOV: 25%
```

Calculate SOV at multiple levels:

1. **Overall SOV**: Across entire prompt bank
2. **Category SOV**: By product category or topic area
3. **Intent SOV**: By user intent classification
4. **Platform SOV**: By AI platform

### Interpreting Competitive Gaps

SOV analysis reveals three types of gaps:

#### 1. Citation Gap

You are cited less frequently than competitors across the same prompts.

**Diagnosis**: Likely content quality, authority, or technical SEO issues
**Action**: Audit content depth, structured data, and backlink profile

**Example:**

```
Prompt Category: Trail Running Shoes
Your Citation Rate: 15%
Competitor A Citation Rate: 45%
Competitor B Citation Rate: 30%

Gap: -30 percentage points vs. Competitor A
```

#### 2. Position Gap

You are cited, but ranked lower than competitors.

**Diagnosis**: Content exists but lacks authority signals or semantic relevance
**Action**: Improve content comprehensiveness, add expert attribution, build topical authority

**Example:**

```
Prompts where both you and Competitor A are cited: 50 prompts
Your Average Position: 3.8
Competitor A Average Position: 1.9

Gap: -1.9 positions
```

#### 3. Coverage Gap

Competitors are cited for prompts where you have no citation.

**Diagnosis**: Missing content, wrong content type, or poor content-prompt alignment
**Action**: Create content for gaps or improve semantic alignment of existing content

**Example:**

```
Prompts citing Competitor A but not you: 120 prompts
Analysis: 80% are "Commercial Investigation" intent
Your content: Only 20% of catalog has comparison/guide content

Gap: Insufficient comparison and buying guide content
```

### Benchmarking Against Industry

While direct competitor SOV is critical, industry benchmarks provide context for your performance.

**Typical SOV ranges by brand maturity:**

| Brand Type | Expected SOV (Pilot Baseline) | Target SOV (6 months) |
|------------|-------------------------------|----------------------|
| Market leader | 30-40% | 45-55% |
| Established brand | 20-30% | 35-45% |
| Emerging brand | 10-20% | 25-35% |
| New entrant | 5-10% | 15-25% |

**SOV by intent category:**

| Intent | Expected SOV | Rationale |
|--------|--------------|-----------|
| Navigational | 60-90% | Users explicitly seeking your brand |
| Transactional | 25-40% | Strong product content drives citations |
| Commercial Investigation | 15-30% | High competition from comparison sites |
| Informational | 10-25% | Publishers and media dominate educational content |

Use these benchmarks to set realistic targets and identify outlier performance (positive or negative).

---

## 4.4 Gap & Opportunity Identification

### Content Gap Analysis

Content gaps emerge when your existing content cannot support citation for high-value prompts. Systematic gap analysis identifies where to invest in content development.

#### Identifying Content Gaps

Use the semantic alignment validation from Section 4.1 to identify gaps:

1. **Prompts with no strong content match** (similarity score < 0.7)
2. **High-value prompts with weak content** (strategic topics but thin content)
3. **Competitor-cited prompts where you have no citation** (coverage gaps from SOV analysis)

**Gap classification:**

| Gap Type | Description | Priority | Action |
|----------|-------------|----------|--------|
| Missing content | No page exists for this topic | High if high-value prompt | Create new content |
| Thin content | Page exists but lacks depth | Medium | Expand existing content |
| Wrong content type | Have content but wrong format (e.g., PDP instead of guide) | Medium | Create complementary content |
| Poor semantic match | Content exists but doesn't align with prompt language | Low | Optimize existing content |

**Example content gap analysis:**

```markdown
### Content Gap Report

**High-Priority Gaps** (20 prompts)
- "How to choose running shoes for beginners" → No beginner guide content
- "Best running shoes for plantar fasciitis" → Medical/condition content missing
- "Compare [Your Brand] vs [Competitor]" → No comparison pages

**Medium-Priority Gaps** (35 prompts)
- "Trail running shoe technology explained" → Have product pages but no tech explainer
- "Running shoe care and maintenance" → Thin FAQ content, needs full guide

**Low-Priority Gaps** (15 prompts)
- Various product-specific queries for discontinued products
```

### Technical Gap Analysis

Technical gaps prevent AI platforms from accessing, understanding, or trusting your content. These gaps require engineering work, not content creation.

#### Common Technical Gaps

1. **Structured data gaps**: Missing or incomplete Schema.org markup
2. **Accessibility gaps**: Content not accessible to crawlers (JavaScript rendering issues, authentication walls)
3. **Performance gaps**: Slow page load impacting crawl budget and user signals
4. **Mobile gaps**: Mobile-unfriendly content (AI platforms prioritize mobile-first content)
5. **Internal linking gaps**: Poor topic clustering and semantic relationships

**Technical audit checklist:**

```markdown
- [ ] Schema.org markup on 90%+ of key pages
- [ ] Product schema includes all required properties (name, description, price, availability)
- [ ] Article/BlogPosting schema on editorial content
- [ ] FAQ schema where applicable
- [ ] Organization and Brand schema on homepage
- [ ] All key pages accessible without JavaScript execution
- [ ] Page load time < 2.5 seconds (LCP)
- [ ] Mobile-friendly (passes Google Mobile-Friendly Test)
- [ ] Topic clusters with strong internal linking
- [ ] XML sitemap includes all key pages
```

**Example technical gap findings:**

```
Audit Date: [Date]
Pages Audited: 100 key landing pages

Findings:
- Schema markup coverage: 45% (CRITICAL GAP)
  - Product schema: 60% of PDPs
  - Article schema: 20% of blog posts
  - FAQ schema: 0% (opportunity)

- Accessibility: 85% (MEDIUM GAP)
  - 15 pages require JS for content rendering

- Performance: 72% meet LCP threshold (MEDIUM GAP)
  - Category pages average 3.2s LCP

- Mobile: 95% (LOW GAP)
  - 5 pages have horizontal scroll issues
```

### Prioritization Framework for Opportunities

Not all gaps are equally valuable. Use a two-dimensional prioritization matrix:

**Impact axis**: Potential improvement in citation rate or SOV
**Effort axis**: Engineering and content resources required

#### Impact Scoring

Score each opportunity on potential impact (1-5):

- **5 - Critical**: Directly addresses top-10 prompts or closes major SOV gap
- **4 - High**: Addresses top-50 prompts or closes category-specific gap
- **3 - Medium**: Addresses long-tail prompts or incremental improvement
- **2 - Low**: Marginal impact on citation rate
- **1 - Minimal**: Nice-to-have but not measurable impact

#### Effort Scoring

Score each opportunity on implementation effort (1-5):

- **1 - Minimal**: Single page edit, < 4 hours
- **2 - Low**: Small content project or simple technical fix, < 2 days
- **3 - Medium**: Significant content creation or moderate technical work, 3-5 days
- **4 - High**: Multiple content assets or complex technical implementation, 1-2 weeks
- **5 - Critical**: Major content program or infrastructure project, > 2 weeks

#### Prioritization Matrix

```
         │ Low Effort (1-2) │ Med Effort (3) │ High Effort (4-5)
─────────┼──────────────────┼────────────────┼──────────────────
Critical │   QUICK WINS     │  HIGH VALUE    │   STRATEGIC
Impact   │   DO NOW         │  PLAN & DO     │   EVALUATE
(4-5)    │                  │                │
─────────┼──────────────────┼────────────────┼──────────────────
Medium   │   FILL-INS       │  CONSIDER      │   DEFER
Impact   │   IF CAPACITY    │  IF CAPACITY   │   REVISIT LATER
(2-3)    │                  │                │
─────────┼──────────────────┼────────────────┼──────────────────
Low      │   BACKLOG        │  BACKLOG       │   DO NOT DO
Impact   │   LOW PRIORITY   │  LOW PRIORITY  │   NOT WORTH IT
(1)      │                  │                │
```

**Example opportunity prioritization:**

| Opportunity | Type | Impact | Effort | Quadrant | Action |
|-------------|------|--------|--------|----------|--------|
| Add Product schema to all PDPs | Technical | 5 | 2 | Quick Win | Sprint 1 |
| Create "Choosing Running Shoes" guide | Content | 4 | 3 | High Value | Sprint 2 |
| Build comparison page template | Content + Tech | 5 | 4 | Strategic | Plan for Q2 |
| Optimize existing blog posts | Content | 3 | 2 | Fill-In | If capacity |
| Add FAQ schema to support pages | Technical | 2 | 1 | Backlog | Low priority |

### Quick Wins vs. Strategic Investments

#### Quick Wins (Implement in first 30 days)

Quick wins deliver measurable citation improvement with minimal effort:

- **Add missing Schema markup**: Product, Article, FAQ, Organization
- **Optimize high-traffic pages**: Improve semantic relevance of top 10 landing pages
- **Fix technical blockers**: Resolve JS rendering, mobile, or accessibility issues on key pages
- **Enhance product descriptions**: Add depth and semantic richness to top PDPs
- **Internal linking improvements**: Connect related content with semantic anchor text

**Target impact**: 5-15% citation rate improvement in first measurement cycle

#### Strategic Investments (Plan for 60-90 days)

Strategic investments require significant resources but unlock sustained citation growth:

- **Content program expansion**: Create 10-20 comprehensive guides addressing major gaps
- **Comparison content framework**: Build templates and processes for competitive content
- **Topic cluster architecture**: Reorganize content into semantic hubs
- **Advanced structured data**: Implement complex schema (HowTo, ItemList, SpecialAnnouncement)
- **User-generated content integration**: Surface reviews, Q&A, and social proof in AI-accessible formats

**Target impact**: 20-40% SOV improvement over 6-month period

### Gap Analysis Deliverable

Synthesize findings into a prioritized action plan:

```markdown
## GEO Gap Analysis & Opportunity Report

**Executive Summary**
[2-3 paragraphs summarizing key findings and recommendations]

### Content Gaps
**Critical Gaps** (High Impact, Missing Content)
- [List with effort estimates]

**Optimization Opportunities** (High Impact, Existing Content)
- [List with effort estimates]

### Technical Gaps
**Critical Fixes** (Blocking citations)
- [List with effort estimates]

**Enhancement Opportunities** (Improving citation probability)
- [List with effort estimates]

### Competitive Gaps
**SOV Gap Analysis**
- Overall SOV: [Your brand] X% vs. [Top competitor] Y%
- Category breakdown: [Table]
- Key opportunities: [Areas where competitors dominate]

### Prioritized Roadmap

**Sprint 1 (Weeks 1-2): Quick Wins**
1. [Initiative] - Impact: X, Effort: Y
2. [Initiative] - Impact: X, Effort: Y

**Sprint 2 (Weeks 3-4): High-Value Items**
1. [Initiative] - Impact: X, Effort: Y
2. [Initiative] - Impact: X, Effort: Y

**Q2 Strategic Investments**
1. [Initiative] - Impact: X, Effort: Y
2. [Initiative] - Impact: X, Effort: Y

### Expected Outcomes
- Baseline citation rate: X%
- Post-Sprint 1 target: Y%
- 90-day target: Z%
```

---

## Common Pitfalls

### 1. Arbitrary Prompt Selection

**Anti-pattern**: Creating prompts based on what you think users ask, rather than deriving from actual content.

**Problem**: You measure queries your content cannot answer, creating false negatives.

**Solution**: Always work backwards from content using the six-step derivation methodology.

### 2. Insufficient Prompt Bank Size

**Anti-pattern**: Testing with 50-100 prompts to "save time."

**Problem**: Small sample size creates high volatility and unreliable metrics. Week-to-week changes are noise, not signal.

**Solution**: Use a minimum of 400 prompts for pilot measurement. For enterprise programs, target 1000+ prompts.

### 3. Single-Scan Baselines

**Anti-pattern**: Running one measurement scan and calling it the baseline.

**Problem**: AI platforms exhibit volatility. A single scan may not represent typical performance.

**Solution**: Capture 3 scans over 2 weeks and average the results for your baseline.

### 4. Undefined Competitive Set

**Anti-pattern**: Including 10+ competitors "to be thorough."

**Problem**: Dilutes analysis, increases cost, and makes SOV metrics hard to interpret.

**Solution**: Limit to 3-5 direct competitors during pilot. Expand only after proving measurement value.

### 5. Gap Analysis Without Prioritization

**Anti-pattern**: Creating a laundry list of every possible improvement.

**Problem**: Teams become overwhelmed and implementation stalls.

**Solution**: Use the Impact/Effort matrix to ruthlessly prioritize. Focus on quick wins and strategic bets, defer or eliminate low-impact items.

### 6. Technical Gaps Deferred

**Anti-pattern**: "Let's fix content first, then tackle technical issues."

**Problem**: Technical blockers prevent AI platforms from accessing your content. Content improvements have no impact if discovery is broken.

**Solution**: Address critical technical gaps (Schema markup, accessibility, mobile) in Sprint 1 alongside content quick wins.

---

## Next Steps

After completing the discovery and assessment phase, you should have:

1. **Validated prompt bank**: 400+ prompts with semantic alignment to your content
2. **Baseline metrics**: Citation rate, SOV, and position data across platforms
3. **Competitive analysis**: SOV comparison with 3-5 key competitors
4. **Gap analysis report**: Prioritized content and technical opportunities
5. **Implementation roadmap**: Sequenced sprints with effort and impact estimates

### Immediate Actions

- **Week 1**: Finalize prompt bank and complete first baseline scan
- **Week 2**: Run second baseline scan and begin quick win implementation
- **Week 3**: Run third baseline scan, calculate averaged baseline, and complete gap analysis
- **Week 4**: Present findings and roadmap to stakeholders, begin Sprint 1 execution

### Deliverables Checklist

Use this checklist to validate completeness before moving to implementation:

```markdown
## Discovery Phase Deliverables

### Prompt Derivation
- [ ] URL list exported (50-100 pages minimum)
- [ ] Content extracted for all URLs
- [ ] Taxonomy applied (Content Type, Intent, Funnel Stage)
- [ ] Topics and entities extracted
- [ ] Prompts generated (400+ for pilot)
- [ ] Semantic alignment validated (80%+ match rate)
- [ ] Prompt bank documented with metadata

### Baseline Measurement
- [ ] Measurement platform configured
- [ ] Platform API access validated
- [ ] Baseline scan 1 completed
- [ ] Baseline scan 2 completed
- [ ] Baseline scan 3 completed
- [ ] Baseline metrics calculated (average of 3 scans)
- [ ] Baseline report published

### Competitive Analysis
- [ ] Competitor set defined (3-5 competitors)
- [ ] Competitor SOV data captured
- [ ] SOV gaps identified and quantified
- [ ] Competitive content audit completed
- [ ] SOV report published

### Gap Analysis
- [ ] Content gaps identified and classified
- [ ] Technical gaps audited
- [ ] Opportunities scored (Impact/Effort)
- [ ] Prioritization matrix completed
- [ ] Roadmap sequenced (Quick Wins → Strategic)
- [ ] Gap analysis report published

### Stakeholder Alignment
- [ ] Findings presented to stakeholders
- [ ] Success metrics defined
- [ ] Resource allocation confirmed
- [ ] Sprint 1 scope agreed
- [ ] Measurement cadence confirmed
```

---

## Related Chapters

- **Chapter 3: Measurement & Benchmarking**: Deep dive into measurement infrastructure and KPI frameworks
- **Chapter 5: Owned Ecosystem Optimization**: Implementation guidance for quick wins and strategic content improvements
- **Chapter 6: Offsite Influence Strategy**: Building authority signals that improve AI trust and citation probability
- **Appendix A: Technology Reference Architecture**: Detailed technical specifications for measurement platforms and data pipelines

---

**End of Chapter 4**
