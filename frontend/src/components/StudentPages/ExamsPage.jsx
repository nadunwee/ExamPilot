import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExams } from "../utils";
import axios from "axios";

const ExamsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]); // State to store exams
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        navigate("/log-in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:4000/api/user/get-user",
          { userEmail }
        );
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
        setLoading(false);
      }
    };

    fetchUserDetails();

    // Fetch exams from the server
    const loadExams = async () => {
      try {
        const examsData = await fetchExams();
        setExams(examsData); // Set fetched exams to the state
      } catch (err) {
        setError(err.message);
      }
    };

    loadExams();
  }, [navigate]); // Added navigate as dependency to avoid warning

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
    navigate("/log-in");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white flex justify-between items-center px-6 py-4">
        <div className="text-lg font-medium">Welcome back, {user?.name} 👋</div>
        <div className="text-sm">{exams.length} Exams Available</div>{" "}
        {/* Display number of exams */}
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            {new Date().toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        {/* Categories and Search */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Course Categories</h2>
            <div className="flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-8 bg-gray-300 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Search Courses</h2>
            <div className="w-48 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {exams.length === 0 ? (
            <div>No exams available.</div>
          ) : (
            exams.map((exam) => (
              <div
                key={exam._id}
                className="flex justify-between items-center bg-white shadow-md rounded-lg p-4"
              >
                <div className="text-sm font-medium">
                  {exam.name} - {exam.module_code}
                </div>
                <div className="text-sm text-gray-500">{exam.duration}</div>
                <div className="text-sm text-gray-500">{exam.module_code}</div>
                <div className="text-sm text-gray-500">
                  {exam.assigned_lecturer}
                </div>
                <div className="text-sm text-gray-500">
                  {exam.no_of_questions} questions available
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
