import ts from "rollup-plugin-ts";

const plugins = () => [
  ts({
    transpiler: "typescript"
  })
];

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'iife',
      file: 'dist/dialog-element-macro.js',
      name: 'DialogElementMacro',
      sourcemap: true,
    },
    plugins: plugins(),
  },
];
