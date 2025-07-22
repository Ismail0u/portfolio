import React from 'react';
import ProjectCard from './ProjetCard'

import emigResto1 from '../assets/image/emigResto1.PNG';
import emigResto2 from '../assets/image/emigresto2.PNG';
import facelog from '../assets/image/facelog.PNG';
import NIBOT from '../assets/image/NIBOT.PNG';
import abinchi from '../assets/image/C1.PNG';

const projects = [
  {
    title: 'EMIG Resto',
    description:
      "Application complète pour la gestion d’un restaurant. Admin web (React) + app mobile client (React Native). Backend Django. Gestion des tickets et réservations numériques.",
    images: [emigResto1, emigResto2],
    github: 'https://github.com/Ismail0u/EMIG_Resto',
    demo: '',
    tech: ['React', 'Django', 'React Native', 'PostgreSQL'],
  },
  {
    title: 'FaceLogin',
    description:
      "Système d'authentification par reconnaissance faciale basé sur DeepFace et Streamlit. Prise en charge de la webcam.",
    images: [facelog],
    github: 'https://github.com/Ismail0u/FaceLogin',
    demo: 'https://facelogin-8td8.onrender.com/',
    tech: ['Python', 'DeepFace', 'Streamlit'],
  },
  {
    title: 'Kayanabinchi',
    description:
      "Plateforme complète pour gérer les stocks, les réservations et le service de restauration scolaire. Pensée pour un environnement administratif.",
    images: [abinchi],
    github: 'https://github.com/Ismail0u/projet_industrielEMIG',
    demo: '',
    tech: ['React', 'Django', 'MYSQL'],
  },
  {
    title: 'Mini Chatbot IA',
    description:
      "Chatbot éducatif. Traitement NLP avec NLTK, synthèse vocale, interaction en français via Streamlit.",
    images: [NIBOT],
    github: 'https://github.com/Ismail0u/miniChatBot_python',
    demo: 'https://minichatbot-python.onrender.com/',
    tech: ['Python', 'NLTK', 'Streamlit', 'TTS'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="my-24 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
        Mes Projets
      </h2>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
