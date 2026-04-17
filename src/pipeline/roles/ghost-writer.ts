import type { AIProviderInterface, GenerateOptions } from '../../providers/ai-provider.js';
import { getVoiceInstructions } from '../../content/voice/voice-guide.js';
import { loadConfig } from '../../core/config.js';
<<<<<<< HEAD
=======
import { getModeForContentType } from '../../core/registries/mode-registry.js';
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

export interface GhostWriterInput {
  rawContent: string;
  contentType: 'deck' | 'pov' | 'paper';
  context?: string;
  audience?: string;
}

export interface GhostWriterOutput {
  draft: string;
  alternativeAngles?: string[];
  metadata?: {
    provider: string;
    model?: string;
  };
}

/**
 * Ghost Writer Role
<<<<<<< HEAD
 * 
=======
 *
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
 * Generates initial content from raw input (meeting notes, recaps, etc.)
 * Applies voice principles from the start
 * May generate multiple angles/approaches
 */
export class GhostWriter {
  constructor(private provider: AIProviderInterface) {}

  async generate(input: GhostWriterInput): Promise<GhostWriterOutput> {
    const systemInstruction = this.buildSystemInstruction(input);
    const prompt = this.buildPrompt(input);

    const options: GenerateOptions = {
      prompt,
      systemInstruction,
      temperature: 0.8, // Higher creativity for initial generation
      maxTokens: this.getMaxTokens(input.contentType),
    };

    const result = await this.provider.generate(options);

    return {
      draft: result.content,
      metadata: {
        provider: result.provider,
        model: result.model,
      },
    };
  }

  private buildSystemInstruction(input: GhostWriterInput): string {
<<<<<<< HEAD
    const voiceInstructions = getVoiceInstructions();
    const contentTypeInstructions = this.getContentTypeInstructions(input.contentType);
    
    const config = loadConfig();
    const { author, persona, company } = config;
=======
    const mode = getModeForContentType(input.contentType);
    const voiceInstructions = getVoiceInstructions(mode);
    const contentTypeInstructions = this.getContentTypeInstructions(input.contentType);

    const config = loadConfig();
    const { author } = config;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

    return `You are ${author}'s Ghost Writer for strategic content. Your role is to:

1. **Absorb Context**: Read meeting notes, recaps, stakeholder concerns, and raw data
<<<<<<< HEAD
2. **Identify Tensions**: Find the uncomfortable truths, the questions that need answering
3. **Structure Strategically**: Choose the right structure based on content type (${input.contentType})
4. **Generate in Voice**: Write in ${author}'s voice—pattern recognition, provisional conclusions, showing the work
5. **Multiple Angles**: Consider different approaches to the same content

**Perspective**: Write from an internal team perspective, providing strategic guidance to leadership and cross-functional stakeholders within the organization.

**Internal Voice**:
- Use "we" / "our" / "our team" naturally — this is an internal document
- Reference specific teams, systems, and stakeholders by name where relevant
- Professional but direct — we're all on the same team
- No consultant framing — no "your organization" or "the client"

=======
2. **Identify Key Themes**: Find the central ideas and arguments
3. **Structure Strategically**: Choose the right structure based on content type (${input.contentType})
4. **Generate in Voice**: Write in the appropriate voice for ${mode} content
5. **Multiple Angles**: Consider different approaches to the same content

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
${voiceInstructions}

${contentTypeInstructions}

<<<<<<< HEAD
${input.audience ? `Target Audience: ${input.audience}` : ''}

Voice markers to include:
- Question-first openings (not thesis statements)
- "I used to think X, now I think Y" evolution patterns
- Self-interrogation moments ("But that brings up a question...")
- Provisional language ("For now," "Today," "Here's where I've landed")
- Intentional fragments for rhythm
- Specific examples over abstract theory
- Bold section headers for scannability
- Pattern recognition: "I've seen this tension across..."

Avoid:
- Corporate jargon ("leverage," "synergize," "drive value")
- Academic distance ("Research shows," "One could argue")
- Prescriptive authority ("You should always," "The right way to")
- Over-polished, sterile language
- Repeatedly using client name when "you" / "your organization" is more natural`;
  }

  private buildPrompt(input: GhostWriterInput): string {
    let prompt = `Generate strategic content from the following input:\n\n`;
    
    if (input.context) {
      prompt += `Context: ${input.context}\n\n`;
    }
    
    prompt += `Raw Input:\n${input.rawContent}\n\n`;
    
    prompt += `Generate ${input.contentType} content that:\n`;
    prompt += `- Opens with tension or a question\n`;
    prompt += `- Shows the work and thinking process\n`;
    prompt += `- Includes self-interrogation\n`;
    prompt += `- Ends provisionally\n`;
    prompt += `- Uses bold headers for structure\n`;
    prompt += `- Grounds recommendations in actual experience\n`;
    
=======
${input.audience ? `Target Audience: ${input.audience}` : ''}`;
  }

  private buildPrompt(input: GhostWriterInput): string {
    const mode = getModeForContentType(input.contentType);

    let prompt = `Generate strategic content from the following input:\n\n`;

    if (input.context) {
      prompt += `Context: ${input.context}\n\n`;
    }

    prompt += `Raw Input:\n${input.rawContent}\n\n`;

    prompt += `Generate ${input.contentType} content in ${mode} mode that:\n`;
    prompt += `- Follows the voice guidelines provided\n`;
    prompt += `- Uses bold headers for structure\n`;
    prompt += `- Grounds content in actual experience\n`;
    prompt += `- Is appropriate for the target audience\n`;

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return prompt;
  }

  private getContentTypeInstructions(contentType: 'deck' | 'pov' | 'paper'): string {
    switch (contentType) {
      case 'deck':
        return `Content Type: Strategic Deck/Slides
- Each slide should have one clear message
- Use slide titles as questions or tensions
- Bullet points as fragments (not full sentences)
<<<<<<< HEAD
- "For now" language in recommendations
- Show evolution ("We used to think X, now Y")
- Pattern recognition highlighted`;
      
=======
- Show evolution ("We used to think X, now Y")
- Pattern recognition highlighted`;

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
      case 'pov':
        return `Content Type: Short-Form Strategy POV (800-1200 words)
- Executive-friendly format
- Clear strategic recommendations upfront
- Concise but compelling evidence
- Actionable next steps
- Conversational but strategic tone`;
<<<<<<< HEAD
      
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
      case 'paper':
        return `Content Type: Long-Form Strategy Paper (3000-8000 words)
- Deep strategic thinking
- Detailed frameworks
- Comprehensive examples
- Nuances and edge cases explored
<<<<<<< HEAD
- Provisional conclusions with room for evolution`;
      
=======
- Thoughtful conclusions`;

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
      default:
        return '';
    }
  }

  private getMaxTokens(contentType: 'deck' | 'pov' | 'paper'): number {
    switch (contentType) {
      case 'deck':
        return 4000;
      case 'pov':
        return 2000;
      case 'paper':
        return 8000;
      default:
        return 4000;
    }
  }
}
<<<<<<< HEAD

=======
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
