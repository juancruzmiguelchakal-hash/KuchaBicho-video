/**
 * CONTACT COMPONENT - Con animaciones Tilt 3D masivas
 * 
 * LIBRERÍAS USADAS:
 * - vanilla-tilt: Para efectos 3D tilt en cada elemento
 *   Instalación: npm install vanilla-tilt
 * 
 * CONFIGURACIÓN REQUERIDA:
 * 1. FORMSUPPLY: Reemplazar el action del form con tu endpoint de Formsupply
 * 2. WHATSAPP: El número ya está configurado, pero verificar que esté habilitado en WhatsApp Business API
 */

import { useEffect, useRef, useState } from 'react';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import VanillaTilt from 'vanilla-tilt';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);

  // Animación de entrada secuencial
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Inicializar Tilt 3D en todos los elementos
  useEffect(() => {
    if (!isVisible) return;

    // Configuración Tilt para el contenedor principal
    if (formContainerRef.current) {
      VanillaTilt.init(formContainerRef.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.02,
        perspective: 1000,
      });
    }

    // Configuración Tilt para cada input (más agresiva)
    inputRefs.current.forEach((ref) => {
      if (ref) {
        VanillaTilt.init(ref, {
          max: 15,
          speed: 600,
          glare: true,
          "max-glare": 0.2,
          scale: 1.05,
          perspective: 800,
        });
      }
    });

    // Tilt para el botón de envío
    if (buttonRef.current) {
      VanillaTilt.init(buttonRef.current as unknown as HTMLElement, {
        max: 20,
        speed: 800,
        glare: true,
        "max-glare": 0.4,
        scale: 1.1,
        perspective: 600,
      });
    }

    // Tilt para WhatsApp card - REMOVIDO para corregir bug de click
    // if (whatsappRef.current) {
    //   VanillaTilt.init(whatsappRef.current, {
    //     max: 12,
    //     speed: 500,
    //     glare: true,
    //     "max-glare": 0.35,
    //     scale: 1.05,
    //     perspective: 900,
    //   });
    // }

    // Cleanup
    return () => {
      if (formContainerRef.current) {
        (formContainerRef.current as any).vanillaTilt?.destroy();
      }
      inputRefs.current.forEach((ref) => {
        if (ref) (ref as any).vanillaTilt?.destroy();
      });
      if (buttonRef.current) {
        (buttonRef.current as any).vanillaTilt?.destroy();
      }
      // if (whatsappRef.current) {
      //   (whatsappRef.current as any).vanillaTilt?.destroy();
      // }
    };
  }, [isVisible]);

  /**
   * WHATSAPP - IMPORTANTE:
   * El número configurado es: +54 9 11 4405-1154
   * 
   * ⚠️ ADVERTENCIA: La API de WhatsApp puede rechazar la conexión si:
   * - El número no está registrado en WhatsApp
   * - El número no tiene WhatsApp Business configurado
   * - El formato del número es incorrecto
   * 
   * Formato correcto: Solo números, sin espacios ni guiones
   * Ejemplo: 5491144051154
   */
  const WHATSAPP_NUMBER = '5491144051154'; // ← REEMPLAZAR CON TU NÚMERO DE WHATSAPP

  const handleWhatsApp = () => {
    const message = 'Hola! Quiero consultar sobre sus servicios de control de plagas.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-card/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header animado */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary mb-6">
            <Sparkles size={16} className="animate-pulse" />
            <span>Respuesta en menos de 24hs</span>
          </div>
          <h2 className="section-title">Contactanos</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mt-4">
            Completá el formulario o escribinos por WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Formulario con Formsupply - 3 columnas */}
          <div
            ref={formContainerRef}
            className={`lg:col-span-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bg-card/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden">
              {/* Efectos de fondo animados */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

              <h3 className="text-2xl font-heading font-bold text-foreground mb-2 relative z-10">
                Envianos tu consulta
              </h3>
              <p className="text-foreground/60 text-sm mb-8 relative z-10">
                Te respondemos a la brevedad
              </p>

              {/**
               * FORMSUPPLY INTEGRATION
               * =====================
               * Reemplazar el action con tu endpoint de Formsupply:
               * action="https://formsupply.io/f/TU_FORM_ID"
               * 
               * Para obtener tu endpoint:
               * 1. Crear cuenta en formsupply.io
               * 2. Crear nuevo formulario
               * 3. Copiar el endpoint generado
               */}
              <form
                action="https://formsubmit.co/myvisioncraftai@gmail.com" // ← REEMPLAZAR CON TU ENDPOINT DE FORMSUPPLY
                method="POST"
                className="space-y-6 relative z-10"
              >
                {/* Input Nombre con Tilt 3D */}
                <div
                  ref={(el) => { inputRefs.current[0] = el; }}
                  className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg
                             placeholder:text-foreground/40"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Input Email con Tilt 3D */}
                <div
                  ref={(el) => { inputRefs.current[1] = el; }}
                  className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg
                             placeholder:text-foreground/40"
                    placeholder="ejemplo@email.com"
                  />
                </div>

                {/* Textarea Mensaje con Tilt 3D */}
                <div
                  ref={(el) => { inputRefs.current[2] = el; }}
                  className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={1000}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg resize-none
                             placeholder:text-foreground/40"
                    placeholder="Contanos sobre tu problema con plagas..."
                  />
                </div>

                {/* Botón Submit con Tilt 3D extremo */}
                <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <button
                    ref={buttonRef}
                    type="submit"
                    className="w-full py-5 px-8 rounded-2xl font-bold text-lg
                             bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_100%]
                             text-primary-foreground shadow-xl
                             hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] 
                             transition-all duration-500 
                             flex items-center justify-center gap-3
                             animate-gradient-x"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Send size={22} className="animate-bounce" style={{ animationDuration: '2s' }} />
                    Enviar Mensaje
                    <Sparkles size={18} className="animate-pulse" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* WhatsApp Card con Tilt 3D - 2 columnas */}
          <div
            ref={whatsappRef}
            className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-8 md:p-10 rounded-3xl shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
              {/* Efectos de fondo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
                  <MessageCircle size={40} className="text-white" />
                </div>

                <h3 className="text-3xl font-heading font-bold text-white mb-4">
                  WhatsApp Directo
                </h3>

                <p className="text-white/90 mb-2 text-lg font-medium">
                  Respuesta inmediata
                </p>

                <p className="text-white/70 mb-8 leading-relaxed">
                  ¿Necesitás atención urgente? Escribinos ahora y te respondemos al instante.
                </p>

                {/**
                 * BOTÓN WHATSAPP
                 * ==============
                 * El número está configurado en la constante WHATSAPP_NUMBER arriba.
                 * 
                 * ⚠️ IMPORTANTE: La API de WhatsApp Web puede fallar si:
                 * - El número no existe o no tiene WhatsApp
                 * - El usuario no tiene WhatsApp instalado
                 * - El navegador bloquea popups
                 */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full bg-white text-green-600 font-bold py-5 px-8 rounded-2xl
                           hover:bg-green-50 hover:scale-105 hover:shadow-2xl
                           transition-all duration-300 
                           flex items-center justify-center gap-3 text-lg cursor-pointer relative z-50 pointer-events-auto"
                >
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chatear Ahora
                </button>

                <p className="text-white/50 text-sm mt-4 text-center">
                  Atención 24/7 para urgencias
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS para animación del gradiente del botón */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;