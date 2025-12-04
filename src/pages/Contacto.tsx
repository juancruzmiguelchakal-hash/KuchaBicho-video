import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const Contacto = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-12 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary">
                Contactanos
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Estamos listos para ayudarte. Escribinos y te respondemos rápido.
            </p>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default Contacto;