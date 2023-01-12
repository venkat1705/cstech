import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const employees = await axios.get("http://localhost:5000/api/employee/all");
    setData(employees.data.employees);
  };

  useEffect(() => {
    fetchData();
  });

  const DeleteEmployee = async (userID) => {
    const res = await axios.delete(
      `http://localhost:5000/api/employee/delete/${userID}`
    );
    if (res) {
      const newData = data.filter((item) => {
        return item._id !== res._id;
      });
      setData(newData);
    }
  };
  return (
    <div>
      <div className="flex justify-between p-[20px]">
        <p className="font-semibold text-md ">Employee List</p>
        <Link to="/CreateEmployee">
          <button className="w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400  xs:w-[300px]">
            Create Employee
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm font-semibold text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile No
              </th>
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                create Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {data ? (
            <tbody>
              {data.map((employee, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      src={employee.image}
                      alt="images"
                      className="w-[90px] h-[60px]"
                    />
                  </td>
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.mobile}</td>
                  <td className="px-6 py-4">{employee.designation}</td>
                  <td className="px-6 py-4">{employee.gender}</td>
                  <td className="px-6 py-4">{employee.course}</td>
                  <td className="px-6 py-4">
                    {employee.createdAt.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/EditEmployee/${employee._id}`}>Edit</Link>
                  </td>
                  <td className="px-1 py-1">
                    <button onClick={() => DeleteEmployee(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            ""
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
