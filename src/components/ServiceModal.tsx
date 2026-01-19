import { useEffect, useState } from 'react';
import { X, CheckCircle2, Clock, Shield, FileText, Calculator, AlertTriangle, Loader2, CircleDollarSign, Send } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

// Service Configuration with Base Prices
const SERVICES_DATA: Record<string, any> = {
  desinfeccion: {
    title: 'Desinfección',
    description: 'Eliminación de virus y bacterias para asegurar un ambiente saludable y libre de patógenos.',
    basePrice: 35000,
    benefits: ['Certificado de desinfección', 'Productos seguros para humanos', 'Elimina COVID-19 y gripe', 'Secado rápido'],
    time: '1-2 horas',
    warranty: 'Certificado oficial'
  },
  desinsectacion: {
    title: 'Desinsectación',
    description: 'Control efectivo de todo tipo de insectos rastreros y voladores (cucarachas, hormigas, mosquitos).',
    basePrice: 40000,
    benefits: ['Gel cebo de larga duración', 'Sin olor', 'No requiere vaciar alacenas', 'Efecto residual'],
    time: '1-3 horas',
    warranty: '60 días'
  },
  desratizacion: {
    title: 'Desratización',
    description: 'Eliminación segura y garantizada de roedores mediante cebos de alta atracción y seguridad.',
    basePrice: 45000,
    benefits: ['Cebos de seguridad con llave', 'Seguro para mascotas', 'Identificación de accesos', 'Seguimiento'],
    time: '2-3 horas',
    warranty: '90 días'
  },
  fumigacion: {
    title: 'Fumigación',
    description: 'Servicio general preventivo y correctivo para múltiples plagas en hogares y comercios.',
    basePrice: 38000,
    benefits: ['Cobertura amplia', 'Prevención de infestaciones', 'Productos de banda verde', 'Certificado municipal'],
    time: '2-4 horas',
    warranty: '60 días'
  },
  murcielagos: {
    title: 'Control de murciélagos',
    description: 'Erradicación ética y segura, exclusión y sellado de puntos de ingreso.',
    basePrice: 75000,
    benefits: ['Protocolo de exclusión (sin matar)', 'Sellado de ingresos', 'Limpieza de guano', 'Desinfección de zona'],
    time: '1-2 jornadas',
    warranty: '1 año'
  },
  aves: {
    title: 'Control de aves',
    description: 'Soluciones para evitar el anidamiento y presencia de palomas y otras aves (redes, pinches).',
    basePrice: 60000,
    benefits: ['Instalación de redes invisible', 'Pinches antiviposamiento', 'Limpieza de áreas afectadas', 'Materiales resistentes UV'],
    time: 'Según superficie',
    warranty: '2 años en redes'
  },
  abejas: {
    title: 'Control de abejas',
    description: 'Manejo seguro y traslado de panales y enjambres por personal capacitado.',
    basePrice: 55000,
    benefits: ['Retiro de panal', 'Traslado seguro', 'Sellado de huecos', 'Seguridad total'],
    time: '2-4 horas',
    warranty: 'Garantía de retiro'
  },
  vegetales: {
    title: 'Control de espacios vegetales',
    description: 'Control de plagas específicas en jardines, parques y espacios verdes.',
    basePrice: 50000,
    benefits: ['Cuidado de especies vegetales', 'Productos sistémicos', 'Control de hormiga podadora', 'Fertilización opcional'],
    time: 'Según extensión',
    warranty: '30 días'
  }
};

const SPACE_MULTIPLIERS = {
  apartment: { label: 'Departamento / PH', value: 1 },
  house_small: { label: 'Casa Pequeña', value: 1.2 },
  house_large: { label: 'Casa Grande / Jardín', value: 1.5 },
  commercial: { label: 'Local Comercial', value: 2 },
  industrial: { label: 'Industrial / Galpón', value: 3 },
};

const ServiceModal = ({ isOpen, onClose, serviceId }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    spaceType: '',
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const service = SERVICES_DATA[serviceId] || SERVICES_DATA.desratizacion;

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

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', phone: '', email: '', message: '', spaceType: '' });
      setEstimatedPrice(null);
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.spaceType) {
      const multiplier = Object.entries(SPACE_MULTIPLIERS).find(([key]) => key === formData.spaceType)?.[1].value || 1;
      setEstimatedPrice(service.basePrice * multiplier);
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.spaceType, service.basePrice]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    // Preparation for FormData
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    // Add calculated fields
    const spaceLabel = Object.entries(SPACE_MULTIPLIERS).find(([key]) => key === formData.spaceType)?.[1].label || 'No especificado';
    data.append('Servicio', service.title);
    data.append('Espacio', spaceLabel);
    data.append('Presupuesto Estimado', estimatedPrice ? `$${estimatedPrice.toLocaleString('es-AR')}` : 'A confirmar');

    try {
      const response = await fetch('https://formsubmit.co/ajax/kuchabicho@gmail.com', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => onClose(), 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="glass-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-border animate-fade-in-up flex flex-col md:flex-row">

        {/* Left Column: Info */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-primary/5 to-background border-r border-border/50">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">{service.title}</h2>
            <button onClick={onClose} className="md:hidden p-2 hover:bg-black/5 rounded-full"><X size={24} /></button>
          </div>

          <p className="text-lg text-foreground/80 mb-6 leading-relaxed">{service.description}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-primary" size={20} /> Beneficios
              </h3>
              <ul className="space-y-2">
                {service.benefits.map((b: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-foreground/70 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">

              <div className="flex-1 p-4 bg-white/50 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-1 text-primary">
                  <Clock size={18} /> <span className="font-bold text-sm">Tiempo</span>
                </div>
                <p className="text-foreground/80 text-sm">{service.time}</p>
              </div>

              <div className="flex-1 p-4 bg-white/50 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-1 text-primary">
                  <Shield size={18} /> <span className="font-bold text-sm">Garantía</span>
                </div>
                <p className="text-foreground/80 text-sm">{service.warranty}</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-sm font-semibold text-primary flex items-center gap-2">
                <FileText size={18} /> Emitimos Factura A y B
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Calculator & Form */}
        <div className="md:w-1/2 p-8 relative">
          <button onClick={onClose} className="hidden md:block absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={24} className="text-foreground/50" />
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Calculator className="text-primary" /> Cotizadora
            </h3>
            <p className="text-sm text-foreground/60">Seleccioná el tamaño para ver el precio estimado.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden Fields for FormSubmit */}
            <input type="hidden" name="_subject" value="Nuevo Pedido Kuchabicho" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_cc" value="kuchabicho@gmail.com" />

            {/* Calculator Input */}
            <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
              <label className="block text-sm font-medium mb-2">Tipo de Espacio</label>
              <select
                value={formData.spaceType}
                onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              >
                <option value="">Seleccionar...</option>
                {Object.entries(SPACE_MULTIPLIERS).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              {estimatedPrice && (
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center animate-fade-in">
                  <span className="text-foreground/70 font-medium">Total Estimado:</span>
                  <span className="text-2xl font-bold text-primary">${estimatedPrice.toLocaleString('es-AR')}</span>
                </div>
              )}
            </div>

            {/* Contact Fields */}
            <div>
              <input type="text" name="name" placeholder="Nombre completo" required
                className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="tel" name="phone" placeholder="Teléfono" required
                className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input type="email" name="email" placeholder="Email" required
                className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <textarea name="message" placeholder="¿Algún detalle adicional?" rows={2}
                className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitStatus === 'submitting' || !estimatedPrice}
              className="w-full btn-gold py-4 rounded-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all"
            >
              {submitStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {submitStatus === 'submitting' ? 'Enviando...' : 'Enviar Presupuesto'}
            </button>

            {/* Feedback Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/10 text-green-600 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> ¡Solicitud enviada con éxito!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-3 bg-red-500/10 text-red-600 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2">
                <AlertTriangle size={16} /> Hubo un error. Intenta nuevamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
