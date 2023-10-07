import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
import { teacherController } from './teacher.controller';
import { teacherValidation } from './teacher.validation';

const router = express.Router();
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  teacherController.getAllTeachers
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TEACHER,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  teacherController.getSingleTeacher
);

router.patch(
  '/:id',
  requestValidation(teacherValidation.UpdateTeacherZodValidationSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TEACHER,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  teacherController.getUpdateTeacher
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  teacherController.DeleteTeacher
);

export const TeacherRoute = router;
