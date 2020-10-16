import * as React from "react";
import { useState } from "react";
interface ITask {
  title: string;
  description: string;
  assignee: string;
}

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<ITask | null>(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      //taskId
      setTask({
        title: "test title",
        description: "test description",
        assignee: "test assignee",
      });
    }, 2000);
    return () => clearTimeout(timeout)
  }, []);

  return task;
};
