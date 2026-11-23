import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Относительные пути к ассетам, чтобы сборка работала и в корне домена,
  // и в подпапке вида https://<username>.github.io/<repo-name>/
  base: './',
})
