import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants/personalInfo';
import { isValidEmail, isValidPhone, trackEvent } from '../../utils';
import { SectionHeading } from './Hero';

/* --- helpers (inchangés) --- */
const MAX_LENGTHS = { name: 100, email: 254, phone: 30, subject: 150, message: 1200 };

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
  } catch (e) {
    return true;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder, required, rows, maxLength }) => {
  const InputComponent = rows ? 'textarea' : 'input';
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-white/50">
        {label}
        {required && <span className="text-accent2 ml-1">*</span>}
      </label>
      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border text-sm text-white placeholder-white/25 transition-colors focus:outline-none ${
          error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactInfoRow = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="flex items-center gap-3 py-3 border-b border-white/10 hover:border-white/20 transition-colors group"
  >
    <Icon className="w-4 h-4 text-white/40 group-hover:text-accent-soft transition-colors" />
    <div>
      <p className="text-[11px] text-white/40">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  </a>
);

const SuccessMessage = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center"
  >
    <CheckCircle className="w-8 h-8 text-accent-soft mx-auto mb-3" />
    <h3 className="font-display font-semibold text-white mb-1">{t('contact.successTitle')}</h3>
    <p className="text-sm text-white/50">{t('contact.successBody')}</p>
  </motion.div>
);

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
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
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrors({ submit: t('contact.errSubmitFailed') });
      }
    } catch (err) {
      setErrors({ submit: t('contact.errNetwork') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.labelEmail'), value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Phone, label: t('contact.labelPhone'), value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
    { icon: MapPin, label: t('contact.labelLocation'), value: PERSONAL_INFO.location, href: 'https://www.google.com/maps/place/Niamey' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <SectionHeading top={t('contact.headingTop')} bottom={t('contact.headingBottom')} />
      </motion.div>

      <div className="mt-10 grid md:grid-cols-2 gap-12 max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1}>
          {contactInfo.map((info) => (
            <ContactInfoRow key={info.label} {...info} />
          ))}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { href: SOCIAL_LINKS.github, label: 'GitHub' },
              { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
              { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/60 hover:border-white/40 hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessMessage key="success" t={t} />
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                <InputField label={t('contact.name')} name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder={t('contact.namePlaceholder')} required maxLength={MAX_LENGTHS.name} />
                <InputField label={t('contact.email')} name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="vous@example.com" required maxLength={MAX_LENGTHS.email} />
                <InputField label={t('contact.phone')} name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder={t('contact.phonePlaceholder')} maxLength={MAX_LENGTHS.phone} />
                <InputField label={t('contact.subject')} name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} placeholder={t('contact.subjectPlaceholder')} maxLength={MAX_LENGTHS.subject} />
                <InputField label={t('contact.message')} name="message" value={formData.message} onChange={handleChange} error={errors.message} placeholder={t('contact.messagePlaceholder')} rows={4} required maxLength={MAX_LENGTHS.message} />

                <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} autoComplete="off" tabIndex={-1} />

                {errors.submit && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent hover:bg-accent-soft disabled:opacity-50 text-white text-sm font-medium transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('contact.send')}
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
