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

/**
 * @description 创建组织
 * @param {*} params {username,password}
 */
export async function createOrginzation(params) {
  return request('/api/orginzation', {
    method: 'POST',
    body: params
  });
}


/**
 * @description 获取当前用户下的组织
 */
export async function getOrgArr() {
  return request('/api/orginzation');
}

/**
 * @description 创建组件
 * @param {*} params 
 */
export async function createComponent(params) {
  return request('/api/component', {
    method: 'POST',
    body: params
  });
}


/**
 * @description 获取可用组件
 */
export async function getOwnTemplate() {
  return request('/api/component');
}

/**
 * @description 获取个人组件列表
 */
export async function getPersonalComponents() {
  return request('/api/component/personal');
}

/**
 * @description 获取公共组件列表
 */
export async function getPublicComponents() {
  return request('/api/component/public');
}

/**
 * @description 获取组织组件列表
 */
export async function getOrginzationComponents() {
  return request('/api/component/orginzation');
}

/**
 * @description 上传图片
 */
export async function uploadFiles(params) {
  return request('/api/component/img', {
    method: 'POST',
    body: params
  })
}

/**
 * @description 获取当前用户的componentCode
 */
export async function getComponentCode(id) {
  return request(`/api/component/${id}`);
}

/**
 * @description 更新当前用户的componentCode
 * @param {*} params {currentView}
 */
export async function putComponentCode(params, id) {
  return request(`/api/component/${id}`, {
    method: 'PUT',
    body: params
  });
}

/**
 * @description 获取当前组织列表
 */
export async function getOrganizationList() {
  return request(`/api/orginzation/list/all`);
}

/**
* @description 获取当前个人所在的组织列表
*/
export async function getPersonalOrganizationList() {
 return request(`/api/orginzation/list/personal`);
}


/**
 * @description 提出当前用户的申请
 * @param {*} params 
 */
export async function postApplication(params) {
  return request(`/api/application`, {
    method: 'POST',
    body: params
  });
}

/**
 * @description 获取当前组织列表
 */
export async function getApplicationList() {
  return request(`/api/application/all`);
}

/**
 * @description 回复关于进入组织的申请
 * @param {*} params
 */
export async function replyApplication(params) {
  return request(`/api/application`, {
    method: 'PUT',
    body: params
  });
}