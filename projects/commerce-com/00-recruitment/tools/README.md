# AI-Augmented Product Operations - Executable Tools

This directory contains the actual, usable tools for operating as a Tech Arch + Product + AI Ops hybrid.

**Not documentation. Actual tools you copy/paste/execute.**

---

## What's Here

### 1. `ai-prompts.md` - AI Prompt Library
**Copy/paste prompts** for every stage of product development:
- Hypothesis validation (market research, feasibility, economics)
- Epic generation (user stories, technical tasks, estimates)
- Code review (AI-assisted quality/security/performance checks)
- Documentation generation (runbooks, ADRs, status updates)
- Stakeholder communication (escalations, resource requests)

**How to use:**
1. Open `ai-prompts.md`
2. Find the prompt for what you're doing (e.g., "Market Research")
3. Copy the prompt
4. Fill in the [BRACKETED] sections with your context
5. Paste into Claude/ChatGPT/Perplexity
6. Review output, add judgment, execute

---

### 2. `decision-log-template.md` - Decision Log
**Template for documenting decisions** with AI analysis.

**When to use:**
- Any decision that affects >1 week of work
- Any decision that costs >$10K
- Any decision that other people have to live with
- Any decision you might need to defend later

**How to use:**
1. Copy `decision-log-template.md`
2. Rename to `decision-YYYY-MM-DD-brief-title.md`
3. Fill in the template as you make the decision
4. Use AI prompts to gather data for "Options Considered"
5. Update outcomes section at 30/60/90 days
6. Learn from what worked/didn't work

---

### 3. `epic-template.md` - Epic Structure
**Template for taking validated hypothesis → executable work**.

**When to use:**
- You have a GO decision from hypothesis validation
- You need to break it into sprints
- You need to get resource commitments from teams

**How to use:**
1. Copy `epic-template.md`
2. Create new issue/epic in your tracker (Jira, GitHub, Linear)
3. Fill in sections (use AI to generate user stories, technical tasks)
4. Get resource commitments from engineering teams
5. Track progress sprint-by-sprint

---

## How These Tools Work Together

**Workflow Example: New Product Idea → Production**

**Week 1: Hypothesis Validation**
1. Use AI prompt: "Market Research" → Gather evidence
2. Use AI prompt: "Technical Feasibility" → Assess buildability
3. Use AI prompt: "Unit Economics" → Model business case
4. Use `decision-log-template.md` → Document GO/NO-GO decision

**Week 2: Epic Creation**
5. Use AI prompt: "Epic Generation" → Convert hypothesis to user stories
6. Use AI prompt: "Architecture Design Review" → Validate technical approach
7. Use `epic-template.md` → Structure the work
8. Get resource commitments from engineering teams

**Weeks 3-8: Execution**
9. Use AI prompt: "Code Review" → Review PRs daily
10. Use AI prompt: "Test Case Generation" → Ensure quality
11. Use AI prompt: "Weekly Status Update" → Communicate progress
12. Use `decision-log-template.md` → Document trade-offs during execution

**Week 8: Deployment**
13. Use AI prompt: "Deployment Pre-Flight Checklist" → Verify readiness
14. Deploy to production
15. Update `decision-log-template.md` outcomes at 30/60/90 days

---

## AI Tools You'll Use

**These prompts work with:**
- **Claude (Anthropic):** Best for code review, architecture, technical writing
- **ChatGPT (OpenAI):** Best for business analysis, market research
- **Perplexity:** Best for real-time web research, competitor analysis
- **Cursor/Copilot:** Best for code generation, refactoring

**Pro tip:** Use different AI tools for different tasks. Claude is better at technical depth, ChatGPT is better at business context, Perplexity is better at current market data.

---

## Measuring AI Augmentation

**Track your AI leverage:**

Create a simple log:
```markdown
## AI Augmentation Log - Week of [DATE]

| Task | Manual Effort (hours) | AI-Assisted Effort (hours) | Time Saved | Notes |
|------|----------------------|---------------------------|------------|-------|
| Market research | 16 | 2 | 14 | Perplexity gathered data, I synthesized |
| Architecture diagram | 4 | 1 | 3 | Claude generated C4, I refined |
| User stories | 8 | 1 | 7 | AI generated from hypothesis |
| Code review | 10 | 3 | 7 | AI caught security issues I'd have missed |
| Documentation | 12 | 2 | 10 | AI transcribed video to runbook |

Total hours worked: 40
Total hours saved via AI: 41
AI augmentation multiple: 2x (did 81 hours of work in 40 hours)
```

**Goal:** Track this weekly. Aim for 2-3x augmentation factor within 3 months.

---

## What AI Can't Do (Your Job)

**AI provides:**
- Speed (research, code generation, documentation)
- Data (market analysis, competitor intel, benchmarks)
- Options (alternative approaches, trade-off analysis)

**You provide:**
- Judgment (which option to choose, why)
- Context (organizational, political, strategic)
- Relationships (stakeholder mgmt, cross-team execution)
- Accountability (you own the outcomes)

**Never delegate these to AI:**
- Final decisions on product direction
- Stakeholder communication (AI can draft, you must review)
- Trade-offs that affect people (layoffs, role changes, team moves)
- Anything requiring organizational trust/credibility

---

## Getting Started

**Day 1:** Pick one product idea. Use AI prompts to validate hypothesis in 2 hours.

**Week 1:** Take validated idea through Epic creation. Get resource commitments.

**Week 2-4:** Execute first sprint using AI-assisted code review and documentation.

**Week 4:** Measure your AI augmentation factor. Refine your prompts.

**Month 2:** Teach someone else this operating model. Share your prompts.

**Month 6:** This is how you work by default. AI-augmented is your baseline.

---

## Questions?

**"Which AI should I use for X?"**
- Start with Claude for everything
- Try ChatGPT if Claude's answer doesn't fit
- Try Perplexity if you need current web data
- Use Cursor/Copilot for code generation

**"How do I know if AI's answer is right?"**
- Always review critically
- Check sources/citations
- Validate with subject matter experts
- Test in low-stakes scenarios first

**"What if AI generates wrong code?"**
- That's your job to catch in code review
- Use AI for first draft, not final version
- Test thoroughly before deploying
- Never blindly accept AI-generated code

**"How do I justify this to my manager?"**
- Show outcomes (shipped faster with smaller team)
- Show metrics (AI augmentation factor)
- Show artifacts (decision logs, documented learnings)
- Make it observable, not theoretical

---

**Now go execute. Don't read more documentation. Use these tools on real work.**
