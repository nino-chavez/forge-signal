/**
 * Core Types - Barrel Export
 *
 * Re-exports all type definitions for convenient importing.
 */

// Content modes and types
export {
  ContentMode,
  ContentType,
  OutputFormat,
  isDocumentationType,
  getModeForType,
} from './content.js';

// Research context
export {
  ResearchContext,
  WebSearchResult,
  DocumentResult,
  VerifiedFact,
  CompetitiveInsight,
} from './research.js';

// Tasks
export {
  ContentTask,
  ContentConstraints,
  TaskOptions,
  TaskStatus,
  TaskProgress,
  generateTaskId,
} from './tasks.js';

// Agents
export {
  AgentMessage,
  AgentType,
  MessageType,
  AgentInput,
  AgentOutput,
  generateCorrelationId,
} from './agents.js';

// Voice
export {
  RevisionFeedback,
  EnhancedVoiceCheckResult,
  RevisionSuggestion,
  TextRange,
} from './voice.js';

// Production
export {
  ProductionResult,
  IterationState,
  RevisionStrategy,
  IterationConfig,
} from './production.js';

// Memory
export {
  MemoryScope,
  MemoryEntry,
  MemoryMetadata,
} from './memory.js';

// Publication
export {
  PublicationTarget,
  PublicationResult,
} from './publication.js';

// Tools
export {
  AgentTool,
  ToolParams,
  ToolResult,
} from './tools.js';

// Classification
export {
  ClassificationResult,
  ClassificationSignal,
  AlternativeMode,
} from './classification.js';

// Utility types
export { DeepPartial } from './utils.js';
