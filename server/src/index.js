import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect("mongodb://localhost:27017/ToDoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());

app.use("/", TasksRouter);
app.use("/auth", LoginRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;