const Employee = require("../../models/Employee");
const mongoose = require("mongoose");

const updateEmployee = async (clients, id, data) => {
  const client = clients[id];
  const newEmployee = data.data;
  if (newEmployee) {
    const oldEmployee = await Employee.findById(
      mongoose.Types.ObjectId(newEmployee._id)
    );
    if (oldEmployee) {
      Object.assign(oldEmployee, newEmployee);
      await oldEmployee.save();
      client.ws.send(
        JSON.stringify({
          queueId: data.queueId,
          type: "employeeUpdate",
          data: oldEmployee,
        })
      );
    }
  }
};

module.exports = updateEmployee;
