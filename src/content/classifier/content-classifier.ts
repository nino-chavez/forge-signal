/**
 * Content Classifier
 *
<<<<<<< HEAD
 * Automatically detects content mode (thought-leadership, architecture, advisory, documentation)
 * based on input signals: keywords, audience markers, structure, and output type.
=======
 * Automatically detects content mode based on input signals: keywords,
 * audience markers, structure, and output type. Signal definitions come
 * from the mode registry — no hardcoded mode data here.
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
 */

import type {
  ClassificationResult,
  ClassificationSignal,
<<<<<<< HEAD
  ContentMode,
  ContentType,
} from '../../core/types/index.js';

// =============================================================================
// Signal Definitions
// =============================================================================

const KEYWORD_SIGNALS: Record<ContentMode, string[]> = {
  'thought-leadership': [
    'explore',
    'reflect',
    'I\'ve been thinking',
    'question',
    'tension',
    'wonder',
    'curious',
    'observation',
    'pattern I\'ve noticed',
    'here\'s what I think',
    'provisional',
    'for now',
    'today I believe',
    'evolution',
    'I used to think',
    'uncomfortable truth',
    'what if',
    'meta',
  ],
  architecture: [
    'system',
    'component',
    'data flow',
    'API',
    'deployment',
    'infrastructure',
    'architecture',
    'service',
    'database',
    'integration',
    'technical',
    'implementation',
    'specification',
    'container',
    'microservice',
    'endpoint',
    'schema',
    'diagram',
    'C4',
    'arc42',
    'ADR',
    'decision record',
  ],
  advisory: [
    'recommend',
    'strategy',
    'roadmap',
    'investment',
    'stakeholder',
    'business',
    'executive',
    'leadership',
    'outcome',
    'value',
    'ROI',
    'capability',
    'maturity',
    'assessment',
    'brief',
    'recommendation',
    'next steps',
    'action items',
    'I recommend',
    'my recommendation',
  ],
  documentation: [
    'how to',
    'step by step',
    'getting started',
    'installation',
    'install',
    'configure',
    'configuration',
    'setup',
    'usage',
    'guide',
    'tutorial',
    'reference',
    'documentation',
    'quick start',
    'quickstart',
    'prerequisites',
    'requirements',
    'example',
    'examples',
    'run the command',
    'follow these steps',
    'use the following',
    'to do this',
    'first, then',
    'user guide',
    'cheat sheet',
    'command reference',
    'options table',
    'parameter',
    'output format',
    'troubleshooting',
    'common issues',
    'FAQ',
  ],
};

const AUDIENCE_SIGNALS: Record<ContentMode, string[]> = {
  'thought-leadership': [
    'readers',
    'community',
    'audience',
    'subscribers',
    'followers',
    'practitioners',
    'anyone who',
  ],
  architecture: [
    'engineers',
    'developers',
    'ops team',
    'technical team',
    'dev team',
    'architects',
    'platform team',
    'SRE',
    'DevOps',
  ],
  advisory: [
    'leadership',
    'executives',
    'stakeholders',
    'board',
    'C-suite',
    'VP',
    'director',
    'decision makers',
    'sponsors',
  ],
  documentation: [
    'users',
    'new users',
    'beginners',
    'developers using',
    'anyone looking to',
    'getting started',
    'first-time users',
    'end users',
    'all users',
    'target audience',
  ],
};

const STRUCTURE_SIGNALS: Record<ContentMode, RegExp[]> = {
  'thought-leadership': [
    /^#+\s*The Tension/im,
    /^#+\s*What I Think/im,
    /^#+\s*Questions/im,
    /^#+\s*Observations/im,
    /\?\s*\n/g, // Questions in the content
  ],
  architecture: [
    /^#+\s*System Context/im,
    /^#+\s*Container/im,
    /^#+\s*Component/im,
    /^#+\s*Deployment/im,
    /^#+\s*Building Blocks/im,
    /^#+\s*Runtime/im,
    /^#+\s*Decisions?/im,
    /^#+\s*ADR/im,
    /```mermaid/i,
    /```d2/i,
  ],
  advisory: [
    /^#+\s*Executive Summary/im,
    /^#+\s*Recommendations?/im,
    /^#+\s*Next Steps/im,
    /^#+\s*Action Items/im,
    /^#+\s*Roadmap/im,
    /^#+\s*Strategic/im,
    /^#+\s*Assessment/im,
  ],
  documentation: [
    /^#+\s*Getting Started/im,
    /^#+\s*Installation/im,
    /^#+\s*Prerequisites/im,
    /^#+\s*Configuration/im,
    /^#+\s*Usage/im,
    /^#+\s*Quick Start/im,
    /^#+\s*Examples?/im,
    /^#+\s*Commands?/im,
    /^#+\s*Options?/im,
    /^#+\s*Reference/im,
    /^#+\s*Troubleshooting/im,
    /^#+\s*FAQ/im,
    /^#+\s*Common Issues/im,
    /^#+\s*Step \d+/im,
    /^#+\s*\d+\.\s+\w/im, // Numbered steps like "## 1. Install"
    /```bash/i, // Code blocks with commands
    /\|\s*Option\s*\|/i, // Tables with options
    /\|\s*Command\s*\|/i, // Tables with commands
  ],
};

const TYPE_TO_MODE: Record<string, ContentMode> = {
  // Thought Leadership
  post: 'thought-leadership',
  article: 'thought-leadership',
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
=======
} from '../../core/types/index.js';
import {
  getAllModes,
  getModeForContentType,
  isValidMode,
  getDefaultModeId,
} from '../../core/registries/mode-registry.js';
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

// =============================================================================
// Classifier Implementation
// =============================================================================

export class ContentClassifier {
  private readonly keywordWeight: number;
  private readonly audienceWeight: number;
  private readonly structureWeight: number;
  private readonly typeWeight: number;

  constructor(
    weights: {
      keyword?: number;
      audience?: number;
      structure?: number;
      type?: number;
    } = {}
  ) {
    this.keywordWeight = weights.keyword ?? 1.0;
    this.audienceWeight = weights.audience ?? 1.5;
    this.structureWeight = weights.structure ?? 1.2;
    this.typeWeight = weights.type ?? 2.0; // Output type is strongest signal
  }

  /**
   * Classify input content to determine the appropriate mode
   */
  async classify(input: string, requestedType?: string): Promise<ClassificationResult> {
    const signals: ClassificationSignal[] = [];
<<<<<<< HEAD
    const scores: Record<ContentMode, number> = {
      'thought-leadership': 0,
      architecture: 0,
      advisory: 0,
      documentation: 0,
    };

    // Collect keyword signals
    for (const [mode, keywords] of Object.entries(KEYWORD_SIGNALS)) {
      for (const keyword of keywords) {
=======
    const scores: Record<string, number> = {};
    const registeredModes = getAllModes();

    // Initialize scores for all registered modes
    for (const mode of registeredModes) {
      scores[mode.id] = 0;
    }

    // Collect keyword signals
    for (const mode of registeredModes) {
      for (const keyword of mode.signals.keywords) {
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
        if (input.toLowerCase().includes(keyword.toLowerCase())) {
          const signal: ClassificationSignal = {
            type: 'keyword',
            value: keyword,
            weight: this.keywordWeight,
<<<<<<< HEAD
            matchedMode: mode as ContentMode,
          };
          signals.push(signal);
          scores[mode as ContentMode] += this.keywordWeight;
=======
            matchedMode: mode.id,
          };
          signals.push(signal);
          scores[mode.id] += this.keywordWeight;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
        }
      }
    }

    // Collect audience signals
<<<<<<< HEAD
    for (const [mode, markers] of Object.entries(AUDIENCE_SIGNALS)) {
      for (const marker of markers) {
=======
    for (const mode of registeredModes) {
      for (const marker of mode.signals.audience) {
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
        if (input.toLowerCase().includes(marker.toLowerCase())) {
          const signal: ClassificationSignal = {
            type: 'audience',
            value: marker,
            weight: this.audienceWeight,
<<<<<<< HEAD
            matchedMode: mode as ContentMode,
          };
          signals.push(signal);
          scores[mode as ContentMode] += this.audienceWeight;
=======
            matchedMode: mode.id,
          };
          signals.push(signal);
          scores[mode.id] += this.audienceWeight;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
        }
      }
    }

    // Collect structure signals
<<<<<<< HEAD
    for (const [mode, patterns] of Object.entries(STRUCTURE_SIGNALS)) {
      for (const pattern of patterns) {
=======
    for (const mode of registeredModes) {
      for (const pattern of mode.signals.structure) {
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
        if (pattern.test(input)) {
          const signal: ClassificationSignal = {
            type: 'structure',
            value: pattern.source,
            weight: this.structureWeight,
<<<<<<< HEAD
            matchedMode: mode as ContentMode,
          };
          signals.push(signal);
          scores[mode as ContentMode] += this.structureWeight;
=======
            matchedMode: mode.id,
          };
          signals.push(signal);
          scores[mode.id] += this.structureWeight;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
        }
      }
    }

    // Apply output type signal (strongest)
<<<<<<< HEAD
    if (requestedType && TYPE_TO_MODE[requestedType]) {
      const mappedMode = TYPE_TO_MODE[requestedType];
      const signal: ClassificationSignal = {
        type: 'output-type',
        value: requestedType,
        weight: this.typeWeight,
        matchedMode: mappedMode,
      };
      signals.push(signal);
      scores[mappedMode] += this.typeWeight;
=======
    if (requestedType) {
      const mappedMode = getModeForContentType(requestedType);
      if (mappedMode && scores[mappedMode] !== undefined) {
        const signal: ClassificationSignal = {
          type: 'output-type',
          value: requestedType,
          weight: this.typeWeight,
          matchedMode: mappedMode,
        };
        signals.push(signal);
        scores[mappedMode] += this.typeWeight;
      }
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    }

    // Determine winning mode
    const sortedModes = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
<<<<<<< HEAD
      .map(([mode, score]) => ({ mode: mode as ContentMode, score }));

    const topMode = sortedModes[0];
=======
      .map(([mode, score]) => ({ mode, score }));

    const defaultModeId = getDefaultModeId();
    const topMode = sortedModes[0] ?? { mode: defaultModeId, score: 0 };
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    const totalScore = sortedModes.reduce((sum, { score }) => sum + score, 0);
    const confidence = totalScore > 0 ? topMode.score / totalScore : 0.33;

    // Build alternative modes
    const alternativeModes = sortedModes.slice(1).map(({ mode, score }) => ({
      mode,
      confidence: totalScore > 0 ? score / totalScore : 0.33,
    }));

    return {
      mode: topMode.mode,
      confidence: Math.round(confidence * 100) / 100,
      signals,
      alternativeModes,
    };
  }

  /**
   * Get the default mode for a content type
   */
<<<<<<< HEAD
  getDefaultMode(contentType: ContentType): ContentMode {
    return TYPE_TO_MODE[contentType] ?? 'advisory';
=======
  getDefaultMode(contentType: string): string {
    return getModeForContentType(contentType);
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  }

  /**
   * Check if a mode is valid
   */
<<<<<<< HEAD
  isValidMode(mode: string): mode is ContentMode {
    return ['thought-leadership', 'architecture', 'advisory', 'documentation'].includes(mode);
=======
  isValidMode(mode: string): boolean {
    return isValidMode(mode);
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  }
}

// =============================================================================
// Factory Function
// =============================================================================

export function createClassifier(weights?: {
  keyword?: number;
  audience?: number;
  structure?: number;
  type?: number;
}): ContentClassifier {
  return new ContentClassifier(weights);
}

// =============================================================================
// Standalone Classification Function
// =============================================================================

/**
 * Quick classification without instantiating a classifier
 */
export async function classifyContent(
  input: string,
  requestedType?: string
): Promise<ClassificationResult> {
  const classifier = new ContentClassifier();
  return classifier.classify(input, requestedType);
}
