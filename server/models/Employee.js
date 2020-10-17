const { Schema, model } = require("mongoose");

const EmployeeScheme = new Schema({
  email: {
    type: String,
    required: true
  },
  password: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: String,
  departmentId: {
    type: Schema.Types.ObjectID,
    ref: 'Department'
  }
})

module.exports = model("Employee", EmployeeScheme, "employees");
