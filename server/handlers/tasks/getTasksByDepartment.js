const Task = require("../../models/Task");

const getTasksByDepartments = async (clients, id, data) => {
  const client = clients[id];
  const department = data.data.department;
  if (department) {
    let result = await Task.find().populate("assignee");
    result = result.filter(
      (el) =>
        el.assignee &&
        el.assignee.department &&
        el.assignee.department === department
    );
    client.ws.send(
      JSON.stringify({
        queueId: data.queueId,
        type: "taskGetByDepartment",
        data: result,
      })
    );
  }
};

module.exports = getTasksByDepartments;
