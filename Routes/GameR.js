const express = require("express");
const router = express.Router();
const controller = require("../Controllers/GameC");
const { gameV } = require("../Middlewares/GameM");
const { authenticateToken } = require("../Middlewares/authToken");

router.route("/Play").get(authenticateToken, gameV, controller.play);

module.exports = router;
