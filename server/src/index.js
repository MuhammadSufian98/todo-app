import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
import ImageRouter from "../routers/ImageUpload.js";
import multer from "multer";
import https from "https";
import whatsAppClient from "@green-api/whatsapp-api-client";

const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const GreenApiToken = process.env.API_TOKEN_INSTANCE;
const idInstance = process.env.ID_INSTANCE;
app.post("/sendMessage", async (req, res) => {
  const { receiverPhoneNumber, message } = req.body;
  if (!receiverPhoneNumber || !message) {
    return res
      .status(400)
      .json({ error: "Receiver phone number and message are required" });
  }

  const restAPI = whatsAppClient.restAPI({
    idInstance,
    apiTokenInstance: GreenApiToken,
  });

  try {
    const response = await restAPI.message.sendMessage(
      `${receiverPhoneNumber}@c.us`,
      message
    );
    res.status(200).json({ success: true, messageId: response.idMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// import OpenAI from "openai";

// const OPENAIKEY = process.env.OPEN_AI_KEY;
// const client = new OpenAI({
//   apiKey: OPENAIKEY, // Replace with your actual API key
// });

// async function getCompletion() {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "Hello What's your name?" }],
//       max_tokens: 10,
//     });
//     console.log(response.choices[0].message.content);
//   } catch (error) {
//     console.error(`Unexpected error: ${error.message}`);
//   }
// }

// getCompletion();

app.use("/api", TasksRouter);
app.use("/auth", LoginRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
