const express = require("express");

const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/get-user", getUserDetails);

module.exports = router;
