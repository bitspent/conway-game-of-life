/*
 * web socket client
 */
const wsc = {

    onOpen: undefined,

    onError: undefined,

    onColorReply: undefined,

    onWorldReply: undefined,

    onSeedReply: undefined,

    /*
     * load up the socket connector client
     */
    startup: () => {

        /*
         * load up the web socket connector
         */
        wsc.client = new WebSocket(helper.wssURL());

        /*
         * bind the connection events
         */

        wsc.client.onopen = function () {
            console.log('ws connection opened');
            if (wsc.onOpen)
                wsc.onOpen();
        };

        wsc.client.onerror = (e) => {
            console.log('ws connection error: %s', e);
            if (wsc.onError)
                wsc.onError(e);
        };

        wsc.client.onmessage = (e) => {

            if (!e || !e.data) return;

            let data = e.data + '';

            console.log('got raw message: %s', helper.shorten(data));

            /*
             * backend cell color reply e.g. #ccffcc
             */
            if (wsc.onColorReply && data.startsWith('#'))
                wsc.onColorReply(data);
            /*
             * backend json world cells reply e.g. { cells : [ ... ] }
             */
            else if (wsc.onWorldReply && data.startsWith('{'))
                wsc.onWorldReply(JSON.parse(data));
            /*
             * backend cell seed feedback reply e.g. seed ok
             */
            else if (wsc.onSeedReply && data.startsWith('seed'))
                wsc.onSeedReply(data);
        };
    },

    /*
     * send raw message to the web socket server
     */
    sendCommand: function (cmd) {
        if (wsc.client && wsc.client.readyState === 1) {
            console.log('sending command: %s', cmd);
            wsc.client.send(cmd);
        } else {
            console.log('client not connected');
            presenter.toast('Connection Error, <a href=".">Please Reload</a>', 10000);
        }
    },

    /*
     *  request a random color to use
     *  command message format: 'nextColor'
     */
    requestNewColor: function () {
        console.log('requesting new color');
        wsc.sendCommand('nextColor');

    },

    /*
     *  request the world cells data
     *  command message format: 'world'
     */
    requestWorld: function () {
        console.log('requesting world cells data');
        wsc.sendCommand('world');
    },

    /*
     *  request a new cell seed in the world
     *  command message format: 'seed 412 #ccff22'
     */
    requestSeed: function (index, color) {
        console.log('requesting world');
        wsc.sendCommand(`seed ${index} ${color}`);
    }
};