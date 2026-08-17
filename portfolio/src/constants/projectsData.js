// ============================================
// PROJECTS DATA (bilingual: *Fr / *En fields)
// ============================================
export const PROJECTS = [
  {
    id: 1,
    slug: 'emig-resto',
    title: 'EMIG Resto',
    descriptionFr:
      "Digitalisation complète d'un restaurant universitaire : admin web (React), app mobile client (React Native), backend Django.",
    descriptionEn:
      'Full digitalization of a university restaurant: web admin (React), mobile client app (React Native), Django backend.',
    github: 'https://github.com/Ismail0u/EMIG_Resto',
    demo: '',
    tech: ['React', 'Django', 'React Native', 'PostgreSQL'],
    category: 'fullstack',
    year: '2025',
    featured: true,
    caseStudy: {
      problemFr:
        "Le restaurant universitaire gérait ses commandes et son stock sur papier : files d'attente longues, erreurs de comptage, aucune visibilité en temps réel pour l'administration.",
      problemEn:
        "The university restaurant managed orders and stock on paper: long queues, counting errors, no real-time visibility for the administration.",
      solutionFr:
        "Une plateforme à trois composants : une app mobile React Native pour les étudiants (commande et paiement), une interface web React pour l'administration (suivi des commandes, gestion des stocks), et une API Django centralisant la logique métier.",
      solutionEn:
        "A three-part platform: a React Native mobile app for students (ordering and payment), a React web interface for administration (order tracking, stock management), and a Django API centralizing the business logic.",
      roleFr:
        "Développeur full-stack — conception de l'architecture, développement du backend Django et de l'app mobile, intégration avec l'équipe web.",
      roleEn:
        'Full-stack developer — architecture design, Django backend and mobile app development, integration with the web team.',
      architectureFr: [
        'API REST Django + Django REST Framework, base PostgreSQL',
        'App mobile React Native (Expo) consommant l\'API',
        'Dashboard admin React pour la gestion des commandes et stocks',
        'Authentification par token, rôles séparés étudiant / staff',
      ],
      architectureEn: [
        'Django REST Framework API, PostgreSQL database',
        'React Native (Expo) mobile app consuming the API',
        'React admin dashboard for order and stock management',
        'Token-based authentication, separate student / staff roles',
      ],
      challengesFr: [
        'Synchroniser l\'état des stocks en temps quasi réel entre plusieurs points de commande simultanés',
        'Concevoir un flux de commande utilisable par des étudiants peu familiers avec ce type d\'app',
      ],
      challengesEn: [
        'Keeping stock state in near real-time sync across multiple simultaneous order points',
        'Designing an order flow usable by students unfamiliar with this kind of app',
      ],
      learningsFr: [
        'Importance de modéliser les états de commande (en attente / en préparation / prête) dès la conception plutôt que de les ajouter après coup',
        'Valeur d\'un découpage clair entre API et clients pour permettre le développement parallèle mobile/web',
      ],
      learningsEn: [
        'The importance of modeling order states (pending / preparing / ready) from the start rather than bolting them on later',
        'The value of a clean API/client split to enable parallel mobile and web development',
      ],
      resultsFr:
        "Projet réalisé dans le cadre d'un stage chez Novatech Niger ; déployé en usage interne pour le restaurant universitaire.",
      resultsEn:
        'Built during an internship at Novatech Niger; deployed for internal use at the university restaurant.',
    },
  },
  {
    id: 2,
    slug: 'facelogin',
    title: 'FaceLogin',
    descriptionFr:
      "Authentification par reconnaissance faciale — DeepFace pour l'analyse biométrique, Streamlit pour l'interface, webcam temps réel.",
    descriptionEn:
      'Facial recognition authentication — DeepFace for biometric analysis, Streamlit for the interface, real-time webcam.',
    github: 'https://github.com/Ismail0u/FaceLogin',
    demo: 'https://facelogin-8td8.onrender.com/',
    tech: ['Python', 'DeepFace', 'Streamlit', 'OpenCV'],
    category: 'ai',
    year: '2024',
    featured: true,
    caseStudy: {
      problemFr:
        "Explorer une alternative à l'authentification par mot de passe, plus rapide et plus difficile à usurper pour un contexte d'accès local.",
      problemEn:
        'Exploring an alternative to password authentication — faster and harder to spoof — for a local access context.',
      solutionFr:
        "Une application Streamlit qui capture le flux webcam, extrait les embeddings faciaux via DeepFace, et les compare à une base de visages enregistrés pour valider ou refuser l'accès.",
      solutionEn:
        'A Streamlit app that captures the webcam feed, extracts facial embeddings via DeepFace, and compares them against a registered face database to grant or deny access.',
      roleFr: 'Développeur solo — conception, implémentation et déploiement.',
      roleEn: 'Solo developer — design, implementation and deployment.',
      architectureFr: [
        'DeepFace pour l\'extraction et la comparaison d\'embeddings faciaux',
        'OpenCV pour la capture et le pré-traitement du flux vidéo',
        'Interface Streamlit pour l\'enregistrement des utilisateurs et la démo live',
        'Déploiement sur Render',
      ],
      architectureEn: [
        'DeepFace for facial embedding extraction and comparison',
        'OpenCV for video capture and pre-processing',
        'Streamlit interface for user enrollment and live demo',
        'Deployed on Render',
      ],
      challengesFr: [
        'Réduire le temps de réponse de la reconnaissance pour rester utilisable en usage interactif (pas de traitement batch)',
        'Gérer les faux positifs/négatifs liés aux conditions de luminosité variables',
      ],
      challengesEn: [
        'Keeping recognition latency low enough for interactive use (no batch processing)',
        'Handling false positives/negatives caused by variable lighting conditions',
      ],
      learningsFr: [
        'Les modèles de reconnaissance faciale pré-entraînés (DeepFace) permettent d\'obtenir un prototype fonctionnel rapidement, mais la robustesse en conditions réelles demande un vrai travail de calibration',
        'Streamlit est efficace pour prototyper une démo IA, moins adapté pour une UX de production',
      ],
      learningsEn: [
        'Pre-trained facial recognition models (DeepFace) get you to a working prototype fast, but real-world robustness takes real calibration work',
        'Streamlit is great for prototyping an AI demo, less suited for production-grade UX',
      ],
      resultsFr:
        'Démo fonctionnelle déployée publiquement ; projet utilisé comme preuve de concept, pas encore en production.',
      resultsEn:
        'Working demo deployed publicly; used as a proof of concept, not yet in production.',
    },
  },
  {
    id: 3,
    slug: 'kayanabinchi',
    title: 'Kayanabinchi',
    descriptionFr:
      "Gestion de stocks et de réservations de plats pour un établissement scolaire, avec dashboard admin.",
    descriptionEn:
      'Stock and meal-reservation management for a school, with an admin dashboard.',
    github: 'https://github.com/Ismail0u/projet_industrielEMIG',
    demo: '',
    tech: ['React', 'Django', 'MySQL'],
    category: 'fullstack',
    year: '2024',
    featured: false,
  },
  {
    id: 4,
    slug: 'ledger-pro',
    title: 'Ledger Pro',
    descriptionFr:
      "PWA de gestion commerciale 100% offline (IndexedDB) avec OCR (Tesseract.js) pour digitaliser les cahiers de commerce.",
    descriptionEn:
      '100% offline business management PWA (IndexedDB) with OCR (Tesseract.js) to digitize paper ledgers.',
    github: 'https://github.com/Ismail0u/ma_boutique',
    demo: 'https://ma-boutique-delta.vercel.app/',
    tech: ['React', 'TypeScript', 'IndexedDB', 'Tesseract.js'],
    category: 'frontend',
    year: '2025',
    featured: true,
    caseStudy: {
      problemFr:
        "Beaucoup de petits commerces tiennent encore leur comptabilité sur des cahiers papier. Le défi : digitaliser ce flux sans dépendre d'une connexion internet stable, peu fiable dans ce contexte.",
      problemEn:
        "Many small shops still keep their books on paper. The challenge: digitize that workflow without relying on a stable internet connection, which is unreliable in this context.",
      solutionFr:
        "Une PWA fonctionnant 100% en local via IndexedDB, avec une fonctionnalité d'OCR pour importer directement les écritures depuis une photo de cahier existant.",
      solutionEn:
        'A PWA running 100% locally via IndexedDB, with an OCR feature to import entries directly from a photo of an existing ledger.',
      roleFr: 'Développeur solo — conception produit, architecture offline-first, implémentation.',
      roleEn: 'Solo developer — product design, offline-first architecture, implementation.',
      architectureFr: [
        'React + TypeScript, state géré côté client',
        'IndexedDB comme source de vérité locale (pas de backend distant)',
        'Tesseract.js pour l\'OCR côté client, sans envoi d\'image à un serveur',
        'Progressive Web App installable, fonctionnement hors-ligne complet',
      ],
      architectureEn: [
        'React + TypeScript, client-side state management',
        'IndexedDB as the local source of truth (no remote backend)',
        'Tesseract.js for client-side OCR, no image ever sent to a server',
        'Installable Progressive Web App, fully functional offline',
      ],
      challengesFr: [
        'Concevoir un modèle de données cohérent sans backend pour arbitrer les conflits (un seul appareil = plus simple, mais impose des choix sur la synchronisation future)',
        'Fiabiliser l\'OCR sur des écritures manuscrites variées, avec une précision hétérogène selon la qualité de l\'écriture',
      ],
      challengesEn: [
        'Designing a coherent data model with no backend to arbitrate conflicts (single-device use simplifies this, but forces decisions about future sync)',
        'Making OCR reliable across varied handwriting, with accuracy that depends heavily on legibility',
      ],
      learningsFr: [
        'Une architecture offline-first change fondamentalement la façon de penser l\'état de l\'application — tout doit être conçu pour fonctionner sans réseau par défaut',
        'L\'OCR côté client via Tesseract.js évite les coûts et la latence d\'un service cloud, au prix d\'une précision plus limitée sur écriture manuscrite',
      ],
      learningsEn: [
        'An offline-first architecture fundamentally changes how you think about app state — everything must be designed to work without a network by default',
        'Client-side OCR via Tesseract.js avoids the cost and latency of a cloud service, at the cost of lower accuracy on handwriting',
      ],
      resultsFr:
        'Application déployée et accessible publiquement sur Vercel ; utilisable de bout en bout sans connexion.',
      resultsEn:
        'Deployed and publicly accessible on Vercel; fully usable end-to-end without a connection.',
    },
  },
  {
    id: 5,
    slug: 'nibot',
    title: 'NiBot',
    descriptionFr:
      "Chatbot éducatif sur le Niger — traitement NLP avec NLTK, synthèse vocale, base de connaissances extensible.",
    descriptionEn:
      'Educational chatbot about Niger — NLP processing with NLTK, text-to-speech, extensible knowledge base.',
    github: 'https://github.com/Ismail0u/miniChatBot_python',
    demo: 'https://minichatbot-python.onrender.com/',
    tech: ['Python', 'NLTK', 'Streamlit'],
    category: 'ai',
    year: '2024',
    featured: true,
  },
];

// Accent de couleur assigné par catégorie — cohérent sur tout le site
export const CATEGORY_ACCENT = {
  fullstack: 'accent',
  ai: 'accent2',
  frontend: 'accent',
};

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
export const getFeaturedProjects = (limit) => {
  const featured = PROJECTS.filter((p) => p.featured);
  return limit ? featured.slice(0, limit) : featured;
};
