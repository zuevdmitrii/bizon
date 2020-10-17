const Task = require("../../models/Task");
const getFilterQuery = require("../../helpers/filters");

const getTasksByDepartments = async (clients, id, data) => {
  const client = clients[id];
  const filters = data.data.filters;
  const filterQuery = getFilterQuery(filters);
  if (filters && filterQuery) {
    const department = data.data.department;
    if (department) {
      Task.find(filterQuery)
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
    } else {
      const result = await Task.find(filterQuery);
      client.ws.send(
        JSON.stringify({
          queueId: data.queueId,
          type: "taskGetByDepartment",
          data: result,
        })
      );
    }
  } else {
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
  }
};

module.exports = getTasksByDepartments;
