import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddLecturerModal from "./LecturerModal";

const Lecturers = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [lecturers, setLecturers] = useState([]);

  // Fetch all lecturers
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/user/get-lecterers"
        );
        setLecturers(data);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchLecturers();
  }, []);

  const handleOpenModal = (lecturer = null) => {
    setSelectedLecturer(lecturer); // Pass lecturer data if editing, or null for adding
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLecturer(null);
    setIsModalOpen(false);
  };

  const handleAddOrUpdateLecturer = (updatedLecturer) => {
    // Update the lecturers list
    console.log(updatedLecturer);

    if (selectedLecturer) {
      setLecturers((prev) =>
        prev.map((lecturer) =>
          lecturer._id === updatedLecturer._id ? updatedLecturer : lecturer
        )
      );
    } else {
      setLecturers((prev) => [...prev, updatedLecturer]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[300px] bg-gray-100 p-6 flex flex-col h-full">
        <h1 className="text-[35px] font-bold text-blue-800">Exam Pilot</h1>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button
                className="w-full text-left text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
                onClick={() => navigate("/admin-exams")}
              >
                Exams
              </button>
            </li>
            <li>
              <button className="w-full text-left text-white bg-blue-800 py-2 px-4 rounded">
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

      {/* Main Content */}
      <main className="flex-grow bg-white p-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Lecturers</h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-800 text-white py-2 px-4 rounded"
          >
            + Add New Lecturer
          </button>
        </header>

        {/* Display List of Lecturers */}
        <section className="mt-6">
          <h3 className="font-semibold mb-4">Lecturers List</h3>
          {lecturers.length === 0 ? (
            <p>No lecturers found.</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Name</th>
                  <th className="border border-gray-200 px-4 py-2">Email</th>
                  <th className="border border-gray-200 px-4 py-2">DOB</th>
                  <th className="border border-gray-200 px-4 py-2">Contact</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((lecturer) => (
                  <tr key={lecturer._id}>
                    <td className="border border-gray-200 px-4 py-2">
                      {lecturer.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {lecturer.email}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {lecturer.DOB}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {lecturer.contact_no}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button
                        onClick={() => handleOpenModal(lecturer)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {isModalOpen && (
          <AddLecturerModal
            handleCloseModal={handleCloseModal}
            onLecturerAdded={handleAddOrUpdateLecturer}
            selectedLecturer={selectedLecturer}
          />
        )}
      </main>
    </div>
  );
};

export default Lecturers;
