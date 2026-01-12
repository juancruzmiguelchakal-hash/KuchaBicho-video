import { useEffect, useState, useCallback } from 'react';
import { Send, MessageCircle, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Tipos para el estado del formulario
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    phone: ''
  });

  // Animación de entrada secuencial
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /**
   * WHATSAPP OBFUSCATION
   * ======================
   * The number is split to prevent bots from scraping it directly.
   * It's assembled only when the user clicks the button.
   */
  const handleWhatsApp = useCallback(() => {
    const part1 = '54911';
    const part2 = '4405';
    const part3 = '1154';
    const fullNumber = `${part1}${part2}${part3}`;
    const message = '¡Hola KuchaBicho! Necesito una cotización para un servicio de fumigación y control de plagas. ¿Podrían ayudarme?';
    window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }, []);

  /**
   * FORM SUBMISSION HANDLER (FORMSUBMIT ONLY)
   * ==========================================
   * Sends the form data to FormSubmit using a secure, non-email URL.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const formDataObj = new FormData(form);

    // Basic honeypot check on the client side
    if (formDataObj.get('_honey')) {
      console.warn('🤖 Bot detected via honeypot');
      setFormStatus('success'); // Fail silently
      return;
    }

    try {
      // ❗ CRITICAL: Replace with your secret FormSubmit URL to hide your email
      const formSubmitUrl = 'https://formsubmit.co/ajax/YOUR_SECRET_URL_HERE';

      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '', phone: '' });
      } else {
        throw new Error('El envío del formulario falló.');
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setErrorMessage('Error de conexión. Por favor, intenta nuevamente o contáctanos por WhatsApp.');
      setFormStatus('error');
    }
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background via-card/20 to-background overflow-hidden">
      <div className="w-full mx-auto px-4 md:px-[50px]">
        {/* Header animado */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary mb-6">
            <Sparkles size={16} className="animate-pulse" aria-hidden="true" />
            <span>Servicio Profesional de Control de Plagas</span>
          </div>
          <h2 className="section-title">Solicitá tu Fumigación Profesional</h2>
          <p className="text-2xl text-foreground/70 max-w-3xl mx-auto mt-4">
            ¿Problemas con cucarachas, roedores u otras plagas? KuchaBicho Fumigaciones te ofrece una solución rápida y definitiva. Completá el formulario o contactanos por WhatsApp para una respuesta inmediata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Formulario con seguridad mejorada */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <div className="bg-card/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

              <h3 className="text-3xl font-heading font-bold text-foreground mb-2 relative z-10" id="form-title">
                Pedí tu Presupuesto sin Cargo
              </h3>
              <p className="text-foreground/60 text-base mb-8 relative z-10">
                Nuestro equipo de expertos en fumigación te contactará a la brevedad.
              </p>

              {formStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl flex items-center gap-3 relative z-10">
                  <CheckCircle className="text-green-500" size={24} />
                  <p className="text-green-400 font-medium">¡Mensaje enviado con éxito! Te responderemos pronto.</p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl flex items-center gap-3 relative z-10">
                  <AlertCircle className="text-red-500" size={24} />
                  <p className="text-red-400 font-medium">{errorMessage}</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
                aria-labelledby="form-title"
              >
                {/* ===== CAMPOS DE SEGURIDAD OCULTOS PARA FORMSUBMIT ===== */}
                
                {/* ❗ CRITICAL: Reemplazar por la URL a la que quieres redirigir al usuario después de un envío exitoso. */}
                <input type="hidden" name="_next" value="https://your-domain.co/thank-you.html" />

                {/* HONEYPOT: Campo anti-bots. Déjalo como está. */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                {/* CAPTCHA: FormSubmit usa Google reCAPTCHA por defecto. No se necesita el campo para activarlo. */}
                {/* Para desactivarlo (no recomendado), añade: <input type="hidden" name="_captcha" value="false" /> */}
                
                {/* Asunto del email */}
                <input type="hidden" name="_subject" value="Nuevo Pedido de Presupuesto - KuchaBicho" />


                <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2 cursor-pointer">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg
                             placeholder:text-foreground/40"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2 cursor-pointer">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg
                             placeholder:text-foreground/40"
                    placeholder="ejemplo@email.com"
                  />
                </div>
                
                <div className={`transition-all duration-700 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-2 cursor-pointer">
                    Teléfono <span className="text-foreground/40">(opcional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={20}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg
                             placeholder:text-foreground/40"
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 cursor-pointer">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={1000}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-background/80 border-2 border-border/50 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                             transition-all duration-300 hover:border-primary/50 hover:shadow-lg resize-none
                             placeholder:text-foreground/40"
                    placeholder="Contanos sobre tu problema con plagas..."
                  />
                </div>

                <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-5 px-8 rounded-2xl font-bold text-lg
                             bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_100%]
                             text-primary-foreground shadow-xl
                             hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] 
                             transition-all duration-500 
                             flex items-center justify-center gap-3
                             animate-gradient-x
                             disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <Loader2 size={22} className="animate-spin" aria-hidden="true" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={22} className="animate-bounce" style={{ animationDuration: '2s' }} aria-hidden="true" />
                        Enviar Mensaje
                        <Sparkles size={18} className="animate-pulse" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-8 md:p-10 rounded-3xl shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-bounce" style={{ animationDuration: '3s' }} aria-hidden="true">
                  <MessageCircle size={40} className="text-white" />
                </div>

                <h3 className="text-4xl font-heading font-bold text-white mb-4">
                  ¿Necesitás una respuesta rápida?
                </h3>

                <p className="text-white/90 mb-2 text-xl font-medium">
                  En KuchaBicho Fumigaciones estamos listos para ayudarte.
                </p>

                <p className="text-white/70 mb-8 leading-relaxed text-lg">
                  Escribinos y recibí asesoramiento profesional, coordinación rápida del servicio y una solución efectiva contra plagas.
                </p>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full bg-white text-green-600 font-bold py-5 px-8 rounded-2xl
                           hover:bg-green-50 hover:scale-105 hover:shadow-2xl
                           transition-all duration-300 
                           flex items-center justify-center gap-3 text-lg cursor-pointer relative z-50 pointer-events-auto"
                >
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-label="WhatsApp Icon">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  ¡Eliminar plagas ahora!
                </button>

                <p className="text-white/50 text-base mt-4 text-center">
                  Respuesta inmediata
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección "Dónde encontrarnos" con mapa */}
        <div className={`max-w-6xl mx-auto mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-8">
            Dónde encontrarnos
          </h3>
          
          <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden relative">
            {/* Mapa interactivo de Google Maps */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps?q=Boedo+266,+Galería+Centerlom,+Local+20,+Lomas+de+Zamora+Centro,+Buenos+Aires,+Argentina&output=embed&zoom=15"
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de KuchaBicho Fumigaciones - Boedo 266, Galería Centerlom, Local 20, Lomas de Zamora Centro, Buenos Aires, Argentina"
                aria-label="Mapa interactivo mostrando la ubicación de KuchaBicho Fumigaciones"
              />
            </div>
            
            {/* Información de dirección y botón */}
            <div className="p-6 md:p-8 bg-background/40 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-foreground/90 text-lg font-medium mb-2">
                    Boedo 266, Galería Centerlom, Local 20
                  </p>
                  <p className="text-foreground/70 text-base">
                    Lomas de Zamora Centro, Buenos Aires, Argentina
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Boedo+266,+Galería+Centerlom,+Local+20,+Lomas+de+Zamora+Centro,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                  aria-label="Abrir Google Maps con indicaciones para llegar a KuchaBicho Fumigaciones"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Cómo llegar
                </a>
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
      `}
      </style>
    </section>
  );
};

export default Contact;