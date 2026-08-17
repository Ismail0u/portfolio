// ============================================
// NOTES TECHNIQUES
// ============================================
// Format inspiré de "Design Thoughts" — un article = un problème réel,
// une décision d'architecture, un résultat mesuré. À enrichir au fil des projets.
export const TECH_NOTES = [
  {
    id: 'nibot-nlp',
    titleFr: 'Construire un chatbot NLP en français avec des ressources limitées',
    titleEn: 'Building an NLP chatbot in French with limited resources',
    excerptFr:
      "Les modèles généralistes répondent mal aux questions locales (Niger, langues, culture). Retour sur la conception de NiBot : NLTK pour le NLP, base de connaissances JSON maison, synthèse vocale — et les arbitrages faits pour tenir un temps de réponse < 2s sans infrastructure lourde.",
    excerptEn:
      "General-purpose models handle local questions poorly (Niger, languages, culture). A look back at building NiBot: NLTK for NLP, a custom JSON knowledge base, text-to-speech — and the trade-offs made to keep response time under 2s without heavy infrastructure.",
    date: 'Aug 2024',
    href: 'https://github.com/Ismail0u/miniChatBot_python',
  },
];
