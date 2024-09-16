import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstap'),
    }
  },
  plugins: [react()],
  server: {
    hot: true,
    proxy: {
      '/members': {
        target: 'http://127.0.0.1:5000',  // Your Flask server
        changeOrigin: true,
      },
    },
  },
})
