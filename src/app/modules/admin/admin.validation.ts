import { z } from 'zod';
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

const UpdateAdminZodValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  additionalInfo: z
    .object({
      age: z.enum([...ICommonAge] as [string, ...string[]]).optional(),
      gender: z.enum([...ICommonGender] as [string, ...string[]]).optional(),
      device: z.enum([...ICommonDevice] as [string, ...string[]]).optional(),
      internetType: z
        .enum([...ICommonInternetType] as [string, ...string[]])
        .optional(),
      experience: z
        .enum([...ICommonExperience] as [string, ...string[]])
        .optional(),
      employmentRole: z.string().optional(),
      area: z.enum([...ICommonArea] as [string, ...string[]]).optional(),
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
      level: z.enum([...ICommonLevel] as [string, ...string[]]).optional(),
      degreeTitle: z.string().optional(),
      institute: z.enum([...Institutes] as [string, ...string[]]).optional(),
      pasingyear: z.string().optional(),
    })
    .optional(),
  Job: z
    .object({
      status: z.enum([...ICommonStatus] as [string, ...string[]]).optional(),
      jobType: z.enum([...ICommonJobType] as [string, ...string[]]).optional(),
      jobPreference: z
        .enum([...ICommonJobPreference] as [string, ...string[]])
        .optional(),
      jobExperience: z
        .enum([...ICommonJobExperience] as [string, ...string[]])
        .optional(),
    })
    .optional(),
});

export const adminValidation = {
  UpdateAdminZodValidationSchema,
};
