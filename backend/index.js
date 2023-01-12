import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.routes.js";
import connectDB from "./config/dbConnect.js";
import employeeRouter from "./routes/employee.routes.js";

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/auth", router);
app.use("/api/employee", employeeRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
