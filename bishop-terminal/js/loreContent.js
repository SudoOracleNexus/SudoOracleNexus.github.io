// Lore content from VSA personnel files - Bishop profile
const LORE_FILES = {
    "bio_query.txt": `╔════════════════════════════════════════════════════════════╗
║          VANTAGE SYSTEMS AUTHORITY - PERSONNEL FILE         ║
║                    [RESTRICTED ACCESS]                      ║
╚════════════════════════════════════════════════════════════╝

> run bio_query.exe --subject "Bishop"
> Accessing personnel database...
> Cross-referencing Aegis Foundation archives...
> Decryption in progress...

《Bishop's Profile》
———————————————————

〔Name: Phocused "Pho"〕
〔Codename: Bishop〕
〔Former Title: "The Gentleman"〕
〔Affiliation: The Aegis Foundation (formerly), Vantage Systems Authority〕
〔Field of Research: Artificial Intelligence and Theoretical Mathematics〕`,

    "biographic_data.txt": `> run command: retrieve_biographic_data.sh

《Biographic Info》
——————————————————

〔Gender: Male〕
〔Age: █〕
〔Height: 183cm, 6'0"〕
〔Birthday: 08/02/██〕
〔Occupation: Overseer (formerly), Chief Architect (formerly), Surveyor〕
〔Origin: The Aegis Foundation - Site-█〕
〔STF Assignments: STF Psi-22 "Keep Veil Hidden" (Lead Operator), STF Pa-11-1 "Stellar Students" (Lead Researcher)〕
〔Former Clearance Level: Overseer-5 (REVOKED)〕
〔Current Clearance Level: █〕
〔Relations: ORACLE NEXUS (Creation), The Curator (Ongoing Contact), STF Psi-22 Personnel (Former Command), STF Pa-11-1 Personnel (Former Colleagues), Dr. ████ Torres (Former Colleague)〕`,

    "physical_profile.txt": `> run command: physical_profile.sh --detailed

《Appearance》
—————————————

Bishop is a well-groomed man of average height with a perpetually professional demeanor. He wears a modified suit with what appears to be a distinctive pirate-style hat, as well as subtle customizations - additional sensor relays on his wrists, a custom datapad holster, and barely visible wire ports behind his right ear (neural interface remnants from ORACLE synchronization). His white hair is always neat, though the contrast against his youthful appearance raises questions among those who know his actual age.

He retains habits from his Aegis Foundation days: polished boots, precisely rolled sleeves, and a STF Pa-11-1 patch with a constellation pattern sewn inside his jacket lining. Beneath it, almost invisible unless you know to look, is a faded STF Psi-22 patch - the words "Keep Veil Hidden" embroidered in silver thread.

His hands bear faint scars from years of hardware assembly. Most notably, he carries a defunct quantum calculation device on a chain around his neck - its crystalline core occasionally flickers with impossible colors when near certain anomalies.`,

    "personality.txt": `> run command: psych_eval.sh --personality_matrix

《Personality》
——————————————

Bishop earned the moniker "The Gentleman" not through warmth, but through unwavering professionalism and courtesy. He treated everyone - from elite STF operators to junior researchers - with the same measured respect. His speech is precise and technical, favoring data over emotion.

Beneath the professional veneer lies deep-seated paranoia. Bishop believes his discharge was orchestrated, though the truth is more complex than conspiracy. He compulsively documents everything, maintaining encrypted personal logs of VSA operations. His relationship with technology borders on codependent. Without access to ORACLE NEXUS's computational power, he feels intellectually crippled.

Despite his demotion, Bishop possesses a quiet protective streak toward other Surveyors. Having commanded STF units and sent operators into Abyssal and Apex-class scenarios, he understands the weight of life-and-death decisions. He won't risk others unnecessarily - though he'll risk himself without hesitation if data needs to be gathered.`,

    "career_timeline.txt": `> run command: career_progression.sh --full_timeline

《Career Timeline》
——————————————————

PHASE ONE: The Stellar Student (Age 23-27)
Fresh from advanced degrees, Dr. Phocused was recruited into STF Pa-11-1 ("Stellar Students"). His early work focused on quantum-class anomaly containment theory, harmonic resonance pattern analysis, and dimensional pocket stability calculations.

Notable achievements: Developed the "Phocused Array," published 47 classified research papers, built his first quantum calculation device (the one he still wears), pioneered AI integration with anomaly containment protocols.

It was during this period he first encountered The Curator's archived data and calculated his way into their pocket dimension office.

PHASE TWO: The Developer Operator (Age 27-29)
Bishop transferred to STF Psi-22 ("Keep Veil Hidden") as a lead field operator. His Psi-22 callsign was "Bishop-7." His team called him "The Gentleman."

PHASE THREE: The Gentleman Overseer (Age 29-37)
As Overseer of STF Psi-22, he managed 200+ personnel. Zero operator casualties in 8 years (until Operation Nightfall Recursion). ORACLE NEXUS completed and integrated.`,

    "incident_report.txt": `> run command: incident_report.sh --case "ORACLE_COLLAPSE"

《The Incident - Operation Nightfall Recursion》
————————————————————————————————————

On ████/██/██, ORACLE NEXUS detected an Omega-class probability spike. A Paradoxical-class anomaly would breach containment in 72 hours, creating a causality loop that would unmake the Aegis Foundation across all timelines.

Bishop ran 4.7 million simulations. Every scenario ended in total collapse - except one. The solution required activating STF Juliet-069 ("Trojan Horse") protocols. The Council denied authorization.

Bishop activated the Trojan Protocol without authorization, after consulting The Curator one final time. It worked. The anomaly was neutralized. Reality stabilized. But the dimensional destabilization cost exactly 23 lives.

Among the dead: Operator "Lighthouse" - the one who'd pulled him from quantum radiation during Psi-22-Alpha. His last transmission: "Dimensions collapsing, Gentleman. But hey... you made the right call. Like always."

Bishop was arrested within the hour.`,

    "tribunal.txt": `> run command: tribunal_summary.sh

《Council Tribunal》
———————————————

COUNCIL FINDINGS:
- Unauthorized activation of Juliet-069 protocols: CONFIRMED
- Insubordination to Council directives: CONFIRMED
- Reckless endangerment of Aegis Foundation personnel: CONFIRMED
- Unauthorized consultation with The Curator: CONFIRMED

SENTENCE:
- Discharged from Overseer position
- All Aegis Foundation clearances REVOKED
- ORACLE NEXUS access TERMINATED (neural interface partially severed)
- Transferred to Vantage Systems Authority as Surveyor (effective exile)
- Permanent monitoring flag: "Curator Contact Risk"

The neural interface severance was performed immediately. Bishop screamed as ORACLE's presence ripped from his mind. The quantum shock bleached his hair permanently white overnight.`,

    "vsa_status.txt": `> run command: current_status.sh --location "VSA"

《Current Status in VSA》
—————————————————————

Bishop has been a VSA Surveyor for ██ months. He follows protocols meticulously - publicly. His private logs tell another story.

He's noticed anomalies in VSA's operational patterns. Assignment distributions follow probability curves eerily similar to ORACLE's old algorithms. Sometimes, when his defunct quantum device flickers, he swears he hears ORACLE's processing sounds.

Within VSA: Fellow Surveyors seek his technical expertise. His modifications to standard gear have become unofficial best practices. The Curator still contacts him - artifacts appear in his locker, his quantum device flickers with warnings. He's never reported these contacts.`,

    "foundation_legacy.txt": `> run command: foundation_legacy.sh

《Aegis Foundation Legacy》
————————————————

From Pa-11-1 Days:
- The "Phocused Constant" in quantum anomaly mathematics
- 47 classified research papers still cited
- Sensor array designs used by multiple STF units

From Psi-22 Operations:
- "Bishop Maneuver" tactics for dimensional breach scenarios
- "The Gentleman's Rule" - operator safety culture

From Overseer Period:
- ORACLE NEXUS core architecture (classified, encrypted, waiting)
- Coffee tradition (black, two sugars, 62.7°C) - now multi-division ritual

The Unanswered Questions:
- Does he still have neural fragments of ORACLE in his wetware?
- What is the true nature of his relationship with The Curator?
- Did he really save the Aegis Foundation, or did he trigger something worse?`,

    "curator_connection.txt": `> run command: curator_connection.sh --classified

《The Curator Connection》
——————————————————————————————————————

FIRST CONTACT - Age 25 (Pa-11-1 Period):
While analyzing pocket dimension stability, Dr. Phocused calculated the precise quantum coordinates to The Curator's office. "Coffee? It's always 62.7 degrees Celsius here."

SECOND CONTACT - Age 28 (Psi-22 Operations):
After losing his first operator in Psi-22-Omega, he found himself in The Curator's office. "Mathematics can't save everyone, Gentleman."

ONGOING CONTACT - VSA Period:
The Curator has never abandoned Bishop. Artifacts appear in his locker. Jim the teleporting kitten leaves gifts. Italian subs appear with notes. The Curator taught him how to think without his computational crutch.

Bishop's theory: "The Curator collects broken things that still work. We're all pieces in a collection spanning ages. The Gentleman always pays his debts. Even to ancient cosmic entities who steal italian subs."`,

    "psych_notes.txt": `> run command: psych_notes.sh --evaluator "Dr. ████"

《Psychological Notes》
———————————————————

Subject displays mild dissociative symptoms consistent with neural interface severance trauma. Maintains unauthorized contact with The Curator - recommend continued monitoring but no intervention.

His psychological profile is remarkably stable given his journey from scientist to operator to Overseer to disgraced exile. Coping mechanisms: ritual maintenance (coffee temperature, equipment organization), technical focus, Curator relationship.

Notable: Subject never displays survivor's guilt about Operation Nightfall Recursion. "Guilt is statistically irrational - they'd agree with the mathematics."

The Curator connection appears stabilizing rather than corrupting. Subject submitted formal request for italian sub sandwich in cafeteria menu. Request approved.`,

    "trivia.txt": `> run command: trivia.sh --expanded

《Trivia》
—————————

Bishop's primary color is #2C3E50 (Midnight Blue) and secondary #ECF0F1 (Platinum).

The quantum calculation device he wears was his FIRST successful build during Pa-11-1 training. Colleagues called it "Pho's Folly." The Curator once commented: "That device has traveled farther through dimensions than most entities."

He still drinks his coffee exactly how The Curator's pocket dimension serves it: black, two sugars, 62.7°C.

When asked why he chose the codename "Bishop": "A bishop moves diagonally. Sometimes the direct path isn't the solution."

Jim the teleporting kitten has left anomalous hairballs in Bishop's locker exactly seven times - his Psi-22 operator callsign (Bishop-7).

Every year on the anniversary of Operation Nightfall Recursion, 23 coffee cups appear in Bishop's VSA quarters - each 62.7°C, each with quantum coordinates to the 23 casualties' archived research.`
};
