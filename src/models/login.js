import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, register } from '../services/api';
import config from '../config';

export default {
  namespace: 'user',

  state: {
    status: undefined,
    currentUser: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response && response.code == 200) {
        const { token } = response.data;
        localStorage.removeItem(`${config.projectName}-Token`);
        localStorage.setItem(`${config.projectName}-Token`, token);
        message.success('登陆成功');
        yield put(routerRedux.replace('/drag'));
      } else {
        message.error(response.msg || '登录失败，请重新登录');
      }
    },
    *register({ payload }, { call, put }) {
      const response = yield call(register, payload);
      if (response && response.code == 200) {
        message.success(response.msg);
      } else {
        message.error(response.msg || '注册失败，请重新注册');
      }
    },
    *logout(_, { put }) {
      localStorage.removeItem(`${config.projectName}-Token`);
      yield put(routerRedux.replace('/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
