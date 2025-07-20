import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
<<<<<<< HEAD
    define: {
      [isDev ? 'global' : '_global']: {},
    },
    root: 'src',
    base: isDev ? '' : '/goit-js-hw-10/',
    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
=======
    root: 'src',
    base: isDev ? '' : '/goit-js-hw-10/',
    server: {
      fs: {
        allow: ['..']
      }
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/index.html'),
          timer: resolve(__dirname, 'src/1-timer.html'),
          snackbar: resolve(__dirname, 'src/2-snackbar.html')
        },
>>>>>>> 4506e30d5b3a3943e96724eddef1f0c49d3e638a
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
<<<<<<< HEAD
          entryFileNames(chunkInfo) {
            if (chunkInfo.name === 'commonHelpers') return 'commonHelpers.js';
            return '[name].js';
          },
          assetFileNames(assetInfo) {
            if (assetInfo.name?.endsWith('.html')) return '[name].[ext]';
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
=======
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    },
    plugins: []
>>>>>>> 4506e30d5b3a3943e96724eddef1f0c49d3e638a
  };
});