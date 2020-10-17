const History = require("../../models/History")

const createHistory = async (clients, id, data) => {
    client = clients[id];
    const newHistory = new History(data.data)
    await newHistory.save()
    client.ws.send(
        JSON.stringify({
            queueId: data.queueId,
            type: "historyCreate",
            data: newHistory,
        })
    );
}

module.exports = createHistory
