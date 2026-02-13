import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const fleetHealthRemote =
    env.VITE_FLEET_HEALTH_REMOTE_URL ?? 'http://localhost:5001/assets/remoteEntry.js';
  const defectManagementRemote =
    env.VITE_DEFECT_MANAGEMENT_REMOTE_URL ??
    'http://localhost:5002/assets/remoteEntry.js';
  const crewReportingRemote =
    env.VITE_CREW_REPORTING_REMOTE_URL ?? 'http://localhost:5003/assets/remoteEntry.js';

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          fleetHealth: fleetHealthRemote,
          defectManagement: defectManagementRemote,
          crewReporting: crewReportingRemote,
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
