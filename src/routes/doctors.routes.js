import { Router } from "express";
import doctorsControllers from "../controllers/doctors.controllers.js";
import doctorsSchemas from "../schema/doctors.schema.js";
import schemaValidate from "../middlewares/schema.middleware.js";
import hourValidation from "../middlewares/hourValidation.middleware.js";
import authentication from "../middlewares/auth.middleware.js";

const doctorsRoutes = Router();

doctorsRoutes.get(
  "/by-name/:name",
  authentication,
  doctorsControllers.doctorsByName
);

doctorsRoutes.get(
  "/by-specialty/:specialty",
  authentication,
  doctorsControllers.doctorsBySpecialty
);

doctorsRoutes.get(
  "/by-address/:localization",
  authentication,
  doctorsControllers.doctorsByLocalization
);

doctorsRoutes.post(
  "/signup",
  schemaValidate(doctorsSchemas.signUp),
  hourValidation,
  doctorsControllers.signUp
);

doctorsRoutes.post(
  "/signin",
  schemaValidate(doctorsSchemas.signIn),
  doctorsControllers.signIn
);

export default doctorsRoutes;
