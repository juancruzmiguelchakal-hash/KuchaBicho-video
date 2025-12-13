import { useEffect, useState } from 'react';
import { X, CheckCircle2, Clock, Shield, FileText, Calculator, AlertTriangle, Loader2 } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

// Price Estimator labels for display
const spaceTypeLabels: Record<string, string> = {
  apartment: 'Departamento pequeño (hasta 50 m²)',
  house: 'Casa mediana (100-150 m²)',
  commercial: 'Local / Depósito (50-100 m²)',
};

const serviceTypeLabels: Record<string, string> = {
  fumigation: 'Fumigación / Insectos',
  rodents: 'Desratización / Roedores',
  sanitization: 'Sanitización',
  full: 'Tratamiento completo',
};

// Price Matrix
const priceMatrix: Record<string, Record<string, { min: number; max: number }>> = {
  apartment: {
    fumigation: { min: 50000, max: 85000 },
    rodents: { min: 55000, max: 95000 },
    sanitization: { min: 50000, max: 90000 },
    full: { min: 90000, max: 140000 },
  },
  house: {
    fumigation: { min: 90000, max: 140000 },
    rodents: { min: 100000, max: 160000 },
    sanitization: { min: 90000, max: 150000 },
    full: { min: 140000, max: 210000 },
  },
  commercial: {
    fumigation: { min: 110000, max: 180000 },
    rodents: { min: 120000, max: 200000 },
    sanitization: { min: 110000, max: 190000 },
    full: { min: 180000, max: 280000 },
  },
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
};

// Price Estimator Component
interface PriceEstimatorProps {
  spaceType: string;
  setSpaceType: (value: string) => void;
  serviceType: string;
  setServiceType: (value: string) => void;
}

const PriceEstimator = ({ spaceType, setSpaceType, serviceType, setServiceType }: PriceEstimatorProps) => {
  const estimatedPrice = spaceType && serviceType ? priceMatrix[spaceType]?.[serviceType] : null;

  return (
    <div className="bg-gradient-to-br from-primary/10 to-yellow-500/10 p-6 rounded-2xl border border-primary/30">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="text-primary" size={28} />
        <h3 className="text-2xl font-heading font-bold text-foreground">Calculá tu presupuesto</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Space Type Selector */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            🏠 Tipo de espacio
          </label>
          <select
            value={spaceType}
            onChange={(e) => setSpaceType(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
          >
            <option value="">Seleccionar...</option>
            <option value="apartment">🏠 Departamento pequeño (hasta 50 m²)</option>
            <option value="house">🏡 Casa mediana (100-150 m²)</option>
            <option value="commercial">🏪 Local / Depósito (50-100 m²)</option>
          </select>
        </div>

        {/* Service Type Selector */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            🛠️ Tipo de servicio
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
          >
            <option value="">Seleccionar...</option>
            <option value="fumigation">🪲 Fumigación / Insectos</option>
            <option value="rodents">🐀 Desratización / Roedores</option>
            <option value="sanitization">✨ Sanitización</option>
            <option value="full">🔥 Tratamiento completo</option>
          </select>
        </div>
      </div>

      {/* Estimated Price Display */}
      {estimatedPrice && (
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-primary/40 animate-fade-in">
          <p className="text-foreground/70 text-sm mb-2">Precio estimado:</p>
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-300">
            {formatPrice(estimatedPrice.min)} – {formatPrice(estimatedPrice.max)}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
        <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-foreground/70">
          El precio final del servicio puede variar según el tipo de espacio, superficie total, nivel de infestación y tipo de plaga a tratar.
        </p>
      </div>
    </div>
  );
};

const ServiceModal = ({ isOpen, onClose, serviceId }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
    acceptPolicy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Price estimator state (shared with form)
  const [spaceType, setSpaceType] = useState('');
  const [serviceType, setServiceType] = useState('');

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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        phone: '',
        address: '',
        message: '',
        acceptPolicy: false,
      });
      setErrors({});
      setSpaceType('');
      setServiceType('');
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const serviceContent: Record<string, any> = {
    desratizacion: {
      title: 'Control Profesional de Roedores',
      description: 'Nuestro servicio de desratización profesional utiliza técnicas avanzadas y productos seguros para eliminar ratas y ratones de forma efectiva. Garantizamos resultados duraderos protegiendo tu hogar o negocio.',
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
    fumigacion: {
      title: 'Fumigación y Desinsectación General',
      description: 'Servicio de fumigación integral para eliminar una amplia variedad de insectos en tu hogar o negocio. Utilizamos productos de última generación con mínimo impacto ambiental.',
      benefits: [
        'Eliminación de insectos voladores y rastreros',
        'Productos ecológicos disponibles',
        'Aplicación en interiores y exteriores',
        'Efecto residual de larga duración',
        'Sin olores molestos',
        'Certificado de aplicación incluido'
      ],
      time: '2-3 horas',
      warranty: '45 días de garantía',
      faqs: [
        { q: '¿Debo salir de mi casa durante la fumigación?', a: 'Recomendamos ausentarse por 2-4 horas después del tratamiento.' },
        { q: '¿Es seguro para plantas?', a: 'Sí, nuestros productos son seguros para plantas de interior.' }
      ]
    },
    insecticidas: {
      title: 'Control Específico de Cucarachas',
      description: 'Tratamiento de choque diseñado para eliminar cucarachas de forma rápida y efectiva. Utilizamos geles y productos específicos que atacan el nido y cortan el ciclo de reproducción.',
      benefits: [
        'Eliminación de todo tipo de cucarachas (alemanas, americanas)',
        'Aplicación de cebo en gel de alta atracción',
        'Productos de baja toxicidad',
        'Aplicación en zonas críticas',
        'Efecto residual prolongado',
        'Tratamiento perimetral incluido'
      ],
      time: '1-3 horas',
      warranty: '45 días de garantía',
      faqs: [
        { q: '¿Es seguro para mi cocina?', a: 'Sí, aplicamos los productos en zonas seguras y de difícil acceso para niños o mascotas.' },
        { q: '¿Con qué frecuencia debo repetir el servicio?', a: 'Recomendamos tratamientos cada 3-4 meses para prevención.' }
      ]
    },
    sanitizacion: {
      title: 'Sanitización y Desinfección de Ambientes',
      description: 'Servicio de desinfección profunda para eliminar el 99.9% de virus, bacterias y hongos. Ideal para crear espacios seguros en hogares, oficinas y comercios.',
      benefits: [
        'Eliminación del 99.9% de virus y bacterias',
        'Productos certificados y seguros',
        'Nebulización de espacios completos',
        'Desinfección de superficies de contacto',
        'Tratamiento de aire acondicionado',
        'Certificado de sanitización incluido'
      ],
      time: '1-2 horas',
      warranty: '15 días de garantía',
      faqs: [
        { q: '¿Elimina el COVID-19?', a: 'Sí, nuestros productos están certificados para eliminar coronavirus.' },
        { q: '¿Puedo estar presente durante la sanitización?', a: 'Recomendamos esperar al menos 30 minutos después del tratamiento.' }
      ]
    },
    comercial: {
      title: 'Control de Plagas para Empresas',
      description: 'Servicios profesionales para empresas, restaurantes, hoteles y consorcios. Ofrecemos planes personalizados que cumplen con todas las normativas vigentes.',
      benefits: [
        'Plan mensual o trimestral',
        'Cumplimiento de normas sanitarias',
        'Horarios flexibles (fuera de horario comercial)',
        'Certificados para inspecciones oficiales',
        'Reportes detallados mensuales',
        'Asesoramiento en prevención'
      ],
      time: 'Según necesidad',
      warranty: 'Según contrato',
      faqs: [
        { q: '¿Emiten certificados para habilitaciones?', a: 'Sí, emitimos todos los certificados necesarios para inspecciones.' },
        { q: '¿Trabajan los fines de semana?', a: 'Sí, nos adaptamos a los horarios de su negocio.' }
      ]
    }
  };

  const content = serviceContent[serviceId] || serviceContent.desratizacion;

  // Calculate estimated price for form submission
  const getEstimatedPriceText = () => {
    if (spaceType && serviceType) {
      const price = priceMatrix[spaceType]?.[serviceType];
      if (price) {
        return `${formatPrice(price.min)} – ${formatPrice(price.max)}`;
      }
    }
    return 'No seleccionado';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono requerido';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';
    if (!formData.acceptPolicy) newErrors.acceptPolicy = 'Debes aceptar las políticas';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create FormData for submission
      const submitData = new FormData();

      // User data
      submitData.append('Nombre', formData.name);
      submitData.append('Teléfono', formData.phone);
      submitData.append('Dirección', formData.address);
      submitData.append('Mensaje', formData.message || 'Sin mensaje adicional');

      // Service data
      submitData.append('Servicio Solicitado', content.title);
      submitData.append('Tipo de Espacio', spaceType ? spaceTypeLabels[spaceType] : 'No seleccionado');
      submitData.append('Tipo de Servicio', serviceType ? serviceTypeLabels[serviceType] : 'No seleccionado');
      submitData.append('Precio Estimado', getEstimatedPriceText());

      // FormSubmit configuration
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');
      submitData.append('_subject', `Nueva Solicitud de Servicio: ${content.title}`);

      // Send to FormSubmit using fetch
      const response = await fetch('https://formsubmit.co/ajax/myvisioncraftai@gmail.com', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl p-6 border-b border-primary/20 flex items-center justify-between z-10">
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
          {/* Invoice A and B Notice */}
          <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <FileText className="text-green-500 flex-shrink-0" size={24} />
            <div>
              <p className="font-semibold text-foreground">Facturación disponible</p>
              <p className="text-sm text-foreground/70">Emitimos Factura A y Factura B según tu necesidad fiscal.</p>
            </div>
          </div>

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

          {/* Price Estimator */}
          <PriceEstimator
            spaceType={spaceType}
            setSpaceType={setSpaceType}
            serviceType={serviceType}
            setServiceType={setServiceType}
          />

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
          <div className="bg-gradient-to-br from-card to-background/50 p-6 rounded-2xl border border-primary/20 relative">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Solicitar este servicio</h3>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={24} />
                <p className="text-green-500 font-semibold">¡Solicitud enviada con éxito! Nos contactaremos pronto.</p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                <AlertTriangle className="text-red-500" size={24} />
                <p className="text-red-500 font-semibold">Error al enviar. Por favor, intenta de nuevo.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-foreground/80 mb-2">
                  Nombre completo *
                </label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Juan Pérez"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-foreground/80 mb-2">
                  Teléfono *
                </label>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="+54 9 11 0000 0000"
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="modal-address" className="block text-sm font-medium text-foreground/80 mb-2">
                  Dirección *
                </label>
                <input
                  id="modal-address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Calle 123, Buenos Aires"
                  disabled={isSubmitting}
                />
                {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-sm font-medium text-foreground/80 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Ej: 'Tengo cucarachas en la cocina', 'Necesito un servicio urgente', etc."
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="modal-policy"
                  name="policy"
                  type="checkbox"
                  checked={formData.acceptPolicy}
                  onChange={(e) => setFormData({ ...formData, acceptPolicy: e.target.checked })}
                  className="mt-1"
                  disabled={isSubmitting}
                />
                <label htmlFor="modal-policy" className="text-sm text-foreground/70">
                  Acepto las políticas de privacidad y el tratamiento de mis datos
                </label>
              </div>
              {errors.acceptPolicy && <p className="text-destructive text-sm">{errors.acceptPolicy}</p>}

              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 relative z-10"
                disabled={isSubmitting}
                style={{ pointerEvents: 'auto' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Enviando...
                  </>
                ) : (
                  'Enviar solicitud'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
