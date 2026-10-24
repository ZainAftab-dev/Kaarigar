import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// "npm run build"      -> normal build in dist/ (for hosting)
// "npm run build:demo" -> one single HTML file you can double-click to open
export default defineConfig(({ mode }) => ({
  plugins: mode === 'demo' ? [react(), viteSingleFile()] : [react()],
  base: './',
  build: mode === 'demo' ? { outDir: 'demo' } : {},
}))
