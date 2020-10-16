const { Schema, model } = require("mongoose");

const DepartmentScheme = new Schema({
  title: {
    type: String,
    required: true
  }
})

module.exports = model("Department", DepartmentScheme, "departments");
