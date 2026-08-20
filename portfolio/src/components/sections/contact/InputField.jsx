import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * Champ de formulaire générique (input ou textarea selon `rows`),
 * avec état d'erreur animé.
 */
export default function InputField({
  label, name, type = 'text', value, onChange, error, placeholder, required, rows, maxLength,
}) {
  const InputComponent = rows ? 'textarea' : 'input';
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-fg/50">
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
        className={`w-full px-3.5 py-2.5 rounded-lg bg-fg/3 border text-sm text-fg placeholder-fg/25 transition-colors focus:outline-none ${
          error ? 'border-red-500/50 focus:border-red-500' : 'border-fg/10 focus:border-accent'
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
}
