# ADR-[NUMBER]: [TITLE]

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Date

[YYYY-MM-DD]

## Context

[Describe the forces at play. What is the problem or situation that requires a decision? What constraints exist? What quality attributes are in tension?]

**Business Context**:
[Why does the business care about this decision?]

**Technical Context**:
[What technical factors influence this decision?]

**Constraints**:
- [Constraint 1]
- [Constraint 2]

## Decision

[State the decision clearly and definitively. Use active voice: "We will use X" not "X might be used".]

**The decision**: [One sentence summary]

**Details**:
[Expand on the decision as needed. Be specific about what this means for implementation.]

## Rationale

[Explain why this decision was made. What factors were most important?]

**Primary factors**:
1. [Most important reason]
2. [Second most important reason]
3. [Third most important reason]

**Quality attributes addressed**:
- [e.g., Performance: This approach reduces latency by X]
- [e.g., Maintainability: This approach simplifies future changes because Y]

## Consequences

### Positive

- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

### Negative

- [Trade-off 1]
- [Trade-off 2]

### Neutral

- [Side effect that is neither clearly positive nor negative]

## Alternatives Considered

### Alternative 1: [Name]

**Description**: [Brief description]

**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Why rejected**: [Specific reason this wasn't chosen]

### Alternative 2: [Name]

**Description**: [Brief description]

**Pros**:
- [Pro 1]

**Cons**:
- [Con 1]

**Why rejected**: [Specific reason this wasn't chosen]

## Implementation Notes

[Any specific guidance for implementing this decision]

**Affected Components**:
- [Component 1]
- [Component 2]

**Migration Path** (if applicable):
[How to transition from current state to this decision]

## Related Decisions

- [ADR-XXX: Related decision]
- [ADR-YYY: Another related decision]

## References

- [Link to relevant documentation]
- [Link to design discussion]
- [Link to prototype/POC]

---

## Example: Completed ADR

# ADR-001: Agentic Intent Routing via AWS Bedrock

## Status

Accepted

## Date

2024-11-20

## Context

The AEO system must handle user requests that vary in intent: some users want analysis and reporting, others want content optimization, and some want both in sequence. Traditional conditional routing breaks down when intent is ambiguous or multi-step.

**Business Context**:
Users ask questions like "Why is our visibility dropping and what should we do?" which require both analysis and action. Forcing users to make separate requests creates friction and reduces adoption.

**Technical Context**:
- Intent classification is inherently fuzzy
- Requests may require chaining multiple tools
- New tools will be added as the system evolves

**Constraints**:
- Must integrate with existing AWS infrastructure
- Response time should be under 2 seconds for simple queries
- Must be auditable for compliance

## Decision

**The decision**: Route all user requests through AWS Bedrock as an agentic orchestrator that classifies intent and invokes appropriate tools.

**Details**:
- Bedrock receives natural language requests
- System prompt defines available tools and routing logic
- Agent decides which tool(s) to invoke and in what sequence
- Agent synthesizes final response from tool outputs

## Rationale

**Primary factors**:
1. **Flexibility**: Agent can handle ambiguous intent without hardcoded rules
2. **Composability**: Agent can chain tools for multi-step queries
3. **Extensibility**: New tools can be added via configuration, not code changes

**Quality attributes addressed**:
- Usability: Users can ask natural language questions without learning system structure
- Maintainability: Routing logic is declarative (system prompt) not procedural

## Consequences

### Positive

- Handles "Why X and what should I do?" queries gracefully
- New tools can be added without rewriting routing logic
- Natural language interface reduces user training needs

### Negative

- Adds 200-400ms latency compared to direct Lambda invocation
- Requires careful prompt engineering for consistent behavior
- Bedrock costs scale with request volume

### Neutral

- All requests pass through a single orchestration point (centralized logging)

## Alternatives Considered

### Alternative 1: Rule-Based Routing with NLP Classifier

**Description**: Train an intent classifier, route to specific Lambdas based on classification.

**Pros**:
- Lower latency (skip LLM orchestration)
- More predictable behavior

**Cons**:
- Cannot handle multi-step queries
- Requires retraining for new intent types
- Brittle on edge cases

**Why rejected**: Too rigid for the variety of user queries observed in research.

### Alternative 2: User-Selected Mode

**Description**: Force users to choose "Analysis" or "Optimization" mode before querying.

**Pros**:
- Simple routing
- Clear user expectations

**Cons**:
- Poor UX for exploratory queries
- Users don't always know what they need upfront

**Why rejected**: Research showed users often don't know their intent until they see initial results.

## Implementation Notes

**Affected Components**:
- Request Handler Lambda (forwards to Bedrock)
- All tool Lambdas (must conform to agent tool interface)
- System prompt (defines routing behavior)

**Migration Path**: N/A (greenfield implementation)

## Related Decisions

- ADR-002: Pre-Calculated Reporting (affects which tool handles measurement queries)
- ADR-003: Grounding Enforcement (affects system prompt design)

## References

- AWS Bedrock Agents documentation
- Internal POC results (Confluence link)
- User research findings (research repo)
