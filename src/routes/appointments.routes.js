import { Router } from "express";
import appointmentsControllers from "../controllers/appointments.controllers.js";
import appointSchemas from "../schema/appointments.schema.js";
import schemaValidate from "../middlewares/schema.middleware.js";
import userTypeValidate from "../middlewares/userType.middleware.js";
import authentication from "../middlewares/auth.middleware.js";
import hourAndDateValidation from "../middlewares/hourAndDateValidation.middleware.js";

const appointmentsRoutes = Router();

appointmentsRoutes.get(
  "/patient",
  authentication,
  userTypeValidate("patient"),
  appointmentsControllers.byUserId
);
appointmentsRoutes.get(
  "/doctor",
  authentication,
  userTypeValidate("doctor"),
  appointmentsControllers.byDoctorId
);
appointmentsRoutes.post(
  "/patient",
  authentication,
  userTypeValidate("patient"),
  schemaValidate(appointSchemas.create),
  hourAndDateValidation,
  appointmentsControllers.create
);
appointmentsRoutes.post(
  "/doctor/:id",
  authentication,
  userTypeValidate("doctor"),
  appointmentsControllers.confirm
);

export default appointmentsRoutes;
