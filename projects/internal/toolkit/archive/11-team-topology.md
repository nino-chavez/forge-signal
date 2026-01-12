# Team Topology - Agentic Commerce

**Companion Artifact 7 of 8**

---

## Team Structure Overview

Based on Team Topologies principles (stream-aligned, platform, enabling, complicated-subsystem teams).

---

## 1. Recommended Team Structure

```
                    ┌─────────────────────────────────────┐
                    │        Product Leadership           │
                    │   (VP Product / Head of AI Commerce)│
                    └─────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────────┐           ┌───────────────┐
│  AI Platform  │           │  Agent Experience │           │   Commerce    │
│     Team      │           │       Team        │           │  Integration  │
│  (Platform)   │           │ (Stream-Aligned)  │           │     Team      │
└───────────────┘           └───────────────────┘           └───────────────┘
        │                             │                             │
        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────────┐           ┌───────────────┐
│   AI/ML CoE   │           │    Trust & Safety │           │   Analytics   │
│  (Enabling)   │           │ (Complicated Sub) │           │  (Enabling)   │
└───────────────┘           └───────────────────┘           └───────────────┘
```

---

## 2. Team Definitions

### 2.1 AI Platform Team (Platform Team)

**Mission:** Provide AI/ML infrastructure that enables product teams to build agent experiences without deep ML expertise.

**Responsibilities:**
- LLM Gateway and provider management
- Vector store / RAG infrastructure
- Memory store infrastructure
- Observability platform (LangSmith/Phoenix)
- Prompt registry and versioning
- Resilience and fallback systems

**Team Composition:**
| Role | Count | Skills |
|------|-------|--------|
| Tech Lead | 1 | ML systems, distributed systems |
| ML Engineer | 2 | LLM fine-tuning, embeddings, RAG |
| Platform Engineer | 2 | Kubernetes, observability, DevOps |
| **Total** | **5** | |

**Interfaces:**
- Provides: LLM API, Vector API, Memory API, Observability dashboards
- Consumes: Cloud infrastructure, LLM provider APIs

---

### 2.2 Agent Experience Team (Stream-Aligned Team)

**Mission:** Build and operate domain agents that deliver customer value through AI-powered commerce experiences.

**Responsibilities:**
- Shopping Agent development
- Service Agent development
- Returns Agent development
- Fulfillment Agent development
- Agent prompt engineering and optimization
- Agent performance monitoring and improvement

**Team Composition:**
| Role | Count | Skills |
|------|-------|--------|
| Tech Lead | 1 | Agent frameworks, prompt engineering |
| AI Engineer | 2-3 | LangChain/LangGraph, Python |
| Product Manager | 1 | Commerce domain, customer experience |
| UX Designer | 0.5 | Conversational design |
| QA Engineer | 1 | Agent testing, conversation QA |
| **Total** | **5.5-6.5** | |

**Interfaces:**
- Provides: Agent endpoints for Protocol Layer
- Consumes: AI Platform services, Commerce APIs, Customer APIs

---

### 2.3 Commerce Integration Team (Stream-Aligned Team)

**Mission:** Integrate commerce systems and expose capabilities to agents through well-defined APIs.

**Responsibilities:**
- Protocol Layer implementation (ACP, MCP, AP2)
- Agent Registry management
- Commerce API abstraction
- Payment/Mandate integration
- Order/Fulfillment integration
- Webhook infrastructure

**Team Composition:**
| Role | Count | Skills |
|------|-------|--------|
| Tech Lead | 1 | API design, integration patterns |
| Backend Engineer | 2-3 | Node/Python, REST/GraphQL |
| Integration Engineer | 1-2 | Commerce platforms, payment systems |
| Product Manager | 0.5 | Commerce operations |
| **Total** | **4.5-6.5** | |

**Interfaces:**
- Provides: Unified Commerce API, Protocol endpoints
- Consumes: Headless Commerce, OMS, Payment platforms

---

### 2.4 Trust & Safety Team (Complicated-Subsystem Team)

**Mission:** Ensure agent interactions are safe, compliant, and appropriately escalated.

**Responsibilities:**
- Consent & Data Access Control layer
- Guardrails implementation
- Confidence scoring models
- Human handoff workflows
- Audit logging and compliance
- Fraud detection for agent transactions

**Team Composition:**
| Role | Count | Skills |
|------|-------|--------|
| Tech Lead | 1 | Security, compliance, ML |
| Security Engineer | 1 | IAM, data classification |
| ML Engineer | 1 | Confidence models, anomaly detection |
| Compliance Analyst | 0.5 | GDPR, CCPA, PCI |
| **Total** | **3.5** | |

**Interfaces:**
- Provides: Consent API, Guardrails API, Escalation workflows
- Consumes: CDP consent data, CRM for escalation

---

### 2.5 AI/ML Center of Excellence (Enabling Team)

**Mission:** Elevate AI/ML capabilities across the organization through training, best practices, and innovation.

**Responsibilities:**
- Prompt engineering best practices
- Model evaluation frameworks
- AI ethics guidelines
- Training and enablement
- Proof-of-concept development
- Industry trend monitoring

**Team Composition:**
| Role | Count | Skills |
|------|-------|--------|
| AI/ML Lead | 1 | Research, strategy |
| AI Researcher | 1 | Latest techniques, papers |
| Developer Advocate | 0.5 | Training, documentation |
| **Total** | **2.5** | |

**Interfaces:**
- Provides: Training, guidelines, POC support
- Consumes: Industry research, platform feedback

---

### 2.6 Analytics Team (Enabling Team)

**Mission:** Provide insights on agent performance, customer behavior, and business impact.

**Responsibilities:**
- Agent analytics dashboards
- A/B testing infrastructure
- GEO analytics (AI search visibility)
- Customer journey analysis
- ROI measurement

**Team Composition:**
| Role | Count | Skills |
|------|-------|--------|
| Analytics Lead | 1 | Data strategy, BI |
| Data Engineer | 1 | ETL, data pipelines |
| Data Analyst | 1 | SQL, dashboards, insights |
| **Total** | **3** | |

**Interfaces:**
- Provides: Dashboards, reports, A/B test results
- Consumes: Event streams, agent logs, commerce data

---

## 3. Total Team Size by Phase

| Phase | AI Platform | Agent Exp | Commerce Int | Trust | CoE | Analytics | Total |
|-------|-------------|-----------|--------------|-------|-----|-----------|-------|
| Day 1 MVP | 3 | 4 | 4 | 2 | 1 | 1 | **15** |
| Phase 2 | 5 | 6 | 5 | 3 | 2 | 2 | **23** |
| Phase 3 | 5 | 7 | 6 | 4 | 3 | 3 | **28** |

---

## 4. Skills Matrix

### Critical Skills (Must Have)

| Skill | Team(s) | Priority |
|-------|---------|----------|
| LLM/Prompt Engineering | Agent Exp, AI Platform, CoE | Critical |
| LangChain/LangGraph | Agent Exp | Critical |
| Python | All engineering teams | Critical |
| API Design (REST/GraphQL) | Commerce Int | Critical |
| Commerce Platform (specific) | Commerce Int | Critical |
| Security/IAM | Trust | Critical |

### Important Skills (Should Have)

| Skill | Team(s) | Priority |
|-------|---------|----------|
| ML/Model Training | AI Platform, Trust | High |
| Vector Databases | AI Platform | High |
| Kubernetes/Cloud | AI Platform | High |
| Conversational UX | Agent Exp | High |
| Data Engineering | Analytics | High |

### Emerging Skills (Nice to Have)

| Skill | Team(s) | Priority |
|-------|---------|----------|
| Multi-agent systems | Agent Exp, CoE | Medium |
| GEO/AI Search | Analytics, CoE | Medium |
| Voice AI | Agent Exp | Low |

---

## 5. Collaboration Model

### Interaction Modes

| From Team | To Team | Interaction Mode |
|-----------|---------|------------------|
| Agent Exp | AI Platform | Collaboration (frequent) |
| Agent Exp | Commerce Int | Collaboration (frequent) |
| Agent Exp | Trust | X-as-a-Service (API) |
| Commerce Int | Trust | X-as-a-Service (API) |
| CoE | All teams | Facilitating (enabling) |
| Analytics | All teams | X-as-a-Service (dashboards) |

### Ceremonies

| Ceremony | Frequency | Participants | Purpose |
|----------|-----------|--------------|---------|
| Agent Sync | Weekly | Agent Exp, AI Platform | Technical alignment |
| Integration Review | Bi-weekly | Commerce Int, Agent Exp | API changes |
| Trust Review | Monthly | Trust, All teams | Security/compliance updates |
| AI Community of Practice | Bi-weekly | All interested | Knowledge sharing |
| Demo Day | Bi-weekly | All teams | Show & tell |

---

## 6. Governance

### Decision Rights

| Decision Type | Decision Maker | Consulted | Informed |
|---------------|----------------|-----------|----------|
| LLM Provider Selection | AI Platform Lead | CoE, Finance | All teams |
| Agent Behavior Changes | Agent Exp PM | Trust, CoE | Commerce Int |
| Commerce API Changes | Commerce Int Lead | Agent Exp | All teams |
| Escalation Thresholds | Trust Lead | Agent Exp, Legal | All teams |
| New Agent Launch | VP Product | All teams | Executive |

### Escalation Path

1. Team Lead → Team Lead (peer resolution)
2. → VP Product (if cross-team conflict)
3. → Executive Sponsor (if budget/strategy impact)

---

## 7. Hiring Roadmap

### Phase 1 (Months 1-3)

| Role | Team | Priority |
|------|------|----------|
| AI Platform Tech Lead | AI Platform | 1 |
| Agent Experience Tech Lead | Agent Exp | 1 |
| Commerce Integration Lead | Commerce Int | 1 |
| ML Engineer | AI Platform | 2 |
| AI Engineer (2) | Agent Exp | 2 |

### Phase 2 (Months 4-6)

| Role | Team | Priority |
|------|------|----------|
| Platform Engineer | AI Platform | 1 |
| Trust Lead | Trust | 1 |
| Backend Engineer | Commerce Int | 2 |
| Data Engineer | Analytics | 2 |
| QA Engineer | Agent Exp | 2 |

### Phase 3 (Months 7-12)

Scale teams based on agent adoption and roadmap requirements.

---

## 8. External Support

### When to Use Contractors/Consultants

| Scenario | Recommendation |
|----------|----------------|
| Initial architecture design | SI/Consultant (3-6 months) |
| LLM expertise ramp-up | Specialist consultants |
| Commerce platform integration | SI familiar with platform |
| Compliance audit | External auditors |
| Load testing/security | Specialized firms |

### Build vs Partner

| Capability | Build | Partner |
|------------|-------|---------|
| Core agents (Shopping, Service) | ✅ | |
| AI Platform infrastructure | ✅ | |
| Commerce platform | | ✅ (SaaS) |
| Payment processing | | ✅ (SaaS) |
| Observability | | ✅ (SaaS) |
| Consent management | Hybrid | ✅ (SaaS + custom) |

---

*Team Topology v1.0 | Agentic Commerce Reference Architecture*
