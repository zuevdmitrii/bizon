import * as React from "react";
import { useState } from "react";
import {ITask} from "../Main/useTasks";

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<ITask | null>(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTask({
        title: "test title",
        description: "test description",
        assigned: "test assignee",
        _id: '2'
      });
    }, 2000);
    return () => clearTimeout(timeout)
  }, []);

  return task;
};
