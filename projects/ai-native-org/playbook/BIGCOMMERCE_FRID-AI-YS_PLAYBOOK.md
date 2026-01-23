# Frid-AI-ys: BigCommerce Implementation Playbook

**Version:** 1.0 | BigCommerce Edition
**Date:** January 2026
**Classification:** Internal Playbook
**Owner:** AI Operations

---

## Executive Summary

Frid-AI-ys is a weekly initiative designed to activate BigCommerce's AI infrastructure through hands-on practice and peer learning. It operationalizes **Tenet 4: "Upskill, empower, and enable at scale"** by turning existing resources into living practice.

**What It Is:**
- Weekly sessions using BigCommerce's approved AI tools
- Structured around existing Knowledge Hubs, Prompt Library, and Governance
- Owned by AI Operations, feeds their pipeline

**What It Is Not:**
- A replacement for existing training
- A new parallel initiative
- Shadow AI enablement

---

## Part I: BigCommerce Context

### 1.1 Existing AI Infrastructure

BigCommerce has invested in comprehensive AI infrastructure:

| Asset | Owner | Location |
|-------|-------|----------|
| ChatGPT Knowledge Hub | AI Operations | Confluence |
| Gemini Knowledge Hub | AI Operations | Confluence |
| Prompt Library | AI Operations | Confluence |
| Writing Effective AI Prompts | AI Operations | Confluence |
| Rovo AI | AI Operations | Atlassian |
| AI Governance & Policies | GRC | Confluence |
| Learning Module | AI Operations | Video training |
| AI Ops Request Form | AI Operations | Confluence |

**Frid-AI-ys activates these assets, not replaces them.**

### 1.2 AI Tenets Alignment

Every session reinforces BigCommerce's Five AI Tenets:

| Tenet | Session Integration |
|-------|---------------------|
| **1. Augment, automate, stay human** | Discussion prompt: "What should AI do vs. what should humans do?" |
| **2. Business-first, merchant-obsessed** | Build sessions must connect to merchant or business value |
| **3. Transparency, safety, compliance** | Governance review in every session; data classification visible |
| **4. Upskill, empower, enable at scale** | Primary mission of Frid-AI-ys |
| **5. Centralized data, decentralized innovation** | Prompt Library captures distributed innovation |

### 1.3 Data Classification for Sessions

**Post this in every session:**

| Data Type | Can Use? | Approved Tools |
|-----------|----------|----------------|
| **Unidentifiable Data** | Yes | Any tool |
| **Public Data** | Yes | Any tool |
| **Non-public Data** | Approved tools only | ChatGPT Enterprise, Gemini, Copilot |
| **Sensitive Data** | Approved tools only | ChatGPT Enterprise, Gemini |
| **Personal Data** | Requires approval | Submit AI Review Form |
| **Shopper PII** | Never | None |

**Source:** [Approved GenAI Tools](link) and [GenAI Policy](link)

### 1.4 Key Contacts

| Need | Contact |
|------|---------|
| AI tool approval | ai-review@bigcommerce.com |
| Custom GPT / workflow request | [AI Ops Request Form] |
| Policy questions | GenAI@bigcommerce.com |
| Violation reporting | GenAI@bigcommerce.com |

---

## Part II: The Frid-AI-ys Operating Model

### 2.1 The Rotating Format

| Week | Format | Duration | Energy Level | Primary Goal |
|------|--------|----------|--------------|--------------|
| **Week 1** | Show & Tell | 45 min | Low | Celebrate wins, grow Prompt Library |
| **Week 2** | Prompt Battle | 45 min | Low | Gamified learning, cross-functional mixing |
| **Week 3** | Deep Dive Lab | 60 min | Medium | Structured skill-building |
| **Week 4** | The Build | 2-3 hrs | High | Applied problem-solving, AI Ops pipeline |

### 2.2 Format Specifications

#### **Week 1: Show & Tell**

**Purpose:** Normalize AI usage, celebrate practical wins, grow the Prompt Library

**Format:**
- 3 presenters, 10 minutes each + 5 min Q&A
- Each presenter shares ONE thing: a prompt, a workflow, a tool discovery
- Emphasis on "What problem did this solve?" not "Look how clever I am"

**BigCommerce Integration:**
- Presenters submit entries to the official Prompt Library (Confluence)
- Reference Knowledge Hubs when relevant
- Tag entries by function (Sales, Marketing, Engineering, etc.)

**Prompt Library Entry Template:**
```markdown
## [Title: What This Solves]

**Submitted by:** [Name]
**Date:** [Date]
**Tool:** ChatGPT Enterprise / Gemini / Other
**Session:** Frid-AI-ys Week [X]

### The Problem
[1-2 sentences: What manual/tedious task were you facing?]

### The Prompt
```
[Exact prompt used]
```

### The Result
[What did you get? How much time did it save?]

### Data Classification
[What type of data was used? Unidentifiable/Public/Non-public]

### Tips & Variations
[What did you learn? What would you do differently?]

### Tags
[e.g., #sales #marketing #engineering #summarization #writing #code]
```

---

#### **Week 2: Prompt Battle**

**Purpose:** Gamified learning, expose people to different thinking styles, cross-functional mixing

**Format:**
- 2-3 teams of 3-4 people (mixed functions)
- Given the SAME challenge and 20 minutes to solve it
- Present solutions; audience votes on Best Result AND Best Technique
- Two winners awarded

**BigCommerce-Specific Challenges:**

**Challenge A: Merchant Communication**
> A merchant has submitted a support ticket with a complex question about API rate limits, multi-storefront configuration, and webhook reliability. Using ChatGPT Enterprise, produce:
> 1. A summary of what they're actually asking (clarify the real need)
> 2. A draft response that's technically accurate and merchant-friendly
> 3. Suggestions for KB articles to link
>
> You have 20 minutes. Use only Unidentifiable/Public data.

**Challenge B: Competitive Intelligence**
> Here's a public blog post from [competitor]. Using Gemini in Google Docs, produce:
> 1. Key claims they're making
> 2. How BigCommerce's offering compares
> 3. Talking points for Sales
>
> You have 20 minutes. Public data only.

**Challenge C: Code Documentation**
> Here's a code snippet [provide public/sample code]. Using ChatGPT Enterprise, produce:
> 1. Documentation explaining what it does
> 2. Potential improvements
> 3. Test cases to consider
>
> You have 20 minutes.

---

#### **Week 3: Deep Dive Lab**

**Purpose:** Structured skill-building on a specific tool or technique

**Format:**
- 15 min: Facilitator demos the tool/technique
- 30 min: Hands-on practice (everyone follows along)
- 15 min: Q&A and "what would you use this for?"

**BigCommerce-Specific Lab Topics:**

| Lab | Tool | Reference |
|-----|------|-----------|
| Advanced Prompting | ChatGPT Enterprise | ChatGPT Knowledge Hub |
| Gemini in Google Workspace | Gemini | Gemini Knowledge Hub |
| Building Custom GPTs | ChatGPT Enterprise | ChatGPT Knowledge Hub |
| Rovo for Knowledge Discovery | Rovo AI | Rovo documentation |
| AI-Assisted Code Review | GitHub Copilot | Engineering guidelines |
| Data Analysis with AI | Gemini in Sheets | Gemini Knowledge Hub |

**Lab Guide Structure:**
```markdown
# Deep Dive Lab: [Topic]

## Learning Objectives
By the end of this lab, you will be able to:
- [Objective 1]
- [Objective 2]
- [Objective 3]

## Prerequisites
- Access to [Tool] (confirm before session)
- Familiarity with [BigCommerce Knowledge Hub page]

## Governance Reminder
- Data classification: [What data types are appropriate]
- Approved tool: [Confirm tool is on approved list]

## Demo (15 min)
[Facilitator walkthrough]

## Exercise 1 (10 min)
[Hands-on practice]

## Exercise 2 (10 min)
[Hands-on practice]

## Open Practice (10 min)
[Experiment with your own use cases]

## Resources
- [Link to Knowledge Hub]
- [Link to Prompt Library examples]
- [Link to Governance policies]
```

---

#### **Week 4: The Build**

**Purpose:** Apply skills to real business problems; generate AI Ops pipeline

**Format:**
- **Before:** Problem submission (employees submit real pain points by Tuesday)
- **Kickoff (15 min):** Facilitator presents 2-3 curated problems
- **Build (90 min):** Teams work on solutions
- **Demo (25 min):** Each team presents; stakeholder feedback
- **AI Ops Handoff (15 min):** Which solutions become GPT/workflow requests?

**Problem Submission Template:**
```markdown
## Problem Title: _______________

**Submitted by:** _______________
**Function:** _______________
**Business Stakeholder:** _______________ (who would own implementing this?)

### The Pain
- What manual/tedious work is being done today?
- How many hours/week does this consume?
- Who does this work?
- How does this impact merchants or business outcomes?

### Success Looks Like
- What would a good AI-assisted solution produce?
- How would we know it's working?

### Data & Governance
- What data would be needed?
- Data classification: Unidentifiable / Public / Non-public / Sensitive
- Any compliance considerations?

### If This Works
- Would this become a GPT request to AI Ops?
- Would this become a workflow automation request?
- Is this a Prompt Library entry?
```

**AI Ops Handoff Framework:**

After demos, explicitly discuss:

| Solution | Value | Next Step | Owner |
|----------|-------|-----------|-------|
| [Solution 1] | [High/Med/Low] | Submit GPT Request | [Name] |
| [Solution 2] | [High/Med/Low] | Add to Prompt Library | [Name] |
| [Solution 3] | [High/Med/Low] | Submit Workflow Request | [Name] |
| [Solution 4] | [High/Med/Low] | Needs more exploration | [Name] |

**This is the critical integration point:** Build sessions must produce artifacts that flow into AI Operations' official processes.

---

### 2.3 Governance Rails

**Every session must include:**

1. **Opening Reminder:**
   > "Quick governance check: We're using [approved tool]. Only input [data classification] data. If you're unsure about data classification, ask before inputting. Full policy at [link]."

2. **Visible Poster/Slide:**

```
BigCommerce AI Session Rules

APPROVED TOOLS TODAY:
[  ] ChatGPT Enterprise
[  ] Gemini (Google Workspace)
[  ] GitHub Copilot

DATA YOU CAN USE:
[  ] Unidentifiable Data (no BC reference)
[  ] Public Data (website, public filings)

DATA YOU CANNOT USE:
[X] Shopper PII — NEVER
[X] Customer PII — Not without approval
[X] Sensitive Data — Not without approval

WHEN IN DOUBT:
- GenAI@bigcommerce.com
- ai-review@bigcommerce.com

REMEMBER:
- Treat all output as DRAFT
- Verify facts independently
- Scan code with Snyk before use
- Reverse image search before publishing
```

3. **Incident Protocol:**
   If someone accidentally inputs restricted data:
   - Document what was shared and to which tool
   - Notify GenAI@bigcommerce.com within 24 hours
   - No blame — the goal is learning and proper handling
   - Add to lessons learned for future sessions

---

## Part III: Month One Implementation Guide

### 3.1 Pre-Launch Checklist

#### Administrative Setup
- [ ] Confirm AI Operations ownership (Mike Behl)
- [ ] Secure executive sponsor (SVP Rev Ops and Intelligence)
- [ ] Confirm pilot group (Product Engineering)
- [ ] Book recurring calendar slot (Fridays 2-4pm recommended)
- [ ] Create Slack channel: #frid-ai-ys
- [ ] Create Confluence space or section for Frid-AI-ys
- [ ] Confirm API/tool access for all pilot participants

#### Content Preparation
- [ ] Recruit 3 Show & Tell presenters for Week 1
- [ ] Design Week 2 Prompt Battle challenge (BigCommerce-specific)
- [ ] Prepare Week 3 Lab guide (reference Knowledge Hubs)
- [ ] Solicit Week 4 Build problems (need 5+ submissions)

#### Governance
- [ ] Review session plan with GenAI@bigcommerce.com
- [ ] Confirm data classification guidance for each session
- [ ] Prepare governance poster/slide
- [ ] Brief participants on AI Tenets and policies

---

### 3.2 Month One Session Plans

#### **WEEK 1: Show & Tell — "AI Wins at BigCommerce"**

**Theme:** Surface the AI usage already happening

**Agenda (45 minutes):**

| Time | Activity | Owner |
|------|----------|-------|
| 0:00 | Welcome & Context (5 min) | Facilitator |
| 0:05 | Governance reminder + AI Tenets (2 min) | Facilitator |
| 0:07 | Presenter 1: [Pre-recruited from Sales/Marketing] (10 min) | Employee |
| 0:17 | Presenter 2: [Pre-recruited from Engineering] (10 min) | Employee |
| 0:27 | Presenter 3: [Pre-recruited from Ops/Success] (10 min) | Employee |
| 0:37 | Open mic: 60-second wins (5 min) | All |
| 0:42 | How to submit to Prompt Library + Preview Week 2 (3 min) | Facilitator |

**Facilitator Script — Opening:**
> "Welcome to the first Frid-AI-ys. This is about activating the AI infrastructure we've already built — ChatGPT Enterprise, Gemini, the Knowledge Hubs, the Prompt Library.
>
> Quick governance reminder: We follow BigCommerce's AI Tenets and data classification. Today we're using approved tools only, with Unidentifiable or Public data.
>
> The goal today: surface the AI wins already happening and get them into our Prompt Library so everyone can benefit."

---

#### **WEEK 2: Prompt Battle — "Same Problem, Different Approaches"**

**Theme:** Cross-functional collaboration, technique sharing

**Challenge (BigCommerce-Specific):**
> A merchant has asked: "How can I use AI to write better product descriptions for my 500-product catalog?"
>
> Using ChatGPT Enterprise, produce:
> 1. A 1-page guide the merchant could follow
> 2. 3 example prompts they could use
> 3. Tips for maintaining brand voice
>
> You have 20 minutes. Public/Unidentifiable data only.

**Agenda (45 minutes):**

| Time | Activity | Notes |
|------|----------|-------|
| 0:00 | Governance reminder + Team formation (5 min) | Mix functions |
| 0:05 | Challenge reveal + Q&A (5 min) | Project on screen |
| 0:10 | THE BATTLE (20 min) | Facilitator circulates |
| 0:30 | Presentations (10 min) | 3 min per team |
| 0:40 | Voting + Debrief (5 min) | Best Result, Best Technique |

**Winning techniques go into the Prompt Library.**

---

#### **WEEK 3: Deep Dive Lab — "Beyond Basic Prompting"**

**Theme:** Chain-of-thought and structured output techniques

**Reference:** ChatGPT Knowledge Hub, "Writing Effective AI Prompts" guide

**Agenda (60 minutes):**

| Time | Activity |
|------|----------|
| 0:00 | Governance reminder (2 min) |
| 0:02 | Why advanced prompting matters (5 min) |
| 0:07 | Technique 1: Chain-of-thought (10 min demo) |
| 0:17 | Exercise 1: Try it yourself (10 min) |
| 0:27 | Technique 2: Structured output (10 min demo) |
| 0:37 | Exercise 2: Try it yourself (10 min) |
| 0:47 | Open practice + Q&A (13 min) |

**Lab Guide excerpt:**

**TECHNIQUE 1: Chain-of-Thought Prompting**

Instead of asking for the answer, ask the AI to show its reasoning.

Basic prompt:
```
What's the best approach for this merchant's multi-storefront setup?
```

Chain-of-thought prompt:
```
A merchant is asking about multi-storefront configuration.

Before giving your recommendation:
1. List the key factors that should influence this decision
2. Evaluate 2-3 possible approaches against those factors
3. Identify potential risks or limitations of each
4. Then give your recommendation with reasoning

Merchant context: [details]
```

**TECHNIQUE 2: Structured Output Prompting**

Basic prompt:
```
Summarize this support ticket.
```

Structured output prompt:
```
Summarize this support ticket using the following structure:

## Summary
[1-2 sentences]

## Merchant Need
[What are they actually trying to accomplish?]

## Technical Details
- Issue: [description]
- Affected: [storefront/API/webhook/etc.]
- Severity: [High/Medium/Low]

## Recommended Response
[Draft response]

## Related KB Articles
- [Suggested links]
```

---

#### **WEEK 4: The Build — "From Pain Point to AI Ops Request"**

**Theme:** Applied problem-solving with clear handoff

**Pre-curated Problems (Examples):**

**Problem 1: Support Ticket Triage**
> **Pain:** Support team spends time routing tickets to the right specialist. Initial triage could be AI-assisted.
> **Challenge:** Build a prompt/workflow that categorizes incoming tickets by type, complexity, and routing.
> **Stakeholder:** Support Lead

**Problem 2: Release Notes Drafting**
> **Pain:** Product team writes release notes manually for each deployment.
> **Challenge:** Build a workflow that takes commit messages and JIRA tickets and drafts release notes.
> **Stakeholder:** Product Lead

**Problem 3: Merchant Onboarding Checklist**
> **Pain:** Success team manually creates onboarding checklists for new merchants.
> **Challenge:** Build a GPT or prompt that generates personalized onboarding checklists based on merchant profile.
> **Stakeholder:** Customer Success Lead

**Agenda (2.5 hours):**

| Time | Activity |
|------|----------|
| 0:00 | Governance reminder + Problem pitches (15 min) |
| 0:15 | Team formation (5 min) |
| 0:20 | THE BUILD (90 min) |
| 1:50 | Demo prep (10 min) |
| 2:00 | Demos + stakeholder feedback (25 min) |
| 2:25 | AI Ops handoff discussion (15 min) |

**AI Ops Handoff Template:**

| Solution | Team | Value | Data Classification | Next Step | AI Ops Owner |
|----------|------|-------|---------------------|-----------|--------------|
| | | | | | |

**Options for "Next Step":**
- Submit GPT Request Form
- Submit Workflow Automation Request
- Add to Prompt Library
- Needs policy review (GenAI@bigcommerce.com)
- Pilot with one team
- Not viable (document why)

---

### 3.3 Month One Success Metrics

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Target |
|--------|--------|--------|--------|--------|--------|
| Attendance | — | — | — | — | 15+ avg |
| Unique participants | — | — | — | — | 25+ total |
| Functions represented | — | — | — | — | 4+ |
| Prompt Library entries | — | — | — | — | 10+ |
| AI Ops requests generated | — | — | — | — | 3+ |
| Volunteer facilitators | — | — | — | — | 3+ |

---

## Part IV: Ownership Model

### 4.1 Why AI Operations Owns This

| Reason | Detail |
|--------|--------|
| **Existing mandate** | AI Ops already does "team enablement" per Confluence |
| **Leverages their assets** | Knowledge Hubs, Prompt Library, intake process |
| **Scales impact** | Multiplies reach without 1:1 consulting |
| **Generates pipeline** | Build sessions create GPT/workflow requests |
| **Closes the loop** | Training → Practice → Adoption → Measurable outcomes |

### 4.2 Role Definition: Frid-AI-ys Facilitator

**Time commitment:** 6-7 hours/week

| Responsibility | Time |
|----------------|------|
| Session facilitation | 2-3 hrs |
| Content preparation | 2 hrs |
| Prompt Library curation | 1 hr |
| Coordination & communication | 1 hr |

**Ideal profile:**
- AI Operations team member (primary)
- OR: Designated champion from pilot group (secondary)
- Comfortable facilitating groups
- Strong understanding of BigCommerce AI governance

### 4.3 Handoff to Incoming Facilitator

**If you're taking over Frid-AI-ys facilitation:**

**First Week:**
1. Read this playbook
2. Review BigCommerce Knowledge Hubs (ChatGPT, Gemini)
3. Review AI Governance & Policies
4. Join #frid-ai-ys Slack channel
5. Meet with previous facilitator

**First Month:**
1. Facilitate (or shadow) all four session types
2. Recruit 3+ volunteer presenters
3. Document 5+ Prompt Library entries
4. Send first monthly report to Mike Behl

**Key Relationships:**

| Person | Why They Matter | Frequency |
|--------|-----------------|-----------|
| Mike Behl (AI Ops Director) | Ownership, resources, escalation | Weekly |
| Maria Olmos (Training content) | Curriculum alignment | Monthly |
| GenAI@bigcommerce.com | Policy questions | As needed |
| Pilot group leads | Participation, problems | Weekly |

---

## Part V: Scaling & Evolution

### 5.1 Month 2-3: Stabilization

**Goals:**
- Establish reliable attendance (15-25 per session)
- Build content pipeline (never scrambling for presenters)
- Identify 3-5 champions who can help facilitate

**Adjustments:**
- If attendance drops: Survey for preferred times; try different format mix
- If same people attend: Targeted outreach to underrepresented functions
- If governance questions arise: Bring in GenAI@bigcommerce.com for a session

### 5.2 Month 4-6: Expansion

**Goals:**
- Launch function-specific tracks (Engineering Frid-AI-ys, GTM Frid-AI-ys)
- Integrate with Maria's formal training (Frid-AI-ys = "lab" component)
- Document ROI for executive communication

**New Formats:**
- "AI Failures" Session: What didn't work and why
- "Governance Deep Dive": GenAI@bigcommerce.com presents policy updates
- "AI Ops Showcase": Demo GPTs/workflows built from Frid-AI-ys requests

### 5.3 Month 7-12: Institutionalization

**Goals:**
- Frid-AI-ys is recognized part of BigCommerce culture
- Prompt Library is the go-to resource (50+ entries)
- AI fluency visible in performance conversations

**Metrics shift:**
- From attendance → Prompt Library usage
- From participation → Operationalized solutions
- From survey satisfaction → Business impact

---

## Appendices

### Appendix A: Communication Templates

#### Launch Announcement

**Subject:** Introducing Frid-AI-ys: Activate Your AI Skills

> Team,
>
> Starting [DATE], AI Operations is launching **Frid-AI-ys** — a weekly hands-on AI learning series.
>
> **What it is:** 45 minutes to 2 hours every Friday to practice with our approved AI tools (ChatGPT Enterprise, Gemini), share wins, and build skills together.
>
> **What it activates:** The Knowledge Hubs, Prompt Library, and training resources we've already built.
>
> **The format rotates:**
> - Week 1: Show & Tell (share your AI wins)
> - Week 2: Prompt Battle (gamified learning)
> - Week 3: Deep Dive Lab (structured skill-building)
> - Week 4: The Build (solve real problems)
>
> **This is Tenet 4 in action:** "Upskill, empower, and enable at scale."
>
> **First session:** [DATE, TIME, LOCATION]
>
> Questions? Drop them in #frid-ai-ys or email GenAI@bigcommerce.com.
>
> See you Friday.
>
> [AI Operations]

#### Manager Briefing

**Subject:** Frid-AI-ys: What Managers Need to Know

> Hi [Manager Name],
>
> AI Operations is launching Frid-AI-ys, a weekly AI skills activation series. Here's what you need to know:
>
> **Time commitment:** 45 min to 2 hours on Friday afternoons (varies by week)
>
> **Your role:** Encourage team participation. This has executive sponsorship and aligns with Tenet 4.
>
> **The benefit:** Practical AI skills using our approved tools. Cross-functional exposure. Contributions to the Prompt Library.
>
> **Governance:** All sessions follow BigCommerce AI policies. Approved tools only. Data classification reviewed every session.
>
> Questions? Reach out to AI Operations or #frid-ai-ys.
>
> [AI Operations]

### Appendix B: Governance Quick Reference

**Approved Tools:**
- ChatGPT Enterprise
- Gemini (Google Workspace)
- GitHub Copilot
- Rovo AI

**Data Classification:**
- **OK without approval:** Unidentifiable, Public
- **Approved tools only:** Non-public, Sensitive, Personal (non-shopper)
- **Never:** Shopper PII

**Key Contacts:**
- GenAI@bigcommerce.com — Policy questions
- ai-review@bigcommerce.com — Tool approval requests

**Policy Documents:**
- [Company GenAI Policy]
- [Approved GenAI Tools]
- [AI Use and Review Process]

### Appendix C: AI Ops Integration Points

| Frid-AI-ys Output | AI Ops Process | Form/Link |
|-------------------|----------------|-----------|
| Custom GPT idea | GPT Request | [AI Ops Request Form] |
| Workflow automation | Workflow Request | [AI Ops Request Form] |
| New tool request (free) | AI Review | [Generative AI Approval Form] |
| New tool request (paid) | Vendor Intake | [Vendor Intake Form] |
| Policy question | Email | GenAI@bigcommerce.com |
| Prompt Library entry | Direct contribution | [Prompt Library in Confluence] |

---

## Document Metadata

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Created | January 2026 |
| Author | [Your Name], Product Architecture |
| Owner | AI Operations (Mike Behl) |
| Classification | Internal |
| Review Cycle | Quarterly |

---

*This playbook is designed for BigCommerce's specific infrastructure and governance framework. It activates existing investments in AI tooling, training, and policy.*
