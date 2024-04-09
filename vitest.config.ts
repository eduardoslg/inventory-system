import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    useAtomics: true,
    threads: false,
    include: ['**/*.{test,spec,test.integration}.?(c|m)[t]s?(x)'],
    setupFiles: ['./vitest.setup.ts'],
    // environmentMatchGlobs: [['src/**/*test.ts', 'mariadb']], // Files to use mongoose environment
  },
})
