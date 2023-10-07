import express from 'express';
import requestValidation from '../../../middleware/requestValidation';

import { authController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';

const router = express.Router();
router.post(
  '/login',
  requestValidation(AuthValidation.UserLoginzodValidationSchema),
  authController.LoginUser
);
router.post(
  '/refresh-token',
  requestValidation(AuthValidation.refreshTokenZodSchema),
  authController.refreshToken
);
router.post(
  '/change-password',
  requestValidation(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TEACHER,
    ENUM_USER_ROLE.STUDENT
  ),
  authController.changedPassword
);

export const AuthRoute = router;
