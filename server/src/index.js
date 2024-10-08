import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TasksRouter from "../routers/tasks.js";
import LoginRouter from "../routers/login.js";
import multer from "multer";

const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect("mongodb://localhost:27017/ToDoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", TasksRouter);
app.use("/auth", LoginRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("picture"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  return res.redirect("/home");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
