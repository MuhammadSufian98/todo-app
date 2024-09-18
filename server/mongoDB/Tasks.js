const mongoose = require('mongoose')

const TasksSchema = new mongoose.Schema({
    roll_no: Number,
    Task: String
})

const TaskModel = mongoose.model("Tasks", TasksSchema)

module.exports = TaskModel;