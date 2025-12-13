import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "./components/Header";

import Index from "./pages/Index";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
      }, 2000); // 2 segundos
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          {/* La etiqueta <main> es semánticamente importante para el contenido principal */}
          {/* El padding top (pt-28) asegura que el contenido no quede oculto por el Header fijo */}
          <main className="pt-28">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;