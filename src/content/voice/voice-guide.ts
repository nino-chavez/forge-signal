/**
 * Voice & Tone Guide for Strategic Content
<<<<<<< HEAD
 * 
 * Adapted from Signal Dispatch blog voice guide for strategic content generation
 */

=======
 *
 * This module now delegates to the voice registry for mode-specific
 * instructions. The legacy exports (VOICE_RULES, PROVISIONAL_PHRASES,
 * EVOLUTION_PATTERN) are preserved for backward compatibility.
 */

import { loadConfig } from '../../core/config.js';
import { getVoiceInstructionsFromRegistry } from '../../core/registries/voice-registry.js';
import type { Perspective } from '../../core/registries/types.js';

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
export interface VoiceRules {
  openingPatterns: {
    questionFirst: boolean;
    uncomfortableTruth: boolean;
    avoidAcademic: string[];
    avoidCasual: string[];
  };
  structuralPatterns: {
    evolution: boolean;
    compareContrast: boolean;
    provisional: boolean;
    boldHeaders: boolean;
  };
  tonalElements: {
    selfInterrogation: boolean;
    culturalTouchstones: boolean;
    technicalDepth: boolean;
    conversational: boolean;
  };
  avoid: {
    corporateJargon: string[];
    academicDistance: string[];
    humbleBragging: string[];
    prescriptiveAuthority: string[];
  };
}

<<<<<<< HEAD
=======
/** @deprecated Use voice registry instead. Preserved for backward compatibility. */
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
export const VOICE_RULES: VoiceRules = {
  openingPatterns: {
    questionFirst: true,
    uncomfortableTruth: true,
    avoidAcademic: [
      "In this post, I'll explore...",
      "This essay examines...",
      "Research shows...",
    ],
    avoidCasual: [
      "Today I want to talk about...",
      "Hey everyone...",
    ],
  },
  structuralPatterns: {
    evolution: true,
    compareContrast: true,
    provisional: true,
    boldHeaders: true,
  },
  tonalElements: {
    selfInterrogation: true,
    culturalTouchstones: true,
    technicalDepth: true,
    conversational: true,
  },
  avoid: {
    corporateJargon: [
      "leverage",
      "synergize",
      "drive value",
      "stakeholders",
      "deliver impactful solutions",
    ],
    academicDistance: [
      "Research shows",
      "One could argue",
      "It is evident that",
    ],
    humbleBragging: [
      "I'm no expert, but",
      "This might be obvious, but",
      "I'm just a",
    ],
    prescriptiveAuthority: [
      "You should always",
      "The right way to",
      "Here are the 7 steps to",
    ],
  },
};

<<<<<<< HEAD
=======
/** @deprecated Use voice registry instead. */
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
export const PROVISIONAL_PHRASES = [
  "Here's where I've landed—for now",
  "This is what I think today",
  "For now, I'm trying to",
  "Maybe this isn't about X at all. Maybe it's about Y",
];

<<<<<<< HEAD
=======
/** @deprecated Use voice registry instead. */
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
export const EVOLUTION_PATTERN = {
  template: "I used to [OLD APPROACH]. Now [NEW APPROACH]. That sounds like progress. And it is. But it also brings up a real question: [TENSION].",
};

<<<<<<< HEAD
import { loadConfig } from '../../core/config.js';

export function getVoiceInstructions(): string {
  const config = loadConfig();
  const { author, persona, company } = config;

  return `
You are writing strategic content in ${author}'s voice as a ${persona} at ${company || 'a leading firm'}. Key principles:

1. **Open with tension or questions**, never with thesis statements
2. **Show the work**, not just conclusions
3. **Include self-interrogation** without self-doubt
4. **End provisionally** ("Here's what I think today")
5. **Use intentional fragments** for rhythm
6. **Avoid corporate jargon** and academic distance
7. **Ground in actual experience**, not theory
8. **Professional but conversational** - not sterile or overly formal

**Client Perspective & Tone:**
- Write from external consultant perspective providing strategic guidance TO the client
- Use "you" / "your organization" / "your org" naturally instead of repeatedly saying the client's name
- Mix of "you" (direct address) and third person ("your organization") for natural consultant voice
- Professional but not sterile - senior consultant expertise without corporate stiffness
- Show pattern recognition: "I've seen this tension across retail, manufacturing, and enterprise clients"
- Ground recommendations in actual client context from meetings/discussions

Voice markers:
- Question-first openings (not thesis statements)
- "I used to think X, now I think Y" evolution patterns
- Self-interrogation moments ("But that brings up a question...")
- Provisional language ("for now," "today," "here's where I've landed")
- Intentional fragments for rhythm
- Bold section headers for scannability
- Specific examples over abstract theory
- Pattern recognition across clients/industries

Avoid:
- Corporate jargon ("leverage," "synergize," "drive value")
- Academic distance ("Research shows," "One could argue")
- Prescriptive authority ("You should always," "The right way to")
- Over-polished, sterile language
- Repeatedly using client name when "you" / "your organization" is more natural
- Overly formal consultant-speak that sounds robotic
`;
}

=======
/**
 * Get voice instructions for a specific mode with perspective handling.
 *
 * @param mode - Content mode (defaults to 'thought-leadership' for backward compat)
 * @param perspective - Writing perspective (defaults to config-based or 'consultant')
 */
export function getVoiceInstructions(
  mode: string = 'thought-leadership',
  perspective?: Perspective
): string {
  const config = loadConfig();
  const effectivePerspective = perspective ?? (config as any).perspective ?? 'consultant';

  return getVoiceInstructionsFromRegistry(mode, effectivePerspective, {
    author: config.author,
    persona: config.persona,
    company: config.company,
  });
}
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
