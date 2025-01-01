import axios from "axios";

// Fetch all exams from the server
export const fetchExams = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/exam/get-exams"
    );
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.error || "An error occurred while fetching exams."
    );
  }
};

// Delete an exam by ID
export const deleteExam = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/api/exam/delete-exam/${id}`);
  } catch (err) {
    throw new Error(
      err.response?.data?.error || "An error occurred while deleting the exam."
    );
  }
};
