import {
  getPageCode,
  putPageCode,
  createComponent,
  getOwnTemplate,
  getComponentCode,
  putComponentCode,
} from '../services/api';
import { message } from 'antd';

const SettingModel = {
  namespace: 'drag',
  state: {
    currentView: [
      {
        type: 'div',
        nested: true,
        props: {
          style: {
            border: '1px solid red',
            width: '200px',
          },
        },
        children: [],
      },
    ],
    config: {},
    componentView: [],
    componentConfig: {},
    templateList: [],
  },
  effects: {
    *getPageCode(_, { call, put }) {
      const response = yield call(getPageCode);
      if (response && response.code == 200) {
        let payload = response.data.code;
        payload = eval('(' + payload + ')');
        yield put({
          type: 'saveCurrentView',
          payload,
        });
      } else {
        message.error(response.msg);
      }
    },
    *getComponentCode({ payload }, { call, put }) {
      const response = yield call(getComponentCode, payload.id);
      if (response && response.code == 200) {
        let payload = response.data.code;
        payload = eval('(' + `[${payload}]` + ')');
        yield put({
          type: 'saveComponentView',
          payload,
        });
      } else {
        message.error(response.msg);
      }
    },
    *putComponentCode({ payload }, { call, put }) {
      const { id, code } = payload;
      const response = yield call(putComponentCode, { code: code[0] }, id);
      if (response) {
        message.success('res', response);
      } else {
        message.error(response.msg);
      }
    },
    *putPageCode({ payload }, { call, put }) {
      const response = yield call(putPageCode, payload);
      if (response) {
        message.success('res', response);
      } else {
        message.error(response.msg);
      }
    },
    *setCurrentView({ payload, isPage }, { _, put }) {
      if (isPage) {
        yield put({
          type: 'saveCurrentView',
          payload,
        });
      } else {
        yield put({
          type: 'saveComponentView',
          payload,
        });
      }
    },
    *removeCurrentView({ payload, isPage }, { _, put }) {
      if (isPage) {
        yield put({
          type: 'saveCurrentView',
          payload,
        });
        yield put({
          type: 'clearArrIndex',
        });
      } else {
        yield put({
          type: 'saveComponentView',
          payload,
        });
        yield put({
          type: 'clearComArrIndex',
        });
      }
    },
    *setConfig({ payload, isPage }, { _, put }) {
      if (isPage) {
        yield put({
          type: 'saveConfig',
          payload,
        });
      } else {
        yield put({
          type: 'saveComponentConfig',
          payload,
        });
      }
    },
    *setTemplateList({ payload }, { call, put }) {
      const response = yield call(createComponent, payload);
      if (response && response.code == 200) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
    *getOwnTemplate(_, { call, put }) {
      const response = yield call(getOwnTemplate);
      if (response && response.code == 200) {
        yield put({
          type: 'saveTemplateList',
          payload: response.data,
        });
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    saveCurrentView(state, { payload }) {
      return { ...state, currentView: payload };
    },
    saveComponentView(state, { payload }) {
      return { ...state, componentView: payload };
    },
    saveConfig(state, { payload }) {
      const config = Object.assign({}, state.config, {
        ...payload,
      });
      return { ...state, config };
    },
    saveComponentConfig(state, { payload }) {
      const componentConfig = Object.assign({}, state.componentConfig, {
        ...payload,
      });
      console.log('com', componentConfig);
      return { ...state, componentConfig };
    },
    saveTemplateList(state, { payload }) {
      return { ...state, templateList: payload };
    },
    clearArrIndex(state, _) {
      const config = state.config;
      config.arrIndex = '';
      return { ...state, config: config };
    },
    clearComArrIndex(state, _) {
      const config = state.componentConfig;
      config.arrIndex = '';
      return { ...state, componentConfig: config };
    },
  },
};
export default SettingModel;
