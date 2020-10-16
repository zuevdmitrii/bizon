import * as React from "react";
import { WebSocketController } from "../../WebSocketController";
import "./Clipboard.less";

interface IProps {}

export const Clipboard = ({}: IProps) => {
  const [socket, setSocket] = React.useState<WebSocketController>();
  const [callback, setCallback] = React.useState<ICallbackMsg | undefined>();
  const [lastCopied, setLastcopied] = React.useState("");
  return (
    <div className="clipboard_root">
      Clipboard logger{callback ? '(Connected)' : '(Not connected)'}
      <div
        className="button"
        onClick={() => {
          let webSocketController =
            socket || new WebSocketController("ws://localhost:8000/ws");
          const callback: ICallbackMsg = (res: any) => {
            if (res && res.payload) {
              setLastcopied(res.payload.text);
            }
          };
          webSocketController.registerCallback(callback)
          setCallback(() => callback)
          setSocket(webSocketController)
          webSocketController.sendRaw({
            header: { service: "helper", action: "startListen", uuid: "" },
            payload: {},
          });
        }}
      >
        Connect
      </div>
      <div
        className="button"
        onClick={() => {
          if (socket && callback) {
            socket.sendRaw({
              header: { service: "helper", action: "stopListen", uuid: "" },
              payload: {},
            });
            socket.unRegisterCallback(callback);
            setCallback(undefined)
          }
        }}
      >
        Disconnect
      </div>
      Last copied: {lastCopied}
    </div>
  );
};
