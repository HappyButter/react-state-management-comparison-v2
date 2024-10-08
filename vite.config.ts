import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  build: {
    outDir: 'build',
  },
  base: '/react-state-management-comparison-v2/',
});

