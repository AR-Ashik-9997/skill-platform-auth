/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose';

import { Student } from '../students/student.model';
import { Teacher } from '../teachers/teacher.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateStudentId, generateTeacherId } from './utils';
import { Admin } from '../admin/admin.model';
import { ITeachers } from '../teachers/teacher.interface';
import { IUploadFile } from '../../../interfaces/files';
import { FileUploadHelper } from '../../../helper/fileUploader';
import { IAdmins } from '../admin/admin.interface';

const createStudent = async (payload: IUser): Promise<IUser | null> => {
  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId();
    payload.id = id;
    const user = await User.create([payload], { session });
    if (!user) {
      throw new Error('User creation failed');
    }
    const studentData = {
      userId: user[0]._id,
      studentId: user[0].id,
      name: user[0].name,
      email: user[0].email,
      phone: user[0].phone,
    };
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent) {
      throw new Error('Student profile creation failed');
    }

    result = user[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return result;
};

const createTeacher = async (
  teacher: ITeachers,
  user: IUser,
  file: IUploadFile
): Promise<IUser> => {
  let result = null;
  const session = await mongoose.startSession();
  try {
    const image = await FileUploadHelper.uploadToCloudinary(file);
    session.startTransaction();
    const id = await generateTeacherId();
    user.id = id;
    user.role = 'teacher';
    const newUser = await User.create([user], { session });
    if (!user) {
      throw new Error('User creation failed');
    }
    (teacher.userId = newUser[0]._id),
      (teacher.teacherId = newUser[0].id),
      (teacher.name = newUser[0].name),
      (teacher.email = newUser[0].email),
      (teacher.phone = newUser[0].phone),
      (teacher.profile = image?.secure_url);

    const newTeacher = await Teacher.create([teacher], { session });
    if (!newTeacher) {
      throw new Error('Teacher profile creation failed');
    }
    result = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return result;
};

const createAdmin = async (
  admin: IAdmins,
  user: IUser,
  file: IUploadFile
): Promise<IUser> => {
  let result = null;
  const session = await mongoose.startSession();
  try {
    const image = await FileUploadHelper.uploadToCloudinary(file);
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    user.role = 'admin';
    const newUser = await User.create([user], { session });
    if (!user) {
      throw new Error('User creation failed');
    }
    (admin.userId = newUser[0]._id),
      (admin.adminId = newUser[0].id),
      (admin.name = newUser[0].name),
      (admin.email = newUser[0].email),
      (admin.phone = newUser[0].phone),
      (admin.profile = image?.secure_url);

    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin) {
      throw new Error('Admin profile creation failed');
    }
    result = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return result;
};

export const userService = {
  createStudent,
  createTeacher,
  createAdmin,
};
