import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  // ... 其他配置
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      extensions: ['.js', '.ts']
    })
  ],
  external: ['lodash-es']
};
