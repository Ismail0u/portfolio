import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export const ContactInfoRow = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="flex items-center gap-3 py-3 border-b border-fg/10 hover:border-fg/20 transition-colors group"
  >
    <Icon className="w-4 h-4 text-fg/40 group-hover:text-accent-soft transition-colors" />
    <div>
      <p className="text-[11px] text-fg/40">{label}</p>
      <p className="text-sm text-fg font-medium">{value}</p>
    </div>
  </a>
);

export const SuccessMessage = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center"
  >
    <CheckCircle className="w-8 h-8 text-accent-soft mx-auto mb-3" />
    <h3 className="font-display font-semibold text-fg mb-1">{t('contact.successTitle')}</h3>
    <p className="text-sm text-fg/50">{t('contact.successBody')}</p>
  </motion.div>
);
