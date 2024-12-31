import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    angular(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 4200
  },
  build: {
    target: 'es2015'
  }
});