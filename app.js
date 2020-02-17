const express = require("express");
const app = express();
const router = require("./cityRoutes");
const globalErrorHandler = require("./errorController");
const AppError = require("./appError");
const morgan =require('morgan')
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/v1/cities", router);
app.use("/api/v1/cities/:id", router);
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

module.exports = app;
