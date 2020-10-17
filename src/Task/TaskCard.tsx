import * as React from "react";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useTask } from "./useTask";
import { Button } from "../Main/Components/Button";
import { ITask } from "../Main/useTasks";
import { taskCreate, taskUpdate } from "../api/TaskApi";

export const TaskCard = (props: { taskId: string }) => {
  const [localTask, setLocalTask] = useState<ITask | null>(null);
  const [disabled, setDisabled] = useState(false);
  const task = useTask(props.taskId);
  useEffect(() => {
    if (props.taskId !== "new") {
      setLocalTask(task);
    } else {
      setLocalTask({} as ITask);
    }
  }, [task]);
  return (
    <div>
      {localTask ? (
        <div>
          <Input
            value={localTask.title}
            label={"Title"}
            onChange={(value) => {
              setLocalTask({ ...localTask, title: value });
            }}
          />
          <Input
            value={localTask.description}
            label={"Description"}
            onChange={(value) => {
              setLocalTask({ ...localTask, description: value });
            }}
          />
          <Input
            value={localTask.assignee}
            label={"Assignee"}
            onChange={(value) => {
              setLocalTask({ ...localTask, assignee: value });
            }}
          />
          <Input
            value={localTask.status}
            label={"Status"}
            onChange={(value) => setLocalTask({ ...localTask, status: value })}
          />
          <Button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              if (props.taskId === "new") {
                localTask.targetDate = new Date()
                localTask.creationDate = new Date()
                taskCreate(localTask).then(() => setDisabled(false));
              } else if (localTask) {
                taskUpdate(localTask).then(() => setDisabled(false));
              }
            }}
            caption={props.taskId === "new" ? "Создать" : "Обновить"}
          />
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};
