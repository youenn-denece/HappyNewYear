import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // ✅ Import de resolve depuis path

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler' // Pour sass-embedded
            }
        }
    },
    optimizeDeps: {
        include: ['animejs']
    }
})
