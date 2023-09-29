import { z } from "zod";
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

const UpdateStudentZodValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    additionalInfo: z
      .object({
        age: z.enum([...IStudentAge] as [string, ...string[]]).optional(),
        gender: z.enum([...IStudentGender] as [string, ...string[]]).optional(),
        device: z.enum([...IStudentDevice] as [string, ...string[]]).optional(),
        internetType: z
          .enum([...IStudentInternetType] as [string, ...string[]])
          .optional(),
        experience: z
          .enum([...IStudentExperience] as [string, ...string[]])
          .optional(),
        employmentRole: z.string().optional(),
        area: z.enum([...IStudentArea] as [string, ...string[]]).optional(),
      })
      .optional(),
    address: z
      .object({
        country: z.enum([...Countries] as [string, ...string[]]).optional(),
        district: z.string().optional(),
        streetAddress: z.string().optional(),
      })
      .optional(),
    education: z
      .object({
        level: z.enum([...IStudentLevel] as [string, ...string[]]).optional(),
        degreeTitle: z.string().optional(),
        institute: z.enum([...Institutes] as [string, ...string[]]).optional(),
        pasingyear: z.string().optional(),
      })
      .optional(),
    Job: z
      .object({
        status: z.enum([...IStudentStatus] as [string, ...string[]]).optional(),
        jobType: z
          .enum([...IStudentJobType] as [string, ...string[]])
          .optional(),
        jobPreference: z
          .enum([...IStudentJobPreference] as [string, ...string[]])
          .optional(),

        jobExperience: z
          .enum([...IStudentJobExperience] as [string, ...string[]])
          .optional(),
      })
      .optional(),
  }),
});

export const StudentValidation = {
  UpdateStudentZodValidationSchema,
};
