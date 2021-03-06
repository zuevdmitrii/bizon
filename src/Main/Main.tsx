import * as React                         from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Index }                          from "./Index";
import "./Main.less";
import { TaskDetail }                     from "./TaskDetail";
import { Tasks }                          from "./Tasks";
import { PersonDetail }                   from "./Person/PersonDetail";
import { Persons }                        from "./Persons";
import { Auth }                           from "./Auth/Auth";
import { login }                          from "../api/LoginApi";
import { useEffect }                      from 'react';
import { employeeGet }                    from '../api/EmployeeApi';
import { Helper } from "./Helper";
import { Statistics }                     from './Statistics';

export const Main = (props: HashMap<any>) => {


  const [logged, setLogged] = React.useState<boolean>(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {logged ? (
        <>
          <Router>
            <Route path="/" exact component={Index} />
            <Route path="/task/:id" exact component={TaskDetail} />
            <Route path="/person/:id" exact component={PersonDetail} />
            <Route path="/employes" exact component={Index} />
            <Route path="/tasks/" exact component={Tasks} />
            <Route path="/persons/" exact component={Persons} />
            <Route path="/helper/" exact component={Helper} />
            <Route path="/statistics/" exact component={Statistics}/>
          </Router>
        </>
      ) : (
        <Auth
          onAuth={async (name, pass) => {
            await login(name, pass);
            setLogged(true);
            return true;
          }}
        />
      )}
    </>
  );
};
