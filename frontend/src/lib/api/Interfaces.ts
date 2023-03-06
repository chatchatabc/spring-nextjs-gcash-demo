/**
 * Register User interface
 */
export interface IRegisterUser {
  email: string;
  username: string;
  password: string;
}

/**
 * Login User interface
 */
export interface ILoginUser {
  username: string;
  password: string;
}

/**
 * Create Product interface
 */
export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  isAvailable?: boolean;
}

export enum FormResponse {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  VALIDATION_ERROR = 'validation_error',
}
