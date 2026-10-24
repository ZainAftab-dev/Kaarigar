import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// "npm run build"      -> production build in dist/ (deployed on Vercel)
// "npm run build:demo" -> one single HTML file you can double-click to open
export default defineConfig(({ mode }) => mode === 'demo'
  ? { plugins: [react(), viteSingleFile()], base: './', build: { outDir: 'demo' } }
  : { plugins: [react()], base: '/' })
