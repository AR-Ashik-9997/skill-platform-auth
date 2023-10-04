import express from "express";
import requestValidation from "../../../middleware/requestValidation";
import { UserValidation } from "../user/user.validation";
import { userController } from "./user.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enum/user";

const router = express.Router();

router.post(
  "/create-student",
  requestValidation(UserValidation.createUserzodValidationSchema),
  userController.createStudent
);
router.post(
  "/create-teacher",
  requestValidation(UserValidation.createUserzodValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  userController.createTeacher
);
router.post(
  "/create-admin",
  requestValidation(UserValidation.createUserzodValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  userController.createAdmin
);

export const UserRoute = router;
