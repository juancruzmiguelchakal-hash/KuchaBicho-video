import { useEffect, useRef, useState } from 'react';
import { Bug, SprayCan, Rat, CloudRain, Bird, Archive, Leaf } from 'lucide-react';

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
      className={`tilt-card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-3xl font-heading font-bold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/70 mb-4 leading-relaxed text-lg">{description}</p>
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

// Services constant is now local or passed, but let's keep the card structure.

interface ServicesProps {
  onOpenModal: (serviceId: string) => void;
}

const Services = ({ onOpenModal }: ServicesProps) => {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-background to-card/60 w-full">
      <div className="w-full mx-auto px-4 md:px-[50px]">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300 mb-4">
            Soluciones Integrales
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Protegemos tu hogar y empresa con tecnología avanzada y personal certificado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <ServiceCard
            icon={<SprayCan size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Desinfección"
            description="Eliminación de virus y bacterias para un ambiente seguro."
            price="$35.000"
            onLearnMore={() => onOpenModal('desinfeccion')}
          />
          <ServiceCard
            icon={<Bug size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Desinsectación"
            description="Control efectivo de todo tipo de insectos rastreros y voladores."
            price="$40.000"
            onLearnMore={() => onOpenModal('desinsectacion')}
          />
          <ServiceCard
            icon={<Rat size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Desratización"
            description="Eliminación segura y garantizada de roedores."
            price="$45.000"
            onLearnMore={() => onOpenModal('desratizacion')}
          />
          <ServiceCard
            icon={<CloudRain size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Fumigación"
            description="Servicio general de fumigación preventiva y correctiva."
            price="$38.000"
            onLearnMore={() => onOpenModal('fumigacion')}
          />
          <ServiceCard
            icon={<img src="/docs/assets/fotomurcielago.png" alt="Control de murciélagos" className="w-12 h-12 object-contain" />}
            title="Control de murciélagos"
            description="Erradicación ética y segura de colonias de murciélagos."
            price="$75.000"
            onLearnMore={() => onOpenModal('murcielagos')}
          />
          <ServiceCard
            icon={<Bird size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Control de aves"
            description="Soluciones para evitar el anidamiento y presencia de aves."
            price="$60.000"
            onLearnMore={() => onOpenModal('aves')}
          />
          <ServiceCard
            icon={<Archive size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Control de abejas"
            description="Manejo seguro de panales y enjambres de abejas."
            price="$55.000"
            onLearnMore={() => onOpenModal('abejas')}
          />
          <ServiceCard
            icon={<Leaf size={48} className="text-yellow-400 stroke-[1.5]" />}
            title="Espacios verdes"
            description="Control de plagas en jardines y espacios vegetales."
            price="$50.000"
            onLearnMore={() => onOpenModal('vegetales')}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
