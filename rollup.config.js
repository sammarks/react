import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

export default (outputFile, overrides = {}) => ({
  input: 'src/index.ts',
  output: [
    {
      file: outputFile,
      format: 'cjs',
      sourcemap: true
    }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true
    }),
    commonjs(),
    resolve(),
    sourceMaps()
  ],
  ...overrides
})
