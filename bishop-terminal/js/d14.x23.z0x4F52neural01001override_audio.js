// ORACLE NEXUS - Ambient machinery + typing sounds
// Self-contained Web Audio (no external files)

const OracleAudio = {
    ctx: null,
    ambientEnabled: false,
    soundEnabled: true,
    oscillators: [],
    noiseInterval: null,

    init() {
        if (this.ctx) return this.ctx;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        const resume = () => {
            if (this.ctx?.state === 'suspended') this.ctx.resume();
            document.removeEventListener('click', resume);
            document.removeEventListener('keydown', resume);
        };
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('keydown', resume, { once: true });
        return this.ctx;
    },

    startAmbient() {
        if (this.ambientEnabled) return;
        const ctx = this.init();
        this.ambientEnabled = true;

        // Low machinery hum
        [55, 110, 165].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq + (Math.random() * 2 - 1);
            gain.gain.value = 0.015;
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            this.oscillators.push({ osc, gain });
        });

        // Subtle white noise (fan/electrical)
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.008;
        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        noise.buffer = buffer;
        noise.loop = true;
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.gain.value = 0.03;
        noiseGain.connect(ctx.destination);
        noise.start();
        this.oscillators.push({ source: noise });

        // Occasional mechanical ticks (typing/machinery)
        this.noiseInterval = setInterval(() => {
            if (!this.ambientEnabled || !this.soundEnabled) return;
            if (Math.random() > 0.4) return;
            this._tick();
        }, 800 + Math.random() * 1200);
    },

    _tick() {
        const ctx = this.ctx;
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 1200 + Math.random() * 800;
        gain.gain.value = 0.02;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
    },

    stopAmbient() {
        this.ambientEnabled = false;
        if (this.noiseInterval) {
            clearInterval(this.noiseInterval);
            this.noiseInterval = null;
        }
        this.oscillators.forEach(o => {
            if (o.osc) o.osc.stop?.();
            if (o.source) o.source.stop?.();
        });
        this.oscillators = [];
    },

    // Mechanical keyboard click - plays on every character typed
    keyClick() {
        if (!this.soundEnabled) return;
        const ctx = this.init();
        const duration = 0.02;
        const bufferSize = Math.ceil(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            data[i] = (Math.random() * 2 - 1) * (1 - t * t) * 0.6;
        }
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1400 + Math.random() * 400;
        filter.Q.value = 1.2;
        gain.gain.value = 0.1;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.buffer = buffer;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start();
    }
};
