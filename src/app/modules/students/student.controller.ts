import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IStudents } from "./student.interface";
import { sendResponse } from "../../../shared/sendResponseApi";
import httpStatus from "http-status";
import { StudentService } from "./student.service";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getAllStudent();
  sendResponse<IStudents[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Students retrived successfully",
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponse<IStudents>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single Students retrived successfully",
    data: result,
  });
});

const getUpdateStudent = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const { ...updateData } = req.body;
  const result = await StudentService.getUpdateStudent(user, updateData);
  sendResponse<IStudents>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Update Students retrived successfully",
    data: result,
  });
});
const DeleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.DeleteStudent(id);
  sendResponse<IStudents>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Update Students retrived successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  getUpdateStudent,
  DeleteStudent,
};
