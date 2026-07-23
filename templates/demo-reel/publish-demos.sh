#!/usr/bin/env bash
#
# Regenerate the Rally HQ interactive demo players (with social OG/Twitter meta) and
# publish them into the app's static/demos/<slug>/ folders. Idempotent — run after a
# re-capture (record-interactive.spec.ts) whenever the product UI changes.
#
# It only rewrites the four player folders; the hand-authored gallery index.html in
# static/demos/ is left alone.
#
#   Usage: ./publish-demos.sh [rally-hq-repo-root]
#     rally-hq-repo-root defaults to the sibling dev/apps/rally-hq checkout. Pass a
#     worktree path to publish into a feature branch instead.
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="${1:-$HERE/../../../../apps/rally-hq}"
REC="$REPO/tests/e2e/recordings/interactive"
DEST="$REPO/static/demos"
BASE="https://rallyhq.app/demos"
SITE="Rally HQ"

# The interactive player is emitted by the shared render-kit tool (one manifest → many
# outputs); this script owns only the capture-label→hosting-slug remap and the OG values.
# Override RENDER_KIT to point at another checkout (e.g. a worktree).
RK="${RENDER_KIT:-$HERE/../../../render-kit/bin/render-kit.mjs}"
[ -f "$RK" ] || { echo "render-kit not found: $RK (set RENDER_KIT=/path/to/render-kit/bin/render-kit.mjs)" >&2; exit 1; }

[ -d "$REC" ] || { echo "capture recordings not found: $REC" >&2; exit 1; }
[ -d "$DEST" ] || { echo "static/demos not found: $DEST" >&2; exit 1; }

# capture-label | hosting-slug | og-preview-frame | demo-title | social-description
demos=(
  "01-create-tournament|create-tournament|step-01.png|Create a tournament|Build a real tournament from your dashboard — Rally HQ turns pool play and brackets into a live, shareable page. A click-through of the real product, no signup."
  "02-run-tournament-day|run-day|step-01.png|Run it on game day|Pools, schedule, and a score that goes live everywhere — three clicks replace three spreadsheets. Click through how Rally HQ runs tournament day."
  "03-captain-team-day|captain|step-05.png|Run your team|Find your team, your pool, your seed, and every result — and verify as captain with one tap. The whole day from your phone."
  "04-player-follow-live|player|step-06.png|Follow it live|Live scores and standings straight from the courts to your phone — the same real-time truth the scoring desk sees. No app, no login."
)

for row in "${demos[@]}"; do
  IFS='|' read -r label slug frame title desc <<<"$row"
  node "$RK" walkthrough "$REC/$label.interactive.json" \
    --emit interactive \
    --out-dir "$HERE/out/$label-interactive" \
    --og-url "$BASE/$slug/" \
    --og-image "$BASE/$slug/frames/$frame" \
    --og-desc "$desc" \
    --og-title "$title · $SITE" \
    --og-site "$SITE"
  rm -rf "${DEST:?}/$slug"
  cp -R "$HERE/out/$label-interactive" "$DEST/$slug"
  echo "  → published $slug"
done

echo "Published ${#demos[@]} demo players to $DEST"
