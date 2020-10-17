import * as React from 'react'
import { useEffect } from 'react';
import { employeeGet } from '../api/EmployeeApi';
import { IDataProviderFilter } from '../api/IFilter';


export interface IPerson {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
}

export const usePersons = (filters: IDataProviderFilter | null, sorting: IObjectAny, paging: IObjectAny)=>{
  const [persons, setPersons] = React.useState<IPerson[]| null>(null);
  useEffect(() => {
      employeeGet().then((res) => {
          res && res.data && setPersons(res.data);
        })
    }, []);
    const filterEmployees = async () =>{
      const {data} = await employeeGet(undefined,undefined, filters)
      
      if (data) {
        setPersons(data)
      }
    }
    
    useEffect(()=>{
     filters && filterEmployees()  
    },[filters])
  
  return persons
}