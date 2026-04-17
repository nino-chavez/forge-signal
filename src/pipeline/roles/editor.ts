import type { AIProviderInterface, GenerateOptions } from '../../providers/ai-provider.js';
<<<<<<< HEAD
import { checkVoice, type VoiceCheckResult } from '../../content/voice/voice-checker.js';
import { loadConfig } from '../../core/config.js';
=======
import { checkVoiceForMode, type ModeVoiceCheckResult } from '../../content/voice/mode-voice-checker.js';
import { loadConfig } from '../../core/config.js';
import { getModeForContentType } from '../../core/registries/mode-registry.js';
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

export interface EditorInput {
  content: string;
  contentType: 'deck' | 'pov' | 'paper';
  strategicObjectives?: string[];
}

export interface EditorOutput {
  approved: boolean;
  finalContent?: string;
<<<<<<< HEAD
  voiceCheck: VoiceCheckResult;
=======
  voiceCheck: ModeVoiceCheckResult;
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
  strategicCheck: {
    passed: boolean;
    issues: string[];
  };
  feedback?: string;
  metadata?: {
    provider: string;
    model?: string;
  };
}

/**
 * Editor Role
<<<<<<< HEAD
 * 
=======
 *
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
 * Final quality assurance, voice consistency, strategic accuracy
 * Approves or requests revisions
 */
export class Editor {
  constructor(private provider: AIProviderInterface) {}

  async review(input: EditorInput): Promise<EditorOutput> {
<<<<<<< HEAD
    // Run voice check
    const voiceCheck = checkVoice(input.content);
    
    // Run strategic check
    const strategicCheck = this.checkStrategicAccuracy(input);
    
=======
    const mode = getModeForContentType(input.contentType);

    // Run mode-aware voice check
    const voiceCheck = checkVoiceForMode(input.content, mode);

    // Run strategic check
    const strategicCheck = this.checkStrategicAccuracy(input);

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    // If both pass, approve
    if (voiceCheck.passed && strategicCheck.passed) {
      return {
        approved: true,
        finalContent: input.content,
        voiceCheck,
        strategicCheck,
      };
    }
<<<<<<< HEAD
    
    // If issues found, generate feedback and potentially revised content
    const feedback = this.generateFeedback(voiceCheck, strategicCheck);
    
=======

    // If issues found, generate feedback and potentially revised content
    const feedback = this.generateFeedback(voiceCheck, strategicCheck);

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    // If voice score is very low, attempt auto-fix
    if (voiceCheck.score < 5) {
      const revised = await this.attemptFix(input, voiceCheck, strategicCheck);
      return {
        approved: revised !== null,
        finalContent: revised || input.content,
        voiceCheck,
        strategicCheck,
        feedback,
        metadata: revised ? { provider: 'editor-fix' } : undefined,
      };
    }
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return {
      approved: false,
      voiceCheck,
      strategicCheck,
      feedback,
    };
  }

  private checkStrategicAccuracy(input: EditorInput): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    const content = input.content.toLowerCase();
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    // Check for clear strategic recommendations
    const hasRecommendations = /recommend|suggest|should|next steps|action/i.test(input.content);
    if (!hasRecommendations && input.contentType !== 'paper') {
      issues.push('Missing clear strategic recommendations');
    }
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    // Check for evidence/examples
    const hasExamples = /example|instance|case|data|evidence/i.test(content);
    if (!hasExamples) {
      issues.push('Lacks concrete examples or evidence');
    }
<<<<<<< HEAD
    
    // Check for stakeholder concerns (if mentioned in objectives)
    if (input.strategicObjectives) {
      const objectivesText = input.strategicObjectives.join(' ').toLowerCase();
      // Basic check - could be more sophisticated
    }
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    // Check for next steps
    const hasNextSteps = /next steps|action items|recommendations|implementation/i.test(content);
    if (!hasNextSteps && input.contentType !== 'paper') {
      issues.push('Missing clear next steps or action items');
    }
<<<<<<< HEAD
    
    // Check for risk acknowledgment
    const hasRisks = /risk|trade.?off|challenge|limitation|consideration/i.test(content);
    // Not required but good to have
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return {
      passed: issues.length === 0,
      issues,
    };
  }

<<<<<<< HEAD
  private generateFeedback(voiceCheck: VoiceCheckResult, strategicCheck: { passed: boolean; issues: string[] }): string {
    const feedback: string[] = [];
    
=======
  private generateFeedback(voiceCheck: ModeVoiceCheckResult, strategicCheck: { passed: boolean; issues: string[] }): string {
    const feedback: string[] = [];

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    if (!voiceCheck.passed) {
      feedback.push('Voice Consistency Issues:');
      voiceCheck.issues.forEach(issue => feedback.push(`- ${issue}`));
    }
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    if (voiceCheck.strengths.length > 0) {
      feedback.push('\nVoice Strengths:');
      voiceCheck.strengths.forEach(strength => feedback.push(`- ${strength}`));
    }
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    if (!strategicCheck.passed) {
      feedback.push('\nStrategic Accuracy Issues:');
      strategicCheck.issues.forEach(issue => feedback.push(`- ${issue}`));
    }
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return feedback.join('\n');
  }

  private async attemptFix(
    input: EditorInput,
<<<<<<< HEAD
    voiceCheck: VoiceCheckResult,
=======
    voiceCheck: ModeVoiceCheckResult,
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    strategicCheck: { passed: boolean; issues: string[] }
  ): Promise<string | null> {
    // Only attempt fix if voice score is very low
    if (voiceCheck.score >= 5) {
      return null;
    }
<<<<<<< HEAD
    
    const config = loadConfig();
    const systemInstruction = `You are an editor fixing voice consistency issues. Fix the content to match ${config.author}'s voice while preserving the strategic content.`;
    
=======

    const config = loadConfig();
    const mode = getModeForContentType(input.contentType);
    const systemInstruction = `You are an editor fixing voice consistency issues for ${mode} content. Fix the content to match ${config.author}'s voice while preserving the strategic content.`;

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    const prompt = `Fix the following content to address voice consistency issues:\n\n` +
      `Issues to fix:\n${voiceCheck.issues.map(i => `- ${i}`).join('\n')}\n\n` +
      `Original content:\n${input.content}\n\n` +
      `Fix the voice issues while preserving all strategic content and recommendations.`;
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    try {
      const result = await this.provider.generate({
        prompt,
        systemInstruction,
        temperature: 0.5,
        maxTokens: this.getMaxTokens(input.contentType),
      });
<<<<<<< HEAD
      
      // Re-check the fixed content
      const fixedCheck = checkVoice(result.content);
=======

      // Re-check the fixed content
      const fixedCheck = checkVoiceForMode(result.content, mode);
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
      if (fixedCheck.score > voiceCheck.score) {
        return result.content;
      }
    } catch (error) {
      console.error('Error attempting auto-fix:', error);
    }
<<<<<<< HEAD
    
=======

>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
    return null;
  }

  private getMaxTokens(contentType: 'deck' | 'pov' | 'paper'): number {
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
