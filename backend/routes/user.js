const express = require("express");

const {
  registerUser,
  loginUser,
  getUserDetails,
  getLecturers,
  updateLecturerDetails,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/get-user", getUserDetails);
router.get("/get-lecterers", getLecturers);
router.put("/update-lecterers/:id", updateLecturerDetails);

module.exports = router;
