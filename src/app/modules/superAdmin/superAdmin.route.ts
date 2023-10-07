import express, { NextFunction, Request, Response } from 'express';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
import { superAdminController } from './superAdmin.controller';
import { superAdminValidation } from './superAdmin.validation';
import { FileUploadHelper } from '../../../helper/fileUploader';

const router = express.Router();
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.getSingleAdmin
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.superAdminupload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = superAdminValidation.UpdateSuperAdminZodValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return superAdminController.getUpdateAdmin(req, res, next);
  }
);

export const superAdminRoute = router;
