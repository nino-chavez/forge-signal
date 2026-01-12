#!/usr/bin/env python3
"""
Remove all diagram IMG tags from complete-handoff.html
Replace with clear text descriptions of architecture and flows
"""

import re
from pathlib import Path

HANDOFF_DIR = Path(__file__).parent.parent / 'handoff'
SOURCE_HTML = HANDOFF_DIR / 'complete-handoff.html'

print(f"📖 Reading {SOURCE_HTML}...")
with open(SOURCE_HTML, 'r', encoding='utf-8') as f:
    html = f.read()

# Text descriptions to replace diagrams
replacements = {
    # System Context Diagram
    r'<img src="diagrams/01-system-context[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>System Context (C4 Level 1)</h4>
    <p><strong>Human Actors:</strong></p>
    <ul>
        <li><strong>Brand Manager</strong> → Queries system for insights</li>
        <li><strong>AEO Strategist</strong> → Configures 400 prompts in Profound, interprets SOV results</li>
        <li><strong>Content Strategist</strong> → Reviews AI recommendations, approves PIM updates</li>
    </ul>

    <p><strong>System Boundary (AEO Optimization System - AWS):</strong></p>
    <ul>
        <li>Ingests brand visibility data from Profound API (daily)</li>
        <li>Stores in OpenSearch vector database (semantic search)</li>
        <li>Analyzes gaps using Bedrock Agent (Claude 3 Sonnet)</li>
        <li>Generates optimization recommendations</li>
        <li>Measures Share of Voice lift (weekly)</li>
        <li>Exports to Infoverity PIM</li>
    </ul>

    <p><strong>External Systems:</strong></p>
    <ul>
        <li><strong>Profound API</strong> → Provides visibility audit data (400+ prompts, 7 LLM sources)</li>
        <li><strong>Infoverity PIM</strong> → Consumes optimized content (P360 + Prodevix workflow)</li>
        <li><strong>ESI Team</strong> → Integration layer (Profound → S3)</li>
    </ul>
</div>''',

    # Container Diagram
    r'<img src="diagrams/02-container-diagram[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>Container Diagram (C4 Level 2)</h4>
    <p><strong>API Layer:</strong></p>
    <ul>
        <li><strong>API Gateway</strong> → Public REST endpoint, authentication</li>
    </ul>

    <p><strong>Compute Layer:</strong></p>
    <ul>
        <li><strong>Request Handler Lambda</strong> (Python 3.11) → Request validation, routing to agent</li>
        <li><strong>Bedrock Agent</strong> (Claude 3 Sonnet) → Intent classification, tool orchestration</li>
        <li><strong>Query Tool Lambda</strong> → Search knowledge base via k-NN (OpenSearch)</li>
        <li><strong>Analyze Tool Lambda</strong> → Gap identification, recommendations</li>
        <li><strong>Measure Tool Lambda</strong> → SOV delta calculations</li>
    </ul>

    <p><strong>Data Layer:</strong></p>
    <ul>
        <li><strong>OpenSearch Cluster</strong> → Vector database (1024-dim embeddings), k-NN search</li>
        <li><strong>S3 Buckets</strong> → Raw data (profound-data/), Reports (aeo-reports/)</li>
    </ul>

    <p><strong>AI Services (AWS Bedrock):</strong></p>
    <ul>
        <li><strong>Titan Embeddings</strong> → Text vectorization</li>
        <li><strong>Claude 3 Sonnet</strong> → Response generation</li>
    </ul>
</div>''',

    # Data Ingestion Flow
    r'<img src="diagrams/03-data-ingestion-flow[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>Data Ingestion Flow (Daily, 2am UTC)</h4>
    <p><strong>Sequential Process:</strong></p>
    <ol>
        <li><strong>ESI Team</strong> → Delivers JSON to S3 bucket (profound-data/raw/) at 2am UTC daily</li>
        <li><strong>S3 Event Trigger</strong> → ObjectCreated event fires</li>
        <li><strong>Ingestion Lambda</strong> (512MB, <50ms) → Validates JSON schema
            <ul>
                <li>Success: Continue to step 4</li>
                <li>Failure: Send to Dead Letter Queue for manual review</li>
            </ul>
        </li>
        <li><strong>Bedrock Titan</strong> (<200ms) → Generates 1024-dim embeddings for text fields</li>
        <li><strong>OpenSearch</strong> (<100ms) → Indexes document with vector embeddings</li>
    </ol>
    <p><strong>Total Pipeline Latency:</strong> ~350ms per document</p>
</div>''',

    # Query Flow
    r'<img src="diagrams/04-query-flow[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>Query Flow (Agentic RAG - On-Demand)</h4>
    <p><strong>Request Path:</strong></p>
    <ol>
        <li><strong>User Query</strong> → Example: "Why is visibility dropping on gold chains?"</li>
        <li><strong>API Gateway</strong> → Authentication, rate limiting</li>
        <li><strong>Request Handler Lambda</strong> → Validates request format</li>
        <li><strong>Bedrock Agent (Decision Point)</strong> → Classifies intent using Claude 3 Sonnet
            <ul>
                <li><strong>Query Intent</strong> → Calls Query Tool (OpenSearch k-NN search)</li>
                <li><strong>Analyze Intent</strong> → Calls Analyze Tool (S3 reports analysis)</li>
                <li><strong>Measure Intent</strong> → Calls Measure Tool (SOV delta calculations)</li>
            </ul>
        </li>
        <li><strong>Tool Execution</strong> → Agent orchestrates 1-3 tool calls</li>
        <li><strong>Response Generation</strong> → Claude synthesizes results + citations</li>
    </ol>
    <p><strong>Total Query Latency:</strong> 2-4 seconds (depends on tools called)</p>
</div>''',

    # Measurement Flow
    r'<img src="diagrams/05-measurement-flow[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>Measurement Flow (Weekly, Sunday 2am UTC)</h4>
    <p><strong>Automated Weekly Process:</strong></p>
    <ol>
        <li><strong>EventBridge Schedule</strong> → Triggers every Sunday at 2am UTC</li>
        <li><strong>Distillation Lambda</strong> (4GB memory, 15min timeout) → Invoked</li>
        <li><strong>Historical Query (Parallel)</strong>:
            <ul>
                <li>Query OpenSearch for T0 data (Week -2)</li>
                <li>Query OpenSearch for T1 data (Week -1)</li>
            </ul>
        </li>
        <li><strong>Calculate Deltas</strong> → Per-query SOV changes (T1 - T0)</li>
        <li><strong>Generate Report</strong> → JSON summary with aggregate metrics</li>
        <li><strong>Write to S3</strong> → aeo-reports/weekly/YYYY-MM-DD.json</li>
    </ol>
    <p><strong>Output:</strong> Weekly SOV delta report (accessible via Analyze Tool)</p>
</div>''',

    # Deployment Architecture
    r'<img src="diagrams/06-deployment-architecture[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>Deployment Architecture (3 Environments)</h4>

    <p><strong>Development (Feature dev, unit tests):</strong></p>
    <ul>
        <li>OpenSearch: t3.small, Single-AZ</li>
        <li>Lambda: 512MB-1GB memory</li>
        <li>S3: 7-day retention</li>
        <li>Cost: ~$50/month</li>
    </ul>

    <p><strong>Staging (UAT, performance validation):</strong></p>
    <ul>
        <li>OpenSearch: t3.medium, Multi-AZ</li>
        <li>Lambda: 1-2GB memory</li>
        <li>S3: 30-day retention</li>
        <li>Cost: ~$200/month</li>
        <li>Promotion: Tests pass → Manual approval</li>
    </ul>

    <p><strong>Production (Live traffic, 99.5% uptime SLA):</strong></p>
    <ul>
        <li>OpenSearch: r6g.large, Multi-AZ + standby replica</li>
        <li>Lambda: 2-4GB memory, reserved concurrency</li>
        <li>S3: 90-day retention → Glacier</li>
        <li>Cost: ~$800/month</li>
        <li>Promotion: Manual approval from Lead Architect + Signet IT</li>
    </ul>
</div>''',

    # IAM Security
    r'<img src="diagrams/07-iam-security[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>IAM Security (Least Privilege)</h4>

    <table>
        <thead>
            <tr>
                <th>Service</th>
                <th>IAM Role</th>
                <th>Permissions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Ingestion Lambda</strong></td>
                <td>aeo-ingestion-role</td>
                <td>S3 (read), OpenSearch (write), Bedrock Titan (invoke)</td>
            </tr>
            <tr>
                <td><strong>Bedrock Agent</strong></td>
                <td>aeo-agent-role</td>
                <td>OpenSearch (read), Lambda (invoke tools), Bedrock Claude (invoke)</td>
            </tr>
            <tr>
                <td><strong>Tool Lambdas</strong></td>
                <td>aeo-tool-role</td>
                <td>OpenSearch (read), S3 (read reports)</td>
            </tr>
            <tr>
                <td><strong>Distillation Lambda</strong></td>
                <td>aeo-distill-role</td>
                <td>OpenSearch (read), S3 (write reports)</td>
            </tr>
        </tbody>
    </table>

    <p><strong>Security Principles:</strong></p>
    <ul>
        <li>No service has more permissions than needed</li>
        <li>All roles reviewed by Signet IT security team</li>
        <li>Policies use resource-level restrictions (specific S3 buckets, specific indexes)</li>
    </ul>
</div>''',

    # Stakeholder Integration
    r'<img src="diagrams/08-stakeholder-integration[^"]*\.svg"[^>]*>': '''
<div class="text-diagram">
    <h4>Stakeholder Integration Map</h4>

    <p><strong>Accenture Team (Delivery):</strong></p>
    <ul>
        <li><strong>Lead Architect</strong>
            <ul>
                <li>Responsibilities: AWS infrastructure, API specs, OpenSearch design</li>
                <li>Interfaces with: ESI Team (API specs), Infoverity (API specs), Signet IT (governance)</li>
            </ul>
        </li>
        <li><strong>AI Engineer</strong>
            <ul>
                <li>Responsibilities: Lambda development, Bedrock Agent configuration, prompt engineering</li>
                <li>Interfaces with: AEO Strategist (prompt requirements)</li>
            </ul>
        </li>
        <li><strong>DL/PM</strong>
            <ul>
                <li>Responsibilities: Project governance, risk management, stakeholder coordination</li>
                <li>Interfaces with: Signet IT (security reviews), All teams (status updates)</li>
            </ul>
        </li>
    </ul>

    <p><strong>Signet Teams (Client-Side):</strong></p>
    <ul>
        <li><strong>Signet IT</strong> → AWS account provisioning, security review approvals</li>
        <li><strong>ESI Team</strong> → Profound API integration, S3 data delivery</li>
        <li><strong>Infoverity</strong> → PIM API integration, P360 content updates</li>
    </ul>

    <p><strong>Critical Dependencies:</strong></p>
    <ul>
        <li>Week 1: AWS account access (Signet IT)</li>
        <li>Week 1: Profound API credentials (ESI Team)</li>
        <li>Week 2: PIM API spec (Infoverity)</li>
    </ul>
</div>'''
}

# Apply all replacements
for pattern, replacement in replacements.items():
    html = re.sub(pattern, replacement, html, flags=re.IGNORECASE)

# Remove diagram references from sidebar and text
html = re.sub(r'<a href="#diagram-inventory"[^>]*>Diagram Inventory</a>', '', html)
html = re.sub(r'<div class="nav-section-title">Architecture Diagrams Reference</div>', '', html, flags=re.IGNORECASE)

# Update references to diagrams folder
html = html.replace('See <a href="diagrams/README.html">diagrams/README.html</a>', 'All architecture and process flows are described using text and tables in this document')

# Add CSS for text diagrams
css_addition = '''
        .text-diagram {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
        }

        .text-diagram h4 {
            color: var(--accent-cyan);
            margin-bottom: 16px;
            font-size: 18px;
        }

        .text-diagram ul, .text-diagram ol {
            margin-left: 24px;
            margin-bottom: 16px;
        }

        .text-diagram li {
            margin-bottom: 8px;
            line-height: 1.6;
        }

        .text-diagram table {
            width: 100%;
            margin: 16px 0;
        }

        .text-diagram table th {
            background: var(--bg-tertiary);
            padding: 12px;
            text-align: left;
            border-bottom: 2px solid var(--border-color);
        }

        .text-diagram table td {
            padding: 12px;
            border-bottom: 1px solid var(--border-color);
        }
    </style>'''

html = html.replace('</style>', css_addition)

# Write updated HTML
with open(SOURCE_HTML, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✅ Removed all diagram IMG tags")
print(f"✅ Replaced with clear text descriptions")
print(f"✅ Added text-diagram CSS styling")
print(f"✅ Updated {SOURCE_HTML}")
