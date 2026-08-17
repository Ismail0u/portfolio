import React from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants/personalInfo';

const LINKS = [
  { href: SOCIAL_LINKS.email, label: 'Email', icon: Mail },
  { href: SOCIAL_LINKS.github, label: 'GitHub', icon: Github },
  { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: MessageCircle },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Moussa Ismael - Software Engineer
        </p>
        <div className="flex items-center gap-4">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-white/40 hover:text-white transition-colors"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}