import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Shield, FileText, Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

// Service Configuration
const SERVICES_DATA: Record<string, any> = {
  desinfeccion: {
    title: 'Desinfección',
    description: 'Eliminación de virus y bacterias para asegurar un ambiente saludable y libre de patógenos.',
    basePrice: 8000,
    benefits: ['Certificado de desinfección', 'Productos seguros para humanos', 'Elimina COVID-19 y gripe', 'Secado rápido'],
    time: '1-2 horas',
    warranty: 'Certificado oficial',
  },
  desinsectacion: {
    title: 'Desinsectación',
    description: 'Control efectivo de todo tipo de insectos rastreros y voladores (cucarachas, hormigas, mosquitos).',
    basePrice: 12000,
    benefits: ['Gel cebo de larga duración', 'Sin olor', 'No requiere vaciar alacenas', 'Efecto residual'],
    time: '1-3 horas',
    warranty: '60 días',
  },
  desratizacion: {
    title: 'Desratización',
    description: 'Eliminación segura y garantizada de roedores mediante cebos de alta atracción y seguridad.',
    basePrice: 15000,
    benefits: ['Cebos de seguridad con llave', 'Seguro para mascotas', 'Identificación de accesos', 'Seguimiento'],
    time: '2-3 horas',
    warranty: '90 días',
  },
  fumigacion: {
    title: 'Fumigación',
    description: 'Servicio general preventivo y correctivo para múltiples plagas en hogares y comercios.',
    basePrice: 10000,
    benefits: ['Cobertura amplia', 'Prevención de infestaciones', 'Productos de banda verde', 'Certificado municipal'],
    time: '2-4 horas',
    warranty: '60 días',
  },
  murcielagos: {
    title: 'Control de murciélagos',
    description: 'Erradicación ética y segura, exclusión y sellado de puntos de ingreso.',
    basePrice: 20000,
    benefits: ['Protocolo de exclusión (sin matar)', 'Sellado de ingresos', 'Limpieza de guano', 'Desinfección de zona'],
    time: '1-2 jornadas',
    warranty: '1 año',
  },
  aves: {
    title: 'Control de aves',
    description: 'Soluciones para evitar el anidamiento y presencia de palomas y otras aves (redes, pinches).',
    basePrice: 18000,
    benefits: ['Instalación de redes invisible', 'Pinches antiviposamiento', 'Limpieza de áreas afectadas', 'Materiales resistentes UV'],
    time: 'Según superficie',
    warranty: '2 años en redes',
  },
  abejas: {
    title: 'Control de abejas',
    description: 'Manejo seguro y traslado de panales y enjambres por personal capacitado.',
    basePrice: 16000,
    benefits: ['Retiro de panal', 'Traslado seguro', 'Sellado de huecos', 'Seguridad total'],
    time: '2-4 horas',
    warranty: 'Garantía de retiro',
  },
  vegetales: {
    title: 'Control de espacios vegetales',
    description: 'Control de plagas específicas en jardines, parques y espacios verdes.',
    basePrice: 14000,
    benefits: ['Cuidado de especies vegetales', 'Productos sistémicos', 'Control de hormiga podadora', 'Fertilización opcional'],
    time: 'Según extensión',
    warranty: '30 días',
  },
  empresas: {
    title: 'Empresas e Industrias',
    description: 'Control y reporte estratégico mensual de plagas con certificación avalada por ingeniero agrónomo.',
    benefits: ['Reportes mensuales detallados', 'Certificación de ingeniero agrónomo', 'Plan de control personalizado', 'Monitoreo continuo'],
    time: 'A convenir',
    warranty: 'Según contrato',
  },
};

const SPACE_MULTIPLIERS = {
  apartment: { label: 'Departamento / PH', value: 1 },
  house_small: { label: 'Casa Pequeña', value: 1.2 },
  house_large: { label: 'Casa Grande / Jardín', value: 1.5 },
  commercial: { label: 'Local Comercial', value: 2 },
  industrial: { label: 'Industrial / Empresa', value: 3 },
};

const ServiceModal = ({ isOpen, onClose, serviceId }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    spaceType: '',
    locality: '',
    street: '',
    number: '',
    // Campos para empresas
    companyName: '',
    responsableName: '',
    availability: '',
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const service = SERVICES_DATA[serviceId] || SERVICES_DATA.desratizacion;
  const isEmpresasService = serviceId === 'empresas';

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
      setFormData({ 
        name: '', phone: '', email: '', message: '', spaceType: '', locality: '', street: '', number: '',
        companyName: '', responsableName: '', availability: ''
      });
      setEstimatedPrice(null);
      setSubmitStatus('idle');
      setErrors({});
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
    
    // Validación según el tipo de servicio
    const newErrors: Record<string, string> = {};
    
    if (isEmpresasService) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Campo requerido';
      if (!formData.responsableName.trim()) newErrors.responsableName = 'Campo requerido';
      if (!formData.email.trim()) newErrors.email = 'Campo requerido';
      if (!formData.message.trim()) newErrors.message = 'Campo requerido';
      if (!formData.availability.trim()) newErrors.availability = 'Campo requerido';
    } else {
      if (!formData.name.trim()) newErrors.name = 'Campo requerido';
      if (!formData.email.trim()) newErrors.email = 'Campo requerido';
      if (!formData.spaceType) newErrors.spaceType = 'Selecciona una opción';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setSubmitStatus('submitting');

    // Preparation for FormData
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    // Add calculated fields
    if (!isEmpresasService) {
      const spaceLabel = Object.entries(SPACE_MULTIPLIERS).find(([key]) => key === formData.spaceType)?.[1].label || 'No especificado';
      data.append('Servicio', service.title);
      data.append('Espacio', spaceLabel);
      data.append('Presupuesto Estimado', estimatedPrice ? `$${estimatedPrice.toLocaleString('es-AR')}` : 'A confirmar');
    } else {
      data.append('Tipo de Consulta', 'Servicio a Empresas e Industrias');
      data.append('Empresa', formData.companyName);
      data.append('Responsable', formData.responsableName);
      data.append('Disponibilidad', formData.availability);
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/kuchabicho@gmail.com', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
        }, 1500);
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
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">{service.title}</h2>
            <button onClick={onClose} className="md:hidden p-2 hover:bg-black/5 rounded-full"><X size={24} /></button>
          </div>

          <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>

          <div className="space-y-6">
            {/* Beneficios */}
            {service.benefits && service.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Beneficios
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-foreground/70 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tiempo y Garantía */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/30">
              <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Clock size={18} /> <span className="font-bold text-sm">Tiempo</span>
                </div>
                <p className="text-foreground/80 text-sm font-medium">{service.time}</p>
              </div>

              <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Shield size={18} /> <span className="font-bold text-sm">Garantía</span>
                </div>
                <p className="text-foreground/80 text-sm font-medium">{service.warranty}</p>
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
        <div className="md:w-1/2 p-8 pb-32 relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="hidden md:block absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={24} className="text-foreground/50" />
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <FileText className="text-primary" /> {isEmpresasService ? 'Solicitud de Servicio' : 'Cotizadora'}
            </h3>
            {!isEmpresasService && <p className="text-sm text-foreground/60">Seleccioná el tamaño para ver el precio estimado.</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden Fields for FormSubmit */}
            <input type="hidden" name="_subject" value="Nuevo Pedido Kuchabicho" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_cc" value="kuchabicho@gmail.com" />

            {isEmpresasService ? (
              /* Empresas Form */
              <>
                <div>
                    <label className="block text-sm font-medium mb-2">Nombre de la Empresa *</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Ej: Tech Solutions SA"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                      errors.companyName ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Responsable/Contacto *</label>
                  <input
                    type="text"
                    name="responsableName"
                    placeholder="Nombre de la persona responsable"
                    value={formData.responsableName}
                    onChange={(e) => setFormData({ ...formData, responsableName: e.target.value })}
                    className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                      errors.responsableName ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.responsableName && <p className="text-red-500 text-xs mt-1">{errors.responsableName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="correo@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                        errors.email ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono (Opcional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+54 11 2345-6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descripción del Servicio *</label>
                  <textarea
                    name="message"
                    placeholder="Describe el problema o servicio que necesitas..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none ${
                      errors.message ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Disponibilidad *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                      errors.availability ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="lunes-miercoles">Lunes a Miércoles</option>
                    <option value="jueves-viernes">Jueves a Viernes</option>
                    <option value="lunes-viernes">Lunes a Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="a-convenir">A convenir</option>
                  </select>
                  {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                </div>
              </>
            ) : (
              /* Regular Service Form */
              <>
                <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                  <label className="block text-sm font-medium mb-2">Tipo de Espacio *</label>
                  <select
                    name="spaceType"
                    value={formData.spaceType}
                    onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                    className={`w-full p-3 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                      errors.spaceType ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Seleccionar...</option>
                    {Object.entries(SPACE_MULTIPLIERS).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  {errors.spaceType && <p className="text-red-500 text-xs mt-1">{errors.spaceType}</p>}

                  {estimatedPrice && (
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center animate-fade-in">
                      <span className="text-foreground/70 font-medium">Total Estimado:</span>
                      <span className="text-2xl font-bold text-primary">${estimatedPrice.toLocaleString('es-AR')}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Tu teléfono"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                        errors.phone ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3 bg-background/50 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                        errors.email ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Localidad *</label>
                  <input
                    type="text"
                    name="locality"
                    placeholder="Tu localidad"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="street"
                    placeholder="Calle"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="col-span-1 sm:col-span-2 w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    name="number"
                    placeholder="Altura"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Detalles Adicionales</label>
                  <textarea
                    name="message"
                    placeholder="¿Algún detalle adicional?"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                  />
                </div>
              </>
            )}

            {/* Agenda tu visita Button */}
            <a
              href="https://calendly.com/beepbeepdeliverygroupsv/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 bg-card border border-primary/30 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all group"
            >
              <Calendar className="text-primary group-hover:scale-110 transition-transform" size={20} />
              <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">Agendá tu visita</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-1">Recomendado</span>
            </a>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitStatus === 'submitting' || (!isEmpresasService && !estimatedPrice)}
              className="w-full btn-gold py-4 rounded-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all"
            >
              {submitStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {submitStatus === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
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
