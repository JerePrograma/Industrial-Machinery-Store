import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Add this section to allow ngrok hosts
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app', // This will allow any subdomain of ngrok-free.app
    ],
  },
  build: {
    outDir: 'dist',
  },
});