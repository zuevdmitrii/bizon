const { Schema, model } = require("mongoose");

const HistoryScheme = new Schema({
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
  taskId: {
    type: Schema.Types.ObjectID,
    ref: 'Task',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tags: [String],
  blockTask: {
    type: Schema.Types.ObjectID,
    ref: 'Task'
  }
})

module.exports = model("History", HistoryScheme, "history");
