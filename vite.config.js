import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
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
  },
  build: {
    // outDir: 'dist', // 更改輸出目錄
    rollupOptions: {
      output: {
        assetFileNames: 'adminhub/admin_assets/[name]-[hash][extname]', // 更改 assets 文件路徑
        chunkFileNames: 'adminhub/admin_assets/[name]-[hash].js', // 更改 chunk 文件路徑
        entryFileNames: 'adminhub/admin_assets/[name]-[hash].js', // 更改入口文件路徑
      },
    },
  },
})
