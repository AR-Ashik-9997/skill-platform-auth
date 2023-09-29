import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type AdditionalInfo = {
  age: string;
  gender: string;
  device: string;
  internetType: string;
  experience: string;
  employmentRole: string;
  area: string;
};
export type Address = {
  country: string;
  district: string;
  streetAddress: string;
};
export type Job = {
  job: string;
  status: string;
  jobType: string;
  jobPreference: string;
  jobExperience: string;
};
export type Education = {
  education: string;
  level: string;
  degreeTitle: string;
  institute: string;
  pasingyear: string;
};
export type IStudents = {
  userId: Types.ObjectId | IUser;
  name: string;
  email: string;
  phone: string;
  additionalInfo: AdditionalInfo;
  address:Address;
  education: Education;
  job: Job;
};

export type StudentModel = Model<IStudents, Record<string, unknown>>;
