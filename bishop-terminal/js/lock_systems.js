// Lock Systems - UI and Validation for All Lock Types
// Handles 4-digit, phrase, number, pattern locks, color sequences, frequency matching, etc.

class LockSystem {
    constructor() {
        this.currentLock = null;
        this.lockData = null;
        this.attempts = 0;
        this.maxAttempts = 3;
    }

    // ==================== 4-DIGIT LOCK ====================
    
    init4DigitLock() {
        this.numberInput = "";
        this.updateNumberDisplay();
    }
    
    addNumber(num) {
        if (this.numberInput.length < 4) {
            this.numberInput += num;
            this.updateNumberDisplay();
            if (typeof audioManager !== 'undefined') audioManager.beep();
        }
    }
    
    clearNumber() {
        this.numberInput = "";
        this.updateNumberDisplay();
    }
    
    removeLastNumber() {
        if (this.numberInput.length > 0) {
            this.numberInput = this.numberInput.slice(0, -1);
            this.updateNumberDisplay();
        }
    }
    
    updateNumberDisplay() {
        const spans = document.querySelectorAll('.number-display span');
        spans.forEach((span, index) => {
            if (index < this.numberInput.length) {
                span.textContent = this.numberInput[index];
                span.classList.add('filled');
            } else {
                span.textContent = '█';
                span.classList.remove('filled');
            }
        });
    }
    
    get4DigitInput() {
        return this.numberInput;
    }

    // ==================== PHRASE LOCK ====================
    
    initPhraseLock() {
        const input = document.getElementById('phrase-input');
        if (input) {
            input.value = '';
            input.focus();
        }
    }
    
    getPhraseInput() {
        const input = document.getElementById('phrase-input');
        return input ? input.value.trim().toUpperCase() : '';
    }

    getPhraseCommaPasswordInput() {
        const input = document.getElementById('phrase-comma-password-input');
        return input ? input.value.trim().toUpperCase() : '';
    }

    initPhraseCommaPasswordLock() {
        const input = document.getElementById('phrase-comma-password-input');
        if (input) { input.value = ''; input.focus(); }
    }

    // ==================== NUMBER LOCK ====================
    
    initNumberLock() {
        const input = document.getElementById('number-input');
        if (input) {
            input.value = '';
            input.focus();
        }
    }
    
    getNumberInput() {
        const input = document.getElementById('number-input');
        return input ? input.value.trim() : '';
    }

    // ==================== PATTERN LOCK ====================
    
    initPatternLock() {
        this.patternPath = [];
        this.patternDrawing = false;
        this.patternLines = [];
        
        const dots = document.querySelectorAll('.pattern-dot');
        
        if (!dots.length) return;
        
        // Mouse events
        dots.forEach((dot, index) => {
            dot.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.patternDrawing = true;
                this.addToPattern(dot, index);
            });
            
            dot.addEventListener('mouseenter', () => {
                if (this.patternDrawing) {
                    this.addToPattern(dot, index);
                }
            });
            
            dot.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.patternDrawing = true;
                this.addToPattern(dot, index);
            });
            
            dot.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.classList.contains('pattern-dot')) {
                    const idx = Array.from(dots).indexOf(element);
                    this.addToPattern(element, idx);
                }
            });
        });
        
        document.addEventListener('mouseup', () => {
            this.patternDrawing = false;
        });
        
        document.addEventListener('touchend', () => {
            this.patternDrawing = false;
        });
    }
    
    addToPattern(dot, index) {
        if (!this.patternPath.includes(index)) {
            this.patternPath.push(index);
            dot.classList.add('active');
            
            // Draw line to previous dot
            if (this.patternPath.length > 1) {
                this.drawPatternLine(this.patternPath[this.patternPath.length - 2], index);
            }
        }
    }
    
    drawPatternLine(fromIndex, toIndex) {
        const dots = document.querySelectorAll('.pattern-dot');
        const fromDot = dots[fromIndex];
        const toDot = dots[toIndex];
        
        if (!fromDot || !toDot) return;
        
        const fromRect = fromDot.getBoundingClientRect();
        const toRect = toDot.getBoundingClientRect();
        
        const line = document.createElement('div');
        line.className = 'pattern-line';
        
        const x1 = fromRect.left + fromRect.width / 2;
        const y1 = fromRect.top + fromRect.height / 2;
        const x2 = toRect.left + toRect.width / 2;
        const y2 = toRect.top + toRect.height / 2;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = length + 'px';
        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        
        const container = document.querySelector('.pattern-lock');
        if (container) container.appendChild(line);
        this.patternLines.push(line);
    }
    
    getPatternInput() {
        return this.patternPath.join('-');
    }
    
    clearPattern() {
        this.patternPath = [];
        document.querySelectorAll('.pattern-dot').forEach(d => d.classList.remove('active'));
        (this.patternLines || []).forEach(l => l.remove());
        this.patternLines = [];
    }
    
    // ==================== COLOR SEQUENCE LOCK ====================
    
    initColorSequence() {
        this.colorSequence = [];
        this.updateColorDisplay();
    }
    
    addColorToSequence(color) {
        if (this.colorSequence.length >= 8) return; // Cap at 8 colors
        this.colorSequence.push(color);
        this.updateColorDisplay();
        
        // Visual feedback
        const btn = document.querySelector(`.color-btn.color-${color}`);
        if (btn) {
            btn.classList.add('pressed');
            setTimeout(() => btn.classList.remove('pressed'), 200);
        }
    }
    
    clearColorSequence() {
        this.colorSequence = [];
        this.updateColorDisplay();
    }
    
    updateColorDisplay() {
        const display = document.getElementById('color-sequence-display');
        if (!display) return;
        
        display.innerHTML = this.colorSequence.map(color => 
            `<span class="color-indicator color-${color}"></span>`
        ).join('');
    }
    
    getColorSequenceInput() {
        return (this.colorSequence || []).join(',');
    }
    
    validateColorSequence(userInput, expected) {
        const inputArr = (typeof userInput === 'string' ? userInput.split(',') : userInput) || [];
        const expectedArr = Array.isArray(expected) ? expected : (expected || '').split(',');
        if (inputArr.length !== expectedArr.length) return false;
        return inputArr.every((c, i) => String(c).trim().toLowerCase() === String(expectedArr[i]).trim().toLowerCase());
    }
    
    validateFrequency(userInput, expected) {
        const exp = expected && expected.low !== undefined ? expected : 
            (expected && Array.isArray(expected) ? { low: expected[0], mid: expected[1], high: expected[2] } : null);
        if (!exp) return false;
        const tolerance = 15;
        return Math.abs((userInput.low || 0) - exp.low) <= tolerance &&
               Math.abs((userInput.mid || 0) - exp.mid) <= tolerance &&
               Math.abs((userInput.high || 0) - exp.high) <= tolerance;
    }
    
    // ==================== FREQUENCY MATCHER ====================
    
    initFrequencyMatcher() {
        const sliders = ['freq-low', 'freq-mid', 'freq-high'];
        
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            const display = document.getElementById(`${id}-val`);
            
            if (slider && display) {
                slider.addEventListener('input', (e) => {
                    display.textContent = '???'; // Don't reveal frequency - user must match by ear
                });
            }
        });
    }
    
    getFrequencyInput() {
        return {
            low: parseInt(document.getElementById('freq-low')?.value || 0),
            mid: parseInt(document.getElementById('freq-mid')?.value || 0),
            high: parseInt(document.getElementById('freq-high')?.value || 0)
        };
    }
    
    // ==================== SLIDING PUZZLE ====================
    
    initSlidingPuzzle(imageUrl, gridSize = 3) {
        this.puzzleSize = gridSize;
        this.puzzleTiles = [];
        this.emptyIndex = gridSize * gridSize - 1;
        
        const grid = document.getElementById('puzzle-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        
        // Create tiles
        for (let i = 0; i < gridSize * gridSize; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.dataset.index = i;
            tile.dataset.currentPos = i;
            
            if (i < gridSize * gridSize - 1) {
                tile.style.backgroundImage = `url(${imageUrl})`;
                tile.style.backgroundSize = `${gridSize * 100}%`;
                const x = (i % gridSize) * 100;
                const y = Math.floor(i / gridSize) * 100;
                tile.style.backgroundPosition = `-${x}% -${y}%`;
                tile.textContent = i + 1;
            } else {
                tile.classList.add('empty');
            }
            
            tile.addEventListener('click', () => this.movePuzzleTile(i));
            grid.appendChild(tile);
            this.puzzleTiles.push(tile);
        }
        
        // Shuffle
        this.shufflePuzzle();
    }
    
    movePuzzleTile(index) {
        const gridSize = this.puzzleSize;
        const emptyRow = Math.floor(this.emptyIndex / gridSize);
        const emptyCol = this.emptyIndex % gridSize;
        const tileRow = Math.floor(index / gridSize);
        const tileCol = index % gridSize;
        
        // Check if adjacent
        const isAdjacent = (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
                          (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow);
        
        if (isAdjacent) {
            const tiles = this.puzzleTiles;
            const tempPos = tiles[index].dataset.currentPos;
            tiles[index].dataset.currentPos = tiles[this.emptyIndex].dataset.currentPos;
            tiles[this.emptyIndex].dataset.currentPos = tempPos;
            
            [tiles[index].className, tiles[this.emptyIndex].className] = 
            [tiles[this.emptyIndex].className, tiles[index].className];
            
            [tiles[index].style.backgroundImage, tiles[this.emptyIndex].style.backgroundImage] = 
            [tiles[this.emptyIndex].style.backgroundImage, tiles[index].style.backgroundImage];
            
            [tiles[index].style.backgroundPosition, tiles[this.emptyIndex].style.backgroundPosition] = 
            [tiles[this.emptyIndex].style.backgroundPosition, tiles[index].style.backgroundPosition];
            
            [tiles[index].textContent, tiles[this.emptyIndex].textContent] = 
            [tiles[this.emptyIndex].textContent, tiles[index].textContent];
            
            this.emptyIndex = index;
            
            // Check if solved
            if (this.isPuzzleSolved()) {
                this.onPuzzleSolved();
            }
        }
    }
    
    shufflePuzzle() {
        // Perform random valid moves
        for (let i = 0; i < 100; i++) {
            const validMoves = this.getValidMoves();
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            this.movePuzzleTile(randomMove);
        }
    }
    
    getValidMoves() {
        const gridSize = this.puzzleSize;
        const emptyRow = Math.floor(this.emptyIndex / gridSize);
        const emptyCol = this.emptyIndex % gridSize;
        const moves = [];
        
        // Up
        if (emptyRow > 0) moves.push((emptyRow - 1) * gridSize + emptyCol);
        // Down
        if (emptyRow < gridSize - 1) moves.push((emptyRow + 1) * gridSize + emptyCol);
        // Left
        if (emptyCol > 0) moves.push(emptyRow * gridSize + (emptyCol - 1));
        // Right
        if (emptyCol < gridSize - 1) moves.push(emptyRow * gridSize + (emptyCol + 1));
        
        return moves;
    }
    
    isPuzzleSolved() {
        for (let i = 0; i < this.puzzleTiles.length - 1; i++) {
            if (parseInt(this.puzzleTiles[i].dataset.currentPos) !== i) {
                return false;
            }
        }
        return true;
    }
    
    onPuzzleSolved() {
        showNotification('✓ PUZZLE SOLVED!');
        setTimeout(() => {
            if (typeof checkLockCode === 'function') {
                checkLockCode();
            }
        }, 500);
    }
    
    // ==================== TIMESTAMP LOCK ====================
    
    initTimestampLock() {
        const input = document.getElementById('timestamp-input');
        if (input) { input.value = ''; input.focus(); }
    }
    
    getTimestampInput() {
        const input = document.getElementById('timestamp-input');
        return input ? input.value.trim() : '';
    }
    
    validateTimestamp(input, expected) {
        // Format: YYYY-MM-DD HH:MM
        return input.trim() === expected;
    }
    
    // ==================== PERIODIC TABLE LOCK ====================
    
    initPeriodicTable() {
        const input = document.getElementById('periodic-input');
        if (input) { input.value = ''; input.focus(); }
    }
    
    getPeriodicInput() {
        const input = document.getElementById('periodic-input');
        return input ? input.value.trim().toUpperCase() : '';
    }
    
    validatePeriodicTable(input, expected) {
        // Format: Au-Ra-Cl-E (element symbols)
        return input.trim().toUpperCase() === expected.toUpperCase();
    }
    
    // ==================== COORDINATE LOCK ====================
    
    initCoordinateLock() {
        const input = document.getElementById('coordinate-input');
        if (input) { input.value = ''; input.focus(); }
    }
    
    getCoordinateInput() {
        const input = document.getElementById('coordinate-input');
        return input ? input.value.trim() : '';
    }
    
    validateCoordinates(input, expected) {
        // Format: ∞.XXXX, Σ.XXXX, Δ.XXXX
        return input.trim() === expected;
    }
    
    // ==================== MULTI-CODE LOCK ====================
    
    initMultiCode() {
        const input = document.getElementById('multicode-input');
        if (input) { input.value = ''; input.focus(); }
    }
    
    getMultiCodeInput() {
        const input = document.getElementById('multicode-input');
        return input ? input.value.trim() : '';
    }
    
    validateMultiCode(input, expectedCodes) {
        const inputCodes = input.trim().split(/\s+/);
        if (inputCodes.length !== expectedCodes.length) return false;
        
        return inputCodes.every((code, index) => {
            return code.toUpperCase() === expectedCodes[index].toUpperCase();
        });
    }
    
    // ==================== HASH VALIDATION ====================
    
    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    async validateHash(input, expectedHash) {
        const inputHash = await this.hashString(input);
        if (Array.isArray(expectedHash)) {
            return expectedHash.includes(inputHash);
        }
        return inputHash === expectedHash;
    }
}

// Global lock system instance
const lockSystem = new LockSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LockSystem;
}
