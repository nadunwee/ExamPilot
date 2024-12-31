const Exam = require("../models/ExamModel");

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
    // Create a new exam document
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
    res.status(500).json({ error: error.message });
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find(); // Fetch all exams from the database
    res.status(200).json(exams); // Send the exams as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

const deleteExam = async (req, res) => {
  const { id } = req.query; // Access query parameters

  try {
    const deletedExam = await Exam.findOneAndDelete({ id });
    if (!deletedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExam = async (req, res) => {
  const { id } = req.params; // Access the exam ID from the URL
  const updates = req.body; // Data to update

  try {
    // Find the exam by ID and update it
    const updatedExam = await Exam.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updates follow the schema validation rules
    });

    if (!updatedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res
      .status(200)
      .json({ message: "Exam updated successfully", exam: updatedExam });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the exam" });
  }
};

module.exports = { createExam, getExams, deleteExam, updateExam };
