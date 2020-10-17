import * as React from "react";
import { useState } from "react";
import { ITask } from "../Main/useTasks";
import { taskGet } from "../api/TaskApi";

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<ITask | null>(null);

  const fetchTask = async (id: string) => {
    const taskData = await taskGet(id);
    console.log("taskData", taskData);
    if (taskData) {
      console.log("task", taskData);
      setTask(taskData.data);
    }
  };
  React.useEffect(() => {
    fetchTask(taskId);
  }, []);

  return task;
};
