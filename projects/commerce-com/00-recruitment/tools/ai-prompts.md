# AI Prompt Library
## Copy/Paste Prompts for AI-Augmented Product Operations

---

## 1. HYPOTHESIS VALIDATION

### Market Research
```
I have a product idea: [DESCRIBE IDEA IN 2-3 SENTENCES]

Help me validate this hypothesis by researching:

1. Market Context:
   - Who else has built this or something similar?
   - What happened to those products?
   - What do industry analysts say about this space?

2. Customer Evidence:
   - What do customers say they need in this domain?
   - What are common complaints about existing solutions?
   - What's the willingness to pay?

3. Competitive Landscape:
   - Who are the top 5 competitors?
   - How do they differentiate?
   - What are their pricing models?
   - What are their NPS/customer satisfaction scores?

4. Market Sizing:
   - Total addressable market (TAM)
   - Serviceable addressable market (SAM)
   - Market growth rate

Output format: 1-page brief with evidence, sources, and recommendation
```

### Technical Feasibility Analysis
```
I need to assess technical feasibility for this product idea:

Idea: [DESCRIBE IDEA]
Existing Systems: [LIST SYSTEMS WE'D INTEGRATE WITH]

Analyze:

1. Integration Points:
   - What APIs would we use?
   - What data models are involved?
   - What are the integration patterns (REST, GraphQL, webhooks)?

2. New Components:
   - What would we need to build from scratch?
   - What could we buy/use existing tools?
   - What's the build vs. buy trade-off?

3. Technical Risks:
   - What could go wrong technically?
   - What are the scalability concerns?
   - What are the security/compliance requirements?

4. Complexity Estimate:
   - Rate overall complexity: Small / Medium / Large / Extra Large
   - Estimate team size needed
   - Estimate timeline range

Output format: Feasibility assessment with recommendation
```

### Unit Economics Model
```
Build a unit economics model for this product:

Product: [DESCRIBE PRODUCT]
Target Customer: [DESCRIBE CUSTOMER SEGMENT]
Pricing Model: [HOW WILL WE CHARGE?]

Calculate:

1. Customer Acquisition Cost (CAC):
   - Marketing spend per customer
   - Sales cost per customer
   - Onboarding cost per customer
   - Total CAC

2. Revenue Per Customer:
   - Average contract value (ACV)
   - Expected contract length
   - Expansion revenue potential
   - Lifetime value (LTV)

3. Cost to Serve:
   - Infrastructure costs per customer
   - Support costs per customer
   - Ongoing operational costs

4. Key Metrics:
   - LTV/CAC ratio (target: >3)
   - Payback period (target: <12 months)
   - Gross margin (target: >70%)
   - Break-even point

Make reasonable assumptions where data is missing. Show your assumptions clearly.

Output format: Spreadsheet-style model with formulas shown
```

---

## 2. BACKLOG → PRODUCTION

### Epic Generation
```
Convert this validated hypothesis into an executable Epic:

Hypothesis: [VALIDATED HYPOTHESIS FROM STEP 1]
Technical Approach: [HIGH-LEVEL TECHNICAL APPROACH]
Success Metrics: [HOW WE'LL MEASURE SUCCESS]

Generate:

1. Epic Title & Description (clear, outcome-focused)

2. User Stories (format: As a [USER], I want [CAPABILITY] so that [BENEFIT]):
   - 5-10 user stories covering the full feature
   - Each with acceptance criteria
   - Prioritized by value

3. Technical Tasks:
   - Backend tasks
   - Frontend tasks
   - Integration tasks
   - Testing tasks
   - DevOps/infrastructure tasks

4. Dependencies:
   - What needs to be ready before we start?
   - What external teams/systems do we depend on?

5. Resource Estimate:
   - FTE required
   - Timeline estimate (in sprints)

Output format: GitHub Issue / Jira Epic format (markdown)
```

### Architecture Design Review
```
Review this architecture design for gaps and risks:

[PASTE YOUR ARCHITECTURE DESCRIPTION OR ATTACH DIAGRAM]

Context:
- Product: [PRODUCT NAME]
- Scale: [EXPECTED USERS/REQUESTS/DATA VOLUME]
- Constraints: [TECHNICAL CONSTRAINTS]

Analyze:

1. Missing Components:
   - What's not shown that we'll need?
   - What services/databases are missing?

2. Integration Risks:
   - What integration points are fragile?
   - What happens if external system goes down?

3. Scalability Concerns:
   - What won't scale to 10x traffic?
   - What are the bottlenecks?

4. Security Considerations:
   - What are the security vulnerabilities?
   - What compliance requirements matter (SOC2, GDPR, etc.)?

5. Alternatives:
   - What's a simpler architecture that gets us 80% of the way?
   - What can we defer to later phases?

Output format: Architecture review with specific recommendations
```

### Test Case Generation
```
Generate comprehensive test cases for this feature:

Feature: [DESCRIBE FEATURE]
Components: [LIST COMPONENTS INVOLVED]
Integration Points: [LIST SYSTEMS THAT INTEGRATE]

Generate test cases for:

1. Happy Path:
   - Standard user flow
   - Expected inputs/outputs
   - Success criteria

2. Error Handling:
   - Invalid inputs
   - System failures
   - Network errors
   - Timeout scenarios

3. Edge Cases:
   - Boundary conditions
   - Unusual data
   - Race conditions
   - Concurrent users

4. Integration Tests:
   - Component A → Component B
   - Data flow end-to-end
   - API contract validation

5. Performance Tests:
   - Load testing scenarios
   - Expected response times
   - Resource usage limits

Output format: Test case table (Feature | Test Case | Input | Expected Output | Pass/Fail)
```

---

## 3. CODE & EXECUTION

### Code Review (AI-Assisted)
```
Review this Pull Request:

PR Link: [GITHUB/GITLAB PR LINK]
OR paste code here: [CODE]

Context:
- Feature: [WHAT THIS PR IMPLEMENTS]
- Epic/Task: [LINK TO ISSUE]

Review for:

1. Code Quality:
   - Readability
   - Maintainability
   - Follows coding standards?
   - DRY principle violations

2. Security:
   - SQL injection risks
   - XSS vulnerabilities
   - Authentication/authorization issues
   - Sensitive data exposure

3. Performance:
   - Inefficient queries
   - N+1 problems
   - Memory leaks
   - Unnecessary computations

4. Testing:
   - Test coverage adequate?
   - Edge cases covered?
   - Integration tests included?

5. Architecture Alignment:
   - Follows established patterns?
   - Introduces technical debt?
   - Breaking changes to APIs?

Output format: Approve / Request Changes / Block (with specific issues listed)
```

### Deployment Pre-Flight Checklist
```
Generate a pre-flight checklist for deploying this feature to production:

Feature: [FEATURE NAME]
Components: [WHAT'S BEING DEPLOYED]
Database Changes: [YES/NO - if yes, describe]

Generate checklist for:

1. Infrastructure Readiness:
   - Servers/containers provisioned?
   - Load balancers configured?
   - CDN/cache configured?

2. Database Migrations:
   - Migration scripts tested?
   - Rollback plan ready?
   - Backup taken?

3. Configuration:
   - Environment variables set?
   - Feature flags configured?
   - API keys rotated if needed?

4. Monitoring & Alerting:
   - Dashboards created?
   - Alerts configured?
   - Log aggregation working?

5. Rollback Plan:
   - How to rollback if deployment fails?
   - What's the rollback timeline?
   - Who makes the rollback decision?

6. Communication:
   - Stakeholders notified?
   - Support team briefed?
   - Docs updated?

Output format: Checkbox list (ready to execute)
```

---

## 4. DOCUMENTATION

### Runbook Generation from Video
```
I recorded a video walkthrough of this process: [DESCRIBE PROCESS]

Transcript: [PASTE VIDEO TRANSCRIPT]

Generate a step-by-step runbook:

Format:
1. Prerequisites (what you need before starting)
2. Step-by-step instructions (numbered, with commands)
3. Validation checks (how to know each step worked)
4. Troubleshooting (common issues and fixes)
5. Rollback procedure (if things go wrong)

Output format: Markdown runbook (ready to publish to docs site)
```

### Architecture Decision Record (ADR)
```
Generate an Architecture Decision Record for this decision:

Decision: [WHAT WE'RE DECIDING]
Context: [WHY THIS DECISION IS NEEDED]

Options Considered:
1. [OPTION 1]: [DESCRIPTION]
   - Pros: [LIST]
   - Cons: [LIST]
2. [OPTION 2]: [DESCRIPTION]
   - Pros: [LIST]
   - Cons: [LIST]
3. [OPTION 3]: [DESCRIPTION]
   - Pros: [LIST]
   - Cons: [LIST]

Chosen: [OPTION X]
Rationale: [WHY THIS OPTION]

Format as ADR following this template:
# ADR-NNN: [TITLE]
## Status: [Proposed/Accepted/Deprecated/Superseded]
## Context: [WHY]
## Decision: [WHAT]
## Consequences: [POSITIVE/NEGATIVE IMPLICATIONS]
```

---

## 5. STAKEHOLDER COMMUNICATION

### Weekly Status Update
```
Generate a weekly status update based on this sprint activity:

Sprint Goal: [WHAT WE COMMITTED TO]
Completed: [LIST WHAT SHIPPED]
In Progress: [LIST WHAT'S ONGOING]
Blocked: [LIST BLOCKERS]
Next Week: [WHAT'S PLANNED]

Format as executive-friendly update:
- Lead with outcomes (customer value shipped)
- Keep it to 5 bullet points max
- Flag risks/blockers clearly
- No jargon

Output format: Email-ready update (3-5 min read)
```

### Escalation Brief
```
I need to escalate this issue to executives:

Issue: [DESCRIBE PROBLEM]
Impact: [WHO'S AFFECTED, HOW BAD]
What I've Tried: [ATTEMPTED SOLUTIONS]
What I Need: [SPECIFIC ASK]

Generate a 5-minute escalation brief:
1. Problem statement (2 sentences)
2. Business impact (revenue/customer/strategic)
3. What's blocked
4. Proposed solution
5. Decision needed

Output format: Verbal talking points (for impromptu escalation)
```

---

## 6. CROSS-ORG EXECUTION

### Resource Request (Trade-Based)
```
I need to request resources from a team that doesn't report to me:

What I Need: [X FTE from TEAM for Y weeks]
For: [FEATURE/PROJECT]
Business Justification: [REVENUE/CUSTOMER/STRATEGIC IMPACT]

Help me frame this as a win-win trade:

1. What's in it for them?
   - How does this benefit their team?
   - What visibility do they get?
   - What do they learn/gain?

2. What are the risks for them?
   - What could go wrong?
   - How do we mitigate?

3. How do we make this easy?
   - Clear scope
   - Defined timeline
   - Support I'll provide

Output format: Email request with trade-based framing
```

---

## HOW TO USE THESE PROMPTS

1. **Copy the prompt exactly**
2. **Fill in the [BRACKETED SECTIONS] with your context**
3. **Paste into Claude, ChatGPT, or Perplexity**
4. **Review AI output critically (don't accept blindly)**
5. **Add your judgment, context, and refinements**
6. **Document what worked/didn't work**
7. **Refine the prompt for next time**

**Remember:** AI provides speed and data. You provide judgment and decisions.
