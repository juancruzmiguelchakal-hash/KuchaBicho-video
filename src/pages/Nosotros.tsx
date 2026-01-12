import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import WhyChooseUs from '@/components/WhyChooseUs';
import { Shield, Target, Users, Award } from 'lucide-react';

const Nosotros = () => {
  return (
    <>
      <Helmet>
        <title>Sobre KuchaBicho Fumigaciones | Expertos en Control de Plagas Lomas de Zamora</title>
        <meta 
          name="description" 
          content="Conocé a KuchaBicho Fumigaciones. Somos un equipo de profesionales con amplia trayectoria en fumigación profesional y control de plagas en Lomas de Zamora. Empresa habilitada bajo el Ministerio de Asuntos Agrarios de la Provincia de Buenos Aires." 
        />
        <meta name="keywords" content="fumigación profesional Lomas de Zamora, empresa fumigación habilitada, control plagas certificado, fumigador zona sur Buenos Aires, certificados municipales fumigación" />
        <link rel="canonical" href="https://www.kuchabicho.com/nosotros" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sobre KuchaBicho Fumigaciones | Expertos en Control de Plagas" />
        <meta property="og:description" content="Somos un equipo de profesionales con amplia trayectoria en fumigación profesional y control de plagas. Empresa habilitada y certificada." />
        <meta property="og:url" content="https://www.kuchabicho.com/nosotros" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
        <meta property="og:site_name" content="KuchaBicho Fumigaciones" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre KuchaBicho Fumigaciones | Expertos en Control de Plagas" />
        <meta name="twitter:description" content="Somos un equipo de profesionales con amplia trayectoria en fumigación profesional y control de plagas." />
        <meta name="twitter:image" content="https://www.kuchabicho.com/assets/kuchabichologo.png" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-background to-card/30">
        <div className="w-full mx-auto px-4 md:px-[50px]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              <span className="text-foreground">Sobre </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">
                KuchaBicho Fumigaciones
              </span>
            </h1>
            <p className="text-2xl text-foreground/70 leading-relaxed">
              Somos un equipo de profesionales con amplia trayectoria en el control de plagas.
              Combinamos experiencia y técnicas modernas para ofrecer un servicio cercano y garantizado.
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-card/30">
        <div className="w-full mx-auto px-4 md:px-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Nuestra Misión</h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                Brindar soluciones efectivas y seguras para el control de plagas, protegiendo la salud
                de las familias y empresas con productos de calidad y un servicio profesional.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Award className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Nuestra Visión</h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                Ser la empresa de control de plagas más confiable de la región, reconocida por
                la calidad de nuestro trabajo, la atención al cliente y el compromiso ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gradient-to-b from-card/30 to-background">
        <div className="w-full mx-auto px-4 md:px-[50px]">
          <h2 className="section-title text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Compromiso</h3>
              <p className="text-foreground/70 text-lg">Garantizamos resultados efectivos en cada trabajo que realizamos.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Cercanía</h3>
              <p className="text-foreground/70 text-lg">Atención personalizada y trato directo con cada cliente.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Award className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Calidad</h3>
              <p className="text-foreground/70 text-lg">Productos aprobados y técnicas de última generación.</p>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </>
  );
};

export default Nosotros;
