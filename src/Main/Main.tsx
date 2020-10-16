import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Index } from "./Index";
import "./Main.less";
import {TaskDetail} from "./TaskDetail";
import { Tasks } from "./Tasks";
import { webSocketControllerInstance }  from '../WebSocketInstance';
import { Persons } from "./Persons";

export const Main = (props: HashMap<any>) => {
  React.useEffect(() => {
    // webSocketControllerInstance.call({type:'employeeCreate', data: {firstName: 'Vladislav2', lastName: 'Bondarenko', role: 'CEO'}}).then((data) => {
    //   console.log(data)
    // })
    webSocketControllerInstance.call({type:'employeeGet', data: {}}).then((data) => {
      console.log(data)
    })

    //get by ID
    // webSocketControllerInstance.call({type:'employeeGet', data: {id: '5f8a1497806a3424eaec10db'}}).then((data) => {
    //   console.log(data)
    // })

    // update employee
    // webSocketControllerInstance
    //   .call({ type: "employeeGet", data: { id: "5f8a1497806a3424eaec10db" } })
    //   .then((res) => {
    //     const { data } = res;
    //     webSocketControllerInstance
    //       .call({ type: "employeeUpdate", data: {...data, firstName: 'Vladislav'} }).then(res => console.log(res))
    //   });

    //  webSocketControllerInstance.call({type:'employeeDelete', data: {id: '5f8a1ac9d50d43299954d9f4'}}).then((data) => {
    //   console.log(data)
    // })

    // webSocketControllerInstance.send({type:'getEmployees', data: {}});
  }, []);

  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/task/:id" exact component={TaskDetail} />
      <Route path="/tasks/" exact component={Tasks} />
      <Route path="/persons/" exact component={Persons} />

    </Router>
  );
};
