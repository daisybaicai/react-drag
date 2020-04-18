import {
  createOrginzation,
  getOrgArr,
  getOrganizationList,
  postApplication,
  getPersonalOrganizationList,
} from '../services/api';
import { message } from 'antd';

const orginzationgModel = {
  namespace: 'orginzation',
  state: {
    orgArr: [],
    list: [],
    mylist: [],
  },
  effects: {
    *createOrginzation({ payload }, { call, put }) {
      const response = yield call(createOrginzation, payload);
      if (response) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
    *getOrgArr(_, { call, put }) {
      const response = yield call(getOrgArr);
      if (response && response.code == 200) {
        yield put({
          type: 'setOrgArr',
          payload: response.data.orgArr,
        });
      } else {
        // message.error(response.msg);
      }
    },
    *getOrganizationList(_, { call, put }) {
      const response = yield call(getOrganizationList);
      if (response && response.code == 200) {
        yield put({
          type: 'setOrganizationList',
          payload: response.data.list,
        });
      } else {
        // message.error(response.msg);
      }
    },
    *getPersonalOrganizationList(_, { call, put }) {
      const response = yield call(getPersonalOrganizationList);
      if (response && response.code == 200) {
        yield put({
          type: 'setPersonalOrganizationList',
          payload: response.data.list,
        });
      } else {
        // message.error(response.msg);
      }
    },
    *postApplication({ payload }, { call, put }) {
      const response = yield call(postApplication, payload);
      if (response && response.code == 200) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    setOrgArr(state, { payload }) {
      return { ...state, orgArr: payload };
    },
    setOrganizationList(state, { payload }) {
      return { ...state, list: payload };
    },
    setPersonalOrganizationList(state, { payload }) {
      return { ...state, mylist: payload };
    },
  },
};
export default orginzationgModel;
