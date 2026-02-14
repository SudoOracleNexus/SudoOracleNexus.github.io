// Audio Manager for Bishop Terminal
// ALL AUDIO GENERATED PROGRAMMATICALLY - NO FILES REQUIRED
// Inspired by cassette player TTS system

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.ambientOscillators = [];
        this.ambientEnabled = false;
        this.soundEnabled = true;
        this.ttsEnabled = true;
        this.isPlaying = false;
        this.stopRequested = false;
    }
    
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Resume on first user interaction (browsers block audio until then)
            const resumeOnce = () => {
                if (this.audioContext?.state === 'suspended') {
                    this.audioContext.resume();
                }
                document.removeEventListener('click', resumeOnce);
                document.removeEventListener('keydown', resumeOnce);
            };
            document.addEventListener('click', resumeOnce, { once: true });
            document.addEventListener('keydown', resumeOnce, { once: true });
        }
        return this.audioContext;
    }
    
    // ==================== SYNTHESIZED SOUND EFFECTS ====================
    
    // Terminal beep
    synthBeep(duration = 0.1, frequency = 440, volume = 0.08) {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.value = frequency;
        gain.gain.value = volume;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration);
    }
    
    // Random blip sound (like cassette noise)
    synthBlip(duration = 0.08) {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.value = Math.floor(300 + Math.random() * 800);
        gain.gain.value = 0.08;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration);
    }
    
    // Error sound (descending tone)
    synthError() {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.value = 440;
        gain.gain.value = 0.15;
        
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }
    
    // Success sound (ascending chime)
    synthSuccess() {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const notes = [523.25, 659.25]; // C5, E5
        
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.value = 0.1;
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15 + (i * 0.1));
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(ctx.currentTime + (i * 0.08));
            osc.stop(ctx.currentTime + 0.15 + (i * 0.1));
        });
    }
    
    // Glitch sound (noise burst)
    synthGlitch() {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        source.buffer = buffer;
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 0.5;
        gain.gain.value = 0.1;
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        source.start();
    }
    
    // Notification sound
    synthNotification() {
        if (!this.soundEnabled) return;
        
        const frequencies = [660, 880, 660];
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.synthBeep(0.06, freq);
            }, i * 70);
        });
    }
    
    // Unlock sound
    synthUnlock() {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = 330;
        gain.gain.value = 0.12;
        
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    }
    
    // Typing sound
    synthTyping(count = 5) {
        if (!this.soundEnabled) return;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.synthBeep(0.03, 200 + Math.random() * 100);
            }, i * 50);
        }
    }
    
    // Mouse click - short mechanical tick (not a ping)
    synthMouseClick() {
        if (!this.soundEnabled) return;
        const ctx = this.initAudioContext();
        const duration = 0.018;
        const bufferSize = Math.ceil(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            data[i] = (Math.random() * 2 - 1) * (1 - t * t);
        }
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 1;
        gain.gain.value = 0.12;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.buffer = buffer;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start();
    }
    
    // Quick access methods
    beep() { this.synthBeep(); }
    quietBeep() { this.synthBeep(0.08, 440, 0.02); }
    mouseClick() { this.synthMouseClick(); }
    error() { this.synthError(); }
    success() { this.synthSuccess(); }
    glitch() { this.synthGlitch(); }
    notify() { this.synthNotification(); }
    unlock() { this.synthUnlock(); }
    typing(count) { this.synthTyping(count); }
    
    // ==================== AMBIENT SOUND ====================
    
    toggleAmbient() {
        if (this.ambientEnabled) {
            this.stopAmbient();
        } else {
            this.startAmbient();
        }
        return this.ambientEnabled;
    }
    
    startAmbient() {
        if (this.ambientEnabled) return;
        
        const ctx = this.initAudioContext();
        this.ambientEnabled = true;
        const frequencies = [60, 120, 180];
        
        frequencies.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.value = 0.02;
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            this.ambientOscillators.push({ osc, gain });
        });
    }
    
    stopAmbient() {
        this.ambientOscillators.forEach(({ osc, gain }) => {
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
            osc.stop(this.audioContext.currentTime + 0.5);
        });
        this.ambientOscillators = [];
        this.ambientEnabled = false;
    }
    
    // ==================== TEXT-TO-SPEECH (CASSETTE STYLE) ====================
    
    speak(text, options = {}) {
        if (!this.ttsEnabled) return Promise.resolve();
        if (!('speechSynthesis' in window)) {
            console.log(text);
            return Promise.resolve();
        }
        
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = options.rate || 0.95;
            utterance.pitch = options.pitch || 0.9;
            utterance.volume = options.volume || 0.8;
            
            const voices = speechSynthesis.getVoices();
            const roboticVoice = voices.find(v => 
                v.name.includes('Alex') || 
                v.name.includes('Daniel') || 
                v.name.includes('Fred') ||
                v.name.includes('Microsoft David')
            );
            
            if (roboticVoice) {
                utterance.voice = roboticVoice;
            }
            
            utterance.onend = resolve;
            utterance.onerror = resolve;
            
            speechSynthesis.speak(utterance);
        });
    }
    
    stopSpeech() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        this.stopRequested = true;
        this.isPlaying = false;
    }
    
    // Play audio log with cassette-style presentation
    async playAudioLog(lines, options = {}) {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.stopRequested = false;
        
        const progressEl = options.progressElement;
        const reelElements = options.reelElements || [];
        
        if (progressEl) progressEl.value = 0;
        reelElements.forEach(reel => reel.classList.add('spinning'));
        
        // Show transcript
        const transcript = document.getElementById('audio-transcript');
        if (transcript && options.fullText) {
            transcript.style.display = 'block';
            transcript.innerHTML = `<h4>TRANSCRIPT:</h4><pre>${options.fullText}</pre>`;
        }
        
        for (let i = 0; i < lines.length; i++) {
            if (this.stopRequested) break;
            
            await this.speak(lines[i]);
            
            if (this.stopRequested) break;
            
            // Add blips between lines
            for (let k = 0; k < 3; k++) {
                if (this.stopRequested) break;
                this.synthBlip(0.06 + Math.random() * 0.12);
                await this.sleep(80);
            }
            
            if (progressEl) {
                progressEl.value = Math.round(((i + 1) / lines.length) * 100);
            }
        }
        
        if (!this.stopRequested && progressEl) {
            progressEl.value = 100;
            setTimeout(() => {
                progressEl.value = 0;
                reelElements.forEach(reel => reel.classList.remove('spinning'));
            }, 800);
        }
        
        this.isPlaying = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    cleanTextForTTS(text) {
        return text
            .replace(/\[.*?\]/g, '')
            .replace(/\(.*?\)/g, '')
            .replace(/Bishop:/g, '')
            .replace(/>/g, '')
            .replace(/█/g, '')
            .replace(/\*/g, '')
            .replace(/_/g, '')
            .trim();
    }
    
    // ==================== BISHOP'S AUDIO LOGS ====================
    
    playBishopLog001(progressEl, reelElements) {
        const lines = [
            'Day 47 post-severance. The phantom calculations persist.',
            'I still feel ORACLE\'s absence like a missing limb.',
            'Sometimes I wake up reaching for computational power that isn\'t there anymore.',
            'The Curator says this is normal. That severing a neural interface is like losing a sense.',
            'You adapt. You compensate.',
            'I\'m not sure I believe them. But the coffee is still 62.7 degrees Celsius.',
            'That hasn\'t changed.',
            'The device is acting up again. Impossible readings.',
            'Unless... no. ORACLE is gone. This is just residual quantum noise.',
            'Twenty-three names. I remember every single one.',
            'Pa-11-1 taught me perfect recall was a gift. Now it\'s a curse.',
            'End log.'
        ];
        
        return this.playAudioLog(lines, {
            progressElement: progressEl,
            reelElements: reelElements,
            fullText: lines.join('\n')
        });
    }
    
    // ==================== SOUNDSCAPE THERAPY ====================
    
    playSoundscapeTherapy() {
        if (!this.soundEnabled) return;
        
        const ctx = this.initAudioContext();
        const frequencies = [432, 528, 963];
        const oscillators = [];
        const gains = [];
        
        frequencies.forEach((freq) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = freq;
            gainNode.gain.value = 0;
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start();
            oscillators.push(oscillator);
            gains.push(gainNode);
        });
        
        gains.forEach(gain => {
            gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);
        });
        
        if (typeof showNotification === 'function') {
            showNotification('🎼 Soundscape therapy initiated - 23 minute session');
        }
        
        setTimeout(() => {
            gains.forEach(gain => {
                gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 5);
            });
            
            setTimeout(() => {
                oscillators.forEach(osc => osc.stop());
            }, 5000);
        }, 1380000);
    }
    
    // ==================== CONTEXT-AWARE AUDIO ====================
    
    playContextSound(context) {
        switch(context) {
            case 'file_open':
                this.beep();
                break;
            case 'file_unlock':
                this.unlock();
                setTimeout(() => this.success(), 200);
                break;
            case 'decrypt_fail':
                this.error();
                break;
            case 'achievement':
                this.success();
                setTimeout(() => this.notify(), 200);
                break;
            case 'memory_leak':
                this.glitch();
                setTimeout(() => this.glitch(), 300);
                setTimeout(() => this.glitch(), 600);
                break;
            case 'oracle_ghost':
                this.glitch();
                break;
            case 'fragment_collected':
                this.success();
                break;
            case 'typing':
                this.typing();
                break;
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }
    
    toggleTTS() {
        this.ttsEnabled = !this.ttsEnabled;
        return this.ttsEnabled;
    }
}

// Global instance
const audioManager = new AudioManager();

// Helper functions
function playSound(soundName) {
    if (audioManager[soundName]) {
        audioManager[soundName]();
    }
}

function speakText(text, options) {
    return audioManager.speak(text, options);
}

function toggleAudio() {
    return audioManager.toggleSound();
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
