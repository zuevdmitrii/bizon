const Task = require("../../models/Task");

const getTasksByDepartments = async (clients, id, data) => {
  const client = clients[id];
  const department = data.data.department;
  if (department) {
    Task.find()
      .populate("assignee")
      .exec(function (err, tasks) {
        tasks = tasks.filter(
          (task) =>
            task.assignee &&
            task.assignee.department &&
            task.assignee.department === department
        );
        client.ws.send(
          JSON.stringify({
            queueId: data.queueId,
            type: "taskGetByDepartment",
            data: tasks,
          })
        );
      });
  }
};

module.exports = getTasksByDepartments;
