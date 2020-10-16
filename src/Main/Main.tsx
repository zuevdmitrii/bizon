import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Index } from "./Index";
import "./Main.less";
import { Task_ } from "./Task_";
import { Tasks } from "./Tasks";

import { webSocketControllerInstance } from "../WebSocketInstance";
import { Staff } from "./Staff";

export const Main = (props: HashMap<any>) => {
  React.useEffect(() => {
    webSocketControllerInstance.send({ type: "getEmployees", data: {} });
  }, []);

  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/task/:id" exact component={Task_} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/staff" exact component={Staff} />

      <Route path="/employes" exact component={Index} />
    </Router>
  );
};
