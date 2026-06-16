#!/usr/bin/env node
/**
 * Demo reel generator (VIDEO) — captured product video + timed manifest → narrated MP4.
 *
 * The motion half of the off-site reel pipeline (rally-hq → forge-signal; see
 * docs/plans/SPEC-reel-pipeline.md in rally-hq). Unlike generate.mjs (still screenshots),
 * the visual track is a REAL recording of the product (a demo-player tour). This script
 * lays the narration + timed captions + brand band over it:
 *
 *   1. Trim the manifest's leadInMs off the front (page-load before the tour started)
 *   2. Per narrated step: OpenAI/ElevenLabs TTS → audio/NN.mp3, caption overlay PNG
 *   3. ffmpeg: overlay each caption on its [startMs,endMs] window, place each narration
 *      clip at its startMs (adelay), mix → narrated, captioned MP4
 *
 * No third-party at playback — the artifact is a self-hosted MP4.
 *
 * Manifest contract (emitted by rally-hq's record-reel harness):
 *   { tour, leadInMs, totalMs, steps: [{ speechText, startMs, durationMs }] }
 *   startMs/durationMs are relative to tour start (i.e. AFTER leadInMs is trimmed).
 *
 * Usage:
 *   REEL_VIDEO=in.webm REEL_MANIFEST=in.manifest.json REEL_OUT=out/reel.mp4 \
 *     node generate-video.mjs
 *
 * Env: OPENAI_API_KEY or ELEVENLABS_API_KEY (auto-sourced from rally-hq/.env.local),
 *      TTS_VOICE, TTS_MODEL, SKIP_TTS=1 (reuse audio/*.mp3 for fast iteration).
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {
	loadKey,
	createTTS,
	probeDuration,
	probeDimensions,
	renderCaptionPng,
	CAPTION_BAND_H
} from './lib.mjs'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const AUDIO_DIR = path.join(ROOT, 'audio')
const FRAMES_DIR = path.join(ROOT, 'frames')
const OUT_DIR = path.join(ROOT, 'out')
for (const d of [AUDIO_DIR, FRAMES_DIR, OUT_DIR]) fs.mkdirSync(d, { recursive: true })

// ─── inputs ──────────────────────────────────────────────────────────
const VIDEO = process.env.REEL_VIDEO
const MANIFEST = process.env.REEL_MANIFEST
const OUT = process.env.REEL_OUT || path.join(OUT_DIR, 'reel.mp4')
if (!VIDEO || !MANIFEST) throw new Error('Set REEL_VIDEO and REEL_MANIFEST')
if (!fs.existsSync(VIDEO)) throw new Error(`Video not found: ${VIDEO}`)
if (!fs.existsSync(MANIFEST)) throw new Error(`Manifest not found: ${MANIFEST}`)

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'))
const steps = (manifest.steps || []).filter((s) => s.speechText && s.speechText.trim())
if (steps.length === 0) throw new Error('Manifest has no narrated steps')
const leadInSec = Math.max(0, (manifest.leadInMs || 0) / 1000)

// ─── TTS backend ─────────────────────────────────────────────────────
const rallyEnv = path.resolve(process.env.HOME || '', 'Workspace/dev/apps/rally-hq/.env.local')
const elevenLabsKey = loadKey('ELEVENLABS_API_KEY', [rallyEnv, path.join(ROOT, '.env')])
const openAiKey = loadKey('OPENAI_API_KEY', [rallyEnv, path.join(ROOT, '.env')])
// Default narration voice: the chosen ElevenLabs voice (override with TTS_VOICE).
const voice = process.env.TTS_VOICE || (elevenLabsKey ? 'S9NKLs1GeSTKzXd9D0Lf' : 'onyx')
const model =
	process.env.TTS_MODEL || (elevenLabsKey ? 'eleven_multilingual_v2' : 'gpt-4o-mini-tts')
const tts = createTTS({ elevenLabsKey, openAiKey, voice, model, instructions: manifest.instructions })

const skipTTS = process.env.SKIP_TTS === '1'
const sec = (ms) => (ms / 1000).toFixed(3)

async function main() {
	console.log(`\nDemo reel (video) generator`)
	console.log(`  video:    ${VIDEO}`)
	console.log(`  manifest: ${MANIFEST} (${steps.length} narrated steps, leadIn ${leadInSec}s)`)
	console.log(`  voice:    ${voice} (${tts.backend}: ${model})`)
	console.log(`  output:   ${OUT}\n`)

	// Caption overlays must match the actual recorded video size, not a fixed constant.
	// The caption band is appended BELOW the video (the frame is padded by CAPTION_BAND_H)
	// so the product screenshot stays full-frame, never covered by the band.
	const { width, height } = probeDimensions(VIDEO)
	const outH = height + CAPTION_BAND_H
	console.log(`  video size: ${width}x${height} → output ${width}x${outH} (caption band below)`)

	// 1. Per-step narration + caption overlay
	console.log('[1/3] TTS + caption overlays')
	const audioPaths = []
	const framePaths = []
	for (let i = 0; i < steps.length; i++) {
		const idx = String(i + 1).padStart(2, '0')
		const audioPath = path.join(AUDIO_DIR, `v${idx}.mp3`)
		const framePath = path.join(FRAMES_DIR, `cap-${idx}.png`)
		if (!(skipTTS && fs.existsSync(audioPath))) {
			console.log(`  ${idx} → ${steps[i].speechText.length} chars`)
			await tts.generate(steps[i].speechText, audioPath)
			await new Promise((r) => setTimeout(r, 600))
		} else {
			console.log(`  ${idx} cached`)
		}
		// Caption canvas is the PADDED height so the band lands in the appended bottom
		// strip (y = height), clear of the screenshot above it.
		renderCaptionPng({ caption: steps[i].speechText, position: 'bottom', width, height: outH }, framePath)
		audioPaths.push(audioPath)
		framePaths.push(framePath)
	}

	// 2. Build the ffmpeg graph: trim lead-in, overlay timed captions, place narration.
	console.log('\n[2/3] Compositing narration + captions over the video')
	const inputs = ['-ss', sec(manifest.leadInMs || 0), '-i', VIDEO]
	framePaths.forEach((f) => inputs.push('-i', f))
	audioPaths.forEach((a) => inputs.push('-i', a))

	const nFrames = framePaths.length
	const filters = []

	// Pad the video into the taller output frame (black band appended at the bottom) so
	// the screenshot is full-frame at top and the captions overlay the padding, not the UI.
	filters.push(`[0:v]pad=${width}:${outH}:0:0:black[base]`)

	// Caption overlay chain — each caption is visible only on its [start, end] window.
	let vlabel = 'base'
	steps.forEach((s, i) => {
		const start = sec(s.startMs)
		const end = sec(s.startMs + s.durationMs)
		const capInput = 1 + i // frame inputs start at index 1
		const out = i === steps.length - 1 ? 'vout' : `v${i}`
		filters.push(
			`[${vlabel}][${capInput}:v]overlay=0:0:enable='between(t,${start},${end})'[${out}]`
		)
		vlabel = out
	})

	// Narration — delay each clip to its step start, then sum (paced ⇒ non-overlapping).
	const amixLabels = []
	steps.forEach((s, i) => {
		const audioInput = 1 + nFrames + i
		filters.push(`[${audioInput}:a]adelay=${s.startMs}|${s.startMs}[a${i}]`)
		amixLabels.push(`[a${i}]`)
	})
	filters.push(`${amixLabels.join('')}amix=inputs=${steps.length}:normalize=0[aout]`)

	const args = [
		'-y',
		...inputs,
		'-filter_complex', filters.join(';'),
		'-map', '[vout]',
		'-map', '[aout]',
		'-c:v', 'libx264',
		'-pix_fmt', 'yuv420p',
		'-r', '30',
		'-c:a', 'aac',
		'-b:a', '192k',
		'-movflags', '+faststart',
		// End at the later of the video's tour content or the last narration tail.
		'-shortest',
		OUT
	]
	execFileSync('ffmpeg', args, { stdio: ['ignore', 'inherit', 'inherit'] })

	// 3. Report
	console.log('\n[3/3] Done')
	const stat = fs.statSync(OUT)
	const dur = probeDuration(OUT)
	console.log(`\n✓ ${OUT}`)
	console.log(`  ${(stat.size / 1024 / 1024).toFixed(1)} MB · ${dur.toFixed(1)}s`)
}

main().catch((err) => {
	console.error('\n✗', err.message)
	process.exit(1)
})
