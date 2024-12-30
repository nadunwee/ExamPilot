import React, { useState } from "react";
import AddExamModel from "./AddExamModel";
import { useNavigate } from "react-router-dom";

const AdminExams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/log-in");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
          onClick={handleLogout}
        >
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="w-full bg-white p-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Exams</h2>
          <button
            onClick={handleOpenModal}
            className="bg-blue-800 text-white py-2 px-4 rounded"
          >
            + add new exam
          </button>
        </header>

        {/* Modal */}
        {isModalOpen && <AddExamModel handleCloseModal={handleCloseModal} />}

        {/* Filters */}
        <section className="mt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold">course Categories</h3>
              <div className="flex space-x-2 mt-2">
                <div className="bg-gray-200 rounded h-8 w-24"></div>
                <div className="bg-gray-200 rounded h-8 w-24"></div>
                <div className="bg-gray-200 rounded h-8 w-24"></div>
                <div className="bg-gray-200 rounded h-8 w-24"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">search Courses</h3>
              <div className="bg-gray-200 rounded h-8 w-48 mt-2"></div>
            </div>
          </div>
        </section>

        {/* Exams List */}
        <section className="mt-6">
          <ul>
            {[1, 2, 3].map((exam) => (
              <li
                key={exam}
                className="flex justify-between items-center border border-gray-300 rounded p-4 mb-4"
              >
                <div className="text-sm font-semibold">
                  Internet and web technologies - IT2310
                </div>
                <div className="text-sm">Dr John</div>
                <div className="text-sm">Web Dec 3 20:00</div>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                    ✏️
                  </button>
                  <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminExams;
