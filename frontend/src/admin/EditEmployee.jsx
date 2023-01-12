import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const dataid = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [file, setFile] = useState("");

  const numberInputOnWheelPreventChange = (e) => {
    e.target.blur();

    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/employee/employeeById/${dataid.id}`
    );
    setData(res.data.employee);
    setCourse(res.data.employee.course);
    setFile(res.data.employee.image);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateData = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/employee/update/${dataid.id}`,
        {
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          designation: data.designation,
          gender: data.gender,
          course: data.course,
          image: data.image,
        }
      );

      if (res) {
        setData(res.data.employee);
        setLoading(false);

        navigate("/employeeList");
      } else {
        setLoading(false);
        setError(res.data.error);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="border border-gray-400 w-[400px] h-[730px] mx-auto my-[80px] rounded-[20px] xs:w-[350px]">
      <h1 className="text-2xl font-semibold text-center text-slate-900 my-[30px]">
        Employee Details
      </h1>
      <div className="my-[25px]">
        <input
          type="text"
          placeholder="Name"
          defaultValue={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 ml-[22px]"
        />
      </div>
      <div className="flex relative my-[25px]">
        <input
          type="email"
          placeholder="you@example.com"
          defaultValue={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
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
      <div className="my-[25px]">
        <input
          type="number"
          placeholder="Mobile Number"
          defaultValue={data.mobile}
          onWheel={numberInputOnWheelPreventChange}
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
          className="xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 ml-[22px]"
        />
      </div>
      <div className="my-[25px] ml-[22px]">
        <select
          defaultValue={data.designation}
          onChange={(e) => setData({ ...data, designation: e.target.value })}
          className="w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[20px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600"
        >
          <option value="HR" selected={data.designation === "HR"}>
            HR
          </option>
          <option value="MANAGER" selected={data.designation === "MANAGER"}>
            Manager
          </option>
          <option value="SALES" selected={data.designation === "SALES"}>
            SALES
          </option>
        </select>
      </div>
      <div className="my-[25px] flex">
        <div className="flex ml-[22px]">
          <input
            type="radio"
            value="male"
            checked={data.gender === "male"}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
          <p className="text-sm font-semibold ml-[5px]">Male</p>
        </div>
        <div className="flex ml-[22px]">
          <input
            type="radio"
            value="female"
            checked={data.gender === "female"}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
          <p className="text-sm font-semibold ml-[5px]">Female</p>
        </div>
      </div>
      <div className="my-[25px] flex">
        <div className="flex ml-[22px]">
          <input
            type="checkbox"
            value="BCA"
            checked={course.includes("BCA")}
            onChange={(e) => {
              const { value } = e.target;
              setCourse(
                e.target.checked
                  ? [...course, value]
                  : course.filter((v) => v != value)
              );
              setData({ ...data, course: e.target.value });
            }}
          />
          <p className="text-sm font-semibold ml-[5px]">BCA</p>
        </div>
        <div className="flex ml-[22px]">
          <input
            type="checkbox"
            value="MCA"
            checked={course.includes("MCA")}
            onChange={(e) => {
              const { value } = e.target;
              setCourse(
                e.target.checked
                  ? [...course, value]
                  : course.filter((v) => v != value)
              );
              setData({ ...data, course: e.target.value });
            }}
          />
          <p className="text-sm font-semibold ml-[5px]">MCA</p>
        </div>
        <div className="flex ml-[22px]">
          <input
            type="checkbox"
            value="BSC"
            checked={course.includes("BSC")}
            onChange={(e) => {
              const { value } = e.target;
              setCourse(
                e.target.checked
                  ? [...course, value]
                  : course.filter((v) => v != value)
              );
              setData({ ...data, course: e.target.value });
            }}
          />
          <p className="text-sm font-semibold ml-[5px]">BSC</p>
        </div>
      </div>

      <div className="my-[25px] ml-[22px]">
        <input type="file" />
        <img src={data.image} alt="" className="w-[90px] h-[90px] mx-auto" />
      </div>
      {loading ? (
        <button
          onClick={() => updateData()}
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
          onClick={() => updateData()}
          type="button"
          className={
            " w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400 ml-[23px] xs:w-[300px]"
          }
        >
          Update Employee
        </button>
      )}
    </div>
  );
};

export default EditEmployee;
