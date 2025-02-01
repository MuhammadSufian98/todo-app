import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
import ImageRouter from "../routers/ImageUpload.js";
import multer from "multer";
import axios from "axios";

const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post("/sendMessage", async (req, res) => {
  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      return res.status(400).json({ error: "chatId and message are required" });
    }

    const url = process.env.Green_API_URL;

    const payload = {
      chatId, // Use chatId instead of receiverPhoneNumber
      message,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, payload, { headers });

    res.json(response.data);
  } catch (error) {
    console.log("Green API Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.use("/api", TasksRouter);
app.use("/auth", LoginRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
