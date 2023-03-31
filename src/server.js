import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import handleAPIErrors from "./middlewares/errorHandler.middleware.js";

const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(handleAPIErrors);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server running in port: ${port}`));