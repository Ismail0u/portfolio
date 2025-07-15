import React from 'react';
import ProjectCard from './ProjetCard';

const projects = [
  {
    title: 'EMIG Resto',
    description: 'Application de gestion complète de restaurant (backend Django, frontend React).',
    image: '/projects/emigresto.png',
    github: 'https://github.com/Ismail0u/emigresto',
    demo: 'https://emigresto.vercel.app'
    },
  {
    title: 'FaceLogin',
    description: 'Système de reconnaissance faciale avec Streamlit et DeepFace.',
    image: '/projects/facelogin.png',
    github: 'https://github.com/Ismail0u/facelogin',
    demo: '',
  },
  {
    title: 'Kayanabinchi',
    description: 'Application mobile de localisation et de visualisation des restaurants à Niamey.',
    image: '/projects/kayanabinchi.png',
    github: 'https://github.com/Ismail0u/kayanabinchi',
    demo: '',
  },
  {
    title: 'Quiz Educatif IA',
    description: 'Chatbot éducatif avec mode quiz et synthèse vocale, interface Streamlit.',
    image: '/projects/quizia.png',
    github: 'https://github.com/Ismail0u/quiz-educatif',
    demo: '',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="my-20">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
        Projets Réalisés
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
