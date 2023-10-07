import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';
import { ISuperAdmin } from './superAdmin.interface';
import { SuperAdmin } from './superAdmin.model';
import { IUploadFile } from '../../../interfaces/files';
import { FileUploadHelper } from '../../../helper/fileUploader';

const getSingleAdmin = async (id: string): Promise<ISuperAdmin | null> => {
  const existingAdmin = await SuperAdmin.findOne({ userId: id });

  if (!existingAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Super Admin not found');
  }
  const result = await SuperAdmin.findById({ _id: existingAdmin?._id });
  return result;
};
const getUpdateAdmin = async (
  id: string,
  file: IUploadFile,
  payload: Partial<ISuperAdmin>
): Promise<ISuperAdmin | null> => {
  const existingAdmin = await SuperAdmin.findOne({ userId: id });
  if (!existingAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Super Admin not found');
  }
  if (file) {
    const image = await FileUploadHelper.uploadToCloudinary(file);
    await SuperAdmin.findByIdAndUpdate(
      { _id: existingAdmin._id },
      {
        profile: image?.secure_url,
      },
      {
        new: true,
      }
    );
  }
  const result = await SuperAdmin.findOneAndUpdate(
    { _id: existingAdmin._id },
    payload,
    {
      new: true,
    }
  );

  return result;
};

export const superAdminService = {
  getSingleAdmin,
  getUpdateAdmin,
};
