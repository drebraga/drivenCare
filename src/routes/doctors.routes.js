import { Router } from "express";
import doctorsControllers from "../controllers/doctors.controllers.js";
import doctorsSchemas from "../schema/doctors.schema.js";
import schemaValidate from "../middlewares/schema.middleware.js";
import checkHour from "../middlewares/checkHour.middleware.js";

const doctorsRoutes = Router();

doctorsRoutes.post("/signup", schemaValidate(doctorsSchemas.signUp), checkHour, doctorsControllers.signUp);
doctorsRoutes.post("/signin", schemaValidate(doctorsSchemas.signIn), doctorsControllers.signIn);

export default doctorsRoutes;