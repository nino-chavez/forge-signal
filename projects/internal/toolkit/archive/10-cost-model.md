# Cost Model Template - Agentic Commerce

**Companion Artifact 6 of 8**

---

## Cost Model Structure

This template provides a framework for estimating costs. Actual values should be populated based on vendor quotes and volume projections.

---

## 1. LLM/AI Costs (Variable)

### 1.1 LLM API Usage

| Provider | Model | Input (per 1M tokens) | Output (per 1M tokens) | Est. Monthly Volume | Est. Monthly Cost |
|----------|-------|----------------------|------------------------|---------------------|-------------------|
| OpenAI | GPT-4 Turbo | $10.00 | $30.00 | [Input M tokens] | [Calculate] |
| OpenAI | GPT-4o | $5.00 | $15.00 | [Input M tokens] | [Calculate] |
| Anthropic | Claude 3.5 Sonnet | $3.00 | $15.00 | [Input M tokens] | [Calculate] |
| Anthropic | Claude 3 Haiku | $0.25 | $1.25 | [Input M tokens] | [Calculate] |
| Google | Gemini Pro | $1.25 | $5.00 | [Input M tokens] | [Calculate] |

**Estimation Formula:**
```
Monthly Token Volume = Avg Tokens per Conversation × Conversations per Month
Monthly Cost = (Input Tokens × Input Rate) + (Output Tokens × Output Rate)
```

**Typical Ratios:**
- Shopping conversation: ~2,000 tokens input, ~500 tokens output
- Support conversation: ~1,500 tokens input, ~400 tokens output
- RAG context: adds ~1,000-3,000 tokens per query

### 1.2 Vector Database

| Provider | Tier | Vectors | Queries/Month | Monthly Cost |
|----------|------|---------|---------------|--------------|
| Pinecone | Starter | 100K | 1M | $0 (free) |
| Pinecone | Standard | 1M | 10M | ~$70 |
| Pinecone | Enterprise | 10M+ | 100M+ | Custom |
| Weaviate Cloud | Sandbox | 100K | Unlimited | $0 (free) |
| Weaviate Cloud | Standard | 1M | Unlimited | ~$100 |

### 1.3 Observability

| Provider | Tier | Traces/Month | Monthly Cost |
|----------|------|--------------|--------------|
| LangSmith | Developer | 5K | $0 (free) |
| LangSmith | Plus | 50K | $39 |
| LangSmith | Enterprise | Unlimited | Custom |
| Phoenix (Arize) | Cloud | 100K | ~$99 |

---

## 2. Platform/SaaS Costs (Fixed + Variable)

### 2.1 Commerce Platform

| Category | Pricing Model | Typical Range |
|----------|---------------|---------------|
| Headless Commerce | GMV % or fixed | 0.5-2% GMV or $2K-50K/mo |
| AI Search | Queries/Records | $500-5K/mo |
| PIM | SKU count | $1K-10K/mo |
| DAM | Storage/Users | $500-3K/mo |
| CMS | Users/Content | $500-5K/mo |

### 2.2 Customer Platform

| Category | Pricing Model | Typical Range |
|----------|---------------|---------------|
| CDP | MTU (tracked users) | $1K-20K/mo |
| CIAM | MAU (active users) | $500-5K/mo |
| Service CRM | Agents + Cases | $2K-20K/mo |
| Marketing Automation | Contacts + Sends | $1K-10K/mo |

### 2.3 Operations

| Category | Pricing Model | Typical Range |
|----------|---------------|---------------|
| OMS | Orders/SKUs | $5K-50K/mo |
| Payment Processing | Transaction % | 2.5-3.5% + $0.30 |
| Fraud Prevention | Transaction % | 0.5-1.5% |

---

## 3. Infrastructure Costs

### 3.1 Cloud Compute

| Component | Sizing | Est. Monthly Cost |
|-----------|--------|-------------------|
| API Gateway | Requests/mo | $200-2K |
| Orchestration Service | vCPU/Memory | $500-5K |
| Agent Services | vCPU/Memory | $1K-10K |
| Cache (Redis) | GB Memory | $100-1K |
| Message Queue | Messages/mo | $100-500 |

### 3.2 Data Storage

| Type | Sizing | Est. Monthly Cost |
|------|--------|-------------------|
| Relational DB | GB + IOPS | $500-5K |
| Document DB | GB + Throughput | $300-3K |
| Object Storage | TB | $50-500 |
| Data Warehouse | TB Processed | $500-5K |

---

## 4. Development & Operations Costs

### 4.1 Initial Build (One-Time)

| Phase | Effort (Person-Months) | Loaded Cost @ $15K/PM |
|-------|------------------------|----------------------|
| Day 1 MVP | 12-18 PM | $180K-270K |
| Phase 2 | 8-12 PM | $120K-180K |
| Phase 3 | 6-10 PM | $90K-150K |
| **Total** | **26-40 PM** | **$390K-600K** |

### 4.2 Ongoing Operations (Annual)

| Role | FTE | Loaded Cost/Year |
|------|-----|------------------|
| AI/ML Engineer | 1-2 | $200K-400K |
| Platform Engineer | 1-2 | $180K-360K |
| Commerce Engineer | 1 | $150K |
| DevOps/SRE | 0.5-1 | $100K-200K |
| Product Manager | 0.5 | $90K |
| **Total** | **4-6.5 FTE** | **$720K-1.2M** |

---

## 5. Cost Optimization Levers

### 5.1 LLM Cost Reduction

| Strategy | Potential Savings |
|----------|-------------------|
| Prompt optimization (fewer tokens) | 20-40% |
| Model tiering (Haiku for simple, GPT-4 for complex) | 30-50% |
| Response caching | 10-30% |
| Local model for low-complexity tasks | 40-60% |
| Semantic caching (similar query reuse) | 15-25% |

### 5.2 Volume-Based Negotiation

| Threshold | Typical Discount |
|-----------|------------------|
| $10K/mo spend | 10-15% |
| $50K/mo spend | 15-25% |
| $100K/mo spend | 25-35% |
| Annual commitment | Additional 10-20% |

---

## 6. ROI Calculation Framework

### 6.1 Cost Avoidance

| Metric | Calculation |
|--------|-------------|
| Agent Containment Rate | % of inquiries resolved without human |
| Cost per Human Contact | $8-15 (varies by channel) |
| Cost per Agent Contact | $0.10-0.50 (LLM + infrastructure) |
| **Savings per Contact** | $7.50-14.50 |

**Example:**
- 100,000 monthly support contacts
- 70% containment rate = 70,000 agent-handled
- Savings: 70,000 × $10 = $700,000/month

### 6.2 Revenue Uplift

| Metric | Calculation |
|--------|-------------|
| Agent Conversion Rate | % of agent interactions → purchase |
| Avg Order Value | $ per order |
| Incremental Margin | Additional contribution |

**Example:**
- 50,000 agent shopping conversations
- 5% conversion rate = 2,500 orders
- $100 AOV × 30% margin = $30 contribution
- Incremental Revenue: 2,500 × $30 = $75,000/month

### 6.3 Payback Period

```
Payback (months) = Total Investment / (Monthly Savings + Monthly Revenue Uplift)

Example:
Investment: $500,000
Monthly Benefit: $700K (savings) + $75K (revenue) = $775K
Payback: 0.6 months (essentially immediate ROI)
```

---

## 7. Total Cost of Ownership (TCO) Summary

| Category | Year 1 | Year 2 | Year 3 |
|----------|--------|--------|--------|
| Initial Build | $400K | - | - |
| Platform/SaaS | $300K | $350K | $400K |
| LLM/AI Costs | $200K | $400K | $600K |
| Infrastructure | $150K | $200K | $250K |
| Operations (People) | $800K | $900K | $1M |
| **Total TCO** | **$1.85M** | **$1.85M** | **$2.25M** |

| Benefit | Year 1 | Year 2 | Year 3 |
|---------|--------|--------|--------|
| Cost Avoidance | $4M | $6M | $8M |
| Revenue Uplift | $500K | $1M | $1.5M |
| **Total Benefit** | **$4.5M** | **$7M** | **$9.5M** |

| **Net Value** | **$2.65M** | **$5.15M** | **$7.25M** |

---

## 8. Budget Planning Template

### Phase Budget Allocation

| Phase | Development | Platform | AI/ML | Infra | Contingency | Total |
|-------|-------------|----------|-------|-------|-------------|-------|
| Day 1 MVP | 60% | 20% | 10% | 5% | 5% | 100% |
| Phase 2 | 50% | 25% | 15% | 5% | 5% | 100% |
| Phase 3 | 40% | 30% | 20% | 5% | 5% | 100% |

---

*Cost Model Template v1.0 | Agentic Commerce Reference Architecture*

**Note:** All figures are illustrative. Actual costs depend on volume, vendor selection, and negotiated rates. Update with real quotes and projections for implementation planning.
