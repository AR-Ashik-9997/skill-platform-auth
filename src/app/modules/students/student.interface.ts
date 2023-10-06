import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";
import {
  AdditionalInfo,
  Address,
  Education,
  Job,
} from "../common/common.interface";

export type IStudents = {
  userId: Types.ObjectId | IUser;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  additionalInfo: AdditionalInfo;
  address: Address;
  education: Education;
  job: Job;
  profile?:string;
};

export type StudentModel = Model<IStudents, Record<string, unknown>>;
