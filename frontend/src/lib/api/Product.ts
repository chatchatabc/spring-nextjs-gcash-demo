import { ICreateProduct } from './Interfaces';
import { postAction } from './Manager';

export const createProduct = (params: ICreateProduct) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/products/admin/create`, params);
