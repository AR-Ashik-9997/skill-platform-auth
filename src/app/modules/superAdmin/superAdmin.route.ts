import express from "express";
import requestValidation from "../../../middleware/requestValidation";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enum/user";
import { superAdminController } from "./superAdmin.controller";
import { superAdminValidation } from "./superAdmin.validation";

const router = express.Router();
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.getSingleAdmin
);
router.patch(
  "/update",
  requestValidation(superAdminValidation.UpdateSuperAdminZodValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.getUpdateAdmin
);
router.delete(
  "/delete/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.DeleteAdmin
);

export const superAdminRoute = router;
