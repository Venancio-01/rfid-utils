import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";

const libName = "rfid-utils"

export default [
  {
    input: 'src/index.ts',  // 入口文件
    output: [
      {
        file: `dist/${libName}.js`,
        format: 'cjs',  // CommonJS 格式
      },
      {
        file: `dist/${libName}.mjs`,
        format: 'es',  // ES Module 格式
      }
    ],
    plugins: [
      resolve(),  // 使 Rollup 能够查找外部模块
      commonjs(),  // 将 CommonJS 模块转换为 ES6
      typescript(),  // 处理 TypeScript 文件
    ]
  },
  {
    input: 'src/index.ts',  // 入口文件
    output: [
      {
        file: `dist/${libName}.d.ts`,
        format: 'es',  // CommonJS 格式
      },
    ],
    plugins: [
      dts(),
    ]
  }
];

