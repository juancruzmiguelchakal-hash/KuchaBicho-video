import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                // CORRECCIÓN: Agregar la ruta del archivo en la carpeta public/
                src="/kuchabichologo.png"
                alt="Kuchabicho Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300">
                Kuchabicho
              </span>
            </Link>
            <p className="text-foreground/60 text-base leading-relaxed">
              Control profesional de plagas para hogares y empresas. Soluciones efectivas y garantizadas.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-xl font-heading font-bold text-foreground mb-4">Enlaces</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground/60 hover:text-primary transition-colors text-base">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-foreground/60 hover:text-primary transition-colors text-base">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-foreground/60 hover:text-primary transition-colors text-base">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xl font-heading font-bold text-foreground mb-4">Servicios</h4>
            <ul className="space-y-3">
              <li><span className="text-foreground/60 text-base">Desratización</span></li>
              <li><span className="text-foreground/60 text-base">Desinsectación</span></li>
              <li><span className="text-foreground/60 text-base">Control de Cucarachas</span></li>
              <li><span className="text-foreground/60 text-base">Control de Termitas</span></li>
              <li><span className="text-foreground/60 text-base">Fumigación Comercial</span></li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-xl font-heading font-bold text-foreground mb-4">Horarios</h4>
            <ul className="space-y-3">
              <li><span className="text-foreground/60 text-base">Lun–Vie: 8:00–20:00</span></li>
              <li><span className="text-foreground/60 text-base">Sáb: 9:00–14:00</span></li>
              <li><span className="text-primary font-semibold text-base">Urgencias 24/7</span></li>
            </ul>
            <div className="mt-4">
              <p className="text-foreground/60 text-base">Tel: +54 9 11 4405-1154</p>
              <p className="text-foreground/60 text-base">juancruzmiguelchakal@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-foreground/50 text-base">
            © {new Date().getFullYear()} Kuchabicho Control de Plagas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;