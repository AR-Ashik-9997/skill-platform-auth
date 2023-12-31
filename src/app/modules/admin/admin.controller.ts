import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { IAdmins } from './admin.interface';
import { adminService } from './admin.service';
import { IUploadFile } from '../../../interfaces/files';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllAdmins();
  sendResponse<IAdmins[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Admins retrived successfully',
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.getSingleAdmin(id);
  sendResponse<IAdmins>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Admin retrived successfully',
    data: result,
  });
});

const getUpdateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const file = req.file as IUploadFile;
  const { ...updateData } = req.body;
  const result = await adminService.getUpdateAdmin(id, file, updateData);
  sendResponse<IAdmins>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Admin retrived successfully',
    data: result,
  });
});
const DeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.DeleteAdmin(id);
  sendResponse<IAdmins>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Admin retrived successfully',
    data: result,
  });
});

export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  getUpdateAdmin,
  DeleteAdmin,
};
