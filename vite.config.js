import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~assets': path.resolve(__dirname, 'src/assets'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~guards': path.resolve(__dirname, 'src/guards'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~pages': path.resolve(__dirname, 'src/pages'),
      '~redux': path.resolve(__dirname, 'src/redux'),
      '~services': path.resolve(__dirname, 'src/services'),
      '~settings': path.resolve(__dirname, 'src/settings'),
      '~utils': path.resolve(__dirname, 'src/utils'),
      '~adapters': path.resolve(__dirname, 'src/adapters'),
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
