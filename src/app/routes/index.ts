import express from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { StudentRoute } from "../modules/students/student.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/student",
    route: StudentRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
