import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'

const production = process.env.BUILD_MODE === 'production'

export default defineConfig({
  input: './src/index.ts',
  output: {
    format: 'es',
    file: 'dist/tlib-cli.mjs',
    sourcemap: !production
  },
  plugins: [
    commonjs(),
    typescript(),
    nodeResolve(),
    terser()
  ],
  watch: { include: 'src/**' }
})
