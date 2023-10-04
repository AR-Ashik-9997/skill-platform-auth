import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponseApi";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { ISuperAdmin } from "./superAdmin.interface";
import { superAdminService } from "./superAdmin.service";


const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await superAdminService.getSingleAdmin(id);
  sendResponse<ISuperAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single Admin retrived successfully",
    data: result,
  });
});

const getUpdateAdmin = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const { ...updateData } = req.body;
  const result = await superAdminService.getUpdateAdmin(user, updateData);
  sendResponse<ISuperAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Update Admin retrived successfully",
    data: result,
  });
});
const DeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await superAdminService.DeleteAdmin(id);
  sendResponse<ISuperAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Update Admin retrived successfully",
    data: result,
  });
});

export const superAdminController = {
  getSingleAdmin,
  getUpdateAdmin,
  DeleteAdmin,
};
