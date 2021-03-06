const express = require("express");
const app = express();
const router = require("./cityRoutes");
const userRouter = require("./userRoutes");
const globalErrorHandler = require("./errorController");
const AppError = require("./appError");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}
app.use("/api/v1/cities", router);
app.use("/api/v1/cities/:id", router);
app.use("/api/v1/", userRouter);
//app.use("/api/v1/", userRouter);

app.use(globalErrorHandler);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
// });

module.exports = app;
