// Oprawa dźwiękowa gry.
// Domyślnie wszystko jest syntezowane w Web Audio (działa offline, bez plików).
// Jeśli istnieje audio/pack.json, wskazane w nim pliki mp3 zastępują wybrane motywy
// (intro, bed, bedFinal, correct, win) – patrz audio/README.md.

const AC = window.AudioContext || window.webkitAudioContext;

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // numer MIDI → Hz

class Sound {
  constructor() {
    this.ctx = null;
    this.files = {};
    this.bed = null;
    this.loops = new Set();
    this.musicVol = 0.8;
    this.sfxVol = 0.9;
    this.muted = false;
    try {
      const s = JSON.parse(localStorage.getItem('mil-audio') || '{}');
      if (typeof s.music === 'number') this.musicVol = s.music;
      if (typeof s.sfx === 'number') this.sfxVol = s.sfx;
      if (typeof s.muted === 'boolean') this.muted = s.muted;
    } catch (e) { /* brak localStorage */ }
  }

  // Musi być wywołane z gestu użytkownika (kliknięcie) – wymóg przeglądarek.
  async unlock() {
    if (!AC) return;
    if (!this.ctx) {
      const ctx = (this.ctx = new AC());
      this.master = ctx.createGain();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.ratio.value = 4;
      this.master.connect(comp).connect(ctx.destination);
      this.music = ctx.createGain();
      this.sfx = ctx.createGain();
      this.music.connect(this.master);
      this.sfx.connect(this.master);
      // pogłos „studia telewizyjnego”
      this.verb = ctx.createConvolver();
      this.verb.buffer = this._impulse(2.8, 2.2);
      this.verbSend = ctx.createGain();
      this.verbSend.gain.value = 0.28;
      this.verbSend.connect(this.verb).connect(this.master);
      this.noiseBuf = this._noise(2);
      this._applyVolumes();
      this._loadPack();
    }
    if (this.ctx.state !== 'running') await this.ctx.resume().catch(() => {});
  }

  get t() { return this.ctx ? this.ctx.currentTime : 0; }
  get ready() { return !!this.ctx; }

  setVolumes({ music, sfx, muted }) {
    if (music !== undefined) this.musicVol = music;
    if (sfx !== undefined) this.sfxVol = sfx;
    if (muted !== undefined) this.muted = muted;
    try { localStorage.setItem('mil-audio', JSON.stringify({ music: this.musicVol, sfx: this.sfxVol, muted: this.muted })); } catch (e) {}
    this._applyVolumes();
  }

  _applyVolumes() {
    if (!this.ctx) return;
    const t = this.t;
    this.master.gain.setTargetAtTime(this.muted ? 0 : 0.9, t, 0.05);
    this.music.gain.setTargetAtTime(this.musicVol * 0.9, t, 0.05);
    this.sfx.gain.setTargetAtTime(this.sfxVol, t, 0.05);
  }

  async _loadPack() {
    try {
      const res = await fetch('audio/pack.json', { cache: 'no-cache' });
      if (!res.ok) return;
      const pack = await res.json();
      await Promise.all(Object.entries(pack).map(async ([key, file]) => {
        try {
          const r = await fetch('audio/' + file);
          if (!r.ok) return;
          const buf = await r.arrayBuffer();
          this.files[key] = await new Promise((ok, err) => this.ctx.decodeAudioData(buf, ok, err));
        } catch (e) { /* zostaje synteza */ }
      }));
    } catch (e) { /* brak paczki – synteza */ }
  }

  // ---------- klocki syntezy ----------

  _noise(sec) {
    const ctx = this.ctx;
    const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  _impulse(sec, decay) {
    const ctx = this.ctx;
    const len = ctx.sampleRate * sec;
    const b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return b;
  }

  _out(dest, verb = 0) {
    const g = this.ctx.createGain();
    g.connect(dest);
    if (verb) {
      const s = this.ctx.createGain();
      s.gain.value = verb;
      g.connect(s).connect(this.verbSend);
    }
    return g;
  }

  // Pojedynczy ton z obwiednią
  tone(freq, t, dur, o = {}) {
    const ctx = this.ctx;
    const { type = 'sine', gain = 0.2, attack = 0.01, release = 0.25, dest = this.sfx, detune = 0,
      cutoff = 0, cutoffEnd = 0, q = 0.8, glide = 0, verb = 0.4 } = o;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (glide) osc.frequency.exponentialRampToValueAtTime(glide, t + dur);
    osc.detune.value = detune;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.setValueAtTime(gain, t + Math.max(attack, dur));
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(attack, dur) + release);
    let node = osc;
    if (cutoff) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.Q.value = q;
      f.frequency.setValueAtTime(cutoff, t);
      if (cutoffEnd) f.frequency.exponentialRampToValueAtTime(cutoffEnd, t + dur + release);
      node.connect(f);
      node = f;
    }
    node.connect(g).connect(this._out(dest, verb));
    osc.start(t);
    osc.stop(t + Math.max(attack, dur) + release + 0.05);
    return osc;
  }

  // „Dęciaki/smyczki” – kilka rozstrojonych pił z filtrem
  stab(notes, t, dur, o = {}) {
    const { gain = 0.08, cutoff = 2600, cutoffEnd = 600, attack = 0.015, release = 0.6, dest = this.sfx, verb = 0.6 } = o;
    notes.forEach((n) => {
      [-9, 0, 9].forEach((d) => this.tone(NOTE(n), t, dur, { type: 'sawtooth', gain, detune: d, cutoff, cutoffEnd, attack, release, dest, verb }));
    });
  }

  pad(notes, t, dur, o = {}) {
    const { gain = 0.05, cutoff = 1200, attack = 0.8, release = 1.2, dest = this.music, verb = 0.7 } = o;
    notes.forEach((n) => {
      [-7, 7].forEach((d) => this.tone(NOTE(n), t, dur, { type: 'sawtooth', gain, detune: d, cutoff, attack, release, dest, verb }));
      this.tone(NOTE(n), t, dur, { type: 'triangle', gain: gain * 0.8, attack, release, dest, verb });
    });
  }

  bell(n, t, o = {}) {
    const { gain = 0.12, dest = this.sfx, dur = 1.2 } = o;
    const f = NOTE(n);
    this.tone(f, t, 0.02, { gain, release: dur, dest, verb: 0.7 });
    this.tone(f * 2.76, t, 0.01, { gain: gain * 0.35, release: dur * 0.5, dest, verb: 0.7 });
    this.tone(f * 5.4, t, 0.01, { gain: gain * 0.15, release: dur * 0.25, dest, verb: 0.7 });
  }

  timpani(n, t, o = {}) {
    const { gain = 0.5, dest = this.sfx, decay = 1.1 } = o;
    const f = NOTE(n);
    this.tone(f * 1.5, t, 0.01, { gain, glide: f, release: decay, dest, verb: 0.6 });
    this.tone(f * 1.5, t, 0.08, { gain: gain * 0.5, glide: f, release: decay * 0.8, dest, type: 'triangle', verb: 0.6 });
    this.noise(t, 0.05, { gain: gain * 0.35, type: 'lowpass', freq: 900, release: 0.25, dest });
  }

  noise(t, dur, o = {}) {
    const ctx = this.ctx;
    const { gain = 0.2, type = 'bandpass', freq = 1000, freqEnd = 0, q = 0.7, attack = 0.005, release = 0.2, dest = this.sfx, verb = 0.3 } = o;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(freq, t);
    if (freqEnd) f.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.setValueAtTime(gain, t + Math.max(dur, attack));
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, attack) + release);
    src.connect(f).connect(g).connect(this._out(dest, verb));
    src.start(t, Math.random());
    src.stop(t + dur + release + 0.05);
  }

  cymbal(t, o = {}) {
    const { gain = 0.12, decay = 2.2, dest = this.sfx } = o;
    this.noise(t, 0.02, { gain, type: 'highpass', freq: 6000, release: decay, dest, verb: 0.5 });
    this.noise(t, 0.02, { gain: gain * 0.6, type: 'bandpass', freq: 3500, q: 0.5, release: decay * 0.6, dest, verb: 0.5 });
  }

  swell(t, dur, o = {}) {
    const { gain = 0.2, from = 200, to = 5000, dest = this.sfx } = o;
    this.noise(t, dur, { gain, type: 'bandpass', freq: from, freqEnd: to, q: 1.2, attack: dur * 0.9, release: 0.08, dest, verb: 0.5 });
  }

  // Plik z paczki (jeśli załadowany)
  _playFile(key, { loop = false, dest = this.music, fadeIn = 0 } = {}) {
    const buf = this.files[key];
    if (!buf) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = loop;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(fadeIn ? 0.0001 : 1, this.t);
    if (fadeIn) g.gain.exponentialRampToValueAtTime(1, this.t + fadeIn);
    src.connect(g).connect(dest);
    src.start();
    const h = { stop: (fade = 0.6) => this._fadeStop(g, [src], fade) };
    this.loops.add(h);
    src.onended = () => this.loops.delete(h);
    return h;
  }

  _fadeStop(g, srcs, fade) {
    const t = this.t;
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(Math.max(g.gain.value, 0.0001), t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + fade);
    srcs.forEach((s) => { try { s.stop(t + fade + 0.05); } catch (e) {} });
  }

  // Pętla schedulowana (podkłady, stoper, pomruk publiczności)
  _loop(stepFn, interval, { fadeIn = 1 } = {}) {
    const ctx = this.ctx;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, this.t);
    out.gain.exponentialRampToValueAtTime(1, this.t + fadeIn);
    out.connect(this.music);
    let next = this.t + 0.05;
    let step = 0;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      while (next < this.t + 0.2) {
        stepFn(step++, next, out);
        next += typeof interval === 'function' ? interval(step) : interval;
      }
    };
    tick();
    const id = setInterval(tick, 40);
    const h = {
      out,
      stop: (fade = 0.8) => {
        if (!alive) return;
        alive = false;
        clearInterval(id);
        const t = this.t;
        out.gain.cancelScheduledValues(t);
        out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), t);
        out.gain.exponentialRampToValueAtTime(0.0001, t + fade);
        setTimeout(() => out.disconnect(), (fade + 1.5) * 1000);
        this.loops.delete(h);
      },
    };
    this.loops.add(h);
    return h;
  }

  stopAll(fade = 0.5) {
    [...this.loops].forEach((h) => h.stop(fade));
    this.bed = null;
  }

  stopBed(fade = 0.6) {
    if (this.bed) { this.bed.stop(fade); this.bed = null; }
  }

  // ---------- motywy ----------

  intro() {
    if (!this.ctx) return;
    this.stopAll(0.3);
    const f = this._playFile('intro');
    if (f) { this.bed = f; return; }
    const t = this.t + 0.05;
    const m = this.music;
    // werbel kotłów narastający
    for (let i = 0; i < 18; i++) {
      const tt = t + 1.6 * (1 - Math.pow(1 - i / 18, 1.6));
      this.timpani(33, tt, { gain: 0.08 + i * 0.02, dest: m, decay: 0.4 });
    }
    this.swell(t, 1.7, { gain: 0.18, from: 150, to: 6000, dest: m });
    // wielkie uderzenie
    const hit = t + 1.75;
    this.stab([45, 52, 57, 60, 64], hit, 0.35, { gain: 0.07, dest: m, cutoff: 4000, cutoffEnd: 700, release: 1.2 });
    this.timpani(33, hit, { gain: 0.8, dest: m, decay: 1.8 });
    this.cymbal(hit, { gain: 0.16, dest: m });
    // arpeggio: Am – F – G – E
    const prog = [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 56, 59]];
    const bass = [45, 41, 43, 40];
    prog.forEach((ch, i) => {
      const bt = hit + 0.5 + i * 1.1;
      this.pad(ch, bt, 1.0, { gain: 0.035, dest: m, attack: 0.3, release: 0.6 });
      this.tone(NOTE(bass[i] - 12), bt, 1.0, { type: 'sawtooth', gain: 0.1, cutoff: 400, dest: m, release: 0.4 });
      for (let k = 0; k < 8; k++) {
        const n = ch[k % 3] + 12 + (k >= 3 && k < 6 ? 12 : 0);
        this.tone(NOTE(n), bt + k * 0.1375, 0.08, { type: 'square', gain: 0.03, cutoff: 3000, dest: m, release: 0.15 });
      }
      this.timpani(bass[i] - 12, bt, { gain: 0.35, dest: m });
    });
    const end = hit + 0.5 + 4 * 1.1;
    this.stab([45, 52, 57, 61, 64, 69], end, 0.5, { gain: 0.06, dest: m, cutoff: 5000, cutoffEnd: 900, release: 2.5 });
    this.timpani(33, end, { gain: 0.9, dest: m, decay: 2.2 });
    this.cymbal(end, { gain: 0.2, decay: 3, dest: m });
    setTimeout(() => { if (!this.bed) this.ambient(); }, (end - this.t + 2.5) * 1000);
  }

  // Delikatne tło ekranu tytułowego
  ambient() {
    if (!this.ctx) return;
    this.stopBed(0.4);
    const chords = [[45, 52, 60, 64], [41, 48, 57, 64], [43, 50, 59, 62], [45, 52, 57, 64]];
    this.bed = this._loop((step, t, out) => {
      const ch = chords[step % 4];
      this.pad(ch, t, 3.6, { gain: 0.022, dest: out, attack: 1.5, release: 1.5, cutoff: 900 });
      [0, 1, 2, 3, 4, 5, 6, 7].forEach((k) => {
        if (Math.random() < 0.55) this.tone(NOTE(ch[k % 4] + 24), t + k * 0.5, 0.05, { gain: 0.012, dest: out, release: 0.8, verb: 0.9 });
      });
    }, 4, { fadeIn: 2 });
  }

  // Wejście nowego pytania – „Let's play”
  letsPlay(level) {
    if (!this.ctx) return;
    this.stopBed(0.2);
    const t = this.t + 0.02;
    const r = 45 + level;
    this.swell(t, 0.7, { gain: 0.16, from: 180, to: 7000 });
    this.stab([r, r + 7, r + 12, r + 15], t + 0.72, 0.18, { gain: 0.06, cutoff: 4200, cutoffEnd: 500, release: 0.9 });
    this.timpani(r - 12, t + 0.72, { gain: 0.6 });
    this.cymbal(t + 0.72, { gain: 0.08, decay: 1.4 });
  }

  // Podkład pod pytanie – z każdym poziomem wyżej, szybciej, ostrzej
  questionBed(level) {
    if (!this.ctx) return;
    this.stopBed(0.3);
    const fileKey = level >= 11 && this.files.bedFinal ? 'bedFinal' : this.files.bed ? 'bed' : null;
    if (fileKey) { this.bed = this._playFile(fileKey, { loop: true, fadeIn: 0.8 }); return; }
    const L = level;
    const root = 33 + L; // A1 → w górę o półton na poziom
    const bpm = 76 + L * 3;
    const beat = 60 / bpm;
    const prog = [0, 0, -4, -2, 0, 0, -5, -1]; // i – i – bVI – bVII – i – i – v – VII
    const cutoff = 380 + L * 55;
    this.bed = this._loop((step, t, out) => {
      const bar = Math.floor(step / 8);
      const shift = prog[bar % prog.length];
      const b = root + shift;
      const eighth = step % 8;
      // puls basu na ósemkach, akcent na raz
      this.tone(NOTE(b), t, beat * 0.32, { type: 'sawtooth', gain: eighth % 4 === 0 ? 0.16 : 0.09, cutoff, cutoffEnd: 120, release: 0.12, dest: out, verb: 0.1 });
      this.tone(NOTE(b - 12), t, beat * 0.3, { type: 'sine', gain: eighth % 4 === 0 ? 0.22 : 0.1, release: 0.1, dest: out, verb: 0 });
      // plam harmoniczny co takt
      if (eighth === 0) {
        const minor = [b + 24, b + 27, b + 31, b + 38];
        this.pad(minor, t, beat * 4 - 0.1, { gain: 0.018 + L * 0.0015, dest: out, attack: 0.6, release: 0.5, cutoff: 900 + L * 90 });
      }
      // „tykające” wysokie dźwięki napięcia
      const tickSeq = [0, 7, 12, 7, 3, 7, 12, 15];
      if (L >= 2 || eighth % 2 === 0) {
        this.tone(NOTE(b + 48 + tickSeq[eighth]), t, 0.04, { type: 'triangle', gain: 0.018 + L * 0.002, release: 0.18, dest: out, verb: 0.6 });
      }
      // serce na wyższych poziomach
      if (L >= 5 && (eighth === 0 || eighth === 1)) {
        this.tone(eighth === 0 ? 55 : 48, t, 0.05, { type: 'sine', gain: 0.25, glide: 35, release: 0.18, dest: out, verb: 0 });
      }
      // tremolo smyczków w końcówce gry
      if (L >= 8 && eighth === 0) {
        for (let k = 0; k < 16; k++) {
          this.tone(NOTE(b + 36 + (k % 2 ? 3 : 0)), t + k * (beat / 4), beat / 5, { type: 'sawtooth', gain: 0.012 + (L - 8) * 0.004, cutoff: 2400, release: 0.05, dest: out, verb: 0.5 });
        }
      }
    }, beat / 2, { fadeIn: 1.2 });
  }

  // „Czy to ostateczna odpowiedź?” – zatwierdzenie
  lockIn(level) {
    if (!this.ctx) return;
    this.stopBed(0.15);
    const t = this.t + 0.02;
    const r = 45 + Math.min(level, 11);
    this.stab([r, r + 3, r + 7, r + 12], t, 0.12, { gain: 0.07, cutoff: 3200, cutoffEnd: 300, release: 0.7 });
    this.timpani(r - 12, t, { gain: 0.5 });
    this.noise(t, 0.05, { gain: 0.1, type: 'highpass', freq: 3000, release: 0.4 });
  }

  // Napięcie przed odsłonięciem odpowiedzi
  suspense(level, dur) {
    if (!this.ctx || dur < 1.2) return;
    const r = 33 + level;
    const beat = Math.max(0.36, 0.6 - level * 0.02);
    this.bed = this._loop((step, t, out) => {
      this.tone(NOTE(r), t, beat * 0.5, { type: 'sawtooth', gain: 0.14, cutoff: 500, cutoffEnd: 100, release: 0.2, dest: out, verb: 0.1 });
      this.tone(55, t, 0.05, { gain: 0.3, glide: 35, release: 0.2, dest: out, verb: 0 });
      this.tone(48, t + 0.16, 0.05, { gain: 0.22, glide: 32, release: 0.2, dest: out, verb: 0 });
      if (step === 0) {
        this.tone(NOTE(r + 36), t, dur, { type: 'sawtooth', gain: 0.03, glide: NOTE(r + 41), cutoff: 1800, attack: dur * 0.8, release: 0.2, dest: out, verb: 0.6 });
        this.tone(NOTE(r + 39), t, dur, { type: 'sawtooth', gain: 0.025, glide: NOTE(r + 44), cutoff: 1800, attack: dur * 0.8, release: 0.2, dest: out, verb: 0.6 });
      }
    }, beat, { fadeIn: 0.3 });
  }

  correct(level, { threshold = false } = {}) {
    if (!this.ctx) return;
    this.stopBed(0.08);
    if (this.files.correct && !threshold) {
      this._playFile('correct', { dest: this.sfx });
    } else {
      const t = this.t + 0.02;
      const r = 57 + Math.min(level, 11); // durowy akord od A
      const big = level >= 4 || threshold;
      this.stab([r - 12, r - 5, r, r + 4, r + 7], t, big ? 0.5 : 0.25, { gain: big ? 0.06 : 0.045, cutoff: 5000, cutoffEnd: 1200, release: big ? 1.8 : 1.1 });
      [0, 4, 7, 12, 16, 19, 24].forEach((iv, k) => this.bell(r + iv, t + 0.06 * k, { gain: 0.08 }));
      this.timpani(r - 24, t, { gain: 0.6 });
      if (big) this.cymbal(t, { gain: 0.14, decay: 2.6 });
    }
    if (level >= 6 || threshold) this.applause(threshold ? 4 : 2.5, 0.6);
  }

  wrong(level) {
    if (!this.ctx) return;
    this.stopBed(0.08);
    const t = this.t + 0.02;
    const r = 40 + Math.min(level, 8);
    this.stab([r, r + 3, r + 6], t, 0.45, { gain: 0.08, cutoff: 1800, cutoffEnd: 200, release: 1.0 });
    this.stab([r - 1, r + 2, r + 5], t + 0.55, 1.2, { gain: 0.08, cutoff: 1400, cutoffEnd: 90, release: 1.8 });
    this.timpani(r - 12, t, { gain: 0.7 });
    this.timpani(r - 13, t + 0.55, { gain: 0.8, decay: 2 });
    this.tone(NOTE(r + 12), t + 0.55, 1.4, { type: 'sawtooth', gain: 0.05, glide: NOTE(r), cutoff: 1200, release: 0.8 });
  }

  walkAway() {
    if (!this.ctx) return;
    this.stopBed(0.2);
    const t = this.t + 0.02;
    this.pad([57, 60, 64], t, 0.9, { gain: 0.08, dest: this.sfx, attack: 0.1, release: 0.6 });
    this.pad([53, 57, 62], t + 0.9, 0.9, { gain: 0.08, dest: this.sfx, attack: 0.1, release: 0.6 });
    this.pad([52, 57, 61, 64], t + 1.8, 1.6, { gain: 0.09, dest: this.sfx, attack: 0.1, release: 2 });
    this.bell(69, t + 1.8, { gain: 0.08, dur: 2 });
    this.applause(3, 0.5);
  }

  million() {
    if (!this.ctx) return;
    this.stopAll(0.1);
    if (this._playFile('win', { dest: this.music })) { this.applause(8, 0.9); return; }
    const t = this.t + 0.05;
    const seq = [
      { at: 0, ch: [45, 57, 61, 64, 69] },
      { at: 0.5, ch: [50, 57, 62, 66, 69] },
      { at: 1.0, ch: [52, 59, 64, 68, 71] },
      { at: 1.5, ch: [45, 57, 61, 64, 69, 73] },
    ];
    seq.forEach(({ at, ch }, i) => {
      this.stab(ch, t + at, i === 3 ? 1.6 : 0.35, { gain: 0.055, cutoff: 6000, cutoffEnd: 1500, release: i === 3 ? 3 : 0.5 });
      this.timpani(ch[0] - 12, t + at, { gain: 0.8 });
      this.cymbal(t + at, { gain: 0.16, decay: i === 3 ? 4 : 1.2 });
    });
    for (let k = 0; k < 24; k++) this.bell(69 + [0, 4, 7, 12, 16, 19, 24, 28][k % 8], t + 1.5 + k * 0.08, { gain: 0.06, dur: 1.5 });
    // fajerwerki
    for (let k = 0; k < 8; k++) {
      const ft = t + 2.5 + k * 0.45 + Math.random() * 0.2;
      this.tone(1800 + Math.random() * 800, ft, 0.35, { gain: 0.03, glide: 600, release: 0.05, verb: 0.5 });
      this.noise(ft + 0.38, 0.03, { gain: 0.25, type: 'lowpass', freq: 1500, release: 0.9, verb: 0.8 });
    }
    this.applause(9, 1);
  }

  applause(dur = 4, level = 0.8) {
    if (!this.ctx) return;
    const t0 = this.t + 0.05;
    const n = Math.floor(dur * 90 * level);
    for (let i = 0; i < n; i++) {
      const p = Math.random();
      const tt = t0 + p * dur;
      // obwiednia: szybkie narastanie, długi zanik
      const env = p < 0.15 ? p / 0.15 : Math.pow(1 - (p - 0.15) / 0.85, 1.3);
      this.noise(tt, 0.008, { gain: (0.12 + Math.random() * 0.14) * env * level, type: 'bandpass', freq: 900 + Math.random() * 2200, q: 1.4, release: 0.03 + Math.random() * 0.04, verb: 0.4 });
    }
  }

  fifty() {
    if (!this.ctx) return;
    const t = this.t + 0.02;
    [0, 0.28].forEach((d) => {
      this.tone(1600, t + d, 0.22, { type: 'triangle', gain: 0.12, glide: 180, release: 0.1 });
      this.noise(t + d, 0.22, { gain: 0.16, freq: 4000, freqEnd: 300, q: 2, release: 0.1 });
    });
    this.stab([57, 64], t + 0.62, 0.1, { gain: 0.05, release: 0.6 });
  }

  phoneRing() {
    if (!this.ctx) return;
    const t = this.t + 0.05;
    [0, 1.3].forEach((d) => {
      for (let k = 0; k < 16; k++) {
        const tt = t + d + k * 0.05;
        this.tone(440, tt, 0.025, { gain: 0.14, release: 0.02, verb: 0.2 });
        this.tone(480, tt, 0.025, { gain: 0.14, release: 0.02, verb: 0.2 });
      }
    });
  }

  // Stoper 30 s dla telefonu do przyjaciela
  clock(seconds, level = 5) {
    if (!this.ctx) return null;
    this.stopBed(0.3);
    const r = 45 + level;
    const h = this._loop((step, t, out) => {
      if (step >= seconds) return;
      const last = seconds - step <= 5;
      this.tone(last ? 1760 : 1320, t, 0.015, { type: 'square', gain: last ? 0.12 : 0.08, cutoff: 5000, release: 0.05, dest: out, verb: 0.1 });
      this.tone(NOTE(r - 12 + (step % 2 ? 0 : 7)), t, 0.3, { type: 'sawtooth', gain: 0.16, cutoff: 500, cutoffEnd: 120, release: 0.3, dest: out, verb: 0.2 });
      if (step % 4 === 0) this.pad([r + 12, r + 15, r + 19], t, 3.8, { gain: 0.03, dest: out, attack: 0.4, release: 0.4 });
    }, 1, { fadeIn: 0.2 });
    this.bed = h;
    return h;
  }

  timeUp() {
    if (!this.ctx) return;
    this.stopBed(0.1);
    const t = this.t + 0.02;
    this.stab([45, 48, 51], t, 0.6, { gain: 0.07, cutoff: 2000, cutoffEnd: 300, release: 0.8 });
    this.timpani(33, t, { gain: 0.6 });
  }

  // Pomruk publiczności podczas głosowania
  audienceVote(dur = 4) {
    if (!this.ctx) return;
    this.stopBed(0.3);
    const t = this.t + 0.05;
    for (let k = 0; k < 40; k++) {
      const tt = t + (k / 40) * dur;
      this.noise(tt, 0.15, { gain: 0.14 + Math.random() * 0.1, type: 'bandpass', freq: 350 + Math.random() * 700, q: 2, attack: 0.08, release: 0.2, verb: 0.6 });
    }
    for (let k = 0; k < 12; k++) {
      this.tone(NOTE(69 + [0, 3, 7, 10][k % 4] + (k > 7 ? 12 : 0)), t + k * (dur / 12), 0.05, { type: 'triangle', gain: 0.06, release: 0.3, verb: 0.7 });
    }
    this.bell(81, t + dur, { gain: 0.1 });
    this.bell(76, t + dur + 0.12, { gain: 0.1 });
  }

  click() {
    if (!this.ctx) return;
    this.tone(1200, this.t, 0.01, { type: 'triangle', gain: 0.04, release: 0.05, verb: 0 });
  }

  // Odsłanianie odpowiedzi A/B/C/D
  reveal(i) {
    if (!this.ctx) return;
    this.tone(NOTE(76 + [0, 3, 7, 12][i]), this.t, 0.02, { type: 'triangle', gain: 0.035, release: 0.3, verb: 0.5 });
  }
}

export const sound = new Sound();
