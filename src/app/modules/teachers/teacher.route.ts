import express from "express";
import requestValidation from "../../../middleware/requestValidation";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enum/user";
import { teacherController } from "./teacher.controller";
import { teacherValidation } from "./teacher.validation";

const router = express.Router();
router.get("/", auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.TEACHER), teacherController.getAllTeachers);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.TEACHER),
  teacherController.getSingleTeacher
);

router.patch(
  "/update",
  requestValidation(teacherValidation.UpdateTeacherZodValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.TEACHER),
  teacherController.getUpdateTeacher
);
router.delete(
  "/delete/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  teacherController.DeleteTeacher
);

export const TeacherRoute = router;
