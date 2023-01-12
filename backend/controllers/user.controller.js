import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
  try {
    const { name, email, password, profilePic, empId } = req.body;

    if (!name || !email || !empId || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const existedEmpId = await User.findOne({ empId });
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(422).json({ error: "User already exists" });
    }
    if (existedEmpId) {
      return res.status(422).json({ error: "Employee Id already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      profilePic,
      empId,
    });
    if (user) {
      user.save();
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(422).json({ error: "User not created" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please add email And password" });
    }

    const user = await User.findOne({ email });
    const match = await user.matchPassword(password);
    if (match) {
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const { _id, name, email, role } = user;
      res.json({ token, user: { _id, name, email, token }, role: role });
    } else {
      return res.status(422).json({ error: "Enter Valid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { $new: true }
    );
    if (user) {
      res.status(201).json({ message: "User updated successfully" });
    } else {
      res.status(422).json({ error: "User not updated" });
    }
  } catch (error) {
    console.log(error);
  }
};
