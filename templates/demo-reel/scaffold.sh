#!/bin/bash
# Scaffold a demo-reel directory in the current project.
# Usage: bash scaffold.sh [target-dir]
#   target-dir defaults to ./scripts/demo-reel

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-./scripts/demo-reel}"

mkdir -p "$TARGET/screenshots"

cp "$SCRIPT_DIR/generate.mjs" "$TARGET/generate.mjs"
cp "$SCRIPT_DIR/captions.template.json" "$TARGET/captions.json"

cat > "$TARGET/.gitignore" <<'EOF'
# Generated assets (regenerate with `node generate.mjs`)
audio/
frames/
clips/
# Keep out/ if you want the final MP4 in the repo
# out/
EOF

echo "Demo reel scaffolded at $TARGET"
echo ""
echo "Next steps:"
echo "  1. Capture screenshots to $TARGET/screenshots/ (1440x900)"
echo "  2. Edit $TARGET/captions.json with your scenes"
echo "  3. Read NARRATION.md before writing captions"
echo "  4. ELEVENLABS_API_KEY=sk_... node $TARGET/generate.mjs"
echo ""
echo "Narration guide: $SCRIPT_DIR/NARRATION.md"
