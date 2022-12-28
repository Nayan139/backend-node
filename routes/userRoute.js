const express = require("express");
const User = require("../controller/userController");

const router = express.Router();

router.post("/signup", User.signupUser);

router.post("/login", User.loginUser);

router.get("/alluser", User.allUsers);

module.exports = router;
