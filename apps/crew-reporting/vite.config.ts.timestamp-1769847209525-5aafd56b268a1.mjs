// vite.config.ts
import { defineConfig } from "file:///Users/copter/Code/POCs/skyline-airway-microfrontend/node_modules/.pnpm/vite@5.4.21_@types+node@25.1.0_terser@5.46.0/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/copter/Code/POCs/skyline-airway-microfrontend/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@3.1.2_svelte@4.2.20_vite@5.4.21_@types+node@25.1.0_terser@5.46.0_/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import federation from "file:///Users/copter/Code/POCs/skyline-airway-microfrontend/node_modules/.pnpm/@originjs+vite-plugin-federation@1.4.1/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
import { VitePWA } from "file:///Users/copter/Code/POCs/skyline-airway-microfrontend/node_modules/.pnpm/vite-plugin-pwa@1.2.0_vite@5.4.21_@types+node@25.1.0_terser@5.46.0__workbox-build@7.4.0_e4f7e28b1eb6c0dc4c610f67cdaa9442/node_modules/vite-plugin-pwa/dist/index.js";
import { fileURLToPath, URL } from "url";
var __vite_injected_original_import_meta_url = "file:///Users/copter/Code/POCs/skyline-airway-microfrontend/apps/crew-reporting/vite.config.ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      manifest: {
        name: "Skyline Crew Reporting",
        short_name: "Skyline Reporting",
        description: "Offline snag submission for Skyline crew members",
        theme_color: "#0ea5e9",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: "module"
      }
    }),
    federation({
      name: "crewReporting",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.ts"
      },
      shared: ["svelte"]
    })
  ],
  server: {
    port: 5003,
    strictPort: true
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY29wdGVyL0NvZGUvUE9Dcy9za3lsaW5lLWFpcndheS1taWNyb2Zyb250ZW5kL2FwcHMvY3Jldy1yZXBvcnRpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jb3B0ZXIvQ29kZS9QT0NzL3NreWxpbmUtYWlyd2F5LW1pY3JvZnJvbnRlbmQvYXBwcy9jcmV3LXJlcG9ydGluZy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY29wdGVyL0NvZGUvUE9Dcy9za3lsaW5lLWFpcndheS1taWNyb2Zyb250ZW5kL2FwcHMvY3Jldy1yZXBvcnRpbmcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjtcbmltcG9ydCBmZWRlcmF0aW9uIGZyb20gXCJAb3JpZ2luanMvdml0ZS1wbHVnaW4tZmVkZXJhdGlvblwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJ1cmxcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBzdmVsdGUoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICBpbmplY3RSZWdpc3RlcjogXCJhdXRvXCIsXG4gICAgICBzdHJhdGVnaWVzOiBcImluamVjdE1hbmlmZXN0XCIsXG4gICAgICBzcmNEaXI6IFwic3JjXCIsXG4gICAgICBmaWxlbmFtZTogXCJzdy50c1wiLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJTa3lsaW5lIENyZXcgUmVwb3J0aW5nXCIsXG4gICAgICAgIHNob3J0X25hbWU6IFwiU2t5bGluZSBSZXBvcnRpbmdcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiT2ZmbGluZSBzbmFnIHN1Ym1pc3Npb24gZm9yIFNreWxpbmUgY3JldyBtZW1iZXJzXCIsXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiMwZWE1ZTlcIixcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwicHdhLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcInB3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogXCJtb2R1bGVcIixcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZmVkZXJhdGlvbih7XG4gICAgICBuYW1lOiBcImNyZXdSZXBvcnRpbmdcIixcbiAgICAgIGZpbGVuYW1lOiBcInJlbW90ZUVudHJ5LmpzXCIsXG4gICAgICBleHBvc2VzOiB7XG4gICAgICAgIFwiLi9tb3VudFwiOiBcIi4vc3JjL21vdW50LnRzXCIsXG4gICAgICB9LFxuICAgICAgc2hhcmVkOiBbXCJzdmVsdGVcIl0sXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUwMDMsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBtb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBZLFNBQVMsb0JBQW9CO0FBQ3ZhLFNBQVMsY0FBYztBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGVBQWU7QUFDeEIsU0FBUyxlQUFlLFdBQVc7QUFKcU4sSUFBTSwyQ0FBMkM7QUFPelMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsUUFBUSxDQUFDLFFBQVE7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxJQUNmLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
