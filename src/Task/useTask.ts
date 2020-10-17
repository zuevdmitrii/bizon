import * as React from "react";
import { useState } from "react";
import { ITask } from "../Main/useTasks";
import { taskGet } from "../api/TaskApi";

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<ITask | null>(null);

  const fetchTask = async (id: string) => {
    setTask(null)
    const taskData = await taskGet(id);
    if (taskData) {
      setTask(taskData.data);
    }
  };
  React.useEffect(() => {
    fetchTask(taskId);
  }, [taskId]);

  return task;
};
