// Achievements System for Bishop Terminal
// Tracks, unlocks, and displays achievements

class AchievementSystem {
    constructor() {
        this.achievements = {
            theArchivist: {
                id: 'theArchivist',
                name: 'The Archivist',
                description: 'Read all accessible files',
                icon: '📚',
                unlocked: false,
                requirement: 'Open 90% of all files',
                rarity: 'rare'
            },
            coffeeConnoisseur: {
                id: 'coffeeConnoisseur',
                name: 'Coffee Connoisseur',
                description: 'Find all coffee references',
                icon: '☕',
                unlocked: false,
                requirement: 'Find all 7 coffee references (62.7°C)',
                rarity: 'uncommon'
            },
            memoryMaster: {
                id: 'memoryMaster',
                name: 'Memory Master',
                description: 'Trigger the memory leak event',
                icon: '🧠',
                unlocked: false,
                requirement: 'Open more than 5 files simultaneously',
                rarity: 'rare'
            },
            oracleSeeker: {
                id: 'oracleSeeker',
                name: 'ORACLE Seeker',
                description: 'Collect all ORACLE fragments',
                icon: '🔮',
                unlocked: false,
                requirement: 'Collect all 10 fragments to spell QUANTUM.CORE.ACTIVE',
                rarity: 'epic'
            },
            earlyBird: {
                id: 'earlyBird',
                name: 'Early Bird',
                description: 'Access the terminal at 3:00 AM',
                icon: '🌙',
                unlocked: false,
                requirement: 'Be online at exactly 3:00 AM',
                rarity: 'uncommon'
            },
            ghostHunter: {
                id: 'ghostHunter',
                name: 'Ghost Hunter',
                description: 'Witness ORACLE\'s ghost',
                icon: '👻',
                unlocked: false,
                requirement: 'Rare random event (very low probability)',
                rarity: 'legendary'
            },
            konamiWarrior: {
                id: 'konamiWarrior',
                name: 'Konami Warrior',
                description: 'Enter the sacred code',
                icon: '🎮',
                unlocked: false,
                requirement: '↑↑↓↓←→←→BA',
                rarity: 'epic',
                secretPhrase: 'THE GENTLEMAN CALCULATES SEVENTEEN MOVES AHEAD'
            },
            the23: {
                id: 'the23',
                name: 'The 23',
                description: 'Honor the fallen',
                icon: '🕯️',
                unlocked: false,
                requirement: 'Click on "23" exactly 23 times',
                rarity: 'rare'
            },
            curatorsApprentice: {
                id: 'curatorsApprentice',
                name: 'Curator\'s Apprentice',
                description: 'Complete all Curator-related content',
                icon: '🎓',
                unlocked: false,
                requirement: 'Read all files related to The Curator',
                rarity: 'rare'
            },
            quantumMechanic: {
                id: 'quantumMechanic',
                name: 'Quantum Mechanic',
                description: 'Understand the quantum device',
                icon: '💎',
                unlocked: false,
                requirement: 'Unlock the quantum device manual',
                rarity: 'uncommon'
            }
        };
        
        this.load();
    }
    
    // Load achievements from storage
    load() {
        const saved = localStorage.getItem('bishop-achievements');
        if (saved) {
            const savedData = JSON.parse(saved);
            Object.keys(savedData).forEach(key => {
                if (this.achievements[key]) {
                    this.achievements[key].unlocked = savedData[key];
                }
            });
        }
    }
    
    // Save achievements to storage
    save() {
        const saveData = {};
        Object.keys(this.achievements).forEach(key => {
            saveData[key] = this.achievements[key].unlocked;
        });
        localStorage.setItem('bishop-achievements', JSON.stringify(saveData));
    }
    
    // Unlock an achievement
    unlock(achievementId) {
        if (this.achievements[achievementId] && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.save();
            this.showUnlockNotification(achievementId);
            return true;
        }
        return false;
    }
    
    // Show unlock notification
    showUnlockNotification(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;
        
        const notification = document.createElement('div');
        notification.className = `achievement-notification rarity-${achievement.rarity}`;
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-header">🏆 ACHIEVEMENT UNLOCKED</div>
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                ${achievement.secretPhrase ? `
                    <div class="secret-phrase">
                        <strong>SECRET PHRASE:</strong><br>
                        "${achievement.secretPhrase}"<br>
                        <small>Use this once with Phocused to ask anything!</small>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, achievement.secretPhrase ? 10000 : 5000);
    }
    
    // Get progress
    getProgress() {
        const total = Object.keys(this.achievements).length;
        const unlocked = Object.values(this.achievements).filter(a => a.unlocked).length;
        return {
            unlocked,
            total,
            percentage: Math.round((unlocked / total) * 100)
        };
    }
    
    // Get all achievements sorted by rarity
    getAllSorted() {
        const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
        return Object.values(this.achievements).sort((a, b) => {
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        });
    }
    
    // Check if achievement is unlocked
    isUnlocked(achievementId) {
        return this.achievements[achievementId]?.unlocked || false;
    }
    
    // Generate HTML for achievements display
    generateHTML() {
        const progress = this.getProgress();
        const sorted = this.getAllSorted();
        
        let html = `
            <div class="achievements-container">
                <div class="achievements-header">
                    <h2>🏆 ACHIEVEMENTS</h2>
                    <div class="achievement-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                        </div>
                        <div class="progress-text">${progress.unlocked} / ${progress.total} Unlocked (${progress.percentage}%)</div>
                    </div>
                </div>
                <div class="achievements-list">
        `;
        
        sorted.forEach(achievement => {
            const statusClass = achievement.unlocked ? 'unlocked' : 'locked';
            const rarityClass = `rarity-${achievement.rarity}`;
            
            html += `
                <div class="achievement-item ${statusClass} ${rarityClass}">
                    <div class="achievement-icon-large">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${achievement.name}</div>
                        <div class="achievement-description">${achievement.description}</div>
                        <div class="achievement-requirement">
                            ${achievement.unlocked ? '✓ Completed' : achievement.requirement}
                        </div>
                        <div class="achievement-rarity">${achievement.rarity.toUpperCase()}</div>
                    </div>
                    <div class="achievement-status">
                        ${achievement.unlocked ? '<span class="status-unlocked">✓</span>' : '<span class="status-locked">🔒</span>'}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="achievements-footer">
                    <p>Some achievements have hidden requirements. Explore to discover them all!</p>
                </div>
            </div>
        `;
        
        return html;
    }
    
    // Reset all achievements (for testing)
    reset() {
        if (confirm('Are you sure you want to reset all achievements? This cannot be undone.')) {
            Object.keys(this.achievements).forEach(key => {
                this.achievements[key].unlocked = false;
            });
            this.save();
            if (typeof showNotification === 'function') {
                showNotification('All achievements reset');
            }
        }
    }
}

// Create global achievement system
const achievementSystem = new AchievementSystem();

// Helper functions for easy access
function unlockAchievement(id) {
    return achievementSystem.unlock(id);
}

function checkAchievement(id) {
    return achievementSystem.isUnlocked(id);
}

function getAchievementProgress() {
    return achievementSystem.getProgress();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementSystem;
}
