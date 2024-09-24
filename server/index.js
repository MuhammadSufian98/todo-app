require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TasksRouter = require("./routers/tasks.js");
const LoginRouter = require("./routers/login.js");

const app = express();
const port = process.env.SERVER_PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ToDoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware to parse JSON
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: "https://todo-bm9fe380h-muhammad-sufians-projects-e54cc3c2.vercel.app/" || 'http://localhost:5173',  // Allow only the frontend URL (Vercel or local dev)
  methods: "GET,POST,PUT,DELETE",  // Specify allowed methods
  credentials: true,               // Enable credentials if needed
};

app.use(cors(corsOptions));

// Routers
app.use("/", TasksRouter);
app.use("/", LoginRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
