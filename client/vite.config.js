import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://ticketing-production-9166.up.railway.app/'
      // '/api': 'http://localhost:4000'
    }
  },
  plugins: [react()],
})




export  {

}