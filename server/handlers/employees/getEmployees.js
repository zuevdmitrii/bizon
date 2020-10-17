const Employee = require("../../models/Employee");
const mongoose = require("mongoose");
const getFilterQuery = require("../../helpers/filters");

const getEmployees = async (clients, id, data) => {
  client = clients[id];
  const employeeId = data.data.id;
  const employeeEmail = data.data.email;
  const filters = data.data.filters;
  const filterQuery = getFilterQuery(filters);
  let result = [];
  if (employeeId) {
    result = await Employee.findById(mongoose.Types.ObjectId(employeeId));
  } else if (employeeEmail) {
    result = await Employee.find({ email: employeeEmail });
  } else if (filters && filterQuery) {
    result = await Employee.find(filterQuery);
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
