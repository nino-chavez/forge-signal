import type { ReaderContract, ReaderPlainness } from '../core/types/index.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const PLAINNESS_LEVELS = new Set<ReaderPlainness>(['lay', 'practitioner', 'specialist']);

export function parseReaderPlainness(value: unknown): ReaderPlainness | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'string' && PLAINNESS_LEVELS.has(value as ReaderPlainness)) {
    return value as ReaderPlainness;
  }
  throw new Error('Reader plainness must be lay, practitioner, or specialist');
}

export function formatReaderContract(
  contract: ReaderContract | undefined,
  fallbackReader: string,
  fallbackJob: string
): string {
  const reader = contract?.reader || fallbackReader;
  const job = contract?.job || fallbackJob;
  const assumed = contract?.assumedKnowledge?.join(', ') || 'no internal project history';
  const plainness = contract?.plainness || 'practitioner';
  const locks = contract?.precisionLocks?.join(', ') || 'facts, field names, commands, numbers, citations, and deliberate voice';
  const keep = contract?.keepTerms?.join(', ') || 'none declared';
  const avoid = contract?.avoidTerms && Object.keys(contract.avoidTerms).length
    ? Object.entries(contract.avoidTerms).map(([from, to]) => `${from} → ${to}`).join('; ')
    : 'none declared';

  return `Reader contract:
- Reader: ${reader}
- Job: ${job}
- Assumed knowledge: ${assumed}
- Plainness: ${plainness}
- Precision locks: ${locks}
- Keep terms: ${keep}
- Avoid/replace terms: ${avoid}`;
}

interface ProjectSurface extends ReaderContract {
  name: string;
  allowTerms?: string[];
  denyTerms?: Array<{ term: string; replacement?: string }>;
}

interface ProjectReaderContract {
  defaults: ReaderContract;
  surfaces: ProjectSurface[];
}

export async function loadProjectReaderContract(options: {
  file?: string;
  surface?: string;
  cwd?: string;
  ignore?: boolean;
}): Promise<ReaderContract | undefined> {
  if (options.ignore) return undefined;
  const cwd = options.cwd || process.cwd();
  const file = path.resolve(cwd, options.file || 'reader-contract.json');
  let raw: string;
  try {
    raw = await fs.readFile(file, 'utf8');
  } catch (error) {
    if (options.file || options.surface) {
      throw new Error(`Reader contract not found: ${file}`);
    }
    return undefined;
  }

  let parsed: ProjectReaderContract | ReaderContract;
  try {
    parsed = JSON.parse(raw) as ProjectReaderContract | ReaderContract;
  } catch (error) {
    throw new Error(`Reader contract is not valid JSON: ${file}`);
  }

  if (!('defaults' in parsed) || !('surfaces' in parsed)) {
    return normalizeReaderContract(parsed as ReaderContract);
  }

  const project = parsed as ProjectReaderContract;
  if (!project.defaults || !Array.isArray(project.surfaces)) {
    throw new Error(`Reader contract needs defaults and surfaces: ${file}`);
  }

  let surface: ProjectSurface | undefined;
  if (options.surface) {
    surface = project.surfaces.find((candidate) => candidate.name.toLowerCase() === options.surface!.toLowerCase());
    if (!surface) {
      throw new Error(`Reader-contract surface not found: ${options.surface}. Available: ${project.surfaces.map((candidate) => candidate.name).join(', ')}`);
    }
  } else if (project.surfaces.length === 1) {
    surface = project.surfaces[0];
  }

  const merged = { ...project.defaults, ...(surface || {}) };
  const allowTerms = surface?.allowTerms || [];
  const avoidTerms = Object.fromEntries((surface?.denyTerms || []).map((item) => [
    item.term,
    item.replacement || 'reader-facing language',
  ]));

  return normalizeReaderContract({
    ...merged,
    keepTerms: [...(merged.keepTerms || []), ...allowTerms],
    avoidTerms: { ...(merged.avoidTerms || {}), ...avoidTerms },
  });
}

export function mergeReaderContracts(
  base: ReaderContract | undefined,
  overrides: ReaderContract
): ReaderContract {
  const definedOverrides = Object.fromEntries(
    Object.entries(overrides).filter(([, value]) => value !== undefined)
  ) as ReaderContract;
  return { ...(base || {}), ...definedOverrides };
}

function normalizeReaderContract(contract: ReaderContract): ReaderContract {
  return {
    reader: contract.reader,
    job: contract.job,
    assumedKnowledge: contract.assumedKnowledge,
    plainness: parseReaderPlainness(contract.plainness),
    precisionLocks: contract.precisionLocks,
    keepTerms: contract.keepTerms,
    avoidTerms: contract.avoidTerms,
  };
}
