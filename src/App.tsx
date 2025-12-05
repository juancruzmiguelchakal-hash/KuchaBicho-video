import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

// 1. IMPORTAMOS EL HEADER (Asegurate que la ruta sea correcta)
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* 💥 CORRECCIÓN FINAL: Añadimos basename para React Router */}
      <BrowserRouter basename="/KuchaBicho-video">

        {/* 2. AGREGAMOS EL HEADER ACÁ (Adentro del Router, afuera de las rutas) */}
        <Header />

        {/* 3. AGREGAMOS EL MAIN CON EL PADDING PARA BAJAR EL CONTENIDO */}
        {/* Usamos pt-28 (112px) para asegurar que el contenido esté debajo del Header fijo. */}
        <main className="pt-28">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;