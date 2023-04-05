const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  signup,
  refresh,
  changepassword,
} = require("../controllers/authcontroller");

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.post("/refresh", refresh);

router.put("/changepassword", changepassword);

module.exports = router;
