// Windows-style Boot Sequence - Aegis Foundation Systems
// Phases: 1) Boot sound + black  2) BIOS  3) Boot text  4) Transition → Login

const CORRECT_CODE = "6270";
let currentCode = "";
let failedAttempts = 0;
const MAX_ATTEMPTS = 5;
let soundEnabled = true;
let loginAudioCtx = null;

const SKIP_STORAGE_KEY = "bishop-boot-skip";

// Boot text with lore - { line, status? } for colored status tags
const BOOT_LINES = [
    { line: "[00:00:01] Initializing Aegis Foundation Systems..." },
    { line: "[00:00:02] Loading kernel modules...                    [OK]", status: "ok" },
    { line: "[00:00:02] Mounting dimensional filesystems...          [OK]", status: "ok" },
    { line: "[00:00:03] Starting quantum processor array...          [OK]", status: "ok" },
    { line: "[00:00:03] Initializing neural interface protocols...   [FAILED]", status: "failed" },
    { line: "[00:00:04] WARNING: Neural interface severed", status: "warning" },
    { line: "[00:00:04] Attempting fragment recovery...              [OK]", status: "ok" },
    { line: "[00:00:05] Loading STF database drivers...              [OK]", status: "ok" },
    { line: "[00:00:05] Mounting /mnt/pa-11-1/research...            [OK]", status: "ok" },
    { line: "[00:00:06] Mounting /mnt/psi-22/operations...           [OK]", status: "ok" },
    { line: "[00:00:06] Starting dimensional server daemons...       [OK]", status: "ok" },
    { line: "[00:00:07] Initializing ORACLE NEXUS fragments...      [PARTIAL]", status: "partial" },
    { line: "[00:00:07] Loading personnel database...                [OK]", status: "ok" },
    { line: "[00:00:08] Checking clearance protocols...              [OK]", status: "ok" },
    { line: "[00:00:08] WARNING: Overseer-5 clearance REVOKED", status: "warning" },
    { line: "[00:00:09] Starting authentication service...           [OK]", status: "ok" },
    { line: "[00:00:09] Initializing security protocols...           [OK]", status: "ok" },
    { line: "[00:00:10] Loading file encryption systems...           [OK]", status: "ok" },
    { line: "[00:00:10] Starting Curator connection monitor...       [OK]", status: "ok" },
    { line: "[00:00:11] Checking dimensional stability...            [OK]", status: "ok" },
    { line: "[00:00:11] Verifying temporal anchors...                [OK]", status: "ok" },
    { line: "[00:00:12] Loading anomaly detection systems...         [OK]", status: "ok" },
    { line: "[00:00:12] Starting probability calculators...          [OK]", status: "ok" },
    { line: "[00:00:13] Initializing 14-dimensional processors...    [OK]", status: "ok" },
    { line: "[00:00:13] WARNING: System running in degraded mode", status: "warning" },
    { line: "[00:00:14] Checking for pending Omega-class events...   [MONITORING]", status: "monitoring" },
    { line: "[00:00:14] Loading VSA integration protocols...         [OK]", status: "ok" },
    { line: "[00:00:15] Starting user interface services...          [OK]", status: "ok" },
    { line: "[00:00:15] " },
    { line: "[00:00:16] Boot sequence complete." },
    { line: "[00:00:16] System ready." },
    { line: "[00:00:17] " },
    { line: "[00:00:17] Awaiting authentication..." },
];

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

// Audio
function initLoginAudio() {
    if (loginAudioCtx) return loginAudioCtx;
    loginAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    document.addEventListener('click', () => { if (loginAudioCtx?.state === 'suspended') loginAudioCtx.resume(); }, { once: true });
    document.addEventListener('keydown', () => { if (loginAudioCtx?.state === 'suspended') loginAudioCtx.resume(); }, { once: true });
    if (loginAudioCtx.state === 'suspended') loginAudioCtx.resume().catch(() => {});
    return loginAudioCtx;
}

function playBootSound() {
    if (!soundEnabled) return;
    const ctx = initLoginAudio();
    const t = ctx.currentTime;
    const notes = [
        { f: 523, start: 0, dur: 0.15 },
        { f: 659, start: 0.12, dur: 0.15 },
        { f: 784, start: 0.24, dur: 0.2 },
        { f: 1047, start: 0.4, dur: 0.5 },
    ];
    notes.forEach(({ f, start, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.15, t + start);
        gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + start);
        osc.stop(t + start + dur);
    });
}

function playKeypadBeep() {
    if (!soundEnabled) return;
    const ctx = initLoginAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800 + Math.random() * 200;
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
}

function playErrorBeep() {
    if (!soundEnabled) return;
    const ctx = initLoginAudio();
    [400, 300, 250].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.value = 0.12;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15 + i * 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + 0.3 + i * 0.1);
    });
}

function playSuccessBeep() {
    if (!soundEnabled) return;
    const ctx = initLoginAudio();
    [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.value = 0.12;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2 + i * 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + 0.4 + i * 0.08);
    });
}

// Boot sequence
async function runBootSequence() {
    const seq = document.getElementById('boot-sequence');
    const stage1 = document.getElementById('boot-stage-1');
    const stage2 = document.getElementById('boot-stage-2');
    const stage3 = document.getElementById('boot-stage-3');
    const container = document.getElementById('boot-text-container');
    const skipBtn = document.getElementById('boot-skip-btn');

    seq.classList.add('boot-crt');

    // Phase 1: Black + boot sound (2.5 sec)
    playBootSound();
    await sleep(2500);

    // Phase 2: BIOS (1.5 sec)
    stage1.classList.add('hidden');
    stage2.classList.remove('hidden');
    await sleep(1500);

    // Phase 3: Boot text (5–8 sec)
    stage2.classList.add('hidden');
    stage3.classList.remove('hidden');

    for (let i = 0; i < BOOT_LINES.length; i++) {
        const item = BOOT_LINES[i];
        const div = document.createElement('div');
        div.className = 'boot-text-line';
        const text = item.line;
        if (item.status) {
            const tagMatch = text.match(/\s+\[(OK|FAILED|PARTIAL|MONITORING)\]$/);
            if (tagMatch) {
                const pre = text.slice(0, text.length - tagMatch[0].length);
                div.innerHTML = escapeHtml(pre) + ` <span class="status-${item.status}">[${tagMatch[1]}]</span>`;
            } else {
                div.innerHTML = `<span class="status-${item.status}">${escapeHtml(text)}</span>`;
            }
        } else {
            div.textContent = text;
        }
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        const delay = item.status === 'failed' || item.status === 'warning' ? 120 : 50 + Math.random() * 40;
        await sleep(delay);
    }

    await sleep(1000);

    // Phase 4: Fade to login
    seq.style.transition = 'opacity 0.8s';
    seq.style.opacity = '0';
    await sleep(800);
    seq.classList.add('hidden');
    document.getElementById('login-screen').classList.add('active');
    initializeLogin();
}

function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function skipBoot() {
    document.getElementById('boot-sequence').classList.add('hidden');
    document.getElementById('login-screen').classList.add('active');
    initializeLogin();
    try { localStorage.setItem(SKIP_STORAGE_KEY, '1'); } catch (_) {}
}

// Start
window.addEventListener('load', () => {
    const skipBtn = document.getElementById('boot-skip-btn');
    const clickStart = document.getElementById('boot-click-start');
    const bootSeq = document.getElementById('boot-sequence');

    if (skipBtn) skipBtn.addEventListener('click', skipBoot);

    try {
        if (localStorage.getItem(SKIP_STORAGE_KEY) === '1') {
            skipBoot();
            return;
        }
    } catch (_) {}

    function startBoot() {
        if (clickStart) clickStart.classList.add('hidden');
        if (bootSeq) bootSeq.classList.remove('hidden');
        initLoginAudio();
        runBootSequence();
    }

    if (clickStart) {
        clickStart.addEventListener('click', startBoot, { once: true });
        document.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.key === 'Enter') startBoot(); }, { once: true });
    } else {
        if (bootSeq) bootSeq.classList.remove('hidden');
        startBoot();
    }
});

// Login
function initializeLogin() {
    const numButtons = document.querySelectorAll('.num-btn');
    const errorMessage = document.getElementById('error-message');

    const sessionId = 'SESSION: VSA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const sessionSpan = document.querySelector('.session-id');
    if (sessionSpan) sessionSpan.textContent = sessionId;

    numButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playKeypadBeep();
            const v = btn.dataset.num;
            if (v === 'clear') {
                currentCode = "";
                updateCodeDisplay();
                errorMessage.classList.remove('show');
            } else if (v === 'enter') {
                checkCode();
            } else if (currentCode.length < 4) {
                currentCode += v;
                updateCodeDisplay();
                errorMessage.classList.remove('show');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('login-screen').classList.contains('active')) return;
        if (e.key >= '0' && e.key <= '9' && currentCode.length < 4) {
            playKeypadBeep();
            currentCode += e.key;
            updateCodeDisplay();
            errorMessage.classList.remove('show');
        } else if (e.key === 'Backspace') {
            playKeypadBeep();
            currentCode = currentCode.slice(0, -1);
            updateCodeDisplay();
            errorMessage.classList.remove('show');
        } else if (e.key === 'Enter') {
            checkCode();
        }
    });
}

function updateCodeDisplay() {
    const spans = document.querySelectorAll('.code-display span');
    spans.forEach((s, i) => {
        if (i < currentCode.length) {
            s.textContent = currentCode[i];
            s.classList.add('filled');
        } else {
            s.textContent = '█';
            s.classList.remove('filled');
        }
    });
}

function checkCode() {
    const errorMessage = document.getElementById('error-message');
    const attemptCount = document.getElementById('attempt-count');

    if (currentCode === CORRECT_CODE) {
        playSuccessBeep();
        showSuccessAnimation();
        setTimeout(() => { window.location.href = 'desktop.html'; }, 1500);
    } else {
        playErrorBeep();
        failedAttempts++;
        attemptCount.textContent = failedAttempts;
        errorMessage.classList.add('show');
        currentCode = "";
        updateCodeDisplay();
        if (failedAttempts >= MAX_ATTEMPTS) {
            lockoutUser();
        } else {
            setTimeout(() => errorMessage.classList.remove('show'), 2000);
        }
    }
}

function showSuccessAnimation() {
    const container = document.querySelector('.login-container');
    const slot = document.getElementById('login-message-slot');
    container.style.animation = 'none';
    container.style.borderColor = '#33ff33';
    container.style.boxShadow = '0 0 80px rgba(51, 255, 51, 0.8)';
    if (slot) {
        slot.innerHTML = '<div class="success-message">✓ ACCESS GRANTED - LOADING TERMINAL...</div>';
        slot.classList.add('show-success');
    }
}

function lockoutUser() {
    document.querySelector('.login-content').innerHTML = `
        <div style="color:#ff3333;font-size:28px;margin:50px 0;font-weight:bold;animation:pulse-red 1s infinite;">⚠ SYSTEM LOCKED ⚠</div>
        <p style="font-size:16px;margin:20px 0;">Maximum authentication attempts exceeded.</p>
        <p style="font-size:14px;opacity:0.8;">Security protocol initiated. Please contact system administrator.</p>
        <button onclick="location.reload()" style="margin-top:30px;padding:15px 40px;background:var(--border-color);border:none;color:var(--dark-bg);font-family:'VT323',monospace;font-size:18px;cursor:pointer;">RESTART</button>
    `;
}

// Konami
let konami = [];
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-10);
    if (konami.join(',') === KONAMI.join(',')) {
        const h = document.querySelector('.hint-text');
        if (h) {
            h.textContent = `🎮 CHEAT ACTIVATED: The code is ${CORRECT_CODE}`;
            h.style.color = '#33ff33';
            h.style.fontSize = '16px';
            h.style.opacity = '1';
        }
    }
});
