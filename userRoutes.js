const express = require("express");
const authController = require("./authController");

const router = express.Router();

router.route("/").post(authController.signup);

module.exports = router;
