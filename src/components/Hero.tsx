import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

// 1. Reemplaza estas rutas con tus dos nuevas imágenes
import heroImage1 from '../assets/fumigador-profesional.jpg'; // Imagen de ejemplo 1
import heroImage2 from '../assets/hero-professionals.jpg'; // Usamos la imagen que ya existe temporalmente
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 md:pt-36 pb-20 bg-background text-white" aria-labelledby="hero-title">
      <div className="w-full mx-auto px-6 sm:px-12 md:px-24 lg:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenedor del texto: añadimos padding top solo en móvil (pt-4) */}
          <div className={`pt-4 lg:pt-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 id="hero-title" className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
              <span className="text-white">Kuchabicho Fumigaciones</span>
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">
              Si hay invasión, Kuchabicho es la solución.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
              Servicio profesional para eliminar cucarachas, roedores y otras plagas en tu hogar, comercio o industria. Rápido, efectivo y garantizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={() => {
                const part1 = '54911';
                const part2 = '4405';
                const part3 = '1154';
                const fullNumber = `${part1}${part2}${part3}`;
                window.open(`https://wa.me/${fullNumber}?text=Hola! Necesito información sobre sus servicios`, '_blank');
              }} className="btn-gold flex items-center justify-center gap-2">
                {/* El texto dentro del SVG no es accesible, por eso el texto del botón es importante */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Elimina Plagas Ahora
              </button>
              <Link to="/servicios" className="btn-outline-gold text-center">Ver Servicios</Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
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

          {/* --- COLUMNA DE IMÁGENES MODIFICADA --- */}
          <div className={`row-start-1 lg:row-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Contenedor para las dos imágenes con un efecto de superposición */}
            <div className="relative h-[450px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              {/* Imagen 1 (atrás) */}
              <div
                className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl bg-cover bg-center shadow-2xl border-4 border-primary/20"
                style={{ backgroundImage: `url(${heroImage1})` }}
                aria-label="Técnico de fumigación profesional en acción."
              />
              {/* Imagen 2 (adelante) */}
              <div
                className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-3xl bg-cover bg-center shadow-2xl border-4 border-primary/50"
                style={{ backgroundImage: `url(${heroImage2})` }}
                aria-label="Hogar protegido y libre de plagas."
              />
              {/* Tarjeta informativa alineada con la imagen de fondo y posicionada abajo */}
              <div className="hidden lg:block absolute bottom-1/4 left-0 lg:bottom-24 bg-card/90 backdrop-blur-md p-2 rounded-xl md:rounded-2xl border border-primary/30 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <Shield className="text-primary flex-shrink-0" size={16} />
                  <p className="text-xs font-semibold text-white">Hogares y Comercios Seguros</p>
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