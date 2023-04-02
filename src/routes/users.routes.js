import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";
import usersSchemas from "../schema/users.schema.js";
import schemaValidate from "../middlewares/schema.middleware.js";

const userRoutes = Router();

userRoutes.get("/doctor/by-name/:name", usersControllers.doctorsByName);
userRoutes.get("/doctor/by-specialty/:specialty", usersControllers.doctorsBySpecialty);
userRoutes.get("/doctor/by-address/:localization", usersControllers.doctorsByLocalization);
userRoutes.post("/signup", schemaValidate(usersSchemas.signUp), usersControllers.signUp);
userRoutes.post("/signin", schemaValidate(usersSchemas.signIn), usersControllers.signIn);

export default userRoutes;