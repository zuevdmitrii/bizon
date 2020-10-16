const Employee = require("../../models/Employee")
const mongoose = require('mongoose');

const getEmployees = async (clients, id, data) => {
  client = clients[id];
  const employeeId = data.data.id
    let result = []
    if(employeeId) {
        result = await Employee.findById(mongoose.Types.ObjectId(employeeId))
    } else {
        result = await Employee.find();
    }
  client.ws.send(
    JSON.stringify({
      queueId: data.queueId,
      type: "employeeGet",
      data: result,
    })
  );
};
module.exports = getEmployees;
