import { Model, Types } from "mongoose";
import {
  AdditionalInfo,
  Address,
  Education,
  Job,
} from "../common/common.interface";
import { IUser } from "../user/user.interface";

export type ISuperAdmin = {
  userId: Types.ObjectId | IUser;
  superAdminId: string;
  name: string;
  email: string;
  phone: string;
  additionalInfo: AdditionalInfo;
  address: Address;
  education: Education;
  job: Job;
};

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;
