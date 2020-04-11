import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/login',
    exact: true,
    _title: '前端可视化-reactDrag',
    _title_default: '前端可视化-reactDrag',
  },
  {
    path: '/',
    routes: [
      {
        path: '/drag',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__DragView" */ '../DragView'),
            })
          : require('../DragView').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        path: '/codePreview',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__codePreview" */ '../codePreview'),
            })
          : require('../codePreview').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        path: '/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__login" */ '../login'),
            })
          : require('../login').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        path: '/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__register" */ '../register'),
            })
          : require('../register').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        path: '/comsquare',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__componentSquare" */ '../componentSquare'),
            })
          : require('../componentSquare').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        path: '/:id/componentDrag',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__componentDrag" */ '../componentDrag'),
            })
          : require('../componentDrag').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        path: '/notification',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Notification" */ '../Notification'),
            })
          : require('../Notification').default,
        exact: true,
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/daisiyao/Desktop/boi/react-drag/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '前端可视化-reactDrag',
        _title_default: '前端可视化-reactDrag',
      },
    ],
    _title: '前端可视化-reactDrag',
    _title_default: '前端可视化-reactDrag',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/daisiyao/Desktop/boi/react-drag/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: '前端可视化-reactDrag',
    _title_default: '前端可视化-reactDrag',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
