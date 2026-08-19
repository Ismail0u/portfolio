// ============================================
// VALIDATION UTILS
// ============================================
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

export function isValidEmail(value = '') {
  return EMAIL_RE.test(String(value).trim());
}

export function isValidPhone(value = '') {
  return PHONE_RE.test(String(value).trim());
}
