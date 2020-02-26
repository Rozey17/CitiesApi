const express = require("express");
const router = express.Router();
const cityController = require("./cityController");
const authController = require("./authController");

router.route("/").get(authController.protect, cityController.getAll);
router.route("/:id").get(authController.protect, cityController.getCity);
router.route("/:id").put(authController.protect, cityController.update);
router.route("/:id").delete(authController.protect, cityController.delete);

module.exports = router;
