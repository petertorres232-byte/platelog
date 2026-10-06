import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/platelog/', // Ensure this matches your exact GitHub repository name
})