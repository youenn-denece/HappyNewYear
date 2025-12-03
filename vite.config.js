
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // ✅ module Node.js natif

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src') // ✅ fonctionne correctement
        }
    }
})

