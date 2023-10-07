import { ITeachers, TeacherModel } from './teacher.interface';
import { Schema, model } from 'mongoose';

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
} from '../common/common.constant';

const TeacherSchema = new Schema<
  ITeachers,
  Record<string, never>,
  TeacherModel
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacherId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    additionalInfo: {
      type: {
        age: { type: String, enum: ICommonAge, required: true },
        gender: { type: String, enum: ICommonGender, required: true },
        device: { type: String, enum: ICommonDevice },
        internetType: { type: String, enum: ICommonInternetType },
        experience: { type: String, enum: ICommonExperience, required: true },
        employmentRole: { type: String },
        area: { type: String, enum: ICommonArea, required: true },
      },
    },
    address: {
      type: {
        country: { type: String, enum: Countries, required: true },
        district: { type: String, required: true },
        streetAddress: { type: String, required: true },
      },
    },
    education: {
      type: {
        level: { type: String, enum: ICommonLevel },
        degreeTitle: { type: String, required: true },
        institute: { type: String, enum: Institutes, required: true },
        pasingyear: { type: String, required: true },
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
    profile: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Teacher = model<ITeachers, TeacherModel>(
  'Teachers',
  TeacherSchema
);
