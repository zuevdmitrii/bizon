const Task = require("../../models/Task");
const mongoose = require("mongoose");

const getTasks = async (clients, id, data) => {
    client = clients[id];
    const taskId = data.data.id;
    let result = [];
    if (taskId) {
        result = await Task.findById(mongoose.Types.ObjectId(taskId));
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
