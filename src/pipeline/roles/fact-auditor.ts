export type ProvenanceSource =
  | 'fetched-at-source'
  | 'search-derived'
  | 'internal'
  | 'assumption';

export interface ProvenanceEntry {
  /** Substring or regex source matched against extracted claim excerpts */
  claimPattern: string | RegExp;
  source: ProvenanceSource;
  url?: string;
  note?: string;
}

export type ClaimKind = 'price' | 'rating' | 'statistic' | 'verified-language';

export interface ClaimRecord {
  kind: ClaimKind;
  excerpt: string;
  line: number;
  provenance?: ProvenanceEntry;
}

export interface FactAuditorInput {
  content: string;
  /** Ledger mapping claims to their evidence tier. Missing ledger = every claim unattributed. */
  ledger?: ProvenanceEntry[];
}

export interface FactAuditorOutput {
  passed: boolean;
  claims: ClaimRecord[];
  /** Hard failures: verified-language claims without a fetched-at-source ledger entry */
  violations: ClaimRecord[];
  /** Warnings: numeric claims with no ledger entry at all */
  unattributed: ClaimRecord[];
  report: string;
}

const EXTRACTORS: Array<{ kind: ClaimKind; pattern: RegExp }> = [
  // "$495", "$27–97/mo", "2.9% + $0.30", "$199/yr"
  { kind: 'price', pattern: /\$[\d,.]+(?:\s*[–-]\s*\$?[\d,.]+)?(?:\s*\/\s*(?:mo|month|yr|year))?|\b\d+(?:\.\d+)?%\s*(?:\+\s*\$[\d.]+)?/g },
  // "4.8/5", "750 reviews", "4.8 stars"
  { kind: 'rating', pattern: /\b\d(?:\.\d)?\s*\/\s*5\b|\b[\d,]+\s+(?:verified\s+)?reviews?\b|\b\d(?:\.\d)?\s*stars?\b/gi },
  // "1 in 3", "33% of reviews", "~13% all-in"
  { kind: 'statistic', pattern: /\b\d+\s+in\s+\d+\b|[~≈]?\d+(?:\.\d+)?%\s+of\b/gi },
  // self-attestation language — the tier that demands a fetch
  { kind: 'verified-language', pattern: /\b(?:verified(?:\s+directly)?|confirmed|checked\s+directly|pulled\s+directly|read\s+directly|fetched(?:\s+at\s+the\s+source)?)\b/gi },
];

/**
 * Fact Auditor Role
 *
 * Mechanically extracts factual claims (prices, ratings, statistics,
 * verified-language) and validates each against a provenance ledger.
 * Deterministic — no AI provider. The rule it enforces, from
 * working-style.md § Audit discipline: an artifact's claim to have been
 * verified is not verification. Search snippets are hearsay; "verified"
 * requires an in-session fetch of the source, and if the source blocks
 * fetching, the label must downgrade.
 *
 * Origin: the EPI brief (2026-07-17) shipped a "verified directly" tag on a
 * search-derived number, cited a vendor's self-ranking as evidence, and
 * "corrected" it with a competitor's marketing stat. All three were caught
 * only by a manually prompted audit pass. This role makes that pass a
 * pipeline stage.
 */
export class FactAuditor {
  audit(input: FactAuditorInput): FactAuditorOutput {
    const claims = this.extractClaims(input.content);
    const ledger = input.ledger ?? [];

    for (const claim of claims) {
      claim.provenance = ledger.find((entry) =>
        entry.claimPattern instanceof RegExp
          ? entry.claimPattern.test(claim.excerpt)
          : claim.excerpt.toLowerCase().includes(entry.claimPattern.toLowerCase())
      );
    }

    const violations = claims.filter(
      (c) => c.kind === 'verified-language' && c.provenance?.source !== 'fetched-at-source'
    );
    const unattributed = claims.filter(
      (c) => c.kind !== 'verified-language' && !c.provenance
    );

    return {
      passed: violations.length === 0,
      claims,
      violations,
      unattributed,
      report: this.buildReport(claims, violations, unattributed),
    };
  }

  private extractClaims(content: string): ClaimRecord[] {
    const claims: ClaimRecord[] = [];
    const lines = content.split('\n');

    lines.forEach((lineText, i) => {
      for (const { kind, pattern } of EXTRACTORS) {
        pattern.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(lineText)) !== null) {
          const start = Math.max(0, match.index - 60);
          const end = Math.min(lineText.length, match.index + match[0].length + 60);
          claims.push({
            kind,
            excerpt: lineText.slice(start, end).trim(),
            line: i + 1,
          });
        }
      }
    });

    return claims;
  }

  private buildReport(
    claims: ClaimRecord[],
    violations: ClaimRecord[],
    unattributed: ClaimRecord[]
  ): string {
    const out: string[] = [
      `Fact audit: ${claims.length} claims extracted, ${violations.length} violations, ${unattributed.length} unattributed.`,
    ];

    if (violations.length > 0) {
      out.push('', 'VIOLATIONS — verified-language without a fetched-at-source ledger entry:');
      violations.forEach((v) =>
        out.push(`  L${v.line}: "${v.excerpt}"${v.provenance ? ` [ledger says: ${v.provenance.source}]` : ' [no ledger entry]'}`)
      );
      out.push('', 'Fix: fetch the source in-session and add a fetched-at-source entry, or downgrade the language (e.g. "search-corroborated") to match the evidence.');
    }

    if (unattributed.length > 0) {
      out.push('', 'UNATTRIBUTED (warnings) — numeric claims with no provenance entry:');
      unattributed.forEach((u) => out.push(`  L${u.line}: [${u.kind}] "${u.excerpt}"`));
    }

    return out.join('\n');
  }
}
