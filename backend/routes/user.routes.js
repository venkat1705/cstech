import express from "express";
import {
  CreateUser,
  LoginUser,
  updateUser,
} from "../controllers/user.controller.js";
import { requireLogin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createUser", CreateUser);
router.post("/loginUser", LoginUser);
router.put("/update/:id", requireLogin, updateUser);

export default router;
