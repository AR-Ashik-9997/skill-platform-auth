import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { ISuperAdmin } from './superAdmin.interface';
import { superAdminService } from './superAdmin.service';
import { IUploadFile } from '../../../interfaces/files';

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await superAdminService.getSingleAdmin(id);
  sendResponse<ISuperAdmin>(res, {
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
  const result = await superAdminService.getUpdateAdmin(id, file, updateData);
  sendResponse<ISuperAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Admin retrived successfully',
    data: result,
  });
});

export const superAdminController = {
  getSingleAdmin,
  getUpdateAdmin,
};
