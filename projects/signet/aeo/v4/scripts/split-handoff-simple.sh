#!/bin/bash
# Simple approach: Use sed/awk to extract sections and update diagram references

cd "$(dirname "$0")/../handoff"

echo "🔧 Fixing diagram references in complete-handoff.html..."

# First, update complete-handoff.html to use v3 diagrams
sed -i.bak \
  -e 's|diagrams/01-system-context\.svg|diagrams/01-system-context-v3.svg|g' \
  -e 's|diagrams/02-container-diagram-v2\.svg|diagrams/02-container-diagram-v3.svg|g' \
  -e 's|diagrams/03-data-ingestion-flow\.svg|diagrams/03-data-ingestion-flow-v3.svg|g' \
  -e 's|diagrams/04-query-flow\.svg|diagrams/04-query-flow-v3.svg|g' \
  -e 's|diagrams/05-measurement-flow\.svg|diagrams/05-measurement-flow-v3.svg|g' \
  -e 's|diagrams/06-deployment-architecture\.svg|diagrams/06-deployment-architecture-v3.svg|g' \
  -e 's|diagrams/07-iam-security\.svg|diagrams/07-iam-security-v3.svg|g' \
  -e 's|diagrams/08-stakeholder-integration\.svg|diagrams/08-stakeholder-integration-v3.svg|g' \
  complete-handoff-backup.html

mv complete-handoff-backup.html complete-handoff.html
rm -f complete-handoff.html.bak

echo "✅ Updated diagram references to v3"
echo "✅ Use complete-handoff.html as the single comprehensive document"
echo ""
echo "📦 Recommended: Use complete-handoff.html instead of split documents"
echo "   - Contains all content in one scrollable document"
echo "   - Sidebar navigation for jumping to sections"
echo "   - All v3 diagrams properly referenced"
