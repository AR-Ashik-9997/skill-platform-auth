import { Model, Types } from "mongoose";
import {
  AdditionalInfo,
  Address,
  Education,
  Job,
} from "../common/common.interface";
import { IUser } from "../user/user.interface";

export type ITeachers = {
  userId: Types.ObjectId | IUser;
  teacherId:string;
  name: string;
  email: string;
  phone: string;
  additionalInfo: AdditionalInfo;
  address: Address;
  education: Education;
  designation: "Professor" | "Lecturer";
  job: Job;
};

export type TeacherModel = Model<ITeachers, Record<string, unknown>>;
