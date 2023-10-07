import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';
import { IStudents } from './student.interface';
import { Student } from './student.model';
import { IUploadFile } from '../../../interfaces/files';
import { FileUploadHelper } from '../../../helper/fileUploader';

const getAllStudent = async (): Promise<IStudents[]> => {
  const result = await Student.find({});
  return result;
};
const getSingleStudent = async (id: string): Promise<IStudents | null> => {
  const existingStudent = await Student.findOne({ studentId: id });
  if (!existingStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }
  const result = await Student.findById({ _id: existingStudent._id });
  return result;
};
const getUpdateStudent = async (
  id: string,
  payload: Partial<IStudents>,
  file: IUploadFile
): Promise<IStudents | null> => {
  const existingStudent = await Student.findOne({ studentId: id });
  if (!existingStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }
  if (file) {
    const image = await FileUploadHelper.uploadToCloudinary(file);
    await Student.findByIdAndUpdate(
      { _id: existingStudent._id },
      {
        profile: image?.secure_url,
      },
      {
        new: true,
      }
    );
  }
  const result = await Student.findByIdAndUpdate(
    { _id: existingStudent._id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const DeleteStudent = async (id: string): Promise<IStudents | null> => {
  const existingStudent = await Student.findOne({ id });
  if (!existingStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  getUpdateStudent,
  DeleteStudent,
};
