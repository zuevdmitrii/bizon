import * as React from "react";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useTask } from "./useTask";

interface ITask {
  title: string;
  description: string;
  assignee: string;
}

export const TaskCard = (props: { taskId: string}) => {
  const task = useTask(props.taskId);
  return (
    <div>
      {task ? (
        <div>
          <Input
            value={task.title}
            label={"Title"}
          />
          <Input
            value={task.description}
            label={"Description"}
          />
          <Input
            value={task.assignee}
            label={"Assignee"}
          />
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};
