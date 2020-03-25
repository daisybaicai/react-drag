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
          },
        },
        children: [],
      },
    ],
    config: {},
    templateList: [],
  },
  effects: {
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
