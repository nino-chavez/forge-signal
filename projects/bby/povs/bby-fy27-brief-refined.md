# Best Buy FY'27 Agentic Commerce Strategy: Engineering Priorities

**To:** James, Amit (Engineering Leadership)  
**CC:** Amy Williams, Ram Raipati, Kannan Swaminathan  
**From:** Nino Chavez (Accenture Strategic Advisor)  
**Date:** November 24, 2025

---

There's a tension that every enterprise faces when the ground shifts beneath them: Do you build the infrastructure yourself, or buy from vendors who promise to keep up with the change?

For your organization, that tension is playing out in real-time as you plan for FY'27. You're trying to establish a "machine lane" for commerce—a world where AI agents consume Product Detail Page content, where machines need to understand your inventory as well as humans do. But the protocols are changing daily. The SDKs are evolving. The vendors are promising the world.

Ram put it bluntly in the November 21 review: "Feedonomics promises you the world and then does not follow through." He's been at your org for 14 years. He's seen this before.

But here's the thing: If you build it yourselves, you risk falling behind as protocols change. If you buy, you risk vendor lock-in and under-delivery. Neither choice feels good.

**The Pattern I'm Seeing**

This isn't unique to your organization. I've seen this tension across retail, manufacturing, and enterprise clients. The pattern is consistent:

- Legacy systems built for human consumption
- New requirements for machine consumption (agents, LLMs, structured feeds)
- Rapidly evolving standards (Schema.org, ACP protocols, SDK changes)
- Vendor promises that don't always deliver
- Internal teams skipping fundamentals in favor of speed

Amy asked the question everyone's thinking: "How do we tackle all of this? All at the same time? Where do we focus first?"

**The Framework: Build the Intelligence, Buy the Plumbing**

Here's where I've landed—for now. The answer isn't "build" or "buy." It's "build the decision engine, buy the plumbing."

What that means:
- **Build**: The Central Intelligence Layer—the matchmaking engine that uses your proprietary data
- **Buy**: The feed management, the API integrations, the change management layer
- **Hybrid**: Use vendors like Feedonomics/Rithum for connectivity, but keep the decision logic in your own GCP environment

**Why This Matters Now**

Generic AI platforms (like OpenAI) act as "tourists" in your customers' lives. They know general product information but lack your specific historical data—purchase history, repair logs, return reasons. They can't tell you that a customer returned their last laptop because it was too heavy.

You win by leveraging context. If you can feed an agent specific context ("Customer returned the last laptop because it was too heavy"), you provide a better recommendation than a generic search engine ever could.

**Differentiation Strategy**

Focus your proprietary agents on **Considered Purchases**—complex items like appliances and computers where trust and compatibility matter most. Simple commodity items (like batteries) can be handled by general market agents. But when someone is buying a laptop that needs to work with their existing printer, or an appliance that fits their kitchen layout, that's where your context wins.

**Engineering Priorities for the Work Session**

I recommend James and Amit evaluate your current Google Cloud Platform capabilities against three specific requirements:

### **A. Structured Data for External Agents (The "Machine Lane")**

Your current Product Detail Pages are designed for human eyes. Future success requires data structured for machine reading.

**Requirement:** You must implement strict **Schema.org** standards across your catalog. This ensures that when an external agent (like Microsoft Copilot) scans your site, it retrieves accurate pricing, availability, and specs without errors.

**Gap to Analyze:** Are your current feeds to partners (Feedonomics/Rithum) flexible enough to support different API strategies for different partners? Can you deliver a specific feed format for OpenAI vs. a different format for Microsoft? Ram's concern about Feedonomics suggests you need to understand this before committing.

### **B. The "Service Level" Data Layer**

To enable a "Concierge" experience, your data feeds must go beyond technical specifications (screen size, processor speed) and include **usage context**.

**Requirement:** You need to enrich data feeds with "Service Level" attributes.

- *Example:* Instead of just "16GB RAM," your data feeds should indicate "Optimized for Student Use" or "Compatible with User's Previous Printer."

**Goal:** This allows your decision engine to infer the best match based on a user's lifestyle, not just keywords. Kannan's focus on consolidating enriched content, vendor data, and top-selling product info into a "foundational knowledge graph" aligns here.

### **C. The Central Decision Engine**

Shift away from the idea that the "chat" interface is the product. The product is the logic that sits *behind* the chat.

**Requirement:** Construct a **Matchmaking Engine** on Google Cloud Platform. This system must act as the single source of truth for inventory and customer context.

**Function:** It receives a request from any source (a website chatbot, a voice assistant, or an external app), processes it against your proprietary customer data, and returns a single, highly curated recommendation.

**The Risk:** If you don't own this layer, you become just another feed in a generic AI's database—another retailer in the machine's database, not a differentiated intelligence layer.

**Discussion Questions for Engineering**

I recommend James and Amit come prepared to discuss the following regarding your Google Cloud Platform environment:

1. **Latency:** Real-time agentic commerce requires sub-second processing for inventory checks and fraud validation. Can your current infrastructure support this speed at scale? Amy's concern about keeping up with changes suggests you need to understand current capabilities.

2. **Data Unification:** Can you easily consolidate "offline" data (Geek Squad repairs, in-store returns) into the same real-time graph used by your digital storefront? This is the context that makes you different from generic AI platforms.

3. **Integration Risk:** Ram raised concerns about Feedonomics. Can you use them strictly for "plumbing" (basic connectivity) while keeping the decision logic and data enrichment within your own Google Cloud Platform environment to mitigate risk? This is the hybrid approach—use vendors for what they're good at, but maintain control of the intelligence layer.

**Next Steps**

**Immediate Action:** Review current data models in Google Cloud Platform for Schema.org compliance. This is step one—everything else depends on it.

**Meeting Goal:** Define the architecture for a "Headless" commerce system where you own the intelligence, regardless of which interface the customer uses. Whether they're talking to ChatGPT, Microsoft Copilot, or your own website, the decision engine should be yours.

**The Questions You're Still Exploring**

- How do smaller partners (Wizard, Firmly) integrate with Top LLMs?
- What's the right balance between standardization and flexibility?
- How do you enable test-and-learn patterns without breaking fundamentals?
- What's the risk profile of single vs. multiple vendor partnerships?

Here's what I think today: You need a hybrid approach—build the intelligence, buy the plumbing, maintain control of the data. But that's provisional. The ecosystem is moving too fast for definitive answers.

The real work is in the execution—and in not skipping the fundamentals while trying to keep up with the speed of change.

---

**Provisional Landing**

This brief outlines where I've landed—for now. The November 21 discussion surfaced real concerns about vendor reliability, infrastructure readiness, and the tension between speed and fundamentals. 

The work session with James and Amit should focus on understanding your current GCP capabilities against these three requirements. From there, you can make informed decisions about what to build, what to buy, and how to structure the partnerships.

But the core principle remains: **You should own the intelligence. You should control the context. You should decide the match.**

Everything else is plumbing.

