import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'Frontend',
  publicDir: 'Frontend/public',
  build: {
    outDir: '/dist', 
  },
  plugins: [react()],
});
