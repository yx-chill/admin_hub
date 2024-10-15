import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/variables.scss";`
      }
    }
  },
  server: {
    port: '5173',
    proxy: {
      '/base': {
        target: 'https://adminhub.sally-handmade.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/base/, '')
      },
      '/api': {
        target: 'https://adminhub.sally-handmade.com/api/v1/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
