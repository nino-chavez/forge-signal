import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { fingerprint, fileFingerprint, artifactIsCurrent, recordArtifact } from '../templates/demo-reel/lib.mjs';

// Exercise the shipped scaffold and CLI with real ImageMagick/ffmpeg. Only the
// paid provider response is replaced with a locally generated test tone.
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const keep = process.env.DEMO_REEL_TEST_OUT;
const scratch = keep ? path.resolve(keep) : fs.mkdtempSync(path.join(os.tmpdir(), 'demo-reel-stages-'));
if (keep) {
  assert.equal(fs.existsSync(scratch), false, 'retained test directory must be new');
  fs.mkdirSync(scratch, { recursive: true });
}
const env = { ...process.env };
for (const key of ['ELEVENLABS_API_KEY', 'OPENAI_API_KEY', 'TTS_VOICE', 'TTS_MODEL', 'SKIP_TTS', 'SKIP_FRAMES', 'REEL_NO_AUDIO']) delete env[key];
const calls = path.join(scratch, 'provider-calls.jsonl');
const tone = path.join(scratch, 'synthetic-tone.mp3');
const mock = path.join(scratch, 'mock-provider.mjs');
let checks = 0;
function check(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
function command(bin, args, extraEnv = {}, expected = 0) {
  const result = spawnSync(bin, args, { cwd: repo, env: { ...env, ...extraEnv }, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
  assert.ifError(result.error);
  assert.equal(result.status, expected, `${bin} ${args.join(' ')}\n${result.stdout}\n${result.stderr}`);
  return `${result.stdout}\n${result.stderr}`;
}
function countCalls() { return fs.existsSync(calls) ? fs.readFileSync(calls, 'utf8').trim().split('\n').filter(Boolean).length : 0; }
function scaffold(name) {
  const root = path.join(scratch, name);
  command('bash', [path.join(repo, 'templates/demo-reel/scaffold.sh'), root]);
  assert.equal(fs.existsSync(path.join(root, 'lib.mjs')), true);
  return root;
}
function cli(root, stage, extraEnv = {}, expected = 0, flags = []) {
  return command(process.execPath, ['--import', mock, path.join(root, 'generate.mjs'), ...(stage ? [stage] : []), ...flags], {
    REEL_TEST_AUDIO: tone, REEL_TEST_CALLS: calls, ...extraEnv,
  }, expected);
}
function edit(root, fn) {
  const file = path.join(root, 'captions.json');
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  fn(config);
  fs.writeFileSync(file, JSON.stringify(config, null, 2));
}
function streams(file) {
  return JSON.parse(command('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height:format=duration', '-of', 'json', file]));
}

try {
  command('ffmpeg', ['-v', 'error', '-f', 'lavfi', '-i', 'sine=frequency=440:duration=0.65', '-c:a', 'libmp3lame', tone]);
  fs.writeFileSync(mock, `import fs from 'node:fs';
    globalThis.fetch = async (url, options) => {
      const payload = JSON.parse(options.body);
      fs.appendFileSync(process.env.REEL_TEST_CALLS, JSON.stringify({ url, payload }) + '\\n');
      return new Response(fs.readFileSync(process.env.REEL_TEST_AUDIO), { status: 200, headers: { 'request-id': 'synthetic-request' } });
    };\n`);
  const root = scaffold("reel's review");
  const script = path.join(root, 'out/script.txt');
  const audio = path.join(root, 'audio/01.mp3');
  const frame = path.join(root, 'frames/01.png');
  const video = path.join(root, 'out/demo-reel.mp4');
  const config = {
    voice: 'coral', model: 'gpt-4o-mini-tts', defaultHoldSeconds: 0.15,
    scenes: [
      { image: 'one.png', title: 'Synthetic demo: schedule', caption: 'Synthetic rehearsal. Check the schedule before the day begins.' },
      { image: 'two.png', title: 'Synthetic demo: results', caption: 'Every result on this screen is invented for this test.', captionPosition: 'top' },
    ],
  };
  fs.writeFileSync(path.join(root, 'captions.json'), JSON.stringify(config));
  check('stages stop when the script has not been generated', () => {
    assert.match(cli(root, 'audio', {}, 1), /script stage/);
    assert.equal(countCalls(), 0);
  });
  check('script is generated without screenshots or credentials', () => {
    cli(root, 'script');
    assert.match(fs.readFileSync(script, 'utf8'), /Synthetic rehearsal/);
    assert.equal(fs.existsSync(audio), false);
  });
  for (const [name, background, text] of [
    ['one.png', '#17212c', 'Synthetic demo: schedule'], ['two.png', '#1e2922', 'Synthetic demo: results'],
  ]) {
    command('magick', ['-size', '1440x900', `xc:${background}`, '-font', 'Helvetica', '-fill', '#f5f5f5', '-pointsize', '48', '-annotate', '+80+350', text, path.join(root, 'screenshots', name)]);
  }
  check('storyboard runs without provider calls and stops before rendering', () => {
    cli(root, 'storyboard');
    assert.equal(countCalls(), 0);
    assert.equal(fs.existsSync(video), false);
    assert.equal(fs.existsSync(audio), false);
    assert.match(fs.readFileSync(path.join(root, 'out/storyboard.html'), 'utf8'), /data:image\/png;base64/);
  });
  check('render rejects missing narration before producing clips', () => {
    assert.match(cli(root, 'render', {}, 1), /audio stage/);
    assert.deepEqual(fs.readdirSync(path.join(root, 'clips')), []);
  });
  check('audio produces a playable preview without changing frames', () => {
    const before = fileFingerprint(frame);
    cli(root, 'audio', { OPENAI_API_KEY: 'synthetic-test-credential' });
    assert.equal(countCalls(), 2);
    assert.equal(fileFingerprint(frame), before);
    assert.match(fs.readFileSync(path.join(root, 'out/audio.html'), 'utf8'), /<audio controls/);
  });
  check('matching narration can be reused without credentials', () => {
    const before = fs.statSync(audio).mtimeMs;
    cli(root, 'audio');
    assert.equal(fs.statSync(audio).mtimeMs, before);
    assert.equal(countCalls(), 2);
  });
  check('new narration requires a refreshed storyboard preview', () => {
    assert.match(cli(root, 'render', {}, 1), /storyboard stage/);
    cli(root, 'storyboard');
  });
  check('render produces a real narrated MP4 and reuses unchanged output', () => {
    cli(root, 'render');
    const probe = streams(video);
    assert.deepEqual(probe.streams.map((s) => s.codec_type), ['video', 'audio']);
    assert.equal(probe.streams[0].width, 1440);
    assert.equal(probe.streams[0].height, 900);
    assert.ok(Number(probe.format.duration) > 1);
    const before = fs.statSync(video).mtimeMs;
    cli(root, 'render');
    assert.equal(fs.statSync(video).mtimeMs, before);
  });
  check('a title edit regenerates its frame while retaining the same narration', () => {
    const beforeAudio = fs.statSync(audio).mtimeMs;
    const beforeOther = fs.statSync(path.join(root, 'frames/02.png')).mtimeMs;
    edit(root, (c) => { c.scenes[0].title = 'Synthetic demo: revised schedule'; });
    assert.match(cli(root, 'render', {}, 1), /script stage/);
    cli(root, 'script');
    assert.match(cli(root, 'render', {}, 1), /storyboard stage/);
    cli(root, 'audio');
    cli(root, 'storyboard');
    assert.equal(fs.statSync(audio).mtimeMs, beforeAudio);
    assert.equal(fs.statSync(path.join(root, 'frames/02.png')).mtimeMs, beforeOther);
    assert.equal(countCalls(), 2);
  });
  check('changed narration cannot be hidden by either skip flag', () => {
    edit(root, (c) => { c.scenes[0].caption = 'Synthetic rehearsal. The updated schedule has a new start time.'; });
    cli(root, 'script');
    assert.match(cli(root, 'audio', { SKIP_TTS: '1' }, 1), /audio stage/);
    assert.match(cli(root, 'storyboard', { SKIP_FRAMES: '1' }, 1), /storyboard stage/);
    assert.equal(countCalls(), 2);
    cli(root, 'audio', { OPENAI_API_KEY: 'synthetic-test-credential' });
    cli(root, 'storyboard');
    cli(root, 'render');
    assert.equal(countCalls(), 4, 'the continuous take is regenerated when a line changes');
  });
  check('voice, model, provider, and instruction changes reject old audio', () => {
    for (const extraEnv of [{ TTS_VOICE: 'onyx' }, { TTS_MODEL: 'tts-1' }, { ELEVENLABS_API_KEY: 'synthetic-test-credential' }]) {
      assert.match(cli(root, 'render', extraEnv, 1), /audio stage/);
    }
    edit(root, (c) => { c.instructions = 'Speak slowly.'; });
    assert.match(cli(root, 'render', {}, 1), /audio stage/);
    edit(root, (c) => { delete c.instructions; });
    assert.equal(countCalls(), 4);
  });
  check('screenshot changes reject both render and blind frame reuse', () => {
    command('magick', ['-size', '1440x900', 'xc:#30221c', '-font', 'Helvetica', '-fill', '#f5f5f5', '-pointsize', '48', '-annotate', '+80+350', 'Synthetic demo: changed schedule', path.join(root, 'screenshots/one.png')]);
    assert.match(cli(root, 'render', {}, 1), /storyboard stage/);
    assert.match(cli(root, 'storyboard', { SKIP_FRAMES: '1' }, 1), /storyboard stage/);
    cli(root, 'storyboard');
  });
  check('output corruption and legacy assets without receipts fail closed', () => {
    const bytes = fs.readFileSync(audio);
    fs.writeFileSync(audio, Buffer.from('corrupt output'));
    assert.match(cli(root, 'render', {}, 1), /audio stage/);
    fs.writeFileSync(audio, bytes);
    const receipt = fs.readFileSync(`${audio}.cache.json`);
    fs.unlinkSync(`${audio}.cache.json`);
    assert.match(cli(root, 'audio', { SKIP_TTS: '1' }, 1), /audio stage/);
    fs.writeFileSync(`${audio}.cache.json`, receipt);
    cli(root, 'render');
  });
  check('scene reordering and removal reject old reviewed output', () => {
    const original = fs.readFileSync(path.join(root, 'captions.json'));
    edit(root, (c) => { c.scenes.reverse(); });
    cli(root, 'script');
    assert.match(cli(root, 'render', {}, 1), /storyboard stage/);
    edit(root, (c) => { c.scenes.pop(); });
    cli(root, 'script');
    assert.match(cli(root, 'render', {}, 1), /storyboard stage/);
    fs.writeFileSync(path.join(root, 'captions.json'), original);
    cli(root, 'script');
  });
  check('preview escapes supplied text and restores unchanged frame cache', () => {
    const original = fs.readFileSync(path.join(root, 'captions.json'));
    edit(root, (c) => { c.scenes[0].title = '<script>alert("test")</script>'; });
    cli(root, 'script');
    cli(root, 'storyboard');
    const html = fs.readFileSync(path.join(root, 'out/storyboard.html'), 'utf8');
    assert.match(html, /&lt;script&gt;/);
    assert.equal(html.includes('<script>'), false);
    fs.writeFileSync(path.join(root, 'captions.json'), original);
    cli(root, 'script');
    cli(root, 'storyboard');
  });
  check('no-command full run remains available and does not repeat paid work', () => {
    cli(root, undefined);
    assert.equal(countCalls(), 4);
  });
  check('silent full run needs no credentials and emits no audio stream', () => {
    const silent = scaffold('silent-review');
    fs.cpSync(path.join(root, 'screenshots'), path.join(silent, 'screenshots'), { recursive: true });
    fs.writeFileSync(path.join(silent, 'captions.json'), JSON.stringify({ ...config, defaultHoldSeconds: 0.7 }));
    cli(silent, undefined, {}, 0, ['--silent']);
    const probe = streams(path.join(silent, 'out/demo-reel.mp4'));
    assert.deepEqual(probe.streams.map((s) => s.codec_type), ['video']);
    assert.equal(countCalls(), 4);
  });
  check('changed pacing and edited previews require review again', () => {
    const silent = path.join(scratch, 'silent-review');
    edit(silent, (c) => { c.defaultHoldSeconds = 1; });
    assert.match(cli(silent, 'render', {}, 1, ['--silent']), /storyboard stage/);
    cli(silent, 'storyboard', {}, 0, ['--silent']);
    cli(silent, 'render', {}, 0, ['--silent']);
    const preview = path.join(silent, 'out/storyboard.html');
    fs.appendFileSync(preview, 'edited preview');
    assert.match(cli(silent, 'render', {}, 1, ['--silent']), /storyboard stage/);
    cli(silent, 'storyboard', {}, 0, ['--silent']);
  });
  check('ElevenLabs scene context is preserved and credentials are excluded from settings', () => {
    const eleven = scaffold('elevenlabs-review');
    fs.writeFileSync(path.join(eleven, 'captions.json'), JSON.stringify({ ...config, voice: 'george', model: 'eleven_multilingual_v2' }));
    cli(eleven, 'script');
    cli(eleven, 'audio', { ELEVENLABS_API_KEY: 'synthetic-test-credential' });
    const logged = fs.readFileSync(calls, 'utf8').trim().split('\n').map(JSON.parse).slice(-2);
    assert.match(logged[0].url, /text-to-speech\/JBFqnCBsd6RMkjVDRZzb$/);
    assert.equal(logged[0].payload.next_text, config.scenes[1].caption);
    assert.equal(logged[1].payload.previous_text, config.scenes[0].caption);
    assert.equal(fs.readFileSync(path.join(eleven, 'audio/settings.json'), 'utf8').includes('synthetic-test-credential'), false);
    const before = countCalls();
    cli(eleven, 'audio');
    assert.equal(countCalls(), before);
    cli(eleven, 'audio', { ELEVENLABS_API_KEY: 'synthetic-test-credential' }, 0, ['--force']);
    assert.equal(countCalls(), before + 2);
  });
  check('the source generator can render a reel through --root', () => {
    command(process.execPath, [path.join(repo, 'templates/demo-reel/generate.mjs'), 'render', '--root', path.join(scratch, 'silent-review'), '--silent']);
  });
  check('help needs no input and malformed options fail before running', () => {
    assert.match(command(process.execPath, [path.join(repo, 'templates/demo-reel/generate.mjs'), '--help']), /storyboard/);
    assert.match(cli(root, 'bogus', {}, 1), /Unknown stage/);
    assert.match(cli(root, 'script', {}, 1, ['--root']), /incomplete option/);
  });
  check('force and skip cannot silently override each other', () => {
    const before = countCalls();
    assert.match(cli(root, 'audio', { SKIP_TTS: '1' }, 1, ['--force']), /Cannot combine/);
    assert.match(cli(root, 'storyboard', { SKIP_FRAMES: '1' }, 1, ['--force']), /Cannot combine/);
    assert.equal(countCalls(), before);
  });
  check('cache checks reject changed inputs, malformed receipts, and changed bytes', () => {
    const file = path.join(scratch, 'cache-proof.txt');
    fs.writeFileSync(file, 'sample');
    assert.equal(artifactIsCurrent(file, { voice: 'a' }), false);
    recordArtifact(file, { voice: 'a' });
    assert.equal(artifactIsCurrent(file, { voice: 'a' }), true);
    assert.equal(artifactIsCurrent(file, { voice: 'b' }), false);
    fs.writeFileSync(file, 'edited');
    assert.equal(artifactIsCurrent(file, { voice: 'a' }), false);
    fs.writeFileSync(`${file}.cache.json`, '{bad json');
    assert.equal(artifactIsCurrent(file, { voice: 'a' }), false);
    assert.equal(fingerprint({ a: 1, b: 2 }), fingerprint({ b: 2, a: 1 }));
  });
  check('scaffold will not overwrite an existing script', () => {
    const original = fs.readFileSync(path.join(root, 'captions.json'));
    command('bash', [path.join(repo, 'templates/demo-reel/scaffold.sh'), root], {}, 1);
    assert.deepEqual(fs.readFileSync(path.join(root, 'captions.json')), original);
  });
  console.log(`${checks} demo-reel regression checks passed; paid provider calls: 0.`);
  if (keep) console.log(`Synthetic test artifacts retained at ${scratch}`);
} finally {
  if (!keep) fs.rmSync(scratch, { recursive: true, force: true });
}
