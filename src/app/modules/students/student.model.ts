import {
  Countries,
  IStudentAge,
  IStudentArea,
  IStudentDevice,
  IStudentExperience,
  IStudentGender,
  IStudentInternetType,
  IStudentJobExperience,
  IStudentJobPreference,
  IStudentJobType,
  IStudentLevel,
  IStudentStatus,
  Institutes,
} from "./student.constant";

import { Schema, model } from "mongoose";
import { IStudents, StudentModel } from "./student.interface";

const StudentSchema = new Schema<
  IStudents,
  Record<string, never>,
  StudentModel
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    additionalInfo: {
      type: {
        age: { type: String, enum: IStudentAge },
        gender: { type: String, enum: IStudentGender },
        device: { type: String, enum: IStudentDevice },
        internetType: { type: String, enum: IStudentInternetType },
        experience: { type: String, enum: IStudentExperience },
        employmentRole: { type: String },
        area: { type: String, enum: IStudentArea },
      },
    },
    address: {
      type: {
        country: { type: String, enum: Countries },
        district: { type: String },
        streetAddress: { type: String },
      },
    },
    education: {
      type: {
        level: { type: String, enum: IStudentLevel },
        degreeTitle: { type: String },
        institute: { type: String, enum: Institutes },
        pasingyear: { type: String },
      },
    },
    job: {
      type: {
        status: { type: String, enum: IStudentStatus },
        jobType: { type: String, enum: IStudentJobType },
        jobPreference: { type: String, enum: IStudentJobPreference },
        jobExperience: { type: String, enum: IStudentJobExperience },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Student = model<IStudents, StudentModel>("Student", StudentSchema);
