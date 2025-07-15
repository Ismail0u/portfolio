import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaNodeJs,
} from 'react-icons/fa';
import { SiTailwindcss, SiDjango, SiJavascript, SiMysql } from 'react-icons/si';

const skills = [
  { name: 'React', icon: <FaReact size={32} /> },
  { name: 'Django', icon: <SiDjango size={32} /> },
  { name: 'Python', icon: <FaPython size={32} /> },
  { name: 'JavaScript', icon: <SiJavascript size={32} /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={32} /> },
  { name: 'Node.js', icon: <FaNodeJs size={32} /> },
  { name: 'HTML5', icon: <FaHtml5 size={32} /> },
  { name: 'CSS3', icon: <FaCss3Alt size={32} /> },
  { name: 'GitHub', icon: <FaGithub size={32} /> },
  { name: 'MySQL', icon: <SiMysql size={32} /> },
];

export default function Skills() {
  return (
    <section id="skills" className="my-20">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
        Compétences Techniques
      </h2>
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-5 gap-6 justify-items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {skills.map((skill, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="text-blue-600 dark:text-blue-400">{skill.icon}</div>
            <span className="text-sm">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
