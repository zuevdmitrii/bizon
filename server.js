const getEmployees = require('./server/handlers/employees/getEmployees')
const createEmployee = require('./server/handlers/employees/createEmployee')
const updateEmployee = require('./server/handlers/employees/updateEmployee')
const deleteEmployee = require('./server/handlers/employees/deleteEmployee')

const getTasks = require('./server/handlers/tasks/getTasks')
const createTask = require('./server/handlers/tasks/createTask')
const updateTask = require('./server/handlers/tasks/updateTask')
const deleteTask = require('./server/handlers/tasks/deleteTask')

const login = require('./server/handlers/login/login')
const getDepartments = require('./server/handlers/departments/getDepartments')

const getTasksByDepartment = require('./server/handlers/tasks/getTasksByDepartment')
const getTasksByUser = require('./server/handlers/tasks/getTasksByUser')

const getHistory = require('./server/handlers/history/getHistory')
const createHistory = require('./server/handlers/history/createHistory')
const updateHistory = require('./server/handlers/history/updateHistory')
const deleteHistory = require('./server/handlers/history/deleteHistory')

const mongoose = require("mongoose");
const root = process.cwd(),
      path = require('path'),
      express = require('express'),
      fs = require('fs'),
      app = express(),
      resourcesPath = path.join('', '.');

const global = (function() {
    return this || (0, eval)('this');
})();

const indexFile = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
app.get('/task/*', (req, res) => {
    res.send(indexFile);
});
app.get('/employes/*', (req, res) => {
    res.send(indexFile);
});

app.get('/tasks/*', (req, res) => {
    res.send(indexFile);
});

app.get('/persons/*', (req, res) => {
    res.send(indexFile);
});

app.get('/person/*', (req, res) => {
    res.send(indexFile);
});

app.get('/statistics/*', (req, res) => {
    res.send(indexFile);
});

const clients = {};

app.use(express.static(resourcesPath));

(async function () {
    try {
        await mongoose.connect('mongodb+srv://admin:ok2222@cluster0.abwwh.mongodb.net/data?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        const port = process.env.PORT || 777;
        var expressServer = app.listen(port, () => {
            console.log('app available on port ' + port);
        });

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


        async function handleMessage(data, id) {
            switch (data.type) {
                case "historyGet":
                    getHistory(clients, id, data)
                    break
                case "historyCreate":
                    createHistory(clients, id, data)
                    break
                case "historyUpdate":
                    updateHistory(clients, id, data)
                    break
                case "historyDelete":
                    deleteHistory(clients, id, data)
                    break
                case "taskGetByUser":
                    getTasksByUser(clients, id, data)
                    break;
                case "taskGetByDepartment":
                    getTasksByDepartment(clients, id, data)
                    break
                case "departmentGet":
                    getDepartments(clients, id, data)
                    break
                case "login":
                    login(clients, id, data)
                    break
                case "employeeGet":
                    getEmployees(clients, id, data)
                    break;
                case "employeeCreate":
                    createEmployee(clients, id, data)
                    break
                case 'employeeUpdate':
                    updateEmployee(clients, id, data)
                    break
                case 'employeeDelete':
                    deleteEmployee(clients, id, data)
                    break
                case "taskGet":
                    getTasks(clients, id, data)
                    break
                case "taskCreate":
                    createTask(clients, id, data)
                    break
                case "taskUpdate":
                    updateTask(clients, id, data)
                    break
                case "taskDelete":
                    deleteTask(clients, id, data)
                    break
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
                    boss = clients[id];
                    boss.ws.send(JSON.stringify({queueId: data.queueId, type: "not found", data: {}}));
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

    } catch (e) {
        console.log(e);
    }
})();


// var expressServer = app.listen(port);
// console.log('app available on port ' + port);

// websockets
