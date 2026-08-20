// ============================================
// LANG UTILS
// ============================================
/**
 * Sélectionne le champ localisé d'un objet de contenu bilingue.
 * Convention du projet : `{fieldFr, fieldEn}` -> pickLang(obj, 'field', lang)
 */
export function pickLang(obj, field, lang) {
  if (!obj) return '';
  const suffix = lang?.startsWith('en') ? 'En' : 'Fr';
  return obj[`${field}${suffix}`] ?? obj[`${field}Fr`] ?? '';
}
