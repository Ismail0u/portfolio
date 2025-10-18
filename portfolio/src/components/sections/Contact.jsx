import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants/personalInfo';
import { isValidEmail, isValidPhone, trackEvent } from '../../utils';
import { useIntersectionObserver } from '../../hooks';

/* --- helpers --- */
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  subject: 150,
  message: 1200,
};

function sanitizeInput(s = '') {
  return String(s || '')
    .replace(/(\r|\n|\r\n)/g, ' ')
    .replace(/[<>]/g, '')
    .trim();
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

/* Subcomponents */
const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder, required = false, rows, maxLength }) => {
  const InputComponent = rows ? 'textarea' : 'input';
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-2 rounded-lg border-2 transition-all
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2
          ${error
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-200'
          }
        `}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-600 dark:text-red-400 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactInfoCard = ({ icon: Icon, label, value, href, delay = 0 }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 });
  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, x: 5 }}
      className="flex items-center space-x-4 p-2 bg-blue-50 dark:bg-gray-800 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors group"
    >
      <div className="p-3 bg-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className="text-sm text-gray-900 dark:text-white font-semibold">{value}</p>
      </div>
    </motion.a>
  );
};

const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 rounded-xl p-6 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="inline-block p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4"
    >
      <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
    </motion.div>
    <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">Message envoyé !</h3>
    <p className="text-green-700 dark:text-green-300">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
  </motion.div>
);

/* Main component */
export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', website: '' }); // honeypot
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    else if (formData.name.trim().length < 2) newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Email invalide';
    if (formData.phone && !isValidPhone(formData.phone)) newErrors.phone = 'Numéro de téléphone invalide';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    else if (formData.message.trim().length < 10) newErrors.message = 'Le message doit contenir au moins 10 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot
    if (formData.website) return; 

    if (!canSubmit(15000)) { setErrors({ submit: 'Veuillez patienter avant de renvoyer le formulaire.' }); return; }
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
        body: payload.toString()
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrors({ submit: 'Échec de l’envoi — vérifie la console.' });
        console.error('Form submission failed:', res.status, await res.text());
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrors({ submit: 'Une erreur réseau est survenue. Réessayez plus tard.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Phone, label: 'Téléphone', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
    { icon: MapPin, label: 'Localisation', value: PERSONAL_INFO.location, href: 'https://www.google.com/maps/place/Niamey' },
  ];

  return (
    <section id="contact" className="my-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}>
          <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Me Contacter</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Une question ? Un projet ? N'hésitez pas à me contacter. Je réponds généralement sous 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="space-y-5">
              {contactInfo.map((info, i) => <ContactInfoCard key={i} {...info} delay={i * 0.1} />)}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Suivez-moi sur les réseaux</h3>
              <div className="flex flex-wrap gap-3">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center px-3 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">GitHub</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">LinkedIn</a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center px-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">WhatsApp</a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <SuccessMessage key="success" />
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 space-y-3">
                  <InputField label="Nom complet" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="ISmael yunus" required maxLength={MAX_LENGTHS.name} />
                  <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="ismael@example.com" required maxLength={MAX_LENGTHS.email} />
                  <InputField label="Téléphone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="+227 XX XX XX XX" maxLength={MAX_LENGTHS.phone} />
                  <InputField label="Sujet" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} placeholder="De quoi voulez-vous parler ?" maxLength={MAX_LENGTHS.subject} />
                  <InputField label="Message" name="message" value={formData.message} onChange={handleChange} error={errors.message} placeholder="Décrivez votre projet ou votre demande..." rows={3} required maxLength={MAX_LENGTHS.message} />
                  
                  {/* Honeypot field */}
                  <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} autoComplete="off" />

                  {errors.submit && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />{errors.submit}
                  </motion.p>}

                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg">
                    {isSubmitting ? <><Loader className="w-5 h-5 animate-spin" /><span>Envoi en cours...</span></> : <><Send className="w-5 h-5" /><span>Envoyer le message</span></>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
