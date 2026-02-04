import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// 💥 CORRECCIÓN DE IMAGEN: ELIMINAMOS la importación fallida de src/assets/
// Ya que la imagen está en public/, la referenciamos directamente.
// import LogoImage from '../assets/kuchabichologo.png'; 


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Nota: `useLocation` se usa en proyectos con react-router-dom.
  // Si este es un archivo único, necesitarías manejar la ruta de forma diferente.
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50' : 'bg-transparent'
        }`}
    >
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-32 py-2 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <img
            src="/assets/logoheader.gif"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 object-contain"
            alt="Logo Animado"
          />
          <div className="hidden sm:block">
            <span className="text-2xl sm:text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300 block leading-tight text-left">
              Kuchabicho
            </span>
            <span className="text-xs sm:text-sm text-foreground/60 text-left block">Control de Plagas</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 font-medium ${isActive(link.path)
                ? 'text-primary'
                : 'text-foreground/80 hover:text-primary'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => window.open('https://wa.me/5491144051154', '_blank')}
            className="bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#20BA5C] hover:scale-105 hover:shadow-lg flex items-center gap-2"
            aria-label="Contactar por WhatsApp"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-primary"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-lg border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-left transition-colors duration-300 font-medium py-2 ${isActive(link.path)
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-primary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => window.open('https://wa.me/5491144051154', '_blank')}
              className="bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#20BA5C] hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-2"
              aria-label="Contactar por WhatsApp"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;