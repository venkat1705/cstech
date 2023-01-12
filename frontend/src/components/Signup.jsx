import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegEx.test(email)) {
      setErrorMessage1("Enter a Valid Email Address");
    } else {
      setErrorMessage1("");
    }
  };

  const validatePassword = (password) => {
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    if (!passwordRegEx.test(password)) {
      setErrorMessage(
        "Password must contain at least 6 characters, one uppercase, one lowercase and one Symbol"
      );
    } else {
      setErrorMessage("");
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const numberInputOnWheelPreventChange = (e) => {
    e.target.blur();

    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (!email || !name || !empId || !password) {
        setLoading(false);
        setError("ALL Feilds are Required");
        return;
      }
      const res = await axios.post(
        "http://localhost:5000/api/auth/createUser",
        {
          name,
          email,
          empId,
          password,
        }
      );
      if (res) {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };
  return (
    <>
      {error && (
        <div className="bg-red-500 w-[350px] mx-auto rounded-[10px] h-[45px] mt-[10px] -mb-[30px] ">
          <p className="text-center text-md font-semibold p-[7px]">{error}</p>
        </div>
      )}
      <div className="border border-gray-400 w-[400px] h-[600px] mx-auto my-[80px] rounded-[20px] xs:w-[350px]">
        <h1 className="text-2xl font-semibold text-center text-slate-900 my-[30px]">
          SignUp
        </h1>
        <div className="flex relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-[25px]">
            <AiOutlineUser className="text-gray-700 text-[21px] mt-[13px] ml-[10px]" />
          </span>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="xs:w-[300px] w-[350px] sm:w-[250px] h-[45px] rounded-[10px] mt-[10px] indent-[40px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
          />
        </div>
        <div className="flex relative py-[35px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-[25px]">
            <HiOutlineMail className="text-gray-700 text-[21px] mt-[13px] ml-[10px]" />
          </span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className={`${
              errorMessage1 && email
                ? "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[40px] border-red-700 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-red-700 mx-auto"
                : "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[40px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
            }`}
          />
          {errorMessage1 && email ? (
            <span className="text-sm font-semibold text-red-700 absolute my-[60px] ml-[75px]">
              {errorMessage1}
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <div className="flex relative ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-[25px]">
            <GrUserWorker className="text-gray-700 text-[21px] mt-[13px] ml-[10px]" />
          </span>
          <input
            type="number"
            placeholder="Employee Id"
            value={empId}
            onWheel={numberInputOnWheelPreventChange}
            onChange={(e) => setEmpId(e.target.value)}
            className="xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[40px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
          />
        </div>
        <div className="flex relative py-[35px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-[25px]">
            <RiLockPasswordLine className="text-gray-700 text-[21px] mt-[13px] ml-[10px]" />
          </span>
          {showPassword ? (
            <span
              onClick={togglePassword}
              className="absolute inset-y-0 left-0 flex items-center cursor-pointer ml-[280px] xl:ml-[320px] md:ml-[320px] lg:ml-[320px]"
            >
              <BsEyeFill className="text-gray-700 text-[21px] mt-[13px] ml-[10px]" />
            </span>
          ) : (
            <span
              onClick={togglePassword}
              className="absolute inset-y-0 left-0 flex items-center cursor-pointer ml-[280px] xl:ml-[320px] md:ml-[320px] lg:ml-[320px]"
            >
              <BsEyeSlashFill className="text-gray-700 text-[21px] mt-[13px] ml-[10px] outline-none" />
            </span>
          )}
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="*********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            className={`${
              errorMessage && password
                ? "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[40px] border-red-700 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-red-700 mx-auto"
                : "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[40px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
            }`}
          />
          {errorMessage && password ? (
            <span className="text-sm font-semibold text-red-700 absolute my-[60px] text-center">
              {errorMessage}
            </span>
          ) : (
            <span></span>
          )}
        </div>

        <div className="py-[25px]">
          {loading ? (
            <button
              onClick={() => handleSignUp()}
              type="button"
              className="xs:w-[300px] inline-flex items-center w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow hover:bg-indigo-400 ml-[23px]"
            >
              <svg
                className="w-5 h-5 mr-3 text-white animate-spin text-center ml-[93px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </button>
          ) : (
            <button
              onClick={() => handleSignUp()}
              type="button"
              className={`${
                !email || !password
                  ? " w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400 ml-[23px] xs:w-[300px] cursor-not-allowed opacity-50"
                  : " w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400 ml-[23px] xs:w-[300px]"
              }`}
            >
              Register
            </button>
          )}
        </div>
        <h1 className="text-md font-semibold text-center text-gray-600">
          Already have an Account ?{" "}
          <Link
            to="/login"
            className="text-blue-500 underline text-md font-semibold"
          >
            Login
          </Link>
        </h1>
      </div>
    </>
  );
};

export default SignUp;
