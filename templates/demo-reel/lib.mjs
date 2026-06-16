/**
 * Shared demo-reel helpers — TTS, key loading, caption rendering, video constants.
 *
 * Used by both generators:
 *   generate.mjs        — stills + narration → MP4 (offline screenshot reel)
 *   generate-video.mjs  — captured product VIDEO + timed manifest → narrated MP4
 *                         (the rally-hq demo-player reel pipeline; see SPEC-reel-pipeline.md)
 */
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

// ─── layout / brand constants ───────────────────────────────────────
export const VIDEO_W = 1440
export const VIDEO_H = 900
export const CAPTION_BAND_H = 220
export const CAPTION_PAD_X = 60
export const CAPTION_PAD_TOP = 22
export const TITLE_FONT_SIZE = 30
export const CAPTION_FONT_SIZE = 20
export const BG_COLOR = '#0a0a0a'
export const ACCENT_COLOR = '#10b981'

// ElevenLabs pre-built voices that suit narration.
export const ELEVENLABS_VOICES = {
	george: 'JBFqnCBsd6RMkjVDRZzb',
	rachel: '21m00Tcm4TlvDq8ikWAM',
	adam: 'pNInz6obpgDQGcFmaJgB',
	josh: 'TxGEqnHWrfWFTfGW9XjX',
	sam: 'yoZ06aMxZJJ28mfd3POQ',
	charlie: 'IKne3meq5aSn9XLyUdCD'
}

/** Read an env var, falling back to scanning the given .env-style files. */
export function loadKey(name, searchPaths = []) {
	if (process.env[name]) return process.env[name]
	for (const p of searchPaths) {
		if (!fs.existsSync(p)) continue
		const match = fs.readFileSync(p, 'utf-8').match(new RegExp(`^${name}=(.+)$`, 'm'))
		if (match) return match[1].trim().replace(/^["']|["']$/g, '')
	}
	return null
}

/**
 * Build a TTS function bound to whichever backend is configured. ElevenLabs is
 * preferred when its key is present; OpenAI is the fallback. Returns an async
 * `(text, outputPath) => void` plus the resolved backend name for logging.
 */
export function createTTS({ elevenLabsKey, openAiKey, voice, model, instructions }) {
	if (!elevenLabsKey && !openAiKey) {
		throw new Error('Set ELEVENLABS_API_KEY (preferred) or OPENAI_API_KEY for TTS')
	}
	const backend = elevenLabsKey ? 'elevenlabs' : 'openai'

	async function elevenLabs(text, outputPath) {
		const voiceId = ELEVENLABS_VOICES[voice?.toLowerCase()] || voice
		const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
			method: 'POST',
			headers: {
				'xi-api-key': elevenLabsKey,
				'Content-Type': 'application/json',
				Accept: 'audio/mpeg'
			},
			body: JSON.stringify({
				text,
				model_id: model,
				voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true }
			})
		})
		if (!res.ok) throw new Error(`ElevenLabs TTS failed (${res.status}): ${await res.text()}`)
		fs.writeFileSync(outputPath, Buffer.from(await res.arrayBuffer()))
	}

	async function openAi(text, outputPath) {
		const payload = { model, voice, input: text, response_format: 'mp3' }
		if (instructions && model?.startsWith('gpt-4o')) payload.instructions = instructions
		const res = await fetch('https://api.openai.com/v1/audio/speech', {
			method: 'POST',
			headers: { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
		if (!res.ok) throw new Error(`OpenAI TTS failed (${res.status}): ${await res.text()}`)
		fs.writeFileSync(outputPath, Buffer.from(await res.arrayBuffer()))
	}

	return { backend, generate: backend === 'elevenlabs' ? elevenLabs : openAi }
}

/** Duration of an audio/video file in seconds, via ffprobe. */
export function probeDuration(mediaPath) {
	const out = execFileSync(
		'ffprobe',
		['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', mediaPath],
		{ stdio: ['ignore', 'pipe', 'inherit'] }
	)
		.toString()
		.trim()
	return parseFloat(out)
}

/**
 * Render a TRANSPARENT caption overlay PNG (band + accent hairline + title + wrapped
 * body), sized to the full frame so ffmpeg can overlay it at 0,0 and toggle it per
 * step with `enable='between(t,...)'`. Position 'top' or 'bottom' anchors the band.
 */
export function renderCaptionPng(
	{ title, caption, position = 'bottom' },
	framePath
) {
	const textWidth = VIDEO_W - CAPTION_PAD_X * 2
	const bandY = position === 'top' ? 0 : VIDEO_H - CAPTION_BAND_H
	const accentY = position === 'top' ? CAPTION_BAND_H - 2 : bandY
	const titleY = bandY + CAPTION_PAD_TOP
	const bodyY = titleY + TITLE_FONT_SIZE + 14

	const args = [
		// Transparent full-frame canvas
		'-size', `${VIDEO_W}x${VIDEO_H}`,
		'xc:none',
		// Translucent band
		'(', '-size', `${VIDEO_W}x${CAPTION_BAND_H}`, 'xc:rgba(10,10,10,0.88)', ')',
		'-gravity', 'northwest', '-geometry', `+0+${bandY}`, '-composite',
		// Accent hairline
		'(', '-size', `${VIDEO_W}x2`, `xc:${ACCENT_COLOR}`, ')',
		'-gravity', 'northwest', '-geometry', `+0+${accentY}`, '-composite'
	]
	if (title) {
		args.push(
			'-font', 'Helvetica-Bold', '-pointsize', String(TITLE_FONT_SIZE), '-fill', '#f5f5f5',
			'-gravity', 'northwest', '-annotate', `+${CAPTION_PAD_X}+${titleY}`, title
		)
	}
	if (caption) {
		args.push(
			'(', '-background', 'none', '-fill', '#d4d4d4', '-font', 'Helvetica',
			'-pointsize', String(CAPTION_FONT_SIZE),
			'-size', `${textWidth}x${CAPTION_BAND_H - (bodyY - bandY) - CAPTION_PAD_TOP}`,
			`caption:${caption}`, ')',
			'-gravity', 'northwest', '-geometry', `+${CAPTION_PAD_X}+${bodyY}`, '-composite'
		)
	}
	args.push(framePath)
	execFileSync('magick', args, { stdio: ['ignore', 'inherit', 'inherit'] })
}
