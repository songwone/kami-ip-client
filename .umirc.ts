import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  alias: {},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Kami',
    local: true,
  },
  routes,
  mfsu: { strategy: 'normal' },
  npmClient: 'yarn',
  proxy: {
    '/light-ip': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {},
    },
  },
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
    title: true,
  },
  scripts: ['dist/clipboard.min.js'],
});
