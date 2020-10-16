const { Schema, model } = require("mongoose");

const TaskScheme = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  assignee: {
    type: String,
    required: true,
  },
  status: String,
  creationDate: Date,
  targetData: Date,
});

module.exports = model("Task", TaskScheme, "tasks");
