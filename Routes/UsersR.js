const express = require("express");
const router = express.Router();
const controller = require("../Controllers/UsersC");
const { registerV, loginV } = require("../Middlewares/UsersM");

router.post("/login", loginV, controller.login);
router.post("/register", registerV, controller.register);

module.exports = router;
