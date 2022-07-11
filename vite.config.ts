import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      devOptions: {
        enabled: true
      },
      includeAssets: [
        '/src/icon.png',
        '/src/apple-touch-icon.svg',
        '/src/mask-icon.png'
      ],
      manifest: {
        name: 'HMTIW Senior',
        short_name: 'HMTIW',
        description: 'HMTIW Senior',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/src/icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/src/mask-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
