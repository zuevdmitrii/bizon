import { ITask } from "./useTasks";
import { Link, useHistory } from "react-router-dom";
import { Button } from "./Components/Button";
import * as React from "react";
import "./TasksTable.less";

interface IProps {
  tasks: ITask[];
  setTask?: (title: string, id: string) => void;
}

export const TasksTable = ({ tasks, setTask }: IProps) => {
  const history = useHistory();
  return (
    <div className="task-table-root">
      <div className="task-table-head">
        <span className="task-table-head-item">Назначено</span>
        <span className="task-table-head-item">Выполнить до</span>
      </div>
      {tasks.map((task, index) => {
        const creationDate = new Date(task.creationDate);
        const targetDate = new Date(task.targetDate);
        return (
          <div
            style={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              history.push(`/task/${task._id}`);
            }}
          >
            <div className={"listTitle"} key={index}>
              <div className={"task-table-title"}>{task.title}</div>
              <div className={"task-table-content"}>
                <div className={"task-table-description"}>
                  {task.description}
                </div>
                <div className={"task-table-date-wrapper"}>
                  <div className="task-table-date">{`${creationDate.getDate()}.${
                    creationDate.getMonth() + 1
                  }.${creationDate.getFullYear()}`}</div>
                  <div className="task-table-date">
                    {`${targetDate.getDate()}.${
                      targetDate.getMonth() + 1
                    }.${targetDate.getFullYear()}`}
                  </div>
                </div>
              </div>
              {setTask && (
                <Button
                  caption="Выбрать"
                  onClick={() => {
                    setTask(task.title, task._id);
                  }}
                />
              )}
              <div className={"task-table-hr"} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
