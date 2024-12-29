import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    vue(),
    crx({ manifest }),
  ],
});