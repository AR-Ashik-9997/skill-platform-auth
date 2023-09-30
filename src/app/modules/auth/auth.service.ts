import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../../helper/jwtHelper";
import { User } from "../user/user.model";
import ApiError from "../../../eroors/apiErrorHandler";
import httpStatus from "http-status";
import {
  IChangePassword,
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from "./auth.interface";
import bcrypt from "bcrypt";

const LoginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;
  const user = new User();
  const isExistUser = await user.isExistEmail(email);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    isExistUser?.password &&
    !(await bcrypt.compare(password, isExistUser?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }

  const { id: userId, _id } = (await User.findOne(
    { email: email },
    { id: 1, _id: 1 }
  ).lean()) as {
    id: string;
    _id: string;
  };
  const { role, email: useremail, name } = isExistUser;
  const accessToken = jwtHelper.createToken(
    { _id, userId, role, useremail, name },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.createToken(
    { _id, userId, role, useremail, name },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return { accessToken, refreshToken };
};

const RefreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verified = null;
  try {
    verified = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid refresh token");
  }

  const { _id: ids } = verified;

  const isExistUser = await User.findById(ids);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const { _id, id: userId, role, email, name } = isExistUser;
  const newAccessToken = jwtHelper.createToken(
    { _id, userId, role, email, name },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken: newAccessToken };
};
const changedPassword = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isExistUser = await User.findOne({ id: user?.userId }).select(
    "password"
  );
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    isExistUser?.password &&
    !(await bcrypt.compare(oldPassword, isExistUser?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );
  if (hashedPassword) {
    await User.findOneAndUpdate(
      { id: user?.userId },
      { password: hashedPassword },
      { new: true }
    );
  }
};

export const authService = {
  LoginUser,
  RefreshToken,
  changedPassword,
};
