import { useEffect, useRef, useState } from 'react';
import { Bug, Rat, Shield, Home, Building2 } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  onLearnMore: () => void;
}

const ServiceCard = ({ icon, title, description, price, onLearnMore }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = 'ontouchstart' in window;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Tilt 3D effect - only for non-touch devices
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 degrees
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-primary mb-4 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/70 mb-4 leading-relaxed">{description}</p>
      <div className="price-badge mb-4">{price}</div>
      <button
        onClick={onLearnMore}
        className="btn-outline-gold w-full"
      >
        Más información
      </button>
    </div>
  );
};

interface ServicesProps {
  onOpenModal: (serviceId: string) => void;
}

const Services = ({ onOpenModal }: ServicesProps) => {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mt-4">
            Soluciones profesionales adaptadas a cada necesidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <ServiceCard
            icon={<Rat size={48} />}
            title="Desratización"
            description="Eliminación efectiva de roedores con métodos seguros y garantizados."
            price="$45.000 Precio desde"
            onLearnMore={() => onOpenModal('desratizacion')}
          />
          <ServiceCard
            icon={<Bug size={48} />}
            title="Desinsectación"
            description="Control total de insectos voladores y rastreros en tu propiedad."
            price="$35.000 Precio desde"
            onLearnMore={() => onOpenModal('desinsectacion')}
          />
          <ServiceCard
            icon={<Shield size={48} />}
            title="Control de Cucarachas"
            description="Tratamiento especializado para eliminar cucarachas de forma definitiva."
            price="$30.000 Precio desde"
            onLearnMore={() => onOpenModal('cucarachas')}
          />
          <ServiceCard
            icon={<Home size={48} />}
            title="Control de Termitas"
            description="Protección avanzada contra termitas para preservar tu hogar."
            price="$55.000 Precio desde"
            onLearnMore={() => onOpenModal('termitas')}
          />
          <ServiceCard
            icon={<Building2 size={48} />}
            title="Fumigación Comercial"
            description="Servicios especializados para empresas, hoteles y comercios."
            price="Consultar"
            onLearnMore={() => onOpenModal('comercial')}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
