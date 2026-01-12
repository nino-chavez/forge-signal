# Level 1 Strategic Roadmap Template (Per-Platform)

## Purpose

This template defines the structure for **per-platform strategic roadmap** slides. Use this to present "How and When we deliver value" for a single platform (Commerce, PIM, OMS, Fraud, etc.) to executive stakeholders.

**Content Mode**: Executive Advisory
**Voice Guide**: `docs/executive-advisory-guide.md`

---

## Level 1 vs Level 2: Content Shift (Same Layout)

| Element | Level 2 Content | Level 1 Content |
|---------|-----------------|-----------------|
| **Timeline** | Implementation milestones, vendor onboarding, technical deliverables | Value delivery phases, capability releases, business outcomes |
| **Overview** | Technical solution description, architecture decisions | Strategic value proposition, business capabilities enabled |
| **Benefits** | Technical capabilities gained | Business outcomes, competitive advantages |
| **Risks** | Technical/integration risks | Strategic/business risks, market risks |
| **Dependencies** | System integrations, vendor contracts | Strategic decisions, organizational readiness |
| **Assumptions** | Technical assumptions (ARB, security) | Business assumptions (funding, priorities) |

---

## Slide Layout Structure

**This matches the reference screenshot layout exactly:**

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  [WIP]  PLATFORM NAME                                                          KEY │
│  One-line strategic description of the platform's role in the transformation       │
├────────────────────────────────────────┬────────────────────────────────────────────┤
│                                        │                                            │
│  STRATEGIC TIMELINE                    │  OVERVIEW & KEY CONSIDERATIONS             │
│  (Value Delivery Phases)               │                                            │
│                                        │  STRATEGIC VALUE                           │
│  ┌─────────────────────────────────┐   │  • [Value statement 1]                     │
│  │  Phase markers showing:         │   │  • [Value statement 2]                     │
│  │  - Value milestones            │   │                                            │
│  │  - Capability releases         │   │  POST-FOUNDATION RELEASES                  │
│  │  - Business outcomes           │   │  • [Future capability 1]                   │
│  │                                │   │  • [Future capability 2]                   │
│  │  (NOT: vendor onboarding,      │   │                                            │
│  │   technical deliverables)      │   │  BENEFITS                                  │
│  └─────────────────────────────────┘   │  • [Business benefit 1]                    │
│                                        │  • [Business benefit 2]                    │
│                                        │  • [Business benefit 3]                    │
│                                        │                                            │
│                                        │  RISKS                                     │
│                                        │  • [Strategic risk 1]                      │
│                                        │  • [Strategic risk 2]                      │
│                                        │                                            │
├────────────────────────────────────────┴────────────────────────────────────────────┤
│  KEY DEPENDENCIES        │  KEY ASSUMPTIONS           │  NEXT STEPS                 │
│                          │                            │                             │
│  • [Dependency 1]        │  • [Assumption 1]          │  1. [Action item]           │
│  • [Dependency 2]        │  • [Assumption 2]          │  2. [Action item]           │
│  • [Dependency 3]        │  • [Assumption 3]          │  3. [Action item]           │
│                          │                            │                             │
│  TEAMS INVOLVED          │                            │                             │
│  [Team 1], [Team 2]      │                            │                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  © [Year] [Company]. Confidential.                                         [LOGO]  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Section Content Guidelines

### 1. Header

**Level 2 (Avoid)**:
> Commerce Platform
> Platform providing commerce-specific functionality that enables Boutiques Retail to offer merchandise direct to consumer through SFCC frontend and backend components.

**Level 1 (Use)**:
> Commerce Platform
> Platform enabling [Client] to deliver unified digital commerce experiences that drive 2X revenue growth while reducing operational complexity.

**Key**: Include ownership legend (● Client ▲ SI ■ Third Party)

---

### 2. Strategic Timeline (Left Column)

**Level 2 Timeline Content (Avoid)**:
- Commerce Platform Selected
- MVE Functional Scope / Architecture Finalized
- Project Tools Provisioned
- Sandbox Environments Provisioned
- MVE Development Started
- DEV Environment & CI/CD Configured
- MVE Manufacturers Contracted

**Level 1 Timeline Content (Use)**:

```
PHASE 1: FOUNDATION (M0-M6)
├── Strategic Capability Defined
├── Core Value Proposition Validated
└── Foundation Release ◆

PHASE 2: SCALE (M6-M12)
├── Growth Capabilities Enabled
├── Integration Value Realized
└── Scale Release ◆

PHASE 3: OPTIMIZE (M12+)
├── Advanced Capabilities
├── Continuous Improvement
└── Optimization Release ◆
```

**Timeline Markers**:
- ◆ Release = Business value delivered
- ● Milestone = Capability enabled
- Use phase-based grouping, not task-based

---

### 3. Overview & Key Considerations (Right Column)

#### STRATEGIC VALUE (replaces "High Level Solution")

**Level 2 Content (Avoid)**:
> MVE Release —
> Establish core commerce functionality through native SFCC frontend and backend components, with expansion through integrations with key enterprise and 3rd party systems.

**Level 1 Content (Use)**:
> Foundation Release —
> Enable unified product discovery and purchase experience, reducing customer friction by 40% and establishing foundation for omni-channel growth.

> Scale Release —
> Unlock 2X transaction capacity with advanced personalization, supporting Gaming division growth targets without proportional infrastructure investment.

---

#### BENEFITS

**Level 2 Content (Avoid)**:
- Common platform that allows delivering unique experiences and assortment by brand
- Control of capabilities to drive and grow the business
- Enablement of agile product development to continuously enhance and improve

**Level 1 Content (Use)**:
- **Revenue enablement**: Support 2X Gaming growth without platform constraints
- **Operational efficiency**: Reduce manual order intervention by 60%
- **Speed to market**: Launch new experiences in weeks vs. months
- **Customer experience**: Unified journey across all touchpoints

---

#### RISKS

**Level 2 Content (Avoid)**:
- Alignment of commerce functions with broader enterprise roadmap (MGP)
- Alignment of 3rd Party and Enterprise integrations

**Level 1 Content (Use)**:
- **Strategic alignment**: Commerce priorities must align with enterprise digital strategy
- **Competitive timing**: Delayed launch risks market share to competitors investing in digital
- **Change adoption**: Organization readiness for new operating model

---

### 4. Bottom Section (Three Columns)

#### KEY DEPENDENCIES

**Level 2 Content (Avoid)**:
- MVE functional scope and strategic decisions
- Required 3rd party system integrations
- Required Enterprise system integrations
- Detailed functional requirements documentation
- Network and security configuration between systems

**Level 1 Content (Use)**:
- Strategic decisions on scope and phasing (Steering Committee)
- Funding approval for Phase 2 expansion
- Enterprise architecture alignment (CDO/CTO)
- Partner capacity and commitment confirmation
- Business process readiness for new capabilities

---

#### KEY ASSUMPTIONS

**Level 2 Content (Avoid)**:
- MVE will optimize implementing the commerce platform as standalone as possible
- Integrations to internal systems must be reviewed by ARB
- Product owner will own and facilitate intake process

**Level 1 Content (Use)**:
- Phase 1 scope is approved and funded
- Business stakeholders available for requirements validation
- No major organizational restructuring during implementation
- Enterprise priorities remain stable through Phase 2
- Partner delivery capacity aligned with timeline

---

#### NEXT STEPS

**Level 2 Content (Avoid)**:
1. Close out open strategic decisions
2. Socialize high-level MVE scope
3. Socialize high-level functional architecture
4. Engage GT teams for integration planning
5. Vendor contract and procurement
6. Project tools access/setup (Jira, Confluence)
7. Functional analysis and requirements documentation
8. Technical analysis and detailed technical design

**Level 1 Content (Use)**:
1. Validate strategic value proposition with business sponsors
2. Confirm Phase 1 scope and success criteria
3. Align on governance and decision-making model
4. Secure executive sponsorship and funding
5. Establish cross-functional steering committee
6. Define business outcome metrics and targets

---

## Platform-Specific Templates

### Commerce Platform (Level 1)

```
STRATEGIC VALUE
Foundation Release —
• Unified digital storefront enabling consistent brand experience
• Self-service purchase journey reducing call center volume 25%

Scale Release —
• Advanced product discovery driving 15% conversion improvement
• Dynamic bundling enabling Gaming accessory attach rate growth

BENEFITS
• Revenue: Enable 2X transaction growth without platform constraints
• Experience: Unified journey from discovery to post-purchase
• Efficiency: 60% reduction in manual order processing
• Agility: New promotion deployment in hours vs. weeks

RISKS
• Strategic: Platform decisions must align with enterprise commerce strategy
• Market: Competitor digital investments creating urgency
• Adoption: Business team readiness for self-service capabilities
```

---

### PIM Platform (Level 1)

```
STRATEGIC VALUE
Foundation Release —
• Single source of product truth enabling consistent experiences
• Automated enrichment reducing time-to-market by 40%

Scale Release —
• Syndication to all channels from unified repository
• AI-assisted content generation for long-tail products

BENEFITS
• Quality: Consistent product information across all touchpoints
• Speed: New product launch time reduced from weeks to days
• Scale: Support 10X SKU growth without proportional headcount
• Revenue: Rich content driving 12% conversion improvement

RISKS
• Data: Legacy product data quality requires remediation
• Process: Organizational change required for centralized model
• Integration: Downstream systems dependent on new data model
```

---

### OMS Platform (Level 1)

```
STRATEGIC VALUE
Foundation Release —
• Unified order visibility across all fulfillment channels
• Intelligent routing reducing split shipments 30%

Scale Release —
• Predictive inventory positioning reducing delivery time
• AI-optimized sourcing balancing cost, speed, and sustainability

BENEFITS
• Cost: Reduced split shipments saving $X annually
• Experience: Accurate delivery promises improving NPS
• Efficiency: Automated exception handling reducing manual intervention
• Sustainability: Optimized routing reducing carbon footprint

RISKS
• Complexity: Multi-node fulfillment requires process redesign
• Integration: Real-time inventory feeds from all sources required
• Change: Warehouse operations must adapt to new allocation logic
```

---

### Fraud Platform (Level 1)

```
STRATEGIC VALUE
Foundation Release —
• Automated risk scoring reducing manual review from 40% to <5%
• Real-time decisioning enabling instant order confirmation

Scale Release —
• Behavioral analytics identifying emerging fraud patterns
• Cross-channel risk assessment for omni-channel purchases

BENEFITS
• Revenue: Reduced false declines recovering $X in lost sales
• Cost: 90% reduction in manual review labor
• Experience: Instant order confirmation improving conversion
• Protection: Adaptive models responding to new fraud vectors

RISKS
• Balance: Over-aggressive rules impact legitimate sales
• Compliance: PCI and privacy requirements for data handling
• Dependency: Model performance depends on historical data quality
```

---

## Design Specifications

### Layout Proportions

| Section | Width/Height |
|---------|--------------|
| Left column (Timeline) | 45% of content width |
| Right column (Overview) | 55% of content width |
| Bottom section | Full width, ~25% of slide height |
| Each bottom column | Equal thirds |

### Typography

| Element | Size | Weight |
|---------|------|--------|
| Platform Title | 28pt | Bold |
| Platform Description | 12pt | Regular |
| Section Headers | 11pt | Bold, Uppercase |
| Body Text | 10pt | Regular |
| Bullet Points | 9pt | Regular |
| Footer | 8pt | Regular |

### Colors

| Element | Color |
|---------|-------|
| Section header background | `#7500C0` (Accenture Purple) |
| Section header text | White |
| Phase markers | Brand accent colors |
| Risk items | `#DC2626` accent |
| Benefit items | `#059669` accent |

---

## Checklist: Converting Level 2 → Level 1

- [ ] Replace technical milestones with value delivery phases
- [ ] Shift "High Level Solution" to business outcomes, not technical architecture
- [ ] Reframe benefits as business value, not technical capabilities
- [ ] Elevate risks from integration concerns to strategic/market risks
- [ ] Change dependencies from technical requirements to strategic decisions
- [ ] Update assumptions to business assumptions, not technical
- [ ] Ensure next steps focus on governance and alignment, not implementation tasks

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12-16 | Initial template matching reference screenshot layout |

