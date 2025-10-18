/**
 * ============================================
 * ADVANCED TERMINAL COMMANDS
 * ============================================
 * Commandes personnalisées pour le terminal
 * avec easter eggs et interactions avancées
 * ============================================
 */
import { SOCIAL_LINKS, PERSONAL_INFO } from './personalInfo';
import { SKILLS } from './skillData';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Génère une barre de progression ASCII
 */
const progressBar = (percentage, length = 20) => {
  const filled = Math.floor((percentage / 100) * length);
  const empty = length - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
};

/**
 * Génère un arbre de fichiers ASCII
 */
const fileTree = () => {
  return `
portfolio/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── 📄 CustomCursor.jsx
│   │   │   ├── 📄 GlitchText.jsx
│   │   │   ├── 📄 Terminal.jsx
│   │   │   └── 📄 Particles3D.jsx
│   │   ├── 📁 sections/
│   │   │   ├── 📄 Hero.jsx
│   │   │   ├── 📄 About.jsx
│   │   │   └── 📄 Projects.jsx
│   │   └── 📁 layout/
│   ├── 📁 hooks/
│   ├── 📁 utils/
│   └── 📁 constants/
├── 📁 public/
└── 📄 package.json
  `;
};

/**
 * Animation de typing
 */
const typeWriter = async (text, callback, delay = 50) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      callback(text.slice(0, i + 1));
      i++;
    } else {
      clearInterval(interval);
    }
  }, delay);
};

// ============================================
// ASCII ART COLLECTION
// ============================================

const ASCII_ART = {
  logo: `
  __  __                            ___                      _ 
 |  \\/  |                          |_ _|___ _ __ ___   __ _| |
 | |\\/| | ___  _   _ ___ ___  __ _  | |/ __| '_ \` _ \\ / _\` | |
 | |  | |/ _ \\| | | / __/ __|/ _\` | | |\\__ \\ | | | | | (_| | |
 |_|  |_|\\___/ \\_,_|\\___\\___/\\__,_||___|___/_| |_| |_|\\__,_|_|
                                                               
  `,

  rocket: `
       ^
      / \\
     /___\\
    |=   =|
    |  🚀 |
    |     |
   /|##*##|\\
  / |##*##| \\
 /  |##*##|  \\
|  / ^ | ^ \\  |
| /  ( | )  \\ |
|/   ( | )   \\|
    ((   ))
   ((  :  ))
   ((  :  ))
    ((   ))
     (( ))
      ( )
       .
       .
  `,

  coffee: `
      ( (
       ) )
    ......
    |    |]
    \\    /
     \`--'
  ☕ Code & Coffee
  `,

  computer: `
    _______________
   |.------------.|
   ||            ||
   ||  > Code_   ||
   ||            ||
   ||____________||
   |______________|
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  `,

  matrix: `
01001101 01101111 01110101
01110011 01110011 01100001
00100000 01001001 01110011
01101101 01100001 01100101
01101100 00100000 00111010
00101001
  `,

  welcome: `
╔══════════════════════════════════════╗
║                                      ║
║   Bienvenue dans mon terminal! 🎮    ║
║                                      ║
║   Tapez 'help' pour commencer        ║
║                                      ║
╚══════════════════════════════════════╝
  `,
};

// ============================================
// COMMAND DEFINITIONS
// ============================================

export const TERMINAL_COMMANDS = {
  // ============================================
  // BASIC COMMANDS
  // ============================================
  
  help: {
    description: 'Liste toutes les commandes disponibles',
    output: `
╭──────────────────────────────────────────────────────────╮
│                  COMMANDES DISPONIBLES                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  📋 INFORMATIONS                                         │
│    about       - À propos de moi                         │
│    skills      - Mes compétences techniques              │
│    projects    - Mes projets                             │
│    contact     - Informations de contact                 │
│    experience  - Parcours professionnel                  │
│    education   - Formation académique                    │
│                                                          │
│  🎨 VISUEL                                               │
│    ascii       - ASCII art de mon nom                    │
│    logo        - Logo ASCII                              │
│    rocket      - Fusée ASCII                             │
│    coffee      - Café ASCII                              │
│    tree        - Arbre de fichiers du projet             │
│                                                          │
│  🎮 EASTER EGGS                                          │
│    matrix      - Mode Matrix                             │
│    konami      - Code Konami                             │
│    hack        - Mode hacker                             │
│    sudo        - Essaye voir... 😏                       │
│    42          - La réponse à la vie                     │
│    joke        - Une blague de dev                       │
│                                                          │
│  🛠️ SYSTÈME                                              │
│    clear       - Efface le terminal                      │
│    history     - Historique des commandes                │
│    date        - Date et heure actuelles                 │
│    weather     - Météo à Niamey                          │
│    whoami      - Qui suis-je?                            │
│                                                          │
╰──────────────────────────────────────────────────────────╯

💡 Astuce: Utilise les flèches ↑↓ pour naviguer l'historique
    `,
  },

  about: {
    description: 'Informations à propos de moi',
    output: () => `
╔══════════════════════════════════════════════════════════╗
║                     À PROPOS DE MOI                      ║
╚══════════════════════════════════════════════════════════╝

👤 ${PERSONAL_INFO.name}
💼 ${PERSONAL_INFO.title}
📍 ${PERSONAL_INFO.location}

${PERSONAL_INFO.bio}

${PERSONAL_INFO.pitch}

🎯 Objectif: Créer des solutions numériques qui ont un impact réel
🌟 Passion: Code propre, performance et UX innovante
    `,
  },

  skills: {
    description: 'Mes compétences techniques',
    output: () => {
      const allSkills = Object.values(SKILLS).flat();
      let output = `
╔══════════════════════════════════════════════════════════╗
║                  COMPÉTENCES TECHNIQUES                  ║
╚══════════════════════════════════════════════════════════╝

`;
      
      allSkills.forEach(skill => {
        const bar = progressBar(skill.level, 20);
        output += `${skill.name.padEnd(20)} ${bar} ${skill.level}%\n`;
      });

      output += `\n💡 En constante évolution et apprentissage!`;
      
      return output;
    },
  },

  contact: {
    description: 'Informations de contact',
    output: () => `
╔══════════════════════════════════════════════════════════╗
║                  INFORMATIONS DE CONTACT                 ║
╚══════════════════════════════════════════════════════════╝

📧 Email:    ${PERSONAL_INFO.email}
📱 Téléphone: ${PERSONAL_INFO.phone}

🔗 RÉSEAUX SOCIAUX:
   🐙 GitHub:   ${SOCIAL_LINKS.github}
   💼 LinkedIn: ${SOCIAL_LINKS.linkedin}
   💬 WhatsApp: ${SOCIAL_LINKS.whatsapp}

💡 N'hésite pas à me contacter pour tout projet ou collaboration!
    `,
  },

  // ============================================
  // ASCII ART COMMANDS
  // ============================================

  ascii: {
    description: 'ASCII art de mon nom',
    output: ASCII_ART.logo,
  },

  logo: {
    description: 'Logo ASCII',
    output: ASCII_ART.logo,
  },

  rocket: {
    description: 'Fusée ASCII',
    output: ASCII_ART.rocket + '\n\n🚀 Vers l\'infini et au-delà!',
  },

  coffee: {
    description: 'Café ASCII',
    output: ASCII_ART.coffee,
  },

  tree: {
    description: 'Arbre de fichiers du projet',
    output: fileTree(),
  },

  // ============================================
  // EASTER EGGS
  // ============================================

  matrix: {
    description: 'Mode Matrix',
    output: () => {
      const chars = '01アイウエオカキクケコサシスセソタチツテト';
      let output = ASCII_ART.matrix + '\n\n';
      
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 60; j++) {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
        output += '\n';
      }
      
      output += '\n🟢 Welcome to the Matrix, Neo...\n';
      
      return output;
    },
  },

  konami: {
    description: 'Code Konami',
    output: `
╔══════════════════════════════════════════════════════════╗
║                      KONAMI CODE                         ║
╚══════════════════════════════════════════════════════════╝

🎮 Le légendaire Konami Code:

   ↑ ↑ ↓ ↓ ← → ← → B A

🏆 Tu as débloqué:
   ✨ Mode God activé
   ⚡ +30 vies
   💰 Munitions infinies
   🎯 Compétences niveau MAX

😄 Bravo! Tu es un vrai gamer des années 80!
    `,
  },

  hack: {
    description: 'Mode hacker',
    output: `
[████████████████████████████] 100%

INITIALIZING HACK SEQUENCE...
> Connecting to mainframe...        [OK]
> Bypassing firewall...              [OK]
> Decrypting passwords...            [OK]
> Accessing root privileges...       [OK]
> Downloading secret files...        [OK]

⚠️ ALERT: FBI is tracking your IP!
Just kidding 😄

🎭 "I'm in" - Every hacker in movies

💡 Fun fact: Le vrai hacking, c'est surtout lire la doc!
    `,
  },

  sudo: {
    description: 'Commande sudo',
    output: `
[sudo] password for ${PERSONAL_INFO.name}: ••••••••

❌ Sorry, try again.
[sudo] password for ${PERSONAL_INFO.name}: ••••••••

❌ Sorry, try again.
[sudo] password for ${PERSONAL_INFO.name}: ••••••••

❌ sudo: 3 incorrect password attempts

🤣 Belle tentative! Mais tu n'as pas les permissions root ici.

💡 Citation du jour:
   "With great power comes great responsibility"
   - Uncle Ben (et sudo users)
    `,
  },

  42: {
    description: 'La réponse à la vie',
    output: `
╔══════════════════════════════════════════════════════════╗
║         LA RÉPONSE À LA GRANDE QUESTION              ║
║       SUR LA VIE, L'UNIVERS ET LE RESTE              ║
╚══════════════════════════════════════════════════════════╝

                        42

📚 "The Hitchhiker's Guide to the Galaxy" - Douglas Adams

🤔 Maintenant, quelle était la question déjà?

💭 Deep Thought a mis 7.5 millions d'années à calculer ça.
   Toi, tu l'as eu en 2ms. Merci JavaScript! ⚡
    `,
  },

  joke: {
    description: 'Blague de développeur',
    output: () => {
      const jokes = [
        `
❓ Pourquoi les développeurs préfèrent le dark mode?

💡 Parce que la lumière attire les bugs! 🐛
        `,
        `
❓ Comment un développeur sort-il de la douche?

💡 Il lit les instructions sur le shampoing:
   "Appliquer, rincer, répéter"
   Et il y est toujours... (boucle infinie) 🔁
        `,
        `
❓ Combien de développeurs faut-il pour changer une ampoule?

💡 Aucun. C'est un problème matériel! 💡
        `,
        `
❓ Quelle est la différence entre Java et JavaScript?

💡 La même qu'entre Car et Carpet! 🚗
        `,
        `
💬 "Ça marche sur ma machine" 

🐳 Docker entre dans le chat...
        `,
      ];

      return jokes[Math.floor(Math.random() * jokes.length)];
    },
  },

  // ============================================
  // SYSTEM COMMANDS
  // ============================================

  whoami: {
    description: 'Qui suis-je?',
    output: () => `
${PERSONAL_INFO.name}@portfolio:~$ whoami

🧑‍💻 ${PERSONAL_INFO.name}
📍 Logged in from: ${PERSONAL_INFO.location}
⏰ Session time: ${new Date().toLocaleTimeString('fr-FR')}
🎯 Role: ${PERSONAL_INFO.title}
💻 Shell: bash/terminal.js v2.0

💡 "Je suis celui qui code!" - Breaking Dev 😎
    `,
  },

  date: {
    description: 'Date et heure actuelles',
    output: () => {
      const now = new Date();
      return `
📅 ${now.toLocaleDateString('fr-FR', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

⏰ ${now.toLocaleTimeString('fr-FR')}

🌍 Timezone: Africa/Niamey (GMT+1)
      `;
    },
  },

  weather: {
    description: 'Météo à Niamey',
    output: () => {
      // Simulation météo (tu peux intégrer une vraie API)
      const conditions = ['☀️ Ensoleillé', '⛅ Nuageux', '🌤️ Partiellement nuageux'];
      const temp = Math.floor(Math.random() * (40 - 25) + 25);
      
      return `
🌍 Météo à Niamey, Niger

${conditions[Math.floor(Math.random() * conditions.length)]}
🌡️ ${temp}°C

💡 Parfait pour coder avec la clim! ❄️
      `;
    },
  },

  experience: {
    description: 'Parcours professionnel',
    output: `
╔══════════════════════════════════════════════════════════╗
║               PARCOURS PROFESSIONNEL                     ║
╚══════════════════════════════════════════════════════════╝

🚀 2025 - Aujourd'hui
   UI Designer & Front-end Dev - DevByte Community
   → Projets Open Source
   → Collaboration équipe internationale

💼 Avr - Juin 2025
   Stagiaire - Novatech Niger
   → Application de gestion restaurant (React + Django)
   → Gestion des tickets numériques

🏢 Juil - Sept 2024
   Stagiaire - Nigelec
   → Projets électroniques et automatisation

🎯 Objectif: Continuer à grandir et apprendre chaque jour!
    `,
  },

  education: {
    description: 'Formation académique',
    output: `
╔══════════════════════════════════════════════════════════╗
║                FORMATION ACADÉMIQUE                      ║
╚══════════════════════════════════════════════════════════╝

🎓 2022 - 2025
   Licence Génie Logiciel - EMIG
   → Développement web & mobile
   → Ingénierie logicielle
   → IA & Machine Learning

🏅 CERTIFICATIONS
   ✓ Oracle Cloud AI Foundations (2025)
   ✓ Python Programming - Saylor (2025)
   ✓ Computer Science I - Saylor (2025)
   ✓ IEEE Student Member (2024)

📚 En apprentissage continu sur:
   → Design Patterns
   → Clean Architecture
   → DevOps & CI/CD
    `,
  },
};

export default TERMINAL_COMMANDS;