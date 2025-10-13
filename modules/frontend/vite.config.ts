import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo (solo las que empiezan con VITE_)
  loadEnv(mode, process.cwd(), 'VITE_')

  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/ui'),
      },
    },
    build: {
      outDir: 'dist-react',
    },
  }
})
