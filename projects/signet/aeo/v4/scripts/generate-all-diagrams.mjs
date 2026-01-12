#!/usr/bin/env node
/**
 * Generate All 8 Professional Architecture Diagrams
 *
 * Uses Mermaid for simplicity - professional looking, easy to maintain
 * Converts to SVG using the existing Signal Forge export-deck workflow
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIAGRAMS_DIR = path.join(__dirname, '../handoff/diagrams');

/**
 * Diagram 1: System Context (C4)
 */
const systemContext = `
graph LR
    %% Title
    title[<b>AEO Optimization Service - System Context</b><br/>C4 Level 1]

    %% Actors
    BM[👤 Brand<br/>Manager]
    AEO[👤 AEO<br/>Strategist]
    CS[👤 Content<br/>Strategist]

    %% System
    SYS["<b>AEO Optimization System</b><br/>(AWS Infrastructure)<br/><br/>• Ingests brand visibility data<br/>• Analyzes gaps via semantic search<br/>• Generates recommendations<br/>• Measures Share of Voice lift"]

    %% External Systems
    PROFOUND[Profound API<br/><br/>400+ prompts<br/>7 LLM sources]
    PIM[Infoverity PIM<br/><br/>P360 + Prodevix<br/>workflow]

    %% Connections
    BM --> SYS
    AEO --> SYS
    CS --> SYS
    PROFOUND -.Daily data.-> SYS
    SYS -.Recommendations.-> PIM

    %% Styling
    classDef actor fill:#f3e8ff,stroke:#9333ea,stroke-width:3px
    classDef system fill:#dbeafe,stroke:#1e3a8a,stroke-width:4px
    classDef external fill:#fed7aa,stroke:#f97316,stroke-width:2px
    classDef output fill:#d1fae5,stroke:#10b981,stroke-width:2px

    class BM,AEO,CS actor
    class SYS system
    class PROFOUND external
    class PIM output
`;

/**
 * Diagram 2: Container Diagram (C4)
 */
const containerDiagram = `
graph LR
    subgraph API["<b>API Layer</b>"]
        GW[API Gateway<br/>①]
    end

    subgraph COMPUTE["<b>Compute Layer</b>"]
        REQ[Request Handler λ<br/>②]
        AGENT[Bedrock Agent<br/>Claude 3 Sonnet<br/>③]
        TOOLS[Tool Lambdas<br/>④]
    end

    subgraph DATA["<b>Data Layer</b>"]
        OS[OpenSearch<br/>Vector DB<br/>⑤]
        S3[S3 Buckets<br/>Raw + Reports]
    end

    subgraph AI["<b>AI Layer</b>"]
        TITAN[Bedrock Titan<br/>Embeddings]
        CLAUDE[Bedrock Claude<br/>Responses]
    end

    %% Flow
    GW -->|②| REQ
    REQ -->|③| AGENT
    AGENT -->|④| TOOLS
    TOOLS -->|⑤| OS
    TOOLS --> S3
    OS --> TITAN
    AGENT --> CLAUDE

    %% Styling
    classDef api fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    classDef compute fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    classDef data fill:#fed7aa,stroke:#f97316,stroke-width:2px
    classDef ai fill:#f3e8ff,stroke:#9333ea,stroke-width:2px

    class GW api
    class REQ,AGENT,TOOLS compute
    class OS,S3 data
    class TITAN,CLAUDE ai
`;

/**
 * Diagram 3: Data Ingestion Flow
 */
const ingestionFlow = `
graph LR
    ESI[① ESI Team<br/>delivers JSON<br/>to S3]
    EVENT[② S3 Event<br/>triggers]
    INGEST[③ Ingestion λ<br/>validates schema<br/>&lt;50ms]
    EMBED[④ Bedrock Titan<br/>embeds text<br/>&lt;200ms]
    INDEX[⑤ OpenSearch<br/>indexes doc<br/>&lt;100ms]

    ESI -->|Daily 2am UTC| EVENT
    EVENT --> INGEST
    INGEST --> EMBED
    EMBED --> INDEX

    INGEST -.Error.-> DLQ[Dead Letter Queue<br/>Manual review]

    %% Styling
    classDef flow fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef error fill:#fee2e2,stroke:#ef4444,stroke-width:2px,stroke-dasharray:5

    class ESI,EVENT,INGEST,EMBED,INDEX flow
    class DLQ error
`;

/**
 * Diagram 4: Query Flow (Agentic RAG)
 */
const queryFlow = `
graph TB
    USER[① User Query<br/>'Why is visibility dropping<br/>on gold chains?']
    GW[② API Gateway]
    REQ[③ Request Handler]
    AGENT{④ Bedrock Agent<br/>Intent Classification}

    QUERY[Query Tool<br/>OpenSearch k-NN]
    ANALYZE[Analyze Tool<br/>S3 Reports]
    MEASURE[Measure Tool<br/>Calculations]

    RESP[⑥ Response<br/>+ Citations]

    USER --> GW
    GW --> REQ
    REQ --> AGENT

    AGENT -->|"Query intent"| QUERY
    AGENT -->|"Analyze intent"| ANALYZE
    AGENT -->|"Measure intent"| MEASURE

    QUERY --> RESP
    ANALYZE --> RESP
    MEASURE --> RESP

    %% Styling
    classDef flow fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef decision fill:#fef3c7,stroke:#f59e0b,stroke-width:3px
    classDef tool fill:#d1fae5,stroke:#10b981,stroke-width:2px

    class USER,GW,REQ,RESP flow
    class AGENT decision
    class QUERY,ANALYZE,MEASURE tool
`;

/**
 * Diagram 5: Measurement Flow
 */
const measurementFlow = `
graph TB
    SCHED[📅 EventBridge<br/>Sunday 2am UTC]
    LAMBDA[① Distillation λ<br/>4GB, 15min timeout]

    T0[② Query T0<br/>Week -2]
    T1[② Query T1<br/>Week -1]

    CALC[③ Calculate Δ SOV<br/>per-query deltas]
    REPORT[④ Generate Report<br/>JSON summary]
    S3[⑤ Write to S3<br/>aeo-reports/weekly/]

    SCHED -->|Trigger| LAMBDA
    LAMBDA --> T0
    LAMBDA --> T1
    T0 --> CALC
    T1 --> CALC
    CALC --> REPORT
    REPORT --> S3

    %% Styling
    classDef schedule fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    classDef flow fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef storage fill:#fed7aa,stroke:#f97316,stroke-width:2px

    class SCHED schedule
    class LAMBDA,T0,T1,CALC,REPORT flow
    class S3 storage
`;

/**
 * Diagram 6: Deployment Architecture
 */
const deploymentArch = `
graph LR
    subgraph DEV["<b>Development</b><br/>Feature dev, unit tests"]
        DEV_OS[OpenSearch<br/>t3.small<br/>Single-AZ]
        DEV_LAMBDA[Lambda<br/>512MB-1GB]
        DEV_S3[S3<br/>7d retention]
    end

    subgraph STAGING["<b>Staging</b><br/>UAT, performance validation"]
        STAGE_OS[OpenSearch<br/>t3.medium<br/>Multi-AZ]
        STAGE_LAMBDA[Lambda<br/>1-2GB]
        STAGE_S3[S3<br/>30d retention]
    end

    subgraph PROD["<b>Production</b><br/>Live traffic, 99.5% uptime"]
        PROD_OS[OpenSearch<br/>r6g.large<br/>Multi-AZ + standby]
        PROD_LAMBDA[Lambda<br/>2-4GB reserved]
        PROD_S3[S3<br/>90d → Glacier]
    end

    DEV -->|Tests pass| STAGING
    STAGING -->|Manual approval| PROD

    %% Styling
    classDef dev fill:#e0f2fe,stroke:#0ea5e9,stroke-width:2px
    classDef staging fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    classDef prod fill:#d1fae5,stroke:#10b981,stroke-width:3px

    class DEV_OS,DEV_LAMBDA,DEV_S3 dev
    class STAGE_OS,STAGE_LAMBDA,STAGE_S3 staging
    class PROD_OS,PROD_LAMBDA,PROD_S3 prod
`;

/**
 * Diagram 7: IAM Security (simplified table representation)
 */
const iamSecurity = `
graph TB
    subgraph SERVICES["<b>Services</b>"]
        ING[Ingestion λ]
        AGENT[Bedrock Agent]
        TOOL[Tool Lambdas]
        DIST[Distillation λ]
    end

    subgraph ROLES["<b>IAM Roles</b><br/>(Least Privilege)"]
        R1[aeo-ingestion-role]
        R2[aeo-agent-role]
        R3[aeo-tool-role]
        R4[aeo-distill-role]
    end

    subgraph PERMS["<b>Permissions</b>"]
        P1[S3, OpenSearch<br/>Bedrock Titan]
        P2[OpenSearch, Lambda<br/>Bedrock Claude]
        P3[OpenSearch<br/>S3 read]
        P4[OpenSearch read<br/>S3 write]
    end

    ING --> R1 --> P1
    AGENT --> R2 --> P2
    TOOL --> R3 --> P3
    DIST --> R4 --> P4

    %% Styling
    classDef service fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef role fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    classDef perm fill:#d1fae5,stroke:#10b981,stroke-width:2px

    class ING,AGENT,TOOL,DIST service
    class R1,R2,R3,R4 role
    class P1,P2,P3,P4 perm
`;

/**
 * Diagram 8: Stakeholder Integration
 */
const stakeholderIntegration = `
graph LR
    subgraph ACC["<b>Accenture Team</b>"]
        LA[Lead Architect<br/>• AWS Infrastructure<br/>• API specs<br/>• OpenSearch]
        AI[AI Engineer<br/>• Lambda dev<br/>• Bedrock Agent<br/>• Prompt engineering]
        PM[DL/PM<br/>• Governance<br/>• Risk mgmt<br/>• Coordination]
    end

    subgraph SIG["<b>Signet Teams</b>"]
        IT[Signet IT<br/>• AWS provision<br/>• Security review]
        ESI[ESI Team<br/>• Profound integration<br/>• S3 delivery]
        INFO[Infoverity<br/>• PIM API integration<br/>• P360 updates]
    end

    LA -.API Specs.-> ESI
    LA -.API Specs.-> INFO
    PM -.Governance.-> IT

    %% Styling
    classDef accenture fill:#e0e7ff,stroke:#6366f1,stroke-width:3px
    classDef signet fill:#fef3c7,stroke:#f59e0b,stroke-width:3px

    class LA,AI,PM accenture
    class IT,ESI,INFO signet
`;

/**
 * Convert Mermaid to SVG using d2 as fallback
 * (Mermaid is simpler for these diagrams)
 */
function mermaidToSvg(mermaidCode, name) {
  const tempMermaid = `/tmp/${name}.mmd`;
  const outputSvg = path.join(DIAGRAMS_DIR, `${name}.svg`);

  writeFileSync(tempMermaid, mermaidCode);

  try {
    // Use mermaid-cli if available
    execSync(
      `npx -y @mermaid-js/mermaid-cli mmdc -i "${tempMermaid}" -o "${outputSvg}" -t neutral -b transparent`,
      { stdio: 'pipe', timeout: 30000 }
    );
    return true;
  } catch (error) {
    console.error(`   ⚠️  Mermaid failed, trying D2 fallback...`);
    // Fallback: save as .mmd file for manual conversion
    const fallbackPath = path.join(DIAGRAMS_DIR, `${name}.mmd`);
    writeFileSync(fallbackPath, mermaidCode);
    console.log(`   📝 Saved ${name}.mmd for manual conversion`);
    return false;
  }
}

/**
 * Generate all diagrams
 */
async function main() {
  console.log('🎨 Generating all 8 professional architecture diagrams...\n');

  const diagrams = [
    { name: '01-system-context', code: systemContext, title: 'System Context (C4 Level 1)' },
    { name: '02-container-diagram', code: containerDiagram, title: 'Container Diagram (C4 Level 2)' },
    { name: '03-data-ingestion-flow', code: ingestionFlow, title: 'Data Ingestion Flow' },
    { name: '04-query-flow', code: queryFlow, title: 'Query Flow (Agentic RAG)' },
    { name: '05-measurement-flow', code: measurementFlow, title: 'Measurement Flow' },
    { name: '06-deployment-architecture', code: deploymentArch, title: 'Deployment Architecture' },
    { name: '07-iam-security', code: iamSecurity, title: 'IAM Security' },
    { name: '08-stakeholder-integration', code: stakeholderIntegration, title: 'Stakeholder Integration' }
  ];

  let successCount = 0;

  for (const diagram of diagrams) {
    console.log(`📊 ${diagram.title}`);
    const success = mermaidToSvg(diagram.code, diagram.name);
    if (success) {
      console.log(`   ✓ Generated ${diagram.name}.svg`);
      successCount++;
    }
    console.log('');
  }

  console.log(`\n✅ Generated ${successCount}/${diagrams.length} diagrams successfully`);

  if (successCount < diagrams.length) {
    console.log('\n⚠️  Some diagrams failed to generate.');
    console.log('   Fallback: .mmd files saved to diagrams/ folder');
    console.log('   You can convert them manually or use D2 instead.');
  }

  console.log(`\n📁 Files saved to: ${DIAGRAMS_DIR}`);
}

main().catch(console.error);
