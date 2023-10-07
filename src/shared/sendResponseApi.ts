import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    count: number;
  };
  data?: T | null;
};
type ILoginApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  token?: T | null;
};

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export const sendLoginResponse = <T>(
  res: Response,
  data: ILoginApiResponse<T>
): void => {
  const responseData: ILoginApiResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    token: data.token || null,
  };
  res.status(data.statusCode).json(responseData);
};
