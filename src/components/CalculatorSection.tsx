import { useState, useEffect } from 'react';
import { Calculator, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

const SERVICES = [
    { id: 'desinfeccion', name: 'Desinfección', price: 35000 },
    { id: 'desinsectacion', name: 'Desinsectación', price: 40000 },
    { id: 'desratizacion', name: 'Desratización', price: 45000 },
    { id: 'fumigacion', name: 'Fumigación', price: 38000 },
    { id: 'murcielagos', name: 'Control de murciélagos', price: 75000 },
    { id: 'aves', name: 'Control de aves', price: 60000 },
    { id: 'abejas', name: 'Control de abejas', price: 55000 },
    { id: 'vegetales', name: 'Control de espacios vegetales', price: 50000 },
];

const SPACE_MULTIPLIERS = {
    apartment: { label: 'Departamento / PH (x1)', value: 1 },
    house_small: { label: 'Casa Pequeña (x1.2)', value: 1.2 },
    house_large: { label: 'Casa Grande / Jardín (x1.5)', value: 1.5 },
    commercial: { label: 'Local Comercial (x2)', value: 2 },
    industrial: { label: 'Nave Industrial / Empresa (x3)', value: 3 },
};

const CalculatorSection = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [total, setTotal] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Handle URL hash to pre-select service
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#calculator')) {
                const serviceId = hash.split('=')[1];
                if (serviceId) {
                    setSelectedService(serviceId);
                    // Scroll slightly down to ensure form visibility if needed
                    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Check on mount
        handleHashChange();

        // Listen for changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        if (selectedService && selectedSpace) {
            const service = SERVICES.find(s => s.id === selectedService);
            const multiplier = Object.entries(SPACE_MULTIPLIERS).find(([key]) => key === selectedSpace)?.[1].value;

            if (service && multiplier) {
                setTotal(service.price * multiplier);
            }
        } else {
            setTotal(null);
        }
    }, [selectedService, selectedSpace]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!total || !selectedService || !selectedSpace) return;

        setStatus('submitting');

        const form = e.target as HTMLFormElement;
        const formDataObj = new FormData(form);

        // Add custom fields
        const serviceName = SERVICES.find(s => s.id === selectedService)?.name;
        const spaceLabel = Object.entries(SPACE_MULTIPLIERS).find(([key]) => key === selectedSpace)?.[1].label;

        formDataObj.append('Servicio Seleccionado', serviceName || '');
        formDataObj.append('Tipo de Espacio', spaceLabel || '');
        formDataObj.append('Presupuesto Estimado', `$${total.toLocaleString('es-AR')}`);

        try {
            const response = await fetch('https://formsubmit.co/ajax/kuchabicho@gmail.com', {
                method: 'POST',
                body: formDataObj
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setSelectedSpace('');
                setSelectedService('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="calculator" className="py-20 bg-gradient-to-br from-card to-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary mb-4 animate-fade-in">
                        <Calculator size={16} />
                        <span className="font-semibold">Cotizador Online</span>
                    </div>
                    <h2 className="section-title">Calculá tu Presupuesto</h2>
                    <p className="text-xl text-foreground/70 mt-4 max-w-2xl mx-auto">
                        Obtené un estimado inmediato y envianos tu solicitud para coordinar una visita.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Calculator Controls */}
                    <div className="bg-card/80 backdrop-blur-md p-8 rounded-3xl border border-border shadow-xl">
                        <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                            Datos del Servicio
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-2">Seleccioná el Servicio</label>
                                <select
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                >
                                    <option value="">Seleccionar...</option>
                                    {SERVICES.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} - Desde ${s.price.toLocaleString('es-AR')}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-2">Tamaño del Lugar</label>
                                <select
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    value={selectedSpace}
                                    onChange={(e) => setSelectedSpace(e.target.value)}
                                >
                                    <option value="">Seleccionar...</option>
                                    {Object.entries(SPACE_MULTIPLIERS).map(([key, { label }]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            {total !== null && (
                                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-yellow-500/10 rounded-2xl border border-primary/20 animate-fade-in">
                                    <p className="text-center text-foreground/60 mb-2">Total Estimado</p>
                                    <p className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-600">
                                        ${total.toLocaleString('es-AR')}
                                    </p>
                                    <p className="text-xs text-center text-foreground/40 mt-2">*Precio sujeto a inspección final.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form */}
                    <div className={`bg-card/80 backdrop-blur-md p-8 rounded-3xl border border-border shadow-xl transition-all duration-500 ${total ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none grayscale'}`}>
                        <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                            Envianos tu Consulta
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* FormSubmit Configuration */}
                            <input type="hidden" name="_subject" value="Nuevo Pedido Kuchabicho" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_cc" value="kuchabicho@gmail.com" />

                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre Completo"
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Teléfono / WhatsApp"
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Mensaje adicional (Opcional)"
                                    rows={3}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            {status === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-600 animate-fade-in">
                                    <CheckCircle2 size={20} />
                                    <p className="font-medium">¡Presupuesto enviado correctamente!</p>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-600 animate-fade-in">
                                    <AlertTriangle size={20} />
                                    <p className="font-medium">Hubo un error al enviar. Intenta nuevamente.</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'submitting' || !total}
                                className="btn-gold w-full flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Enviar Presupuesto
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalculatorSection;
