import * as React from 'react'
import { employeeGet } from '../api/EmployeeApi';
import { IDataProviderFilter } from '../api/IFilter';


export interface IPerson {
    _id: string
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const usePersons = (filters: IDataProviderFilter, sorting: IObjectAny, paging: IObjectAny)=>{
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