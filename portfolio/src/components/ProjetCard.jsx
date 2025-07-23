import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import ImageModal from './ImageModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export default function ProjectCard({ title, description, images = [], github, demo, tech = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.2}
        className="tilt-container"
      >
        {images.length > 0 && (
          <Swiper slidesPerView={1} spaceBetween={0} className="h-48">
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${title} ${idx + 1}`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => openModal(img)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Tilt>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>

        {tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tech.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center mt-4 space-x-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 flex items-center transition-colors"
            >
              <Github className="w-4 h-4 mr-1" />
              Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 dark:hover:text-green-400 font-medium transition-colors"
            >
              🌐 Démo
            </a>
          )}
        </div>
      </div>

      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} image={modalImage} />
    </motion.div>
  );
}
