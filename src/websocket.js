var Socket = {
  init: function() {

    this.socket = new WebSocket(location.origin.replace(/^http/, 'ws'));
    this.socket.onopen = () => {
        console.log("Соединение установлено.");
    };
    this.socket.onclose = (event) => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };
    this.socket.onmessage = (event) => {
        this._handleMessage(JSON.parse(event.data));
        console.log("Получены данные " + event.data);
    };
    this.socket.onerror = (error) => {
        console.log("Ошибка " + error.message);
    };
  },

  _handleMessage: function(data){
    var ext = "";
    switch (data.type) {
      case "newvote":
        for(var i=0;i<data.answers.length;i++) {
          ext += "<div onclick='Socket.answer(\""+data.answers[i]+"\")'>"+data.answers[i]+"</div>"
        }
        document.getElementById('variants').innerHTML = ext;
        break;
        case "newanswer":
          document.getElementById('results').innerHTML = JSON.stringify(data.count);
          break;
      default:

    }
  },

  setBoss: function(){
    this.socket.send(JSON.stringify({type: "imboss"}));
  },

  startNewVote: function(){
    this.socket.send(JSON.stringify({type: "newvote", answers: ["YES", "NO"] }));
    document.getElementById('results').innerHTML = '';
  },

  answer: function(ans) {
    this.socket.send(JSON.stringify({type: "answer", answer: ans }));
  }
}


Socket.init();
