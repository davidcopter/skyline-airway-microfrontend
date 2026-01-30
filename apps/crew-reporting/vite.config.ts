import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    federation({
      name: 'crewReporting',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.svelte',
      },
      shared: ['svelte'],
    }),
  ],
  server: {
    port: 5003,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
