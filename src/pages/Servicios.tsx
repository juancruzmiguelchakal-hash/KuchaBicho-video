import { useState } from 'react';
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

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-12 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-foreground">Nuestros </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Servicios
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Soluciones profesionales y garantizadas para todo tipo de plagas. 
              Hogares, comercios e industrias.
            </p>
          </div>
        </div>
      </section>

      <Services onOpenModal={openModal} />
      <CTASection />
      <Footer />

      <ServiceModal 
        isOpen={modalOpen}
        onClose={closeModal}
        serviceId={selectedService}
      />
    </div>
  );
};

export default Servicios;
