const express = require("express");
const router = express.Router();
const controller = require("../Controllers/UsersC");
const { registerV } = require("../Middlewares/UsersM");

router.post("/login", controller.login);
router.post("/register", registerV, controller.register);

module.exports = router;
