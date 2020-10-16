import { v4 as uuidv4 } from 'uuid';

export class WebSocketController {
  private socket: WebSocket = null;
  private receivedMsgCallbacks: Array<ICallbackMsg> = [];

  private handleMessage(data: ITypeMsg) {
    this.receivedMsgCallbacks.forEach((el) => {
      el(data);
    });
  }

  private socketConnected: boolean = false;
  private queue: Array<ITypeMsg> = [];

  constructor(address?: string) {
    const socketAddress = address || location.origin.replace(/^http/, "ws")
    this.socket = new WebSocket(socketAddress);
    this.socket.onopen = () => {
      console.log("Соединение установлено.");
      this.socketConnected = true;
      this.queue.forEach((msg) => {
        this.send(msg);
      });
      this.queue = [];
    };

    this.socket.onclose = (event) => {
      this.socketConnected = false;
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения"); // например, "убит" процесс сервера
      }
      console.log("Код: " + event.code + " причина: " + event.reason);
      this.handleMessage({ type: "error", data: event });
    };

    this.socket.onmessage = (event) => {
      this.handleMessage(JSON.parse(event.data));
    };

    this.socket.onerror = (error) => {
      //@ts-ignore
      console.log("Ошибка " + error.message);
    };
  }

  registerCallback(callback: ICallbackMsg) {
    this.receivedMsgCallbacks.push(callback);
  }

  unRegisterCallback(callback: ICallbackMsg) {
    this.receivedMsgCallbacks.splice(
      this.receivedMsgCallbacks.indexOf(callback)
    );
  }

  send(msg: ITypeMsg) {
    if (this.socketConnected) {
      this.socket.send(JSON.stringify(msg));
    } else {
      this.queue.push(msg);
    }
  }
  
  sendRaw(msg: any) {
    if(this.socketConnected) {
      this.socket.send(JSON.stringify(msg))   
    } else {
      this.queue.push(msg);
    }
  }

  async call(obj: any): Promise<any> {
    const generateGuid = uuidv4
    obj.queueId = generateGuid();
    let promiseResolve: any = () => {};
    const promise = new Promise((resolve) => {
      promiseResolve = resolve;
    });
    const callback = (data: ITypeMsg) => {
      const parsed = data as any;
      if (parsed.queueId === obj.queueId) {
        this.unRegisterCallback(callback);
        obj.data = parsed.data;
        promiseResolve(data);
      }
    };
    this.registerCallback(callback);
    this.send(obj);
    return promise;
  }
}
