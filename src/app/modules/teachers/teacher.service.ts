import httpStatus from "http-status";
import ApiError from "../../../eroors/apiErrorHandler";
import { JwtPayload } from "jsonwebtoken";
import { ITeachers } from "./teacher.interface";
import { Teacher } from "./teacher.model";

const getAllTeachers = async (): Promise<ITeachers[]> => {
  const result = await Teacher.find({});
  return result;
};
const getSingleTeacher = async (id: string): Promise<ITeachers | null> => {
  const result = await Teacher.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "teacher not found");
  }
  return result;
};
const getUpdateTeacher = async (
  user: JwtPayload,
  payload: Partial<ITeachers>
): Promise<ITeachers | null> => {
  const existingteacher = await Teacher.findOne({ userId: user._id });
  if (!existingteacher) {
    throw new ApiError(httpStatus.NOT_FOUND, "teacher not found");
  } else {
    const result = await Teacher.findOneAndUpdate(
      { _id: existingteacher._id },
      payload,
      {
        new: true,
      }
    );

    return result;
  }
};
const DeleteTeacher = async (id: string): Promise<ITeachers | null> => {
  const existingteacher = await Teacher.findOne({ id });
  if (!existingteacher) {
    throw new ApiError(httpStatus.NOT_FOUND, "teacher not found");
  }
  const result = await Teacher.findByIdAndDelete(id);
  return result;
};

export const teacherService = {
  getAllTeachers,
  getSingleTeacher,
  getUpdateTeacher,
  DeleteTeacher,
};
