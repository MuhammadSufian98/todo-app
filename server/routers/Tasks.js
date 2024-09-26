const express = require("express");
const TasksRouter = express.Router();
const VerifyMiddleware = require("../middleware/verifyToken.js");
const {
  getTasks,
  getTasksByID,
  createTasks,
  deleteTasks,
  updateTasks,
} = require("../controllers/task.js");

TasksRouter.get("/tasks", getTasks);
TasksRouter.post("/tasks", VerifyMiddleware, createTasks);
TasksRouter.get("/tasks/:id", VerifyMiddleware, getTasksByID);
TasksRouter.delete("/tasks/:id", VerifyMiddleware, deleteTasks);
TasksRouter.patch("/tasks/:id", VerifyMiddleware, updateTasks);

module.exports = TasksRouter;
