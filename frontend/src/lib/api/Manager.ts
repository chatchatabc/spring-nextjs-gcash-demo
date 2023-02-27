import axios from 'axios';

/**
 * Axios get method
 *
 * @param url
 * @param params
 * @returns
 */
export function getAction(url: string, params: Object) {
  return axios({
    method: 'get',
    url: url,
    data: params,
  });
}

/**
 * Axios post method
 *
 * @param url
 * @param params
 * @returns
 */
export function postAction(url: string, params: Object) {
  return axios({
    method: 'post',
    url: url,
    data: params,
  });
}

/**
 * Axios put method
 *
 * @param url
 * @param params
 * @returns
 */
export function putAction(url: string, params: Object) {
  return axios({
    method: 'put',
    url: url,
    data: params,
  });
}

/**
 * Axios delete method
 *
 * @param url
 * @param params
 * @returns
 */
export function deleteAction(url: string, params: Object) {
  return axios({
    method: 'delete',
    url: url,
    data: params,
  });
}
