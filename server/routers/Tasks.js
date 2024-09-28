import express from "express";
const TasksRouter = express.Router();
import VerifyMiddleware from "../middleware/verifyToken.js";
import {
  getTasks,
  getTasksByID,
  createTasks,
  deleteTasks,
  updateTasks,
} from "../controllers/task.js";

TasksRouter.get("/tasks", getTasks);
TasksRouter.post("/tasks", VerifyMiddleware, createTasks);
TasksRouter.get("/tasks/:id", VerifyMiddleware, getTasksByID);
TasksRouter.delete("/tasks/:id", VerifyMiddleware, deleteTasks);
TasksRouter.patch("/tasks/:id", VerifyMiddleware, updateTasks);

export default TasksRouter;
