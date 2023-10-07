import express, { NextFunction, Request, Response } from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from '../user/user.validation';
import { userController } from './user.controller';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
import { FileUploadHelper } from '../../../helper/fileUploader';

const router = express.Router();

router.post(
  '/create-student',
  requestValidation(UserValidation.createStudentzodValidationSchema),
  userController.createStudent
);
router.post(
  '/create-teacher',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.teacherupload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createTeacherzodValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createTeacher(req, res, next);
  }
);
router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.adminupload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminzodValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createAdmin(req, res, next);
  }
);

export const UserRoute = router;
