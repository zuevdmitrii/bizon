import { webSocketControllerInstance } from "../WebSocketInstance";
import { IDataProviderFilter }         from './IFilter';

export const historyCreate = (
  data = {
    title: "Third Task",
    description: "simple",
    assignee: "5f8a7fe0b7fd6214507fef3c",
    status: "Review",
    creationDate: new Date(),
    targetDate: new Date(),
    tags: ["one", "two"],
    author: "qwetyel@gmail.com",
    taskId: "5f8aa8cc8cf264325dc34edf",
    date: new Date(),
    blockTask: "5f8aa90153c4fb3272648d12"
  }
) => {
  return webSocketControllerInstance.call({
    type: "historyCreate",
    data,
  });
};

// id= 5f8aa8cc8cf264325dc34edf
export const historyGet = (id?: string, filters?: IDataProviderFilter) => {
  if (id) {
    return webSocketControllerInstance.call({ type: "historyGet", data: { id } });
  }
  return webSocketControllerInstance.call({ type: "historyGet", data: {filters} });
};

export const historyUpdate = (newHistory: any) => {
  return webSocketControllerInstance.call({
    type: "historyUpdate",
    data: { ...newHistory },
  });
};

export const historyDelete = (id: string) => {
  return webSocketControllerInstance.call({ type: "historyDelete", data: { id } });
};
