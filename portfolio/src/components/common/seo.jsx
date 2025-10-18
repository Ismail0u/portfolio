import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../constants/seoConfiguration';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants/personalInfo';

/**
 * ============================================
 * SEO COMPONENT
 * ============================================
 * Gestion complète du SEO:
 * - Meta tags optimisés
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Cards
 * - JSON-LD Schema.org
 * - Canonical URLs
 * ============================================
 */

export default function SEO({ 
  title = SEO_CONFIG.title,
  description = SEO_CONFIG.description,
  image = SEO_CONFIG.image,
  url = SEO_CONFIG.url,
  type = SEO_CONFIG.type,
  article = false,
  publishedTime,
  modifiedTime,
}) {
  // ============================================
  // JSON-LD Schema - Person
  // ============================================
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    url: SEO_CONFIG.url,
    image: SEO_CONFIG.image,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.bio,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Niamey',
      addressCountry: 'NE',
    },
    knowsAbout: [
      'React',
      'Django',
      'React Native',
      'Intelligence Artificielle',
      'Cybersécurité',
      'Python',
      'JavaScript',
    ],
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
    ],
  };

  // ============================================
  // JSON-LD Schema - Website
  // ============================================
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Moussa Ismael Portfolio',
    url: SEO_CONFIG.url,
    description: SEO_CONFIG.description,
    author: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    inLanguage: 'fr-FR',
  };

  // ============================================
  // JSON-LD Schema - Professional Service
  // ============================================
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${PERSONAL_INFO.name} - Services de Développement Web`,
    image: SEO_CONFIG.image,
    '@id': SEO_CONFIG.url,
    url: SEO_CONFIG.url,
    telephone: PERSONAL_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Niamey',
      addressCountry: 'NE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.5127,
      longitude: 2.1098,
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Niger',
    },
  };

  // ============================================
  // JSON-LD Schema - Breadcrumb
  // ============================================
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SEO_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'À propos',
        item: `${SEO_CONFIG.url}#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projets',
        item: `${SEO_CONFIG.url}#projects`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `${SEO_CONFIG.url}#contact`,
      },
    ],
  };

  return (
    <Helmet>
      {/* ============================================
          BASIC META TAGS
          ============================================ */}
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={SEO_CONFIG.keywords.join(', ')} />
      <meta name="author" content={SEO_CONFIG.author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* ============================================
          OPEN GRAPH (Facebook, LinkedIn, WhatsApp)
          ============================================ */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Moussa Ismael Portfolio" />
      <meta property="og:locale" content="fr_FR" />
      
      {article && (
        <>
          <meta property="article:author" content={PERSONAL_INFO.name} />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
        </>
      )}

      {/* ============================================
          TWITTER CARD
          ============================================ */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@moussaismael" />

      {/* ============================================
          MOBILE & BROWSER
          ============================================ */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* ============================================
          ROBOTS & INDEXING
          ============================================ */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* ============================================
          STRUCTURED DATA (JSON-LD)
          ============================================ */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* ============================================
          PERFORMANCE & SECURITY
          ============================================ */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
    </Helmet>
  );
}