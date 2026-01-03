import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/HappyNewYear/',
  build: {
    outDir: 'dist'
  }
})