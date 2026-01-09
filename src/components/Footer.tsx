import { Link } from 'react-router-dom';

// 💥 CORRECCIÓN DE IMAGEN: ELIMINAMOS la importación fallida de src/assets/
// Ya que la imagen está en public/, la referenciamos directamente.
// import LogoImage from '../assets/kuchabichologo.png';


const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-16">
      <div className="w-full mx-auto px-6 sm:px-12 md:px-24 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center justify-start gap-3 mb-4">
              <img
                src="/docs/assets/logo-animado.gif"
                className="w-10 h-10 object-contain"
                alt="Logo Animado"
              />
              <span className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300">
                Kuchabicho
              </span>
            </Link>
            <p className="text-foreground/60 text-base leading-relaxed text-left">
              Expertos en control de plagas para hogares y empresas. Soluciones de fumigación efectivas y garantizadas.
            </p>
            <p className="text-foreground/60 text-base leading-relaxed text-left mt-4 border-l-2 border-primary pl-3">
              Realizamos emisión de certificados municipales. Empresa habilitada bajo el Ministerio de Asuntos Agrarios de la Provincia de Buenos Aires.
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
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Desinfección</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Desinsectación</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Desratización</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Fumigación</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Control de murciélagos</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Control de aves</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Control de abejas</Link></li>
              <li><Link to="/servicios" className="text-foreground/60 hover:text-primary transition-colors text-base">Control de espacios vegetales</Link></li>
            </ul>
          </div>

          {/* Horarios y Contacto */}
          <div>
            <h4 className="text-xl font-heading font-bold text-foreground mb-4">Horarios</h4>
            <ul className="space-y-3">
              <li><span className="text-foreground/60 text-base">Lunes a Viernes: 10:00 a 17:00 hs</span></li>
              <li><span className="text-foreground/60 text-base">Sábados: 10:00 a 14:00 hs</span></li>
            </ul>
            <div className="mt-4">
              <p className="text-foreground/60 text-base">Tel: +54 9 11 4405-1154</p>
              <a href="mailto:kuchabicho@gmail.com" className="text-foreground/60 hover:text-primary text-base block mt-1">kuchabicho@gmail.com</a>
            </div>

            {/* Medios de Pago */}
            <div className="mt-6">
              <h5 className="text-sm font-heading font-bold text-foreground mb-2">Aceptamos todos los medios de pago</h5>
              <div className="flex gap-3 text-2xl text-foreground/70">
                <i className="fab fa-cc-visa" title="Visa"></i>
                <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                <i className="fas fa-hand-holding-dollar" title="Mercado Pago"></i> {/* Using generic icon for MP */}
                <img src="/docs/assets/mp.png" alt="Mercado Pago" className="h-8 w-auto object-contain" />
              </div>
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
