import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

// const root = path.join(__dirname, '../');
const root = process.cwd();

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);

export default defineConfig({
  // 配置 Rsbuild 在开发过程中注入的 client 代码，可以用于设置热更新对应的 WebSocket URL
  dev: {
    progressBar: true,
    // 用于排查构建产物的内容，或是配置静态资源的代理规则
    // writeToDisk: true,
  },
  output: {
    distPath: {
      root: 'dist/v2',
      js: './js',
      css: './css',
      // font: 'font',
    },
    // 开启style-loader（默认不会开启）
    injectStyles: true,
    polyfill: 'usage',
  },
  performance: {
    removeMomentLocale: true,
  },
  plugins: [
    pluginReact({
      // 仅在 REACT_PROFILER 为 true 时启用性能分析器
      // 因为该选项会增加构建时间并产生一些额外开销
      enableProfiler: process.env.REACT_PROFILER === 'true',
    }),
    pluginSvgr(),
  ],
  resolve: {
    // 默认会优先取tsconfig中的alias
    // alias: {},
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.d.ts'],
  },
  server: {
    port: 8000,
  },
  source: {
    // @connect装饰器语法兼容
    decorators: {
      version: 'legacy',
    },
    entry: {
      index: './src/index.tsx',
    },
  },
});
