import * as React from 'react'

export interface IPerson {
    _id: string
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const usePersons = (filters: IObjectAny, sorting: IObjectAny, paging: IObjectAny)=>{
    const [tasks, setTasks] = React.useState<IPerson[]| null>(null);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTasks([
        { _id: 'one',email: "task1", firstName: "Глеб" } as IPerson,
        { _id: 'two',email: "task2", firstName: "Олег"} as IPerson,
      ]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return tasks
}