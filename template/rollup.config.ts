import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import pkg from './package.json'
import path from 'path'

const production = process.env.BUILD_MODE === 'production'

export default defineConfig({
  input: './lib/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'bundle',
      format: 'umd',
      globals: { lodash: 'lodash' },
      sourcemap: !production
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: !production
    }
  ],
  plugins: [
    json(),
    commonjs(),
    typescript({ typescript: require('ttypescript') }),
    nodeResolve({ browser: true }),
    alias({ entries: { '@': path.resolve(__dirname, './lib') } })
  ].concat(!production ? [] : [terser()]),
  external: ['lodash'],
  watch: { include: 'lib/**' }
})
