import mongoose from "mongoose";
import { Admin } from "../admin/admin.model";
import { Student } from "../students/student.model";
import { Teacher } from "../teachers/teacher.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateStudentId, generateTeacherId } from "./utils";

const createStudent = async (payload: IUser): Promise<IUser | null> => {
  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId();
    payload.id = id;
    const user = await User.create([payload], { session });
    if (!user) {
      throw new Error("User creation failed");
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
      throw new Error("Student profile creation failed");
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

const createTeacher = async (payload: IUser): Promise<IUser | null> => {
  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateTeacherId();
    payload.id = id;
    const user = await User.create([payload], { session });
    if (!user) {
      throw new Error("User creation failed");
    }
    const teacherData = {
      userId: user[0]._id,
      teacherId: user[0].id,
      name: user[0].name,
      email: user[0].email,
      phone: user[0].phone,
    };
    const newTeacher = await Teacher.create([teacherData], { session });
    if (!newTeacher) {
      throw new Error("Teacher profile creation failed");
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

const createAdmin = async (payload: IUser): Promise<IUser | null> => {
  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    payload.id = id;
    const user = await User.create([payload], { session });
    if (!user) {
      throw new Error("User creation failed");
    }
    const adminData = {
      userId: user[0]._id,
      adminId: user[0].id,
      name: user[0].name,
      email: user[0].email,
      phone: user[0].phone,
    };
    const newAdmin = await Admin.create([adminData], { session });
    if (!newAdmin) {
      throw new Error("Admin profile creation failed");
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

export const userService = {
  createStudent,
  createTeacher,
  createAdmin,
};
