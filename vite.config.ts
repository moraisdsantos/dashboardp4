import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo do GitHub (o nome depois do usuário)
const repoName = 'p4dashboard'

export default defineConfig(({ command }) => {
  // Em dev (npm run dev): usa "/" pra funcionar local
  // Em build (npm run build): usa "/p4dashboard/" pra funcionar no GitHub Pages
  const base = command === 'build' ? `/${repoName}/` : '/'

  return {
    base,
    plugins: [react()],
  }
})
