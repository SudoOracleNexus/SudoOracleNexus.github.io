// Desktop environment controller with enhanced features
let currentLockFile = null;
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

// File icon dragging
let draggedIcon = null;
let iconOffsetX = 0;
let iconOffsetY = 0;
let iconDragging = false;

// File positions storage
let filePositions = {};

// Context menu
let contextMenuFile = null;

// Decryption attempts tracking
let decryptAttempts = 0;
const MAX_DECRYPT_ATTEMPTS = 3;

// Command line mode
let commandHistory = [];
let commandHistoryIndex = -1;

// System processes for task manager
const systemProcesses = [
    { name: 'ORACLE.NEXUS.EXE', pid: 1024, memory: '847 MB', cpu: '23%', status: 'running' },
    { name: 'VSA.MONITOR.EXE', pid: 2048, memory: '124 MB', cpu: '5%', status: 'running' },
    { name: 'FILESERVER.EXE', pid: 3072, memory: '456 MB', cpu: '12%', status: 'running' },
    { name: 'CURATOR.LINK.EXE', pid: 4096, memory: '89 MB', cpu: '1%', status: 'idle' },
    { name: 'ENCRYPTION.SVC', pid: 5120, memory: '234 MB', cpu: '8%', status: 'running' },
    { name: 'NEURAL.INTERFACE', pid: 6144, memory: '512 MB', cpu: '0%', status: 'suspended' },
    { name: 'QUANTUM.CALC.EXE', pid: 7168, memory: '178 MB', cpu: '3%', status: 'idle' },
];

// Warning messages for random popups
const warningMessages = [
    "UNAUTHORIZED ACCESS ATTEMPT DETECTED",
    "NETWORK LATENCY DETECTED: 247ms",
    "QUANTUM FLUCTUATION IN SECTOR 7",
    "CURATOR CONNECTION PULSE RECEIVED",
    "MEMORY INTEGRITY CHECK: PASSED",
    "DIMENSIONAL STABILITY: 98.7%",
    "ORACLE ECHO DETECTED IN BUFFER",
];

// Notification messages
const notificationMessages = [
    "Incoming transmission from Site-██",
    "Curator contact request pending",
    "Anomaly detected in sector 12",
    "File synchronization complete",
    "Security scan completed: All clear",
];

// Audit log messages
const auditMessages = [
    "USER LOGIN RECORDED",
    "FILE ACCESS: bio_query.txt",
    "DECRYPTION ATTEMPT LOGGED",
    "WINDOW OPENED: FILE VIEWER",
    "SYSTEM SCAN COMPLETE",
    "NETWORK PING: 23ms",
    "MEMORY USAGE: 47%",
    "CURATOR PING RECEIVED",
];

// Initialize desktop
function init() {
    updateTime();
    setInterval(updateTime, 1000);
    loadFilePositions();
    loadDiscoveredCodex();
    initCodexTerms(document.getElementById('window-content'));
    generateFileExplorer();
    initializeWindowDragging();
    initializeKeyboardShortcuts();
    startSystemMonitoring();
    startRandomEvents();
    initClickSounds();
    updateAuditLog("SYSTEM INITIALIZED");
    // Ambient hum on by default (synthesized via Web Audio - no file needed)
    if (typeof audioManager !== 'undefined') {
        audioManager.startAmbient();
    }
}

// Mouse click sound for left and right clicks
function initClickSounds() {
    function playClick() {
        if (typeof audioManager !== 'undefined' && audioManager.soundEnabled) {
            audioManager.mouseClick();
        }
    }
    // Left click - any interactive element or desktop area
    document.addEventListener('click', (e) => {
        if (!e.target.closest('input, textarea, [contenteditable]') && !e.target.closest('#command-input')) {
            playClick();
        }
    });
    // Right click - same areas
    document.addEventListener('contextmenu', (e) => {
        if (!e.target.closest('input, textarea, [contenteditable]') && !e.target.closest('#command-input')) {
            playClick();
        }
    });
}

// Load saved file positions from localStorage
function loadFilePositions() {
    const saved = localStorage.getItem('bishop-file-positions');
    if (saved) {
        filePositions = JSON.parse(saved);
    }
}

// Save file positions to localStorage
function saveFilePositions() {
    localStorage.setItem('bishop-file-positions', JSON.stringify(filePositions));
}

// Update system time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('system-time').textContent = timeString;
}

// System monitoring (memory usage, signal strength, etc.)
function startSystemMonitoring() {
    setInterval(() => {
        // Simulate fluctuating memory usage
        const memUsage = (45 + Math.random() * 10).toFixed(1);
        document.getElementById('memory-usage').textContent = memUsage + '%';
        
        // Simulate signal strength changes
        const signal = Math.random();
        const signalText = document.getElementById('signal-strength');
        if (signal > 0.7) {
            signalText.textContent = 'STRONG';
            signalText.style.color = '#33ff33';
        } else if (signal > 0.3) {
            signalText.textContent = 'MODERATE';
            signalText.style.color = '#ffaa55';
        } else {
            signalText.textContent = 'WEAK';
            signalText.style.color = '#ff3333';
        }
    }, 3000);
}

// Random system events (warnings, notifications, glitches)
function startRandomEvents() {
    // Random warning popups
    setInterval(() => {
        if (Math.random() > 0.85) {
            showWarning(warningMessages[Math.floor(Math.random() * warningMessages.length)]);
        }
    }, 30000);
    
    // Random notifications
    setInterval(() => {
        if (Math.random() > 0.9) {
            showNotification(notificationMessages[Math.floor(Math.random() * notificationMessages.length)]);
        }
    }, 45000);
    
    // Random memory leak glitch
    setInterval(() => {
        if (Math.random() > 0.95) {
            triggerGlitch();
        }
    }, 60000);
    
    // Update audit log
    setInterval(() => {
        updateAuditLog(auditMessages[Math.floor(Math.random() * auditMessages.length)]);
    }, 8000);
}

// Show warning popup
function showWarning(message) {
    const warning = document.getElementById('warning-popup');
    const warningMsg = document.getElementById('warning-message');
    warningMsg.textContent = message;
    warning.classList.add('active');
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeWarning();
    }, 5000);
}

function closeWarning() {
    document.getElementById('warning-popup').classList.remove('active');
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Trigger glitch effect
function triggerGlitch() {
    const glitch = document.getElementById('glitch-overlay');
    glitch.classList.add('active');
    setTimeout(() => {
        glitch.classList.remove('active');
    }, 300);
}

// Update audit log
function updateAuditLog(message) {
    const auditText = document.getElementById('audit-text');
    auditText.textContent = message;
}

// Generate file icons with grid positioning
function generateFileExplorer() {
    const explorer = document.getElementById('file-explorer');
    explorer.innerHTML = '';
    
    let fileCount = 0;
    let gridX = 30;
    let gridY = 30;
    const gridSpacingX = 120;
    const gridSpacingY = 140;
    const maxRows = 6;
    
    for (const [filename, data] of Object.entries(fileSystem)) {
        const fileDiv = document.createElement('div');
        fileDiv.className = `file-icon ${data.locked ? 'locked' : ''}`;
        fileDiv.dataset.filename = filename;
        
        // Use saved position or calculate grid position
        if (filePositions[filename]) {
            fileDiv.style.left = filePositions[filename].x + 'px';
            fileDiv.style.top = filePositions[filename].y + 'px';
        } else {
            const row = fileCount % maxRows;
            const col = Math.floor(fileCount / maxRows);
            const posX = gridX + (col * gridSpacingX);
            const posY = gridY + (row * gridSpacingY);
            
            fileDiv.style.left = posX + 'px';
            fileDiv.style.top = posY + 'px';
            
            filePositions[filename] = { x: posX, y: posY };
        }
        
        const lockBadge = data.locked ? '<div class="lock-badge"><i class="fa-solid fa-lock"></i></div>' : '';
        
        // Support Font Awesome icons (fa-*) or emoji fallback
        let iconHtml = data.icon;
        if (data.icon && data.icon.startsWith('fa-')) {
            iconHtml = `<i class="${data.icon}"></i>`;
        } else {
            iconHtml = `<span class="icon-emoji">${data.icon}</span>`;
        }
        
        fileDiv.innerHTML = `
            <div class="icon">${iconHtml}</div>
            <div class="label">${filename}</div>
            ${lockBadge}
        `;
        
        // Double-click to open
        fileDiv.addEventListener('dblclick', (e) => {
            e.preventDefault();
            openFile(filename);
        });
        
        // Single click to select
        fileDiv.addEventListener('click', (e) => {
            if (!iconDragging) {
                selectFile(fileDiv);
            }
        });
        
        // Right-click for context menu
        fileDiv.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e, filename);
        });
        
        // Dragging
        fileDiv.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left click only
                startIconDrag(e, fileDiv);
            }
        });
        
        explorer.appendChild(fileDiv);
        fileCount++;
    }
    
    // Save initial positions
    saveFilePositions();
    
    document.getElementById('file-count').textContent = `${fileCount} FILES LOADED`;
    updateAuditLog(`${fileCount} FILES LOADED`);
    
    // Global mouse events for dragging
    document.addEventListener('mousemove', dragIcon);
    document.addEventListener('mouseup', endIconDrag);
}

// Context menu
function showContextMenu(e, filename) {
    const contextMenu = document.getElementById('context-menu');
    contextMenuFile = filename;
    
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.classList.add('active');
    
    updateAuditLog(`CONTEXT MENU: ${filename}`);
}

function contextAction(action) {
    const file = fileSystem[contextMenuFile];
    
    switch(action) {
        case 'open':
            openFile(contextMenuFile);
            break;
        case 'properties':
            showFileProperties(contextMenuFile);
            break;
        case 'encrypt':
            showWarning(`FILE ${contextMenuFile} IS ALREADY ENCRYPTED`);
            break;
        case 'delete':
            if (confirm(`Delete ${contextMenuFile}? This action cannot be undone.`)) {
                showWarning('DELETION BLOCKED: INSUFFICIENT CLEARANCE LEVEL');
            }
            break;
    }
    
    closeContextMenu();
}

function closeContextMenu() {
    document.getElementById('context-menu').classList.remove('active');
}

function showFileProperties(filename) {
    const file = fileSystem[filename];
    const size = Math.floor(Math.random() * 500 + 100) / 10; // Random file size
    const modified = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString();
    
    showWarning(`FILE PROPERTIES
    
Name: ${filename}
Type: ${file.type.toUpperCase()}
Size: ${size} KB
Modified: ${modified}
Encryption: ${file.locked ? 'ACTIVE' : 'NONE'}
Classification: TOP SECRET`);
}

// Click outside to close context menu
document.addEventListener('click', (e) => {
    if (!e.target.closest('.context-menu')) {
        closeContextMenu();
    }
    
    if (!e.target.closest('.file-icon') && !e.target.closest('.window')) {
        document.querySelectorAll('.file-icon').forEach(icon => {
            icon.classList.remove('selected');
        });
    }
});

// Select file (visual feedback)
function selectFile(fileDiv) {
    document.querySelectorAll('.file-icon').forEach(icon => {
        icon.classList.remove('selected');
    });
    fileDiv.classList.add('selected');
}

// Start dragging icon
function startIconDrag(e, fileDiv) {
    if (e.target.closest('.lock-badge')) return;
    
    e.preventDefault();
    iconDragging = false;
    draggedIcon = fileDiv;
    
    const rect = fileDiv.getBoundingClientRect();
    
    // Offset = where user clicked within the icon (from top-left corner)
    iconOffsetX = e.clientX - rect.left;
    iconOffsetY = e.clientY - rect.top;
    
    fileDiv.classList.add('dragging');
    selectFile(fileDiv);
    
    setTimeout(() => {
        if (draggedIcon === fileDiv) {
            iconDragging = true;
        }
    }, 100);
}

// Drag icon
function dragIcon(e) {
    if (!draggedIcon || !iconDragging) return;
    
    e.preventDefault();
    
    const explorer = document.getElementById('file-explorer');
    const explorerRect = explorer.getBoundingClientRect();
    
    // Convert viewport coords to explorer-relative. Must account for scroll:
    // Icon's left/top are relative to explorer's content; add scroll for correct placement.
    const scrollLeft = explorer.scrollLeft || 0;
    const scrollTop = explorer.scrollTop || 0;
    
    // Position so the clicked point stays under cursor
    let newX = e.clientX - explorerRect.left - iconOffsetX + scrollLeft;
    let newY = e.clientY - explorerRect.top - iconOffsetY + scrollTop;
    
    // Clamp to keep icon within explorer bounds
    const maxX = Math.max(0, explorer.scrollWidth - 100);
    const maxY = Math.max(0, explorer.scrollHeight - 120);
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    draggedIcon.style.left = newX + 'px';
    draggedIcon.style.top = newY + 'px';
}

// End dragging icon
function endIconDrag(e) {
    if (draggedIcon) {
        draggedIcon.classList.remove('dragging');
        
        const filename = draggedIcon.dataset.filename;
        filePositions[filename] = {
            x: parseInt(draggedIcon.style.left),
            y: parseInt(draggedIcon.style.top)
        };
        saveFilePositions();
        
        draggedIcon = null;
    }
    
    setTimeout(() => {
        iconDragging = false;
    }, 50);
}

// Open file (check if locked)
function openFile(filename) {
    const file = fileSystem[filename];
    if (!file) return;
    updateAuditLog(`OPENING FILE: ${filename}`);
    
    if (file.locked) {
        showLockScreen(filename);
        return;
    }
    
    // Handle link files - navigate to target
    if (file.type === 'link' && file.target) {
        window.location.href = file.target;
        return;
    }

    // Handle games and special viewers - open in file window
    if (file.type === 'game' || file.type === 'special') {
        const specialType = file.game || file.content;
        if (specialType === 'coffee' || specialType === 'COFFEE_CLICKER') {
            openGame('coffee');
            return;
        }
        if (specialType === 'minesweeper' || specialType === 'MINESWEEPER') {
            openGame('minesweeper');
            return;
        }
        if (specialType === 'ACHIEVEMENTS_TRACKER' || specialType === 'INVESTIGATION_BOARD' || specialType === 'LORE_CODEX') {
            displayFile(filename);
            return;
        }
    }
    
    displayFile(filename);
}

// Open game in file window
function openGame(gameType) {
    const fileWindow = document.getElementById('file-window');
    const windowTitle = document.getElementById('window-title');
    const windowContent = document.getElementById('window-content');
    
    if (!fileWindow || !windowContent) return;
    
    if (gameType === 'coffee') {
        windowTitle.textContent = 'Coffee Temperature Control';
        windowContent.innerHTML = typeof initCoffeeClicker === 'function' ? initCoffeeClicker() : '<p>Game not loaded.</p>';
    } else if (gameType === 'minesweeper') {
        windowTitle.textContent = 'Minesweeper - The 23';
        windowContent.innerHTML = typeof initMinesweeper === 'function' ? initMinesweeper() : '<p>Game not loaded.</p>';
    }
    
    fileWindow.classList.add('active');
    updateAuditLog(`GAME OPENED: ${gameType}`);
}

// Show lock screen with appropriate interface
function showLockScreen(filename) {
    currentLockFile = filename;
    const file = fileSystem[filename];
    const lockScreen = document.getElementById('lock-screen');
    const lockInterface = document.getElementById('lock-interface');
    
    decryptAttempts = 0;
    document.getElementById('decrypt-count').textContent = decryptAttempts;
    
    document.getElementById('lock-title').innerHTML = '<i class="fa-solid fa-lock"></i> ENCRYPTED FILE';
    document.getElementById('lock-filename').textContent = filename.toUpperCase();
    document.getElementById('lock-hint').textContent = `Hint: ${file.hint}`;
    document.getElementById('lock-error').classList.remove('show');
    
    updateAuditLog(`DECRYPTION REQUIRED: ${filename}`);
    
    const lt = (file.lockType || '').toLowerCase();
    lockInterface.innerHTML = generateLockUI(lt === 'colorsequence' ? 'colorSequence' : lt === 'frequencymatch' ? 'frequency' : lt === 'slidingpuzzle' ? 'puzzle' : file.lockType);
    
    lockScreen.classList.add('active');
    initLockKeyboard();
    
    setTimeout(() => {
        const t = file.lockType;
        if (t === 'pattern') lockSystem.initPatternLock();
        else if (t === '4digit') lockSystem.init4DigitLock();
        else if (t === 'phrase') lockSystem.initPhraseLock();
        else if (t === 'numberlock') lockSystem.initNumberLock();
        else if (t === 'colorSequence') lockSystem.initColorSequence();
        else if (t === 'frequencyMatch' || t === 'frequency') lockSystem.initFrequencyMatcher();
        else if (t === 'periodicTable') lockSystem.initPeriodicTable();
        else if (t === 'coordinateLock') lockSystem.initCoordinateLock();
        else if (t === 'phraseCommaPassword') lockSystem.initPhraseCommaPasswordLock();
        else if (t === 'timestamp') lockSystem.initTimestampLock();
        else if (t === 'multiCode') lockSystem.initMultiCode();
        else if (t === 'slidingPuzzle' || t === 'puzzle') {
            const imageUrl = file.puzzleImage || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ff9933" width="300" height="300"/%3E%3C/svg%3E';
            lockSystem.initSlidingPuzzle(imageUrl, 3);
        }
    }, 100);
}

// Generate lock UI HTML based on type
function generateLockUI(lockType) {
    const btnStyle = 'width: 100%; padding: 15px; background: var(--border-color); color: var(--dark-bg); border: none; font-family: \'VT323\', monospace; font-size: 20px; cursor: pointer;';
    if (lockType === '4digit') {
        const padBtns = [1,2,3,4,5,6,7,8,9,'CLR',0,'OK'].map(n => {
            const cls = n === 'CLR' ? 'num-btn clear-btn' : n === 'OK' ? 'num-btn enter-btn' : 'num-btn';
            return `<button class="${cls}" onclick="handleNumberPad('${n}')">${n}</button>`;
        });
        return `<div class="number-display"><span>█</span><span>█</span><span>█</span><span>█</span></div>
            <div class="number-pad lock-keypad">${padBtns.join('')}</div>`;
    } else if (lockType === 'phrase') {
        return `<input type="text" id="phrase-input" placeholder="Enter phrase..." style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'numberlock') {
        return `<input type="text" id="number-input" placeholder="Enter number..." inputmode="numeric" style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'pattern') {
        return `<div class="pattern-lock"><div class="pattern-grid">${Array(9).fill(0).map((_, i) => `<div class="pattern-dot" data-index="${i}"></div>`).join('')}</div>
            <button onclick="checkLockCode()" style="${btnStyle} margin-top: 20px;">SUBMIT PATTERN</button>
            <button onclick="lockSystem.clearPattern()" style="width: 100%; padding: 10px; margin-top: 10px; background: rgba(255,255,255,0.1); color: var(--primary-orange); border: 1px solid var(--border-color); font-family: 'VT323', monospace; font-size: 16px; cursor: pointer;">CLEAR</button></div>`;
    } else if (lockType === 'colorSequence') {
        const f = fileSystem[currentLockFile];
        const colors = f.colorSet || ['red', 'blue', 'green', 'yellow'];
        const colorBtns = colors.map(c => `<button type="button" class="color-btn color-${c}" onclick="lockSystem.addColorToSequence('${c}')" title="Add ${c}"></button>`).join('');
        return `<div class="color-sequence-lock"><p class="terminal-text" style="margin-bottom: 10px; opacity: 0.9;">Select sequence (your choices appear above):</p><div class="color-sequence-display" id="color-sequence-display"></div>
            <div class="color-buttons">${colorBtns}</div>
            <button onclick="checkLockCode()" style="${btnStyle} margin-top: 20px;">SUBMIT</button>
            <button onclick="lockSystem.clearColorSequence()" style="width: 100%; padding: 10px; margin-top: 10px; background: rgba(255,255,255,0.1); color: var(--primary-orange); border: 1px solid var(--border-color); font-family: 'VT323', monospace; font-size: 16px; cursor: pointer;">CLEAR</button></div>`;
    } else if (lockType === 'frequencyMatch' || lockType === 'frequency') {
        const f = fileSystem[currentLockFile];
        const freqs = f.frequencies || [432, 528, 963];
        return `<div class="frequency-lock"><div class="frequency-controls">
            <div class="freq-control"><label>LOW:</label><input type="range" id="freq-low" min="200" max="600" value="400" data-target="${freqs[0]||432}"><span id="freq-low-val" class="freq-hidden">???</span></div>
            <div class="freq-control"><label>MID:</label><input type="range" id="freq-mid" min="400" max="700" value="550" data-target="${freqs[1]||528}"><span id="freq-mid-val" class="freq-hidden">???</span></div>
            <div class="freq-control"><label>HIGH:</label><input type="range" id="freq-high" min="800" max="1100" value="950" data-target="${freqs[2]||963}"><span id="freq-high-val" class="freq-hidden">???</span></div></div>
            <button onclick="checkLockCode()" style="${btnStyle} margin-top: 20px;">SUBMIT</button></div>`;
    } else if (lockType === 'periodicTable') {
        return `<p style="margin: 20px 0;">Enter element symbols (e.g., Au-Ra-Cl-E)</p><input type="text" id="periodic-input" placeholder="Element symbols..." style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0; text-transform: uppercase;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'coordinateLock') {
        return `<p style="margin: 20px 0;">Enter coordinates (e.g., ∞.6270, Σ.2314, Ω.0847)</p><input type="text" id="coordinate-input" placeholder="Coordinates..." style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'timestamp') {
        return `<p style="margin: 20px 0;">Enter timestamp (YYYY-MM-DD HH:MM)</p><input type="text" id="timestamp-input" placeholder="1989-03-15 14:30" style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'multiCode') {
        return `<p style="margin: 20px 0;">Enter all codes combined (space-separated)</p><input type="text" id="multicode-input" placeholder="CODE1 CODE2 CODE3..." style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'phraseCommaPassword') {
        return `<p style="margin: 20px 0;">Enter phrase, then password (format: phrase, password)</p><input type="text" id="phrase-comma-password-input" placeholder="phrase, password" style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;">
            <button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
    } else if (lockType === 'slidingPuzzle' || lockType === 'puzzle') {
        return `<div class="sliding-puzzle"><div id="puzzle-grid" class="puzzle-grid"></div><p style="margin-top: 20px;">Click tiles adjacent to empty space to move them</p></div>`;
    } else if (lockType === 'timeGate') {
        return `<p style="margin: 20px 0;">This file can only be accessed at 23:47 (11:47 PM). Return at that time.</p><button onclick="closeLock()" style="${btnStyle}">CLOSE</button>`;
    }
    return `<input type="text" id="lock-input" placeholder="Enter code..." style="width: 100%; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid var(--border-color); color: var(--primary-orange); font-family: 'VT323', monospace; font-size: 20px; margin: 20px 0;"><button onclick="checkLockCode()" style="${btnStyle}">SUBMIT</button>`;
}

function handleNumberPad(value) {
    if (value === 'CLR') lockSystem.clearNumber();
    else if (value === 'OK') checkLockCode();
    else lockSystem.addNumber(value);
}

// Keyboard input for lock keypads
let lockKeyboardHandler = null;
function initLockKeyboard() {
    if (lockKeyboardHandler) {
        document.removeEventListener('keydown', lockKeyboardHandler);
    }
    lockKeyboardHandler = (e) => {
        const lockScreen = document.getElementById('lock-screen');
        if (!lockScreen || !lockScreen.classList.contains('active')) return;
        const file = fileSystem[currentLockFile];
        if (!file) return;
        const t = file.lockType;
        // 4-digit: 0-9, Enter, Backspace
        if (t === '4digit') {
            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                handleNumberPad(e.key);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                handleNumberPad('OK');
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                lockSystem.removeLastNumber();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                handleNumberPad('CLR');
            }
        }
        // Phrase, number, periodic, coordinate, timestamp, multicode: focus input, Enter submits
        const submitOnEnter = ['phrase', 'numberlock', 'periodicTable', 'coordinateLock', 'timestamp', 'multiCode', 'phraseCommaPassword'];
        if (submitOnEnter.includes(t) && e.key === 'Enter') {
            const input = document.querySelector('#lock-interface input');
            if (input && document.activeElement === input) {
                e.preventDefault();
                checkLockCode();
            }
        }
    };
    document.addEventListener('keydown', lockKeyboardHandler);
}

function removeLockKeyboard() {
    if (lockKeyboardHandler) {
        document.removeEventListener('keydown', lockKeyboardHandler);
        lockKeyboardHandler = null;
    }
}

async function checkLockCode() {
    const file = fileSystem[currentLockFile];
    if (!file) return;
    let isCorrect = false;
    const t = file.lockType;
    const codeHash = file.codeHash;
    if (codeHash) {
        let input = '';
        if (t === '4digit') input = lockSystem.get4DigitInput();
        else if (t === 'phrase') input = lockSystem.getPhraseInput().trim().toUpperCase();
        else if (t === 'numberlock') input = lockSystem.getNumberInput().trim();
        else if (t === 'pattern') input = lockSystem.getPatternInput();
        else if (t === 'colorSequence') input = lockSystem.getColorSequenceInput().trim().toLowerCase();
        else if (t === 'coordinateLock') input = lockSystem.getCoordinateInput().trim();
        else if (t === 'timestamp') input = lockSystem.getTimestampInput().trim();
        else if (t === 'multiCode') input = lockSystem.getMultiCodeInput().trim().toUpperCase();
        else if (t === 'phraseCommaPassword') input = lockSystem.getPhraseCommaPasswordInput();
        if (input !== undefined && input !== '') {
            isCorrect = await lockSystem.validateHash(input, codeHash);
        }
    } else {
        if (t === '4digit') isCorrect = lockSystem.get4DigitInput() === file.code;
        else if (t === 'phrase') isCorrect = lockSystem.getPhraseInput() === file.code;
        else if (t === 'numberlock') isCorrect = lockSystem.getNumberInput() === file.code;
        else if (t === 'pattern') isCorrect = lockSystem.getPatternInput() === (file.pattern || file.code);
        else if (t === 'colorSequence') isCorrect = lockSystem.validateColorSequence(lockSystem.getColorSequenceInput(), file.code);
        else if (t === 'frequencyMatch' || t === 'frequency') {
            const exp = file.frequencies ? { low: file.frequencies[0], mid: file.frequencies[1], high: file.frequencies[2] } : file.code;
            isCorrect = lockSystem.validateFrequency(lockSystem.getFrequencyInput(), exp);
        } else if (t === 'periodicTable') isCorrect = lockSystem.getPeriodicInput() === file.code;
        else if (t === 'coordinateLock') isCorrect = lockSystem.getCoordinateInput() === file.code;
        else if (t === 'timestamp') isCorrect = lockSystem.getTimestampInput() === file.code;
        else if (t === 'multiCode') isCorrect = lockSystem.validateMultiCode(lockSystem.getMultiCodeInput(), file.codes || [file.code]);
        else if (t === 'slidingPuzzle' || t === 'puzzle') isCorrect = lockSystem.isPuzzleSolved();
    }
    if (isCorrect) {
        unlockFile();
    } else {
        showLockError();
    }
}

// Unlock file and display
function unlockFile() {
    updateAuditLog(`DECRYPTION SUCCESS: ${currentLockFile}`);
    fileSystem[currentLockFile].locked = false;
    closeLock();
    displayFile(currentLockFile);
    generateFileExplorer();
    
    // Success notification
    showNotification(`File decrypted: ${currentLockFile}`);
}

// Show lock error
function showLockError() {
    decryptAttempts++;
    document.getElementById('decrypt-count').textContent = decryptAttempts;
    
    const errorMsg = document.getElementById('lock-error');
    errorMsg.classList.add('show');
    updateAuditLog(`DECRYPTION FAILED: Attempt ${decryptAttempts}`);
    
    if (decryptAttempts >= MAX_DECRYPT_ATTEMPTS) {
        setTimeout(() => {
            showWarning('MAXIMUM DECRYPTION ATTEMPTS EXCEEDED - FILE LOCKED FOR 60 SECONDS');
            closeLock();
        }, 1500);
    } else {
        setTimeout(() => errorMsg.classList.remove('show'), 2000);
    }
}

// Close lock screen
function closeLock() {
    document.getElementById('lock-screen').classList.remove('active');
    removeLockKeyboard();
}

// ==================== LORE CODEX - DISCOVERABLE TERMS ====================
// Codex starts empty. Terms are discovered when user hovers (magnifying-glass cursor) and clicks in file content.
const CODEX_TERMS = [
    { id: 'oracle-nexus', patterns: [/\bORACLE\s+NEXUS\b/gi, /\bORACLE\s+NEXUS\.EXE\b/gi], term: 'ORACLE / ORACLE NEXUS', def: 'Neural interface and computational system severed from Bishop. Fragments persist across the archive.' },
    { id: 'bishop', patterns: [/\bBishop\b/g], term: 'Bishop', def: 'Codename for the subject. Former Foundation Overseer, current VSA Surveyor. Post-severance from ORACLE NEXUS.' },
    { id: 'oracle', patterns: [/\bORACLE\b/g], term: 'ORACLE', def: 'Neural interface and computational system severed from Bishop. Fragments persist across the archive.' },
    { id: 'curator', patterns: [/\bThe Curator\b/gi, /\bCurator\b/g], term: 'The Curator', def: 'Entity connected to Bishop. Associated with pocket dimensions, coffee at 62.7°C, and the temperature of perfection.' },
    { id: 'vsa', patterns: [/\bVSA\b/g], term: 'VSA', def: 'Vantage Systems Authority. Classified terminal and clearance structure.' },
    { id: 'temp', patterns: [/62\.7\s*°?\s*[Cc]/g, /62\.7\s*degrees?\s*C/g], term: '62.7°C', def: 'Temperature of perfection. Coffee served in The Curator\'s pocket dimension. Multi-division ritual.' },
    { id: 'the-23', patterns: [/\bThe 23\b/gi], term: 'The 23', def: 'Twenty-three casualties of Operation Nightfall Recursion. Honored across divisions.' },
    { id: 'pa-11-1', patterns: [/Pa-11-1/gi, /\bStellar Students\b/gi], term: 'STF Pa-11-1', def: '"Stellar Students." Aegis Foundation scientific research division. Bishop\'s first assignment.' },
    { id: 'psi-22', patterns: [/Psi-22/gi, /\bKeep Veil Hidden\b/gi], term: 'STF Psi-22', def: '"Keep Veil Hidden." Aegis Foundation developer division. Bishop\'s former command.' },
    { id: 'aegis-foundation', patterns: [/\bAegis Foundation\b/gi], term: 'Aegis Foundation', def: 'Classified organization. Bishop\'s former affiliation. Oversees anomaly containment.' },
    { id: 'golf-777', patterns: [/\bSTF\s+Golf-777\b/gi, /\bGolf-777\b/gi], term: 'STF Golf-777', def: '"Lucky Bastards." Adopted Bishop as honorary lucky bastard #778.' },
    { id: 'quantum-device', patterns: [/\bquantum calculation device\b/gi, /\bquantum device\b/gi], term: 'Quantum device', def: 'Pho\'s Folly. Bishop\'s first successful build. Flickers near anomalies.' },
    { id: 'jim', patterns: [/\bJim\b/g], term: 'Jim', def: 'The Curator\'s teleporting kitten. Leaves anomalous gifts.' },
    { id: 'nightfall-recursion', patterns: [/Operation Nightfall Recursion/gi], term: 'Operation Nightfall Recursion', def: 'Omega-class incident. Bishop activated Trojan Protocol without authorization. 23 casualties.' },
    { id: 'the-gentleman', patterns: [/\bThe Gentleman\b/gi], term: 'The Gentleman', def: 'Bishop\'s moniker. Earned through unwavering professionalism and courtesy.' }
];

let discoveredCodexTerms = new Set();

function loadDiscoveredCodex() {
    try {
        const saved = localStorage.getItem('bishop-codex-discovered');
        if (saved) {
            const arr = JSON.parse(saved);
            discoveredCodexTerms = new Set(Array.isArray(arr) ? arr : []);
        }
    } catch (e) {}
}

function saveDiscoveredCodex() {
    localStorage.setItem('bishop-codex-discovered', JSON.stringify([...discoveredCodexTerms]));
}

function wrapCodexTermsInText(text) {
    let out = text;
    const replacements = [];
    let uid = 0;
    CODEX_TERMS.forEach(({ id, patterns }) => {
        if (discoveredCodexTerms.has(id)) return; // Don't wrap discovered terms - they display as normal text
        patterns.forEach(re => {
            out = out.replace(re, (match) => {
                const key = `__CODEX_${uid++}__`;
                replacements.push({ key, id, match });
                return key;
            });
        });
    });
    replacements.forEach(({ key, id, match }) => {
        const cls = 'codex-term codex-discoverable';
        out = out.replace(key, `<span class="${cls}" data-codex-id="${id}" title="Click to add to codex">${escapeHtml(match)}</span>`);
    });
    return out;
}

function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
}

function initCodexTerms(container) {
    if (!container) return;
    container.addEventListener('click', (e) => {
        const el = e.target.closest('.codex-term.codex-discoverable');
        if (!el) return;
        const id = el.getAttribute('data-codex-id');
        if (!id || discoveredCodexTerms.has(id)) return;
        discoveredCodexTerms.add(id);
        saveDiscoveredCodex();
        el.classList.remove('codex-discoverable');
        el.classList.add('codex-discovered');
        el.title = 'In codex';
        if (typeof showNotification === 'function') showNotification('Added to Lore Codex');
    });
}

// Investigation board: shows only adjacent file + ??? for connections beyond
function generateInvestigationBoardHTML() {
    const rels = typeof fileRelationships !== 'undefined' ? fileRelationships : {};
    const files = Object.keys(rels);
    let html = '<div class="investigation-board"><h3 class="terminal-text" style="color: var(--primary-orange); margin-bottom: 16px;">📋 FILE RELATIONSHIP MAP</h3><p class="terminal-text" style="opacity: 0.9; margin-bottom: 20px;">Connected documents share intelligence threads. Each file shows its direct connection; further links are classified.</p><div class="investigation-list">';
    files.forEach(from => {
        const toList = rels[from];
        if (Array.isArray(toList) && toList.length) {
            const first = toList[0];
            const rest = toList.length > 1 ? ', ???' : ', ???';
            html += `<div class="investigation-item"><span class="inv-file">${escapeHtml(from)}</span> <span class="inv-arrow">→</span> <span class="inv-links">${escapeHtml(first)}${rest}</span></div>`;
        }
    });
    if (files.length === 0) html += '<p class="terminal-text">No relationship data loaded.</p>';
    html += '</div></div>';
    return html;
}

// Lore codex: glossary - only shows discovered terms. Starts empty.
function generateLoreCodexHTML() {
    const entries = CODEX_TERMS.filter(t => discoveredCodexTerms.has(t.id));
    let html = '<div class="lore-codex"><h3 class="terminal-text" style="color: var(--primary-orange); margin-bottom: 16px;">📖 LORE CODEX</h3>';
    if (entries.length === 0) {
        html += '<p class="terminal-text" style="opacity: 0.9; margin-bottom: 20px;">No entries discovered yet. Hover over marked terms in files—cursor becomes a magnifying glass—and click to add them to your codex.</p><div class="lore-entries"></div>';
    } else {
        html += '<p class="terminal-text" style="opacity: 0.9; margin-bottom: 20px;">Terms discovered in the archive. Hover and click entries for interaction.</p><div class="lore-entries">';
        entries.forEach(({ term, def }) => {
            html += `<div class="lore-entry codex-entry-clickable"><dt class="lore-term">${escapeHtml(term)}</dt><dd class="lore-def">${escapeHtml(def)}</dd></div>`;
        });
        html += '</div>';
    }
    html += '</div>';
    return html;
}

// Display file content with typing animation
function displayFile(filename) {
    const file = fileSystem[filename];
    const window = document.getElementById('file-window');
    const content = document.getElementById('window-content');
    
    document.getElementById('window-title').textContent = filename;
    
    // Update file metadata
    const size = (Math.random() * 500 + 100).toFixed(1);
    const modified = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
    document.getElementById('file-size').textContent = `${size} KB`;
    document.getElementById('file-modified').textContent = `Modified: ${modified}`;
    
    if (file.type === 'text') {
        let displayContent = file.content;
        displayContent = displayContent.replace(/████/g, '<span class="redacted" title="REDACTED - Hover to reveal">████</span>');
        displayContent = wrapCodexTermsInText(displayContent);
        
        content.innerHTML = `<div class="terminal-text">${displayContent}</div>`;
        
        // Simulate typing effect for longer documents (skip when codex terms present)
        if (file.content.length > 500 && !displayContent.includes('codex-term')) {
            typeFileContent(content.querySelector('.terminal-text'));
        }
    } else if (file.type === 'audio') {
        const transcriptText = file.transcript || file.content || '';
        const cassetteHTML = `
            <div class="cassette-player">
                <div class="cassette-body">
                    <div class="cassette-window">
                        <div class="reel" id="reel1"></div>
                        <div class="reel" id="reel2"></div>
                    </div>
                    <div class="cassette-controls">
                        <button class="cassette-btn stop" id="stopBtn" onclick="stopAudioLog()">■</button>
                        <button class="cassette-btn play" onclick="playAudioLog()">▶</button>
                    </div>
                    <div class="cassette-label">Audio Log 001 - Bishop</div>
                </div>
                <progress id="audioProgress" value="0" max="100"></progress>
            </div>
        `;
        content.innerHTML = `
            <div class="terminal-text" style="margin-bottom: 20px;">${transcriptText}</div>
            <div class="audio-player cassette-theme">
                <p>🎵 AUDIO PLAYBACK SYSTEM</p>
                ${cassetteHTML}
            </div>
        `;
        window._currentAudioFile = file;
    } else if (file.type === 'special' && file.content === 'ACHIEVEMENTS_TRACKER') {
        content.innerHTML = (typeof achievementSystem !== 'undefined' && achievementSystem.generateHTML)
            ? achievementSystem.generateHTML()
            : '<div class="terminal-text"><p>Achievement system not loaded.</p></div>';
    } else if (file.type === 'special' && file.content === 'INVESTIGATION_BOARD') {
        content.innerHTML = generateInvestigationBoardHTML();
    } else if (file.type === 'special' && file.content === 'LORE_CODEX') {
        content.innerHTML = generateLoreCodexHTML();
    }
    
    window.classList.add('active');
    updateAuditLog(`FILE OPENED: ${filename}`);
}

// Typing animation for file content
function typeFileContent(element) {
    const fullText = element.textContent;
    element.textContent = '';
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < fullText.length) {
            element.textContent += fullText.charAt(index);
            index++;
            
            // Random speed variation
            if (Math.random() > 0.95) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    const newInterval = setInterval(() => {
                        if (index < fullText.length) {
                            element.textContent += fullText.charAt(index);
                            index++;
                        } else {
                            clearInterval(newInterval);
                        }
                    }, 5);
                }, 100);
            }
        } else {
            clearInterval(typeInterval);
        }
    }, 5);
}

// Window controls
function closeWindow() {
    document.getElementById('file-window').classList.remove('active');
    updateAuditLog('WINDOW CLOSED');
}

function minimizeWindow() {
    const window = document.getElementById('file-window');
    window.style.transform = 'scale(0.8)';
    window.style.opacity = '0';
    setTimeout(() => {
        window.classList.remove('active');
        window.style.transform = '';
        window.style.opacity = '';
    }, 300);
    updateAuditLog('WINDOW MINIMIZED');
}

// Window dragging functionality
function initializeWindowDragging() {
    const windowHeader = document.getElementById('window-header');
    const window = document.getElementById('file-window');
    
    windowHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

function dragStart(e) {
    if (e.target.classList.contains('window-btn')) return;
    
    isDragging = true;
    const window = document.getElementById('file-window');
    const rect = window.getBoundingClientRect();
    
    initialX = e.clientX - rect.left;
    initialY = e.clientY - rect.top;
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const window = document.getElementById('file-window');
    
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    
    window.style.left = currentX + 'px';
    window.style.top = currentY + 'px';
}

function dragEnd() {
    isDragging = false;
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // F1 - Help menu
        if (e.key === 'F1') {
            e.preventDefault();
            toggleHelp();
        }
        
        // ESC to close windows
        if (e.key === 'Escape') {
            closeWindow();
            closeLock();
            closeHelp();
            closeTaskManager();
            closeCommandLine();
        }
        
        // ~ to toggle command line
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            toggleCommandLine();
        }
        
        // Ctrl+Alt+Del for task manager
        if (e.ctrlKey && e.altKey && e.key === 'Delete') {
            e.preventDefault();
            toggleTaskManager();
        }
        
        // Delete key to reset file positions
        if (e.key === 'Delete' && e.ctrlKey && e.shiftKey) {
            if (confirm('Reset all file positions to default grid?')) {
                localStorage.removeItem('bishop-file-positions');
                filePositions = {};
                generateFileExplorer();
                updateAuditLog('FILE POSITIONS RESET');
            }
        }
        
        // M to toggle ambient sound
        if (e.key === 'm' || e.key === 'M') {
            toggleAmbientSound();
        }
    });
}

// Help menu
function toggleHelp() {
    const helpMenu = document.getElementById('help-menu');
    helpMenu.classList.toggle('active');
}

function closeHelp() {
    document.getElementById('help-menu').classList.remove('active');
}

// Task Manager
function toggleTaskManager() {
    const taskManager = document.getElementById('task-manager');
    if (!taskManager.classList.contains('active')) {
        updateProcessList();
        updateAuditLog('TASK MANAGER OPENED');
    }
    taskManager.classList.toggle('active');
}

function closeTaskManager() {
    document.getElementById('task-manager').classList.remove('active');
}

function updateProcessList() {
    const tbody = document.getElementById('process-list');
    tbody.innerHTML = '';
    
    systemProcesses.forEach(proc => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${proc.name}</td>
            <td>${proc.pid}</td>
            <td>${proc.memory}</td>
            <td>${proc.cpu}</td>
            <td><span class="process-status status-${proc.status}">${proc.status.toUpperCase()}</span></td>
        `;
    });
}

// Command Line Mode
function toggleCommandLine() {
    const cmdLine = document.getElementById('command-line');
    const isActive = cmdLine.classList.toggle('active');
    
    if (isActive) {
        document.getElementById('command-input').focus();
        updateAuditLog('COMMAND LINE ACTIVATED');
    }
}

function closeCommandLine() {
    document.getElementById('command-line').classList.remove('active');
}

// Handle command input
document.addEventListener('DOMContentLoaded', () => {
    const cmdInput = document.getElementById('command-input');
    if (cmdInput) {
        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand(cmdInput.value);
                cmdInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistoryIndex < commandHistory.length - 1) {
                    commandHistoryIndex++;
                    cmdInput.value = commandHistory[commandHistory.length - 1 - commandHistoryIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (commandHistoryIndex > 0) {
                    commandHistoryIndex--;
                    cmdInput.value = commandHistory[commandHistory.length - 1 - commandHistoryIndex] || '';
                } else {
                    commandHistoryIndex = -1;
                    cmdInput.value = '';
                }
            }
        });
    }
});

function executeCommand(cmd) {
    const output = document.getElementById('command-output');
    const cmdTrimmed = cmd.trim().toLowerCase();
    
    commandHistory.push(cmd);
    commandHistoryIndex = -1;
    
    // Echo command
    const cmdDiv = document.createElement('div');
    cmdDiv.innerHTML = `<span style="color: #33ff33;">C:\\CLASSIFIED\\></span> ${cmd}`;
    output.appendChild(cmdDiv);
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'command-result';
    
    // Process commands
    if (cmdTrimmed === 'help') {
        resultDiv.innerHTML = `Available commands:
    help - Show this help
    ls - List files
    clear - Clear screen
    status - System status
    ping - Network ping
    oracle - ORACLE status
    curator - Check Curator connection
    exit - Close command line`;
    } else if (cmdTrimmed === 'ls' || cmdTrimmed === 'dir') {
        const files = Object.keys(fileSystem).join('\n    ');
        resultDiv.textContent = `Files:\n    ${files}`;
    } else if (cmdTrimmed === 'clear' || cmdTrimmed === 'cls') {
        output.innerHTML = '<div class="command-welcome">VSA Terminal v2.47.3 - Type \'help\' for commands</div>';
        return;
    } else if (cmdTrimmed === 'status') {
        resultDiv.innerHTML = `System Status: <span style="color: #33ff33;">OPERATIONAL</span>
Memory Usage: ${document.getElementById('memory-usage').textContent}
Signal Strength: ${document.getElementById('signal-strength').textContent}
Files Loaded: ${Object.keys(fileSystem).length}`;
    } else if (cmdTrimmed === 'ping') {
        resultDiv.innerHTML = `Pinging VSA central server...
Reply from 192.168.1.1: bytes=32 time=${Math.floor(Math.random() * 50)}ms TTL=64
Reply from 192.168.1.1: bytes=32 time=${Math.floor(Math.random() * 50)}ms TTL=64
<span style="color: #33ff33;">Connection stable</span>`;
    } else if (cmdTrimmed === 'oracle') {
        resultDiv.innerHTML = `<span style="color: #ff3333;">ERROR: ORACLE NEXUS connection severed</span>
Last contact: ${Math.floor(Math.random() * 365)} days ago
Status: OFFLINE
Neural interface: PARTIALLY ACTIVE (residual)`;
    } else if (cmdTrimmed === 'curator') {
        resultDiv.innerHTML = `Checking Curator connection...
<span style="color: #33ff33;">✓ Quantum link established</span>
Last contact: ${Math.floor(Math.random() * 24)} hours ago
Status: ACTIVE (UNAUTHORIZED)`;
    } else if (cmdTrimmed === 'exit') {
        closeCommandLine();
        return;
    } else if (cmdTrimmed === '6270') {
        resultDiv.innerHTML = `<span style="color: #33ff33;">Easter egg found! Coffee at 62.7°C - The Curator's preferred temperature.</span>`;
    } else {
        resultDiv.className = 'command-result command-error';
        resultDiv.textContent = `Error: Command '${cmd}' not recognized. Type 'help' for available commands.`;
    }
    
    output.appendChild(resultDiv);
    output.scrollTop = output.scrollHeight;
}

// Audio log playback (cassette player - Bishop message)
function playAudioLog() {
    const progressEl = document.getElementById('audioProgress');
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    if (typeof audioManager !== 'undefined' && progressEl && reel1 && reel2) {
        const stopBtn = document.getElementById('stopBtn');
        if (stopBtn) stopBtn.classList.add('active');
        audioManager.playBishopLog001(progressEl, [reel1, reel2]).then(() => {
            if (stopBtn) stopBtn.classList.remove('active');
        });
    }
}
function stopAudioLog() {
    if (typeof audioManager !== 'undefined') {
        audioManager.stopSpeech();
    }
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const progressEl = document.getElementById('audioProgress');
    const stopBtn = document.getElementById('stopBtn');
    if (reel1) reel1.classList.remove('spinning');
    if (reel2) reel2.classList.remove('spinning');
    if (progressEl) progressEl.value = 0;
    if (stopBtn) stopBtn.classList.remove('active');
}

// Ambient sound toggle (uses audio_manager synthesized hum - no file needed)
function toggleAmbientSound() {
    if (typeof audioManager !== 'undefined') {
        audioManager.toggleAmbient();
        showNotification(audioManager.ambientEnabled ? 'Ambient sound enabled' : 'Ambient sound disabled');
    }
}

// Initialize on load
window.addEventListener('load', init);