const Employee = reqiure("../models/Employee")

// @ts-ignore
const getEmployees = async (ws: any) => {
  const result = await Employee.find()
  ws.send(result)
}

module.exports = getEmployees
