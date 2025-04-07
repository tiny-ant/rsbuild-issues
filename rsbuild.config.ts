import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginLess } from '@rsbuild/plugin-less';

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
const PORT = process.env.PORT || 8000;

export default defineConfig({
  // 配置 Rsbuild 在开发过程中注入的 client 代码，可以用于设置热更新对应的 WebSocket URL
  dev: {
    assetPrefix: '/v2/',
    client: {
      // 默认为location.port（访问浏览器时未带上端口号，则为80）
      port: PORT,
      path: '/ws',
      // 默认为 location.protocol === 'https:' ? 'wss' : 'ws'
      // protocol: undefined,
      // 错误信息和错误堆栈弹层
      overlay: true,
    },
    hmr: true,
    // 仅对 dev 构建生效
    // lazyCompilation: {
    //   imports: true,
    // },
    progressBar: true,
    // 用于排查构建产物的内容，或是配置静态资源的代理规则
    // writeToDisk: true,
  },
  environments: {
    web: {
      source: {
        entry: {
          index: './src/index.tsx',
        },
      },
      output: {
        // 浏览器产物的 target 类型为 'web'
        target: 'web',
      },
    },
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
    // 根据browserlist配置，自动选择polyfill并在页面入口自动引入
    // usage: 根据代码中使用的 API 注入 polyfills（仅处理当前项目代码，如需包含指定的node_modules中的包，可以通过source.include指定）
    // entry: 相比usage的好处是，不需要担心第三方依赖的polyfill问题
    polyfill: 'usage',
  },
  performance: {
    removeMomentLocale: true,
  },
  plugins: [
    pluginReact({
      enableProfiler: process.env.REACT_PROFILER === 'true',
    }),
    pluginSvgr(),
  ],
  resolve: {
    // 默认会优先取tsconfig中的alias
    // alias: {},
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.d.ts'],
  },
  source: {
    // @connect装饰器语法兼容
    decorators: {
      version: 'legacy',
    },
  },
  tools: {
    rspack: {
    },
    swc: {
      test: '.(js|jsx)$',
      env: {
        targets: 'Chrome >= 65',
        coreJs: '3.33.2',
        mode: 'usage',
      },
      // @see https://swc.rs/docs/configuration/compilation
      jsc: {
        parser: {
          syntax: 'typescript', // 使用 TypeScript 语法进行解析 (使解析器能够理解 .ts/.tsx 文件)
          tsx: true, // 启用对 TSX 文件的解析 (TypeScript 中的 JSX 扩展语法)
          decorators: true,
        },
        // parser: {
        //   syntax: 'ecmascript',
        //   jsx: true, // 支持 JSX
        //   decorators: true,
        //   privateMethod: true,
        // },
        externalHelpers: true,
        // target: 'es2020',
        transform: {
          react: {
            importSource: 'react',
            runtime: 'automatic', // 使用 React 17+ 自动导入react功能 (不再需要显式地在每个文件中引入React)
            // pragma: 'React.createElement',
            // pragmaFrag: 'React.Fragment',
            // throwIfNamespace: true,
            development: false,
            // TODO:
            // useBuiltins: true,
          },
        },
      },
    },
  },
});
