import { getApplicationList, replyApplication } from '../services/api';

const applicationModel = {
  namespace: 'application',
  state: {
    list: {},
  },
  effects: {
    // 获取申请列表
    *getApplicationList(_, { call, put }) {
      const response = yield call(getApplicationList);
      if (response && response.code == 200) {
        console.log('data', response.data.list);
        yield put({
          type: 'saveList',
          payload: response.data,
        });
        return Promise.resolve(response.msg || '请求成功');
      }
      return Promise.reject(response.msg || '请求失败');
    },
    // 回复申请，接受或者拒绝
    *replyApplication({ payload }, { call }) {
      const response = yield call(replyApplication, payload);
      if (response && response.code == 200) {
        return Promise.resolve(response.msg || '请求成功');
      }
      return Promise.reject(response.msg || '请求失败');
    },
  },
  reducers: {
    saveList(state, { payload }) {
      return { ...state, list: payload };
    },
  },
};
export default applicationModel;
