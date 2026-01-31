import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          fleetHealth: `http://localhost:5001/${isDev ? '' : 'assets/'}remoteEntry.js`,
          defectManagement: `http://localhost:5002/${isDev ? '' : 'assets/'}remoteEntry.js`,
          crewReporting: `http://localhost:5003/${isDev ? '' : 'assets/'}remoteEntry.js`,
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ],
    server: {
      port: 5000,
      strictPort: true,
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});
