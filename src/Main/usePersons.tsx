import * as React from 'react'
import { employeeGet } from '../api/EmployeeApi';


export interface IPerson {
    _id: string
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const usePersons = (filters: IObjectAny, sorting: IObjectAny, paging: IObjectAny)=>{
    const [persons, setPersons] = React.useState<IPerson[]| null>(null);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      employeeGet().then((res) => {
          res && res.data && setPersons(res.data);
        })
      ;
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return persons
}