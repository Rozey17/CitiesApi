const express = require("express");
const router = express.Router();
const cityController = require("./cityController");
const authController = require("./authController");

router.route("/").get(cityController.getAll);
router.route("/:id").get(cityController.getCity);
router.route("/:id").put(cityController.update);
router.route("/:id").delete(cityController.delete);

module.exports = router;
