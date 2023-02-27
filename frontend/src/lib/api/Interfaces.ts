/**
 * User interface
 */
export interface IRegisterUser {
  id?: string;
  email: string;
  username: string;
  password: string;
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
