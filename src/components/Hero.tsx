import { useEffect, useState } from 'react';
// Si usas react-router-dom, descomenta la siguiente línea:
// import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

// 👇👇👇 INSTRUCCIONES PARA TU PROYECTO LOCAL 👇👇👇
// 1. DESCOMENTA la siguiente línea para usar tu imagen:
import heroImage from '../assets/hero-professionals.jpg';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    // Mantenemos el estilo corregido: padding-top grande (pt-36) para evitar solapamiento con el Header
    <section className="relative overflow-hidden pt-36 pb-20 bg-gray-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* 💥 CONTENEDOR DE TEXTO: Ahora es el SEGUNDO en móvil (order-2) y PRIMERO en LG (lg:order-1) */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
              <span className="text-white">KuchaBicho</span>
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">
              Si hay invasión, Kuchabicho es la solución.
            </p>
            <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">Tu aliado contra plagas</p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              Soluciones rápidas, efectivas y profesionales para eliminar cualquier tipo de plaga en tu hogar, comercio o industria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={() => window.open('https://wa.me/5491144051154?text=Hola! Necesito información sobre sus servicios', '_blank')} className="btn-gold flex items-center justify-center gap-2">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Contactanos por WhatsApp
              </button>
              {/* Usa <a> o <Link> según tu configuración */}
              <a href="../src/pages/Servicios" className="btn-outline-gold text-center">Ver Servicios</a>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-gray-400">Trabajos garantizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-400">Atención rápida</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">Pro</div>
                <div className="text-sm text-gray-400">Equipo certificado</div>
              </div>
            </div>
          </div>

          {/* 💥 CONTENEDOR DE IMAGEN: Ahora es el PRIMERO en móvil (order-1) y SEGUNDO en LG (lg:order-2) */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl">

                {/* 👇 AQUI SE USA LA VARIABLE heroImage 👇 */}
                <img
                  src={heroImage}
                  alt="Profesionales de Kucha Bicho"
                  className="w-full h-auto object-cover"
                />

                <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md p-4 rounded-2xl border border-primary/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Shield className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Profesionales Certificados</h3>
                      <p className="text-sm text-gray-400">Equipos especializados y productos aprobados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;