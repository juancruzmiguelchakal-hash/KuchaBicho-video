// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Rutas correctas para GitHub Pages
  base: '/KuchaBicho-video/',

  // ******** AÑADE ESTE BLOQUE ***********
  build: {
    outDir: 'docs', // Le dice a Vite que compile en la carpeta 'docs'
  },
  // **************************************

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      // ⬇️ MODIFICAR AQUÍ ⬇️
      "@/": path.resolve(__dirname, "./src/") + '/', // Asegúrate de que termine en /
    },
  },
}));