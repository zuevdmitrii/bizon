const Employee = require("../../models/Employee");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const data = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign({ data }, "ineedaheero", {
    expiresIn: "100h",
  });
};

const login = async (clients, id, data) => {
  const client = clients[id];
  const { email, password } = data.data;
  if (email && password) {
    const candidate = await Employee.findOne({ email });
    if (candidate && candidate.password === password) {
      const token = generateToken(candidate);
      client.ws.send(
        JSON.stringify({
          queueId: data.queueId,
          type: "login",
          data: { token, candidate },
        })
      );
      return;
    }
  }
  client.ws.send(
    JSON.stringify({
      queueId: data.queueId,
      type: "login",
      data: null,
    })
  );
};

module.exports = login;
