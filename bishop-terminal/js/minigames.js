// Mini-Games for Bishop Terminal
// Coffee Clicker and Minesweeper with Bishop theme

// ==================== COFFEE CLICKER ====================

class CoffeeClicker {
    constructor() {
        this.temperature = 20; // Start at room temperature
        this.targetTemp = 62.7;
        this.clicks = 0;
        this.coffeePerClick = 1;
        this.autoBrewers = 0;
        this.curatorBlessing = false;
        this.upgrades = {
            betterBeans: { cost: 10, owned: false, boost: 2 },
            quantumKettle: { cost: 50, owned: false, boost: 5 },
            curatorRecipe: { cost: 100, owned: false, boost: 10 },
            oraclePredictor: { cost: 500, owned: false, boost: 25 },
            perfectGrind: { cost: 1000, owned: false, boost: 50 }
        };
        
        this.load();
        this.startAutoBrewing();
    }
    
    load() {
        const saved = localStorage.getItem('coffee-clicker-save');
        if (saved) {
            const data = JSON.parse(saved);
            this.temperature = data.temperature || 20;
            this.clicks = data.clicks || 0;
            this.coffeePerClick = data.coffeePerClick || 1;
            this.autoBrewers = data.autoBrewers || 0;
            this.upgrades = data.upgrades || this.upgrades;
            this.curatorBlessing = data.curatorBlessing || false;
        }
    }
    
    save() {
        localStorage.setItem('coffee-clicker-save', JSON.stringify({
            temperature: this.temperature,
            clicks: this.clicks,
            coffeePerClick: this.coffeePerClick,
            autoBrewers: this.autoBrewers,
            upgrades: this.upgrades,
            curatorBlessing: this.curatorBlessing
        }));
    }
    
    click() {
        this.clicks += this.coffeePerClick;
        this.temperature += 0.1 * this.coffeePerClick;
        
        // Cap at 100°C
        if (this.temperature > 100) {
            this.temperature = 100;
        }
        
        // Check if perfect temperature reached
        if (Math.abs(this.temperature - this.targetTemp) < 0.1 && !this.curatorBlessing) {
            this.achievePerfection();
        }
        
        this.save();
        this.updateDisplay();
        
        // Play quiet click sound
        if (typeof audioManager !== 'undefined' && audioManager.quietBeep) {
            audioManager.quietBeep();
        }
    }
    
    buyUpgrade(upgradeName) {
        const upgrade = this.upgrades[upgradeName];
        if (!upgrade || upgrade.owned) return false;
        
        if (this.clicks >= upgrade.cost) {
            this.clicks -= upgrade.cost;
            upgrade.owned = true;
            this.coffeePerClick += upgrade.boost;
            
            if (typeof audioManager !== 'undefined' && audioManager.success) {
                audioManager.success();
            }
            
            this.save();
            this.updateDisplay();
            return true;
        }
        
        return false;
    }
    
    buyAutoBrewer() {
        const cost = 25 * (this.autoBrewers + 1);
        if (this.clicks >= cost) {
            this.clicks -= cost;
            this.autoBrewers++;
            this.save();
            this.updateDisplay();
            return true;
        }
        return false;
    }
    
    startAutoBrewing() {
        setInterval(() => {
            if (this.autoBrewers > 0) {
                this.clicks += this.autoBrewers * 0.5;
                this.temperature += 0.01 * this.autoBrewers;
                
                if (this.temperature > 100) {
                    this.temperature = 100;
                }
                
                this.save();
                this.updateDisplay();
            }
        }, 1000);
    }
    
    achievePerfection() {
        this.curatorBlessing = true;
        this.coffeePerClick *= 2;
        
        if (typeof unlockAchievement === 'function') {
            unlockAchievement('coffeeConnoisseur');
        }
        
        if (typeof showNotification === 'function') {
            showNotification('☕ PERFECT TEMPERATURE ACHIEVED! The Curator smiles upon you. Coffee per click DOUBLED!');
        }
        
        this.save();
    }
    
    reset() {
        if (confirm('Reset all coffee clicker progress?')) {
            localStorage.removeItem('coffee-clicker-save');
            location.reload();
        }
    }
    
    updateDisplay() {
        const tempDisplay = document.getElementById('coffee-temp');
        const clickDisplay = document.getElementById('coffee-clicks');
        const cpcDisplay = document.getElementById('coffee-cpc');
        
        if (tempDisplay) {
            tempDisplay.textContent = this.temperature.toFixed(1) + '°C';
            
            // Color based on temperature
            const diff = Math.abs(this.temperature - this.targetTemp);
            if (diff < 0.5) {
                tempDisplay.style.color = '#33ff33';
            } else if (diff < 2) {
                tempDisplay.style.color = '#ffaa55';
            } else {
                tempDisplay.style.color = '#ff9933';
            }
        }
        
        if (clickDisplay) {
            clickDisplay.textContent = Math.floor(this.clicks);
        }
        
        if (cpcDisplay) {
            cpcDisplay.textContent = this.coffeePerClick.toFixed(1);
        }
        
        // Update upgrade buttons
        Object.keys(this.upgrades).forEach(name => {
            const btn = document.getElementById(`upgrade-${name}`);
            if (btn) {
                const upgrade = this.upgrades[name];
                btn.disabled = upgrade.owned || this.clicks < upgrade.cost;
                btn.textContent = upgrade.owned ? '✓ Owned' : `Buy (${upgrade.cost})`;
            }
        });
        
        // Update auto-brewer button price
        const autoBrewerBtn = document.getElementById('auto-brewer-btn');
        if (autoBrewerBtn) {
            const cost = 25 * (this.autoBrewers + 1);
            autoBrewerBtn.disabled = this.clicks < cost;
            autoBrewerBtn.textContent = `Buy Auto-Brewer - Cost: ${cost}`;
        }
    }
    
    generateHTML() {
        return `
            <div class="coffee-clicker-game">
                <div class="coffee-display">
                    <div class="coffee-cup">☕</div>
                    <div class="coffee-temp" id="coffee-temp">${this.temperature.toFixed(1)}°C</div>
                    <div class="target-temp">Target: ${this.targetTemp}°C</div>
                    ${this.curatorBlessing ? '<div class="curator-blessing">✨ Curator\'s Blessing Active</div>' : ''}
                </div>
                
                <button class="coffee-click-btn" onclick="coffeeClicker.click()">
                    BREW COFFEE
                </button>
                
                <div class="coffee-stats">
                    <div>Total Clicks: <span id="coffee-clicks">${Math.floor(this.clicks)}</span></div>
                    <div>Per Click: <span id="coffee-cpc">${this.coffeePerClick.toFixed(1)}</span></div>
                    <div>Auto-Brewers: ${this.autoBrewers}</div>
                </div>
                
                <div class="coffee-upgrades">
                    <h3>UPGRADES</h3>
                    <button id="upgrade-betterBeans" onclick="coffeeClicker.buyUpgrade('betterBeans')">
                        Better Beans (+2) - Cost: 10
                    </button>
                    <button id="upgrade-quantumKettle" onclick="coffeeClicker.buyUpgrade('quantumKettle')">
                        Quantum Kettle (+5) - Cost: 50
                    </button>
                    <button id="upgrade-curatorRecipe" onclick="coffeeClicker.buyUpgrade('curatorRecipe')">
                        Curator's Recipe (+10) - Cost: 100
                    </button>
                    <button id="upgrade-oraclePredictor" onclick="coffeeClicker.buyUpgrade('oraclePredictor')">
                        ORACLE Predictor (+25) - Cost: 500
                    </button>
                    <button id="upgrade-perfectGrind" onclick="coffeeClicker.buyUpgrade('perfectGrind')">
                        Perfect Grind (+50) - Cost: 1000
                    </button>
                    
                    <h3>AUTO-BREWERS</h3>
                    <button id="auto-brewer-btn" onclick="coffeeClicker.buyAutoBrewer()">
                        Buy Auto-Brewer - Cost: ${25 * (this.autoBrewers + 1)}
                    </button>
                    <p class="small">Each auto-brewer produces 0.5 clicks/sec</p>
                </div>
            </div>
        `;
    }
}

// ==================== MINESWEEPER ====================

class BishopMinesweeper {
    constructor() {
        this.rows = 9;
        this.cols = 9;
        this.mineCount = 23; // The 23!
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.gameOver = false;
        this.won = false;
        this.firstClick = true;
        
        this.initBoard();
    }
    
    initBoard() {
        // Create empty board
        this.board = Array(this.rows).fill(null).map(() => 
            Array(this.cols).fill(0)
        );
        
        this.revealed = Array(this.rows).fill(null).map(() => 
            Array(this.cols).fill(false)
        );
        
        this.flagged = Array(this.rows).fill(null).map(() => 
            Array(this.cols).fill(false)
        );
    }
    
    placeMines(avoidRow, avoidCol) {
        let minesPlaced = 0;
        
        while (minesPlaced < this.mineCount) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            
            // Don't place mine on first click or adjacent
            const tooClose = Math.abs(row - avoidRow) <= 1 && Math.abs(col - avoidCol) <= 1;
            
            if (this.board[row][col] !== -1 && !tooClose) {
                this.board[row][col] = -1; // -1 represents a mine
                minesPlaced++;
                
                // Update adjacent numbers
                for (let r = row - 1; r <= row + 1; r++) {
                    for (let c = col - 1; c <= col + 1; c++) {
                        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
                            if (this.board[r][c] !== -1) {
                                this.board[r][c]++;
                            }
                        }
                    }
                }
            }
        }
    }
    
    reveal(row, col) {
        if (this.gameOver || this.revealed[row][col] || this.flagged[row][col]) {
            return;
        }
        
        // Place mines on first click
        if (this.firstClick) {
            this.placeMines(row, col);
            this.firstClick = false;
        }
        
        this.revealed[row][col] = true;
        
        // Hit a mine
        if (this.board[row][col] === -1) {
            this.gameOver = true;
            this.revealAll();
            
            if (typeof audioManager !== 'undefined' && audioManager.error) {
                audioManager.error();
            }
            
            return;
        }
        
        // Auto-reveal adjacent cells if this is empty
        if (this.board[row][col] === 0) {
            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
                        if (!this.revealed[r][c]) {
                            this.reveal(r, c);
                        }
                    }
                }
            }
        }
        
        // Check win condition
        this.checkWin();
        this.updateDisplay();
    }
    
    flag(row, col) {
        if (this.gameOver || this.revealed[row][col]) {
            return;
        }
        
        this.flagged[row][col] = !this.flagged[row][col];
        this.updateDisplay();
    }
    
    checkWin() {
        let allRevealed = true;
        
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] !== -1 && !this.revealed[r][c]) {
                    allRevealed = false;
                    break;
                }
            }
            if (!allRevealed) break;
        }
        
        if (allRevealed) {
            this.won = true;
            this.gameOver = true;
            
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('the23');
            }
            
            if (typeof audioManager !== 'undefined' && audioManager.success) {
                audioManager.success();
            }
            
            setTimeout(() => {
                alert('🏆 YOU WIN! All 23 mines swept. The fallen are honored.');
            }, 100);
        }
    }
    
    revealAll() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.revealed[r][c] = true;
            }
        }
        this.updateDisplay();
    }
    
    reset() {
        this.gameOver = false;
        this.won = false;
        this.firstClick = true;
        this.initBoard();
        this.updateDisplay();
    }
    
    updateDisplay() {
        const grid = document.getElementById('minesweeper-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'mine-cell';
                
                if (this.revealed[r][c]) {
                    cell.classList.add('revealed');
                    
                    if (this.board[r][c] === -1) {
                        cell.textContent = '💣';
                        cell.classList.add('mine');
                    } else if (this.board[r][c] > 0) {
                        cell.textContent = this.board[r][c];
                        cell.classList.add(`num-${this.board[r][c]}`);
                    }
                } else if (this.flagged[r][c]) {
                    cell.textContent = '🚩';
                    cell.classList.add('flagged');
                }
                
                // Click handlers
                cell.addEventListener('click', () => this.reveal(r, c));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.flag(r, c);
                });
                
                grid.appendChild(cell);
            }
        }
        
        // Update mine counter
        const counter = document.getElementById('mine-counter');
        if (counter) {
            const flagCount = this.flagged.flat().filter(f => f).length;
            counter.textContent = this.mineCount - flagCount;
        }
        
        // Show game over message when lost (not when won)
        const gameOverEl = document.getElementById('minesweeper-game-over');
        if (gameOverEl) {
            gameOverEl.style.display = (this.gameOver && !this.won) ? 'flex' : 'none';
        }
    }
    
    generateHTML() {
        return `
            <div class="minesweeper-game">
                <div class="minesweeper-header">
                    <h2>💣 MINESWEEPER - THE 23</h2>
                    <p>Honor the 23 fallen by clearing all mines</p>
                </div>
                
                <div class="minesweeper-controls">
                    <div class="mine-counter-display">
                        Mines: <span id="mine-counter">${this.mineCount}</span>
                    </div>
                    <button class="minesweeper-reset-btn" onclick="minesweeper.reset()">RESET</button>
                </div>
                
                <div class="minesweeper-grid" id="minesweeper-grid"></div>
                
                <div class="minesweeper-game-over" id="minesweeper-game-over" style="display: none;">
                    <p class="game-over-text">GAME OVER</p>
                    <button class="minesweeper-reset-btn game-over-reset" onclick="minesweeper.reset()">RESET</button>
                </div>
                
                <div class="minesweeper-instructions">
                    <p>Left click: Reveal | Right click: Flag</p>
                    <p>Clear all ${this.mineCount} mines to win</p>
                </div>
            </div>
        `;
    }
}

// Global instances
let coffeeClicker = null;
let minesweeper = null;

// Initialize games
function initCoffeeClicker() {
    coffeeClicker = new CoffeeClicker();
    return coffeeClicker.generateHTML();
}

function initMinesweeper() {
    minesweeper = new BishopMinesweeper();
    const html = minesweeper.generateHTML();
    setTimeout(() => {
        if (minesweeper) {
            minesweeper.updateDisplay();
        }
    }, 100);
    return html;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CoffeeClicker, BishopMinesweeper };
}
