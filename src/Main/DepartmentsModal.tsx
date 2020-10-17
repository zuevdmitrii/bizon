import * as React from 'react' 
import { Button } from './Components/Button'

interface IProps {
    departmentsList: string[]
    select: (value: string)=> void
}
export const DepartmentsModal = (props: IProps) =>{
    return <div>
        Departments List
        {props.departmentsList.map((item, index)=>(
            <div key={index}>
                {item} 
                <Button onClick={()=>props.select(item)} caption={'Выбрать'}/>
            </div>
        ))}
    </div>
}