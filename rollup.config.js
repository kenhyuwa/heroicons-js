import { babel } from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './main.js',
  output: [
    {
      file: 'dist/heroicons.cjs.js',
      format: 'cjs',
      name: 'heroicons',
      exports: 'auto',
    },
    {
      file: 'dist/heroicons.min.js',
      format: 'iife',
      name: 'heroicons',
    },
    {
      file: 'dist/heroicons.umd.js',
      format: 'umd',
      name: 'heroicons',
    },
  ],
  plugins: [babel({ babelHelpers: 'bundled' }), commonjs()],
};
