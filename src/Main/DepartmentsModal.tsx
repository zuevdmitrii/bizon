import * as React from 'react' 
import { useEffect, useState } from 'react';
import { departmentGet } from '../api/DepartmentApi';
import { Button } from './Components/Button'

interface IProps {
    select: (value: string)=> void
}
export const DepartmentsModal = (props: IProps) =>{
    const [departmentsList, setDepartmentsList] = useState<string[]>([])
    
    useEffect(()=>{
        fetchDepartments()
    },[])

    const fetchDepartments = async () => {
        const { data } = await departmentGet();
        setDepartmentsList(data);
      };
    
    return <div>
        Departments List
        {departmentsList.map((item, index)=>(
            <div key={index}>
                {item} 
                <Button onClick={()=>props.select(item)} caption={'Выбрать'}/>
            </div>
        ))}
    </div>
}