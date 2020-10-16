import * as React from "react";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useTask } from "./useTask";
import { Button } from "../Main/Components/Button";
import { webSocketControllerInstance } from "../WebSocketInstance";
import {ITask} from "../Main/useTasks";

export const TaskCard = (props: { taskId: string }) => {
  const [localTask, setLocalTask] = useState<ITask | null>(null);
  const [disabled, setDisabled] = useState(false);
  const task = useTask(props.taskId);
  useEffect(() => {
    setLocalTask(task);
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
            value={localTask.assigned}
            label={"Assignee"}
            onChange={(value) => {
              setLocalTask({ ...localTask, assigned: value });
            }}
          />
          <Button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              webSocketControllerInstance
                .call({ type: "taskUpdate", data: localTask })
                .then((data) => {
                  setDisabled(false);
                });
            }}
            caption={"Обновить"}
          />
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};
