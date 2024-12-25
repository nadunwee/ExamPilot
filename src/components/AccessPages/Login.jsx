import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";

const Login = () => {
  const [loading, isLoading] = useState(false);
  return (
    <>
      <div className="fixed bg-examPilotBlue h-screen w-screen z-0">
        <div className="z-10 px-[10px] lg:px-0 lg:h-[100%] flex flex-col lg:flex-row justify-between items-center bg-examPilotBlue align-middle">
          <div className="flex flex-row ml-[60px] align-top">
            <div className="text-white mb-4 rounded-xl flex flex-col items-center lg:items-start">
              <Link to={".."} className="p-1 lg:mb-1 pt-6 lg:pt-0">
                <i class="bx bx-arrow-back text-white"></i>
              </Link>
              <p className="text-3xl lg:text-4xl font-bold text-white">
                ExamPilot
              </p>
              <p className="text-center lg:text-left text-base lg:text-6xl font-semibold lg:font-bold lg:mt-[4rem] pt-2 lg:pt-0 lg:leading-[4.5rem]">
                Begin your journey with ExamPilot
              </p>
              <p className="mt-2 text-xs lg:text-sm text-center lg:text-left lg:mt-10 lg:w-[80%]">
                ExamPilot simplifies assessment management, reduces
                administrative burden, and enhances the test-taker experience.
                Its intuitive design and comprehensive tools make it the ideal
                choice for modern educational and professional settings.
              </p>
            </div>
          </div>

          <div className="z-30 mt-3 lg:mt-20 mb-5 lg:mb-20 lg:mr-[10rem] lg:w-[400px]">
            <div className="px-4 py-6 border shadow-lg bg-white rounded-xl">
              <div>
                <form>
                  <div className="flex items-center gap-4 justify-center">
                    <div>
                      <i class="bx bx-user text-[28px] border-2 rounded-[30px] p-1 "></i>
                    </div>
                    <p className="text-black font-medium flex justify-center">
                      Sign In
                    </p>
                  </div>

                  <p className="mb-5 mt-6 text-[#626262] flex flex-left text-xs">
                    Sign in to your ExamPilot Account
                  </p>

                  <div className="flex flex-col text-left mb-4">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="email"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                        id="email"
                        type="email"
                        name="email"
                      />
                      {/* <div className="text-[11px] text-red-500 pt-1 pl-1">
                          {error && error === "Incorrect Email" && error}
                        </div> */}
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <label
                      className="mb-1 text-black text-xs font-semibold"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                        id="password"
                        type="password"
                        name="password"
                      />
                      {/* <div className="text-[11px] text-red-500 pt-1 pl-1">
                          {(googleError === "" &&
                            error === "Incorrect Password" &&
                            error) ||
                            (error === "All fields must be filled" && error)}
                        </div> */}
                    </div>
                  </div>

                  <div className="text-right flex justify-end my-5">
                    <a
                      className="text-xs p-0 text-[#152DFF] font-medium"
                      href=""
                    >
                      Forgot Password
                    </a>
                  </div>

                  <p>
                    <button className="w-full border border-examPilotBlue p-2 rounded-[20px] hover:bg-examPilotBlue hover:text-white">
                      {loading === true ? "Loading..." : "Sign in"}
                    </button>
                  </p>
                </form>
                <div className="mt-4">
                  <p className="flex content-center justify-center items-center text-xs font-medium text-black">
                    Dont have an account?
                    <Link
                      className="text-xs font-medium py-0 text-[#152DFF] ml-2"
                      to="/register"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div className="mt-6 mb-3 flex items-center">
                  <hr className="flex-1 border-t border-[#E0E0E0]" />
                  <span className="mx-2 text-xs text-black">OR</span>
                  <hr className="flex-1 border-t border-[#E0E0E0]" />
                </div>
                {/* <div className="flex flex-col justify-center items-center pb-4">
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={handleError}
                    />
                    <div className="text-[11px] text-red-500 pt-1 text-center">
                      {googleError}
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
