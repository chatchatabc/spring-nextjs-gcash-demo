import { IProduct } from './Interfaces';
import { getAction, postAction } from './Manager';

/**
 * Get products
 * @returns
 */
export const getProducts = (params: any) =>
  getAction(`${process.env.NEXT_PUBLIC_API}/products`, params);

/**
 * Create product
 * @param params
 * @returns
 */
export const createProduct = (params: IProduct) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/products/admin/create`, params);
