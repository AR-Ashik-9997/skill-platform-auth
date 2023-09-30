import { Model, Types } from "mongoose";
import {
  AdditionalInfo,
  Address,
  Education,
  Job,
} from "../common/common.interface";
import { IUser } from "../user/user.interface";

export type IAdmins = {
  userId: Types.ObjectId | IUser;
  adminId:string;
  name: string;
  email: string;
  phone: string;
  additionalInfo: AdditionalInfo;
  address: Address;
  education: Education;  
  job: Job;
};

export type AdminModel = Model<IAdmins, Record<string, unknown>>;
