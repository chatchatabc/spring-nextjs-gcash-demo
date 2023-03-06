import { IProduct } from './Interfaces';
import { getAction, postAction, putAction } from './Manager';

/**
 * Get products
 * @returns
 */
export const getProducts = (params: any) =>
  getAction(`${process.env.NEXT_PUBLIC_API}/products`, params);

/**
 * Get available products
 * @param params
 * @returns
 */
export const getAvailableProducts = (params: any) =>
  getAction(`${process.env.NEXT_PUBLIC_API}/products/available`, params);

/**
 * Create product
 * @param params
 * @returns
 */
export const createProduct = (params: IProduct) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/products/admin/create`, params);

/**
 * Toggle product availbility
 * @param id
 * @returns
 */
export const toggleProductAvailability = (id: number) => {
  return putAction(
    `${process.env.NEXT_PUBLIC_API}/products/admin/set-available`,
    { id }
  );
};
