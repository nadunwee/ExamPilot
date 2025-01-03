const express = require("express");

const {
  createExam,
  getExams,
  deleteExam,
  updateExam,
} = require("../controllers/examController");

const router = express.Router();

router.post("/create-exam", createExam);
router.get("/get-exams", getExams);
router.delete("/delete-exam/:id", deleteExam);
router.put("/update-exam/:id", updateExam);

module.exports = router;
