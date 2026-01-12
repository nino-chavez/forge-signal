# ACP & AP2 Protocol Integration Plan
## Agentic Commerce Architecture Document

---

## Executive Summary

Two competing but complementary protocols have emerged to enable AI agents to complete transactions on behalf of users:

| Protocol | Owner | Focus | Status |
|----------|-------|-------|--------|
| **ACP** (Agentic Commerce Protocol) | OpenAI + Stripe | Checkout UX & merchant integration | Production (ChatGPT + Etsy, Shopify soon) |
| **AP2** (Agent Payments Protocol) | Google + 60 partners | Trust & authorization governance | Early adoption (spec published) |

**Key Insight:** These protocols are **complementary layers**, not competitors. ACP handles the checkout flow; AP2 handles trust verification. Best Buy should prepare to support both.

---

## Protocol Deep Dive

### ACP (Agentic Commerce Protocol)

**Sources:**
- [OpenAI Developer Docs](https://developers.openai.com/commerce/)
- [GitHub Repository](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- [Stripe Blog](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)
- [Agentic Checkout Spec](https://developers.openai.com/commerce/specs/checkout/)
- [Delegated Payment Spec](https://developers.openai.com/commerce/specs/payment/)

#### Architecture Overview

ACP is an **application-layer protocol** that enables AI agents (like ChatGPT) to complete purchases within the agent interface, while the merchant remains the **Merchant of Record**.

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER IN CHATGPT                          │
│  "I want to buy a Samsung 65" TV from Best Buy"                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CHATGPT (AI AGENT)                           │
│  • Collects user preferences                                    │
│  • Gathers shipping address                                     │
│  • Displays checkout UI (rendered by OpenAI)                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ ACP REST APIs
┌─────────────────────────────────────────────────────────────────┐
│                 BEST BUY COMMERCE BACKEND                       │
│  POST /checkout_sessions        → Create session with cart     │
│  POST /checkout_sessions/{id}   → Update (shipping, discounts) │
│  POST /checkout_sessions/{id}/complete → Finalize purchase     │
│  Webhooks: order.created, order.updated                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ Delegated Payment Token
┌─────────────────────────────────────────────────────────────────┐
│              PAYMENT SERVICE PROVIDER (Stripe SPT)              │
│  • Receives scoped payment token (max amount + expiry)         │
│  • Processes payment on merchant's behalf                       │
│  • Never exposes PAN to agent                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### Agentic Checkout Spec — Required Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/checkout_sessions` | POST | Initialize checkout with cart contents |
| `/checkout_sessions/{id}` | POST | Update session (shipping, discounts, qty) |
| `/checkout_sessions/{id}/complete` | POST | Finalize purchase with payment token |
| `/checkout_sessions/{id}/cancel` | POST | Cancel active session |
| `/checkout_sessions/{id}` | GET | Retrieve current session state |

#### Request/Response Requirements

**All endpoints must:**
- Use HTTPS and return JSON
- Accept headers: `Authorization`, `Idempotency-Key`, `Request-Id`, `Signature`, `Timestamp`, `API-Version`
- Return rich checkout state including:
  - Line items with pricing breakdown
  - Fulfillment options (shipping/pickup/digital)
  - Totals array (subtotal, tax, fees, total)
  - Messages (info/error)
  - Links (ToS, privacy policy, order permalink)

#### Webhook Events (Order Lifecycle)

| Event | When Triggered |
|-------|----------------|
| `order.created` | Order placed successfully |
| `order.updated` | Status change: confirmed, shipped, fulfilled, canceled, manual_review |

#### Delegated Payment Spec — Token Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  USER    │───▶│  OPENAI  │───▶│   PSP    │───▶│ MERCHANT │
│          │    │ (Agent)  │    │ (Stripe) │    │(Best Buy)│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │
     │ Card details  │               │               │
     │──────────────▶│               │               │
     │               │ Delegate req  │               │
     │               │──────────────▶│               │
     │               │               │ Create SPT    │
     │               │   SPT token   │───────────────│
     │               │◀──────────────│               │
     │               │               │               │
     │               │ Complete checkout w/ SPT      │
     │               │──────────────────────────────▶│
     │               │               │               │
     │               │               │ Charge via SPT│
     │               │               │◀──────────────│
     │               │               │               │
```

**Stripe Shared Payment Token (SPT) Constraints:**
- Single-use only
- Scoped by: currency, max amount, expiration window
- Never reveals PANs or raw credentials
- Risk signals provided: fraud score, card testing, stolen card likelihood

---

### AP2 (Agent Payments Protocol)

**Sources:**
- [Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- [AP2 Specification](https://ap2-protocol.org/specification/)
- [PayPal Developer Blog](https://developer.paypal.com/community/blog/PayPal-Agent-Payments-Protocol/)

#### Architecture Overview

AP2 is a **governance/trust-layer protocol** that uses cryptographically signed **mandates** to create an auditable chain of evidence for agent-initiated transactions.

**The Problem AP2 Solves:**

Today's payment systems assume a human clicks "buy" on a trusted website. When an autonomous agent initiates payment, critical questions arise:
- **Authorization:** Did the user actually authorize this specific purchase?
- **Authenticity:** Does the agent's request reflect true user intent (not hallucination)?
- **Accountability:** If fraud occurs, who is liable — user, agent, merchant, or issuer?

#### Mandate System

AP2 introduces three types of **cryptographically signed credentials**:

```
┌─────────────────────────────────────────────────────────────────┐
│                      INTENT MANDATE                             │
│  "Human-Not-Present" — Pre-authorization for future purchases   │
├─────────────────────────────────────────────────────────────────┤
│  • User signs upfront with conditions                           │
│  • Specifies: budget limits, product categories, timing         │
│  • Example: "Buy concert tickets when they go on sale, max $200"│
│  • Agent executes autonomously when conditions met              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CART MANDATE                              │
│  "Human-Present" — Real-time authorization for specific cart    │
├─────────────────────────────────────────────────────────────────┤
│  • Created when agent presents final cart to user               │
│  • User reviews and signs cryptographically                     │
│  • Contains: exact items, prices, merchant, destination         │
│  • "What you see is what you pay for"                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PAYMENT MANDATE                             │
│  Derived credential for payment networks                        │
├─────────────────────────────────────────────────────────────────┤
│  • Minimal credential appended to authorization                 │
│  • Signals: AI agent presence, modality (HP/HNP)               │
│  • Helps issuers with fraud decisions                          │
│  • Does not alter existing network flows                        │
└─────────────────────────────────────────────────────────────────┘
```

#### Trust Chain — Non-Repudiable Audit Trail

```
User Intent ──▶ Intent Mandate (signed) ──▶ Agent Processing ──▶
Cart Mandate (signed) ──▶ Payment Authorization ──▶
Payment Mandate (attached) ──▶ Settlement
```

Every step is cryptographically signed using **W3C Verifiable Credentials**, creating tamper-proof evidence for dispute resolution.

#### Key Actors in AP2

| Actor | Responsibility |
|-------|----------------|
| **User** | Ultimate authority, delegates tasks to agent |
| **Shopping Agent** | Discovers products, builds cart, obtains authorization |
| **Credentials Provider** | Manages payment methods, handles tokenization |
| **Merchant Endpoint** | Showcases offerings, negotiates cart |
| **Payment Processor** | Constructs authorization messages |
| **Issuer/Network** | Authorizes using risk models + mandate context |

#### Coalition Partners (60+)

- **Payment Networks:** Mastercard, American Express, JCB, UnionPay
- **PSPs:** PayPal, Adyen, Checkout.com, Stripe
- **Platforms:** Salesforce, Adobe, ServiceNow
- **Crypto:** Coinbase, MetaMask, Ethereum Foundation (A2A x402 extension)

---

## ACP vs AP2 Comparison

| Aspect | ACP (OpenAI/Stripe) | AP2 (Google) |
|--------|---------------------|--------------|
| **Layer** | Application (checkout UX) | Governance (trust/authorization) |
| **Trust Model** | Token-driven (platform security) | Mandate-driven (cryptographic proof) |
| **Approach** | Product-led (ChatGPT-first) | Consortium-led (60+ partners) |
| **Best For** | Instant checkout, e-commerce | Complex B2B, high-value, compliance |
| **Status** | Production (Etsy live, Shopify soon) | Early adoption (spec published) |
| **Human-Not-Present** | Limited support | First-class support (Intent Mandate) |
| **Dispute Resolution** | Standard merchant processes | Cryptographic evidence chain |
| **Payment Agnostic** | Stripe-centric (SPT) | Yes (cards, crypto, bank transfers) |

**Key Insight:** They're complementary, not competing:
- **ACP** = "How do we do checkout?"
- **AP2** = "How do we prove the user authorized it?"

---

## Integration Architecture for Best Buy

### Proposed Protocol Stack

```
┌─────────────────────────────────────────────────────────────────┐
│              LAYER 0: AGENT INTERFACE                           │
│  ChatGPT, Gemini, Perplexity, Copilot, Claude                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         LAYER 0.5: AGENTIC COMMERCE PROTOCOLS                   │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │        AP2          │    │        ACP          │            │
│  │  Trust & Authorization   │  Checkout & Commerce │            │
│  │  • Intent Mandate   │    │  • REST APIs        │            │
│  │  • Cart Mandate     │───▶│  • Session mgmt     │            │
│  │  • Payment Mandate  │    │  • Webhooks         │            │
│  └─────────────────────┘    └─────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              LAYER 1: API GATEWAY                               │
│  Authentication, Rate Limiting, Protocol Routing                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              LAYER 2: ORCHESTRATION                             │
│  Intent Analysis, Context Engine, Matchmaking, Pricing          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              LAYER 3: COMMERCE FOUNDATION                       │
│  Product, Inventory, Pricing, Customer, Orders, Payments        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PAYMENT SERVICE PROVIDERS                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Stripe  │  │  Adyen   │  │  PayPal  │  │Checkout  │       │
│  │   SPT    │  │   AP2    │  │   AP2    │  │   AP2    │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### Transaction Flow: ChatGPT User Buys TV via ACP

```
Step 1: DISCOVERY
────────────────────────────────────────────────────────────
User: "Find me a 65" Samsung TV under $1000"
ChatGPT: [Queries Best Buy Product Feed API]
Best Buy: Returns matching products with prices, availability

Step 2: SELECTION
────────────────────────────────────────────────────────────
User: "I'll take the QN65Q60D"
ChatGPT: [POST /checkout_sessions]
         {
           "items": [{"sku": "6576418", "qty": 1}],
           "buyer": {"zip": "55401"}
         }
Best Buy: Returns session with pricing, fulfillment options, tax

Step 3: CHECKOUT
────────────────────────────────────────────────────────────
User: [Selects shipping, enters address in ChatGPT UI]
ChatGPT: [POST /checkout_sessions/{id}]
         {
           "fulfillment": "ship_to_home",
           "address": {...}
         }
Best Buy: Returns updated totals, delivery estimate

Step 4: PAYMENT
────────────────────────────────────────────────────────────
User: [Enters card in ChatGPT, confirms purchase]
OpenAI: [POST /agentic_commerce/delegate_payment to Stripe]
Stripe: Returns SPT (single-use token, max $899, expires 15min)
ChatGPT: [POST /checkout_sessions/{id}/complete]
         {
           "payment_token": "spt_xxx",
           "amount": 899.00
         }
Best Buy: Charges via Stripe, creates order, returns confirmation

Step 5: FULFILLMENT
────────────────────────────────────────────────────────────
Best Buy: [Webhook: order.created]
Best Buy: [Webhook: order.updated → shipped]
ChatGPT: Displays tracking to user
```

### Transaction Flow: Gemini User Buys TV via AP2

```
Step 1: INTENT CAPTURE
────────────────────────────────────────────────────────────
User: "When Best Buy has a 65" Samsung TV under $800, buy it"
Gemini: [Creates Intent Mandate]
        {
          "type": "IntentMandate",
          "conditions": {
            "merchant": "bestbuy.com",
            "category": "TVs",
            "brand": "Samsung",
            "size": "65in",
            "max_price": 800
          },
          "expires": "2025-01-15T00:00:00Z"
        }
User: [Signs Intent Mandate cryptographically]

Step 2: MONITORING (Human-Not-Present)
────────────────────────────────────────────────────────────
Gemini: [Periodically checks Best Buy inventory/pricing]
Best Buy: Price drop detected → QN65Q60D now $799

Step 3: CART CREATION
────────────────────────────────────────────────────────────
Gemini: [Creates Cart Mandate based on Intent Mandate]
        {
          "type": "CartMandate",
          "derived_from": "intent_xxx",
          "items": [{"sku": "6576418", "price": 799}],
          "total": 863.92  // with tax
        }
Gemini: [Signs Cart Mandate with agent key]

Step 4: PAYMENT AUTHORIZATION
────────────────────────────────────────────────────────────
Gemini: [Submits to Credentials Provider (e.g., PayPal)]
PayPal: [Creates Payment Mandate]
        {
          "type": "PaymentMandate",
          "agent_present": true,
          "modality": "human_not_present",
          "cart_mandate_ref": "cart_xxx"
        }
PayPal: [Submits authorization to issuer with Payment Mandate]
Issuer: [Approves based on risk + mandate context]

Step 5: ORDER PLACEMENT
────────────────────────────────────────────────────────────
Gemini: [Places order via Best Buy API with payment token]
Best Buy: Creates order, sends confirmation
Gemini: [Notifies user of completed purchase]
```

---

## HTML Document Integration Plan

### Changes to Make

#### 1. Update Header/Subtitle
```
Current:  "Complete Architecture Reference — Data Domains, Flows & Dependencies"
Proposed: "Complete Architecture Reference — Including ACP & AP2 Protocol Integration"
```

#### 2. Update External Agents Section (Layer 1)

**Current limitation note:**
> "External agents cannot complete transactions. Deep-link to BestBuy.com for checkout."

**New note (with protocols):**
> "With ACP/AP2 integration, external agents CAN complete transactions within their interface. Best Buy remains Merchant of Record."

**Updated Agent Cards:**
- Add protocol badges: `ACP READY`, `AP2 READY`
- Show new capabilities: "Full checkout via ACP", "Delegated payments via AP2"
- Update "Cannot Access" to reflect what's still restricted

#### 3. NEW SECTION: Agentic Commerce Protocols (Insert between Layer 1 and Layer 2)

```
┌─────────────────────────────────────────────────────────────────┐
│  NEW SECTION: AGENTIC COMMERCE PROTOCOLS                        │
│  "The Transaction Bridge" — Enabling agent-mediated commerce    │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ACP (OpenAI + Stripe)                                   │   │
│  │  • Agentic Checkout Spec (5 REST endpoints)             │   │
│  │  • Delegated Payment Spec (Stripe SPT)                  │   │
│  │  • Product Feed Spec                                     │   │
│  │  • Order webhooks                                        │   │
│  │  Status: PRODUCTION (Etsy, Shopify)                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AP2 (Google + 60 partners)                              │   │
│  │  • Intent Mandate (human-not-present)                   │   │
│  │  • Cart Mandate (human-present)                         │   │
│  │  • Payment Mandate (issuer signals)                     │   │
│  │  • W3C Verifiable Credentials                           │   │
│  │  Status: EARLY ADOPTION                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Protocol Comparison Matrix                              │   │
│  │  ACP vs AP2 — complementary layers                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### 4. NEW SECTION: Payment Service Providers (After Commerce Foundation)

```
┌─────────────────────────────────────────────────────────────────┐
│  NEW SECTION: PAYMENT SERVICE PROVIDERS                         │
│  "The Settlement Layer" — Protocol-compliant payment processing │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Stripe  │  │  Adyen   │  │  PayPal  │  │Checkout  │       │
│  │ ACP: SPT │  │ AP2: Yes │  │ AP2: Yes │  │ ACP+AP2  │       │
│  │ AP2: TBD │  │ ACP: TBD │  │ ACP: TBD │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                 │
│  Capabilities:                                                  │
│  • Delegated payment token handling                            │
│  • PCI DSS Level 1 compliance                                  │
│  • Mandate verification (AP2)                                  │
│  • Risk scoring & fraud signals                                │
└─────────────────────────────────────────────────────────────────┘
```

#### 5. Update Data Flow Matrix

**Add new rows for ACP/AP2 transactions:**

| Use Case | Trigger | Protocol | Data Read | Data Write | Response | SLA |
|----------|---------|----------|-----------|------------|----------|-----|
| "Buy this TV" (ChatGPT) | External Agent (ACP) | ACP | Product, Inventory, Pricing, Customer | Order created | Order confirmation + tracking | <3s |
| "Buy when price drops" | External Agent (AP2) | AP2 | Price monitoring, Inventory | Intent Mandate stored | Mandate confirmation | <1s |
| Complete delegated purchase | Agent (AP2 HNP) | AP2 | Cart Mandate, Payment Mandate | Order created | Order + audit trail | <5s |

#### 6. Update Open Questions Section

**Add new questions:**
- Which PSP should be primary for ACP? (Stripe has first-mover advantage)
- Timeline for AP2 adoption given Google's coalition?
- How to handle dual-protocol support (ACP + AP2)?
- Mandate storage and verification infrastructure?
- PCI scope implications for Delegated Payment Spec?

### New React Components to Create

```javascript
// 1. Protocol Card Component
const ProtocolCard = ({
  name,           // "ACP" or "AP2"
  owner,          // "OpenAI + Stripe" or "Google + 60 partners"
  focus,          // "Checkout & Commerce" or "Trust & Authorization"
  status,         // "PRODUCTION" or "EARLY ADOPTION"
  specs,          // Array of spec names
  color           // Tailwind color class
}) => (...)

// 2. Protocol Comparison Table
const ProtocolComparisonTable = () => (...)

// 3. Mandate Flow Diagram (for AP2)
const MandateFlowDiagram = () => (...)

// 4. ACP Checkout Flow Diagram
const ACPCheckoutFlow = () => (...)

// 5. PSP Integration Card
const PSPCard = ({
  name,           // "Stripe", "Adyen", etc.
  acpSupport,     // boolean or "TBD"
  ap2Support,     // boolean or "TBD"
  features        // Array of features
}) => (...)

// 6. Updated AgentCard with protocol badges
const AgentCard = ({
  ...existing props,
  acpReady,       // boolean
  ap2Ready,       // boolean
  canTransact     // boolean (NEW)
}) => (...)
```

### Estimated Changes

| Section | Action | Lines Added |
|---------|--------|-------------|
| Icons | Add 3-4 new icons (Link, FileCheck, Signature, Wallet) | ~20 |
| External Agents | Update cards, remove limitation note | ~30 |
| NEW: Protocol Section | Full ACP + AP2 section | ~250 |
| NEW: PSP Section | Payment providers | ~80 |
| Data Flow Matrix | Add 3 new rows | ~30 |
| Open Questions | Add 5 protocol questions | ~20 |
| **TOTAL** | | **~430 lines** |

Final file size: ~1620 lines (still manageable for single HTML)

---

## Implementation Order

1. **Add new icons** for protocol-related visuals
2. **Create ProtocolCard component** for ACP and AP2 boxes
3. **Create PSPCard component** for payment providers
4. **Update AgentCard** to show protocol support badges
5. **Insert new Protocol Section** after Layer 1, before Layer 2
6. **Insert new PSP Section** after Commerce Foundation
7. **Update Data Flow Matrix** with protocol transactions
8. **Update Open Questions** with protocol-related items
9. **Update header subtitle** to reflect protocol coverage
10. **Test rendering** and print styles

---

## References

### ACP (Agentic Commerce Protocol)
- Official Docs: https://developers.openai.com/commerce/
- GitHub: https://github.com/agentic-commerce-protocol/agentic-commerce-protocol
- Checkout Spec: https://developers.openai.com/commerce/specs/checkout/
- Payment Spec: https://developers.openai.com/commerce/specs/payment/
- Stripe Blog: https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce
- Stripe SPT Docs: https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens

### AP2 (Agent Payments Protocol)
- Official Spec: https://ap2-protocol.org/specification/
- Google Announcement: https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
- PayPal Blog: https://developer.paypal.com/community/blog/PayPal-Agent-Payments-Protocol/

### Comparisons
- Orium Analysis: https://orium.com/blog/agentic-payments-acp-ap2-x402
- Grid Dynamics: https://www.griddynamics.com/blog/agentic-payments
