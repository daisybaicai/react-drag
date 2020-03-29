import { getPageCode, putPageCode } from "../services/api";
import { message } from "antd";

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
            width: '200px'
          },
        },
        children: []
      }
    ],
    config: {},
    templateList: [],
  },
  effects: {
    *getPageCode(_, { call, put }) {
      const response = yield call(getPageCode);
      if (response) {
        let payload = response.data.code;
        payload = eval("("+payload+")");
        yield put({
          type: 'saveCurrentView',
          payload,
        });
      } else {
        message.error(response.msg);
      }
    },
    *putPageCode({payload}, {call, put}) {
      const response = yield call(putPageCode, payload);
      if (response) {
        // let payload = response.data.code;
        // payload = eval("("+payload+")");
        // yield put({
        //   type: 'saveCurrentView',
        //   payload,
        // });
        message.success('res', response)
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
    *setConfig({ payload }, { _, put }) {
      yield put({
        type: 'saveConfig',
        payload,
      });
    },
    *setTemplateList({ payload }, { _, put }) {
      yield put({
        type: 'saveTemplateList',
        payload,
      });
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
      const newList = [...state.templateList, { ...payload }];
      return { ...state, templateList: newList };
    },
  },
};
export default SettingModel;
