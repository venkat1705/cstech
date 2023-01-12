import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const validateEmail = () => {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegEx.test(email)) {
      setErrorMessage1("Enter a Valid Email Address");
    } else {
      setErrorMessage1("");
    }
  };

  const numberInputOnWheelPreventChange = (e) => {
    e.target.blur();

    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const handlecheckboxchange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter((v) => v != value));
    }
  };

  const Postdata = async () => {
    if (
      !name ||
      !email ||
      !mobile ||
      !designation ||
      !gender ||
      !course ||
      !image
    ) {
      return setError("Please Fill All The Fields");
    }
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "gallery");
    data.append("cloud_name", "bunny1705");
    let res = await axios.post(
      "https://api.cloudinary.com/v1_1/bunny1705/image/upload",
      data
    );
    if (res) {
      setUrl(res.data.url);
      setLoading(false);
    } else {
      setLoading(false);
      console.log("error");
    }
  };

  useEffect(() => {
    if (url) {
      handleEmployee();
    }
  }, [url]);

  const handleEmployee = async () => {
    try {
      if (
        !name ||
        !email ||
        !mobile ||
        !designation ||
        !gender ||
        !course ||
        !image
      ) {
        return setError("Please Fill All The Fields");
      }
      const res = await axios.post(
        "http://localhost:5000/api/employee/createEmployee",
        {
          name,
          email,
          mobile,
          designation,
          gender,
          course,
          image: url,
        }
      );
      if (res) {
        navigate("/employeeList");
      } else {
        setLoading(false);
        setError(res.data.error);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  const validatephoneNumber = (mobile) => {
    const phoneNumberRegEx = /^[0-9]{10}$/;
    if (!phoneNumberRegEx.test(mobile)) {
      setErrorMessage2("Enter a Valid Phone Number");
    } else {
      setErrorMessage2("");
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-500 w-[350px] mx-auto rounded-[10px] h-[45px] mt-[10px] -mb-[30px] ">
          <p className="text-center text-md font-semibold p-[7px]">{error}</p>
        </div>
      )}
      <div className="border border-gray-400 w-[400px] h-[630px] mx-auto my-[80px] rounded-[20px] xs:w-[350px]">
        <h1 className="text-2xl font-semibold text-center text-slate-900 my-[30px]">
          Employee Details
        </h1>
        <div className="my-[25px]">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 ml-[22px]"
          />
        </div>
        <div className="flex relative my-[25px]">
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
                ? "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-red-700 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-red-700 mx-auto"
                : "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
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
        <div className="flex relative my-[25px]">
          <input
            type="number"
            placeholder="Mobile Number"
            value={mobile}
            onWheel={numberInputOnWheelPreventChange}
            onChange={(e) => {
              setMobile(e.target.value);
              validatephoneNumber(e.target.value);
            }}
            className={`${
              errorMessage2 && mobile
                ? "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-red-700 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-red-700 mx-auto"
                : "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
            }`}
          />
          {errorMessage2 && mobile ? (
            <span className="text-sm font-semibold text-red-700 absolute my-[60px] ml-[75px]">
              {errorMessage2}
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <div className="my-[25px] ml-[22px]">
          <select
            onChange={(e) => setDesignation(e.target.value)}
            className="w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600"
          >
            <option value="selectoption">Select Option</option>
            <option value="HR">HR</option>
            <option value="MANAGER">Manager</option>
            <option value="SALES">Sales</option>
          </select>
        </div>
        <div className="my-[25px] flex">
          <div className="flex ml-[22px]">
            <input
              type="radio"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "male"}
              value="male"
            />
            <p className="text-sm font-semibold ml-[5px]">Male</p>
          </div>
          <div className="flex ml-[22px]">
            <input
              type="radio"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "female"}
              value="female"
            />
            <p className="text-sm font-semibold ml-[5px]">Female</p>
          </div>
        </div>
        <div className="my-[25px] flex">
          <div className="flex ml-[22px]">
            <input
              type="checkbox"
              value="BCA"
              onChange={handlecheckboxchange}
            />
            <p className="text-sm font-semibold ml-[5px]">BCA</p>
          </div>
          <div className="flex ml-[22px]">
            <input
              type="checkbox"
              value="MCA"
              onChange={handlecheckboxchange}
            />
            <p className="text-sm font-semibold ml-[5px]">MCA</p>
          </div>
          <div className="flex ml-[22px]">
            <input
              type="checkbox"
              value="BSC"
              onChange={handlecheckboxchange}
            />
            <p className="text-sm font-semibold ml-[5px]">BSC</p>
          </div>
        </div>

        <div className="my-[25px] ml-[22px]">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        {loading ? (
          <button
            onClick={() => Postdata()}
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
            onClick={() => Postdata()}
            type="button"
            className={`${
              !name || !email || !mobile || !designation
                ? " w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400 ml-[23px] xs:w-[300px] cursor-not-allowed opacity-50"
                : " w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400 ml-[23px] xs:w-[300px]"
            }`}
          >
            Create Employee
          </button>
        )}
      </div>
    </>
  );
};

export default CreateEmployee;
