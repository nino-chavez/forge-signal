# Appendix A: Technology Reference Architectures

This appendix provides concrete implementation patterns for building GEO systems on major cloud platforms. Unlike the platform-agnostic guidance in the main playbook, these reference architectures use specific product names and service configurations to accelerate implementation planning.

Each pattern includes architecture diagrams, component mappings, configuration guidance, and cost estimation frameworks. Use these as starting points for technical design, adapting them to your organization's specific requirements and existing technology investments.

---

## A.1 AWS Pattern

### Architecture Overview

The AWS pattern leverages managed AI services (Amazon Bedrock) combined with serverless compute and vector search capabilities. This pattern minimizes operational overhead while providing enterprise-grade scalability and security.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          API LAYER                                   │
│  ┌────────────────┐           ┌──────────────────┐                  │
│  │  Amazon API    │◄──────────│  AWS WAF         │                  │
│  │  Gateway       │           │  (DDoS/Rate      │                  │
│  │  (REST/HTTP)   │           │   Limiting)      │                  │
│  └────────┬───────┘           └──────────────────┘                  │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       AGENT LAYER                                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Amazon Bedrock Agents                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │   │
│  │  │  Agent      │  │ Action       │  │  Knowledge Base    │  │   │
│  │  │  Runtime    │◄─│ Groups       │◄─│  Integration       │  │   │
│  │  │  (Claude,   │  │              │  │                    │  │   │
│  │  │   Titan)    │  │              │  │                    │  │   │
│  │  └─────────────┘  └──────────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────┬──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     KNOWLEDGE & INDEXING                             │
│  ┌────────────────────┐        ┌─────────────────────────┐          │
│  │  Amazon OpenSearch │◄───────│  Titan Embeddings       │          │
│  │  Serverless        │        │  (amazon.titan-embed-   │          │
│  │  (Vector Search)   │        │   text-v2)              │          │
│  │                    │        │                         │          │
│  │  • k-NN plugin     │        │  • 8192 token context   │          │
│  │  • Hybrid search   │        │  • 1024 dimensions      │          │
│  └────────┬───────────┘        └─────────────────────────┘          │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA PROCESSING                                │
│  ┌─────────────────┐      ┌─────────────────┐                       │
│  │  AWS Lambda     │◄─────│  EventBridge    │                       │
│  │  (Ingest/       │      │  (Scheduling)   │                       │
│  │   Transform)    │      │                 │                       │
│  └────────┬────────┘      └─────────────────┘                       │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        STORAGE LAYER                                 │
│  ┌─────────────────┐      ┌─────────────────┐                       │
│  │  Amazon S3      │      │  DynamoDB       │                       │
│  │  (Raw/Processed │      │  (Metadata/     │                       │
│  │   Documents)    │      │   Cache)        │                       │
│  └─────────────────┘      └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Mapping

| Generic Layer | AWS Service | Purpose | Configuration Notes |
|--------------|-------------|---------|-------------------|
| Agent Runtime | Amazon Bedrock Agents | Orchestrate reasoning and tool use | Claude 3.5 Sonnet or Titan Premier recommended |
| LLM Provider | Amazon Bedrock | Access foundation models | Multi-model support for fallback |
| Vector Database | Amazon OpenSearch Serverless | Semantic search and hybrid ranking | k-NN with nmslib or faiss engine |
| Embeddings | Titan Embeddings v2 | Generate vector representations | 1024-dim, supports up to 8192 tokens |
| Compute | AWS Lambda | Serverless data processing | 10GB memory, 15min timeout for batch |
| Object Storage | Amazon S3 | Raw documents and artifacts | Intelligent-Tiering for cost optimization |
| Metadata Store | Amazon DynamoDB | Query cache and session state | On-demand or provisioned based on load |
| API Gateway | Amazon API Gateway | RESTful API exposure | HTTP API for lower latency/cost |
| Orchestration | AWS Step Functions | Multi-step workflows | Express workflows for high-throughput |
| Monitoring | Amazon CloudWatch | Logs, metrics, alarms | Custom metrics for citation tracking |

### Bedrock Agent Configuration

#### Agent Definition

```json
{
  "agentName": "geo-product-advisor",
  "agentResourceRoleArn": "arn:aws:iam::ACCOUNT:role/BedrockAgentRole",
  "foundationModel": "anthropic.claude-3-5-sonnet-20241022-v2:0",
  "instruction": "You are a product discovery assistant specializing in [CATEGORY]. Your role is to help users find products that match their needs by understanding context, preferences, and use cases. Always cite specific products with their unique identifiers and provide rationale for recommendations.",
  "idleSessionTTLInSeconds": 600,
  "promptOverrideConfiguration": {
    "promptConfigurations": [
      {
        "promptType": "PRE_PROCESSING",
        "inferenceConfiguration": {
          "temperature": 0.3,
          "topP": 0.9,
          "maxTokens": 2048
        },
        "promptCreationMode": "OVERRIDDEN",
        "promptState": "ENABLED"
      }
    ]
  }
}
```

#### Knowledge Base Integration

```json
{
  "knowledgeBaseName": "product-catalog-kb",
  "description": "Product catalog with specifications, reviews, and usage guides",
  "roleArn": "arn:aws:iam::ACCOUNT:role/BedrockKBRole",
  "knowledgeBaseConfiguration": {
    "type": "VECTOR",
    "vectorKnowledgeBaseConfiguration": {
      "embeddingModelArn": "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v2:0"
    }
  },
  "storageConfiguration": {
    "type": "OPENSEARCH_SERVERLESS",
    "opensearchServerlessConfiguration": {
      "collectionArn": "arn:aws:aoss:REGION:ACCOUNT:collection/ID",
      "vectorIndexName": "product-vectors",
      "fieldMapping": {
        "vectorField": "embedding",
        "textField": "content",
        "metadataField": "metadata"
      }
    }
  }
}
```

#### Action Groups

```json
{
  "actionGroups": [
    {
      "actionGroupName": "product-search",
      "description": "Search products by attributes and filters",
      "actionGroupExecutor": {
        "lambda": "arn:aws:lambda:REGION:ACCOUNT:function:product-search"
      },
      "apiSchema": {
        "payload": "{\"openapi\":\"3.0.0\",\"info\":{\"title\":\"Product Search API\",\"version\":\"1.0.0\"},\"paths\":{\"/search\":{\"post\":{\"summary\":\"Search products\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\",\"properties\":{\"query\":{\"type\":\"string\"},\"filters\":{\"type\":\"object\"},\"limit\":{\"type\":\"integer\"}}}}}},\"responses\":{\"200\":{\"description\":\"Search results\"}}}}}}"
      }
    },
    {
      "actionGroupName": "inventory-check",
      "description": "Check real-time product availability",
      "actionGroupExecutor": {
        "lambda": "arn:aws:lambda:REGION:ACCOUNT:function:inventory-check"
      }
    }
  ]
}
```

### Titan Embeddings Setup

#### Model Selection

| Model | Dimensions | Max Tokens | Use Case | Cost per 1M Tokens |
|-------|-----------|------------|----------|-------------------|
| amazon.titan-embed-text-v2:0 | 1024 | 8192 | General purpose, recommended for most GEO use cases | $0.10 input |
| amazon.titan-embed-text-v1 | 1536 | 512 | Legacy support | $0.10 input |
| amazon.titan-embed-image-v1 | 1024 | N/A | Image search (product photos) | $0.60 per 1K images |

#### Embedding Lambda Function

```python
import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

def generate_embedding(text: str, model_id: str = "amazon.titan-embed-text-v2:0") -> list:
    """
    Generate embeddings using Titan Embeddings v2.

    Args:
        text: Input text to embed (max 8192 tokens)
        model_id: Bedrock model identifier

    Returns:
        List of floats representing the embedding vector
    """
    request_body = {
        "inputText": text,
        "dimensions": 1024,
        "normalize": True  # Recommended for cosine similarity
    }

    response = bedrock_runtime.invoke_model(
        modelId=model_id,
        body=json.dumps(request_body)
    )

    response_body = json.loads(response['body'].read())
    return response_body['embedding']

def batch_embed(texts: list, batch_size: int = 25) -> list:
    """
    Process multiple texts in batches to optimize throughput.
    Titan Embeddings supports up to 25 concurrent requests.
    """
    embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        batch_embeddings = [generate_embedding(text) for text in batch]
        embeddings.extend(batch_embeddings)
    return embeddings
```

### OpenSearch Serverless Configuration

#### Collection Setup

```bash
# Create encryption policy
aws opensearchserverless create-security-policy \
  --name geo-encryption-policy \
  --type encryption \
  --policy '{
    "Rules": [
      {
        "ResourceType": "collection",
        "Resource": ["collection/product-catalog"]
      }
    ],
    "AWSOwnedKey": true
  }'

# Create network policy
aws opensearchserverless create-security-policy \
  --name geo-network-policy \
  --type network \
  --policy '[{
    "Rules": [
      {
        "ResourceType": "collection",
        "Resource": ["collection/product-catalog"]
      }
    ],
    "AllowFromPublic": false,
    "SourceVPCEs": ["vpce-xxxxxxxxx"]
  }]'

# Create collection
aws opensearchserverless create-collection \
  --name product-catalog \
  --type VECTORSEARCH \
  --description "Product catalog for GEO system"
```

#### Index Mapping

```json
{
  "settings": {
    "index": {
      "knn": true,
      "knn.algo_param.ef_search": 512
    }
  },
  "mappings": {
    "properties": {
      "embedding": {
        "type": "knn_vector",
        "dimension": 1024,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib",
          "parameters": {
            "ef_construction": 512,
            "m": 16
          }
        }
      },
      "content": {
        "type": "text",
        "analyzer": "standard"
      },
      "metadata": {
        "properties": {
          "product_id": { "type": "keyword" },
          "category": { "type": "keyword" },
          "brand": { "type": "keyword" },
          "timestamp": { "type": "date" }
        }
      }
    }
  }
}
```

#### Hybrid Search Query

```json
{
  "query": {
    "hybrid": {
      "queries": [
        {
          "knn": {
            "embedding": {
              "vector": [0.123, 0.456, ...],
              "k": 20
            }
          }
        },
        {
          "multi_match": {
            "query": "running shoes marathon",
            "fields": ["content", "metadata.category"],
            "type": "best_fields"
          }
        }
      ]
    }
  },
  "size": 10,
  "_source": ["content", "metadata"]
}
```

### Cost Estimation Guidance

#### Monthly Cost Calculator

Use this framework to estimate AWS costs for GEO implementation:

**Bedrock Model Usage**
- Agent invocations: [X] requests/month × Average tokens per request
- Claude 3.5 Sonnet: $3.00 per 1M input tokens, $15.00 per 1M output tokens
- Typical GEO query: 2000 input tokens, 500 output tokens
- Estimated: `(X × 2000 × $3.00/1M) + (X × 500 × $15.00/1M)`

**Titan Embeddings**
- Documents to embed: [Y] documents × Avg 500 tokens/document
- Cost: $0.10 per 1M tokens
- Estimated: `(Y × 500 × $0.10/1M)`

**OpenSearch Serverless**
- OCU (OpenSearch Compute Units): 2 OCU minimum
- Cost: $0.24 per OCU-hour
- Monthly baseline: `2 × 730 hours × $0.24 = $350.40`
- Indexing OCU (burst): Add 50% during initial load

**Lambda**
- Invocations: [Z] requests/month
- Duration: Avg 2 seconds @ 2GB memory
- Cost: $0.0000166667 per GB-second
- Estimated: `Z × 2 × 2 × $0.0000166667`

**S3 Storage**
- Standard storage: [A] GB
- Cost: $0.023 per GB/month
- Estimated: `A × $0.023`

**Data Transfer**
- Outbound: [B] GB/month
- Cost: $0.09 per GB (after 100GB free tier)
- Estimated: `(B - 100) × $0.09` (if B > 100)

#### Sample Cost Scenarios

**Pilot Deployment (10K queries/month)**
- Bedrock (Claude 3.5): $75
- Titan Embeddings (1M tokens): $0.10
- OpenSearch Serverless: $350
- Lambda: $5
- S3 (100GB): $2.30
- **Total: ~$432/month**

**Production Deployment (100K queries/month)**
- Bedrock (Claude 3.5): $750
- Titan Embeddings (10M tokens): $1.00
- OpenSearch Serverless (4 OCU): $700
- Lambda: $50
- S3 (500GB): $11.50
- **Total: ~$1,512/month**

**Enterprise Deployment (1M queries/month)**
- Bedrock (Claude 3.5): $7,500
- Titan Embeddings (100M tokens): $10
- OpenSearch Serverless (8 OCU): $1,400
- Lambda: $500
- S3 (2TB): $46
- CloudWatch/Other: $200
- **Total: ~$9,656/month**

### Bill of Materials Template

| Component | SKU/Service | Quantity | Unit | Monthly Cost | Annual Cost | Notes |
|-----------|-------------|----------|------|--------------|-------------|-------|
| Bedrock - Claude 3.5 Sonnet | Input tokens | [X]M | tokens | $[X×3] | $[X×36] | Production workload |
| Bedrock - Claude 3.5 Sonnet | Output tokens | [Y]M | tokens | $[Y×15] | $[Y×180] | Average response length |
| Titan Embeddings v2 | Input tokens | [Z]M | tokens | $[Z×0.1] | $[Z×1.2] | Initial + incremental indexing |
| OpenSearch Serverless | OCU | [N] | OCU-hours | $[N×175.2] | $[N×2,102] | 730 hrs/month × $0.24 |
| Lambda - Data Processing | GB-seconds | [A] | GB-sec | $[A×0.0000167] | - | Burst compute |
| S3 Standard | Storage | [B] | GB | $[B×0.023] | $[B×0.276] | Raw + processed docs |
| DynamoDB | On-demand | - | - | Est. $50 | Est. $600 | Cache layer |
| API Gateway | HTTP requests | [C]M | requests | $[C×1] | $[C×12] | $1 per million |
| CloudWatch | Logs/Metrics | - | GB | Est. $25 | Est. $300 | 10GB logs/month |
| Data Transfer | Outbound | [D] | GB | $[D×0.09] | $[D×1.08] | After 100GB free |
| **Subtotal** | | | | **$[SUM]** | **$[SUM×12]** | |
| Support (10%) | | | | **$[SUM×0.1]** | **$[SUM×1.2]** | Optional support tier |
| **Total** | | | | **$[TOTAL]** | **$[TOTAL×12]** | |

---

## A.2 Google Cloud Pattern

### Architecture Overview

The Google Cloud pattern leverages Vertex AI for both embeddings and agent capabilities, with tight integration to Google's search infrastructure through Vertex AI Search.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          API LAYER                                   │
│  ┌────────────────┐           ┌──────────────────┐                  │
│  │  Cloud API     │◄──────────│  Cloud Armor     │                  │
│  │  Gateway       │           │  (WAF/DDoS)      │                  │
│  └────────┬───────┘           └──────────────────┘                  │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       AGENT LAYER                                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Vertex AI Agent Builder                                     │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │   │
│  │  │  Gemini     │  │ Reasoning    │  │  Extensions        │  │   │
│  │  │  1.5 Pro/   │◄─│ Engine       │◄─│  (Tools/Actions)   │  │   │
│  │  │  Flash      │  │              │  │                    │  │   │
│  │  └─────────────┘  └──────────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────┬──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  SEARCH & KNOWLEDGE LAYER                            │
│  ┌────────────────────┐        ┌─────────────────────────┐          │
│  │  Vertex AI Search  │◄───────│  Vertex AI Embeddings   │          │
│  │  (GenAI App        │        │  (text-embedding-004 or │          │
│  │   Builder)         │        │   textembedding-gecko)  │          │
│  │                    │        │                         │          │
│  │  • Semantic search │        │  • 768 dimensions       │          │
│  │  • Ranking         │        │  • Multilingual         │          │
│  │  • Grounding       │        │                         │          │
│  └────────┬───────────┘        └─────────────────────────┘          │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA PROCESSING                                │
│  ┌─────────────────┐      ┌─────────────────┐                       │
│  │  Cloud          │◄─────│  Cloud Scheduler│                       │
│  │  Functions      │      │  / Pub/Sub      │                       │
│  │  (2nd gen)      │      │                 │                       │
│  └────────┬────────┘      └─────────────────┘                       │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        STORAGE LAYER                                 │
│  ┌─────────────────┐      ┌─────────────────┐                       │
│  │  Cloud Storage  │      │  Firestore      │                       │
│  │  (Documents/    │      │  (Metadata/     │                       │
│  │   Artifacts)    │      │   Cache)        │                       │
│  └─────────────────┘      └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Mapping

| Generic Layer | Google Cloud Service | Purpose | Configuration Notes |
|--------------|---------------------|---------|-------------------|
| Agent Runtime | Vertex AI Agent Builder | Orchestrate multi-turn conversations | Gemini 1.5 Pro for complex reasoning |
| LLM Provider | Vertex AI (Gemini) | Foundation model access | Pro vs Flash based on latency needs |
| Vector Database | Vertex AI Search | Semantic search with Google quality | Unstructured data store type |
| Embeddings | Vertex AI Embeddings API | Generate vector representations | text-embedding-004 recommended |
| Compute | Cloud Functions (2nd gen) | Serverless data processing | 16GB memory, 60min timeout |
| Object Storage | Cloud Storage | Raw documents and artifacts | Standard or Nearline based on access |
| Metadata Store | Firestore | Query cache and session state | Native mode for scalability |
| API Gateway | Cloud API Gateway | RESTful API exposure | gRPC support for high performance |
| Orchestration | Cloud Workflows | Multi-step business logic | YAML-based workflow definition |
| Monitoring | Cloud Monitoring/Logging | Observability stack | Custom dashboards for GEO metrics |

### Vertex AI Agent Configuration

#### Agent Creation

```python
from google.cloud import aiplatform
from vertexai.preview import reasoning_engines

# Initialize Vertex AI
aiplatform.init(
    project="your-project-id",
    location="us-central1"
)

# Define agent with tools
agent_config = {
    "display_name": "geo-product-advisor",
    "model_name": "gemini-1.5-pro-002",
    "system_instruction": """You are a product discovery assistant specializing in [CATEGORY].
    Your role is to help users find products that match their needs by understanding context,
    preferences, and use cases. Always cite specific products with their identifiers and
    provide rationale for recommendations. Use the available tools to search inventory,
    check availability, and retrieve detailed product specifications.""",
    "tools": [
        {
            "function_declarations": [
                {
                    "name": "search_products",
                    "description": "Search product catalog by attributes and filters",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "Natural language search query"
                            },
                            "filters": {
                                "type": "object",
                                "description": "Attribute filters (category, price range, etc.)"
                            },
                            "limit": {
                                "type": "integer",
                                "description": "Maximum results to return",
                                "default": 10
                            }
                        },
                        "required": ["query"]
                    }
                },
                {
                    "name": "check_inventory",
                    "description": "Check real-time product availability",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "product_id": {
                                "type": "string",
                                "description": "Unique product identifier"
                            },
                            "location": {
                                "type": "string",
                                "description": "Store or region code"
                            }
                        },
                        "required": ["product_id"]
                    }
                }
            ]
        }
    ],
    "generation_config": {
        "temperature": 0.3,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 2048
    }
}

# Create reasoning engine instance
agent = reasoning_engines.LangchainAgent(
    model=agent_config["model_name"],
    tools=agent_config["tools"],
    agent_executor_kwargs={
        "return_intermediate_steps": True,
        "max_iterations": 5
    }
)
```

#### Vertex AI Search Datastore

```python
from google.cloud import discoveryengine_v1 as discoveryengine

# Create a client
client = discoveryengine.DataStoreServiceClient()

# Define datastore
datastore = discoveryengine.DataStore(
    display_name="product-catalog",
    industry_vertical=discoveryengine.IndustryVertical.GENERIC,
    solution_types=[discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH],
    content_config=discoveryengine.DataStore.ContentConfig.CONTENT_REQUIRED,
)

# Create datastore
parent = f"projects/{project_id}/locations/global/collections/default_collection"
operation = client.create_data_store(
    parent=parent,
    data_store=datastore,
    data_store_id="product-catalog-store"
)

# Wait for operation to complete
response = operation.result()
```

### Embeddings Setup

#### Vertex AI Embeddings API

```python
from vertexai.language_models import TextEmbeddingModel

def generate_embeddings(
    texts: list,
    model_name: str = "text-embedding-004",
    task_type: str = "RETRIEVAL_DOCUMENT",
    output_dimensionality: int = 768
) -> list:
    """
    Generate embeddings using Vertex AI Embeddings API.

    Args:
        texts: List of text strings to embed (max 250 per batch)
        model_name: Embedding model (text-embedding-004 recommended)
        task_type: RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, SEMANTIC_SIMILARITY, etc.
        output_dimensionality: 256 or 768 (768 recommended for quality)

    Returns:
        List of embedding vectors
    """
    model = TextEmbeddingModel.from_pretrained(model_name)

    # Process in batches of 250
    batch_size = 250
    all_embeddings = []

    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        embeddings = model.get_embeddings(
            batch,
            task_type=task_type,
            output_dimensionality=output_dimensionality
        )
        all_embeddings.extend([emb.values for emb in embeddings])

    return all_embeddings

# Usage example
document_texts = [
    "Product description for item 1...",
    "Product description for item 2..."
]

doc_embeddings = generate_embeddings(
    document_texts,
    task_type="RETRIEVAL_DOCUMENT"
)

query_text = ["running shoes for marathon training"]
query_embedding = generate_embeddings(
    query_text,
    task_type="RETRIEVAL_QUERY"
)[0]
```

#### Embedding Model Comparison

| Model | Dimensions | Task Types | Use Case | Cost per 1K chars |
|-------|-----------|------------|----------|------------------|
| text-embedding-004 | 256 or 768 | All task types | Recommended for new implementations | $0.00002 |
| textembedding-gecko@003 | 768 | All task types | Legacy support | $0.00002 |
| textembedding-gecko-multilingual@001 | 768 | 100+ languages | International catalogs | $0.00002 |

### Vertex AI Search Configuration

#### Search Configuration

```python
from google.cloud import discoveryengine_v1 as discoveryengine

def create_search_app():
    """Create a Vertex AI Search application for GEO."""
    client = discoveryengine.EngineServiceClient()

    engine = discoveryengine.Engine(
        display_name="geo-product-search",
        solution_type=discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH,
        search_engine_config=discoveryengine.Engine.SearchEngineConfig(
            search_tier=discoveryengine.SearchTier.SEARCH_TIER_ENTERPRISE,
            search_add_ons=[
                discoveryengine.SearchAddOn.SEARCH_ADD_ON_LLM
            ]
        ),
        industry_vertical=discoveryengine.IndustryVertical.GENERIC
    )

    parent = f"projects/{project_id}/locations/global/collections/default_collection"
    operation = client.create_engine(
        parent=parent,
        engine=engine,
        engine_id="geo-product-search"
    )

    return operation.result()

def perform_search(query: str, filters: dict = None):
    """Execute semantic search with optional filters."""
    client = discoveryengine.SearchServiceClient()

    serving_config = f"projects/{project_id}/locations/global/collections/default_collection/engines/geo-product-search/servingConfigs/default_config"

    search_request = discoveryengine.SearchRequest(
        serving_config=serving_config,
        query=query,
        page_size=10,
        content_search_spec=discoveryengine.SearchRequest.ContentSearchSpec(
            snippet_spec=discoveryengine.SearchRequest.ContentSearchSpec.SnippetSpec(
                return_snippet=True,
                max_snippet_count=3
            ),
            summary_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec(
                summary_result_count=5,
                include_citations=True,
                model_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec.ModelSpec(
                    version="gemini-1.5-flash-001/answer_gen/v1"
                )
            )
        )
    )

    if filters:
        search_request.filter = format_filters(filters)

    response = client.search(search_request)
    return response
```

### Cost Estimation Guidance

#### Monthly Cost Calculator

**Vertex AI - Gemini Models**
- Gemini 1.5 Pro: $1.25 per 1M input chars, $5.00 per 1M output chars
- Gemini 1.5 Flash: $0.075 per 1M input chars, $0.30 per 1M output chars
- Typical query: 4000 input chars, 1000 output chars
- Pro estimate: `(X × 4000 × $1.25/1M) + (X × 1000 × $5.00/1M)`
- Flash estimate: `(X × 4000 × $0.075/1M) + (X × 1000 × $0.30/1M)`

**Vertex AI Embeddings**
- Cost: $0.025 per 1M characters
- Average document: 2000 characters
- Estimated: `(Y documents × 2000 chars × $0.025/1M)`

**Vertex AI Search**
- Base: $2.50 per 1000 queries
- Advanced features (LLM summaries): +$3.00 per 1000 queries
- Estimated: `(Z queries × $5.50/1000)`

**Cloud Functions (2nd gen)**
- Invocations: $0.40 per 1M invocations
- CPU: $0.0000024 per vCPU-second
- Memory: $0.0000025 per GiB-second
- Typical: 2 vCPU, 4GB, 3 seconds
- Per invocation: `(2 × 3 × $0.0000024) + (4 × 3 × $0.0000025) = $0.0000444`

**Cloud Storage**
- Standard: $0.020 per GB/month
- Nearline: $0.010 per GB/month (if access < 1/month)
- Estimated: `A GB × $0.020`

**Firestore**
- Document reads: $0.036 per 100K
- Document writes: $0.108 per 100K
- Storage: $0.18 per GB/month
- Estimated: `(R reads × $0.036/100K) + (W writes × $0.108/100K) + (S GB × $0.18)`

#### Sample Cost Scenarios

**Pilot Deployment (10K queries/month, Gemini Flash)**
- Gemini 1.5 Flash: $4
- Vertex AI Embeddings (1M chars): $0.025
- Vertex AI Search: $55
- Cloud Functions: $5
- Cloud Storage (100GB): $2
- Firestore: $10
- **Total: ~$76/month**

**Production Deployment (100K queries/month, Gemini Pro)**
- Gemini 1.5 Pro: $500
- Vertex AI Embeddings (10M chars): $0.25
- Vertex AI Search: $550
- Cloud Functions: $50
- Cloud Storage (500GB): $10
- Firestore: $100
- **Total: ~$1,210/month**

**Enterprise Deployment (1M queries/month, Gemini Pro)**
- Gemini 1.5 Pro: $5,000
- Vertex AI Embeddings (100M chars): $2.50
- Vertex AI Search: $5,500
- Cloud Functions: $500
- Cloud Storage (2TB): $40
- Firestore: $1,000
- Cloud Monitoring: $200
- **Total: ~$12,242/month**

---

## A.3 Azure Pattern

### Architecture Overview

The Azure pattern leverages Azure OpenAI Service combined with Azure AI Search (formerly Cognitive Search) for hybrid vector and keyword search capabilities.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          API LAYER                                   │
│  ┌────────────────┐           ┌──────────────────┐                  │
│  │  Azure API     │◄──────────│  Application     │                  │
│  │  Management    │           │  Gateway +       │                  │
│  │                │           │  Azure Front Door│                  │
│  └────────┬───────┘           └──────────────────┘                  │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       AGENT LAYER                                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Azure OpenAI Assistants API                                 │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │   │
│  │  │  GPT-4o /   │  │ Function     │  │  Retrieval         │  │   │
│  │  │  GPT-4      │◄─│ Calling      │◄─│  (RAG)             │  │   │
│  │  │  Turbo      │  │              │  │                    │  │   │
│  │  └─────────────┘  └──────────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────┬──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  SEARCH & INDEXING LAYER                             │
│  ┌────────────────────┐        ┌─────────────────────────┐          │
│  │  Azure AI Search   │◄───────│  Ada v2 Embeddings      │          │
│  │  (Cognitive Search)│        │  (text-embedding-ada-   │          │
│  │                    │        │   002 or 3-large/small) │          │
│  │  • Vector search   │        │                         │          │
│  │  • Semantic ranker │        │  • 1536 or 3072 dims    │          │
│  │  • Skillsets       │        │  • Azure OpenAI hosted  │          │
│  └────────┬───────────┘        └─────────────────────────┘          │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA PROCESSING                                │
│  ┌─────────────────┐      ┌─────────────────┐                       │
│  │  Azure          │◄─────│  Azure Logic    │                       │
│  │  Functions      │      │  Apps / Durable │                       │
│  │  (Premium)      │      │  Functions      │                       │
│  └────────┬────────┘      └─────────────────┘                       │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        STORAGE LAYER                                 │
│  ┌─────────────────┐      ┌─────────────────┐                       │
│  │  Azure Blob     │      │  Cosmos DB      │                       │
│  │  Storage        │      │  (Metadata/     │                       │
│  │  (Documents)    │      │   Cache)        │                       │
│  └─────────────────┘      └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Mapping

| Generic Layer | Azure Service | Purpose | Configuration Notes |
|--------------|---------------|---------|-------------------|
| Agent Runtime | Azure OpenAI Assistants API | Multi-turn conversation orchestration | GPT-4o recommended for quality |
| LLM Provider | Azure OpenAI Service | Foundation model access | PTU for predictable performance |
| Vector Database | Azure AI Search | Hybrid vector and keyword search | Standard or higher tier for vectors |
| Embeddings | Azure OpenAI Embeddings | Generate vector representations | text-embedding-3-large for quality |
| Compute | Azure Functions Premium | Serverless data processing | EP1 or higher for VNet integration |
| Object Storage | Azure Blob Storage | Raw documents and artifacts | Hot tier for active data |
| Metadata Store | Azure Cosmos DB | Query cache and session state | RU-based or serverless |
| API Gateway | Azure API Management | RESTful API with policies | Developer tier minimum |
| Orchestration | Azure Durable Functions | Stateful workflows | Fan-out/fan-in patterns |
| Monitoring | Azure Monitor + App Insights | Full observability stack | Custom metrics for GEO KPIs |

### Agent Configuration Patterns

#### Azure OpenAI Assistant Setup

```python
from openai import AzureOpenAI
import os

# Initialize client
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-05-01-preview",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

# Create assistant
assistant = client.beta.assistants.create(
    name="geo-product-advisor",
    instructions="""You are a product discovery assistant specializing in [CATEGORY].
    Your role is to help users find products that match their needs by understanding
    context, preferences, and use cases. Always cite specific products with their
    identifiers and provide rationale for recommendations. Use the search_products
    function to find relevant items and check_inventory to verify availability.""",
    model="gpt-4o",  # Deployment name in Azure OpenAI
    tools=[
        {
            "type": "function",
            "function": {
                "name": "search_products",
                "description": "Search product catalog by attributes and filters",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Natural language search query"
                        },
                        "filters": {
                            "type": "object",
                            "description": "Attribute filters (category, price, etc.)",
                            "properties": {
                                "category": {"type": "string"},
                                "min_price": {"type": "number"},
                                "max_price": {"type": "number"}
                            }
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Maximum results",
                            "default": 10
                        }
                    },
                    "required": ["query"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "check_inventory",
                "description": "Check real-time product availability",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "product_id": {
                            "type": "string",
                            "description": "Unique product identifier"
                        },
                        "location": {
                            "type": "string",
                            "description": "Store or warehouse code"
                        }
                    },
                    "required": ["product_id"]
                }
            }
        }
    ],
    temperature=0.3,
    top_p=0.95
)

# Create thread and run
thread = client.beta.threads.create()
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="I need running shoes for marathon training on pavement"
)

run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assistant.id
)
```

#### Function Implementation with Azure Functions

```python
import azure.functions as func
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential
import json

def search_products(query: str, filters: dict = None, limit: int = 10) -> dict:
    """
    Search products using Azure AI Search.
    """
    search_client = SearchClient(
        endpoint=os.getenv("SEARCH_ENDPOINT"),
        index_name="products",
        credential=AzureKeyCredential(os.getenv("SEARCH_KEY"))
    )

    # Generate query embedding
    embedding = generate_embedding(query)

    # Build filter expression
    filter_expr = None
    if filters:
        conditions = []
        if filters.get("category"):
            conditions.append(f"category eq '{filters['category']}'")
        if filters.get("min_price"):
            conditions.append(f"price ge {filters['min_price']}")
        if filters.get("max_price"):
            conditions.append(f"price le {filters['max_price']}")
        filter_expr = " and ".join(conditions) if conditions else None

    # Hybrid search (vector + keyword)
    results = search_client.search(
        search_text=query,
        vector_queries=[{
            "kind": "vector",
            "vector": embedding,
            "fields": "contentVector",
            "k": limit
        }],
        filter=filter_expr,
        select=["id", "name", "description", "price", "category"],
        top=limit
    )

    products = [
        {
            "id": doc["id"],
            "name": doc["name"],
            "description": doc["description"],
            "price": doc["price"],
            "category": doc["category"]
        }
        for doc in results
    ]

    return {"products": products, "count": len(products)}

app = func.FunctionApp()

@app.function_name(name="SearchProducts")
@app.route(route="search", methods=["POST"])
def search_endpoint(req: func.HttpRequest) -> func.HttpResponse:
    """Azure Function endpoint for product search."""
    try:
        req_body = req.get_json()
        query = req_body.get("query")
        filters = req_body.get("filters")
        limit = req_body.get("limit", 10)

        results = search_products(query, filters, limit)

        return func.HttpResponse(
            json.dumps(results),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500
        )
```

### Embeddings Setup

#### Azure OpenAI Embeddings

```python
from openai import AzureOpenAI
import numpy as np

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

def generate_embedding(
    text: str,
    model: str = "text-embedding-3-large"  # Deployment name
) -> list:
    """
    Generate embedding using Azure OpenAI.

    Args:
        text: Input text (max 8191 tokens)
        model: Deployment name for embedding model

    Returns:
        Embedding vector as list of floats
    """
    response = client.embeddings.create(
        input=text,
        model=model
    )
    return response.data[0].embedding

def batch_embed(
    texts: list,
    model: str = "text-embedding-3-large",
    batch_size: int = 2048
) -> list:
    """
    Process texts in batches.
    Azure OpenAI supports up to 2048 inputs per request.
    """
    all_embeddings = []

    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        response = client.embeddings.create(
            input=batch,
            model=model
        )
        embeddings = [item.embedding for item in response.data]
        all_embeddings.extend(embeddings)

    return all_embeddings
```

#### Embedding Model Comparison

| Model | Dimensions | Context | Use Case | Cost per 1M tokens |
|-------|-----------|---------|----------|--------------------|
| text-embedding-3-large | 3072 (or 256-3072) | 8191 | Highest quality, recommended | $0.13 |
| text-embedding-3-small | 1536 (or 256-1536) | 8191 | Cost-optimized | $0.02 |
| text-embedding-ada-002 | 1536 | 8191 | Legacy support | $0.10 |

### Azure AI Search Index Configuration

#### Index Definition

```json
{
  "name": "products",
  "fields": [
    {
      "name": "id",
      "type": "Edm.String",
      "key": true,
      "searchable": false
    },
    {
      "name": "name",
      "type": "Edm.String",
      "searchable": true,
      "filterable": false,
      "sortable": true,
      "facetable": false
    },
    {
      "name": "description",
      "type": "Edm.String",
      "searchable": true,
      "analyzer": "en.microsoft"
    },
    {
      "name": "category",
      "type": "Edm.String",
      "filterable": true,
      "facetable": true
    },
    {
      "name": "price",
      "type": "Edm.Double",
      "filterable": true,
      "sortable": true
    },
    {
      "name": "contentVector",
      "type": "Collection(Edm.Single)",
      "dimensions": 3072,
      "vectorSearchProfile": "vector-profile-default",
      "searchable": true
    },
    {
      "name": "metadata",
      "type": "Edm.ComplexType",
      "fields": [
        {"name": "brand", "type": "Edm.String", "filterable": true},
        {"name": "lastUpdated", "type": "Edm.DateTimeOffset", "filterable": true}
      ]
    }
  ],
  "vectorSearch": {
    "algorithms": [
      {
        "name": "hnsw-config",
        "kind": "hnsw",
        "hnswParameters": {
          "m": 4,
          "efConstruction": 400,
          "efSearch": 500,
          "metric": "cosine"
        }
      }
    ],
    "profiles": [
      {
        "name": "vector-profile-default",
        "algorithm": "hnsw-config"
      }
    ]
  },
  "semantic": {
    "configurations": [
      {
        "name": "semantic-config",
        "prioritizedFields": {
          "titleField": {"fieldName": "name"},
          "contentFields": [{"fieldName": "description"}],
          "keywordsFields": [{"fieldName": "category"}]
        }
      }
    ]
  }
}
```

#### Hybrid Search Query

```python
from azure.search.documents import SearchClient
from azure.search.documents.models import VectorizedQuery

def hybrid_search(
    search_client: SearchClient,
    query: str,
    embedding: list,
    top: int = 10,
    filter_expr: str = None
):
    """
    Execute hybrid search combining vector and keyword matching.
    """
    vector_query = VectorizedQuery(
        vector=embedding,
        k_nearest_neighbors=top,
        fields="contentVector"
    )

    results = search_client.search(
        search_text=query,
        vector_queries=[vector_query],
        filter=filter_expr,
        query_type="semantic",
        semantic_configuration_name="semantic-config",
        top=top,
        select=["id", "name", "description", "price", "category"]
    )

    return list(results)
```

### Cost Estimation Guidance

#### Monthly Cost Calculator

**Azure OpenAI Service**
- GPT-4o: $2.50 per 1M input tokens, $10.00 per 1M output tokens
- GPT-4 Turbo: $10.00 per 1M input tokens, $30.00 per 1M output tokens
- Typical query: 1500 input tokens, 500 output tokens
- GPT-4o estimate: `(X × 1500 × $2.50/1M) + (X × 500 × $10.00/1M)`

**Embeddings**
- text-embedding-3-large: $0.13 per 1M tokens
- text-embedding-3-small: $0.02 per 1M tokens
- Average document: 400 tokens
- Estimated: `(Y documents × 400 tokens × $0.13/1M)`

**Azure AI Search**
- Standard S1: $250/month base (25GB, 15 partitions/replicas)
- Standard S2: $1,000/month base (100GB, 15 partitions/replicas)
- Additional storage: $0.40 per GB/month
- Semantic ranker: $500/month per 1000 queries

**Azure Functions Premium**
- EP1 (1 core, 3.5GB): $169.92/month per instance
- EP2 (2 core, 7GB): $339.84/month per instance
- Execution: $0.000016 per GB-second

**Azure Blob Storage**
- Hot tier: $0.0184 per GB/month
- Cool tier: $0.01 per GB/month
- Operations: $0.004 per 10K write operations

**Azure Cosmos DB**
- Serverless: $0.25 per 1M RUs consumed
- Provisioned: $0.008 per RU/hour (400 RU minimum = $2.88/month)

#### Sample Cost Scenarios

**Pilot Deployment (10K queries/month)**
- Azure OpenAI (GPT-4o): $37.50
- Embeddings (text-embedding-3-small): $0.08
- AI Search (S1): $250
- Semantic Ranker: $50
- Functions Premium (EP1): $170
- Blob Storage (100GB): $1.84
- Cosmos DB (Serverless): $10
- **Total: ~$520/month**

**Production Deployment (100K queries/month)**
- Azure OpenAI (GPT-4o): $375
- Embeddings (text-embedding-3-large): $5.20
- AI Search (S2): $1,000
- Semantic Ranker: $500
- Functions Premium (EP2, 2 instances): $680
- Blob Storage (500GB): $9.20
- Cosmos DB (400 RU): $50
- **Total: ~$2,619/month**

**Enterprise Deployment (1M queries/month)**
- Azure OpenAI (GPT-4o PTU): $15,000 (reserved capacity)
- Embeddings (text-embedding-3-large): $52
- AI Search (S3, 2 partitions): $4,000
- Semantic Ranker: $5,000
- Functions Premium (EP3, 4 instances): $2,720
- Blob Storage (2TB): $37
- Cosmos DB (10K RU): $720
- Application Insights: $300
- **Total: ~$27,829/month**

---

## A.4 Hybrid/Multi-Cloud Pattern

### When to Consider Hybrid Approaches

Hybrid and multi-cloud architectures introduce complexity but become necessary in specific scenarios:

#### Compelling Use Cases

1. **Data Residency Requirements**
   - Regulatory constraints require data to stay in specific geographic regions
   - Cloud provider lacks presence in required jurisdiction
   - Example: EU customer data in Google Cloud (GDPR), US operations in AWS (FedRAMP)

2. **Best-of-Breed Service Selection**
   - Azure OpenAI for GPT-4 access with enterprise agreements
   - AWS Bedrock for Claude 3.5 Sonnet performance
   - Google Vertex AI Search for superior semantic ranking
   - Leverage existing enterprise agreements across providers

3. **Migration or Exit Strategy**
   - Transitioning from one cloud to another over time
   - Reducing vendor lock-in for negotiation leverage
   - Maintaining operational continuity during platform changes

4. **Existing Technology Investments**
   - Core infrastructure already established on one cloud
   - New AI capabilities added on different provider
   - Avoiding migration costs of existing systems

5. **Disaster Recovery and Resilience**
   - Primary region failure requiring cross-cloud failover
   - LLM API availability issues (quota, throttling, outages)
   - Geographic redundancy across provider networks

#### Anti-Patterns (When NOT to Use Hybrid)

1. **Complexity for Complexity's Sake**
   - "Multi-cloud strategy" as a goal rather than a solution
   - Increases operational burden without clear benefit

2. **Cost Arbitrage**
   - Chasing marginal price differences increases integration cost
   - Data egress fees often eliminate savings

3. **Feature Shopping**
   - Using niche features from multiple clouds without integration plan
   - Creates technical debt and maintenance burden

### Cross-Cloud Integration Patterns

#### Pattern 1: Cloud-Agnostic Agent with Multi-Cloud Knowledge Bases

```
┌────────────────────────────────────────────────────────────┐
│  Application Layer (Cloud-Agnostic or Primary Cloud)      │
│                                                             │
│  ┌──────────────────┐        ┌──────────────────┐         │
│  │  Agent Runtime   │◄───────│  API Gateway     │         │
│  │  (AWS Bedrock    │        │  (Primary Cloud) │         │
│  │   Claude)        │        │                  │         │
│  └────────┬─────────┘        └──────────────────┘         │
└───────────┼──────────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────────┐
│  Knowledge Federation Layer                                 │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Knowledge Router                                    │  │
│  │  • Route by data type (products vs reviews vs docs) │  │
│  │  • Route by latency requirements                    │  │
│  │  • Failover logic                                   │  │
│  └────┬──────────────────┬─────────────────┬────────────┘  │
└───────┼──────────────────┼─────────────────┼─────────────────┘
        │                  │                 │
        ▼                  ▼                 ▼
┌───────────────┐  ┌──────────────┐  ┌─────────────────┐
│  AWS          │  │  Google      │  │  Azure          │
│  OpenSearch   │  │  Vertex AI   │  │  AI Search      │
│  (Products)   │  │  Search      │  │  (Documents)    │
│               │  │  (Reviews)   │  │                 │
└───────────────┘  └──────────────┘  └─────────────────┘
```

**Implementation Considerations:**
- Implement knowledge router with circuit breaker pattern for failover
- Use consistent embedding models across clouds (e.g., OpenAI-compatible)
- Maintain metadata catalog showing which knowledge base contains what
- Accept eventual consistency across knowledge bases

#### Pattern 2: Primary Cloud with Failover LLM

```
┌──────────────────────────────────────────────────────┐
│  LLM Gateway (Middleware Layer)                      │
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │  Request Router                                │  │
│  │  • Health checks every 30s                    │  │
│  │  • Quota tracking per provider               │  │
│  │  • Auto-failover on 429/503 errors           │  │
│  │  • Response time monitoring                  │  │
│  └───┬─────────────────────────┬─────────────────┘  │
└──────┼─────────────────────────┼────────────────────┘
       │                         │
       │ Primary (95%)           │ Failover (5%)
       ▼                         ▼
┌──────────────┐          ┌─────────────────┐
│  AWS Bedrock │          │  Azure OpenAI   │
│  (Claude)    │          │  (GPT-4)        │
│              │          │                 │
│  • Low latency│         │  • Backup quota│
│  • Main quota│          │  • Different    │
│              │          │    limits       │
└──────────────┘          └─────────────────┘
```

**LLM Gateway Implementation (Python)**

```python
from typing import Optional, Dict, List
from enum import Enum
import time
import logging

class LLMProvider(Enum):
    AWS_BEDROCK = "aws_bedrock"
    AZURE_OPENAI = "azure_openai"
    GOOGLE_VERTEX = "google_vertex"

class LLMGateway:
    """
    Multi-cloud LLM gateway with automatic failover.
    """

    def __init__(self, providers_config: Dict):
        self.providers = providers_config
        self.health_status = {p: True for p in providers_config.keys()}
        self.quota_remaining = {p: float('inf') for p in providers_config.keys()}
        self.response_times = {p: [] for p in providers_config.keys()}

    def complete(
        self,
        prompt: str,
        max_tokens: int = 2048,
        temperature: float = 0.3,
        preferred_provider: Optional[LLMProvider] = None
    ) -> Dict:
        """
        Execute completion with automatic failover.
        """
        providers_ordered = self._get_provider_order(preferred_provider)

        for provider in providers_ordered:
            if not self.health_status[provider]:
                logging.warning(f"{provider} unhealthy, skipping")
                continue

            try:
                start_time = time.time()
                response = self._call_provider(
                    provider, prompt, max_tokens, temperature
                )

                # Track performance
                elapsed = time.time() - start_time
                self.response_times[provider].append(elapsed)

                # Success
                return {
                    "text": response["text"],
                    "provider": provider.value,
                    "latency_ms": elapsed * 1000,
                    "tokens": response.get("usage", {})
                }

            except QuotaExceededError:
                logging.error(f"{provider} quota exceeded")
                self.quota_remaining[provider] = 0
                continue

            except ProviderError as e:
                logging.error(f"{provider} failed: {e}")
                self.health_status[provider] = False
                continue

        raise AllProvidersFailedError("No healthy providers available")

    def _get_provider_order(
        self,
        preferred: Optional[LLMProvider]
    ) -> List[LLMProvider]:
        """
        Determine provider order based on health, quota, and preference.
        """
        if preferred and self.health_status.get(preferred):
            # Try preferred first, then others
            others = [p for p in self.providers.keys() if p != preferred]
            return [preferred] + others

        # Sort by health, then quota, then avg response time
        return sorted(
            self.providers.keys(),
            key=lambda p: (
                not self.health_status[p],  # Healthy first
                self.quota_remaining[p] == 0,  # Has quota
                self._avg_response_time(p)  # Fastest
            )
        )

    def _avg_response_time(self, provider: LLMProvider) -> float:
        """Calculate average response time (last 10 requests)."""
        recent = self.response_times[provider][-10:]
        return sum(recent) / len(recent) if recent else float('inf')
```

#### Pattern 3: Data Gravity with Edge Processing

```
┌─────────────────────────────────────────────────────┐
│  Edge Locations (Content Delivery)                  │
│                                                      │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐    │
│  │  NA Edge  │  │  EU Edge  │  │  APAC Edge   │    │
│  │  (Compute)│  │  (Compute)│  │  (Compute)   │    │
│  └─────┬─────┘  └─────┬─────┘  └──────┬───────┘    │
└────────┼──────────────┼────────────────┼────────────┘
         │              │                │
         │              │                │
         ▼              ▼                ▼
┌────────────────────────────────────────────────────┐
│  Regional Data Processing                          │
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │  AWS     │    │  Google  │    │  Azure   │     │
│  │  us-east-1│   │  eu-west1│    │  asia-se │     │
│  │          │    │          │    │          │     │
│  │  • Data  │    │  • GDPR  │    │  • Local │     │
│  │    stays │    │    comply│    │    regs  │     │
│  └──────────┘    └──────────┘    └──────────┘     │
└────────────────────────────────────────────────────┘
```

**Key Principles:**
- Process data in region where it originates
- Use edge compute (CloudFront Functions, Cloud CDN, Azure Front Door) for routing
- Maintain regional knowledge bases for data residency
- Replicate only anonymized/aggregated data cross-region

### Data Residency Considerations

#### Compliance Requirements Mapping

| Regulation | Key Requirements | Architectural Impact |
|-----------|------------------|---------------------|
| **GDPR** (EU) | Data must stay in EU; data processing agreements required | EU-region deployment; DPA with cloud provider |
| **CCPA** (California) | Consumer data rights; no strict residency | Metadata tracking for deletion requests |
| **HIPAA** (US Healthcare) | PHI encryption at rest/transit; audit logs | BAA with cloud provider; encryption keys in HSM |
| **PCI DSS** (Payment) | Cardholder data isolation; network segmentation | Separate VPC/VNet; no payment data in LLM context |
| **FedRAMP** (US Federal) | Government-approved cloud regions only | AWS GovCloud, Azure Government regions |
| **PIPL** (China) | Data localization; government access | China-region deployment; local entity required |

#### Data Classification Framework

**Tier 1: Unrestricted**
- Public product information
- Marketing content
- Published documentation
- **Strategy:** Replicate globally for performance

**Tier 2: Internal**
- Internal processes and procedures
- Non-sensitive analytics
- Aggregated metrics
- **Strategy:** Primary cloud with backup, encryption at rest

**Tier 3: Confidential**
- Customer PII
- Financial records
- Proprietary algorithms
- **Strategy:** Single-region deployment, encryption in-use, access controls

**Tier 4: Restricted**
- Payment data (PCI)
- Health records (HIPAA)
- Regulated industry data
- **Strategy:** Air-gapped deployment, compliance-certified regions only

### Vendor Lock-In Mitigation

#### Abstraction Layer Strategy

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class VectorStoreInterface(ABC):
    """
    Cloud-agnostic interface for vector databases.
    Allows switching between OpenSearch, Vertex AI Search, Azure AI Search.
    """

    @abstractmethod
    def index_documents(
        self,
        documents: List[Dict[str, Any]],
        batch_size: int = 100
    ) -> Dict[str, int]:
        """Index documents with embeddings."""
        pass

    @abstractmethod
    def search(
        self,
        query: str,
        embedding: List[float],
        top_k: int = 10,
        filters: Dict[str, Any] = None
    ) -> List[Dict[str, Any]]:
        """Execute hybrid search."""
        pass

    @abstractmethod
    def delete_documents(self, document_ids: List[str]) -> int:
        """Delete documents by ID."""
        pass


class AWSOpenSearchStore(VectorStoreInterface):
    """AWS OpenSearch implementation."""

    def __init__(self, endpoint: str, index_name: str):
        from opensearchpy import OpenSearch
        self.client = OpenSearch([endpoint])
        self.index = index_name

    def index_documents(self, documents, batch_size=100):
        # AWS-specific implementation
        pass

    def search(self, query, embedding, top_k=10, filters=None):
        # AWS-specific implementation
        pass


class AzureAISearchStore(VectorStoreInterface):
    """Azure AI Search implementation."""

    def __init__(self, endpoint: str, index_name: str, api_key: str):
        from azure.search.documents import SearchClient
        self.client = SearchClient(endpoint, index_name, AzureKeyCredential(api_key))

    def index_documents(self, documents, batch_size=100):
        # Azure-specific implementation
        pass

    def search(self, query, embedding, top_k=10, filters=None):
        # Azure-specific implementation
        pass


# Factory pattern for instantiation
def create_vector_store(provider: str, **config) -> VectorStoreInterface:
    """Create vector store based on configuration."""
    stores = {
        "aws": AWSOpenSearchStore,
        "azure": AzureAISearchStore,
        "google": GoogleVertexSearchStore
    }
    return stores[provider](**config)
```

#### Infrastructure as Code Portability

Use cloud-agnostic IaC tools to maintain portability:

**Terraform Modules**
```hcl
# Abstract module interface
module "vector_database" {
  source = "./modules/vector_db"

  # Cloud-agnostic inputs
  name               = "product-search"
  dimension          = 1024
  similarity_metric  = "cosine"
  replica_count      = 2

  # Provider-specific (passed via variables)
  provider_type = var.cloud_provider  # aws, azure, google
  region        = var.region
}
```

**Pulumi (Multi-language IaC)**
```python
import pulumi
from pulumi import Config

config = Config()
cloud_provider = config.require("cloud_provider")

if cloud_provider == "aws":
    from pulumi_aws import opensearch
    vector_db = opensearch.Domain(...)
elif cloud_provider == "azure":
    from pulumi_azure_native import search
    vector_db = search.Service(...)
elif cloud_provider == "google":
    from pulumi_gcp import discoveryengine
    vector_db = discoveryengine.DataStore(...)
```

#### Data Portability Standards

1. **Document Format Standardization**
   - Store documents in portable formats (JSON, Parquet)
   - Maintain schema version in metadata
   - Avoid provider-specific data types

2. **Embedding Compatibility**
   - Use open embedding models (e.g., sentence-transformers) OR
   - Store embeddings separately from provider-specific indexes
   - Document embedding model and version in metadata

3. **Export Capabilities**
   - Automated backup to cloud-agnostic storage (S3-compatible)
   - Regular full exports in portable format
   - Migration scripts for each provider pair (AWS→Azure, etc.)

---

## A.5 Platform Selection Matrix

### Decision Criteria Comparison

| Criterion | AWS | Google Cloud | Azure | Weighting |
|-----------|-----|--------------|-------|-----------|
| **LLM Model Quality** | Claude 3.5 (Bedrock): Excellent for reasoning | Gemini 1.5 Pro: Strong multimodal | GPT-4o: Excellent general purpose | 25% |
| **Embedding Quality** | Titan v2: Good, 1024-dim | text-embedding-004: Excellent, 768-dim | text-embedding-3-large: Excellent, 3072-dim | 15% |
| **Vector Search Performance** | OpenSearch: Mature, flexible | Vertex AI Search: Google-quality ranking | AI Search: Hybrid semantic + vector | 20% |
| **Enterprise Maturity** | Highest (longest in market) | Medium (rapid evolution) | High (enterprise focus) | 10% |
| **Cost (100K queries/mo)** | ~$1,500 | ~$1,200 | ~$2,600 | 15% |
| **Ease of Integration** | Bedrock Agents: turnkey | More manual configuration | Assistants API: familiar to OpenAI users | 10% |
| **Compliance/Regions** | Most regions, strong compliance | Strong EU presence | Best for Microsoft-heavy orgs | 5% |

### Detailed Feature Comparison

#### Agent/Orchestration Capabilities

| Feature | AWS Bedrock Agents | Google Vertex AI Agents | Azure OpenAI Assistants |
|---------|-------------------|------------------------|------------------------|
| **Multi-turn conversation** | Yes (automatic) | Yes (with Reasoning Engine) | Yes (Threads API) |
| **Function calling** | Action Groups | Extensions/Tools | Function calling |
| **Knowledge base integration** | Native (Bedrock KB) | Vertex AI Search integration | Requires custom RAG |
| **Memory/state management** | Session state (DynamoDB) | Firestore integration | Thread persistence |
| **Prompt caching** | Limited | Yes (context caching) | No |
| **Streaming responses** | Yes | Yes | Yes |
| **Multimodal support** | Limited (Claude 3.5) | Strong (Gemini 1.5) | Strong (GPT-4o) |

#### Vector Search Capabilities

| Feature | AWS OpenSearch | Google Vertex AI Search | Azure AI Search |
|---------|----------------|------------------------|-----------------|
| **Algorithm** | HNSW, IVF | Google proprietary | HNSW |
| **Hybrid search** | Yes (BM25 + vector) | Yes (ranking fusion) | Yes (RRF) |
| **Semantic ranking** | Plugin-based | Built-in (Google quality) | Semantic ranker add-on |
| **Filters** | Rich filtering | Limited | Rich filtering |
| **Max dimensions** | 16,000 | 768 (text-embedding-004) | 4,096 |
| **Managed scaling** | Serverless or provisioned | Fully managed | Tiered (Basic to L2) |
| **Real-time indexing** | Yes | Yes | Yes (with limitations) |

#### Cost Comparison (Detailed)

**Scenario: 100,000 queries/month, 10,000 documents indexed**

| Cost Component | AWS | Google Cloud | Azure |
|----------------|-----|--------------|-------|
| LLM inference (avg 2K in, 500 out tokens) | $750 (Claude 3.5) | $125 (Gemini Flash) / $500 (Pro) | $375 (GPT-4o) |
| Embeddings (10M tokens/month) | $1.00 (Titan v2) | $0.50 (text-embedding-004) | $1.30 (ada-002) / $5.20 (3-large) |
| Vector search | $350 (OpenSearch Serverless) | $550 (Vertex AI Search) | $1,000 (AI Search S2) + $500 (semantic) |
| Compute (data processing) | $50 (Lambda) | $50 (Cloud Functions) | $340 (Functions Premium EP1) |
| Storage (500GB) | $12 (S3) | $10 (Cloud Storage) | $9 (Blob Storage) |
| Database (metadata/cache) | $25 (DynamoDB) | $100 (Firestore) | $50 (Cosmos DB) |
| **Total/month** | **~$1,188** | **~$835 (Flash) / $1,210 (Pro)** | **~$2,275** |

**Cost Optimization Strategies:**

1. **AWS:** Use Bedrock Provisioned Throughput (PTU) for predictable high volume (>1M tokens/day)
2. **Google:** Gemini Flash for latency-tolerant workloads saves 75% on LLM costs
3. **Azure:** Use text-embedding-3-small (vs 3-large) saves 85% on embeddings

### Migration Considerations

#### AWS → Azure Migration

**Complexity: Medium**

| Component | Migration Strategy | Effort | Risk |
|-----------|-------------------|--------|------|
| Lambda → Functions | Direct code port (Python/Node.js) | Low | Low |
| Bedrock → Azure OpenAI | API adapter layer required | Medium | Medium (model behavior differences) |
| OpenSearch → AI Search | Re-index with new embeddings if dimension mismatch | High | Medium (search quality changes) |
| S3 → Blob Storage | Use AzCopy or AWS DataSync | Low | Low |
| DynamoDB → Cosmos DB | Schema mapping, API changes | Medium | Medium |

**Estimated Timeline:** 6-8 weeks for typical GEO deployment

#### Google Cloud → AWS Migration

**Complexity: Medium-High**

| Component | Migration Strategy | Effort | Risk |
|-----------|-------------------|--------|------|
| Cloud Functions → Lambda | Code port, event trigger mapping | Medium | Low |
| Gemini → Bedrock Claude | Prompt engineering adjustments | High | High (behavior differences) |
| Vertex AI Search → OpenSearch | Complete re-architecture | High | High (different paradigm) |
| Cloud Storage → S3 | Transfer Service or gsutil | Low | Low |
| Firestore → DynamoDB | NoSQL → key-value mapping | Medium | Medium |

**Estimated Timeline:** 8-12 weeks for typical GEO deployment

#### Azure → Google Cloud Migration

**Complexity: Medium**

| Component | Migration Strategy | Effort | Risk |
|-----------|-------------------|--------|------|
| Functions → Cloud Functions | Direct port (similar runtime) | Low | Low |
| Azure OpenAI → Gemini | Model swap, prompt tuning | Medium | Medium |
| AI Search → Vertex AI Search | Leverage Google's search strength | Medium | Low (quality improvement) |
| Blob Storage → Cloud Storage | AzCopy or Storage Transfer | Low | Low |
| Cosmos DB → Firestore | Document model compatible | Low | Low |

**Estimated Timeline:** 6-8 weeks for typical GEO deployment

### Decision Framework

#### Choose AWS If:

- **Claude 3.5 Sonnet** is critical for reasoning quality
- Existing AWS footprint with established DevOps practices
- Need broadest compliance certifications (FedRAMP, HIPAA, etc.)
- Prefer mature, battle-tested services over cutting-edge
- Budget allows for premium model costs

**Best For:** Enterprises with AWS-first strategy, regulated industries, complex reasoning requirements

#### Choose Google Cloud If:

- **Cost optimization** is primary concern (Gemini Flash = 75% savings)
- **Search quality** is paramount (leverage Google's core competency)
- Multimodal use cases (images, video with Gemini)
- International deployment (strong EU presence)
- Comfort with faster-evolving platform

**Best For:** Cost-conscious deployments, search-heavy applications, international operations

#### Choose Azure If:

- **Microsoft ecosystem** integration (Teams, SharePoint, Dynamics)
- Enterprise agreement with Microsoft provides favorable pricing
- GPT-4 family preference (familiarity, tooling)
- Strong governance and compliance requirements within Microsoft stack
- Existing Azure infrastructure

**Best For:** Microsoft-centric enterprises, organizations with EA agreements, GPT-4 preference

#### Choose Hybrid/Multi-Cloud If:

- **Data residency** mandates cross-region, different providers
- Risk mitigation for critical workloads (no single point of failure)
- Best-of-breed service selection justifies integration complexity
- Existing multi-cloud footprint
- Migration in progress

**Best For:** Global enterprises, regulated industries with complex requirements, risk-averse organizations

---

## Summary

This appendix provides concrete implementation patterns for GEO systems across major cloud platforms:

- **AWS Pattern:** Leverages Bedrock for managed AI with OpenSearch for vector search. Best for Claude 3.5 quality and mature enterprise features. Moderate cost.

- **Google Cloud Pattern:** Uses Gemini and Vertex AI Search for cost-effective, search-quality deployments. Strong for multimodal and international use cases. Lowest cost with Flash model.

- **Azure Pattern:** Integrates Azure OpenAI with AI Search for Microsoft-centric organizations. Excellent for existing Azure footprints. Higher cost but familiar for OpenAI users.

- **Hybrid/Multi-Cloud:** Necessary for data residency, vendor diversification, or best-of-breed selection. Introduces complexity but provides resilience and flexibility.

Use the Platform Selection Matrix to evaluate your specific requirements across model quality, cost, integration effort, and strategic alignment. Remember that the "best" platform is the one that aligns with your organization's existing investments, skillsets, and strategic direction—not the one with the most features.

For detailed implementation guidance on any of these patterns, consult your cloud provider's documentation and consider engaging solution architects for design validation before committing to a platform choice.
