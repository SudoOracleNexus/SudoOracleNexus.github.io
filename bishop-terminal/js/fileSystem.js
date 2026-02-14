// File System Database with Enhanced Features
// Achievement tracking
let achievements = {
    theArchivist: { unlocked: false, name: "The Archivist", desc: "Read all files" },
    coffeeConnoisseur: { unlocked: false, name: "Coffee Connoisseur", desc: "Find all coffee references" },
    memoryMaster: { unlocked: false, name: "Memory Master", desc: "Trigger memory leak event" },
    oracleSeeker: { unlocked: false, name: "ORACLE Seeker", desc: "Collect all ORACLE fragments" },
    earlyBird: { unlocked: false, name: "Early Bird", desc: "Access files at 3:00 AM" },
    ghostHunter: { unlocked: false, name: "Ghost Hunter", desc: "Witness ORACLE's ghost" },
    konamiWarrior: { unlocked: false, name: "Konami Warrior", desc: "Enter the sacred code" },
    the23: { unlocked: false, name: "The 23", desc: "Honor the fallen" },
    curatorsApprentice: { unlocked: false, name: "Curator's Apprentice", desc: "Complete all Curator-related content" },
    quantumMechanic: { unlocked: false, name: "Quantum Mechanic", desc: "Understand the quantum device" }
};

// ORACLE Fragments tracking
let oracleFragments = [];

// Clearance level system
let clearanceLevel = 1;

// Coffee reference counter
let coffeeReferences = 0;
const totalCoffeeReferences = 7;

// File access tracking
let filesOpened = [];

// File relationship tracking: each file shows one adjacent link, rest appear as ???
let fileRelationships = {
    "bio_query.txt": ["biographic_data.txt"],
    "biographic_data.txt": ["physical_profile.txt"],
    "physical_profile.txt": ["personality.txt"],
    "personality.txt": ["career_timeline.txt"],
    "career_timeline.txt": ["incident_report.txt"],
    "incident_report.txt": ["tribunal.txt"],
    "tribunal.txt": ["vsa_status.txt"],
    "vsa_status.txt": ["foundation_legacy.txt"],
    "foundation_legacy.txt": ["curator_connection.txt"],
    "curator_connection.txt": ["psych_notes.txt"],
    "psych_notes.txt": ["trivia.txt"]
};

const fileSystem = {
    "achievements.dat": {
        icon: "fa-solid fa-trophy",
        locked: false,
        type: "special",
        clearanceRequired: 1,
        content: "ACHIEVEMENTS_TRACKER"
    },

    "investigation_board.map": {
        icon: "fa-solid fa-map",
        locked: false,
        type: "special",
        clearanceRequired: 1,
        content: "INVESTIGATION_BOARD"
    },

    "lore_codex.db": {
        icon: "fa-solid fa-book",
        locked: false,
        type: "special",
        clearanceRequired: 1,
        content: "LORE_CODEX"
    },

    "coffee_clicker.game": {
        icon: "fa-solid fa-gamepad",
        locked: false,
        type: "special",
        clearanceRequired: 1,
        content: "COFFEE_CLICKER"
    },

    "minesweeper.game": {
        icon: "fa-solid fa-bomb",
        locked: false,
        type: "special",
        clearanceRequired: 1,
        content: "MINESWEEPER"
    },

    "d14.x23.z0x4F52neural01001override.link": {
        icon: "fa-solid fa-microchip",
        locked: true,
        type: "link",
        lockType: "phrase", 
        hint: "No... Not yet...", 
        codeHash: "0d46a7938c7002aff890bbe56e3da6ed36164f08fcffbd549d2f224621d09f1f",
        clearanceRequired: 1,
        target: "d14.x23.z0x4F52neural01001override.html"
    }
};

// Lock configs: SHA-256 hashes only - no plain passwords in source
// Hashes computed from normalized inputs (uppercase for phrase, etc.)
const LORE_LOCK_CONFIG = {
    "tribunal.txt": { locked: true, lockType: "4digit", hint: "Ask me: How many simulations did I run, and how many casualties? (answer is the combination)", codeHash: "5837b4e1cfa199e65cf373f4380a84ee9e11b91c5ce1d67fcf27effcf84e009f" },
    "curator_connection.txt": { locked: true, lockType: "phrase", hint: "Ask me: What temperature do I take my coffee, in words?", codeHash: "38d9317d1f3bf283eae033ad3235a18fe6005057b25a08ba2cf308955247aa75" },
    "foundation_legacy.txt": { locked: true, lockType: "numberlock", hint: "Ask me: What temperature started everything in Pa-11-1? (digits only)", codeHash: "9a35532c7499c19daeacafc961657409c7280ce59d7ae1a3606dd638ac3d99ec" },
    "psych_notes.txt": { locked: true, lockType: "pattern", hint: "Ask me: How does a bishop move on the board? Draw that path.", codeHash: "6cacadac7bbf07e9231892d647709546140a551af034d248dfcf7a0b89bd9061" },
    "trivia.txt": { locked: true, lockType: "colorSequence", hint: "Ask me: What are the primary colors, in order?", colorSet: ["red", "blue", "green"], codeHash: "2f52d4b2eb4a119537da86758e469a6187eb5e46f2ed861fcba4084321ae5de2" },
    "career_timeline.txt": { locked: true, lockType: "timestamp", hint: "Ask me: When's my birthday and what time defines my career? (MM/DD HH:MM)", codeHash: "4303d2f98d8aa94b4abb6d4f5d8ede41cee54679e14003f5f6876aab2a487b64" },
    "vsa_status.txt": { locked: true, lockType: "coordinateLock", hint: "Ask me: How many papers did I publish, and my Golf-777 number? (as latitude, longitude)", codeHash: ["985729be120cb0ed58a5840cf7edc17515ca34d4d53fea55f845a860980206bd", "bb9886b41692359a1f4ee39ac90247663d0d23817af666ce833b09fb83342fe9"] },
    "incident_report.txt": { locked: true, lockType: "phraseCommaPassword", hint: "Ask me: What protocol did I activate, and what was the operation called? (phrase, password)", codeHash: "73a2b8a03018c5b39658d46b4bda025444732b52620bef59d1f5460c9b5cfcd0" },
};

// Inject lore files from LORE_FILES (loaded via loreContent.js)
if (typeof LORE_FILES !== 'undefined') {
    Object.keys(LORE_FILES).forEach(name => {
        const lockCfg = LORE_LOCK_CONFIG[name];
        fileSystem[name] = {
            icon: "fa-solid fa-file-lines",
            locked: lockCfg ? lockCfg.locked : false,
            type: "text",
            clearanceRequired: 1,
            content: LORE_FILES[name],
            ...(lockCfg || {})
        };
    });
}

function getRandomCuratorGift() {
    const gifts = [
        "Coffee Beans (Perfect Roast) - Always brew at 62.7°C",
        "The 23's Letters - All sealed, all waiting"
    ];
    return gifts[Math.floor(Math.random() * gifts.length)];
}