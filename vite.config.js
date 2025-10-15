import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    allowedHosts: [
      'final-project-2-nb0a.onrender.com'
    ]
  },
  preview: {
    port: process.env.PORT || 10000,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});