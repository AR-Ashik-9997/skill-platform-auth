import { Admin } from "../admin/admin.model";
import { Student } from "../students/student.model";
import { Teacher } from "../teachers/teacher.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createStudent = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  if (result) {
    await Student.create({
      userId: result._id,
      name: result.name,
      email: result.email,
      phone: result.phone,
    });
  }
  return result;
};
const createTeacher = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  if (result) {
    await Teacher.create({
      userId: result._id,
      name: result.name,
      email: result.email,
      phone: result.phone,
    });
  }
  return result;
};
const createAdmin = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  if (result) {
    await Admin.create({
      userId: result._id,
      name: result.name,
      email: result.email,
      phone: result.phone,
    });
  }
  return result;
};

export const userService = {
  createStudent,
  createTeacher,
  createAdmin
};
