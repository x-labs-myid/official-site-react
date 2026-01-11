import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const logger = createLogger();
const originalWarn = logger.warn;

logger.warn = (msg, options) => {
  if (msg.includes("Unknown at rule: @property")) return;
  if (msg.includes("Found 1 warning while optimizing generated CSS")) return;
  originalWarn(msg, options);
};

// https://vite.dev/config/
export default defineConfig({
  customLogger: logger,
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    cssTarget: "chrome100",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          editor: ["jodit-react"],
          forms: ["react-hook-form", "zod", "@hookform/resolvers"],
        },
      },
    },
  },
});
