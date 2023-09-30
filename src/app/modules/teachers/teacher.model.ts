import { ITeachers, TeacherModel } from "./teacher.interface";
import { Schema, model } from "mongoose";

import {
  Countries,
  ICommonAge,
  ICommonArea,
  ICommonDevice,
  ICommonExperience,
  ICommonGender,
  ICommonInternetType,
  ICommonJobExperience,
  ICommonJobPreference,
  ICommonJobType,
  ICommonLevel,
  ICommonStatus,
  Institutes,
} from "../common/common.constant";

const TeacherSchema = new Schema<
  ITeachers,
  Record<string, never>,
  TeacherModel
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
        age: { type: String, enum: ICommonAge },
        gender: { type: String, enum: ICommonGender },
        device: { type: String, enum: ICommonDevice },
        internetType: { type: String, enum: ICommonInternetType },
        experience: { type: String, enum: ICommonExperience },
        employmentRole: { type: String },
        area: { type: String, enum: ICommonArea },
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
        level: { type: String, enum: ICommonLevel },
        degreeTitle: { type: String },
        institute: { type: String, enum: Institutes },
        pasingyear: { type: String },
      },
    },
    designation: { type: String },
    job: {
      type: {
        status: { type: String, enum: ICommonStatus },
        jobType: { type: String, enum: ICommonJobType },
        jobPreference: { type: String, enum: ICommonJobPreference },
        jobExperience: { type: String, enum: ICommonJobExperience },
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
export const Teacher = model<ITeachers, TeacherModel>("Teachers", TeacherSchema);
