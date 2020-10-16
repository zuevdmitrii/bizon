//this.props.match.params.id
import * as React from 'react';
import {PageTemplate} from "./PageTemplate";
import {TaskCard} from "../Task/TaskCard";

export const TaskDetail = (props: any) => {
  return <PageTemplate>
    <TaskCard taskId={props.match.params.id}/>
  </PageTemplate>
}