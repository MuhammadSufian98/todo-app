import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", TasksRouter);
app.use("/auth", LoginRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
