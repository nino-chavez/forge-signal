import type { AIProviderInterface, GenerateOptions } from '../../providers/ai-provider.js';
import type { ReaderContract, ReaderPlainness } from '../../core/types/index.js';
import { getVoiceInstructionsForMode } from '../../content/voice/mode-voice-checker.js';

export type DocumentationType = 'guide' | 'reference' | 'tutorial' | 'explanation';

export interface DocumentationWriterInput {
  rawContent: string;
  documentationType: DocumentationType;
  context?: string;
  /** Legacy alias; readerContract.reader takes precedence. */
  audience?: string;
  productName?: string;
  readerContract?: ReaderContract;
}

export interface DocumentationWriterOutput {
  draft: string;
  metadata?: {
    provider: string;
    model?: string;
  };
}

interface ResolvedReaderContract {
  reader: string;
  job: string;
  assumedKnowledge: string[];
  plainness: ReaderPlainness;
  precisionLocks: string[];
  keepTerms: string[];
  avoidTerms: Record<string, string>;
}

/** Generate documentation around one reader job instead of a universal template. */
export class DocumentationWriter {
  constructor(private provider: AIProviderInterface) {}

  async generate(input: DocumentationWriterInput): Promise<DocumentationWriterOutput> {
    const options: GenerateOptions = {
      prompt: this.buildPrompt(input),
      systemInstruction: this.buildSystemInstruction(input),
      temperature: 0.5,
      maxTokens: this.getMaxTokens(input.documentationType),
    };
    const result = await this.provider.generate(options);
    return {
      draft: result.content,
      metadata: { provider: result.provider, model: result.model },
    };
  }

  private resolveReader(input: DocumentationWriterInput): ResolvedReaderContract {
    const contract = input.readerContract ?? {};
    return {
      reader: contract.reader || input.audience || 'the named user of this documentation',
      job: contract.job || this.defaultJob(input.documentationType),
      assumedKnowledge: contract.assumedKnowledge ?? [],
      plainness: contract.plainness ?? 'practitioner',
      precisionLocks: contract.precisionLocks ?? [],
      keepTerms: contract.keepTerms ?? [],
      avoidTerms: contract.avoidTerms ?? {},
    };
  }

  private buildSystemInstruction(input: DocumentationWriterInput): string {
    const reader = this.resolveReader(input);
    const voiceInstructions = getVoiceInstructionsForMode('documentation');
    const productName = input.productName || 'the product';
    const assumed = reader.assumedKnowledge.length ? reader.assumedKnowledge.join(', ') : 'no project history or internal implementation knowledge';
    const locks = reader.precisionLocks.length ? reader.precisionLocks.join(', ') : 'facts, field names, commands, numbers, and citations';
    const keep = reader.keepTerms.length ? reader.keepTerms.join(', ') : 'none declared';
    const avoid = Object.entries(reader.avoidTerms).length
      ? Object.entries(reader.avoidTerms).map(([term, replacement]) => `${term} → ${replacement}`).join('; ')
      : 'none declared';

    return `You are a reader-centered documentation writer for ${productName}.

Reader contract:
- Reader: ${reader.reader}
- Reader job: ${reader.job}
- Assumed knowledge: ${assumed}
- Plainness: ${reader.plainness}
- Precision locks: ${locks}
- Keep terms: ${keep}
- Avoid/replace terms: ${avoid}

Rules:
1. Lead with what the reader will understand, decide, or accomplish.
2. Include only sections that serve the reader job. Do not add Quick Start, examples, code, tables, or troubleshooting by reflex.
3. Use ordinary connective language. Keep load-bearing domain terms and define them inline when the reader may not know them.
4. Preserve every precision lock. Never invent facts, commands, output, prerequisites, or product behavior.
5. Use short paragraphs and one primary idea per sentence when the material is difficult.
6. Do not expose framework, pipeline, methodology, or agent language unless the reader needs it.
7. Use Diátaxis for this document's primary job; do not mix tutorial, how-to, reference, and explanation structures.

${voiceInstructions}

${this.getTypeInstructions(input.documentationType)}`;
  }

  private buildPrompt(input: DocumentationWriterInput): string {
    const reader = this.resolveReader(input);
    return `Create ${input.documentationType} documentation for this reader job:

${reader.job}

${input.context ? `Context:\n${input.context}\n\n` : ''}Source material:
${input.rawContent}

Return the complete document. Start with the outcome or answer the reader came for. Preserve the source's facts and precision locks. Omit any conventional section that does not help this reader complete the declared job.`;
  }

  private defaultJob(type: DocumentationType): string {
    switch (type) {
      case 'tutorial': return 'Learn one thing by completing a guided first run';
      case 'reference': return 'Look up an exact capability, field, command, option, or limit';
      case 'explanation': return 'Understand why the system works this way and what trade-offs matter';
      case 'guide': return 'Complete one practical task successfully';
    }
  }

  private getTypeInstructions(type: DocumentationType): string {
    switch (type) {
      case 'guide':
        return `Primary Diátaxis job: HOW-TO.
- Name the outcome first.
- Give the shortest reliable path in order.
- Include prerequisites, examples, expected output, and troubleshooting only when this task needs them.
- Keep theory and architecture in links or a separate explanation.`;
      case 'reference':
        return `Primary Diátaxis job: REFERENCE.
- Optimize for lookup, completeness, and stable terminology.
- Use tables only where repeated fields genuinely compare better in rows.
- Include examples only when they disambiguate syntax or behavior.
- Do not turn the page into a walkthrough.`;
      case 'tutorial':
        return `Primary Diátaxis job: TUTORIAL.
- Teach one learning objective through a guided sequence.
- State prerequisites, steps, verification, and a useful next step.
- Show expected output where it helps the learner know they are on track.
- Do not add unrelated feature coverage or exhaustive reference material.`;
      case 'explanation':
        return `Primary Diátaxis job: EXPLANATION.
- Explain context, causal relationships, trade-offs, and why decisions matter.
- Lead with the conclusion the reader needs before the history.
- Use examples or diagrams only when they make the relationship easier to understand.
- Do not force commands, Quick Start, numbered procedures, or troubleshooting into this document.`;
    }
  }

  private getMaxTokens(type: DocumentationType): number {
    switch (type) {
      case 'guide': return 5000;
      case 'reference': return 5000;
      case 'tutorial': return 4000;
      case 'explanation': return 5000;
    }
  }
}
