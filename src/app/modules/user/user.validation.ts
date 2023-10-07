import { z } from 'zod';
import {
  Countries,
  ICommonAge,
  ICommonArea,
  ICommonExperience,
  ICommonGender,
  Institutes,
} from '../common/common.constant';

const createStudentzodValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
    phone: z.string({ required_error: 'phone number is required' }),
  }),
});
const createTeacherzodValidationSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
  phone: z.string({ required_error: 'phone number is required' }),
  teacher: z.object({
    additionalInfo: z.object({
      age: z.enum([...ICommonAge] as [string, ...string[]], {
        required_error: 'age id required',
      }),
      gender: z.enum([...ICommonGender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      experience: z.enum([...ICommonExperience] as [string, ...string[]], {
        required_error: 'experience is required',
      }),
      area: z.enum([...ICommonArea] as [string, ...string[]], {
        required_error: 'area is required',
      }),
    }),
    address: z.object({
      country: z.enum([...Countries] as [string, ...string[]], {
        required_error: 'country is required',
      }),
      district: z.string({ required_error: 'district is required' }),
      streetAddress: z.string({
        required_error: 'streetAddress is required',
      }),
    }),
    education: z.object({
      degreeTitle: z.string(),
      institute: z.enum([...Institutes] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      pasingyear: z.string({ required_error: 'pasingyear is required' }),
    }),
  }),
});
const createAdminzodValidationSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
  phone: z.string({ required_error: 'phone number is required' }),
  admin: z.object({
    additionalInfo: z.object({
      age: z.enum([...ICommonAge] as [string, ...string[]], {
        required_error: 'age id required',
      }),
      gender: z.enum([...ICommonGender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      experience: z.enum([...ICommonExperience] as [string, ...string[]], {
        required_error: 'experience is required',
      }),
      area: z.enum([...ICommonArea] as [string, ...string[]], {
        required_error: 'area is required',
      }),
    }),
    address: z.object({
      country: z.enum([...Countries] as [string, ...string[]], {
        required_error: 'country is required',
      }),
      district: z.string({ required_error: 'district is required' }),
      streetAddress: z.string({
        required_error: 'streetAddress is required',
      }),
    }),
    education: z.object({
      degreeTitle: z.string(),
      institute: z.enum([...Institutes] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      pasingyear: z.string({ required_error: 'pasingyear is required' }),
    }),
  }),
});

export const UserValidation = {
  createStudentzodValidationSchema,
  createTeacherzodValidationSchema,
  createAdminzodValidationSchema,
};
