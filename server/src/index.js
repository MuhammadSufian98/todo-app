import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ImageRouter from "../routers/ImageUpload.js";
import multer from "multer";

const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const url = process.env.Green_API_URL;
const GreenAPIKey = process.env.API_TOKEN_INSTANCE;
app.post("/sendMessage", async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ error: "chatId is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Give me some text of 2 lines related to anime.";

    const result = await model.generateContent(prompt);
    const geminiResponse = result.response;

    if (!geminiResponse || !geminiResponse.text()) {
      return res.status(500).json({ error: "Failed to generate AI message" });
    }

    const message = geminiResponse.text();

    const payload = { chatId, message };
    const headers = { "Content-Type": "application/json" };

    const urlSendMsg = `${url}/sendMessage/${GreenAPIKey}`;

    const sendResponse = await axios.post(urlSendMsg, payload, { headers });

    res.json({
      success: true,
      chatId,
      aiMessage: message,
      apiResponse: sendResponse.data,
    });
  } catch (error) {
    console.error("Green API Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// app.get("/receiveNotification", async (req, res) => {
//   try {
//     const urlRecieveMsg = `${url}/receiveNotification/${GreenAPIKey}`;
//     const response = await axios.get(`${urlRecieveMsg}`);
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Route to delete notification
// router.delete('/deleteNotification/:receiptId', async (req, res) => {
//   const { receiptId } = req.params;
//   try {
//       const response = await axios.delete(`${BASE_URL}/deleteNotification/7d571ce99f0c4fc1adec8a1a25cfd49ef54e83e5b2cf44ca96/${receiptId}`);
//       res.json(response.data);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

app.use("/api", TasksRouter);
app.use("/auth", LoginRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
