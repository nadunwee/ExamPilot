import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExamsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, []);

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
        <div className="text-sm">129 Exams Available</div>
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
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-4"
            >
              <div className="text-sm font-medium">
                Internet and web technologies - IT2310
              </div>
              <div className="text-sm text-gray-500">Web Dec 3 20:00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
