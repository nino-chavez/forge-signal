# Agentic AI Roles - Quick Reference

## The Five Core Roles

```
┌────────────────────────────────────────────────────────────────────┐
│                     AGENTIC SYSTEMS ARCHITECT                      │
│  "The one who designs how agents work together"                    │
│                                                                    │
│  Hire: External (scarce skill)                                     │
│  Level: SM/MD                                                      │
│  Key: Multi-agent design, safety, enterprise integration           │
└────────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  AGENT ENGINEER  │  │ PROMPT ENGINEER  │  │KNOWLEDGE ENGINEER│
│                  │  │                  │  │                  │
│  "Builds the     │  │  "Writes the     │  │  "Curates what   │
│   agents"        │  │   instructions"  │  │   agents know"   │
│                  │  │                  │  │                  │
│  Reskill: SWE    │  │  Reskill: UX,    │  │  Hire + Reskill: │
│  Level: C/SC     │  │  Content, QA     │  │  Data Engineers  │
│                  │  │  Level: A/C      │  │  Level: C/SC     │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                                ▼
                  ┌──────────────────────────┐
                  │     AGENTIC QA ENGINEER  │
                  │                          │
                  │  "Tests agent behavior"  │
                  │                          │
                  │  Reskill: QA Engineers   │
                  │  Level: A/C              │
                  └──────────────────────────┘
```

---

## Skills Matrix (What to Test For)

| Role | Must Have | Nice to Have | Red Flag |
|------|-----------|--------------|----------|
| **Agentic Architect** | Distributed systems, LLM internals, multi-agent patterns | Research background, AI safety | Only knows one framework |
| **Agent Engineer** | Python, agent frameworks, async programming | TypeScript, vector DBs | Can't explain tool design |
| **Prompt Engineer** | Writing clarity, structured thinking, evaluation | A/B testing, red teaming | Thinks it's just "talking to AI" |
| **Knowledge Engineer** | RAG, embeddings, retrieval | Knowledge graphs, chunking strategies | Only knows one vector DB |
| **Agentic QA** | Test design, edge cases, metrics | Adversarial testing, monitoring | Expects deterministic outputs |

---

## Reskilling Viability

```
HIGH VIABILITY (>70% success)              LOW VIABILITY (<50% success)
─────────────────────────────              ────────────────────────────
Backend Dev → Agent Engineer               Project Manager → Agent Engineer
UX Writer → Prompt Engineer                Business Analyst → Knowledge Engineer
QA Engineer → Agentic QA                   Support → Agent Engineer
Data Engineer → Knowledge Engineer
Content Strategist → Prompt Engineer
```

---

## Team Composition by Project Size

### POC (6 FTEs, 8-12 weeks)
- 1 Architect
- 2 Agent Engineers
- 1 Prompt Engineer
- 1 Knowledge Engineer
- 1 QA

### Production MVP (16 FTEs, 16-24 weeks)
- 1 Architect + 1 Tech Lead
- 4 Agent Engineers
- 2 Prompt Engineers
- 2 Knowledge Engineers
- 2 Conversational Designers
- 2 QA
- 1 AI PM
- 1 Domain Lead

### Enterprise Scale (28+ FTEs, Ongoing)
- Full squad structure per domain
- Shared platform team
- Dedicated safety/governance

---

## Interview One-Liners

**Agent Engineer:**
"Show me how you'd build an agent that helps someone pick a TV."

**Prompt Engineer:**
"This agent keeps recommending the wrong products. Fix it."

**Knowledge Engineer:**
"This RAG system returns irrelevant results. Why?"

**Agentic Architect:**
"Design a system where three agents collaborate to complete a purchase."

**Agentic QA:**
"How do you test something that gives different answers each time?"

---

## What Makes Agentic Different

| Traditional Dev | Agentic Dev |
|-----------------|-------------|
| Deterministic outputs | Probabilistic reasoning |
| Unit tests pass/fail | Behavioral evaluation |
| Debug with logs | Debug with traces & reasoning |
| Ship and monitor | Ship, monitor, and iterate prompts |
| Edge cases are bugs | Edge cases are training data |
| Users follow flows | Users have conversations |

---

## Immediate Actions

1. **Identify 20 backend engineers** for Agent Engineer reskilling
2. **Hire 3-5 Agentic Architects** externally (scarce skill)
3. **Launch 40-hour Prompt Engineering course** for UX/Content teams
4. **Build assessment infrastructure** for certification
5. **Partner with framework vendors** (LangChain, etc.) for training content
