import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { userService } from './user.service';
import { IUploadFile } from '../../../interfaces/files';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { ...studentData } = req.body;
  const result = await userService.createStudent(studentData);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created and student profile update successfully',
    data: result,
  });
});
const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const { teacher, ...user } = req.body;
  const file = req.file as IUploadFile;
  const result = await userService.createTeacher(teacher, user, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created and teacher profile update successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...user } = req.body;
  const file = req.file as IUploadFile;
  const result = await userService.createAdmin(admin, user, file);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created and admin profile update successfully',
    data: result,
  });
});
export const userController = {
  createStudent,
  createTeacher,
  createAdmin,
};
