# GenAI & Agentic Commerce Glossary

**For Accenture Song Commerce Resources**

A comprehensive reference guide for practitioners learning about Generative AI, Conversational Commerce, and Agentic Commerce concepts. This glossary provides plain-English definitions with practical examples relevant to retail and commerce implementations.

---

## Table of Contents

1. [Agentic Commerce Protocols](#agentic-commerce-protocols)
2. [Agent Orchestration & Patterns](#agent-orchestration--patterns)
3. [AI/ML Fundamentals](#aiml-fundamentals)
4. [Commerce & Retail Systems](#commerce--retail-systems)
5. [Generative Engine Optimization (GEO)](#generative-engine-optimization-geo)
6. [Answer Engine Optimization (AEO)](#answer-engine-optimization-aeo)
7. [Data & Analytics](#data--analytics)

---

## Agentic Commerce Protocols

Emerging industry standards that enable AI agents to browse, recommend, and purchase products on behalf of consumers.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **ACP** | Agentic Commerce Protocol | OpenAI's standard for AI agents to browse products and complete purchases. Provides a secure framework for ChatGPT and similar agents to shop on a customer's behalf. | When a customer asks ChatGPT to "buy me a TV under $800", ACP handles the secure checkout flow including authentication, payment, and order confirmation. |
| **AP2** | Agent Payments Protocol | Google's competing standard that lets AI agents make purchases with explicit user permission rules called "mandates". Emphasizes fine-grained user control over agent behavior. | A customer could instruct Gemini "buy this laptop if it drops below $1200" and AP2 ensures that price rule is strictly followed before any purchase. |
| **MCP** | Model Context Protocol | Anthropic's open protocol for connecting LLMs to external tools, data sources, and services. Think of it as the "USB port" that lets any AI model plug into enterprise retail systems. | A Claude-powered shopping agent uses MCP to query real-time inventory, pull customer profiles, check pricing, and execute orders—all through standardized tool interfaces. |
| **Mandate** | — | A permission specification that defines exactly what an AI agent is allowed to do. Like giving a trusted assistant specific spending rules and authority limits. | **Intent Mandate**: "Buy a TV under $1000 with at least 55-inch display". **Payment Mandate**: "Charge up to $999 to my primary Visa card". |
| **SPT** | Secure Payment Token | A secure, limited-use token that lets an AI agent authorize a payment without ever accessing the actual card number. Functions like a one-time-use virtual card. | ChatGPT receives an SPT that's valid only for this specific purchase, for this exact amount, at this specific merchant—never seeing the customer's real card details. |
| **Delegated Payment** | — | Allowing an AI agent to complete a purchase on a customer's behalf using a secure token, rather than requiring the customer to enter card details directly during checkout. | Instead of typing card numbers, the customer approves the purchase in their payment app, and the AI agent completes checkout using the delegated authorization. |
| **HNP** | Human-Not-Present | A transaction classification where the AI agent acts autonomously based on pre-set rules, without the human actively monitoring. The AI shops while the customer focuses on other things. | The agent monitors prices and automatically purchases when conditions are met—the customer receives a notification after the purchase is complete, not before. |

---

## Agent Orchestration & Patterns

Design approaches and architectural patterns for building AI agents that can reason, plan, and take actions in commerce contexts.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **Agent Pattern** | — | A reusable design approach for how an AI agent reasons and acts. Patterns like ReAct, Reflection, and Planning provide proven architectures for different agent behaviors. | Using the ReAct pattern for a shopping assistant ensures the agent thinks systematically about each step: what tool to use, execute it, observe the result, reason again. |
| **ReAct** | Reasoning and Acting | A pattern where the agent iteratively reasons about actions, executes them, observes results, and adjusts its approach. Combines chain-of-thought reasoning with tool use. | Agent thinks "I need inventory data for the customer's location" → calls inventory API → sees "5 in stock at nearest store" → reasons about delivery options → presents choices. |
| **Reflection** | — | A pattern where the agent evaluates its own output and iteratively refines through self-critique until quality thresholds are met. Improves accuracy through self-correction. | Agent drafts a product recommendation → critiques it for accuracy against specs → finds a gap in the comparison → revises the recommendation → re-evaluates → delivers the improved answer. |
| **Planning Pattern** | — | An orchestration approach where the agent creates a multi-step plan before execution, allowing for complex tasks to be broken into manageable, trackable steps. | Customer asks "Help me set up a home theater under $5000". Agent plans: 1) Understand room size, 2) Recommend TV, 3) Recommend sound system, 4) Check compatibility, 5) Verify budget fit. |
| **Tool Calling** | — | The ability for an LLM to invoke external functions, APIs, or services during a conversation. This capability is what transforms a chatbot into an "agentic" system. | Customer asks "Is this TV in stock near me?" → Agent calls `check_inventory(sku="65XL900", zip="10001")` tool → Returns real-time answer: "Yes, 3 available at the 5th Ave store". |
| **Guardrails** | — | Safety systems that constrain what an AI agent can say or do—including content filtering, PII protection, action limits, fraud detection, and brand compliance. | Guardrails prevent an agent from: revealing other customers' data, making purchases over spending limits, recommending competitor products, or processing suspicious transactions. |
| **Context Engine** | — | A component that enriches each request with everything known about the customer—combining real-time session context with historical data and preferences. | Customer asks about laptops; Context Engine automatically adds: past purchase history (Apple ecosystem), typical spend range ($1000-1500), preferred fulfillment (in-store pickup), loyalty tier (Gold). |
| **Multi-Agent System** | — | An architecture where multiple specialized AI agents collaborate to complete complex tasks. Each agent has distinct capabilities and responsibilities. | Shopping journey involves: Discovery Agent (finds products), Comparison Agent (evaluates options), Negotiation Agent (finds deals), Checkout Agent (completes purchase). |
| **Human-in-the-Loop** | HITL | A pattern where certain agent decisions require human approval before execution. Essential for high-stakes actions like large purchases or refunds. | Agent finds a great deal on a $2000 appliance but the customer's mandate only covers up to $1500—agent pauses and requests explicit approval before proceeding. |

---

## AI/ML Fundamentals

Core artificial intelligence and machine learning concepts essential for understanding GenAI commerce applications.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **LLM** | Large Language Model | AI systems like ChatGPT, Claude, or Gemini that understand and generate human language. The "brain" powering conversational AI and commerce agents. | GPT-4, Claude 3, and Gemini are all LLMs that can understand natural requests like "I need a laptop for video editing under $1500" and provide helpful, contextual responses. |
| **Embedding** | Vector Embedding | Converting text, images, or products into lists of numbers (vectors) that capture their semantic meaning. Similar items have similar vectors, enabling intelligent search. | "MacBook Air" and "lightweight laptop for students" have similar embeddings, so a semantic search for one finds the other—even without exact keyword matches. |
| **RAG** | Retrieval-Augmented Generation | A technique that teaches AI to look up real information from authoritative sources before answering, instead of relying solely on training data. Dramatically reduces hallucinations. | When asked about return policies, the AI retrieves the retailer's actual policy document from a knowledge base before responding—ensuring accurate, up-to-date information. |
| **Hallucination** | — | When AI confidently states information that isn't factually correct. A significant risk in commerce where incorrect product information can lead to returns, complaints, and liability. | AI stating "This TV includes built-in Dolby Atmos speakers" when the product actually requires separate speakers. Could lead to customer disappointment and returns. |
| **Groundedness** | — | How well AI responses are anchored to actual source data versus generated assumptions. Grounded responses cite real information. Ungrounded responses may be hallucinated. | A grounded response: "This laptop has 16GB RAM (per manufacturer specs)". An ungrounded response: "This laptop should have enough memory for your needs" (assumption without verification). |
| **Fine-Tuning** | — | The process of training a pre-existing LLM on domain-specific data to improve its performance for particular tasks or knowledge areas. | Fine-tuning a model on retail product catalogs, customer service transcripts, and return policies to create a specialized commerce assistant. |
| **Prompt Engineering** | — | The practice of crafting effective instructions and context to guide LLM behavior. Well-designed prompts significantly improve output quality and consistency. | A well-engineered prompt includes: role definition ("You are a knowledgeable electronics advisor"), constraints ("Only recommend in-stock products"), and format guidance ("Provide pros and cons"). |
| **Token** | — | The basic unit of text that LLMs process. Words are broken into tokens (roughly 4 characters each). Token limits constrain how much context an LLM can consider. | "MacBook Pro" is typically 3-4 tokens. A product page with specifications might be 500+ tokens. Understanding token economics is essential for cost and context management. |
| **Temperature** | — | A parameter controlling the randomness/creativity of LLM outputs. Lower temperature (0.0-0.3) produces more consistent, predictable responses. Higher temperature (0.7-1.0) increases variety. | For product specs and pricing: use low temperature for accuracy. For creative product descriptions and personalized recommendations: higher temperature enables more engaging, varied content. |
| **Inference** | — | The process of generating outputs from a trained model. Each AI response requires inference computation, which has associated latency and cost implications. | When a customer asks a question, inference happens to generate the response. High-traffic periods require scaling inference capacity to maintain response times. |

---

## Commerce & Retail Systems

Enterprise systems and concepts foundational to retail commerce that AI agents must integrate with.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **CDP** | Customer Data Platform | A system that collects and unifies all customer data into comprehensive profiles—including purchases, browsing behavior, preferences, and membership status. | CDP knows the customer is a loyalty program member who prefers premium brands, typically spends $800-1500 per transaction, and usually chooses in-store pickup. |
| **PIM** | Product Information Management | The master system storing all product data—names, descriptions, specifications, images, categories, and relationships. The "source of truth" for product information. | When an AI agent describes a laptop's specifications, that authoritative data comes from PIM—ensuring consistency across all channels and touchpoints. |
| **ATP** | Available to Promise | Real-time inventory calculation showing what's actually available to sell—accounting for reserved stock, in-transit inventory, and pending orders. | Website shows "5 in stock" because ATP calculated: 10 units in warehouse - 3 reserved for other orders - 2 in pending shipments = 5 available to promise. |
| **OMS** | Order Management System | The system that orchestrates order processing from placement through fulfillment—managing inventory allocation, fulfillment routing, and order status tracking. | When an AI agent places an order, OMS determines the optimal fulfillment location, allocates inventory, initiates picking/packing, and provides tracking information. |
| **Syndication** | Content Syndication | Distribution of product content (descriptions, images, specifications) to multiple channels via services like Syndigo, Salsify, or Akeneo. Ensures consistency everywhere. | A retailer syndicates TV specifications to their website, mobile app, marketplace listings, and affiliate partners—maintaining consistency across all touchpoints. |
| **Editorial Content** | — | Human-authored guides, comparisons, reviews, and recommendations that establish expertise and authority. Critical for GEO—AI agents cite authoritative content as trusted sources. | "Best 4K TVs for Gaming 2025" written by expert staff—gets cited by ChatGPT and Perplexity as a trusted, authoritative source when customers ask for recommendations. |
| **Headless Commerce** | — | An architecture that separates the front-end presentation layer from back-end commerce functionality, enabling flexible, API-driven experiences across any channel. | An AI agent can access the same commerce APIs (product, cart, checkout) as the website, mobile app, or in-store kiosk—enabling consistent functionality everywhere. |
| **Composable Commerce** | — | An approach to building commerce platforms from interchangeable, best-of-breed components connected via APIs rather than monolithic all-in-one platforms. | Combining specialized systems: Commercetools for cart/checkout + Algolia for search + Contentful for content + Stripe for payments—orchestrated by AI agents. |
| **MACH Architecture** | Microservices, API-first, Cloud-native, Headless | A set of principles for building modern, flexible commerce platforms that can easily integrate with AI capabilities. | MACH principles enable AI agents to access specific capabilities (inventory, pricing, customer data) through well-defined APIs without dealing with monolithic system constraints. |

---

## Generative Engine Optimization (GEO)

Strategies and metrics for optimizing brand visibility in AI-generated responses and recommendations.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **GEO** | Generative Engine Optimization | Optimizing content so AI agents cite and recommend a brand. Like SEO, but for ChatGPT, Gemini, Perplexity, and other AI assistants instead of traditional search engines. | When someone asks ChatGPT "what's the best 4K TV for gaming?", GEO strategies help ensure the retailer's buying guide gets cited as a trusted source in the response. |
| **Citation Share** | — | The percentage of AI-generated answers that cite a brand as a source. A key GEO metric that's replacing traditional search rankings as a measure of visibility. | If 100 people ask ChatGPT about laptop recommendations and 35 responses cite a specific retailer's content, that retailer has 35% citation share for that topic. |
| **Schema Markup** | Structured Data | Standardized data tags that help AI systems understand page content—products, reviews, FAQs, how-tos. Makes content machine-readable and more likely to be cited. | Schema markup tells AI: "This page has Product SKU12345, priced at $999, rated 4.5 stars from 2,847 reviews, with detailed specifications for gaming performance." |
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trustworthiness | Quality criteria that AI agents and search engines use to evaluate content credibility. Content from credible experts with demonstrated experience ranks higher. | A TV buying guide written by certified technicians with cited hands-on testing has higher E-E-A-T than generic AI-generated comparison content. |
| **AI Visibility** | — | The degree to which a brand appears in AI-generated responses across different engines, topics, and query types. A holistic measure of GEO performance. | Tracking visibility across: ChatGPT (product recommendations), Perplexity (research queries), Google AI Overviews (search), and Claude (shopping assistance). |
| **Answer Fitness** | — | How well content is structured and formatted to be selected and cited by AI systems. Includes factors like clear headings, concise answers, and factual accuracy. | Content with clear Q&A format, factual claims with sources, and structured data has higher answer fitness than dense, unstructured prose. |
| **Source Attribution** | — | When AI systems explicitly credit a source in their responses. Earning attribution requires authoritative, accurate, well-structured content that AI systems trust. | Perplexity response: "According to [Retailer]'s expert review, the Sony A95L offers the best picture quality for gaming [1]" with a clickable citation link. |

---

## Answer Engine Optimization (AEO)

Monitoring and optimizing brand presence in AI and LLM responses, with focus on measurement and competitive analysis.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **AEO** | Answer Engine Optimization | The practice of optimizing content specifically for visibility in AI-powered answer engines like ChatGPT, Claude, Perplexity, and Google's AI Overviews. | Restructuring FAQ content with clear questions and concise answers to improve likelihood of being cited when customers ask similar questions to AI assistants. |
| **SOV** | Share of Voice | The percentage of AI responses mentioning a brand compared to competitors for relevant queries. A competitive benchmark for AI visibility. | In "best laptop for students" queries: Brand A mentioned in 40% of responses, Brand B in 35%, Brand C in 25% = Brand A has 40% SOV. |
| **Brand Sentiment** | — | The positive, negative, or neutral tone with which AI systems discuss a brand. Influenced by training data, reviews, news coverage, and cited sources. | Monitoring whether AI responses describe the brand as "reliable and customer-focused" (positive) vs. "known for long wait times" (negative). |
| **Query Coverage** | — | The breadth of topics and query types where a brand appears in AI responses. Indicates depth of content authority across different subject areas. | Strong coverage: Brand appears in responses about product categories, buying guides, troubleshooting, comparisons, and pricing. Weak coverage: Only appears for branded queries. |
| **Response Monitoring** | — | Systematic tracking of how AI systems respond to relevant queries over time. Essential for identifying opportunities, threats, and the impact of optimization efforts. | Daily automated queries to ChatGPT, Perplexity, and Claude asking "What's the best retailer for electronics?" and tracking response trends over time. |
| **Competitive Intelligence** | — | Analysis of how competitors appear in AI responses compared to your brand. Identifies gaps, advantages, and emerging threats in AI visibility. | Discovering that a competitor is consistently cited for "sustainability" topics while your brand isn't mentioned—revealing a content gap opportunity. |

---

## Data & Analytics

Data infrastructure and analytical concepts essential for AI-powered commerce implementations.

| Term | Full Name | Definition | Example |
|------|-----------|------------|---------|
| **Grounding** | — | The practice of ensuring LLM responses are based on retrieved, verified data rather than the model's potentially outdated or incorrect training knowledge. | Instead of letting the AI guess product availability, grounding requires it to query the inventory system and base its response on actual real-time data. |
| **Vector Database** | — | A specialized database optimized for storing and querying vector embeddings, enabling fast semantic similarity search across large datasets. | Pinecone, Weaviate, or Qdrant storing product embeddings that enable "find products similar to this one" or "match customer query to relevant products" functionality. |
| **kNN** | k-Nearest Neighbors | An algorithm for finding the most similar vectors to a query vector. Used in semantic search to find products, content, or answers most relevant to a customer's intent. | Customer asks "laptop for photo editing"—kNN finds the 10 products with embeddings most similar to the query embedding, surfacing relevant laptops even without exact keyword matches. |
| **Distillation** | Data Distillation | The process of computing summary metrics and insights from raw data. Transforms verbose logs into actionable analytics and KPIs. | Converting thousands of individual AI interaction logs into metrics: average response accuracy, citation rate, customer satisfaction scores, and conversion rates. |
| **Feature Store** | — | A centralized repository for storing, managing, and serving machine learning features. Ensures consistency between training and production environments. | Customer features (lifetime value, purchase frequency, category preferences) stored centrally and served to AI agents in real-time during conversations. |
| **Real-Time Inference** | — | Generating AI predictions or responses at the moment they're needed, with low latency requirements. Essential for conversational commerce experiences. | When a customer asks a question, the response must be generated in under 2 seconds to maintain conversational flow—requiring optimized real-time inference infrastructure. |
| **Observability** | — | The ability to understand the internal state of AI systems through external outputs—logs, metrics, traces. Critical for debugging, optimization, and trust. | Tracing why an AI agent recommended a specific product: what context was provided, which tools were called, what data was retrieved, and how the final response was generated. |
| **Model Evaluation** | — | Systematic assessment of AI model performance across dimensions like accuracy, relevance, safety, and consistency. Ongoing evaluation ensures quality over time. | Weekly evaluation of commerce agent: % of accurate product information, % of successful tool calls, customer satisfaction scores, and safety violation rate. |

---

## Quick Reference Card

### The Agentic Commerce Stack

```
┌─────────────────────────────────────────────────────┐
│  CUSTOMER TOUCHPOINTS                               │
│  Voice assistants, Chat, Mobile, Web, In-store     │
├─────────────────────────────────────────────────────┤
│  AGENT LAYER                                        │
│  LLMs + Tool Calling + Guardrails + Context Engine │
├─────────────────────────────────────────────────────┤
│  PROTOCOL LAYER                                     │
│  ACP, AP2, MCP (Agent-to-System Communication)     │
├─────────────────────────────────────────────────────┤
│  COMMERCE SERVICES                                  │
│  OMS, PIM, CDP, ATP, Payments, Fulfillment         │
├─────────────────────────────────────────────────────┤
│  DATA LAYER                                         │
│  Vector DB, Feature Store, Analytics, RAG Sources  │
└─────────────────────────────────────────────────────┘
```

### Key Metrics for AI Commerce

| Category | Metric | Description |
|----------|--------|-------------|
| **Visibility** | Citation Share | % of AI responses citing your brand |
| **Visibility** | Share of Voice | Competitive mention percentage |
| **Quality** | Groundedness | % of responses based on verified data |
| **Quality** | Accuracy | Correctness of product/pricing info |
| **Performance** | Response Latency | Time to generate agent response |
| **Performance** | Tool Success Rate | % of API/tool calls that succeed |
| **Business** | Conversion Rate | % of AI interactions leading to purchase |
| **Business** | Customer Satisfaction | Post-interaction satisfaction scores |

---

## Learning Resources

### Recommended Reading Order

1. **Start Here**: AI/ML Fundamentals → Understand the technology
2. **Then**: Commerce & Retail Systems → Know the integration points
3. **Next**: Agent Orchestration & Patterns → Learn how agents work
4. **Then**: Agentic Commerce Protocols → Understand the emerging standards
5. **Finally**: GEO & AEO → Master visibility optimization

### Staying Current

The agentic commerce space is evolving rapidly. Key developments to monitor:

- **Protocol Evolution**: ACP, AP2, and MCP are actively being developed
- **Model Capabilities**: New LLM releases often add commerce-relevant features
- **Regulatory Landscape**: AI commerce regulations are emerging globally
- **Competitive Dynamics**: Major retailers and tech companies are racing to deploy

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Classification**: Internal - Accenture Song Commerce
**Maintainer**: Commerce GenAI Practice

---

*This glossary is a living document. Submit additions or corrections through the standard content review process.*
