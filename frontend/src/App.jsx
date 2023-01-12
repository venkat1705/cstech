import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CreateEmployee from "./admin/CreateEmployee";
import Dashboard from "./admin/Dashboard";
import EmployeeList from "./admin/EmployeeList";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { login } from "./recoil/atoms";
import EditEmployee from "./admin/EditEmployee";

function App() {
  const authState = useRecoilValue(login);

  return (
    <BrowserRouter>
      <Navbar />

      {authState ? (
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route path="/CreateEmployee" element={<CreateEmployee />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/EditEmployee/:id" element={<EditEmployee />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
