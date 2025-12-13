// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Para un despliegue en un dominio propio (ej. kuchabicho.com), la base debe ser '/'
  base: '/',
  build: {
    // El directorio de salida estándar es 'dist'. 'docs' se usa para GitHub Pages.
    outDir: 'dist',
  },

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));