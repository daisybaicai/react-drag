
// ref: https://umijs.org/config/
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';


const chainWebpack = (config, { webpack }) => {
  config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        language: ['json', 'html', 'javascript', 'typescript']
      }
  ])
};

export default {
  treeShaking: true,
  publicPath: './',
  routes: [
    {
      path: '/',
      routes: [
        { path: '/', redirect: '/login' },
        { path: '/drag', component: '../pages/DragView'},
        { path: '/codePreview', component: '../pages/codePreview'},
        { path: '/login', component: '../pages/login'},
        { path: '/register', component: '../pages/register'},
        { path: '/comsquare', component: '../pages/componentSquare'},
        { path: '/:id/componentDrag', component: '../pages/componentDrag'},
        { path: '/notification', component: '../pages/Notification'},
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
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
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      'target': 'http://localhost:3000/api',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  chainWebpack
}
