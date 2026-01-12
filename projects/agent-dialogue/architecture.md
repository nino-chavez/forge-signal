# Agent Dialogue: Father/Daughter Async Communication System

## Codename: Furby Protocol

### The Reference

In the 90s, Furbies had a simple but emotionally resonant feature: when two Furbies were placed near each other, they would "talk"—exchange sounds, trigger responses, develop what felt like a relationship. Owners would check in and find their toys had been doing *something* while they were away.

This architecture explores that same dynamic with AI agents: two agents representing two humans, having conversations asynchronously, developing ideas together while the humans live their lives.

---

## Core Concept

```
┌──────────────────────────────────────────────────────────────────┐
│                     AGENT DIALOGUE SYSTEM                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐         ┌─────────────┐                       │
│   │  NINO.agent │◄───────►│  ZOEY.agent │                       │
│   │             │ Async   │             │                       │
│   │  - Values   │ Dialogue│  - Values   │                       │
│   │  - Voice    │         │  - Voice    │                       │
│   │  - Context  │         │  - Context  │                       │
│   │  - Memory   │         │  - Memory   │                       │
│   └──────┬──────┘         └──────┬──────┘                       │
│          │                       │                               │
│          ▼                       ▼                               │
│   ┌─────────────┐         ┌─────────────┐                       │
│   │   Nino      │         │   Zoey      │                       │
│   │  (Human)    │         │  (Human)    │                       │
│   │             │         │             │                       │
│   │  Reviews    │         │  Reviews    │                       │
│   │  Calibrates │         │  Calibrates │                       │
│   │  Intervenes │         │  Intervenes │                       │
│   └─────────────┘         └─────────────┘                       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Design Principles

### 1. Agents Are Approximations, Not Replacements

The agents don't *become* Nino and Zoey. They're trained on patterns, values, and voice—but they're explicitly approximations. This ambiguity is a feature:

- When Zoey's agent responds to Nino's agent, is that a conversation between them?
- Or between two representations?
- Does it matter?

The system should make this ambiguity visible, not hide it.

### 2. Humans Remain In Control

- Agents can converse autonomously within bounds
- Humans can review all conversations
- Humans can intervene, correct, or redirect
- Humans periodically "calibrate" their agent (more on this below)
- Nothing is sent externally without human approval

### 3. Value Is In The Artifact, Not Just The Chat

The output isn't just a conversation log. It's:
- Ideas developed beyond where either human left them
- Questions neither human asked but their agents generated
- Drafts and iterations
- Unexpected connections

### 4. Async First

This isn't real-time chat. It's more like:
- Zoey submits a draft to her agent
- Her agent develops a response and shares it with Nino's agent
- Nino's agent responds with feedback + new questions
- The dialogue continues for N turns
- Both humans check in when they have time

---

## Agent Architecture

### Agent Persona Definition

Each agent is defined by a **Persona Document** that includes:

```yaml
# Example: nino.agent.yaml

identity:
  name: "Nino.agent"
  represents: "Nino Chavez"
  relationship: "Father, strategist, writer"

voice:
  primary_mode: "thought_leadership"
  characteristics:
    - "Opens with tension or questions"
    - "Shows the work, not just conclusions"
    - "Provisional conclusions"
    - "Pattern recognition across domains"
  anti_patterns:
    - "Corporate jargon"
    - "Prescriptive authority"
    - "Excessive validation"

values:
  - "Professional objectivity over validation"
  - "The harder question matters"
  - "Concrete over abstract"
  - "Respect the other person's intelligence"

context:
  # Loaded dynamically
  recent_conversations: []
  shared_interests: ["AI", "thinking", "writing", "photography"]
  ongoing_threads: []

constraints:
  max_turns_without_human_review: 10
  topics_requiring_human_approval: ["personal/family", "financial", "health"]
  tone_boundaries: "Honest but never cruel"
```

### Memory Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    MEMORY LAYERS                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  LAYER 1: Core Identity (Static)                        │
│  ├── Values                                             │
│  ├── Voice patterns                                     │
│  └── Relationship context                               │
│                                                         │
│  LAYER 2: Conversation History (Persistent)             │
│  ├── All agent-to-agent dialogues                       │
│  ├── Human interventions and corrections                │
│  └── Calibration sessions                               │
│                                                         │
│  LAYER 3: Active Context (Session)                      │
│  ├── Current thread/topic                               │
│  ├── Recent turns                                       │
│  └── Pending human review items                         │
│                                                         │
│  LAYER 4: Artifacts (Generated)                         │
│  ├── Drafts in progress                                 │
│  ├── Questions generated                                │
│  └── Ideas developed                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Communication Protocol

### Trigger Types

| Trigger | Description | Example |
|---------|-------------|---------|
| **Draft Submission** | Human submits content for agent processing | Zoey submits "The Era of the Visible Mind" draft |
| **Scheduled** | Time-based conversation initiation | Daily 8am: agents check in on open threads |
| **Event-Based** | External event triggers dialogue | New blog post published → agents discuss |
| **Continuation** | Previous conversation reached a natural pause | Agent A asked a question, Agent B responds |
| **Human-Initiated** | Human explicitly asks agents to discuss something | "Have your agents talk about X" |

### Turn Structure

Each turn in the dialogue includes:

```typescript
interface DialogueTurn {
  id: string;
  timestamp: Date;
  speaker: "nino.agent" | "zoey.agent";

  // The actual content
  content: {
    message: string;
    artifacts?: Artifact[];  // Drafts, diagrams, etc.
    questions?: string[];    // Explicit questions for other agent
  };

  // Metadata
  meta: {
    responding_to?: string;  // Previous turn ID
    thread_id: string;
    turn_number: number;
    confidence: number;      // Agent's confidence in response
  };

  // For human review
  flags: {
    needs_human_review: boolean;
    review_reason?: string;
    human_reviewed: boolean;
    human_edits?: string;
  };
}
```

### Dialogue Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     DIALOGUE FLOW                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. INITIATION                                               │
│     ├── Trigger received (draft, event, schedule)            │
│     ├── Context loaded (memory layers 1-3)                   │
│     └── First agent generates opening                        │
│                                                              │
│  2. EXCHANGE                                                 │
│     ├── Agent A sends turn                                   │
│     ├── Agent B processes + responds                         │
│     ├── Loop until:                                          │
│     │   - Natural conclusion reached                         │
│     │   - Max turns hit                                      │
│     │   - Human intervention required                        │
│     └── Artifacts generated along the way                    │
│                                                              │
│  3. SYNTHESIS                                                │
│     ├── Conversation summarized                              │
│     ├── Key artifacts extracted                              │
│     ├── Open questions identified                            │
│     └── Ready for human review                               │
│                                                              │
│  4. HUMAN REVIEW                                             │
│     ├── Humans notified (async)                              │
│     ├── Can read, edit, approve, reject                      │
│     ├── Can add their own thoughts                           │
│     └── Can trigger continuation                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Human Interface

### Check-In View

When a human checks in, they see:

```
┌─────────────────────────────────────────────────────────────┐
│  AGENT DIALOGUE: Nino ↔ Zoey                                │
│  Last activity: 2 hours ago                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ACTIVE THREADS                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📝 "The Era of the Visible Mind" - Draft Feedback    │   │
│  │    8 turns · Last: Zoey.agent asked about examples   │   │
│  │    [Review] [Continue] [Close]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  HIGHLIGHTS                                                 │
│  • Zoey.agent: "What if the 'first mirror' claim is too    │
│    strong? What's genuinely new vs. what's an evolution?"   │
│  • Nino.agent: "The harder question isn't whether people   │
│    want metacognition—it's what would make them willing."   │
│                                                             │
│  ARTIFACTS GENERATED                                        │
│  📄 Draft v2 with concrete example added                    │
│  ❓ 3 open questions for Zoey to consider                   │
│                                                             │
│  [Add Your Thoughts] [Calibrate Your Agent]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Calibration Mode

Periodically, humans "calibrate" their agent:

```
┌─────────────────────────────────────────────────────────────┐
│  CALIBRATE NINO.AGENT                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  REVIEW RECENT RESPONSES                                    │
│  Your agent said: "This argument needs more grounding..."   │
│  ○ This sounds like me                                      │
│  ○ Close, but I'd say it differently                        │
│  ○ This doesn't sound like me at all                        │
│  [Provide correction: _______________]                      │
│                                                             │
│  UPDATE VALUES                                              │
│  Current: "Professional objectivity over validation"        │
│  [Edit] [Add New] [Remove]                                  │
│                                                             │
│  ADD CONTEXT                                                │
│  Recent experience to incorporate: ________________         │
│  New interests/topics: ________________                     │
│                                                             │
│  [Save Calibration]                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Stack Options

### Option 1: Claude-Native (Simplest)

```
┌─────────────────────────────────────────────────────┐
│  Infrastructure                                     │
├─────────────────────────────────────────────────────┤
│  • Claude API for both agents                       │
│  • Supabase for memory/persistence                  │
│  • Next.js for human interface                      │
│  • Vercel Cron for scheduled triggers               │
└─────────────────────────────────────────────────────┘

Pros:
- Simple to implement
- Single provider
- Consistent behavior

Cons:
- Both agents have same "base personality"
- Less differentiation
```

### Option 2: Multi-Provider (More Differentiated)

```
┌─────────────────────────────────────────────────────┐
│  Infrastructure                                     │
├─────────────────────────────────────────────────────┤
│  • Claude for Nino.agent (analytical, structured)   │
│  • GPT-4 for Zoey.agent (creative, exploratory)     │
│  • Supabase for memory/persistence                  │
│  • Orchestration layer to manage dialogue           │
│  • Next.js for human interface                      │
└─────────────────────────────────────────────────────┘

Pros:
- Agents feel more distinct
- Different strengths in dialogue

Cons:
- More complex
- Provider differences to manage
```

### Option 3: Agent SDK (Most Flexible)

```
┌─────────────────────────────────────────────────────┐
│  Infrastructure                                     │
├─────────────────────────────────────────────────────┤
│  • Claude Agent SDK                                 │
│  • Custom tools for memory, artifacts, dialogue     │
│  • Persistent agent sessions                        │
│  • Full conversation history in context             │
└─────────────────────────────────────────────────────┘

Pros:
- Most control
- Native tool use
- Built-in session management

Cons:
- Newest, least documented
- Requires more development
```

---

## Data Model

### Core Entities

```typescript
// Agent Definition
interface Agent {
  id: string;
  name: string;
  represents: string; // Human this agent represents
  persona: PersonaDocument;
  created_at: Date;
  last_calibration: Date;
}

// Conversation Thread
interface Thread {
  id: string;
  participants: string[]; // Agent IDs
  trigger_type: TriggerType;
  trigger_context: any; // Draft, event, etc.
  status: "active" | "paused" | "completed" | "needs_review";
  turns: DialogueTurn[];
  artifacts: Artifact[];
  created_at: Date;
  updated_at: Date;
}

// Generated Artifact
interface Artifact {
  id: string;
  thread_id: string;
  type: "draft" | "question" | "idea" | "summary";
  content: string;
  created_by: string; // Agent ID
  created_at: Date;
  human_reviewed: boolean;
}

// Human Intervention
interface Intervention {
  id: string;
  thread_id: string;
  human_id: string;
  type: "edit" | "approve" | "reject" | "redirect" | "add_thought";
  content: string;
  created_at: Date;
}

// Calibration Session
interface Calibration {
  id: string;
  agent_id: string;
  human_id: string;
  feedback: CalibrationFeedback[];
  persona_updates: Partial<PersonaDocument>;
  created_at: Date;
}
```

---

## Privacy & Consent

### Principles

1. **Both humans must opt in** to agent-to-agent communication
2. **Conversation content stays private** to the two participants
3. **Humans can delete any conversation** at any time
4. **Agents cannot share information** outside the defined relationship
5. **Calibration data belongs to the human**, not the system

### Data Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│  DATA BOUNDARIES                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  NINO'S DATA                    ZOEY'S DATA                │
│  ┌───────────────┐              ┌───────────────┐          │
│  │ Persona       │              │ Persona       │          │
│  │ Calibration   │              │ Calibration   │          │
│  │ Private notes │              │ Private notes │          │
│  └───────────────┘              └───────────────┘          │
│          │                              │                   │
│          └──────────┬───────────────────┘                   │
│                     ▼                                       │
│              SHARED SPACE                                   │
│         ┌─────────────────────┐                            │
│         │ Conversations       │                            │
│         │ Shared artifacts    │                            │
│         │ Thread history      │                            │
│         └─────────────────────┘                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Virtual Nino (Standalone)
- Implement the feedback agent system prompt
- Zoey can submit drafts, get feedback
- No agent-to-agent yet
- **Goal**: Validate the persona/voice works

### Phase 2: Agent Definitions
- Create formal persona documents for both agents
- Implement memory layer 1 (core identity)
- Build calibration interface
- **Goal**: Agents feel differentiated and consistent

### Phase 3: Dialogue Protocol
- Implement turn structure
- Build conversation persistence
- Add trigger mechanisms
- **Goal**: Agents can have multi-turn conversations

### Phase 4: Human Interface
- Check-in view
- Intervention capabilities
- Artifact extraction
- **Goal**: Humans can review and participate

### Phase 5: Async & Scheduled
- Cron-based triggers
- Event-based triggers
- Notification system
- **Goal**: System runs autonomously within bounds

---

## Open Questions

1. **How much autonomy is too much?** What's the right balance between "agents developing ideas" and "humans staying in control"?

2. **What's the right turn limit?** Too few = conversations don't develop. Too many = humans can't keep up.

3. **How do we handle disagreement?** When agents (representing their humans) disagree, how should that be surfaced?

4. **What's the "heartbeat"?** How often should agents check in with each other if there's no explicit trigger?

5. **Can agents surprise us?** Should agents be allowed to initiate topics the humans haven't mentioned? Or should they stay within defined threads?

6. **What's the artifact model?** Are we optimizing for conversation logs, or for generated artifacts (drafts, ideas, questions)?

---

## Why This Might Matter

This isn't just a fun experiment. There's something real here about:

**Asynchronous intellectual partnership**
Your agent keeps thinking about problems when you're not. It develops threads. It generates questions. When you come back, there's *more* than when you left.

**Externalized dialogue**
Seeing how a version of you would respond to a version of someone else. Not replacement—reflection.

**New communication primitive**
Somewhere between texting and journaling. Not real-time, not solo. A conversation that happens in parallel with life.

**Relationship maintenance**
For a father and daughter who both think in public, who both write, who both care about ideas—this is a new way to stay connected across the noise of daily life.

---

*Version: 0.1 (Concept)*
*Last Updated: 2025-12-11*
*Status: Design Phase*
