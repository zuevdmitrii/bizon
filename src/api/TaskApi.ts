import { webSocketControllerInstance } from "../WebSocketInstance";
import { IDataProviderFilter }         from './IFilter';

export const taskCreate = (
  data = {
    title: "Last",
    description: "simple",
    assignee: "5f8a7fe0b7fd6214507fef3c",
    status: "Review",
    creationDate: new Date(),
    targetDate: new Date(),
    tags: ["one", "two"],
    blockTask: '5f8aa8cc8cf264325dc34edf'
  } as any
) => {
  return webSocketControllerInstance.call({
    type: "taskCreate",
    data,
  });
};

// id= 5f8aa8cc8cf264325dc34edf
export const taskGet = (id?: string, filters?: IDataProviderFilter) => {
  if (id) {
    return webSocketControllerInstance.call({ type: "taskGet", data: { id } });
  }
  return webSocketControllerInstance.call({ type: "taskGet", data: {filters} });
};

export const taskUpdate = (newTask: any) => {
  return webSocketControllerInstance.call({
    type: "taskUpdate",
    data: { ...newTask },
  });
};

export const taskDelete = (id: string) => {
  return webSocketControllerInstance.call({ type: "taskDelete", data: { id } });
};

export const taskGetByDepartment = (department: string, filters?: any) => {
  return webSocketControllerInstance.call({ type: "taskGetByDepartment", data: { department, filters } });
}

export const taskGetByUser = (userId: string, filters?: any) => {
  return webSocketControllerInstance.call({ type: "taskGetByUser", data: { userId, filters } });
}
