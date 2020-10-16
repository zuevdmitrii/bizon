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

    webSocketControllerInstance.call({type:'getEmployees', data: {}}).then((data) => {
      console.log(data)
    })
    // webSocketControllerInstance.send({type:'getEmployees', data: {}});
  }, [])

  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/task/:id" exact component={TaskDetail} />
      <Route path="/tasks/" exact component={Tasks} />
      <Route path="/persons/" exact component={Persons} />

    </Router>
  );
};
