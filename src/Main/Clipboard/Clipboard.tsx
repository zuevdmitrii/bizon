import * as React from "react";
import { WebSocketController } from "../../WebSocketController";
import "./Clipboard.less";

interface IProps {
  connect: boolean;
  label?: string;
  onStart: () => void;
  onCopied: (value: string) => void;
}

export const Clipboard = ({ connect, onCopied, onStart, label }: IProps) => {
  const [socket, setSocket] = React.useState<WebSocketController>();
  const [callback, setCallback] = React.useState<ICallbackMsg | undefined>();

  const unsubSocket = React.useMemo(() => {
    return function unsubSocket() {
      if (socket && callback) {
        socket.sendRaw({
          header: { service: "helper", action: "stopListen", uuid: "" },
          payload: {},
        });
        socket.unRegisterCallback(callback);
        setCallback(undefined);
      }
    };
  }, [socket, callback]);

  React.useEffect(() => {
    if (connect) {
      let webSocketController =
        socket || new WebSocketController("ws://localhost:8000/ws");
      const callback: ICallbackMsg = (res: any) => {
        if (res && res.payload) {
          onCopied(res.payload.text);
        }
      };
      webSocketController.registerCallback(callback);
      setCallback(() => callback);
      setSocket(webSocketController);
      webSocketController.sendRaw({
        header: { service: "helper", action: "startListen", uuid: "" },
        payload: {},
      });
    } else {
      unsubSocket();
    }
    return unsubSocket;
  }, [connect, onCopied]);

  return (
    <div className="clipboard_root">
      {!callback && (
        <div
          className="button"
          onClick={() => {
            onStart();
          }}
        >
          Помощник
        </div>
      )}
      {callback && (
        <div className="button" onClick={unsubSocket}>
          {label ? `Выделите ${label} задачи и нажмите ctrl + c\т` : ""}
          Отключить помощника
        </div>
      )}
    </div>
  );
};
