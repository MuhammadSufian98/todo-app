import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
import ImageRouter from "../routers/ImageUpload.js";
import multer from "multer";
import ImageModel from "../mongoDB/ImageSchema.js"

const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", TasksRouter);
app.use("/auth", LoginRouter);
// app.use("/upload", ImageRouter);



// Multer Setup
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const img = new ImageModel({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    await img.save();
    res.status(201).send('Image uploaded successfully!');
  } catch (error) {
    res.status(500).send('Error uploading image: ' + error.message);
  }
});

// Get Images Route
app.get('/images', async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.json(images);
  } catch (error) {
    res.status(500).send('Error fetching images: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
