import * as React                                                      from "react";
import { BrowserRouter as Router, Route }                              from "react-router-dom";
import { Index }                                                       from "./Index";
import "./Main.less";
import { TaskDetail }                                                  from "./TaskDetail";
import { Tasks }                                                       from "./Tasks";
import { webSocketControllerInstance }                                 from "../WebSocketInstance";
import { PersonDetail }                                                from "./Person/PersonDetail";
import { Persons }                                                     from "./Persons";
import { taskCreate, taskGet, taskUpdate, taskDelete }                 from "../api/TaskApi";
import { employeeCreate, employeeGet, employeeUpdate, employeeDelete } from '../api/EmployeeApi';
import { login }                                                       from '../api/LoginApi';

export const Main = (props: HashMap<any>) => {
  React.useEffect(() => {
    const testFetch = async () => {
      // const res = await taskCreate();
      // const {data} = await taskGet("5f8aad193cba44338d819887")
      // const res = await taskUpdate({...data, title: 'Tetst modify'})
      // const res = await taskDelete("5f8aad193cba44338d819887")
      // const res = await employeeCreate()
      // const { data } = await employeeGet(undefined, 'bondarencko40@gmail.com')
      // console.log(data)
      // const [empl] = data
      // const res = await employeeUpdate({...empl, firstName: 'del me'})
      // const res = await employeeDelete('5f8ab08908b3ef34962e0e7d')
      // console.log(res);
      await login('qwetyel@gmail.com', '123')
    };
    testFetch();
  }, []);

  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/task/:id" exact component={TaskDetail} />
      <Route path="/person/:id" exact component={PersonDetail} />
      <Route path="/employes" exact component={Index} />
      <Route path="/tasks/" exact component={Tasks} />
      <Route path="/persons/" exact component={Persons} />
    </Router>
  );
};
