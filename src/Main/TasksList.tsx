import * as React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "./useTasks";
import "./Main.less";
import { Button } from "./Components/Button";

export const TasksList = () => {
  const tasks = useTasks({}, {}, {});

  return (
    <div>
      {tasks ? (
        <div>
          {tasks.map((task, index) => {
            return (
              <div className="list_root" key={index}>
                <Link to={`/task/${task._id}`} className="list__row-wrapper">
                  Открыть
                </Link>
                <div className={"listTitle"} key={index}>
                  {task.title}
                </div>
              </div>
            );
          })}
          <Link to={`/task/new/`} className="list__row-wrapper">
            <Button onClick={() => {}} caption={"Создать задачу"} />
          </Link>
        </div>
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
