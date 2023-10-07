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
import { AdminModel, IAdmins } from './admin.interface';

const AdminSchema = new Schema<IAdmins, Record<string, never>, AdminModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    adminId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
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
export const Admin = model<IAdmins, AdminModel>('Admin', AdminSchema);
