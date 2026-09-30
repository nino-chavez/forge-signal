#!/bin/bash
# Scaffold a demo-reel directory in the current project.
# Usage: bash scaffold.sh [target-dir]
#   target-dir defaults to ./scripts/demo-reel

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-./scripts/demo-reel}"

[ ! -e "$TARGET/captions.json" ] || { echo "captions.json already exists at $TARGET; use the existing reel directory." >&2; exit 1; }
mkdir -p "$TARGET/screenshots"

cp "$SCRIPT_DIR/generate.mjs" "$TARGET/generate.mjs"
cp "$SCRIPT_DIR/lib.mjs" "$TARGET/lib.mjs"
cp "$SCRIPT_DIR/NARRATION.md" "$TARGET/NARRATION.md"
cp "$SCRIPT_DIR/captions.template.json" "$TARGET/captions.json"

cat > "$TARGET/.gitignore" <<'EOF'
# Generated working assets
audio/
frames/
clips/
concat.txt
# Keep out/ if you want the final MP4 in the repo
# out/
EOF

echo "Demo reel scaffolded at $TARGET"
echo ""
echo "Next steps:"
echo "  1. Capture screenshots to $TARGET/screenshots/ (1440x900)"
echo "  2. Read $TARGET/NARRATION.md, then edit captions.json"
echo "  3. node $TARGET/generate.mjs script — read out/script.txt aloud"
echo "  4. Supply a provider key in the environment from 1Password"
echo "  5. node $TARGET/generate.mjs audio — listen to out/audio.html"
echo "  6. node $TARGET/generate.mjs storyboard — inspect out/storyboard.html"
echo "  7. node $TARGET/generate.mjs render — write out/demo-reel.mp4"
echo ""
echo "Narration guide: $SCRIPT_DIR/NARRATION.md"
