import React from "react";

const Login = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-examPilotBlue p-4 text-white h-screen">
      <div className="flex flex-col space-y-4">
        <div className="text-xl font-bold">ExamPilot</div>
        <div className="text-sm">
          Your trusted co-pilot for secure and efficient online examinations.
        </div>
        <div className="text-sm">
          ExamPilot simplifies assessment management, reduces administrative
          burden, and enhances the test-taker experience. Its intuitive design
          and comprehensive tools make it the ideal choice for modern
          educational and professional settings.
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded">
        <div className="text-2xl font-bold mb-4">Sign In</div>
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 border border-gray-600 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
