**Strategic Briefing: Preparing for Fiscal Year 2027 Artificial Intelligence Commerce Planning**

**To:** James, Amit (Engineering Leadership)

**CC:** Amy Williams, Ram Raipati, Kannan Swaminathan

**Date:** November 24, 2025

**Subject:** Engineering Priorities for Enabling the "Infinite Concierge" Model

### **1. Executive Summary**

Following the November 21 review, leadership has aligned on a strategy to establish a dedicated "machine lane" for commerce. We are moving beyond standard e-commerce (customers searching and scrolling) toward a model where Artificial Intelligence agents actively fetch products and negotiate on behalf of users.

Our goal is not to build a new chatbot interface. Our goal is to build a **Central Intelligence Layer**—a decision engine that uses our proprietary data to match customers with the correct inventory instantly. This brief outlines the engineering requirements to support this "Infinite Concierge" strategy.

---

### **2. Strategic Context: Why We Must Build**

We face a "Build vs. Buy" decision regarding our data infrastructure. The strategy is to **build the decision engine** while potentially using partners for standard connections.

* **The Problem:** Generic Artificial Intelligence platforms (like OpenAI) act as "tourists" in our customers' lives. They know general product information but lack our specific historical data (e.g., purchase history, repair logs, return reasons).

* **The Opportunity:** Best Buy wins by leveraging "Context." If we can feed an agent specific context (e.g., "Customer returned the last laptop because it was too heavy"), we provide a better recommendation than a generic search engine ever could.

* **Differentiation:** We will focus our proprietary agents on **Considered Purchases** (complex items like appliances and computers) where trust and compatibility matter most, leaving simple commodity items (like batteries) to general market agents.

---

### **3. Engineering Priorities for the Work Session**

We need James and Amit to evaluate our current Google Cloud Platform capabilities against three specific requirements:

#### **A. Structured Data for External Agents (The "Machine Lane")**

Current Product Detail Pages are designed for human eyes. Future success requires data structured for machine reading.

* **Requirement:** We must implement strict **Schema.org** standards across our catalog. This ensures that when an external agent (like Microsoft Copilot) scans our site, it retrieves accurate pricing, availability, and specs without errors.

* **Gap to Analyze:** Are our current feeds to partners (Feedonomics/Rithum) flexible enough to support different Application Programming Interface strategies for different partners (e.g., a specific feed for OpenAI vs. a different feed for Microsoft)?

#### **B. The "Service Level" Data Layer**

To enable a "Concierge" experience, our data feeds must go beyond technical specifications (screen size, processor speed) and include **usage context**.

* **Requirement:** We need to enrich our data feeds with "Service Level" attributes.

    * *Example:* Instead of just "16GB RAM," the data feed should indicate "Optimized for Student Use" or "Compatible with User's Previous Printer."

* **Goal:** This allows the decision engine to infer the best match based on a user's lifestyle, not just keywords.

#### **C. The Central Decision Engine**

We are shifting away from the idea that the "chat" interface is the product. The product is the logic that sits *behind* the chat.

* **Requirement:** Construct a **Matchmaking Engine** on Google Cloud Platform. This system must act as the single source of truth for inventory and customer context.

* **Function:** It receives a request from any source (a website chatbot, a voice assistant, or an external app), processes it against our proprietary customer data, and returns a single, highly curated recommendation.

---

### **4. Discussion Questions for Engineering**

Please come prepared to discuss the following regarding our Google Cloud Platform environment:

1.  **Latency:** Real-time agentic commerce requires sub-second processing for inventory checks and fraud validation. Can our current infrastructure support this speed at scale?

2.  **Data Unification:** Can we easily consolidate "offline" data (Geek Squad repairs, in-store returns) into the same real-time graph used by our digital storefront?

3.  **Integration Risk:** Ram raised concerns about Feedonomics. Can we use them strictly for "plumbing" (basic connectivity) while keeping the decision logic and data enrichment within our own Google Cloud Platform environment to mitigate risk?

### **5. Next Steps**

* **Immediate Action:** Review current data models in Google Cloud Platform for Schema.org compliance.

* **Meeting Goal:** Define the architecture for a "Headless" commerce system where Best Buy owns the intelligence, regardless of which interface the customer uses.

