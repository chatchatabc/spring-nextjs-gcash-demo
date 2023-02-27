import { IRegisterUser } from './Interfaces';
import { postAction } from './Manager';

export const registerUser = (params: IRegisterUser) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/register`, params);
