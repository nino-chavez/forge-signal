/**
 * Agent Types and Interfaces
 *
 * Core type definitions for the agentic content system.
 * These types define the contracts between agents, orchestrator, and tools.
 */

import type { AIProvider } from '../providers/ai-provider.js';
import type { VoiceCheckResult } from '../voice/voice-checker.js';

// =============================================================================
// Content Modes & Types
// =============================================================================

export type ContentMode = 'thought-leadership' | 'architecture' | 'advisory' | 'documentation';

export type ContentType =
  | 'deck'
  | 'pov'
  | 'paper'
  | 'architecture'
  | 'adr'
  | 'tech-deck'
  | 'spec'
  | 'brief'
  | 'roadmap'
  | 'guide'
  | 'reference'
  | 'tutorial';

export type OutputFormat = 'pptx' | 'docx' | 'pdf' | 'html' | 'slides' | 'markdown';

// =============================================================================
// Task Definitions
// =============================================================================

export interface ContentTask {
  id: string;
  type: ContentType;
  mode?: ContentMode; // Auto-detected if not specified
  input: string;
  context?: ResearchContext;
  constraints?: ContentConstraints;
  outputFormats?: OutputFormat[];
  options?: TaskOptions;
}

export interface ContentConstraints {
  maxTokens?: number;
  targetAudience?: string;
  clientName?: string;
  strategicObjectives?: string[];
  avoidTopics?: string[];
}

export interface TaskOptions {
  enableResearch?: boolean;
  enableIteration?: boolean;
  maxIterations?: number;
  enableMemory?: boolean;
  provider?: AIProvider;
}

// =============================================================================
// Research Context
// =============================================================================

export interface ResearchContext {
  webResults?: WebSearchResult[];
  localDocuments?: DocumentResult[];
  facts?: VerifiedFact[];
  competitiveInsights?: CompetitiveInsight[];
  relevanceScore?: number;
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  relevance: number;
}

export interface DocumentResult {
  path: string;
  title?: string;
  content: string;
  type: 'meeting-notes' | 'reference' | 'previous-content' | 'template';
  relevance: number;
}

export interface VerifiedFact {
  claim: string;
  verified: boolean;
  sources: string[];
  confidence: number;
}

export interface CompetitiveInsight {
  competitor: string;
  insight: string;
  source: string;
  relevance: number;
}

// =============================================================================
// Agent Communication
// =============================================================================

export interface AgentMessage {
  from: AgentType;
  to: AgentType;
  type: MessageType;
  payload: unknown;
  timestamp: Date;
  correlationId: string;
}

export type AgentType =
  | 'orchestrator'
  | 'research'
  | 'production'
  | 'revision'
  | 'publication';

export type MessageType =
  | 'task-assignment'
  | 'task-complete'
  | 'task-failed'
  | 'revision-request'
  | 'feedback'
  | 'context-update';

// =============================================================================
// Agent Input/Output
// =============================================================================

export interface AgentInput {
  task: ContentTask;
  context?: ResearchContext;
  previousOutput?: AgentOutput;
  feedback?: RevisionFeedback;
}

export interface AgentOutput {
  agentType: AgentType;
  success: boolean;
  content?: string;
  metadata?: Record<string, unknown>;
  error?: string;
  duration?: number;
}

// =============================================================================
// Production & Revision
// =============================================================================

export interface ProductionResult {
  content: string;
  voiceCheck: VoiceCheckResult;
  iterations: number;
  approved: boolean;
  warning?: string;
  metadata?: {
    provider: AIProvider;
    model?: string;
    totalTokens?: number;
  };
}

export interface RevisionFeedback {
  voiceCheck: EnhancedVoiceCheckResult;
  strategicIssues?: string[];
  preserveStrengths: string[];
  targetScore: number;
}

export interface EnhancedVoiceCheckResult extends VoiceCheckResult {
  suggestions: RevisionSuggestion[];
  preservationZones: TextRange[];
  problemZones: TextRange[];
  confidence: number;
}

export interface RevisionSuggestion {
  issue: string;
  location?: TextRange;
  currentText?: string;
  suggestedFix?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TextRange {
  start: number;
  end: number;
  text: string;
}

// =============================================================================
// Iteration Control
// =============================================================================

export interface IterationState {
  current: number;
  max: number;
  scores: number[];
  improvements: number[];
  stalled: boolean;
  strategy: RevisionStrategy;
}

export type RevisionStrategy = 'targeted' | 'strategic' | 'rewrite';

export interface IterationConfig {
  maxIterations: number;
  minScoreImprovement: number;
  voiceScoreThreshold: number;
  stallThreshold: number; // Number of iterations without improvement
}

// =============================================================================
// Publication
// =============================================================================

export interface PublicationTarget {
  type: 'local' | 'cms' | 'email' | 'slides';
  platform: string;
  config?: Record<string, unknown>;
}

export interface PublicationResult {
  target: PublicationTarget;
  success: boolean;
  path?: string;
  url?: string;
  error?: string;
  timestamp: Date;
}

// =============================================================================
// Memory
// =============================================================================

export type MemoryScope = 'session' | 'long-term';

export interface MemoryEntry {
  key: string;
  value: unknown;
  scope: MemoryScope;
  timestamp: Date;
  metadata: MemoryMetadata;
}

export interface MemoryMetadata {
  taskId?: string;
  contentType?: ContentType;
  clientName?: string;
  tags?: string[];
  accessCount?: number;
  lastAccessed?: Date;
}

// =============================================================================
// Task Status
// =============================================================================

export type TaskStatus =
  | 'pending'
  | 'classifying'
  | 'researching'
  | 'producing'
  | 'revising'
  | 'publishing'
  | 'completed'
  | 'failed';

export interface TaskProgress {
  taskId: string;
  status: TaskStatus;
  currentAgent?: AgentType;
  iteration?: number;
  voiceScore?: number;
  startTime: Date;
  lastUpdate: Date;
  error?: string;
}

// =============================================================================
// Tool Definitions
// =============================================================================

export interface AgentTool {
  name: string;
  description: string;
  execute: (params: ToolParams) => Promise<ToolResult>;
}

export interface ToolParams {
  [key: string]: unknown;
}

export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

// =============================================================================
// Classification
// =============================================================================

export interface ClassificationResult {
  mode: ContentMode;
  confidence: number;
  signals: ClassificationSignal[];
  alternativeModes: AlternativeMode[];
}

export interface ClassificationSignal {
  type: 'keyword' | 'audience' | 'structure' | 'output-type';
  value: string;
  weight: number;
  matchedMode: ContentMode;
}

export interface AlternativeMode {
  mode: ContentMode;
  confidence: number;
}

// =============================================================================
// Utility Types
// =============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateCorrelationId(): string {
  return `corr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if a content type is documentation
 */
export function isDocumentationType(type: ContentType): boolean {
  return ['guide', 'reference', 'tutorial'].includes(type);
}

/**
 * Get the content mode for a content type
 */
export function getModeForType(type: ContentType): ContentMode {
  const modeMap: Record<ContentType, ContentMode> = {
    // Thought Leadership
    pov: 'thought-leadership',
    paper: 'thought-leadership',
    // Architecture
    architecture: 'architecture',
    adr: 'architecture',
    'tech-deck': 'architecture',
    spec: 'architecture',
    // Advisory
    deck: 'advisory',
    brief: 'advisory',
    roadmap: 'advisory',
    // Documentation
    guide: 'documentation',
    reference: 'documentation',
    tutorial: 'documentation',
  };
  return modeMap[type] || 'advisory';
}
