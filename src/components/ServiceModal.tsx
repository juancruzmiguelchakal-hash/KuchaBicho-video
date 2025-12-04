import { useEffect, useState } from 'react';
import { X, CheckCircle2, Clock, Shield } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

const ServiceModal = ({ isOpen, onClose, serviceId }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
    acceptPolicy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const serviceContent: Record<string, any> = {
    desratizacion: {
      title: 'Desratización Profesional',
      description: 'Nuestro servicio de desratización utiliza técnicas avanzadas y productos seguros para eliminar roedores de forma efectiva. Garantizamos resultados duraderos protegiendo tu hogar o negocio.',
      benefits: [
        'Inspección completa del inmueble',
        'Identificación de puntos de entrada',
        'Colocación estratégica de cebos',
        'Productos seguros para mascotas',
        'Sellado de accesos',
        'Seguimiento post-tratamiento'
      ],
      time: '2-4 horas',
      warranty: '60 días de garantía',
      faqs: [
        { q: '¿Es seguro para niños y mascotas?', a: 'Sí, utilizamos productos certificados y seguros.' },
        { q: '¿Cuánto dura el efecto?', a: 'Con mantenimiento, el efecto puede durar meses.' }
      ]
    },
    desinsectacion: {
      title: 'Desinsectación Integral',
      description: 'Control efectivo de todo tipo de insectos voladores y rastreros con productos de última generación y técnicas profesionales.',
      benefits: [
        'Eliminación de mosquitos, moscas y hormigas',
        'Tratamiento perimetral completo',
        'Aplicación en zonas críticas',
        'Productos de baja toxicidad',
        'Efecto residual prolongado'
      ],
      time: '1-3 horas',
      warranty: '45 días de garantía'
    },
    cucarachas: {
      title: 'Control de Cucarachas',
      description: 'Eliminación definitiva de cucarachas con tratamientos específicos y prevención de futuras infestaciones.',
      benefits: [
        'Gel especializado de larga duración',
        'Aplicación en grietas y rincones',
        'Tratamiento de desagües',
        'Plan de prevención incluido',
        'Visitas de seguimiento'
      ],
      time: '1-2 horas',
      warranty: '90 días de garantía'
    },
    termitas: {
      title: 'Control de Termitas',
      description: 'Protección avanzada contra termitas para preservar la estructura de tu propiedad.',
      benefits: [
        'Inspección con equipos especializados',
        'Tratamiento preventivo y correctivo',
        'Barrera química perimetral',
        'Monitoreo continuo',
        'Certificado de tratamiento'
      ],
      time: '3-5 horas',
      warranty: '12 meses de garantía'
    },
    comercial: {
      title: 'Fumigación Comercial',
      description: 'Servicios profesionales para empresas, restaurantes, hoteles y comercios con planes personalizados.',
      benefits: [
        'Plan mensual o trimestral',
        'Cumplimiento de normas sanitarias',
        'Horarios flexibles',
        'Certificados para inspecciones',
        'Reportes detallados'
      ],
      time: 'Según necesidad',
      warranty: 'Según contrato'
    }
  };

  const content = serviceContent[serviceId] || serviceContent.desratizacion;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono requerido';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';
    if (!formData.acceptPolicy) newErrors.acceptPolicy = 'Debes aceptar las políticas';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would integrate with WhatsApp or form service
      const message = `Hola! Solicito información sobre ${content.title}.\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nDirección: ${formData.address}\nMensaje: ${formData.message}`;
      const whatsappUrl = `https://wa.me/5491144051154?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      onClose();
    }
  };

  return (
    <div 
      className="glass-overlay flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="glass-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl p-6 border-b border-primary/20 flex items-center justify-between">
          <h2 id="modal-title" className="text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300">
            {content.title}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/70 hover:text-primary transition-colors duration-300"
            aria-label="Cerrar modal"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-lg text-foreground/80 leading-relaxed">{content.description}</p>

          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Beneficios incluidos</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-foreground/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Time & Warranty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-border/50">
              <Clock className="text-primary" size={24} />
              <div>
                <p className="text-sm text-foreground/60">Tiempo estimado</p>
                <p className="font-semibold text-foreground">{content.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-border/50">
              <Shield className="text-primary" size={24} />
              <div>
                <p className="text-sm text-foreground/60">Garantía</p>
                <p className="font-semibold text-foreground">{content.warranty}</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {content.faqs && (
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Preguntas frecuentes</h3>
              <div className="space-y-3">
                {content.faqs.map((faq: any, index: number) => (
                  <div key={index} className="p-4 bg-background/50 rounded-xl border border-border/50">
                    <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                    <p className="text-foreground/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-gradient-to-br from-card to-background/50 p-6 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Solicitar este servicio</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Juan Pérez"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-2">
                  Teléfono *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="+54 9 11 0000 0000"
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground/80 mb-2">
                  Dirección *
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Calle 123, Buenos Aires"
                />
                {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Detalles adicionales..."
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="policy"
                  type="checkbox"
                  checked={formData.acceptPolicy}
                  onChange={(e) => setFormData({ ...formData, acceptPolicy: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="policy" className="text-sm text-foreground/70">
                  Acepto las políticas de privacidad y el tratamiento de mis datos
                </label>
              </div>
              {errors.acceptPolicy && <p className="text-destructive text-sm">{errors.acceptPolicy}</p>}

              <button type="submit" className="btn-gold w-full">
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
