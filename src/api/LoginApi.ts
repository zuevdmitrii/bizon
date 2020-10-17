import { webSocketControllerInstance } from "../WebSocketInstance";

export const login = async (email: string, password: string) => {
  const result = await webSocketControllerInstance.call({
    type: "login",
    data: { email, password },
  });
  if (result.data) {
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.candidate));
  }
};
