import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import ServiceModal from '@/components/ServiceModal';
import CTASection from '@/components/CTASection';

const Servicios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openModal = (serviceId: string) => {
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService('');
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fumigación y Control de Plagas",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Kuchabicho Fumigaciones",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Boedo 266, Galería Centerlom, Local 20",
        "addressLocality": "Lomas de Zamora Centro",
        "addressRegion": "Buenos Aires",
        "addressCountry": "AR"
      },
      "telephone": "+5491144051154",
      "email": "kuchabicho@gmail.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Lomas de Zamora"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Fumigación",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desinsectación",
            "description": "Eliminación profesional de insectos: cucarachas, hormigas, pulgas, arañas, etc."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desratización",
            "description": "Control y eliminación de roedores (ratas y ratones)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desinfección",
            "description": "Desinfección de ambientes y superficies contra virus y bacterias"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Control de Murciélagos",
            "description": "Control profesional de murciélagos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Control de Aves",
            "description": "Control de palomas y otras aves"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Control de Abejas",
            "description": "Control y reubicación de colmenas de abejas"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Servicios de Fumigación Kuchabicho | Desinsectación, Desratización, Desinfección</title>
        <meta 
          name="description" 
          content="Servicios profesionales de fumigación y control de plagas en Lomas de Zamora: desinsectación, desratización, desinfección, control de murciélagos, aves y abejas. Presupuesto gratis." 
        />
        <meta name="keywords" content="desinsectación Lomas de Zamora, desratización zona sur, desinfección ambientes, control murciélagos, control palomas, fumigación cucarachas, exterminador roedores" />
        <link rel="canonical" href="https://www.kuchabicho.com/servicios" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Servicios de Fumigación KuchaBicho | Control de Plagas Profesional" />
        <meta property="og:description" content="Servicios profesionales de fumigación: desinsectación, desratización, desinfección, control de murciélagos y más. Presupuesto gratis." />
        <meta property="og:url" content="https://www.kuchabicho.com/servicios" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        <meta property="og:site_name" content="KuchaBicho Fumigaciones" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servicios de Fumigación KuchaBicho" />
        <meta name="twitter:description" content="Servicios profesionales de fumigación y control de plagas. Presupuesto gratis." />
        <meta name="twitter:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        
        {/* Datos estructurados Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <Services onOpenModal={openModal} />
        <CTASection />
        <Footer />
        <ServiceModal 
          isOpen={modalOpen}
          onClose={closeModal}
          serviceId={selectedService}
        />
      </div>
    </>
  );
};

export default Servicios;
