import {
  getPersonalComponents,
  getOrginzationComponents,
  getPublicComponents,
  uploadFiles,
} from '../services/api';
import { message } from 'antd';

const ComponentsModel = {
  namespace: 'components',
  state: {
    personalList: [],
    publicList: [],
    orginzationList: [],
    filePath: '',
  },
  effects: {
    *getPersonalComponents(_, { call, put }) {
      const response = yield call(getPersonalComponents);
      if (response && response.code == 200) {
        let payload = response.data;
        yield put({
          type: 'savePersonalComponents',
          payload,
        });
      } else {
        message.error(response.msg);
      }
    },
    *getPublicComponents(_, { call, put }) {
      const response = yield call(getPublicComponents);
      if (response && response.code == 200) {
        let payload = response.data;
        yield put({
          type: 'savePublicComponents',
          payload,
        });
      } else {
        message.error(response.msg);
      }
    },
    *getOrginzationComponents(_, { call, put }) {
      const response = yield call(getOrginzationComponents);
      if (response && response.code == 200) {
        let payload = response.data;
        yield put({
          type: 'saveOrginzationComponents',
          payload,
        });
      } else {
        message.error(response.msg);
      }
    },
    *uploadFile({ payload }, { call, put }) {
      const response = yield call(uploadFiles, payload);
      if (response && response.code == 200) {
        let payload = response.data.filename;
        yield put({
          type: 'saveFileImg',
          payload,
        });
        return payload;
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    savePersonalComponents(state, { payload }) {
      return { ...state, personalList: payload };
    },
    savePublicComponents(state, { payload }) {
      return { ...state, publicList: payload };
    },
    saveOrginzationComponents(state, { payload }) {
      return { ...state, orginzationList: payload };
    },
    saveFileImg(state, { payload }) {
      return { ...state, filePath: payload };
    },
  },
};
export default ComponentsModel;
