#!/bin/bash
# Generate all 8 professional D2 diagrams
# Simplified, clean layouts following professional design principles

DIAGRAMS_DIR="$(cd "$(dirname "$0")/../handoff/diagrams" && pwd)"

echo "🎨 Generating 8 professional D2 diagrams..."
echo ""

cd "$DIAGRAMS_DIR"

# Generate all 8 diagrams
for i in {1..8}; do
  case $i in
    1) NAME="01-system-context" ;;
    2) NAME="02-container-diagram-v2" ;;
    3) NAME="03-data-ingestion-flow" ;;
    4) NAME="04-query-flow" ;;
    5) NAME="05-measurement-flow" ;;
    6) NAME="06-deployment-architecture" ;;
    7) NAME="07-iam-security" ;;
    8) NAME="08-stakeholder-integration" ;;
  esac

  if [ -f "${NAME}.d2" ]; then
    echo "📊 Generating ${NAME}.svg..."
    d2 --theme 0 --layout elk --pad 40 "${NAME}.d2" "${NAME}.svg"
    if [ $? -eq 0 ]; then
      echo "   ✓ Success"
    else
      echo "   ✗ Failed"
    fi
  else
    echo "⚠️  ${NAME}.d2 not found, skipping..."
  fi
done

echo ""
echo "✅ Diagram generation complete!"
echo "📁 Files saved to: $DIAGRAMS_DIR"
