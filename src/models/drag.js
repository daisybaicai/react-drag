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
    dependComponents: [],
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
    *addDependComponents({ payload }, { _, put }) {
      yield put({
        type: 'saveDependComponents',
        payload
      })
    },
    *removeDependComponents({ payload}, {_, put}) {
      yield put({
        type: 'deleteDependComponents',
        payload,
      })
    }
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
    saveDependComponents(state, { payload }) {
      const newArr = [...state.dependComponents, payload]
      return {...state, dependComponents: newArr};
    },
    deleteDependComponents(state, { payload }) {
      // const newArr = [...state.dependComponents, payload]
      // return {...state, dependComponents: newArr};
      let oldArr = [...state.dependComponents];
      let Index = oldArr.lastIndexOf(payload);
      let newArr = oldArr.splice(Index, 1);
      return {...state, dependComponents: newArr};
    }
  },
};
export default SettingModel;
