const Employee = require("../../models/Employee");

const getDepartments = async (clients, id, data) => {
  client = clients[id];
  Employee.find().distinct('department', (err, result) => {
      client.ws.send(
          JSON.stringify({
              queueId: data.queueId,
              type: "departmentGet",
              data: result,
          })
      );
  });

};

module.exports = getDepartments;
