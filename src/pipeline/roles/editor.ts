import type { AIProviderInterface, GenerateOptions } from '../../providers/ai-provider.js';
import { checkVoice, type VoiceCheckResult } from '../../content/voice/voice-checker.js';
import { loadConfig } from '../../core/config.js';

export interface EditorInput {
  content: string;
  contentType: 'deck' | 'pov' | 'paper';
  strategicObjectives?: string[];
}

export interface EditorOutput {
  approved: boolean;
  finalContent?: string;
  voiceCheck: VoiceCheckResult;
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
 * 
 * Final quality assurance, voice consistency, strategic accuracy
 * Approves or requests revisions
 */
export class Editor {
  constructor(private provider: AIProviderInterface) {}

  async review(input: EditorInput): Promise<EditorOutput> {
    // Run voice check
    const voiceCheck = checkVoice(input.content);
    
    // Run strategic check
    const strategicCheck = this.checkStrategicAccuracy(input);
    
    // If both pass, approve
    if (voiceCheck.passed && strategicCheck.passed) {
      return {
        approved: true,
        finalContent: input.content,
        voiceCheck,
        strategicCheck,
      };
    }
    
    // If issues found, generate feedback and potentially revised content
    const feedback = this.generateFeedback(voiceCheck, strategicCheck);
    
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
    
    // Check for clear strategic recommendations
    const hasRecommendations = /recommend|suggest|should|next steps|action/i.test(input.content);
    if (!hasRecommendations && input.contentType !== 'paper') {
      issues.push('Missing clear strategic recommendations');
    }
    
    // Check for evidence/examples
    const hasExamples = /example|instance|case|data|evidence/i.test(content);
    if (!hasExamples) {
      issues.push('Lacks concrete examples or evidence');
    }
    
    // Check for stakeholder concerns (if mentioned in objectives)
    if (input.strategicObjectives) {
      const objectivesText = input.strategicObjectives.join(' ').toLowerCase();
      // Basic check - could be more sophisticated
    }
    
    // Check for next steps
    const hasNextSteps = /next steps|action items|recommendations|implementation/i.test(content);
    if (!hasNextSteps && input.contentType !== 'paper') {
      issues.push('Missing clear next steps or action items');
    }
    
    // Check for risk acknowledgment
    const hasRisks = /risk|trade.?off|challenge|limitation|consideration/i.test(content);
    // Not required but good to have
    
    return {
      passed: issues.length === 0,
      issues,
    };
  }

  private generateFeedback(voiceCheck: VoiceCheckResult, strategicCheck: { passed: boolean; issues: string[] }): string {
    const feedback: string[] = [];
    
    if (!voiceCheck.passed) {
      feedback.push('Voice Consistency Issues:');
      voiceCheck.issues.forEach(issue => feedback.push(`- ${issue}`));
    }
    
    if (voiceCheck.strengths.length > 0) {
      feedback.push('\nVoice Strengths:');
      voiceCheck.strengths.forEach(strength => feedback.push(`- ${strength}`));
    }
    
    if (!strategicCheck.passed) {
      feedback.push('\nStrategic Accuracy Issues:');
      strategicCheck.issues.forEach(issue => feedback.push(`- ${issue}`));
    }
    
    return feedback.join('\n');
  }

  private async attemptFix(
    input: EditorInput,
    voiceCheck: VoiceCheckResult,
    strategicCheck: { passed: boolean; issues: string[] }
  ): Promise<string | null> {
    // Only attempt fix if voice score is very low
    if (voiceCheck.score >= 5) {
      return null;
    }
    
    const config = loadConfig();
    const systemInstruction = `You are an editor fixing voice consistency issues. Fix the content to match ${config.author}'s voice while preserving the strategic content.`;
    
    const prompt = `Fix the following content to address voice consistency issues:\n\n` +
      `Issues to fix:\n${voiceCheck.issues.map(i => `- ${i}`).join('\n')}\n\n` +
      `Original content:\n${input.content}\n\n` +
      `Fix the voice issues while preserving all strategic content and recommendations.`;
    
    try {
      const result = await this.provider.generate({
        prompt,
        systemInstruction,
        temperature: 0.5,
        maxTokens: this.getMaxTokens(input.contentType),
      });
      
      // Re-check the fixed content
      const fixedCheck = checkVoice(result.content);
      if (fixedCheck.score > voiceCheck.score) {
        return result.content;
      }
    } catch (error) {
      console.error('Error attempting auto-fix:', error);
    }
    
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

