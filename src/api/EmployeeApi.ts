import { webSocketControllerInstance } from "../WebSocketInstance";
import { IDataProviderFilter } from "./IFilter";

export const employeeCreate = (
  data = {
    firstName: "Vladislav3",
    lastName: "Bondarenko",
    role: "CEO",
    email: "bondarencko40@gmail.com",
  }
) => {
  return webSocketControllerInstance.call({
    type: "employeeCreate",
    data,
  });
};

// exampleId = 5f8a1497806a3424eaec10db
// exEmail = qwetyel@gmail.com
export const employeeGet = (
  id?: string,
  email?: string,
  filters?: IDataProviderFilter
) => {
  if (id) {
    return webSocketControllerInstance.call({
      type: "employeeGet",
      data: { id },
    });
  }
  if (email) {
    return webSocketControllerInstance.call({
      type: "employeeGet",
      data: { email },
    });
  }
  return webSocketControllerInstance.call({
    type: "employeeGet",
    data: { filters },
  });
};

export const employeeUpdate = (newEmployee: any) => {
  return webSocketControllerInstance.call({
    type: "employeeUpdate",
    data: { ...newEmployee },
  });
};

export const employeeDelete = (id: string): Promise<boolean> => {
  return webSocketControllerInstance.call({
    type: "employeeDelete",
    data: { id },
  });
};
