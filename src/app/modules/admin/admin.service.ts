import httpStatus from "http-status";
import ApiError from "../../../eroors/apiErrorHandler";
import { JwtPayload } from "jsonwebtoken";
import { IAdmins } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdmins = async (): Promise<IAdmins[]> => {
  const result = await Admin.find({});
  return result;
};
const getSingleAdmin = async (id: string): Promise<IAdmins | null> => {
  const result = await Admin.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  return result;
};
const getUpdateAdmin = async (
  user: JwtPayload,
  payload: Partial<IAdmins>
): Promise<IAdmins | null> => {
  const existingAdmin = await Admin.findOne({ userId: user._id });
  if (!existingAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  } else {
    const result = await Admin.findOneAndUpdate(
      { _id: existingAdmin._id },
      payload,
      {
        new: true,
      }
    );

    return result;
  }
};
const DeleteAdmin = async (id: string): Promise<IAdmins | null> => {
  const existingAdmin = await Admin.findOne({ id });
  if (!existingAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  const result = await Admin.findByIdAndDelete(id);
  return result;
};

export const adminService = {
  getAllAdmins,
  getSingleAdmin,
  getUpdateAdmin,
  DeleteAdmin,
};
