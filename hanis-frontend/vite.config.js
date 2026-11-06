import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, anything starting with /api is forwarded to your backend,
// so you don't have to deal with CORS. Change the target to your server's port.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "https://hanis-backend.onrender.com", changeOrigin: true },
    },
  },
});
