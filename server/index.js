const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TasksRouter = require("./routers/TasksRouters.js");
const LoginRouter = require("./routers/LoginRouters.js");
const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/ToDoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(cors());

app.use("/", TasksRouter);
app.use("/", LoginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
