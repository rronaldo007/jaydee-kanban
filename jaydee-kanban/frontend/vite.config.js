import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le proxy redirige les appels /api vers le serveur Express (port 3001).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
