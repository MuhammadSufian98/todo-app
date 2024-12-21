import dotenv from "dotenv";
dotenv.config({path:"./.env"});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
import ImageRouter from "../routers/ImageUpload.js";
import multer from "multer";

// import { Configuration, OpenAIApi } from "openai";

// const config = new Configuration({
// 	apiKey: "YOUR_API_KEY",
// });

// const openai = new OpenAIApi(config);

// const runPrompt = async () => {
// 	const prompt = `
//         write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

//         {
//             "Q": "question",
//             "A": "answer"
//         }

//     `;

// 	const response = await openai.createCompletion({
// 		model: "text-davinci-003",
// 		prompt: prompt,
// 		max_tokens: 2048,
// 		temperature: 1,
// 	});

// 	const parsableJSONresponse = response.data.choices[0].text;
// 	const parsedResponse = JSON.parse(parsableJSONresponse);

// 	console.log("Question: ", parsedResponse.Q);
// 	console.log("Answer: ", parsedResponse.A);
// };

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
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
