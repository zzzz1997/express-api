const socket = require('socket.io');

let io;

const PROTOCOL = 'ionic';

let connections = [];

module.exports = {
    run: (server) => {
        io = socket(server);
        io.on('connection', (req) => {
            console.log(req);
            console.log('connection');
        });
        /*const ws = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        });

        let connection;
        ws.on("request", req => {
            if (PROTOCOL !== req.httpRequest.headers['sec-websocket-protocol']) {
                req.reject();
                console.log((new Date()) + ' Connection from origin ' + req.origin + ' rejected.');
            } else {
                connection = req.accept(PROTOCOL, req.origin);
                console.log((new Date()) + ' Connection accepted.');
                const data = {};
                data.event = 'connect';
                data.value = 'got it';
                connection.sendUTF(JSON.stringify(data));
                connection.on("message", msg => {
                    if (msg.type === "utf8") {
                        const data = JSON.parse(msg.utf8Data);
                        switch (data.event) {
                            case "heart":
                                connection.sendUTF(JSON.stringify(data));
                                break;
                        }
                    }
                });
                connection.on("close", (responseCode, description) => {
                    console.log(responseCode, description);
                    connections.splice(connections.indexOf(connection), 1);
                });
                connections.push(connection);
                console.log(connections.length);
            }
        });*/
    },
    sendMessage: (event, value) => {
        const data = {};
        data.event = event;
        data.value = value;
        console.log(connections.length);
        for (let i = 0; i < connections.length; i++) {
            connections[i].sendUTF(JSON.stringify(data))
        }
    }
};
