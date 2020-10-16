import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Index } from './Index';
import "./Main.less";
import { Task_ } from './Task_';


export function Main(props:HashMap<any>) {
    return (
      <Router>
          <Route path='/' exact component={Index}/>
          <Route path='/task/:id' exact component={Task_}/>
          <Route path='/employes' exact component={Index}/>
      </Router>
    )
}
