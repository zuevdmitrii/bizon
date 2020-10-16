const Employee = require("../../models/Employee")

const createEmployee = async (clients, id, data) => {
    client = clients[id];
    const newEmployee = new Employee(data.data)
    await newEmployee.save()
    client.ws.send(
        JSON.stringify({
            queueId: data.queueId,
            type: "employeeCreate",
            data: newEmployee,
        })
    );
}

module.exports = createEmployee
