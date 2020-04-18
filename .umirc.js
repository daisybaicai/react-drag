// ref: https://umijs.org/config/
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const chainWebpack = (config, { webpack }) => {
  config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
    {
      language: ['json', 'html', 'javascript', 'typescript'],
    },
  ]);
};

export default {
  treeShaking: true,
  publicPath: './',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/drag', component: '../pages/DragView' },
    { path: '/login', component: '../pages/login' },
    { path: '/register', component: '../pages/register' },
    { path: '/:id/componentDrag', component: '../pages/componentDrag' },
    {
      path: '/',
      component: '../layout/basicLayout',
      routes: [
        {
          path: '/org',
          component: '../pages/organizationSquare/index',
        },
        {
          path: '/comsquare',
          component: '../pages/componentSquare/index',
        },
        {
          path: '/codePreview',
          component: '../pages/codePreview/index'
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '前端可视化-reactDrag',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
            /common\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3000/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  chainWebpack,
};
