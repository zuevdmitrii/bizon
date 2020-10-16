export class WebSocketController {
  private socket:WebSocket = null;
  private receivedMsgCallbacks:Array<ICallbackMsg> = [];

  private handleMessage(data:ITypeMsg) {
    this.receivedMsgCallbacks.forEach((el)=>{
      el(data);
    })
  }

  private socketConnected:boolean = false;
  private queue:Array<ITypeMsg> = [];
  
  constructor () {
    this.socket = new WebSocket(location.origin.replace(/^http/, 'ws'));
    this.socket.onopen = () => {
        console.log("Соединение установлено.");
        this.socketConnected = true;
        this.queue.forEach((msg)=>{
          this.send(msg);
        });
        this.queue = [];
    };

    this.socket.onclose = (event) => {
        this.socketConnected = false;
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
        this.handleMessage({type: 'error', data: event});
    };

    this.socket.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
    };

    this.socket.onerror = (error) => {
        //@ts-ignore
        console.log("Ошибка " + error.message);
    };
  }

  registerCallback(callback:ICallbackMsg) {
    this.receivedMsgCallbacks.push(callback);
  }

  unRegisterCallback(callback:ICallbackMsg) {
    this.receivedMsgCallbacks.splice(this.receivedMsgCallbacks.indexOf(callback));
  }

  send(msg:ITypeMsg) {
    if (this.socketConnected) {
      this.socket.send(JSON.stringify(msg));
    } else {
      this.queue.push(msg);
    }
  }

}
