const express = require("express");
const router = express.Router();
const { updateuser, followers } = require("../controllers/usercontroller");

router.put("/updateuser", updateuser);

router.get("/followers", followers);

module.exports = router;
