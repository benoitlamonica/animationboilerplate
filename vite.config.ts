import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // Src alias for absolute imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})