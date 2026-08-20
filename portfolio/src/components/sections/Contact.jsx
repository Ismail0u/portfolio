import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, AlertCircle, Loader } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants/personalInfo';
import SectionHeading from '../common/SectionHeading';
import { fadeUp } from '../../constants/motionVariants';
import { ContactInfoRow, SuccessMessage } from './contact/ContactInfoRow';
import InputField from './contact/InputField';
import { useContactForm, MAX_LENGTHS } from './contact/useContactForm';

const SOCIAL_BADGES = [
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp' },
];

export default function Contact() {
  const { t } = useTranslation();
  const { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit } = useContactForm(t);

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
            {SOCIAL_BADGES.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full border border-fg/15 text-fg/60 hover:border-fg/40 hover:text-fg transition-colors"
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
