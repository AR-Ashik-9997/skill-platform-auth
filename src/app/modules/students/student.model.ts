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
        age: { type: String },
        gender: { type: String },
        device: { type: String },
        internetType: { type: String },
        experience: { type: String },
        employmentRole: { type: String },
        area: { type: String },
      },
    },
    address: {
      type: {
        country: { type: String },
        district: { type: String },
        streetAddress: { type: String },
      },
    },
    education: {
      type: {
        education: { type: String },
        level: { type: String },
        degreeTitle: { type: String },
        institute: { type: String },
        pasingyear: { type: String },
      },
    },
    job: {
      type: {
        job: { type: String },
        status: { type: String },
        jobType: { type: String },
        jobPreference: { type: String },
        jobExperience: { type: String },
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
