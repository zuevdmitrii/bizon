import { webSocketControllerInstance } from '../WebSocketInstance';

export const departmentGet = (
) => {
  return webSocketControllerInstance.call({
    type: "departmentGet",
    data: {},
  });
};
