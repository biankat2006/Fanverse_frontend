import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/users': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/main': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/file': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/bigpicture': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/creator': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/kepek': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
      '/user_pfp': {
        target: 'https://nodejs301.dszcbaross.edu.hu',
        changeOrigin: true,
        secure: false
      },
    }
  }
})
