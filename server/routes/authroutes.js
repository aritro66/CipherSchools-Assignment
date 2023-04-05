const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  signup,
  refresh,
} = require("../controllers/authcontroller");

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.post("/refresh", refresh);

module.exports = router;
