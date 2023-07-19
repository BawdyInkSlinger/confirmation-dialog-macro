import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const plugins = () => [
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs({
    include: /node_modules/,
  }),
];

export default [
  {
    input: 'dist_compiled/index.js',
    output: {
      format: 'iife',
      file: 'dist/dialog-element-macro.js',
      name: 'DialogElementMacro',
      sourcemap: true,
    },
    plugins: plugins(),
  },
];
