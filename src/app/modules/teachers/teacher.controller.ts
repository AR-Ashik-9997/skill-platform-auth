import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { teacherService } from './teacher.service';
import { ITeachers } from './teacher.interface';

const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const result = await teacherService.getAllTeachers();
  sendResponse<ITeachers[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Teachers retrived successfully',
    data: result,
  });
});
const getSingleTeacher = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await teacherService.getSingleTeacher(id);
  sendResponse<ITeachers>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Teacher retrived successfully',
    data: result,
  });
});

const getUpdateTeacher = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateData } = req.body;
  const result = await teacherService.getUpdateTeacher(id, updateData);
  sendResponse<ITeachers>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Teacher retrived successfully',
    data: result,
  });
});
const DeleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await teacherService.DeleteTeacher(id);
  sendResponse<ITeachers>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Teacher retrived successfully',
    data: result,
  });
});

export const teacherController = {
  getAllTeachers,
  getUpdateTeacher,
  DeleteTeacher,
  getSingleTeacher,
};
