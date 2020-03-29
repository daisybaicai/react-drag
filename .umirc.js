
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      routes: [
        // { path: '/', component: '../pages/index' },
        { path: '/drag', component: '../pages/DragView'},
        { path: '/codePreview', component: '../pages/codePreview'},
        { path: '/login', component: '../pages/login'},
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
}
