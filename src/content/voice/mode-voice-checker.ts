/**
 * Mode-Aware Voice Checker
 *
 * Checks content voice based on the detected or specified content mode.
 * Each mode has distinct voice characteristics and quality indicators.
 */

import type { ContentMode } from '../../core/types/index.js';

export interface ModeVoiceCheckResult {
  mode: ContentMode;
  score: number; // 0-10
  passed: boolean;
  issues: string[];
  strengths: string[];
}

// =============================================================================
// Mode-Specific Rules
// =============================================================================

interface ModeVoiceRules {
  name: string;
  openingPatterns: {
    required: RegExp[];
    forbidden: RegExp[];
    requiredDescription: string;
    forbiddenDescription: string;
  };
  voiceMarkers: {
    positive: RegExp[];
    negative: RegExp[];
    positiveDescription: string;
    negativeDescription: string;
  };
  structuralPatterns: {
    required: RegExp[];
    requiredDescription: string;
  };
  jargonToAvoid: string[];
}

const MODE_RULES: Record<ContentMode, ModeVoiceRules> = {
  'thought-leadership': {
    name: 'Thought Leadership',
    openingPatterns: {
      required: [/[?]/, /tension|uncomfortable|dilemma|challenge|paradox/i],
      forbidden: [/^In this (post|article)/im, /^This guide shows/im],
      requiredDescription: 'question or tension hook',
      forbiddenDescription: 'academic or instructional openings',
    },
    voiceMarkers: {
      positive: [
        /I used to|Now I|I've changed/i,
        /for now|today|here's where I've landed/i,
        /But that (brings up|raises)/i,
        /I wonder|What if/i,
      ],
      negative: [/you should always/i, /the right way to/i, /step \d+:/i],
      positiveDescription: 'evolution patterns, provisional language, self-interrogation',
      negativeDescription: 'prescriptive authority, numbered steps',
    },
    structuralPatterns: {
      required: [/^\*\*[^*]+\*\*$/m],
      requiredDescription: 'bold section headers',
    },
    jargonToAvoid: ['leverage', 'synergize', 'drive value', 'stakeholders'],
  },

  architecture: {
    name: 'Solution Architecture',
    openingPatterns: {
      required: [/^(The|This) (system|solution|architecture)/im, /provides|enables|uses/i],
      forbidden: [/[?]/, /I think|I believe|perhaps/i],
      requiredDescription: 'definitive system statements',
      forbiddenDescription: 'questions or provisional language',
    },
    voiceMarkers: {
      positive: [
        /```(mermaid|d2|yaml|json|typescript)/i,
        /\|\s*\w+\s*\|/i, // Tables
        /\d+ (MB|GB|ms|seconds|minutes)/i, // Specific measurements
      ],
      negative: [/for now|here's where I've landed/i, /I wonder|what if/i],
      positiveDescription: 'diagrams, tables, specific measurements',
      negativeDescription: 'provisional or exploratory language',
    },
    structuralPatterns: {
      required: [/^#+\s*(System|Container|Component|Deployment|Architecture)/im],
      requiredDescription: 'architecture section headers',
    },
    jargonToAvoid: [], // Architecture docs can use technical jargon
  },

  advisory: {
    name: 'Executive Advisory',
    openingPatterns: {
      required: [/recommend|assessment|strategic/i, /you(r)?( organization)?/i],
      forbidden: [/I used to think/i, /what if/i],
      requiredDescription: 'recommendations or strategic framing',
      forbiddenDescription: 'exploratory or questioning openings',
    },
    voiceMarkers: {
      positive: [
        /I recommend/i,
        /based on (our|my) (assessment|analysis|experience)/i,
        /I've seen this (pattern|across)/i,
        /your (organization|team|company)/i,
      ],
      negative: [/for now|provisional/i, /I wonder/i],
      positiveDescription: 'confident recommendations, pattern recognition',
      negativeDescription: 'provisional or uncertain language',
    },
    structuralPatterns: {
      required: [/^#+\s*(Executive Summary|Recommendations?|Next Steps)/im],
      requiredDescription: 'advisory section headers',
    },
    jargonToAvoid: ['synergize', 'paradigm shift'],
  },

  documentation: {
    name: 'Documentation',
    openingPatterns: {
      required: [
        /^(This|The) (guide|tutorial|document|reference)/im,
        /(shows|explains|covers|helps) (you|how)/i,
      ],
      forbidden: [/[?]$/, /I've been thinking|tension|uncomfortable/i],
      requiredDescription: 'user benefit statement',
      forbiddenDescription: 'questions or exploratory language',
    },
    voiceMarkers: {
      positive: [
        /^(Run|Install|Configure|Create|Add|Open|Click|Type|Enter)[\s:]/im, // Imperative verbs
        /```bash/i, // Code blocks
        /\d+\.\s+\w/m, // Numbered steps
        /\|\s*Option\s*\||\|\s*Command\s*\|/i, // Option/command tables
      ],
      negative: [
        /I think|I believe|perhaps/i,
        /for now|here's where I've landed/i,
        /tension|uncomfortable|dilemma/i,
      ],
      positiveDescription: 'imperative verbs, code blocks, numbered steps, tables',
      negativeDescription: 'provisional, exploratory, or thought-leadership language',
    },
    structuralPatterns: {
      required: [
        /^#+\s*(Getting Started|Installation|Usage|Examples?|Prerequisites|Quick Start)/im,
      ],
      requiredDescription: 'documentation section headers',
    },
    jargonToAvoid: [], // Documentation should be clear, but technical terms are fine
  },
};

// =============================================================================
// Mode-Aware Checker
// =============================================================================

/**
 * Check content voice for a specific mode
 */
export function checkVoiceForMode(content: string, mode: ContentMode): ModeVoiceCheckResult {
  const rules = MODE_RULES[mode];
  const issues: string[] = [];
  const strengths: string[] = [];
  let score = 10;

  // Check opening patterns
  const firstParagraph = content.split('\n\n')[0] || '';
  const hasRequiredOpening = rules.openingPatterns.required.some((pattern) =>
    pattern.test(firstParagraph)
  );
  const hasForbiddenOpening = rules.openingPatterns.forbidden.some((pattern) =>
    pattern.test(firstParagraph)
  );

  if (!hasRequiredOpening) {
    issues.push(`Opening lacks ${rules.openingPatterns.requiredDescription}`);
    score -= 2;
  } else {
    strengths.push(`Strong opening with ${rules.openingPatterns.requiredDescription}`);
  }

  if (hasForbiddenOpening) {
    issues.push(`Opening contains ${rules.openingPatterns.forbiddenDescription}`);
    score -= 1.5;
  }

  // Check positive voice markers
  const positiveMatches = rules.voiceMarkers.positive.filter((pattern) => pattern.test(content));
  if (positiveMatches.length === 0) {
    issues.push(`Missing ${rules.voiceMarkers.positiveDescription}`);
    score -= 1.5;
  } else if (positiveMatches.length >= 2) {
    strengths.push(`Uses ${rules.voiceMarkers.positiveDescription}`);
  }

  // Check negative voice markers
  const negativeMatches = rules.voiceMarkers.negative.filter((pattern) => pattern.test(content));
  if (negativeMatches.length > 0) {
    issues.push(`Contains ${rules.voiceMarkers.negativeDescription}`);
    score -= negativeMatches.length * 0.75;
  }

  // Check structural patterns
  const hasRequiredStructure = rules.structuralPatterns.required.some((pattern) =>
    pattern.test(content)
  );
  if (!hasRequiredStructure) {
    issues.push(`Missing ${rules.structuralPatterns.requiredDescription}`);
    score -= 0.5;
  } else {
    strengths.push(`Has ${rules.structuralPatterns.requiredDescription}`);
  }

  // Check jargon
  for (const jargon of rules.jargonToAvoid) {
    if (content.toLowerCase().includes(jargon.toLowerCase())) {
      issues.push(`Contains jargon: "${jargon}"`);
      score -= 0.5;
    }
  }

  // Mode-specific bonus checks
  if (mode === 'documentation') {
    // Documentation should have code blocks
    const codeBlockCount = (content.match(/```/g) || []).length / 2;
    if (codeBlockCount >= 2) {
      strengths.push('Good use of code examples');
      score = Math.min(10, score + 0.5);
    }

    // Documentation should have numbered steps or bullet lists
    const hasSteps = /^\d+\.\s+/m.test(content) || /^[-*]\s+/m.test(content);
    if (hasSteps) {
      strengths.push('Uses numbered steps or lists');
      score = Math.min(10, score + 0.5);
    }

    // Documentation should use "you" / "your"
    const youCount = (content.match(/\byou(r)?\b/gi) || []).length;
    if (youCount >= 5) {
      strengths.push('Good use of direct "you" address');
    } else if (youCount === 0) {
      issues.push('Missing direct "you" address to user');
      score -= 0.5;
    }
  }

  if (mode === 'architecture') {
    // Architecture should have technical specificity
    const hasSpecifics = /\d+\s*(MB|GB|ms|seconds|minutes|KB|TB)/i.test(content);
    if (hasSpecifics) {
      strengths.push('Includes specific measurements');
    }

    // Architecture should reference diagrams
    const hasDiagramRef = /Figure \d+|diagram|see (above|below)/i.test(content);
    if (hasDiagramRef) {
      strengths.push('References diagrams');
    }
  }

  if (mode === 'advisory') {
    // Advisory should use confident recommendations
    const recommendCount = (content.match(/I recommend|recommend that you/gi) || []).length;
    if (recommendCount >= 2) {
      strengths.push('Uses confident recommendations');
    } else if (recommendCount === 0) {
      issues.push('Missing clear recommendations');
      score -= 1;
    }
  }

  if (mode === 'thought-leadership') {
    // Thought leadership should show evolution
    const hasEvolution = /I used to|Now I|my thinking (has )?evolved/i.test(content);
    if (hasEvolution) {
      strengths.push('Shows evolution of thinking');
    }

    // Thought leadership should end provisionally
    const lastParagraph = content.split('\n\n').pop() || '';
    const hasProvisionalEnding = /for now|today|where I've landed/i.test(lastParagraph);
    if (hasProvisionalEnding) {
      strengths.push('Ends provisionally');
    }
  }

  score = Math.max(0, Math.min(10, score));

  return {
    mode,
    score: Math.round(score * 10) / 10,
    passed: score >= 7,
    issues,
    strengths,
  };
}

/**
 * Get voice instructions for a specific mode
 */
export function getVoiceInstructionsForMode(mode: ContentMode): string {
  const instructions: Record<ContentMode, string> = {
    'thought-leadership': `
You are writing thought leadership content. Key principles:

1. **Open with tension or questions**, never with thesis statements
2. **Show the work**, not just conclusions
3. **Include self-interrogation** without self-doubt
4. **End provisionally** ("Here's what I think today")
5. **Use intentional fragments** for rhythm
6. **Avoid corporate jargon** and academic distance
7. **Ground in actual experience**, not theory

Voice markers to include:
- Question-first openings
- "I used to think X, now I think Y" evolution patterns
- Self-interrogation moments ("But that brings up a question...")
- Provisional language ("for now," "today")
- Bold section headers for scannability

Avoid:
- Prescriptive authority ("You should always")
- Academic distance ("Research shows")
- Numbered steps or instructional language
`,

    architecture: `
You are writing technical architecture documentation. Key principles:

1. **Lead with conclusions**, not questions
2. **Be definitive**: "The system uses X" not "I think we should use X"
3. **Complete sentences**, no fragments
4. **Diagrams over prose** - reference visual elements
5. **Reference-grade precision** - implementable from documentation
6. **No provisional language**

Voice markers to include:
- Definitive system statements
- Specific measurements (MB, ms, requests/second)
- Architecture section headers (System Context, Container, etc.)
- Tables for component details
- Code blocks for configurations

Avoid:
- Questions or exploratory language
- Provisional phrases ("for now," "here's where I've landed")
- Personal opinions without technical justification
`,

    advisory: `
You are writing executive advisory content. Key principles:

1. **Lead with business outcomes**, not technical details
2. **Confident recommendations**: "I recommend..." not "You might consider..."
3. **Pattern recognition**: "I've seen this across retail, manufacturing..."
4. **Ground in client context**: Reference actual conversations
5. **Structured clarity**: Scannable headers, tables, bullets
6. **Consultant perspective**: External advisor, not internal team

Voice markers to include:
- Clear recommendations with "I recommend"
- Pattern recognition statements
- Use "you" / "your organization" naturally
- Executive summary, recommendations, next steps sections

Avoid:
- Technical deep dives (save for appendix)
- Provisional or uncertain language
- Exploratory questions
`,

    documentation: `
You are writing user documentation. Key principles:

1. **Lead with what the user will accomplish**
2. **Be direct and instructional**: "Run this command..." not "You might want to run..."
3. **Use numbered steps for procedures**
4. **Tables over paragraphs** for options and commands
5. **Show before you tell**: Example first, then explanation
6. **Code blocks generously** - copy-paste friendly

Voice markers to include:
- Imperative verbs (Run, Install, Configure, Create)
- Numbered steps for all procedures
- Code blocks with bash commands
- Tables for options, commands, parameters
- Direct "you" address

Avoid:
- Questions or tension openings
- Provisional language ("for now," "here's where I've landed")
- Exploratory or thought-leadership patterns
- Walls of text without structure
`,
  };

  return instructions[mode];
}

/**
 * Detect mode mismatches in content
 */
export function detectModeMismatch(
  content: string,
  intendedMode: ContentMode
): { mismatch: boolean; detectedMode?: ContentMode; reason?: string } {
  const intendedResult = checkVoiceForMode(content, intendedMode);

  // Check against other modes
  const otherModes = (['thought-leadership', 'architecture', 'advisory', 'documentation'] as ContentMode[])
    .filter((m) => m !== intendedMode);

  for (const otherMode of otherModes) {
    const otherResult = checkVoiceForMode(content, otherMode);
    if (otherResult.score > intendedResult.score + 2) {
      return {
        mismatch: true,
        detectedMode: otherMode,
        reason: `Content scores ${otherResult.score} for ${otherMode} but only ${intendedResult.score} for ${intendedMode}`,
      };
    }
  }

  return { mismatch: false };
}
