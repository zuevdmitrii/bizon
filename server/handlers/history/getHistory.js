const History = require("../../models/History");
const mongoose = require("mongoose");
const getFilterQuery = require("../../helpers/filters");

const getTasks = async (clients, id, data) => {
    client = clients[id];
    const historyId = data.data.id;
    const filters = data.data.filters;
    const filterQuery = getFilterQuery(filters);
    let result = [];
    if (historyId) {
        result = await History.findById(mongoose.Types.ObjectId(historyId));
    } else if (filters && filterQuery) {
        result = await History.find(filterQuery);
    } else {
        result = await History.find();
    }

    client.ws.send(
        JSON.stringify({
            queueId: data.queueId,
            type: "historyGet",
            data: result,
        })
    );
};
module.exports = getTasks;
