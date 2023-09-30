import express from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { StudentRoute } from "../modules/students/student.route";
import { UserRoute } from "../modules/user/user.route";
import { TeacherRoute } from "../modules/teachers/teacher.route";
import { AdminRoute } from "../modules/admin/admin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/admin",
    route: AdminRoute,
  },
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/student",
    route: StudentRoute,
  },
  {
    path: "/teacher",
    route: TeacherRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
