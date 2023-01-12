import Employee from "../models/employee.model.js";

export const CreateEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, image } =
      req.body;

    if (!name || !email || !mobile || !gender || !course || !image) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const existedUser = await Employee.findOne({ email });
    if (existedUser) {
      return res.status(422).json({ error: "Employee Email already exists" });
    }

    const existedNumber = await Employee.findOne({ mobile });
    if (existedNumber) {
      return res.status(422).json({ error: "Mobile Number already exists" });
    }
    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });
    if (employee) {
      employee.save();
      res.status(201).json({ message: "Employee created successfully" });
    } else {
      res.status(500).json({ error: "Employee Creation Failure" });
    }
  } catch (error) {
    console.log(error);
  }
};

// update Employee

export const UpdateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { $new: true }
    );
    if (employee) {
      res.status(201).json({ employee });
    } else {
      res.status(403).json({ error: "Employee update failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete Employee

export const DeleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete({ _id: req.params.id });
    if (employee) {
      res.status(201).json({ message: "Employee deleted successfully" });
    } else {
      res.status(403).json({ error: "Employee deletion failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all employees

export const GetAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (employees) {
      res.status(200).json({ employees });
    } else {
      res.status(422).json({ error: "No Employees Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

// get employee by id

export const GetEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById({ _id: req.params.id });
    if (employee) {
      res.status(200).json({ employee });
    } else {
      res.status(422).json({ error: "No Employee Found" });
    }
  } catch (error) {
    console.log(error);
  }
};
