import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
  roll_no: Number,
  Task: String,
});

export const TaskModel = mongoose.model("Tasks", TasksSchema);
