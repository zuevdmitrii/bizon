import * as React from "react";
import { useEffect } from "react";
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
  blockTask: string;
}

export const useTasks = (
  filters: IDataProviderFilter | null,
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
  useEffect(() => {
    fetchTasks()
  }, []);

  const filterTasks = async () =>{
    const {data} = await taskGet(undefined, filters)
    if (data) {
      setTasks(data)
    }
  }
  
  useEffect(()=>{
    filters && filterTasks()  
  },[filters])

  return tasks;
};
