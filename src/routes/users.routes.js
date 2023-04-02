import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";
import usersSchemas from "../schema/users.schema.js";
import schemaValidate from "../middlewares/schema.middleware.js";
import authentication from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/doctor/by-name/:name", authentication, usersControllers.doctorsByName);
userRoutes.get("/doctor/by-specialty/:specialty", authentication, usersControllers.doctorsBySpecialty);
userRoutes.get("/doctor/by-address/:localization", authentication, usersControllers.doctorsByLocalization);
userRoutes.post("/signup", schemaValidate(usersSchemas.signUp), usersControllers.signUp);
userRoutes.post("/signin", schemaValidate(usersSchemas.signIn), usersControllers.signIn);

export default userRoutes;