/**
 * Content Types and Modes
 *
 * Core type definitions for content classification and output formats.
 */

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
