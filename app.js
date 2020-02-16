const express = require("express");
const app = express();
const router = require("./cityRoutes");
app.use(express.json());
app.use("/api/v1/cities", router);
app.use("/api/v1/cities/:id", router);

module.exports = app;
