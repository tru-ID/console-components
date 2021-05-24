import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'tru_console_components',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...Object.keys(pkg.peerDependencies),
        ...Object.keys(pkg.dependencies),
      ],
    },
  },
})
