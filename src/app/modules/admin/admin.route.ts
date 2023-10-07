import express, { NextFunction, Request, Response } from 'express';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';
import { FileUploadHelper } from '../../../helper/fileUploader';

const router = express.Router();
router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN), adminController.getAllAdmins);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.getSingleAdmin
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.adminupload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = adminValidation.UpdateAdminZodValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return adminController.getUpdateAdmin(req, res, next);
  }
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.DeleteAdmin
);

export const AdminRoute = router;
