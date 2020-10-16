import * as React                         from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Index }                          from "./Index";
import "./Main.less";
import { webSocketControllerInstance }    from '../WebSocketInstance';
import {TaskDetail} from "./TaskDetail";

export const Main = (props: HashMap<any>) =>  {

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
      <Route path="/employes" exact component={Index} />
    </Router>
  );
}
