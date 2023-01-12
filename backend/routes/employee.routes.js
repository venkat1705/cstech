import express from "express";
import {
  CreateEmployee,
  DeleteEmployee,
  GetAllEmployees,
  GetEmployeeById,
  UpdateEmployee,
} from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.post("/createemployee", CreateEmployee);
employeeRouter.put("/update/:id", UpdateEmployee);
employeeRouter.delete("/delete/:id", DeleteEmployee);
employeeRouter.get("/employeeById/:id", GetEmployeeById);
employeeRouter.get("/all", GetAllEmployees);

export default employeeRouter;
