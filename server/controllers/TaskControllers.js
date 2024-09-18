const TaskModel = require("../MongoDB/Tasks.js");

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const getTasksByID = async (req, res) => {
  try {
    const taskByRollNo = await TaskModel.findOne({
      roll_no: req.params.id,
    });

    if (!taskByRollNo) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(taskByRollNo);
  } catch (error) {
    console.error("Error fetching task by roll number:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

const createTasks = async (req, res) => {
  try {
    const NewTask = req.body.Task;
    const rollNo = req.body.ID;

    const existingTask = await TaskModel.findOne({ Task: NewTask });

    if (existingTask) {
      return res.status(400).json({ error: "Task already exists" });
    }

    const newTask = await TaskModel.create({
      roll_no: rollNo,
      Task: NewTask,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ error: "Failed to save the task" });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

const updateTasks = async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { Task: req.body.Task },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

module.exports = {
  getTasks,
  getTasksByID,
  createTasks,
  deleteTasks,
  updateTasks,
};
