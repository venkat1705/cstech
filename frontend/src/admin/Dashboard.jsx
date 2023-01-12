import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between p-[20px]">
        <p className="font-semibold text-md ">Welcome, Admin</p>
        <Link to="/CreateEmployee">
          <button className="w-[350px] h-[45px] text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow  hover:bg-indigo-400  xs:w-[300px]">
            Create Employee
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
