import * as React from 'react'
import { webSocketControllerInstance } from '../WebSocketInstance';

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
      webSocketControllerInstance.call({type:'employeeGet', data: {}}).then((response) => {
      console.log(response)
      response && response.data && setTasks(response['data'])
    })
      ;
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return tasks
}