import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    type: "student",
    address: "",
    NIC: "",
    DOB: "",
    contact_no: "",
    student_id: "",
  });

  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!loading) {
      if (step === 1) {
        setStep(2); // Move to step 2
        return;
      }

      // Handle final submission
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/user/register",
          formData
        );

        console.log("User registered successfully:", response.data);

        if (response.data) {
          // Redirect to the login page if response contains data (success)
          navigate("/log-in"); // Adjust the path if needed
        }

        setLoading(false);
      } catch (error) {
        // Log the full error response for debugging
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );

        // Display the error message to the user
        const backendMessage =
          error.response?.data?.message || "An unexpected error occurred.";

        setError(backendMessage);

        // Stop the loading spinner
        setLoading(false);
      }
    }
  };

  // Animation variants
  const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const popUpVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
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

        <div className="z-30 mt-3 lg:mt-20 mb-5 lg:mb-20 lg:mr-[10rem] lg:w-[350px]">
          <motion.div
            className="px-4 py-6 border shadow-lg bg-white rounded-xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={step === 1 ? slideVariants : popUpVariants}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleNext}>
              {step === 1 && (
                <>
                  <div className="flex items-center gap-4 justify-center">
                    <i className="bx bx-user text-[28px] border-2 rounded-[30px] p-1"></i>
                    <p className="text-black font-medium flex justify-center">
                      Register
                    </p>
                  </div>
                  <p className="mb-5 mt-6 text-[#626262] flex flex-left text-xs">
                    Register to ExamPilot Account
                  </p>
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
                  <div className="flex flex-col text-left mb-4">
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
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex flex-col text-left mb-4">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="name"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col text-left mb-4">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="address"
                    >
                      Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                      id="address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col text-left mb-4">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="NIC"
                    >
                      NIC <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                      id="NIC"
                      type="text"
                      name="NIC"
                      value={formData.NIC}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col text-left mb-4">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="DOB"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                      id="DOB"
                      type="date"
                      name="DOB"
                      value={formData.DOB}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col text-left mb-4">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="contact_no"
                    >
                      Contact Number
                    </label>
                    <input
                      className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                      id="contact_no"
                      type="text"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="student_id"
                    >
                      Student ID
                    </label>
                    <input
                      className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                      id="student_id"
                      type="text"
                      name="student_id"
                      value={formData.student_id}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

              <button
                className="w-full mt-6 border border-examPilotBlue p-2 rounded-[20px] hover:bg-examPilotBlue hover:text-white"
                type="submit"
              >
                {loading ? "Loading..." : step === 1 ? "Next" : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
