#!/usr/bin/env node
/**
 * Signal Forge CLI
 * 
 * Strategic content generation tool
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import { readFileContent } from '../utils/file-utils.js';
import { createProvider, getDefaultProvider, getConfiguredProviders } from '../providers/index.js';
import type { AIProvider } from '../providers/ai-provider.js';
import { GhostWriter } from '../roles/ghost-writer.js';
import { Copywriter } from '../roles/copywriter.js';
import { Editor } from '../roles/editor.js';
import { exportToWord } from '../exporters/word-exporter.js';
import { exportToPDF } from '../exporters/pdf-exporter.js';
import { exportToPPTX } from '../exporters/pptx-exporter.js';
import { exportToGoogleSlides } from '../exporters/slides-exporter.js';
import { exportToHTML } from '../exporters/html-exporter.js';
import { generateSlug } from '../utils/slug.js';
import { ensureDir } from '../utils/file-utils.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const program = new Command();

program
  .name('forge')
  .description('Signal Forge - Strategic content generation system')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate strategic content')
  .argument('<type>', 'Content type: deck, pov, or paper')
  .option('-i, --input <file>', 'Input file (meeting notes, recap, etc.)')
  .option('-o, --output <file>', 'Output file path')
  .option('-p, --provider <provider>', 'AI provider: openai, anthropic, google, perplexity')
  .option('-f, --format <formats>', 'Output formats (comma-separated): word,pdf,pptx,slides')
  .option('--audience <audience>', 'Target audience')
  .option('--no-edit', 'Skip editor review (use ghost writer + copywriter only)')
  .action(async (type: string, options) => {
    try {
      if (!['deck', 'pov', 'paper'].includes(type)) {
        console.error(`❌ Invalid content type: ${type}. Must be deck, pov, or paper.`);
        process.exit(1);
      }

      // Get input
      let inputContent = '';
      if (options.input) {
        inputContent = await readFileContent(options.input);
      } else {
        const answer = await inquirer.prompt([
          {
            type: 'input',
            name: 'input',
            message: 'Enter input file path or paste content:',
          },
        ]);
        if (answer.input) {
          if (await import('fs').then(fs => fs.promises.access(answer.input).then(() => true).catch(() => false))) {
            inputContent = await readFileContent(answer.input);
          } else {
            inputContent = answer.input;
          }
        }
      }

      if (!inputContent) {
        console.error('❌ No input content provided');
        process.exit(1);
      }

      // Get provider
      let providerName: AIProvider = options.provider as AIProvider || getDefaultProvider();
      const configuredProviders = getConfiguredProviders();
      
      if (!configuredProviders.includes(providerName)) {
        console.warn(`⚠️  Provider ${providerName} not configured. Available: ${configuredProviders.join(', ')}`);
        if (configuredProviders.length > 0) {
          providerName = configuredProviders[0];
          console.log(`Using ${providerName} instead.`);
        } else {
          console.error('❌ No AI providers configured. Please set API keys in .env file.');
          process.exit(1);
        }
      }

      const provider = createProvider(providerName);

      // Generate content
      console.log(`\n🔨 Generating ${type} content using ${providerName}...\n`);

      // Ghost Writer
      console.log('👻 Ghost Writer: Generating initial draft...');
      const ghostWriter = new GhostWriter(provider);
      const ghostOutput = await ghostWriter.generate({
        rawContent: inputContent,
        contentType: type as 'deck' | 'pov' | 'paper',
        audience: options.audience,
      });
      console.log('✅ Ghost Writer complete\n');

      // Copywriter
      console.log('✍️  Copywriter: Refining content...');
      const copywriter = new Copywriter(provider);
      const copywriterOutput = await copywriter.refine({
        draft: ghostOutput.draft,
        contentType: type as 'deck' | 'pov' | 'paper',
        audience: options.audience,
      });
      console.log('✅ Copywriter complete\n');

      // Editor
      let finalContent = copywriterOutput.refined;
      if (!options.noEdit) {
        console.log('📝 Editor: Reviewing content...');
        const editor = new Editor(provider);
        const editorOutput = await editor.review({
          content: copywriterOutput.refined,
          contentType: type as 'deck' | 'pov' | 'paper',
        });

        if (editorOutput.approved) {
          console.log(`✅ Editor approved (Voice score: ${editorOutput.voiceCheck.score}/10)\n`);
          finalContent = editorOutput.finalContent || finalContent;
        } else {
          console.warn(`⚠️  Editor found issues (Voice score: ${editorOutput.voiceCheck.score}/10)`);
          if (editorOutput.feedback) {
            console.log('\nFeedback:');
            console.log(editorOutput.feedback);
          }
          if (editorOutput.finalContent) {
            finalContent = editorOutput.finalContent;
            console.log('\n✅ Using auto-fixed version\n');
          } else {
            console.log('\n⚠️  Using content as-is (manual review recommended)\n');
          }
        }
      }

      // Determine output formats
      const formats = options.format 
        ? options.format.split(',').map((f: string) => f.trim())
        : type === 'deck' ? ['pptx', 'html'] : ['word', 'pdf', 'html'];

      // Determine output path
      const outputDir = options.output 
        ? path.dirname(options.output)
        : path.join(process.cwd(), 'content', type + 's');
      
      await ensureDir(outputDir);

      const baseName = options.output
        ? path.basename(options.output, path.extname(options.output))
        : generateSlug(ghostOutput.draft.split('\n')[0] || 'content');

      // Export to requested formats
      console.log('📤 Exporting content...\n');

      for (const format of formats) {
        try {
          switch (format) {
            case 'word':
            case 'docx':
              const wordPath = path.join(outputDir, `${baseName}.docx`);
              await exportToWord({
                title: baseName,
                content: finalContent,
                outputPath: wordPath,
              });
              console.log(`✅ Word document: ${wordPath}`);
              break;

            case 'pdf':
              const pdfPath = path.join(outputDir, `${baseName}.pdf`);
              await exportToPDF({
                title: baseName,
                content: finalContent,
                outputPath: pdfPath,
              });
              console.log(`✅ PDF: ${pdfPath}`);
              break;

            case 'pptx':
            case 'powerpoint':
              const pptxPath = path.join(outputDir, `${baseName}.pptx`);
              await exportToPPTX({
                title: baseName,
                content: finalContent,
                outputPath: pptxPath,
              });
              console.log(`✅ PowerPoint: ${pptxPath}`);
              break;

            case 'slides':
            case 'googleslides':
              const slidesUrl = await exportToGoogleSlides({
                title: baseName,
                content: finalContent,
              });
              console.log(`✅ Google Slides: ${slidesUrl}`);
              break;

            case 'html':
            case 'web':
            case 'webpage':
              const htmlPath = path.join(outputDir, `${baseName}.html`);
              await exportToHTML({
                title: baseName,
                content: finalContent,
                outputPath: htmlPath,
                contentType: type as 'deck' | 'pov' | 'paper',
              });
              console.log(`✅ Web page: ${htmlPath}`);
              break;

            default:
              console.warn(`⚠️  Unknown format: ${format}`);
          }
        } catch (error: any) {
          console.error(`❌ Error exporting to ${format}:`, error.message);
        }
      }

      console.log('\n✨ Content generation complete!\n');

    } catch (error: any) {
      console.error('❌ Error:', error.message);
      if (error.stack) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();

