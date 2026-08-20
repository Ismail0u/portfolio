// ============================================
// ANALYTICS UTILS
// ============================================
// Wrapper léger autour de gtag/plausible — no-op si aucun tracker n'est
// chargé sur la page (évite un crash en dev ou en local).
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: params });
    }
  } catch {
    // tracking ne doit jamais casser l'UX
  }
}

export function trackPageView(path) {
  trackEvent('page_view', { page_path: path });
}
