import instance from './Config';

/**
 * Axios get method
 *
 * @param url
 * @param params
 * @returns
 */
export function getAction(url: string, params: Object) {
  return instance({
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
  return instance({
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
  return instance({
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
  return instance({
    method: 'delete',
    url: url,
    data: params,
  });
}
