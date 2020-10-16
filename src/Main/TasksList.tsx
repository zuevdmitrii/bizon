import * as React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "./useTasks";
import "./Main.less";

export const TasksList = () => {
  const tasks = useTasks({}, {}, {});

  return (
    <div>
      {tasks ? (
        tasks.map((task, index) => {
          return (
            <div className='list_root' key={index}>
              <Link to={`/task/${task._id}`} className="list__row-wrapper">
                Открыть
              </Link>
              <div className={'listTitle'} key={index}>{task.title}</div>
            </div>
          );
        })
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
