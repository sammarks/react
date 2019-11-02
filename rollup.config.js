import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

export default (packageJson, overrides = {}) => ({
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    }
  ],
  external: Object.keys(packageJson.peerDependencies || {}),
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
