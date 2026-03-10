import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'lib/cjs',
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
    splitting: false,
    loader: {
      '.json': 'copy',
    },
  },
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    outDir: 'lib/esm',
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
    splitting: false,
    loader: {
      '.json': 'copy',
    },
  }
]);
