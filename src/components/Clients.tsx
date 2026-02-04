import { useEffect, useState } from 'react';

const Clients = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Array de empresas que confían - fácil de actualizar con logos reales
  const clients = [
    { id: 1, name: 'Innovatech', logo: '/iconocliente1.png' },
    { id: 2, name: 'EcoLogistics', logo: '/iconocliente2.png' },
    { id: 3, name: 'Precision Group', logo: '/iconocliente3.png' },
    { id: 4, name: 'GreenSolutions', logo: '/iconocliente4.png' },
    { id: 5, name: 'VentureCorp', logo: '/iconocliente5.png' },
  ];

  return (
    <section className="py-16 md:py-20 bg-card border-y border-border/50" aria-labelledby="clients-title">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-32">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Título */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Confianza Probada
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300 mb-4">
              Empresas que confían en Kuchabicho
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Somos el socio de confianza de cientos de empresas e industrias en la región.
            </p>
          </div>

          {/* Grid de empresas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group flex items-center justify-center h-40 md:h-48 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity rounded-lg"
                  />
                ) : (
                  <div className="text-center px-2">
                    <span className="text-sm md:text-base font-semibold text-foreground/60 group-hover:text-primary transition-colors">
                      {client.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Llamada a la acción */}
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-foreground/70 mb-6">
              ¿Deseas que Kuchabicho sea parte de tu equipo?
            </p>
            <button
              onClick={() => {
                const part1 = '54911';
                const part2 = '4405';
                const part3 = '1154';
                const fullNumber = `${part1}${part2}${part3}`;
                window.open(`https://wa.me/${fullNumber}?text=Hola! Necesito información sobre servicios para mi empresa`, '_blank');
              }}
              className="bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#20BA5C] hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
