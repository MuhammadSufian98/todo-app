require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TasksRouter = require("./routers/tasks.js");
const LoginRouter = require("./routers/login.js");
const app = express();
const port = process.env.SERVER_PORT || 3000;
mongoose
  .connect("mongodb://localhost:27017/ToDoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(
  cors({
    origin: "https://your-frontend-url.vercel.app",
  })
);
app.use("/", TasksRouter);
app.use("/", LoginRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
