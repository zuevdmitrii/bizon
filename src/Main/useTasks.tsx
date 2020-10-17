import * as React from "react";
import { IDataProviderFilter } from "../api/IFilter";
import {taskGet} from "../api/TaskApi";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
  creationDate: Date;
  targetDate: Date;
}

export const useTasks = (
  filters: IDataProviderFilter,
  sorting: IObjectAny,
  paging: IObjectAny
) => {
  const [tasks, setTasks] = React.useState<ITask[] | null>(null);
  const fetchTasks = async () => {
    const tasksData = await taskGet()
    if (tasksData) {
      setTasks(tasksData.data)
    }
  }
  React.useEffect(() => {
    fetchTasks()
  }, []);
  return tasks;
};
