import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";
import axios from "axios"; // Make sure axios is imported

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For handling errors

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before making the request

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login", // Your login endpoint
        formData
      );

      const { email, token, name, user } = response.data;

      console.log(email);

      localStorage.setItem("userEmail", email);

      if (response.data) {
        if (user.type === "student") {
          navigate("/exams");
        } else if (user.type === "Administrator") {
          navigate("/admin-exams");
        }
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  return (
    <div className="fixed bg-examPilotBlue h-screen w-screen z-0">
      <div className="z-10 px-[10px] lg:px-0 lg:h-[100%] flex flex-col lg:flex-row justify-between items-center bg-examPilotBlue align-middle">
        <div className="flex flex-row ml-[60px] align-top">
          <div className="text-white mb-4 rounded-xl flex flex-col items-center lg:items-start">
            <Link to={".."} className="p-1 lg:mb-1 pt-6 lg:pt-0">
              <i className="bx bx-arrow-back text-white"></i>
            </Link>
            <p className="text-3xl lg:text-4xl font-bold text-white">
              ExamPilot
            </p>
            <p className="text-center lg:text-left text-base lg:text-6xl font-semibold lg:font-bold lg:mt-[4rem] pt-2 lg:pt-0 lg:leading-[4.5rem]">
              Begin your journey with ExamPilot
            </p>
            <p className="mt-2 text-xs lg:text-sm text-center lg:text-left lg:mt-10 lg:w-[80%]">
              ExamPilot simplifies assessment management, reduces administrative
              burden, and enhances the test-taker experience.
            </p>
          </div>
        </div>

        <div className="z-30 mt-3 lg:mt-20 mb-5 lg:mb-20 lg:mr-[10rem] lg:w-[400px]">
          <div className="px-4 py-6 border shadow-lg bg-white rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-4 justify-center">
                <div>
                  <i className="bx bx-user text-[28px] border-2 rounded-[30px] p-1 "></i>
                </div>
                <p className="text-black font-medium flex justify-center">
                  Sign In
                </p>
              </div>

              <p className="mb-5 mt-6 text-[#626262] flex flex-left text-xs">
                Sign in to your ExamPilot Account
              </p>

              {/* Email input */}
              <div className="flex flex-col text-left mb-4">
                <label
                  className="mb-1 text-black text-xs font-semibold"
                  htmlFor="email"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password input */}
              <div className="flex flex-col text-left">
                <label
                  className="mb-1 text-black text-xs font-semibold"
                  htmlFor="password"
                >
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Forgot password link */}
              <div className="text-right flex justify-end my-5">
                <a className="text-xs p-0 text-[#152DFF] font-medium" href="">
                  Forgot Password
                </a>
              </div>

              {/* Error message */}
              {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

              {/* Submit button */}
              <button
                className="w-full border border-examPilotBlue p-2 rounded-[20px] hover:bg-examPilotBlue hover:text-white"
                type="submit"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </form>

            {/* Sign up link */}
            <div className="mt-4">
              <p className="flex content-center justify-center items-center text-xs font-medium text-black">
                Don't have an account?
                <Link
                  className="text-xs font-medium py-0 text-[#152DFF] ml-2"
                  to="/register"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            {/* OR divider */}
            <div className="mt-6 mb-3 flex items-center">
              <hr className="flex-1 border-t border-[#E0E0E0]" />
              <span className="mx-2 text-xs text-black">OR</span>
              <hr className="flex-1 border-t border-[#E0E0E0]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
