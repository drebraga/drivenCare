import { Router } from "express";
import appointmentsControllers from "../controllers/appointments.controllers.js";
import appointSchemas from "../schema/appointments.schema.js";
import schemaValidate from "../middlewares/schema.middleware.js";
import authentication from "../middlewares/auth.middleware.js";
import hourAndDateValidation from "../middlewares/hourAndDateValidation.middleware.js";

const appointmentsRoutes = Router();

appointmentsRoutes.get(
  "/patient",
  authentication,
  appointmentsControllers.byUserId
);
appointmentsRoutes.get(
  "/doctor",
  authentication,
  appointmentsControllers.byDoctorId
);
appointmentsRoutes.post(
  "/patient",
  authentication,
  schemaValidate(appointSchemas.create),
  hourAndDateValidation,
  appointmentsControllers.create
);
appointmentsRoutes.post(
  "/doctor",
  authentication,
  appointmentsControllers.confirm
);

export default appointmentsRoutes;
