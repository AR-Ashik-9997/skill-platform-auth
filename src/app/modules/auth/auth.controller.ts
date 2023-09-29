import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";

import httpStatus from "http-status";
import { IUser } from "../user/user.interface";
import config from "../../../config";
import { IRefreshTokenResponse, IUserLoginResponse } from "./auth.interface";
import { sendLoginResponse, sendResponse } from "../../../shared/sendResponseApi";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await authService.createUser(userData);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully",
    data: result,
  });
});

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.LoginUser(loginData);
  const { refreshToken,...other } = result;
  const cookie = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookie);
  sendLoginResponse<IUserLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: other.accessToken as any,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.RefreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendLoginResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    token: result.accessToken as any,
  });
});
export const authController = { createUser, LoginUser, refreshToken };