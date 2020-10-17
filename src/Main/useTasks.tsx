import * as React from "react";

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
  filters: IObjectAny,
  sorting: IObjectAny,
  paging: IObjectAny
) => {
  const [tasks, setTasks] = React.useState<ITask[] | null>(null);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTasks([
        { _id: "5f8aa90153c4fb3272648d12", title: "task1", description: "q" } as ITask,
        { _id: "two", title: "task2" } as ITask,
      ]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return tasks;
};
