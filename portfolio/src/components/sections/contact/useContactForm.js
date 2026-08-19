import { useState } from 'react';
import { isValidEmail, isValidPhone, trackEvent } from '../../../utils';

/**
 * Logique du formulaire de contact isolée de la présentation :
 * état, validation, anti-spam (honeypot + throttle), sanitisation et
 * soumission vers FormSubmit. Le composant Contact.jsx ne fait que
 * consommer ce hook et afficher le résultat.
 */
export const MAX_LENGTHS = { name: 100, email: 254, phone: 30, subject: 150, message: 1200 };

function sanitizeInput(s = '') {
  return String(s || '').replace(/(\r|\n|\r\n)/g, ' ').replace(/[<>]/g, '').trim();
}
function limitField(s = '', max = 200) {
  return String(s || '').slice(0, max);
}
function canSubmit(throttleMs = 15000) {
  try {
    const key = 'contact_last_submit';
    const last = Number(localStorage.getItem(key) || 0);
    const now = Date.now();
    if (now - last < throttleMs) return false;
    localStorage.setItem(key, String(now));
    return true;
  } catch {
    return true;
  }
}

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '', website: '' };

export function useContactForm(t) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errNameRequired');
    else if (formData.name.trim().length < 2) newErrors.name = t('contact.errNameLength');
    if (!formData.email.trim()) newErrors.email = t('contact.errEmailRequired');
    else if (!isValidEmail(formData.email)) newErrors.email = t('contact.errEmailInvalid');
    if (formData.phone && !isValidPhone(formData.phone)) newErrors.phone = t('contact.errPhoneInvalid');
    if (!formData.message.trim()) newErrors.message = t('contact.errMessageRequired');
    else if (formData.message.trim().length < 10) newErrors.message = t('contact.errMessageLength');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return; // honeypot
    if (!canSubmit(15000)) {
      setErrors({ submit: t('contact.errThrottle') });
      return;
    }
    if (!validate()) return;

    setIsSubmitting(true);
    trackEvent('contact_submit', { has_phone: !!formData.phone, has_subject: !!formData.subject });

    const payloadObj = {
      name: limitField(sanitizeInput(formData.name), MAX_LENGTHS.name),
      email: limitField(sanitizeInput(formData.email), MAX_LENGTHS.email),
      phone: limitField(sanitizeInput(formData.phone), MAX_LENGTHS.phone),
      subject: limitField(sanitizeInput(formData.subject), MAX_LENGTHS.subject),
      message: limitField(sanitizeInput(formData.message), MAX_LENGTHS.message),
    };

    try {
      const endpoint = 'https://formsubmit.co/moussaisma05@gmail.com';
      const payload = new URLSearchParams();
      Object.entries(payloadObj).forEach(([k, v]) => payload.append(k, v));
      payload.append('_subject', 'Nouveau message depuis le portfolio');
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: payload.toString(),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData(EMPTY_FORM);
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrors({ submit: t('contact.errSubmitFailed') });
      }
    } catch {
      setErrors({ submit: t('contact.errNetwork') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit };
}
