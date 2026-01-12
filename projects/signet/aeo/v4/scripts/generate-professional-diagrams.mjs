#!/usr/bin/env node
/**
 * Generate Professional Excalidraw Diagrams
 *
 * Creates high-quality, easy-to-understand architecture diagrams
 * using Excalidraw's hand-drawn aesthetic
 */

import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIAGRAMS_DIR = path.join(__dirname, '../handoff/diagrams');

// Professional color palette
const colors = {
  actors: { stroke: '#9333ea', bg: '#f3e8ff' },
  system: { stroke: '#1e3a8a', bg: '#dbeafe' },
  compute: { stroke: '#3b82f6', bg: '#bfdbfe' },
  data: { stroke: '#f97316', bg: '#fed7aa' },
  success: { stroke: '#10b981', bg: '#d1fae5' },
  integration: { stroke: '#6366f1', bg: '#e0e7ff' },
  text: { primary: '#1e293b', secondary: '#64748b' }
};

/**
 * Generate Diagram 1: System Context (C4 Level 1)
 *
 * Simplified to 5 key elements:
 * - 3 human actors (left)
 * - 1 system boundary (center)
 * - 2 external systems (right)
 */
function generateSystemContext() {
  const diagram = {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: [
      // Title
      {
        id: "title",
        type: "text",
        x: 300,
        y: 20,
        width: 800,
        height: 40,
        text: "AEO Optimization Service - System Context",
        fontSize: 32,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "top",
        strokeColor: colors.system.stroke,
        fillStyle: "solid",
        strokeWidth: 2,
        roughness: 0,
        opacity: 100
      },

      // Subtitle
      {
        id: "subtitle",
        type: "text",
        x: 350,
        y: 70,
        width: 700,
        height: 25,
        text: "C4 Level 1: External actors and system boundary",
        fontSize: 18,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "top",
        strokeColor: colors.text.secondary,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      // LEFT: Human Actors (3 circles)
      {
        id: "actor-brand-manager",
        type: "ellipse",
        x: 50,
        y: 180,
        width: 140,
        height: 140,
        strokeColor: colors.actors.stroke,
        backgroundColor: colors.actors.bg,
        fillStyle: "solid",
        strokeWidth: 3,
        roughness: 1,
        opacity: 100
      },
      {
        id: "actor-brand-manager-label",
        type: "text",
        x: 85,
        y: 235,
        width: 70,
        height: 30,
        text: "Brand\nManager",
        fontSize: 16,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        strokeColor: colors.actors.stroke,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      {
        id: "actor-aeo-strategist",
        type: "ellipse",
        x: 50,
        y: 350,
        width: 140,
        height: 140,
        strokeColor: colors.actors.stroke,
        backgroundColor: colors.actors.bg,
        fillStyle: "solid",
        strokeWidth: 3,
        roughness: 1,
        opacity: 100
      },
      {
        id: "actor-aeo-strategist-label",
        type: "text",
        x: 80,
        y: 405,
        width: 80,
        height: 30,
        text: "AEO\nStrategist",
        fontSize: 16,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        strokeColor: colors.actors.stroke,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      {
        id: "actor-content-strategist",
        type: "ellipse",
        x: 50,
        y: 520,
        width: 140,
        height: 140,
        strokeColor: colors.actors.stroke,
        backgroundColor: colors.actors.bg,
        fillStyle: "solid",
        strokeWidth: 3,
        roughness: 1,
        opacity: 100
      },
      {
        id: "actor-content-strategist-label",
        type: "text",
        x: 70,
        y: 575,
        width: 100,
        height: 30,
        text: "Content\nStrategist",
        fontSize: 16,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        strokeColor: colors.actors.stroke,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      // CENTER: System Boundary (large rounded rectangle)
      {
        id: "system-boundary",
        type: "rectangle",
        x: 280,
        y: 150,
        width: 550,
        height: 540,
        strokeColor: colors.system.stroke,
        backgroundColor: colors.system.bg,
        fillStyle: "solid",
        strokeWidth: 4,
        roughness: 1,
        opacity: 100,
        roundness: { type: 3 }
      },
      {
        id: "system-title",
        type: "text",
        x: 400,
        y: 200,
        width: 310,
        height: 90,
        text: "AEO Optimization\nSystem\n\n(AWS Infrastructure)",
        fontSize: 24,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "top",
        strokeColor: colors.system.stroke,
        fillStyle: "solid",
        strokeWidth: 2,
        roughness: 0,
        opacity: 100
      },
      {
        id: "system-desc",
        type: "text",
        x: 320,
        y: 330,
        width: 470,
        height: 280,
        text: "Key Capabilities:\n\n• Ingests brand visibility data\n  from Profound API (daily)\n\n• Analyzes gaps using semantic\n  search (OpenSearch)\n\n• Generates optimization\n  recommendations (Bedrock Agent)\n\n• Measures Share of Voice lift\n  (weekly reporting)\n\nTech: Lambda, S3, OpenSearch,\nBedrock, EventBridge",
        fontSize: 14,
        fontFamily: 1,
        textAlign: "left",
        verticalAlign: "top",
        strokeColor: colors.text.secondary,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      // RIGHT: External Systems
      {
        id: "profound-api",
        type: "rectangle",
        x: 920,
        y: 220,
        width: 200,
        height: 120,
        strokeColor: colors.data.stroke,
        backgroundColor: colors.data.bg,
        fillStyle: "solid",
        strokeWidth: 3,
        roughness: 1,
        opacity: 100,
        roundness: { type: 3 }
      },
      {
        id: "profound-api-label",
        type: "text",
        x: 950,
        y: 260,
        width: 140,
        height: 60,
        text: "Profound API\n\n400+ prompts\n7 LLM sources",
        fontSize: 16,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "top",
        strokeColor: colors.data.stroke,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      {
        id: "infoverity-pim",
        type: "rectangle",
        x: 920,
        y: 420,
        width: 200,
        height: 120,
        strokeColor: colors.success.stroke,
        backgroundColor: colors.success.bg,
        fillStyle: "solid",
        strokeWidth: 3,
        roughness: 1,
        opacity: 100,
        roundness: { type: 3 }
      },
      {
        id: "infoverity-pim-label",
        type: "text",
        x: 950,
        y: 460,
        width: 140,
        height: 60,
        text: "Infoverity PIM\n\nP360 + Prodevix\nworkflow",
        fontSize: 16,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "top",
        strokeColor: colors.success.stroke,
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        opacity: 100
      },

      // Arrows (simplified)
      {
        id: "arrow-actors-to-system",
        type: "arrow",
        x: 190,
        y: 360,
        width: 90,
        height: 0,
        strokeColor: colors.text.secondary,
        strokeWidth: 2,
        roughness: 1,
        startArrowhead: null,
        endArrowhead: "arrow"
      },
      {
        id: "arrow-system-to-profound",
        type: "arrow",
        x: 830,
        y: 280,
        width: 90,
        height: 0,
        strokeColor: colors.data.stroke,
        strokeWidth: 2,
        roughness: 1,
        startArrowhead: "arrow",
        endArrowhead: null
      },
      {
        id: "arrow-system-to-pim",
        type: "arrow",
        x: 830,
        y: 480,
        width: 90,
        height: 0,
        strokeColor: colors.success.stroke,
        strokeWidth: 2,
        roughness: 1,
        strokeStyle: "dashed",
        startArrowhead: null,
        endArrowhead: "arrow"
      }
    ],
    appState: {
      viewBackgroundColor: "#ffffff",
      gridSize: 20
    },
    files: {}
  };

  return diagram;
}

/**
 * Save diagram to .excalidraw file and export to SVG
 */
async function saveDiagram(name, diagramData) {
  const excalidrawPath = path.join(DIAGRAMS_DIR, `${name}.excalidraw`);
  const svgPath = path.join(DIAGRAMS_DIR, `${name}.svg`);

  console.log(`📊 Generating ${name}...`);

  // Save .excalidraw file
  writeFileSync(excalidrawPath, JSON.stringify(diagramData, null, 2));
  console.log(`   ✓ Saved ${name}.excalidraw`);

  // Export to SVG using excalidraw-to-svg CLI
  try {
    execSync(
      `npx excalidraw-to-svg "${excalidrawPath}" "${svgPath}"`,
      {
        cwd: '/Users/nino/Workspace/dev/apps/signal-forge',
        stdio: 'pipe'
      }
    );
    console.log(`   ✓ Exported ${name}.svg`);
  } catch (error) {
    console.error(`   ✗ Failed to export ${name}.svg:`, error.message);
  }
}

// Generate all diagrams
async function main() {
  console.log('🎨 Generating professional Excalidraw diagrams...\n');

  // Diagram 1: System Context
  const systemContext = generateSystemContext();
  await saveDiagram('01-system-context', systemContext);

  // TODO: Add remaining 7 diagrams
  console.log('\n⚠️  Note: Only Diagram 1 (System Context) generated.');
  console.log('   Remaining 7 diagrams to be added based on approved design.');

  console.log('\n✅ Diagram generation complete!');
  console.log(`   Files saved to: ${DIAGRAMS_DIR}`);
}

main().catch(console.error);
