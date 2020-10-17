const Task = require("../../models/Task");
const mongoose = require("mongoose");

const deleteTask = async (clients, id, data) => {
    const client = clients[id];
    const deleteId = data.data.id;
    if (deleteId) {
        const oldTask = await Task.findById(
            mongoose.Types.ObjectId(deleteId)
        );
        if (oldTask) {
            await oldTask.delete();
            client.ws.send(
                JSON.stringify({
                    queueId: data.queueId,
                    type: "taskDelete",
                    data: true,
                })
            );
        }
    }
};

module.exports = deleteTask;
