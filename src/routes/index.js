import { Router } from "express";
import userRoutes from "./users.routes.js";
import doctorsRoutes from "./doctors.routes.js";
import appointmentsRoutes from "./appointments.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/doctors", doctorsRoutes);
routes.use("/appointments", appointmentsRoutes);

export default routes;
