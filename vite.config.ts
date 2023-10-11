import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import dotenvExpand from 'dotenv-expand';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // This check is important!
  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '');
    dotenvExpand({ parsed: env });
  }

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
