const express = require("express");
const router = express.Router();
const userRoutes =require("../controllers/authcontrollers");


router.post("/signup", userRoutes.signup);
router.post("/login", userRoutes.login);

module.exports = router;

