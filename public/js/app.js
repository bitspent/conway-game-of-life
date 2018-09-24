const app = {

    REFRESH_RATE_MS: 250,

    /* no added logic, direct link */
    requestNewColor: wsc.requestNewColor,

    /* no added logic, direct link */
    requestSeed: wsc.requestSeed,

    /* no added logic, direct link */
    requestWorld: wsc.requestWorld,

    run: () => {

        /*
         * wrap up the web socket client: wsc
         */
        wsc.onOpen = () => {
            presenter.bindEvents();
            setInterval(wsc.requestWorld, app.REFRESH_RATE_MS);
        };

        wsc.onError = (e) => {
            presenter.toast('Connection Error, <a href=".">Please Reload</a>', 10000);
        };

        wsc.onColorReply = (color) => {

            console.log('using cell color %s', color);

            // set current cell color
            app.color = color;

            // ui-notify
            presenter.notifyCellColor(color);
        };

        wsc.onWorldReply = (world) => {

            console.log('got world cells data');

            // ui - update canvas
            presenter.drawWorld(world);
        };

        wsc.onSeedReply = (message) => {

            console.log('got cell seed status');

            // ui - notify
            presenter.notifySeedStatus(message.substring(4));
        };

        wsc.startup();
    }
};

onload = () => {
    console.log('page ready, loading the app...');
    app.run();
};