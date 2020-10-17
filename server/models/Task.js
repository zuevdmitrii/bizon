const { Schema, model } = require("mongoose");

const TaskScheme = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  assignee: {
    type: Schema.Types.ObjectID,
    ref: 'Employee',
    required: true
  },
  status: String,
  creationDate: Date,
  targetDate: Date,
});

module.exports = model("Task", TaskScheme, "tasks");
