const { Schema, model } = require("mongoose");

const EmployeeScheme = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: String,
  department: { type: String, required: true },
});

module.exports = model("Employee", EmployeeScheme, "employees");
