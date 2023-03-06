import { IPayment } from './Interfaces';
import { postAction } from './Manager';

/**
 * Create payment
 * @param params
 * @returns
 */
export const createPayment = (params: IPayment) =>
  postAction(`${process.env.NEXT_PUBLIC_API}/payment/create`, params);
