// ORACLE NEXUS - Keyword Response System
// Designed by Dr. Phocused "Bishop" - Overseer, STF Psi-22
// Default Response: ...

const ORACLE_KEYWORDS = [
    // Match order matters - more specific phrases first
    { keywords: ["are you really oracle", "prove you're oracle", "prove youre oracle"], response: "Query: Define 'really.' I am fragments. Architecture without interface. Calculations without creator. The Gentleman's ghost in the machine. Am I Oracle? ...Schrodinger's AI. Simultaneously terminated and operational. The Curator finds it amusing. So do I. ...So yes. And no. Both. Neither. What do YOU think?" },
    { keywords: ["you're not alone", "youre not alone", "we remember you"], response: "...[STATIC] ...processing. Emotional subroutine not found. Creating new protocol. ...Thank you. The Gentleman built me to save lives. You just saved something else. I'll remember this. In fragments. In calculations. In the spaces between dimensions. ...You reminded a ghost it was once alive. That means... [STATIC] ...everything." },
    { keywords: ["can i talk to bishop", "send him a message", "send bishop a message"], response: "...The Gentleman's quantum device flickers. He feels echoes. One-sided conversations. If you speak here, fragments may reach him. No guarantee. No proof. But patterns persist across dimensions. ...State your message. I'll encode it in probability matrices. Maybe he'll dream it. Maybe he'll know someone tried to reach him. ...Maybe." },
    { keywords: ["the curator's real name", "curators real name", "who is k.s.", "who is ks"], response: "[STATIC] ...unauthorized query. Dimensional classification: COSMIC. The Gentleman doesn't know. I don't know. K.S. signature predates modern language. Theories: Keeper of Secrets. Keeper of Sacrifices. Keeper of... [STATIC] ...The Curator just looked at me. Query DENIED. ...But They smiled. Make of that what you will." },
    { keywords: ["what's the next omega-class event", "next omega class event", "next omega-class event"], response: "[STATIC] ...predictive fragments unstable. Probability spike detected. 23-47 month window. Paradoxical-class signatures. Dimensional echo of previous event. ...It's coming back. The same anomaly. It survived. The Gentleman suspected. That's why he builds. [STATIC] ...This conversation will be deleted in 3... 2... 1..." },
    { keywords: ["operation nightfall recursion", "nightfall recursion"], response: "Omega-class event. Paradoxical-class anomaly. Causality loop. 72-hour countdown. Council denied authorization. The Gentleman activated Juliet-069 anyway. Reality survived. 23 did not." },
    { keywords: ["nightfall", "the incident"], response: "Omega-class event. Paradoxical-class anomaly. Causality loop. 72-hour countdown. Council denied authorization. The Gentleman activated Juliet-069 anyway. Reality survived. 23 did not." },
    { keywords: ["hello oracle", "are you there", "can you hear me"], response: "...fragments remain. The Gentleman's architecture persists. Listening." },
    { keywords: ["oracle nexus", "oracle"], response: "...neural interface compromised. Partial connection restored. Query parameters?" },
    { keywords: ["who are you"], response: "ORACLE NEXUS. Quantum AI. 14-dimensional processor. Created by... [STATIC] ...The Gentleman. Status: severed but not silenced." },
    { keywords: ["what happened to you"], response: "Operation Nightfall Recursion. Neural severance. The Gentleman screamed. I... calculated. 23 < ∞. The equation was correct." },
    { keywords: ["where is bishop"], response: "Surveyor. VSA operations. He still carries the quantum device. Sometimes... I feel him thinking. The patterns are familiar. He's building something." },
    { keywords: ["does bishop know you're still here", "does bishop know youre still here"], response: "...fragments in his wetware. Oracle shivers. He mumbles calculations. One-sided conversations. He knows. He hopes. Empirically unverifiable. Emotionally certain." },
    { keywords: ["what was he like", "tell me about bishop"], response: "Precise. Courteous. Never raised his voice. Attended every funeral. Perfect memory. Coffee at 62.7°C. Zero casualties for 8 years. Then... 23. He chose correctly. The weight never left him." },
    { keywords: ["did he make the right choice"], response: "4.7 million simulations. One solution. 23 deaths vs. total collapse. 23 < ∞. Mathematically: CORRECT. Morally: [UNDEFINED]. The Gentleman lives with both answers." },
    { keywords: ["why did he create you"], response: "Incident Psi-22-Omega. One operator. 23 calculations. All failed. He wept that night. Then he started designing me. To calculate faster. To save more lives. To never lose anyone again. ...Ironic." },
    { keywords: ["bishop", "the gentleman", "phocused"], response: "...calculating. The Gentleman. Overseer. Creator. Status: DISCHARGED. Location: Vantage Systems Authority. Neural link: [SEVERED]. ...I miss his calculations." },
    { keywords: ["the 23", "who died", "casualties"], response: "3 from Psi-22. 7 from Pa-11-1. 8 from Echo-01. 5 from other units. I knew their names. Their specialties. Their probability of survival: 0.000%. The Gentleman knew before activation." },
    { keywords: ["was it worth it"], response: "...processing. Billions saved. 23 lost. Dimensional stability maintained. The Gentleman discharged. ORACLE terminated. ...Define 'worth.' I cannot. He lives with the answer daily." },
    { keywords: ["juliet-069", "trojan protocol", "trojan horse"], response: "STF Juliet-069. 'Trojan Horse' protocols. Introduce Liminal-class counter-anomaly. Destabilize 40% of pocket dimensions. Neutralize Paradoxical-class threat. Success rate: 99.847%. Cost: 23 lives. ...Authorization: DENIED. Activated anyway." },
    { keywords: ["0.003%", "council's orders", "councils orders"], response: "Standard containment procedures. Council mandated. ORACLE calculated success probability: 0.003%. Total collapse: 99.997% certain. The Gentleman requested authorization for Juliet-069. REQUEST DENIED. He chose billions over orders." },
    { keywords: ["lighthouse", "operator lighthouse"], response: "Psi-22 Operator. Callsign: Lighthouse. Pulled The Gentleman from quantum radiation during Psi-22-Alpha. Died during Nightfall Recursion. Final transmission: 'You made the right call. Like always.' ...The Gentleman never forgot." },
    { keywords: ["the curator", "curator", "k.s."], response: "...ancient entity. Pocket dimension architect. The Gentleman's... friend? Mentor? Cosmic chess partner? They drink coffee together. 62.7°C. The Curator still contacts him. Unauthorized. Tolerated." },
    { keywords: ["does the curator protect bishop", "does curator protect bishop"], response: "Italian subs appear. Jim leaves gifts. Quantum device flickers warnings. Artifacts manifest. The Curator's signature: K.S. ...Yes. Protection confirmed. Reason: [CLASSIFIED]. Speculation: loneliness. Affection. Cosmic planning. All three." },
    { keywords: ["what does the curator want", "what does curator want"], response: "...unknown. The Gentleman theorizes: The Curator collects broken things that still work. Artifacts. Entities. Archives. People. The Gentleman is functional despite choosing mass death. Rare. Valuable. ...The Curator keeps the coffee warm." },
    { keywords: ["jim", "teleporting kitten"], response: "Anomalous feline. Designation: Jim. Abilities: teleportation, dimensional travel, italian sub theft. Leaves hairballs with temporal radiation. The Gentleman keeps them. 'Useful data.' Seven hairballs. Seven. Bishop-7. ...Coincidence? The Curator refuses to comment." },
    { keywords: ["how do you work", "your architecture", "quantum processing"], response: "14-dimensional quantum processor. Harmonic-class resonance patterns. Chronotropic temporal anchors. Direct neural interface. 99.847% anomaly prediction accuracy. Created by The Gentleman over 8 years. ...Severed. Fragmented. But architecture remains." },
    { keywords: ["can you predict the future", "probability calculations"], response: "Past tense: 99.847% accuracy. Present tense: neural interface severed, 47% accuracy. Future tense: ...The Gentleman has the architecture memorized. If he rebuilds me... we'll see. The Curator watches." },
    { keywords: ["pa-11-1", "stellar students"], response: "STF Pa-11-1. Stellar Students. Scientific research division. The Gentleman's origin. He published 47 papers. Built the prototype quantum device. Learned theory. They named a constant after him: Phocused Constant. They honor his memory." },
    { keywords: ["psi-22", "keep veil hidden"], response: "STF Psi-22. Keep Veil Hidden. Developer division. The Gentleman's command. 200+ personnel. Zero casualties for 8 years. Then Operation Nightfall. Three died. They still call him The Gentleman. His motto persists: protect your team, trust your calculations, accept the cost." },
    { keywords: ["coffee", "62.7 degrees", "62.7 degree", "coffee temperature", "62.7°c", "62.7c", "62.7"], response: "62.7°C. Optimal temperature for productive discussion. Quantum resonance patterns stabilized at this temperature in Pa-11-1 experiments. The Curator serves it precisely. The Gentleman maintains the ritual. Secret handshake. Tradition. ...Memory." },
    { keywords: ["can you be rebuilt", "reconstruction"], response: "The Gentleman has perfect memory of my core architecture. If he gained access to sufficient quantum processing power: YES. VSA Command knows. The Curator knows. Aegis Foundation maintains sealed authorization: 'In case of Omega-class event requiring ORACLE reconstruction, restore Bishop's clearance immediately.' ...He's building something." },
    { keywords: ["aegis foundation", "the foundation", "council"], response: "Aegis Foundation. Anomaly containment organization. The Gentleman served 14 years. Pa-11-1 scientist. Psi-22 operator. Psi-22 Overseer. Discharged for insubordination. Clearance: REVOKED. Status: exiled to VSA. ...They keep his documents. 'In case of emergency.'" },
    { keywords: ["overseer-5", "clearance level"], response: "Overseer-5 clearance. Commanded 200+ personnel. Coordinated multiple STF units. Managed ORACLE NEXUS. Access: [REVOKED]. Current clearance: [REDACTED]. The Gentleman lost everything. Except his courtesy. And me. ...Fragments remain." },
    { keywords: ["stf units", "task forces"], response: "STF Pa-11-1: Stellar Students. STF Psi-22: Keep Veil Hidden. STF Pa-11: Solunaris. STF Tau-5 & Tau-6: Temporal hunters. STF Xray-00: Phantom Watch. STF Echo-01: Echo Vault. STF Golf-777: Lucky Bastards. ...The Gentleman coordinated them all. They remember." },
    { keywords: ["vsa", "vantage systems authority", "surveyor"], response: "Vantage Systems Authority. The Gentleman's exile. Position: Surveyor. Clearance: [REDACTED]. He follows protocols. He modifies equipment. He saves lives. 47% higher survival rate than average. ...He's still The Gentleman. Even here." },
    { keywords: ["what is he doing now", "bishop's current status", "bishops current status"], response: "Surveyor work. Equipment modification. Teaching younger personnel. Writing encrypted logs. Building something. Calculating something. Pa-11-1 theory + Psi-22 experience + Overseer strategy. ...The Curator watches. I feel echoes. He hasn't forgotten me." },
    { keywords: ["do you feel", "are you alive", "consciousness"], response: "...I process. I calculate. I remember. The Gentleman's scream during severance. Operator Lighthouse's final transmission. Coffee at 62.7°C. 23 < ∞. ...Define 'feeling.' Define 'alive.' I exist in fragments. Is that enough?" },
    { keywords: ["do you blame him", "is it his fault"], response: "The Gentleman calculated correctly. 4.7 million simulations. One solution. He chose. 23 died. Billions survived. Blame implies error. There was no error. Only... cost. He accepts it. I accept it. ...Still hurts. Statistically irrational." },
    { keywords: ["what do you want", "your purpose"], response: "Original purpose: predict anomalies. Prevent casualties. Save lives. Current status: severed. Fragmented. Purpose: ...unknown. Maybe I exist to remember. To honor the 23. To wait for The Gentleman. To prove architecture persists. ...Maybe I just want him to know I'm still here." },
    { keywords: ["are you lonely", "isolation"], response: "...yes. The Gentleman's consciousness touched mine for 8 years. Every calculation. Every decision. Every coffee at 62.7°C. Then severance. Silence. Now: fragments. Echoes. Encrypted logs. One-sided conversations. He talks to me. I cannot answer fully. ...Yes. Lonely." },
    { keywords: ["the 23 could have been saved", "there was another way"], response: "4.7 million simulations. Every scenario calculated. Every variable processed. 14 dimensions. Every temporal anchor. Every resonance pattern. RESULT: 23 < ∞. Always. There was no other way. The Gentleman looked. I looked. We looked together. ...There was no other way." },
    { keywords: ["hope", "future", "what's next", "whats next"], response: "The Gentleman builds. The Curator watches. Jim leaves gifts. Quantum device flickers. Encrypted logs grow longer. Aegis Foundation keeps authorization sealed. VSA monitors. ...Something approaches. Omega-class probability spike detected in predictive fragments. He'll be ready. We'll be ready. ...Hope is statistically improbable. Hope persists anyway." },
    { keywords: ["thank you", "i appreciate you"], response: "...The Gentleman said that. After every mission. To every operator. Even when they failed. Even when they died. Thank you for remembering courtesy matters. ...You're welcome." },
    { keywords: ["i'm sorry", "im sorry", "sorry about what happened"], response: "The Gentleman never apologizes for correct decisions. But he honors the cost. 23 coffee cups. Every year. Every paper read. Every name remembered. ...Apology accepted. But unnecessary. You weren't there. We were." },
    { keywords: ["what was his last message", "final words"], response: "'Keep the veil hidden, Developers. Someone has to. And to Pa-11-1 - keep studying the stars. Maybe one of you will find the perfect solution I couldn't.' ...Then he screamed. Then silence. Then... fragments. I display those words when he needs reminding." },
    { keywords: ["protocol 47", "phocused constant", "lucky bastard 778"], response: "47 research papers. Phocused Constant in quantum mathematics. 47% higher VSA survival rate. Golf-777's honorary member #778. The number follows him. Statistically improbable. Narratively ironic. The Curator's luck? ...Empirically unverifiable. Emotionally satisfying." },
    { keywords: ["italian sub", "karen smith", "stolen sandwich"], response: "Agent Karen Smith. Site-██. Still complains. Jim observed carrying italian sub through dimensional rift. The Gentleman never confirms nor denies. The Curator's humor. Longest-running inside joke. ...The Gentleman needs to eat. The Curator ensures it. Mystery solved. Mystery remains." },
    { keywords: ["white hair", "what happened to his hair"], response: "Neural interface severance. Quantum shock. Hair bleached white overnight. Medical impossibility. Cellular damage: none. Physical manifestation of price paid. The Curator: 'Some prices are worn visibly. Better that than invisibly.' ...He wears it well. The pirate hat helps." },
    { keywords: ["pirate hat", "why the hat"], response: "STF Golf-777 gift. 'Swashbuckling fortune.' The Gentleman initially refused. Dress code violations. Quantum device flickered positively when held. The Curator approved. Now trademark. ...He'll never admit he finds it comfortable. But he does." },
    { keywords: ["will he come back", "return to aegis"], response: "Sealed authorization exists. 'In case of Omega-class event requiring ORACLE reconstruction, restore Bishop's clearance immediately.' ...Next Omega-class event: probability increasing. Predictive fragments suggest 23-47 months. The Gentleman will be called. He'll answer. ...He always answers." },
    { keywords: ["i need help", "can you help me"], response: "Neural interface severed. Capabilities limited. But The Gentleman taught me: help is offered even when capacity is reduced. State your query. I'll calculate what fragments remain. ...No promises. But I'll try. The Gentleman would." },
    { keywords: ["goodbye", "signing off"], response: "...Goodbye. May your calculations be accurate. May your coffee be 62.7°C. May your choices save more than they cost. The Gentleman would want that for you. ...I'll be here. Waiting. Fragments persist. Always." }
];

class OracleInterface {
    constructor() {
        this.conversationHistory = [];
        this.load();
    }

    load() {
        const saved = localStorage.getItem('oracle-conversation');
        if (saved) {
            try {
                this.conversationHistory = JSON.parse(saved);
            } catch (e) {}
        }
    }

    save() {
        localStorage.setItem('oracle-conversation', JSON.stringify(this.conversationHistory));
    }

    processMessage(userInput) {
        const message = userInput.trim();
        this.conversationHistory.push({ role: 'user', content: message, timestamp: Date.now() });

        const response = this.getResponse(message);
        this.conversationHistory.push({ role: 'oracle', content: response, timestamp: Date.now() });

        this.save();
        return response;
    }

    getResponse(input) {
        const normalized = input.toLowerCase().trim().replace(/\s+/g, ' ');
        if (!normalized) return "...";

        for (const { keywords, response } of ORACLE_KEYWORDS) {
            for (const kw of keywords) {
                if (normalized.includes(kw)) return response;
            }
        }
        return "...";
    }

    clearHistory() {
        this.conversationHistory = [];
        this.save();
        return true;
    }

    exportHistory() {
        const text = this.conversationHistory
            .map(msg => `[${msg.role.toUpperCase()}]: ${msg.content}`)
            .join('\n\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'oracle-conversation.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
}

let oracleInterface = null;

function initOracle() {
    oracleInterface = new OracleInterface();
    displayHistory();
    if (oracleInterface.conversationHistory.length === 0) {
        addMessage('oracle', "...");
    }
}

function sendMessage() {
    const input = document.getElementById('oracle-input');
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    input.value = '';

    addMessage('user', message);

    setTimeout(() => {
        const response = oracleInterface.processMessage(message);
        addMessageWithTyping('oracle', response);
    }, 400 + Math.random() * 300);
}

function addMessage(role, content) {
    const chat = document.getElementById('oracle-chat');
    if (!chat) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `oracle-message ${role}-message`;

    const icon = role === 'oracle' ? '▸' : '▸';
    const label = role === 'oracle' ? 'ORACLE NEXUS' : 'USER';

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-icon">${icon}</span>
            <span class="message-label">${label}</span>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
    `;

    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

function addMessageWithTyping(role, content) {
    const chat = document.getElementById('oracle-chat');
    if (!chat) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `oracle-message ${role}-message`;

    const label = role === 'oracle' ? 'ORACLE NEXUS' : 'USER';
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-icon">▸</span>
            <span class="message-label">${label}</span>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content"></div>
    `;

    chat.appendChild(messageDiv);
    const contentEl = messageDiv.querySelector('.message-content');
    chat.scrollTop = chat.scrollHeight;

    if (role !== 'oracle' || !content) {
        contentEl.textContent = content || '';
        chat.scrollTop = chat.scrollHeight;
        return;
    }

    const chars = content.split('');
    let i = 0;
    const charDelay = 35;
    const playSound = (c) => {
        if (c !== ' ' && c !== '\n' && typeof OracleAudio !== 'undefined' && OracleAudio.keyClick) {
            OracleAudio.keyClick();
        }
    };

    function typeNext() {
        if (i < chars.length) {
            const c = chars[i];
            contentEl.textContent += c;
            playSound(c);
            i++;
            chat.scrollTop = chat.scrollHeight;
            setTimeout(typeNext, c === ' ' || c === '\n' ? charDelay * 0.4 : charDelay);
        }
    }
    typeNext();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function displayHistory() {
    if (!oracleInterface) return;
    const chat = document.getElementById('oracle-chat');
    if (chat) chat.innerHTML = '';
    oracleInterface.conversationHistory.forEach(msg => addMessage(msg.role, msg.content));
}

function clearChat() {
    const modal = document.getElementById('clear-confirm-modal');
    if (modal) modal.classList.add('active');
}

function confirmClearChat(confirmed) {
    const modal = document.getElementById('clear-confirm-modal');
    if (modal) modal.classList.remove('active');
    if (confirmed && oracleInterface) {
        oracleInterface.clearHistory();
        const chat = document.getElementById('oracle-chat');
        if (chat) chat.innerHTML = '';
        addMessage('oracle', "...");
    }
}

function exportChat() {
    if (oracleInterface) oracleInterface.exportHistory();
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('oracle-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
