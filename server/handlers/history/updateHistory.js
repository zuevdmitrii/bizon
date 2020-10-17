const History = require("../../models/History");
const mongoose = require("mongoose");

const updateHistory = async (clients, id, data) => {
    const client = clients[id];
    const newHistory = data.data;
    if (newHistory) {
        const oldTask = await History.findById(
            mongoose.Types.ObjectId(newHistory._id)
        );
        if (oldTask) {
            Object.assign(oldTask, newHistory);
            await oldTask.save();
            client.ws.send(
                JSON.stringify({
                    queueId: data.queueId,
                    type: "historyUpdate",
                    data: oldTask,
                })
            );
        }
    }
};

module.exports = updateHistory;
