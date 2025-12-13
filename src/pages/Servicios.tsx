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
