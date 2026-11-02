import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path"; // 1. Added for path resolution

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 2. Maps the '@/' path to your 'apps/web/' root folder
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 5173,
    // The Express API runs on port 4000. Sending /api through Vite keeps the
    // browser on one origin, so the session cookie works without CORS.
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
