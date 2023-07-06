const express = require("express");
const router = express.Router();
const controller = require("../Controllers/GameC");
const { gameV } = require("../Middlewares/GameM");
const { authenticateToken } = require("../Middlewares/authToken");

router.route("/Play").get(authenticateToken, gameV, controller.play);
router.route("/Winners").get(controller.winners);

module.exports = router;
