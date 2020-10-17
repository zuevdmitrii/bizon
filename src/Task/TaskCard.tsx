import * as React from "react";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useTask } from "./useTask";
import { Button } from "../Main/Components/Button";
import { webSocketControllerInstance } from "../WebSocketInstance";
import { ITask } from "../Main/useTasks";
import { Clipboard } from "../Main/Clipboard/Clipboard";

const fieldsToFill = ["title", "description"];

export const TaskCard = (props: { taskId: string }) => {
  const [localTask, setLocalTask] = useState<ITask | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [helperConnect, setHelperConnect] = useState(false);
  const [helperState, setHelperState] = useState(0);
  const task = useTask(props.taskId);
  useEffect(() => {
    setLocalTask(task);
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
