import express, { NextFunction, Request, Response } from "express";
import { StudentController } from "./student.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enum/user";
import { StudentValidation } from "./student.validation";
import { FileUploadHelper } from "../../../helper/fileUploader";
import requestValidation from "../../../middleware/requestValidation";

const router = express.Router();
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.STUDENT),
  StudentController.getAllStudent
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT),
  StudentController.getSingleStudent
);

router.patch(
  "/update",  
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  FileUploadHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StudentValidation.UpdateStudentZodValidationSchema.parse(JSON.parse(req.body.data))
    return StudentController.getUpdateStudent(req, res, next)
} 
);


router.delete(
  "/delete/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.DeleteStudent
);

export const StudentRoute = router;
