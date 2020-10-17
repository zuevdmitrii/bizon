const Task = require("../../models/Task")

const createTask = async (clients, id, data) => {
    client = clients[id];
    const newTask = new Task(data.data)
    await newTask.save()
    client.ws.send(
        JSON.stringify({
            queueId: data.queueId,
            type: "taskCreate",
            data: newTask,
        })
    );
}

module.exports = createTask
