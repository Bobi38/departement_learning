import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'GeoFrance',
        short_name: 'GeoFrance',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1565c0',
        icons: [
          { src: '/android-chrome-192.jpg', sizes: '192x192', type: 'image/jpeg' },
          { src: '/android-chrome-512.jpg', sizes: '512x512', type: 'image/jpeg' },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
      },
    }), 
  ],
  server: {
    port: 6969,
    open: true,
    host: true,
    allowedHosts: ['.sslip.io'],
  },
})
