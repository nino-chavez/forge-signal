# Agentic AI Workforce Capability Framework

## Executive Summary

As agentic AI moves from POC to production, the delivery workforce must evolve. This framework defines the roles, skills, assessments, and pyramid structures needed to deliver agentic commerce solutions at scale.

---

## The Capability Gap

### What's Different About Agentic Work

| Traditional AI/ML | Agentic AI |
|-------------------|------------|
| Model training & fine-tuning | Agent orchestration & tool design |
| Batch predictions | Real-time reasoning loops |
| Static pipelines | Dynamic, multi-step workflows |
| Single-model optimization | Multi-agent coordination |
| Accuracy metrics | Behavior evaluation & safety |
| Data engineering focus | Knowledge engineering focus |

**Key Insight:** Agentic AI requires a blend of software engineering, systems thinking, and domain expertise that doesn't exist in current ML or traditional software teams.

---

## Role Taxonomy

### Tier 1: Core Agentic Roles (New)

#### 1. Agentic Systems Architect
**Level:** Senior Manager / Managing Director
**Pyramid Position:** Apex technical leadership

**Responsibilities:**
- Design multi-agent system architectures
- Define agent boundaries, responsibilities, and coordination patterns
- Establish guardrails, safety constraints, and fallback strategies
- Own technical risk and architectural decisions

**Required Skills:**
- Distributed systems design (10+ years)
- LLM/Foundation model understanding (deep)
- Multi-agent patterns (supervisor, hierarchical, collaborative)
- Production AI systems experience
- Security and compliance for AI

**Assessment:**
- Architecture design exercise: "Design an agentic system for X"
- Failure mode analysis: "What can go wrong? How do you prevent it?"
- Trade-off discussion: "Latency vs. accuracy vs. cost"

---

#### 2. Agent Engineer
**Level:** Consultant / Senior Consultant
**Pyramid Position:** Core delivery

**Responsibilities:**
- Implement agent logic, tools, and orchestration
- Build and maintain tool libraries
- Integrate with enterprise systems
- Debug agent behavior and reasoning chains

**Required Skills:**
- Python (strong), TypeScript (proficient)
- Agent frameworks: LangChain, LangGraph, AutoGen, CrewAI, Semantic Kernel
- Function/tool calling patterns
- Async programming and streaming
- API design and integration

**Assessment:**
```
Skills Test: Agent Implementation (4 hours)
1. Build an agent that can:
   - Search a product catalog
   - Compare products on multiple dimensions
   - Make a recommendation with reasoning
   - Handle edge cases gracefully

2. Evaluation criteria:
   - Tool design quality
   - Error handling
   - Reasoning transparency
   - Code quality
```

---

#### 3. Prompt Engineer / Agent Instructor
**Level:** Analyst / Consultant
**Pyramid Position:** Specialized delivery

**Responsibilities:**
- Craft system prompts and agent instructions
- Design prompt templates and few-shot examples
- Optimize for consistency, safety, and performance
- A/B test prompt variations

**Required Skills:**
- Deep understanding of LLM behavior
- Structured output design (JSON, XML)
- Chain-of-thought and reasoning patterns
- Evaluation methodology
- Strong written communication

**Assessment:**
```
Skills Test: Prompt Engineering (2 hours)
1. Given a failing agent interaction, diagnose and fix
2. Design prompts for a multi-step task with constraints
3. Create evaluation rubric for agent responses
```

---

#### 4. Knowledge Engineer
**Level:** Consultant / Senior Consultant
**Pyramid Position:** Specialized delivery

**Responsibilities:**
- Design and build knowledge bases
- Implement RAG pipelines and retrieval strategies
- Manage embeddings, chunking, and indexing
- Curate and maintain knowledge quality

**Required Skills:**
- Vector databases (Pinecone, Weaviate, Qdrant, pgvector)
- Embedding models and selection
- Chunking strategies and metadata design
- Knowledge graph fundamentals
- Information retrieval theory

**Assessment:**
```
Skills Test: RAG System Design (3 hours)
1. Given a document corpus, design retrieval strategy
2. Implement hybrid search (semantic + keyword)
3. Evaluate retrieval quality with metrics
4. Handle multi-hop reasoning requirements
```

---

#### 5. Agentic QA Engineer
**Level:** Analyst / Consultant
**Pyramid Position:** Quality assurance

**Responsibilities:**
- Design test cases for agent behavior
- Build evaluation datasets and benchmarks
- Implement automated testing pipelines
- Monitor production agent performance

**Required Skills:**
- AI/ML testing methodologies
- Evaluation metrics (beyond accuracy)
- Red teaming and adversarial testing
- Observability and monitoring
- Statistical analysis

**Assessment:**
```
Skills Test: Agent Evaluation (3 hours)
1. Design test suite for a shopping assistant agent
2. Create adversarial test cases (jailbreaks, edge cases)
3. Define success metrics and thresholds
4. Build automated evaluation pipeline
```

---

### Tier 2: Adjacent Roles (Reskill)

#### 6. Conversational Designer
**Reskill From:** UX Designer, Content Strategist
**Delta Training:** 40-80 hours

**New Skills Needed:**
- Multi-turn conversation design
- Fallback and error recovery patterns
- Persona and tone calibration
- Agent capability communication

---

#### 7. AI Product Manager
**Reskill From:** Product Manager, Technical PM
**Delta Training:** 60-100 hours

**New Skills Needed:**
- AI capability assessment
- Prompt engineering basics
- Evaluation methodology
- AI ethics and safety
- Managing non-deterministic systems

---

#### 8. Domain Expert (Retail/Commerce)
**Reskill From:** Industry SME, Business Analyst
**Delta Training:** 40-60 hours

**New Skills Needed:**
- Agent capability understanding
- Knowledge curation for AI
- Use case identification and prioritization
- Prompt review and feedback

---

### Tier 3: Supporting Roles (Augment)

| Role | Agentic Augmentation |
|------|---------------------|
| Data Engineer | Vector DB ops, embedding pipelines |
| DevOps/Platform | LLMOps, model serving, observability |
| Security Engineer | AI-specific threats, prompt injection |
| Solutions Architect | Agent integration patterns |

---

## Team Pyramid Structure

### Small Team (POC/Pilot)
```
        1 Agentic Architect
              │
    ┌─────────┼─────────┐
    │         │         │
2 Agent    1 Prompt   1 Knowledge
Engineers  Engineer   Engineer
    │
1 Agentic QA
```
**Total:** 6 FTEs
**Duration:** 8-12 weeks
**Deliverable:** Working POC with 2-3 use cases

---

### Medium Team (Production MVP)
```
           1 Agentic Architect
                  │
        ┌─────────┼─────────┐
        │         │         │
   1 Tech Lead   1 AI PM   1 Domain Lead
        │
   ┌────┴────┬────────┬────────┐
   │         │        │        │
4 Agent   2 Prompt  2 Know.  2 Conv.
Engineers Engineers Engineers Designers
   │
2 Agentic QA
```
**Total:** 16 FTEs
**Duration:** 16-24 weeks
**Deliverable:** Production system with full use case coverage

---

### Large Team (Enterprise Scale)
```
              1 Practice Lead (MD)
                     │
        ┌────────────┼────────────┐
        │            │            │
   1 Chief      1 AI Product   1 Domain
   Architect    Director       Director
        │
   ┌────┴────┬────────┬────────┬────────┐
   │         │        │        │        │
  Agent    Prompt   Know.    Conv.    Quality
  Squad    Squad    Squad    Squad    Squad
  (8)      (4)      (4)      (4)      (4)
```
**Total:** 28 FTEs
**Duration:** Ongoing
**Deliverable:** Multi-domain agentic platform

---

## Skills Assessment Framework

### Technical Assessment Matrix

| Skill Area | Analyst | Consultant | Sr. Consultant | Manager |
|------------|---------|------------|----------------|---------|
| LLM Fundamentals | Aware | Proficient | Expert | Expert |
| Agent Frameworks | Learning | Proficient | Expert | Architect |
| Prompt Engineering | Proficient | Expert | Expert | Reviewer |
| RAG/Knowledge | Aware | Proficient | Expert | Architect |
| Tool Design | Learning | Proficient | Expert | Reviewer |
| Evaluation | Proficient | Expert | Expert | Strategist |
| Production Systems | Aware | Proficient | Expert | Architect |

### Scoring Rubric

**1 - Aware:** Understands concepts, can discuss intelligently
**2 - Learning:** Can complete guided tasks, needs supervision
**3 - Proficient:** Can work independently, delivers quality
**4 - Expert:** Can solve novel problems, mentors others
**5 - Architect:** Defines patterns, makes strategic decisions

---

## Hiring vs. Reskilling Decision Matrix

| Role | Build (Hire) | Buy (Reskill) | Rationale |
|------|--------------|---------------|-----------|
| Agentic Architect | Hire | — | Rare skill, high impact |
| Agent Engineer | Hire + Reskill | From: Backend Engineers | 60% reskill viable |
| Prompt Engineer | Reskill | From: Content, UX, QA | High reskill success |
| Knowledge Engineer | Hire + Reskill | From: Data Engineers | 50% reskill viable |
| Agentic QA | Reskill | From: QA Engineers | High reskill success |
| Conversational Designer | Reskill | From: UX Designers | High reskill success |

---

## Reskilling Programs

### Fast Track: Prompt Engineering (40 hours)
**For:** Content strategists, UX writers, QA engineers
**Outcome:** Can design and iterate prompts independently

```
Week 1: LLM Fundamentals (8 hrs)
- How LLMs work (conceptual)
- Tokenization and context windows
- Model capabilities and limitations

Week 2: Prompt Patterns (16 hrs)
- Zero-shot, few-shot, chain-of-thought
- System prompts and personas
- Structured outputs
- Hands-on exercises

Week 3: Evaluation & Iteration (16 hrs)
- Designing evaluation criteria
- A/B testing prompts
- Red teaming basics
- Capstone project
```

---

### Standard Track: Agent Engineering (120 hours)
**For:** Backend engineers, full-stack developers
**Outcome:** Can build production agent systems

```
Month 1: Foundations (40 hrs)
- LLM APIs and SDKs
- Agent frameworks (LangChain, LangGraph)
- Tool/function calling
- Memory patterns

Month 2: Advanced Patterns (40 hrs)
- Multi-agent orchestration
- RAG integration
- Streaming and async
- Error handling and fallbacks

Month 3: Production (40 hrs)
- Observability and monitoring
- Testing and evaluation
- Deployment patterns
- Security and guardrails
- Capstone: Build production agent
```

---

### Deep Track: Agentic Architecture (200 hours)
**For:** Senior architects, tech leads
**Outcome:** Can design enterprise agentic systems

```
Month 1: Agentic Foundations (40 hrs)
- Complete agent engineering curriculum
- Focus on patterns and trade-offs

Month 2: System Design (60 hrs)
- Multi-agent architectures
- Enterprise integration patterns
- Scalability and performance
- Case study analysis

Month 3: Production Excellence (60 hrs)
- Safety and alignment
- Governance and compliance
- Cost optimization
- Organizational patterns

Month 4: Leadership (40 hrs)
- Technical leadership for AI
- Stakeholder communication
- Risk management
- Capstone: Architecture design review
```

---

## Job Specifications

### Agent Engineer - Job Spec

**Title:** Agent Engineer
**Level:** Consultant / Senior Consultant
**Practice:** AI & Intelligent Automation

**Role Summary:**
Design and build agentic AI systems that autonomously complete complex tasks for enterprise clients. Work at the intersection of software engineering, AI/ML, and business domain expertise.

**Responsibilities:**
- Implement agent logic using frameworks like LangChain, LangGraph, or Semantic Kernel
- Design and build tools that enable agents to interact with enterprise systems
- Develop RAG pipelines and knowledge retrieval systems
- Debug agent behavior and optimize reasoning chains
- Collaborate with prompt engineers, architects, and domain experts
- Contribute to reusable agent patterns and accelerators

**Required Qualifications:**
- 3+ years software engineering experience
- Strong Python; proficient TypeScript
- Experience with at least one agent framework
- Understanding of LLMs and prompt engineering
- API design and integration experience
- CS degree or equivalent experience

**Preferred Qualifications:**
- Production AI/ML system experience
- Vector database experience
- Async programming and streaming
- Cloud platform experience (AWS/Azure/GCP)

**Technical Assessment:**
- Live coding: Implement agent with tools
- System design: Multi-agent architecture
- Debugging: Fix failing agent interaction

---

### Agentic Systems Architect - Job Spec

**Title:** Agentic Systems Architect
**Level:** Senior Manager / Managing Director
**Practice:** AI & Intelligent Automation

**Role Summary:**
Lead the technical vision for enterprise agentic AI systems. Define architectures, establish patterns, and ensure production readiness for autonomous AI solutions.

**Responsibilities:**
- Design multi-agent system architectures
- Define agent boundaries, responsibilities, and coordination
- Establish guardrails, safety constraints, and governance
- Lead technical teams through complex implementations
- Own technical risk and architectural decisions
- Advise clients on agentic AI strategy and roadmap

**Required Qualifications:**
- 10+ years software/systems architecture
- 3+ years AI/ML systems experience
- Deep understanding of LLMs and agent patterns
- Production distributed systems experience
- Track record of technical leadership
- MS/PhD in CS or equivalent experience

**Preferred Qualifications:**
- Published research or thought leadership in AI
- Experience with AI safety and alignment
- Multi-industry AI implementation experience
- Consulting or advisory experience

**Technical Assessment:**
- Architecture review: Critique existing design
- System design: Design agentic platform
- Case study: Failure analysis and mitigation

---

## Certification Path

### Internal Certifications

```
┌─────────────────────────────────────────────────────────┐
│                  Agentic AI Practitioner                │
│                    (Entry Certification)                │
│  Requirements: 40-hr course + assessment + project      │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Agent Engineer  │ │ Prompt Engineer │ │ Knowledge       │
│ Specialist      │ │ Specialist      │ │ Engineer Spec.  │
│                 │ │                 │ │                 │
│ 120-hr track    │ │ 60-hr track     │ │ 80-hr track     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │               │               │
          └───────────────┼───────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Agentic AI Architect                   │
│                  (Expert Certification)                 │
│  Requirements: 2+ specializations + 200-hr track        │
│                + architecture review + client delivery  │
└─────────────────────────────────────────────────────────┘
```

---

## Metrics and KPIs

### Workforce Readiness Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Certified Agentic Practitioners | 500 by Q4 | Training completions |
| Agent Engineer capacity | 200 FTEs | Certified specialists |
| Agentic Architects | 25 | Expert certifications |
| Reskill conversion rate | 70% | Successful assessments |
| Time to productivity | 90 days | First billable delivery |

### Delivery Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Agent task completion rate | >90% | Production monitoring |
| Agent safety incidents | <0.1% | Incident reports |
| Client satisfaction | >4.5/5 | Project surveys |
| Reusable asset creation | 5/quarter | Asset registry |

---

## Investment Summary

### Year 1 Workforce Build

| Category | Investment | Outcome |
|----------|------------|---------|
| External Hiring | 15-20 specialists | Core capability nucleus |
| Reskilling Programs | 200 practitioners | Scaled delivery capacity |
| Training Development | Curriculum creation | Sustainable pipeline |
| Certification Program | Assessment infrastructure | Quality assurance |
| **Total FTE Capacity** | **~200** | **Ready for scale** |

### Build vs. Buy Recommendation

**Build (Internal):**
- Agent Engineers (reskill from SWE)
- Prompt Engineers (reskill from content/UX)
- Agentic QA (reskill from QA)

**Buy (External Hire):**
- Agentic Architects (scarce, hire)
- Knowledge Engineers (specialized, hire)
- AI Research leads (PhD-level, hire)

**Partner:**
- Model providers (OpenAI, Anthropic, Google)
- Vector DB vendors (Pinecone, Weaviate)
- Agent framework maintainers

---

## Appendix: Interview Questions

### Agent Engineer - Technical Screen

1. "Walk me through how you would design an agent that can help a customer find the right laptop."
2. "What's the difference between ReAct and function calling? When would you use each?"
3. "How do you handle an agent that's stuck in a loop?"
4. "Explain how you would implement memory in a conversational agent."
5. "What metrics would you use to evaluate agent performance?"

### Agentic Architect - System Design

1. "Design an agentic system for a retail company that needs to handle product discovery, comparison, and purchase assistance."
2. "How would you architect a multi-agent system where agents need to collaborate?"
3. "What are the key failure modes in agentic systems? How do you mitigate them?"
4. "How do you balance latency, cost, and quality in an agentic system?"
5. "Describe your approach to AI safety in production agent systems."

---

*Last Updated: December 2024*
*Framework Version: 1.0*
*Owner: AI & Intelligent Automation Practice*
