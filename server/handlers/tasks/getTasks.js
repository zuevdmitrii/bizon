const Task = require("../../models/Task");
const mongoose = require("mongoose");
const getFilterQuery = require("../../helpers/filters");

const getTasks = async (clients, id, data) => {
  client = clients[id];
  const taskId = data.data.id;
  const filters = data.data.filters;
  const filterQuery = getFilterQuery(filters);
  let result = [];
  if (taskId) {
    result = await Task.findById(mongoose.Types.ObjectId(taskId));
  } else if (filters && filterQuery) {
    result = await Task.find(filterQuery);
  } else {
    result = await Task.find();
  }

  client.ws.send(
    JSON.stringify({
      queueId: data.queueId,
      type: "taskGet",
      data: result,
    })
  );
};
module.exports = getTasks;
