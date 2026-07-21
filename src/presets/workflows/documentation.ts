import type { WorkflowDefinition } from '../../core/registries/types.js';

/**
 * Documentation workflow: single-pass Documentation Writer
 *
 * Used for guides, references, tutorials, and explanations.
 */
export const documentationWorkflow: WorkflowDefinition = {
  id: 'documentation',
  name: 'Documentation Single-Pass',
  description: 'Documentation Writer generates instructional content in one pass',
  forModes: ['documentation'],
  steps: [
    { role: 'documentation-writer' },
  ],
};
