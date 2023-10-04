import httpStatus from "http-status";
import ApiError from "../../../eroors/apiErrorHandler";
import { JwtPayload } from "jsonwebtoken";
import { ISuperAdmin } from "./superAdmin.interface";
import { SuperAdmin } from "./superAdmin.model";

const getSingleAdmin = async (id: string): Promise<ISuperAdmin | null> => {
  const result = await SuperAdmin.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Super Admin not found");
  }
  return result;
};
const getUpdateAdmin = async (
  user: JwtPayload,
  payload: Partial<ISuperAdmin>
): Promise<ISuperAdmin | null> => {
  const existingAdmin = await SuperAdmin.findOne({ userId: user._id });
  if (!existingAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Super Admin not found");
  } else {
    const result = await SuperAdmin.findOneAndUpdate(
      { _id: existingAdmin._id },
      payload,
      {
        new: true,
      }
    );

    return result;
  }
};
const DeleteAdmin = async (id: string): Promise<ISuperAdmin | null> => {
  const existingAdmin = await SuperAdmin.findOne({ id });
  if (!existingAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Super Admin not found");
  }
  const result = await SuperAdmin.findByIdAndDelete(id);
  return result;
};

export const superAdminService = {
  getSingleAdmin,
  getUpdateAdmin,
  DeleteAdmin,
};
