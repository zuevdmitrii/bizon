const root = process.cwd(),
   path = require('path'),
   express = require('express'),
   fs = require('fs'),
   app = express(),
   resourcesPath = path.join('', '.');

const global = (function() {
   return this || (0, eval)('this');
})();

const clients = {};

app.use(express.static(resourcesPath));
const port = process.env.PORT || 777;
var expressServer = app.listen(port);
console.log('app available on port ' + port);

// websockets

const WebSocket = require('ws');

global.currentInfo = {};

var INTERVALS = [];
let boss;

const wss = new WebSocket.Server({server:expressServer});
wss.on('connection', function connectionListener(ws) {

  var id = Math.random();
  clients[id] = {
    imboss: false,
    answer: null,
    ws: ws
  };
  console.log("новое соединение " + id);

   ws.on('close', () => {
      if (clients[id].answer && activeAnswer[clients[id].answer]) {
        activeAnswer[clients[id].answer]--;
        boss.ws.send(JSON.stringify({type: "newanswer", data: {count: activeAnswer}}));
      }
      if (clients[id].imboss) {
        boss = null;
      }
      delete clients[id];

      if (boss) {
        boss.ws.send(JSON.stringify({type: "countclients", data: {count: Object.keys(clients).length-1}}));
      }
   });

   ws.on('message', (data) => {
      handleMessage(JSON.parse(data), id);
   });

});

let activeAnswer;
let descriptionVote;


function handleMessage(data, id) {
   switch (data.type) {
      case "imboss":
         clients[id].imboss = true;
         boss = clients[id];
         boss.ws.send(JSON.stringify({type: "newanswer", data: {count: activeAnswer}}));
         boss.ws.send(JSON.stringify({type: "countclients", data: {count: Object.keys(clients).length-1}}));
         break;
      case "newclient":
        if (descriptionVote) {
          clients[id].ws.send(JSON.stringify({type: "newvote", data: descriptionVote}));
        }
        if (boss) {
          boss.ws.send(JSON.stringify({type: "countclients", data: {count: Object.keys(clients).length-1}}));
        }
        break;
      case "newvote":

        if (JSON.stringify(descriptionVote) === JSON.stringify(data.data)) {
          return;
        }
        activeAnswer = {};
        data.data.answers.forEach((el)=>{
          activeAnswer[el.ans] = 0;
        });
        descriptionVote = data.data;

        for(let i in clients) {
         if (clients.hasOwnProperty(i)) {
           clients[i].answer = null;
           try {
             clients[i].ws.send(JSON.stringify({type: "newvote", data: descriptionVote}));
           } catch(e) {}
         }
        }
        break;
      case "endvote":
        endvote();
        break;
      case "answer":
        clients[id].answer = data.data.answer;
        activeAnswer[data.data.answer]++;

        boss.ws.send(JSON.stringify({type: "newanswer", data: {count: activeAnswer}}));
        break;
      default:
         return "wrong request";
   }
}

function endvote() {
  descriptionVote = null;
  for(let i in clients) {
    if (clients.hasOwnProperty(i)) {
      clients[i].answer = null;
      try {
        clients[i].ws.send(JSON.stringify({type: "endvote", data: ''}));
      } catch(e) {}
    }
   }
}

function stopServers() {
   // closeAllClientConnections(wss);
   wss.close();
   expressServer.close();
}
