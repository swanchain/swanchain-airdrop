import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { execSync } from 'child_process';

function getGitCommitHash() {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch (e) {
    console.warn('Git unknown');
    return 'unknown';
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/js/[name]-[hash].${getGitCommitHash()}.js`,
        chunkFileNames: `assets/js/[name]-[hash].${getGitCommitHash()}.js`,
        assetFileNames(assetInfo: any) {
          if (assetInfo.name.endsWith('.css')) {
            return `assets/css/[name]-[hash].${getGitCommitHash()}.css`
          }
          else if (
            ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].some((ext) =>
              assetInfo.name.endsWith(ext)
            )
          ) {
            return `assets/img/[name]-[hash].${getGitCommitHash()}.[ext]`
          }
          else if (['.mp4'].some((ext) => assetInfo.name.endsWith(ext))) {
            return `assets/video/[name]-[hash].${getGitCommitHash()}.[ext]`
          }
          else if (['.otf'].some((ext) => assetInfo.name.endsWith(ext))) {
            return `assets/font/[name]-[hash].${getGitCommitHash()}.[ext]`
          }
          else {
            return `assets/[name]-[hash].${getGitCommitHash()}.[ext]`
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-import.d.ts',
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
