import { ILoginUser, IRegisterUser } from './Interfaces';
import { postAction } from './Manager';

/**
 * Register user
 * @param params
 * @returns
 */
export const registerUser = (params: IRegisterUser) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/register`, params);

/**
 * Login user
 * @param params
 * @returns
 */
export const loginUser = (params: ILoginUser) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/login`, params);
