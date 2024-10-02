import express from "express";
import userRoutes from "./routers/userRoutes.js";
import geoRoutes from "./routers/geoRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/routes", geoRoutes);
app.all("*", (req, res, next) =>
  next(new AppError(`Cannot find ${req.originalUrl} from the server.`, 404))
);

app.use(globalErrorHandler);

export default app;
