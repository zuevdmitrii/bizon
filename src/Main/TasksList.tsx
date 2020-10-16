import * as React from "react";
import { useTasks } from "./useTasks";


export const TasksList = () => {
  const tasks = useTasks({}, {}, {});

  return (
    <div>
      {tasks ? (
        tasks.map((task, index) => {
          return <div key={index}>{task.title}</div>;
        })
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
