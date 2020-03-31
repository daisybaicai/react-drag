import { createOrginzation, getOrgArr } from '../services/api';
import { message } from 'antd';

const orginzationgModel = {
  namespace: 'orginzation',
  state: {
    orgArr: []
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
    *getOrgArr(_, { call, put}) {
      const response = yield call(getOrgArr);
      if (response && response.code == 200) {
        yield put ({
          type: 'setOrgArr',
          payload: response.data.orgArr
        })
      } else {
        // message.error(response.msg);
      }
    }
  },
  reducers: {
    setOrgArr(state, { payload }) {
      return {...state, orgArr: payload};
    }
  },
};
export default orginzationgModel;
