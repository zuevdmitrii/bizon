const Task = require("../../models/Task");
const getFilterQuery = require("../../helpers/filters");

const getTasksByUser = async (clients, id, data) => {
  const client = clients[id];
  const filters = data.data.filters;
  const filterQuery = getFilterQuery(filters);
  const userId = data.data.userId;
  if (filters && filterQuery) {
    if (userId) {
      Task.find(filterQuery)
        .populate("assignee")
        .exec(function (err, tasks) {
          tasks = tasks.filter(
            (task) =>
              task.assignee && task.assignee._id && task.assignee._id == userId
          );
          client.ws.send(
            JSON.stringify({
              queueId: data.queueId,
              type: "taskGetByUser",
              data: tasks,
            })
          );
        });
    } else {
      const result = await Task.find(filterQuery);
      client.ws.send(
        JSON.stringify({
          queueId: data.queueId,
          type: "taskGetByUser",
          data: result,
        })
      );
    }
  } else {
    if (userId) {
      Task.find()
        .populate("assignee")
        .exec(function (err, tasks) {
          tasks = tasks.filter(
            (task) => {
                return task.assignee && task.assignee._id && task.assignee._id == userId
            }
          );
          client.ws.send(
            JSON.stringify({
              queueId: data.queueId,
              type: "taskGetByUser",
              data: tasks,
            })
          );
        });
    }
  }
};

module.exports = getTasksByUser;
