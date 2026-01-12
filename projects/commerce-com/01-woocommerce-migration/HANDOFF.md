# Migration Product - Session Handoff

## Quick Start

```bash
# Open in Cursor
cursor /Users/nino/Workspace/dev/apps/signal-forge/projects/woo-migration

# Open in Windsurf (Antigravity)
windsurf /Users/nino/Workspace/dev/apps/signal-forge/projects/woo-migration
```

---

## Context for New Agent

You are building a **WooCommerce → BigCommerce migration product** for BigCommerce. This is a real initiative with WPEngine partnership, not a hypothetical exercise.

### The Business Context

- **BigCommerce + WPEngine partnership** is real (already in talks with their CEO/CFO)
- **8,000 mid-market WooCommerce stores** at WPEngine are migration targets
- **3 customers + 3 agencies** already lined up as pilot testers
- **Goal:** Make migration dramatically easier than BigCommerce's current reputation suggests
- **Key constraint:** WordPress must stay intact - only the commerce engine changes

### The Technical Approach

```
BEFORE                              AFTER
WordPress + WooCommerce    →    WordPress + BC Bridge Plugin
     (all-in-one)                    ↓
                               BigCommerce API
                               (products, orders, checkout)
```

**NOT a replatform** - it's "swap the commerce engine while keeping WordPress."

---

## Key Documents

| Document | Purpose | Status |
|----------|---------|--------|
| `MIGRATION_ARCHITECTURE.md` | Technical architecture, data models, integration patterns | Complete (v0.2) |
| `ROADMAP_EARS.md` | EPICs, features, EARS requirements | Complete (v1.0) |
| `HANDOFF.md` | This file | Current |

### Architecture Highlights

1. **Assessment Engine** - Analyzes WC stores, produces readiness reports
2. **Data Migration Pipeline** - ETL from WC to BC (categories → products → customers)
3. **BC Bridge Plugin** - WordPress plugin that renders BC data, handles cart/checkout
4. **Validation Framework** - Automated + manual verification
5. **Operational Tooling** - Cutover checklists, rollback, monitoring

### Data Model Mapping

- WooCommerce stores products in `wp_posts` + `wp_postmeta` (EAV pattern)
- BigCommerce has proper product/variant/option models
- Customer passwords **cannot migrate** (hashed, non-transferable)
- Historical orders **stay in WordPress** (recommendation)

---

## What to Build First

**EPIC 1: Assessment Engine** - Standalone tool, immediate value, feeds everything else.

### Assessment Engine MVP Scope

```
INPUT:  WooCommerce store credentials (URL, consumer key, consumer secret)
OUTPUT: JSON/Markdown readiness report with:
        - Scale metrics (products, variants, customers, orders)
        - Complexity score (0-100)
        - Plugin compatibility analysis
        - Blockers and warnings
        - Estimated migration duration
```

### Key APIs

**WooCommerce REST API v3:**
- `GET /wp-json/wc/v3/products` - Products (check `X-WP-Total` header for count)
- `GET /wp-json/wc/v3/products/categories` - Categories
- `GET /wp-json/wc/v3/customers` - Customers
- `GET /wp-json/wc/v3/orders` - Orders
- `GET /wp-json/wp/v2/plugins` - Active plugins (requires admin perms)

**BigCommerce REST API:**
- `POST /catalog/products` - Create products (batch up to 10)
- `POST /catalog/categories` - Create categories
- `POST /customers` - Create customers (batch up to 10)
- Rate limit: 150 requests / 30 seconds

### Available Resources

- BigCommerce API docs: https://developer.bigcommerce.com/docs/api
- BigCommerce sandbox environment (user has access)
- WooCommerce REST API docs: https://woocommerce.github.io/woocommerce-rest-api-docs/

---

## Tech Stack Recommendations

| Component | Recommendation | Rationale |
|-----------|----------------|-----------|
| Language | TypeScript | Type safety for API contracts |
| Runtime | Node.js / Bun | Fast, good HTTP client support |
| HTTP Client | `fetch` or `got` | Built-in or lightweight |
| CLI Framework | `commander` or `citty` | Simple arg parsing |
| Output | JSON + Markdown | Machine + human readable |

### Suggested Project Structure

```
woo-migration/
├── src/
│   ├── assessment/
│   │   ├── index.ts           # Main assessment runner
│   │   ├── wc-client.ts       # WooCommerce API client
│   │   ├── collectors/
│   │   │   ├── scale.ts       # Product/customer counts
│   │   │   ├── complexity.ts  # Meta density, plugin analysis
│   │   │   └── seo.ts         # URL structure analysis
│   │   └── report.ts          # Report generation
│   ├── migration/
│   │   ├── index.ts           # Migration orchestrator
│   │   ├── bc-client.ts       # BigCommerce API client
│   │   ├── transformers/
│   │   │   ├── category.ts    # WC → BC category transform
│   │   │   ├── product.ts     # WC → BC product transform
│   │   │   └── customer.ts    # WC → BC customer transform
│   │   └── state.ts           # Migration state persistence
│   ├── validation/
│   │   └── ...
│   └── cli.ts                 # CLI entry point
├── package.json
├── tsconfig.json
└── docs/
    ├── MIGRATION_ARCHITECTURE.md
    └── ROADMAP_EARS.md
```

---

## Commands for New Session

### Starting Fresh in Cursor

```bash
cd /Users/nino/Workspace/dev/apps/signal-forge/projects/woo-migration
cursor .
```

Then tell the agent:
> "Read HANDOFF.md, MIGRATION_ARCHITECTURE.md, and ROADMAP_EARS.md to understand the project context. Then start building EPIC 1: Assessment Engine as a TypeScript CLI tool."

### Starting Fresh in Windsurf

```bash
cd /Users/nino/Workspace/dev/apps/signal-forge/projects/woo-migration
windsurf .
```

Same prompt as above.

### If You Want to Continue in Claude Code

```bash
cd /Users/nino/Workspace/dev/apps/signal-forge/projects/woo-migration
claude
```

Then:
> "Read the three .md files in this directory and continue building the migration product. Start with the Assessment Engine."

---

## Open Questions to Resolve

1. **Test WC store** - Do you have a WooCommerce store to test against? (staging/dev)
2. **BC sandbox credentials** - Store hash and access token for BigCommerce sandbox
3. **Monorepo vs standalone** - Keep in signal-forge or separate repo?
4. **Deployment target** - CLI tool? Web service? Both?

---

## Key Contacts

- **Nino** - Technical lead, AI-augmented building
- **Jordan Sim** - VP Product, Small Business/Mid-market (BigCommerce)
- **Ziggy** - Best engineer at WPEngine (Krakow), assigned to this
- **CFO/CEO** - Direct bi-weekly updates on both sides

---

*Last updated: December 2024*
*Source session: Claude Code (Opus 4.5)*
