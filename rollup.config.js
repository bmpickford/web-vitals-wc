import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'dist/index.js',
  plugins: [
      resolve()
  ],
  output: [
    {
      file: pkg.module,
      format: 'es'
    }
  ]
}