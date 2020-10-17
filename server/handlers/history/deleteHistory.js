const History = require("../../models/History");
const mongoose = require("mongoose");

const deleteHistory = async (clients, id, data) => {
    const client = clients[id];
    const deleteId = data.data.id;
    if (deleteId) {
        const oldHistory = await History.findById(
            mongoose.Types.ObjectId(deleteId)
        );
        if (oldHistory) {
            await oldHistory.delete();
            client.ws.send(
                JSON.stringify({
                    queueId: data.queueId,
                    type: "historyDelete",
                    data: true,
                })
            );
        }
    }
};

module.exports = deleteHistory;
