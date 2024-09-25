require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TasksRouter = require("./routers/tasks.js");
const LoginRouter = require("./routers/login.js");
const app = express();
const port = process.env.SERVER_PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

app.use(express.json());
app.use(
  cors({
    origin:
      "https://todo-3cxau5bpt-muhammad-sufians-projects-e54cc3c2.vercel.app",
    credentials: true,
  })
);

app.use("/", TasksRouter);
app.use("/", LoginRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
