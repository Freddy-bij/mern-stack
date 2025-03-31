
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js"; 
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => res.send("API working now"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

startServer();
