import { Router } from "express";
import userRoutes from "./users.routes.js";
import doctorsRoutes from "./doctors.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/doctors", doctorsRoutes);

export default routes;