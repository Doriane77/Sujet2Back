const express = require("express");
const router = express.Router();
const controller = require("../Controllers/PatriesC");
const { registerV } = require("../Middlewares/PatriesM");

router.route("/Patries").post(registerV, controller.register);

module.exports = router;
