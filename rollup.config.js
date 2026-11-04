export default {
  input: 'src/cli.mjs',
  output: { file: 'package/lib/stripe.mjs', format: 'es', inlineDynamicImports: true },
  external: id => id.startsWith('node:')
};
