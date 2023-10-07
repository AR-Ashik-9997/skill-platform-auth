import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import { ICloudinaryResponse, IUploadFile } from '../interfaces/files';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName as string,
  api_key: config.cloudinary.apiKey as string,
  api_secret: config.cloudinary.apiSecret as string,
});

const studentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/student/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const teacherStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/teacher/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const adminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/admin/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const superAdminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/admin/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const studentupload = multer({ storage: studentStorage });
const teacherupload = multer({ storage: teacherStorage });
const adminupload = multer({ storage: adminStorage });
const superAdminupload = multer({ storage: superAdminStorage });
const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  studentupload,
  teacherupload,
  adminupload,
  superAdminupload,
};
