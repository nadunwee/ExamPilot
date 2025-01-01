const Exam = require("../models/ExamModel");

// Create a new exam
const createExam = async (req, res) => {
  const {
    name,
    duration,
    module_code,
    description,
    subject_area,
    module,
    semester,
    assigned_lecturer,
    start_date,
    no_of_questions,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !duration ||
    !module_code ||
    !description ||
    !subject_area ||
    !module ||
    !semester ||
    !assigned_lecturer ||
    !start_date ||
    !no_of_questions
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const exam = await Exam.create({
      name,
      duration,
      module_code,
      description,
      subject_area,
      module,
      semester,
      assigned_lecturer,
      start_date,
      no_of_questions,
    });

    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Failed to create exam" });
  }
};

// Get all exams
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

const deleteExam = async (req, res) => {
  const { id } = req.params; // Get the exam ID from the URL

  try {
    const deletedExam = await Exam.findByIdAndDelete(id); // Delete the exam by ID
    if (!deletedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an exam
const updateExam = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: "Exam ID is required" });
  }

  try {
    const updatedExam = await Exam.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res
      .status(200)
      .json({ message: "Exam updated successfully", exam: updatedExam });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Failed to update exam" });
  }
};

module.exports = { createExam, getExams, deleteExam, updateExam };
