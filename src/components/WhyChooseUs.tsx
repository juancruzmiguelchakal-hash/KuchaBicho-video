import { useEffect, useRef, useState } from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';
import whyImage from '@/assets/why-choose-us.jpg';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
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
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
          <div className="text-primary transform transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">{title}</h3>
          <p className="text-foreground/70 leading-relaxed text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section id="por-que" className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img 
                  src={whyImage}
                  alt="Técnico de KuchaBicho Fumigaciones realizando un servicio de control de plagas profesional"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>  

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-primary mb-6">
              Por qué elegirnos
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              <span className="text-foreground">Tu tranquilidad es </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300">
                nuestra prioridad
              </span>
            </h2>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              En KuchaBicho Fumigaciones nos dedicamos al <strong>control de plagas</strong>, brindando un servicio profesional, seguro y confiable para hogares, comercios e industrias.
            </p>

            <div className="space-y-4">
              <FeatureCard
                icon={<Shield size={28} />}
                title="Confianza y Seguridad"
                description="Utilizamos productos aprobados y procedimientos seguros para proteger tu hogar, tu negocio y, sobre todo, a tu familia."
                delay={0}
              />
              <FeatureCard
                icon={<Award size={28} />}
                title="Experiencia Comprobada"
                description="Contamos con amplia experiencia en hogares, comercios e industrias, adaptando nuestras soluciones a cada tipo de plaga."
                delay={100}
              />
              <FeatureCard
                icon={<Users size={28} />}
                title="Trabajos Garantizados"
                description="Nuestro compromiso es tu tranquilidad. Ofrecemos garantía en nuestros trabajos, eliminando el problema de raíz."
                delay={200}
              />
              <FeatureCard
                icon={<Clock size={28} />}
                title="Respuesta Rápida"
                description="Entendemos la urgencia de tu problema. Atendemos de forma ágil para brindarte una solución efectiva sin demoras."
                delay={300}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
