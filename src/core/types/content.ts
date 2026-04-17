/**
 * Content Types and Modes
 *
 * Core type definitions for content classification and output formats.
<<<<<<< HEAD
 */

export type ContentMode = 'thought-leadership' | 'architecture' | 'advisory' | 'documentation';
=======
 * ContentMode is a string to allow custom modes registered at runtime.
 * BuiltInContentMode provides type safety for the four built-in modes.
 */

import { getModeForContentType, isContentTypeInMode } from '../registries/mode-registry.js';

/** Runtime content mode identifier — any registered string */
export type ContentMode = string;

/** Built-in modes for type safety in preset definitions */
export type BuiltInContentMode = 'thought-leadership' | 'architecture' | 'advisory' | 'documentation';
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967

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
<<<<<<< HEAD
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
=======
 * Check if a content type is documentation.
 * Delegates to the mode registry.
 */
export function isDocumentationType(type: ContentType): boolean {
  return isContentTypeInMode(type, 'documentation');
}

/**
 * Get the content mode for a content type.
 * Delegates to the mode registry.
 */
export function getModeForType(type: ContentType): ContentMode {
  return getModeForContentType(type);
>>>>>>> 8c57b9390e87db3ee279163f2b3dc44ab01a7967
}
