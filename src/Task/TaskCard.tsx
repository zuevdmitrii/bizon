import * as React from "react";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useTask } from "./useTask";
import { Button } from "../Main/Components/Button";
import { ITask } from "../Main/useTasks";
import { Clipboard } from "../Main/Clipboard/Clipboard";
import { taskCreate, taskUpdate } from "../api/TaskApi";

const fieldsToFill = ["title", "description"];

export const TaskCard = (props: { taskId: string }) => {
  const [localTask, setLocalTask] = useState<ITask | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [helperConnect, setHelperConnect] = useState(false);
  const [helperState, setHelperState] = useState(0);
  const task = useTask(props.taskId);
  useEffect(() => {
    if (props.taskId !== "new") {
      setLocalTask(task);
    } else {
      setLocalTask({} as ITask);
    }
  }, [task]);

  useEffect(() => {
    if (helperState === fieldsToFill.length) {
      setHelperConnect(false);
    }
  }, [helperState]);

  return (
    <div style={{ position: "relative" }}>
      {localTask ? (
        <div>
          <Clipboard
            connect={helperConnect}
            onStart={() => {
              setHelperConnect(true)
              setHelperState(0)
            }}
            onCopied={(value) => {
              setHelperState(helperState + 1)
              setLocalTask({
                ...localTask,
                [fieldsToFill[helperState]]: value,
              })
            }}
          />
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
