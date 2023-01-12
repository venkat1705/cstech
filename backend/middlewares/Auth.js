import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import roles from "../utils/constants.js";
dotenv.config();

export const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(404).json({ error: "User must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(500).json({ error: "User must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

export const requireAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(404).json({ error: "User must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(500).json({ error: "User must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      if (req.user.role === roles.admin) {
        next();
      } else {
        return res.status(401).json({ error: "User is not Admin" });
      }
    });
  });
};
