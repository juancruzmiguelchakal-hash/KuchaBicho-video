import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';

const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KuchaBicho Fumigaciones",
    "alternateName": "KuchaBicho Control de Plagas",
    "image": "https://www.kuchabicho.com/assets/kuchabichologo.png",
    "logo": "https://www.kuchabicho.com/assets/kuchabichologo.png",
    "description": "KuchaBicho Fumigaciones: expertos en control de plagas profesional. Eliminamos cucarachas, roedores, murciélagos y más. Servicio rápido, seguro y con garantía en Lomas de Zamora y zona sur de Buenos Aires.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Boedo 266, Galería Centerlom, Local 20",
      "addressLocality": "Lomas de Zamora Centro",
      "addressRegion": "Buenos Aires",
      "postalCode": "1832",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-34.757",
      "longitude": "-58.404"
    },
    "url": "https://www.kuchabicho.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Lomas de Zamora"
      },
      {
        "@type": "City",
        "name": "Banfield"
      },
      {
        "@type": "City",
        "name": "Temperley"
      },
      {
        "@type": "City",
        "name": "Adrogué"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Fumigación y Control de Plagas",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desinsectación",
            "description": "Eliminación profesional de insectos (cucarachas, hormigas, pulgas, etc.)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desratización",
            "description": "Control y eliminación de roedores"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desinfección",
            "description": "Desinfección de ambientes y superficies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Control de Murciélagos",
            "description": "Control profesional de murciélagos"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  };

  return (
    <>
      <Helmet>
        <title>KuchaBicho Fumigaciones | Control de Plagas Profesional Lomas de Zamora</title>
        <meta 
          name="description" 
          content="KuchaBicho Fumigaciones: expertos en control de plagas en Lomas de Zamora. Eliminamos cucarachas, roedores, murciélagos y más. Servicio profesional, rápido y con garantía. Presupuesto gratis. WhatsApp: +54 9 11 4405-1154." 
        />
        <meta name="keywords" content="fumigación Lomas de Zamora, control plagas zona sur Buenos Aires, exterminador cucarachas, desratización, desinsectación, fumigador profesional, control murciélagos, desinfección ambientes" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.kuchabicho.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="KuchaBicho Fumigaciones | Control de Plagas Profesional Lomas de Zamora" />
        <meta property="og:description" content="Expertos en control de plagas. Eliminamos cucarachas, roedores y más. Servicio rápido, seguro y con garantía. Presupuesto gratis." />
        <meta property="og:url" content="https://www.kuchabicho.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        <meta property="og:site_name" content="KuchaBicho Fumigaciones" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KuchaBicho Fumigaciones | Control de Plagas Profesional" />
        <meta name="twitter:description" content="Expertos en control de plagas. Eliminamos cucarachas, roedores y más. Servicio rápido, seguro y con garantía." />
        <meta name="twitter:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        
        {/* Datos estructurados Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Clients />
      </div>
    </>
  );
};

export default Index;