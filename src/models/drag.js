import { getPageCode, putPageCode, createComponent, getOwnTemplate } from '../services/api';
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
    *putPageCode({ payload }, { call, put }) {
      const response = yield call(putPageCode, payload);
      if (response) {
        message.success('res', response);
      } else {
        message.error(response.msg);
      }
    },
    *setCurrentView({ payload }, { _, put }) {
      yield put({
        type: 'saveCurrentView',
        payload,
      });
    },
    *removeCurrentView({ payload }, { _, put }) {
      yield put({
        type: 'saveCurrentView',
        payload,
      });
      yield put({
        type: 'clearArrIndex'
      })
    },
    *setConfig({ payload }, { _, put }) {
      yield put({
        type: 'saveConfig',
        payload,
      });
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
    saveConfig(state, { payload }) {
      const config = Object.assign({}, state.config, {
        ...payload,
      });
      return { ...state, config };
    },
    saveTemplateList(state, { payload }) {
      return { ...state, templateList: payload };
    },
    clearArrIndex(state, _) {
      const config = state.config;
      config.arrIndex = '';
      return {...state, config: config};
    }
  },
};
export default SettingModel;
