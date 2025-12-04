// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ********** CORRECCIÓN PARA GITHUB PAGES **********
  // Añadimos la base para que Vite compile con la ruta del repositorio.
  base: '/KuchaBicho-video/',
  // ****************************************************

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