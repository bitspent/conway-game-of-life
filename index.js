tools = require('./helper.js');
engine = require('./engine.js');
express = require('express');
path = require('path');

// set up http server
const PORT = process.env.PORT || 5000;
const server = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('index'))
    .listen(PORT, () => console.log(`HTTP Listening on ${ PORT }`));

// set up web socket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({server: server});

// load up the engine on connection
wss.on(
    'connection', function connection(ws) {
        // first handshake, send a suggested cell color
        let nextColor = engine.processMessage('nextColor');
        console.log('new connection sending a suggested color %s', nextColor);
        ws.send(nextColor);
        // process incoming messages
        ws.on('message', function incoming(message) {
            console.log('got raw command: %s', message);
            let reply = engine.processMessage(message);
            console.log('sending raw reply: %s', tools.shorten(reply));
            ws.send(reply)
        });
    }
);

console.log('Running World...');
engine.runWorld();