import express from "express";
import requestValidation from "../../../middleware/requestValidation";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enum/user";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = express.Router();
router.get("/", auth(ENUM_USER_ROLE.SUPER_ADMIN), adminController.getAllAdmins);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.getSingleAdmin
);

router.patch(
  "/update",
  requestValidation(adminValidation.UpdateAdminZodValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.getUpdateAdmin
);
router.delete(
  "/delete/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.DeleteAdmin
);

export const AdminRoute = router;
