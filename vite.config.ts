import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages de repo = https://usuario.github.io/NOME-DO-REPO/
const repo = 'p4dashboard'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${repo}/` : '/',
  plugins: [react()],
})
