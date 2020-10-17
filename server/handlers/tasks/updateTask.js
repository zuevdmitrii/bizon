const Task = require("../../models/Task");
const mongoose = require("mongoose");

const updateTask = async (clients, id, data) => {
    const client = clients[id];
    const newTask = data.data;
    if (newTask) {
        const oldTask = await Task.findById(
            mongoose.Types.ObjectId(newTask._id)
        );
        if (oldTask) {
            Object.assign(oldTask, newTask);
            await oldTask.save();
            client.ws.send(
                JSON.stringify({
                    queueId: data.queueId,
                    type: "taskUpdate",
                    data: oldTask,
                })
            );
        }
    }
};

module.exports = updateTask;
