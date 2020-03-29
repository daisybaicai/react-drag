import { stringify } from 'querystring';
import request from '../utils/request';

/**
 * @description 登陆
 * @param {*} params {username,password}
 */
export async function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
  });
}

/**
 * @description 注册
 * @param {*} params {username,password}
 */
export async function register(params) {
  return request('/api/user/register', {
    method: 'POST',
    body: params
  });
}

/**
 * @description 获取当前用户的pageCode(currentView)
 */
export async function getPageCode() {
  return request('/api/page');
}

/**
 * @description 更新当前用户的pageCode
 * @param {*} params {currentView}
 */
export async function putPageCode(params) {
  return request('/api/page', {
    method: 'PUT',
    body: params
  });
}


