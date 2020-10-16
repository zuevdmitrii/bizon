const Employee = require("../../models/Employee");
const mongoose = require("mongoose");

const deleteEmployee = async (clients, id, data) => {
  const client = clients[id];
  const deleteId = data.data.id;
  if (deleteId) {
    const oldEmployee = await Employee.findById(
      mongoose.Types.ObjectId(deleteId)
    );
    if (oldEmployee) {
      await oldEmployee.delete();
      client.ws.send(
        JSON.stringify({
          queueId: data.queueId,
          type: "employeeDelete",
          data: true,
        })
      );
    }
  }
};

module.exports = deleteEmployee;
