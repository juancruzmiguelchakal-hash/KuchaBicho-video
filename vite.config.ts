// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Usar rutas relativas para máxima compatibilidad con Vercel y otros hostings.
  base: mode === 'production' ? '' : '/',
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