import axios from 'axios';
import qs from 'qs';
import { router } from 'umi';
import { notification } from 'antd';

const headerType = {
  post: { 'Content-Type': 'application/json' },
  put: { 'Content-Type': 'application/json' },
  get: {},
  delete: {},
  patch: {},
};

const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // maybe should add with token
    // "Bearer " + yourJWTToken
    config.headers.common.Authorization = "Bearer " + localStorage.getItem('react-drag-Token');

    return config;
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error);
  },
);
// respone interceptors
service.interceptors.response.use(
  response => {
    // 200 maybe has error
    const { data = {} } = response;
    if (data.code === 0) {
      return data;
    }
    return data;
  },
  err => {
    const { response = {} } = err;
    if (err.response) {
      if (err.response.status === 401) {
        // 返回 401 清除token信息并跳转到登录页面
        router.push({
          pathname: '/user/login',
        });
        notification.error({
          message: '请求错误',
          description: '用户没有权限（令牌、用户名、密码错误），请重新登陆',
        });
      }
    }
    return Promise.resolve(response.data);
  },
);

const request = (url, options = { headers: {}, interceptorFlag: false }) => {
  const requestParams = {
    url,
    method: options.method || 'get',
    headers: {
      Accept: 'application/json',
      ...headerType[options.method || 'get'],
      ...options.headers,
    },
    data: options.body || {},
  };
  if (requestParams.method === 'get') {
    requestParams.data = qs.stringify(requestParams.data);
  }
  if (options.cancelToken) {
    requestParams.cancelToken = options.cancelToken;
  }
  return new Promise((resolve, reject) => {
    service(requestParams)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default request;