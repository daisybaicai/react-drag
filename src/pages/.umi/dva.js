import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'application', ...(require('/Users/daisiyao/Desktop/boi/react-drag/src/models/application.js').default) });
app.model({ namespace: 'components', ...(require('/Users/daisiyao/Desktop/boi/react-drag/src/models/components.js').default) });
app.model({ namespace: 'drag', ...(require('/Users/daisiyao/Desktop/boi/react-drag/src/models/drag.js').default) });
app.model({ namespace: 'login', ...(require('/Users/daisiyao/Desktop/boi/react-drag/src/models/login.js').default) });
app.model({ namespace: 'orginzation', ...(require('/Users/daisiyao/Desktop/boi/react-drag/src/models/orginzation.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
