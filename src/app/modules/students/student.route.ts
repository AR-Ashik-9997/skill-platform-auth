import express from "express";
import requestValidation from "../../../middleware/requestValidation";
import { StudentController } from "./student.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enum/user";
import { StudentValidation } from "./student.validation";

const router = express.Router();
router.get("/", StudentController.getAllStudent);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getSingleStudent
);

router.patch(
  "/update",
  requestValidation(StudentValidation.UpdateStudentZodValidationSchema),
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getUpdateStudent
);
router.delete(
  "/delete/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  StudentController.DeleteStudent
);

export const StudentRoute = router;
