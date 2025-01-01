import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddExamModel from "./AddExamModel";

const AdminExams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = (exam = null) => {
    setSelectedExam(exam); // Pass exam data if editing, or null for adding
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedExam(null);
    setIsModalOpen(false);
  };

  const fetchExams = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/exam/get-exams"
      );
      setExams(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setLoading(false);
    }
  };

  const handleAddOrUpdateExam = (updatedExam) => {
    setExams((prevExams) => {
      const index = prevExams.findIndex((exam) => exam._id === updatedExam._id);
      if (index !== -1) {
        // Update existing exam
        const newExams = [...prevExams];
        newExams[index] = updatedExam;
        return newExams;
      }
      // Add new exam
      return [updatedExam, ...prevExams];
    });
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const deleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/exam/delete-exam/${id}`);
      alert("Exam deleted successfully!");
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[300px] bg-gray-100 p-6 flex flex-col h-full">
        <h1 className="text-[35px] font-bold text-blue-800">Exam Pilot</h1>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button className="w-full text-left text-white bg-blue-800 py-2 px-4 rounded">
                Exams
              </button>
            </li>
            <li>
              <button className="w-full text-left text-gray-700 py-2 px-4 rounded hover:bg-gray-200">
                Lecturers
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex-grow"></div>
        <button
          className="bg-red-600 text-white w-full py-2 px-4 rounded hover:bg-red-700 transition-colors"
          onClick={() => {
            localStorage.removeItem("userEmail");
            navigate("/log-in");
          }}
        >
          Log Out
        </button>
      </aside>

      <main className="w-full bg-white p-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Exams</h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-800 text-white py-2 px-4 rounded"
          >
            + add new exam
          </button>
        </header>

        {isModalOpen && (
          <AddExamModel
            handleCloseModal={handleCloseModal}
            onExamAdded={handleAddOrUpdateExam}
            selectedExam={selectedExam}
          />
        )}

        <section className="mt-6">
          {loading ? (
            <div>Loading exams...</div>
          ) : exams.length === 0 ? (
            <div>No exams found.</div>
          ) : (
            <ul>
              {exams.map((exam) => (
                <li
                  key={exam._id}
                  className="flex justify-between items-center border border-gray-300 rounded p-4 mb-4"
                >
                  <div className="text-sm font-semibold">{exam.name}</div>
                  <div className="text-sm">{exam.assigned_lecturer}</div>
                  <div className="text-sm">{exam.start_date}</div>
                  <div className="text-sm">{exam.duration}</div>
                  <div className="text-sm">{exam.module_code}</div>
                  <div className="text-sm">{exam.semester}</div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-gray-100 p-2 rounded hover:bg-gray-200"
                      onClick={() => handleOpenModal(exam)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-gray-100 p-2 rounded hover:bg-gray-200"
                      onClick={() => deleteExam(exam._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminExams;
