import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const Contacto = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KuchaBicho Fumigaciones",
    "image": "https://www.kuchabicho.com/assets/kuchabichologo.png",
    "description": "Expertos en control de plagas y fumigación profesional. Eliminamos cucarachas, roedores y más. Servicio rápido, seguro y con garantía en Lomas de Zamora y zona sur de Buenos Aires.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Boedo 266, Galería Centerlom, Local 20",
      "addressLocality": "Lomas de Zamora Centro",
      "addressRegion": "Buenos Aires",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-34.757",
      "longitude": "-58.404"
    },
    "url": "https://www.kuchabicho.com/contacto",
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
    "areaServed": {
      "@type": "City",
      "name": "Lomas de Zamora"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-34.757",
        "longitude": "-58.404"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto KuchaBicho Fumigaciones | Presupuesto Gratis Lomas de Zamora</title>
        <meta 
          name="description" 
          content="Contactá a KuchaBicho Fumigaciones en Lomas de Zamora. Presupuesto gratis, servicio profesional de control de plagas. WhatsApp: +54 9 11 4405-1154. Ubicados en Boedo 266, Galería Centerlom, Local 20." 
        />
        <meta name="keywords" content="fumigación Lomas de Zamora, control plagas zona sur, fumigador Lomas de Zamora, exterminador cucarachas, desratización, desinsectación, presupuesto fumigación gratis" />
        <link rel="canonical" href="https://www.kuchabicho.com/contacto" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contacto KuchaBicho Fumigaciones | Presupuesto Gratis Lomas de Zamora" />
        <meta property="og:description" content="Contactá a KuchaBicho Fumigaciones. Presupuesto gratis, servicio profesional de control de plagas. WhatsApp: +54 9 11 4405-1154." />
        <meta property="og:url" content="https://www.kuchabicho.com/contacto" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        <meta property="og:site_name" content="KuchaBicho Fumigaciones" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto KuchaBicho Fumigaciones | Presupuesto Gratis" />
        <meta name="twitter:description" content="Contactá a KuchaBicho Fumigaciones. Presupuesto gratis, servicio profesional de control de plagas." />
        <meta name="twitter:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        
        {/* Datos estructurados Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Contacto;