import React from 'react';
import ProjectCard from './ProjetCard';
import emigResto1 from '../assets/image/emigResto1.PNG';
import facelog from '../assets/image/facelog.PNG';
import NIBOT from '../assets/image/NIBOT.PNG';

const projects = [
  {
    title: 'EMIG Resto',
    description: 'Application de gestion complète de restaurant (backend Django, frontend React).',
    image: emigResto1,
    github: 'https://github.com/Ismail0u/emigresto',
    demo: 'https://emigresto.vercel.app'
    },
  {
    title: 'FaceLogin',
    description: 'Système de reconnaissance faciale avec Streamlit et DeepFace.',
    image: facelog,
    github: 'https://github.com/Ismail0u/facelogin',
    demo: 'https://facelogin-8td8.onrender.com/',
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
    image: NIBOT,
    github: 'https://github.com/Ismail0u/quiz-educatif',
    demo: 'https://minichatbot-python.onrender.com/',
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
