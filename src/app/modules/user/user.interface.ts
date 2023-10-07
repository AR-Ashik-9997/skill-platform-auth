/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
};

export type IUserLoginMethod = {
  isExistEmail(email: string): Promise<Partial<IUser> | null>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserLoginMethod>;
