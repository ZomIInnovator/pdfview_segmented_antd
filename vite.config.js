import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://rms.region9.dilg.gov.ph/", //http://rms.region9.dilg.gov.ph/ //http://localhost:8000/
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
