#!/usr/bin/env node
/**
 * Demo reel generator — TTS + captioned screenshots → MP4.
 *
 * Stages: script → audio → storyboard → render. Each command stops for review.
 * With no command, `all` retains the unattended full-run path.
 * Provider credentials are read from the process environment only, when audio
 * needs generation. Cache receipts fingerprint both the inputs and output bytes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
	createTTS,
	probeDuration,
	fileFingerprint,
	artifactIsCurrent,
	recordArtifact,
	VIDEO_W,
	VIDEO_H,
	CAPTION_BAND_H,
	CAPTION_PAD_X,
	CAPTION_PAD_TOP,
	TITLE_FONT_SIZE,
	CAPTION_FONT_SIZE,
	BG_COLOR,
	ACCENT_COLOR,
	ELEVENLABS_VOICES
} from './lib.mjs';

const options = parseOptions(process.argv.slice(2));
if (options.help) {
	console.log(`Demo reel — review each stage before rendering

Usage: node generate.mjs [script|audio|storyboard|render|all] [options]

  script      Export the ordered script; no provider calls or rendering
  audio       Generate narration and a playable preview; requires current script
  storyboard  Build captioned frames and a preview; no provider calls
  render      Assemble current script, frames, and audio; refuses stale inputs
  all         Run every stage without review pauses (default)

Options:
  --root <dir>  Read captions.json and screenshots from this directory
  --silent      Make a captions-only reel; holdSeconds is each scene's duration
  --force       Regenerate the selected stage's output
  --help        Show this help

Audio uses ELEVENLABS_API_KEY or OPENAI_API_KEY, supplied in the environment.
TTS_VOICE / TTS_MODEL override captions.json. SKIP_TTS / SKIP_FRAMES require
matching cache receipts; they never reuse changed inputs.`);
	process.exit(0);
}
const ROOT = options.root;
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');
const AUDIO_DIR = path.join(ROOT, 'audio');
const FRAMES_DIR = path.join(ROOT, 'frames');
const CLIPS_DIR = path.join(ROOT, 'clips');
const OUT_DIR = path.join(ROOT, 'out');

// ─── config ────────────────────────────────────────────────────────
const captions = JSON.parse(fs.readFileSync(path.join(ROOT, 'captions.json'), 'utf-8'));
const DEFAULT_HOLD_S = captions.defaultHoldSeconds ?? 0.4;
const COUNTER_FONT_SIZE = 14;

// ─── helpers ───────────────────────────────────────────────────────
// createTTS, probeDuration, and the layout/brand constants live in lib.mjs,
// shared with generate-video.mjs. buildFrame stays here — it burns the caption INTO the
// screenshot (full-bleed still), whereas the video pipeline overlays a transparent band.
function buildFrame(scene, index, framePath) {
	const src = path.join(SCREENSHOTS_DIR, scene.image);
	if (!fs.existsSync(src)) throw new Error(`Screenshot not found: ${src}`);

	const idx = String(index + 1).padStart(2, '0');
	const totalScenes = captions.scenes.length;
	const progress = `${idx} / ${String(totalScenes).padStart(2, '0')}`;

	const captionText = scene.caption;
	const titleText = scene.title;

	// Screenshot crop: from top of the source, sized to fill the full VIDEO_W×VIDEO_H.
	// Caption band can be anchored top or bottom (default bottom). When a scene's UI
	// is anchored to the same edge as the band — e.g. a chat FAB pinned bottom-right —
	// flip the band to the opposite edge so it doesn't obscure that UI.
	const position = scene.captionPosition || 'bottom';
	const textWidth = VIDEO_W - CAPTION_PAD_X * 2;
	const captionBandY = position === 'top' ? 0 : VIDEO_H - CAPTION_BAND_H;
	const accentLineY = position === 'top' ? CAPTION_BAND_H - 2 : captionBandY;
	const titleY = captionBandY + CAPTION_PAD_TOP;
	const bodyY = titleY + TITLE_FONT_SIZE + 14;

	const args = [
		// 1. Screenshot full-bleed — resize to fill, crop overflow from bottom
		src,
		'-resize', `${VIDEO_W}x${VIDEO_H}^`,
		'-gravity', 'north',
		'-background', BG_COLOR,
		'-extent', `${VIDEO_W}x${VIDEO_H}`,

		// 2. Translucent caption band (rgba so it blends with the screenshot)
		'(',
			'-size', `${VIDEO_W}x${CAPTION_BAND_H}`,
			'xc:rgba(10,10,10,0.88)',
		')',
		'-gravity', 'northwest',
		'-geometry', `+0+${captionBandY}`,
		'-composite',

		// 3. Emerald hairline on the inner edge of the band (separates band from screenshot)
		'(',
			'-size', `${VIDEO_W}x2`,
			`xc:${ACCENT_COLOR}`,
		')',
		'-gravity', 'northwest',
		'-geometry', `+0+${accentLineY}`,
		'-composite',

		// 4. Scene counter — tiny, top-right of the caption band
		'-font', 'Helvetica',
		'-pointsize', String(COUNTER_FONT_SIZE),
		'-fill', '#737373',
		'-gravity', 'northeast',
		'-annotate', `+${CAPTION_PAD_X}+${captionBandY + CAPTION_PAD_TOP + 6}`, progress,

		// 5. Title — bold, left-aligned inside the band
		'-font', 'Helvetica-Bold',
		'-pointsize', String(TITLE_FONT_SIZE),
		'-fill', '#f5f5f5',
		'-gravity', 'northwest',
		'-annotate', `+${CAPTION_PAD_X}+${titleY}`, titleText,

		// 6. Caption body — wrapped via a temp caption: image, composited under the title
		'(',
			'-background', 'none',
			'-fill', '#d4d4d4',
			'-font', 'Helvetica',
			'-pointsize', String(CAPTION_FONT_SIZE),
			'-size', `${textWidth}x${CAPTION_BAND_H - (bodyY - captionBandY) - CAPTION_PAD_TOP}`,
			`caption:${captionText}`,
		')',
		'-gravity', 'northwest',
		'-geometry', `+${CAPTION_PAD_X}+${bodyY}`,
		'-composite',

		framePath,
	];
	execFileSync('magick', args, { stdio: ['ignore', 'inherit', 'inherit'] });
}

function buildClip(sceneIndex, framePath, audioPath, totalDuration, clipPath) {
	const hold = captions.scenes[sceneIndex].holdSeconds ?? DEFAULT_HOLD_S;
	const args = [
		'-y',
		'-loop', '1', '-i', framePath,
		...(audioPath ? [
			'-i', audioPath,
			'-filter_complex', `[1:a]apad=pad_dur=${hold}[a]`,
			'-map', '0:v', '-map', '[a]',
		] : ['-map', '0:v', '-an']),
		'-c:v', 'libx264',
		'-tune', 'stillimage',
		'-pix_fmt', 'yuv420p',
		'-r', '30',
		...(audioPath ? ['-c:a', 'aac', '-b:a', '192k'] : []),
		'-t', totalDuration.toFixed(3),
		'-shortest',
		clipPath,
	];
	execFileSync('ffmpeg', args, { stdio: ['ignore', 'inherit', 'inherit'] });
}

// ─── stages ────────────────────────────────────────────────────────
function parseOptions(args) {
	const result = { stage: 'all', root: path.dirname(fileURLToPath(import.meta.url)), silent: process.env.REEL_NO_AUDIO === '1', force: false };
	const stages = ['script', 'audio', 'storyboard', 'render', 'all'];
	if (args[0] && !args[0].startsWith('-')) {
		result.stage = args.shift();
		if (!stages.includes(result.stage)) throw new Error(`Unknown stage: ${result.stage}`);
	}
	while (args.length) {
		const arg = args.shift();
		if (arg === '--help') result.help = true;
		else if (arg === '--silent') result.silent = true;
		else if (arg === '--force') result.force = true;
		else if (arg === '--root' && args[0] && !args[0].startsWith('-')) result.root = path.resolve(args.shift());
		else throw new Error(`Unknown or incomplete option: ${arg}`);
	}
	if (!result.help && result.force) {
		if (['audio', 'all'].includes(result.stage) && process.env.SKIP_TTS === '1') throw new Error('Cannot combine --force with SKIP_TTS');
		if (['storyboard', 'all'].includes(result.stage) && process.env.SKIP_FRAMES === '1') throw new Error('Cannot combine --force with SKIP_FRAMES');
	}
	return result;
}

function validateCaptions() {
	if (!Array.isArray(captions.scenes) || !captions.scenes.length) throw new Error('captions.json needs at least one scene');
	if (captions.instructions !== undefined && typeof captions.instructions !== 'string') throw new Error('instructions must be text');
	for (const field of ['voice', 'model']) {
		if (captions[field] !== undefined && (typeof captions[field] !== 'string' || !captions[field].trim())) throw new Error(`${field} must be nonempty text`);
	}
	captions.scenes.forEach((scene, i) => {
		for (const field of ['image', 'title', 'caption']) {
			if (typeof scene[field] !== 'string' || !scene[field].trim()) throw new Error(`Scene ${i + 1}: ${field} must be nonempty text`);
		}
		const image = path.relative(SCREENSHOTS_DIR, path.resolve(SCREENSHOTS_DIR, scene.image));
		if (image.startsWith('..') || path.isAbsolute(image)) throw new Error(`Scene ${i + 1}: image must be inside screenshots/`);
		if (scene.captionPosition && !['top', 'bottom'].includes(scene.captionPosition)) throw new Error(`Scene ${i + 1}: captionPosition must be top or bottom`);
		const hold = scene.holdSeconds ?? DEFAULT_HOLD_S;
		if (!Number.isFinite(hold) || hold < 0 || (options.silent && hold === 0)) throw new Error(`Scene ${i + 1}: holdSeconds must be ${options.silent ? 'positive' : 'nonnegative'}`);
	});
}

function scriptText() {
	return captions.scenes.map((scene, i) => `${String(i + 1).padStart(2, '0')}. ${scene.title}\nImage: ${scene.image}\n\n${scene.caption}`).join('\n\n') + '\n';
}

function writeScript() {
	const file = path.join(OUT_DIR, 'script.txt');
	fs.writeFileSync(file, scriptText());
	recordArtifact(file, scriptText());
	console.log(`Read aloud: ${file}`);
}

function speechSettings() {
	let saved = {};
	try { saved = JSON.parse(fs.readFileSync(path.join(AUDIO_DIR, 'settings.json'), 'utf8')); } catch { /* first run */ }
	const backend = process.env.ELEVENLABS_API_KEY ? 'elevenlabs' : process.env.OPENAI_API_KEY ? 'openai' : saved.backend || null;
	return {
		backend,
		voice: process.env.TTS_VOICE || captions.voice || (backend === 'elevenlabs' ? 'george' : 'coral'),
		model: process.env.TTS_MODEL || captions.model || (backend === 'elevenlabs' ? 'eleven_multilingual_v2' : 'gpt-4o-mini-tts'),
		instructions: captions.instructions || null,
	};
}

function audioInputs(i) {
	// The ordered script supplies surrounding-text context. A changed line
	// invalidates the take, including the context for adjacent scenes.
	const settings = speechSettings();
	const voiceId = settings.backend === 'elevenlabs' ? ELEVENLABS_VOICES[settings.voice.toLowerCase()] || settings.voice : settings.voice;
	return { settings, voiceId, lines: captions.scenes.map((s) => s.caption), index: i, generator: createTTS.toString() };
}

function audioFile(i) { return path.join(AUDIO_DIR, `${String(i + 1).padStart(2, '0')}.mp3`); }
function frameFile(i) { return path.join(FRAMES_DIR, `${String(i + 1).padStart(2, '0')}.png`); }

function frameInputs(i) {
	const scene = captions.scenes[i];
	return {
		image: fileFingerprint(path.join(SCREENSHOTS_DIR, scene.image)), title: scene.title, caption: scene.caption,
		position: scene.captionPosition || 'bottom', index: i, count: captions.scenes.length,
		layout: { VIDEO_W, VIDEO_H, CAPTION_BAND_H, CAPTION_PAD_X, CAPTION_PAD_TOP, TITLE_FONT_SIZE, CAPTION_FONT_SIZE, BG_COLOR, ACCENT_COLOR, COUNTER_FONT_SIZE },
		generator: buildFrame.toString(),
	};
}

function requireCurrent(file, inputs, stage) {
	if (!artifactIsCurrent(file, inputs)) throw new Error(`${path.basename(file)} is missing or changed. Run the ${stage} stage and review its output before rendering.`);
}

async function generateAudio() {
	if (options.silent) { console.log('Silent reel: narration is omitted.'); return; }
	const settings = speechSettings();
	const current = captions.scenes.map((_, i) => artifactIsCurrent(audioFile(i), audioInputs(i)));
	if (process.env.SKIP_TTS === '1') current.forEach((_, i) => requireCurrent(audioFile(i), audioInputs(i), 'audio'));
	else if (options.force || current.some((value) => !value)) {
		const tts = createTTS({ elevenLabsKey: process.env.ELEVENLABS_API_KEY, openAiKey: process.env.OPENAI_API_KEY, ...settings });
		// Regenerate the take together so its surrounding-text context stays
		// consistent instead of mixing clips from different script revisions.
		for (let i = 0; i < captions.scenes.length; i++) {
			await tts.generate(captions.scenes[i].caption, audioFile(i), {
				previousText: captions.scenes[i - 1]?.caption, nextText: captions.scenes[i + 1]?.caption,
			});
		}
		fs.writeFileSync(path.join(AUDIO_DIR, 'settings.json'), JSON.stringify(settings, null, 2) + '\n');
		captions.scenes.forEach((_, i) => recordArtifact(audioFile(i), audioInputs(i)));
	}
	const file = path.join(OUT_DIR, 'audio.html');
	fs.writeFileSync(file, previewHtml(false));
	recordArtifact(file, previewInputs(false));
	console.log(`Listen: ${file}`);
}

function generateStoryboard() {
	const inputs = captions.scenes.map((_, i) => frameInputs(i));
	if (process.env.SKIP_FRAMES === '1') inputs.forEach((recipe, i) => requireCurrent(frameFile(i), recipe, 'storyboard'));
	else inputs.forEach((recipe, i) => {
		if (options.force || !artifactIsCurrent(frameFile(i), recipe)) {
			buildFrame(captions.scenes[i], i, frameFile(i));
			recordArtifact(frameFile(i), recipe);
		}
	});
	const file = path.join(OUT_DIR, 'storyboard.html');
	fs.writeFileSync(file, previewHtml(true));
	recordArtifact(file, previewInputs(true));
	console.log(`Check composition and captions: ${file}`);
}

function previewInputs(withFrames) {
	return { silent: options.silent, generator: previewHtml.toString(), scenes: captions.scenes.map((scene, i) => ({
		title: scene.title, caption: scene.caption, hold: scene.holdSeconds ?? DEFAULT_HOLD_S,
		frame: withFrames ? fileFingerprint(frameFile(i)) : null,
		audio: !options.silent && artifactIsCurrent(audioFile(i), audioInputs(i)) ? fileFingerprint(audioFile(i)) : null,
	})) };
}

function previewHtml(withFrames) {
	const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
	const data = (file, mime) => `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
	const scenes = captions.scenes.map((scene, i) => {
		const hasAudio = !options.silent && artifactIsCurrent(audioFile(i), audioInputs(i));
		const duration = hasAudio ? `${probeDuration(audioFile(i)).toFixed(1)} s narration` : options.silent ? `${scene.holdSeconds ?? DEFAULT_HOLD_S} s silent scene` : 'Current narration has not been generated';
		const frame = withFrames ? data(frameFile(i), 'image/png') : null;
		return `<article><h2>${i + 1}. ${escape(scene.title)}</h2>
			${withFrames ? `<img src="${frame}" alt="Captioned scene ${i + 1}: ${escape(scene.title)}"><details><summary>Inspect full-size frame</summary><div class="full-frame"><img src="${frame}" alt="Full-size scene ${i + 1}" width="${VIDEO_W}" height="${VIDEO_H}"></div></details>` : ''}
			<p>${escape(scene.caption)}</p><p class="detail">${duration}</p>
			${hasAudio ? `<audio controls preload="none" aria-label="Narration for scene ${i + 1}" src="${data(audioFile(i), 'audio/mpeg')}"></audio>` : ''}</article>`;
	}).join('\n');
	return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${withFrames ? 'Storyboard' : 'Narration'} review</title><style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;padding:32px;background:${BG_COLOR};color:#f5f5f5;font:16px/1.5 system-ui,sans-serif}main{max-width:1440px;margin:auto}h1{font-size:28px;margin:0}header p{color:#d4d4d4;max-width:70ch}.scenes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,32rem),1fr));gap:32px;margin-top:32px}article{min-width:0}h2{font-size:18px}img{width:100%;height:auto;display:block}p{overflow-wrap:anywhere}.detail{color:#a3a3a3;font-size:14px}audio{width:100%}summary{cursor:pointer;color:#d4d4d4;margin-top:12px}.full-frame{overflow:auto;margin-top:12px}.full-frame img{width:${VIDEO_W}px;max-width:none}@media(max-width:600px){body{padding:16px}}
</style></head><body><main><header><h1>${withFrames ? 'Review scenes before rendering' : 'Listen to the narration'}</h1><p>${withFrames ? 'Check the scene order, readable captions, and anything the caption band covers. Inspect each frame at full size before continuing.' : 'Check pronunciation, pace, and continuity between scenes. These clips are the audio the final reel will use.'}</p><p class="detail">Generated preview. Review is a human action; this page does not record approval.</p></header><section class="scenes">${scenes}</section></main></body></html>\n`;
}

function renderReel() {
	// Check every prerequisite before ffmpeg writes anything. This stage never
	// calls a provider or silently replaces something the operator reviewed.
	captions.scenes.forEach((_, i) => {
		requireCurrent(frameFile(i), frameInputs(i), 'storyboard');
		if (!options.silent) requireCurrent(audioFile(i), audioInputs(i), 'audio');
	});
	if (!options.silent) requireCurrent(path.join(OUT_DIR, 'audio.html'), previewInputs(false), 'audio');
	requireCurrent(path.join(OUT_DIR, 'storyboard.html'), previewInputs(true), 'storyboard');
	const clipPaths = captions.scenes.map((scene, i) => {
		const audio = options.silent ? null : audioFile(i);
		const hold = scene.holdSeconds ?? DEFAULT_HOLD_S;
		const totalDuration = audio ? probeDuration(audio) + hold : hold;
		const file = path.join(CLIPS_DIR, `${String(i + 1).padStart(2, '0')}.mp4`);
		const inputs = { frame: fileFingerprint(frameFile(i)), audio: audio && fileFingerprint(audio), hold, totalDuration, generator: buildClip.toString() };
		if (options.force || !artifactIsCurrent(file, inputs)) {
			buildClip(i, frameFile(i), audio, totalDuration, file);
			recordArtifact(file, inputs);
		}
		return file;
	});
	const outFile = path.join(OUT_DIR, 'demo-reel.mp4');
	const inputs = { clips: clipPaths.map(fileFingerprint), silent: options.silent, generator: renderReel.toString() };
	if (options.force || !artifactIsCurrent(outFile, inputs)) {
		const concatFile = path.join(ROOT, 'concat.txt');
		fs.writeFileSync(concatFile, clipPaths.map((file) => `file '${file.replace(/'/g, "'\\''")}'`).join('\n') + '\n');
		execFileSync('ffmpeg', [
			'-y', '-f', 'concat', '-safe', '0', '-i', concatFile,
			'-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
			...(options.silent ? ['-an'] : ['-c:a', 'aac', '-b:a', '192k']),
			'-movflags', '+faststart', outFile,
		], { stdio: ['ignore', 'inherit', 'inherit'] });
		recordArtifact(outFile, inputs);
	}
	console.log(`Rendered: ${outFile}`);
}

async function main() {
	validateCaptions();
	for (const d of [AUDIO_DIR, FRAMES_DIR, CLIPS_DIR, OUT_DIR]) fs.mkdirSync(d, { recursive: true });
	const stages = options.stage === 'all' ? ['script', 'audio', 'storyboard', 'render'] : [options.stage];
	for (const stage of stages) {
		console.log(`Demo reel: ${stage}`);
		if (stage === 'script') writeScript();
		else {
			requireCurrent(path.join(OUT_DIR, 'script.txt'), scriptText(), 'script');
			if (stage === 'audio') await generateAudio();
			if (stage === 'storyboard') generateStoryboard();
			if (stage === 'render') renderReel();
		}
	}
}

main().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
