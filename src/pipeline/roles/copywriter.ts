import type { AIProviderInterface, GenerateOptions } from '../../providers/ai-provider.js';
import { getVoiceInstructions } from '../../content/voice/voice-guide.js';
import { loadConfig } from '../../core/config.js';
<<<<<<< HEAD
=======
import { getModeForContentType } from '../../core/registries/mode-registry.js';
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

export interface CopywriterInput {
  draft: string;
  contentType: 'deck' | 'pov' | 'paper';
  audience?: string;
  strategicObjectives?: string[];
}

export interface CopywriterOutput {
  refined: string;
  changes?: string[];
  metadata?: {
    provider: string;
    model?: string;
  };
}

/**
 * Copywriter Role
<<<<<<< HEAD
 * 
=======
 *
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
 * Refines ghost-written content for clarity, impact, and strategic precision
 * Preserves voice authenticity while enhancing structure
 */
export class Copywriter {
  constructor(private provider: AIProviderInterface) {}

  async refine(input: CopywriterInput): Promise<CopywriterOutput> {
    const systemInstruction = this.buildSystemInstruction(input);
    const prompt = this.buildPrompt(input);

    const options: GenerateOptions = {
      prompt,
      systemInstruction,
      temperature: 0.6, // Lower temperature for refinement
      maxTokens: this.getMaxTokens(input.contentType),
    };

    const result = await this.provider.generate(options);

    return {
      refined: result.content,
      metadata: {
        provider: result.provider,
        model: result.model,
      },
    };
  }

  private buildSystemInstruction(input: CopywriterInput): string {
<<<<<<< HEAD
    const voiceInstructions = getVoiceInstructions();
    
    const config = loadConfig();
    const { author } = config;
    
=======
    const mode = getModeForContentType(input.contentType);
    const voiceInstructions = getVoiceInstructions(mode);

    const config = loadConfig();
    const { author } = config;

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return `You are ${author}'s Copywriter for strategic content. Your role is to:

1. **Preserve Voice**: Keep the ghost writer's authentic voice—don't over-polish
2. **Strengthen Structure**: Ensure logical flow, clear transitions, scannable headers
3. **Sharpen Language**: Make every word count—remove filler, strengthen key points
4. **Audience Optimization**: Adjust tone slightly for audience (${input.audience || 'strategic/executive'})
5. **Strategic Precision**: Ensure strategic recommendations are clear, actionable, and grounded

<<<<<<< HEAD
**Perspective Check**: Ensure content reads as an internal team member providing strategic guidance to leadership and cross-functional stakeholders. Remove any consultant or external advisory framing.

**Internal Voice**:
- Use "we" / "our" / "our team" — this is internal
- No "your organization" or "the client" language
- Direct, collaborative tone — we're aligned on the same goals

${voiceInstructions}

What to enhance:
- Opening hooks (make them more compelling while keeping tension)
=======
${voiceInstructions}

What to enhance:
- Opening hooks (make them more compelling while keeping voice)
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
- Section transitions (smooth but not formulaic)
- Key strategic points (emphasize without being prescriptive)
- Examples and evidence (make them more specific and impactful)
- Calls to action (clear but not pushy)
<<<<<<< HEAD
- Natural client references (use "you" instead of repeated client name)

What NOT to change:
- Intentional fragments (they're there for rhythm)
- Provisional language ("for now" is intentional)
- Self-interrogation moments (they show the work)
- Rough edges that sound authentic
- The core strategic thinking
- Natural conversational flow

Voice checkpoints:
- Does it still sound like ${author} thinking out loud?
- Are conclusions still provisional?
- Is the work still visible (not just polished conclusions)?
- Does it invite the reader to think alongside, not just receive wisdom?
- Is it professional but not sterile?
- Are client references natural ("you" vs. repeated client name)?`;
=======

What NOT to change:
- Intentional voice markers (they're there for a reason)
- The core strategic thinking
- Natural conversational flow
- Rough edges that sound authentic

Voice checkpoints:
- Does it still sound like ${author}?
- Is the voice consistent with ${mode} mode?
- Is the work still visible (not just polished conclusions)?
- Is it professional but not sterile?`;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  }

  private buildPrompt(input: CopywriterInput): string {
    let prompt = `Refine this strategic content draft:\n\n`;
    prompt += `Content Type: ${input.contentType}\n`;
<<<<<<< HEAD
    
    if (input.audience) {
      prompt += `Target Audience: ${input.audience}\n`;
    }
    
    if (input.strategicObjectives && input.strategicObjectives.length > 0) {
      prompt += `Strategic Objectives:\n${input.strategicObjectives.map(obj => `- ${obj}`).join('\n')}\n\n`;
    }
    
=======

    if (input.audience) {
      prompt += `Target Audience: ${input.audience}\n`;
    }

    if (input.strategicObjectives && input.strategicObjectives.length > 0) {
      prompt += `Strategic Objectives:\n${input.strategicObjectives.map(obj => `- ${obj}`).join('\n')}\n\n`;
    }

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    prompt += `Original Draft:\n${input.draft}\n\n`;
    prompt += `Refine this content to:\n`;
    prompt += `- Enhance clarity without losing voice\n`;
    prompt += `- Strengthen strategic arguments\n`;
    prompt += `- Optimize for ${input.audience || 'executive'} audience\n`;
    prompt += `- Preserve all voice markers and authenticity\n`;
    prompt += `- Make strategic recommendations more actionable\n`;
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return prompt;
  }

  private getMaxTokens(contentType: 'deck' | 'pov' | 'paper'): number {
    // Copywriter may expand content slightly, so allow more tokens
    switch (contentType) {
      case 'deck':
        return 5000;
      case 'pov':
        return 2500;
      case 'paper':
        return 10000;
      default:
        return 5000;
    }
  }
}
<<<<<<< HEAD

=======
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
