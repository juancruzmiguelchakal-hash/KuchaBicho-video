import ctaBackground from '@/assets/cta-background.jpg';

const CTASection = () => {
  const handleWhatsApp = () => {
    const message = '¡Hola! Tengo una invasión de plagas y necesito ayuda urgente.';
    window.open(`https://wa.me/5491144051154?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={ctaBackground}
          alt="Fumigación profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            <span className="text-foreground">Si hay </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">invasión</span>
            <span className="text-foreground">, </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">Kuchabicho</span>
            <span className="text-foreground"> es la solución</span>
          </h2>

          <p className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl">
            No dejes que las plagas se apropien de tu espacio. Actuá rápido, trabajamos con urgencia y profesionalismo. Servicio disponible las 24 horas.
          </p>

          <button
            onClick={handleWhatsApp}
            className="btn-gold text-lg px-10 py-4 flex items-center gap-3"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contactanos Ahora
          </button>

          {/* Mini badges */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-foreground">Empresa Habilitada</div>
                <div className="text-sm text-foreground/60">Permisos vigentes</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-foreground">Productos Seguros</div>
                <div className="text-sm text-foreground/60">Certificados SENASA</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-foreground">A tu disposición</div>
                <div className="text-sm text-foreground/60">Respuesta rápida</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
