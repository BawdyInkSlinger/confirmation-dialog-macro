import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'iife',
      file: 'dist/dialog-element-macro.js',
      name: 'DialogElementMacro',
      sourcemap: true,
      footer: 'window.DialogElementMacro = DialogElementMacro;'
    },
    plugins: [typescript()],
  },
];