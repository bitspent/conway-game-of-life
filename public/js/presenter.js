/*
 * selector shortcut
 */
const $ = (id) => {
    return document.getElementById(id);
};

/*
 * ui only - presenter
 */
const presenter = {

    /*
     * toast alert
     */
    toast: (msg, timeout) => {
        let toast = $('snackbar');
        toast.className = "show";
        toast.innerHTML = msg;
        presenter.toastIndex = (presenter.toastIndex || 0) + 1;
        setTimeout(() => {
            if (--presenter.toastIndex === 0)
                toast.className = toast.className.replace("show", "");
        }, timeout || 2000);
    },

    /*
     * draw cells matrix
     */
    drawWorld: (world) => {
        const canvas = $("board");
        const ctx = canvas.getContext("2d");
        const blockSize = 8;
        const gridWidth = Math.floor(canvas.width / blockSize);
        const size = world.width * world.height;
        for (let i = 0; i < size; i += 1) {
            const col = i % gridWidth;
            const row = (i - col) / gridWidth;
            const x = col * blockSize;
            const y = row * blockSize;
            ctx.fillStyle = world.colors[i] === null ? 'black' : world.colors[i];
            ctx.fillRect(x + 1, y + 1, blockSize - 1, blockSize - 1);
        }
    },

    /*
     * bind events
     */
    bindEvents: function () {

        /*
         * canvas cell click
         * get cell coordinates
         * request seed
         */
        const canvas = $("board");
        const ctx = canvas.getContext("2d");
        canvas.addEventListener("click", function (event) {
            const blockSize = 8;
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((event.clientX - rect.left) / blockSize);
            const y = Math.floor((event.clientY - rect.top) / blockSize);
            const gridWidth = Math.floor(canvas.width / blockSize);
            // get the cell index
            const index = x + y * gridWidth;
            // pre-fill color
            ctx.fillStyle = app.color;
            ctx.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 1, blockSize - 1);
            // request seed
            app.requestSeed(index, app.color);
        });

        /*
         * change seed color button
         */
        $('btn-color').onclick = app.requestNewColor;

        /*
         * still life - preset button
         */
        $('btn-preset-1').onclick = () => {
            presenter.toast('Still Life Preset Injection', 1000);
            [2515, 2516, 2615, 2616].forEach((i) => app.requestSeed(i, app.color));
        };

        /*
         * oscillator - preset button
         */
        $('btn-preset-2').onclick = () => {
            presenter.toast('Oscillator Preset Injection', 1000);
            [3256, 3257, 3258].forEach((i) => app.requestSeed(i, app.color));
        };

        /*
         * spaceship - presets seeds button
         */
        $('btn-preset-3').onclick = () => {
            presenter.toast('SpaceShip Preset Injection', 1000);
            [356, 457, 458, 557, 556].forEach((i) => app.requestSeed(i, app.color));
        };
    },

    /*
     * notify user - cell color
     */
    notifyCellColor: (color) => {
        $('btn-color').style.color = color;
        presenter.toast(`<span style="color:${color}"><b>Cell Color</b></span>`);
    },


    /*
     * notify seed status
     */
    notifySeedStatus: (status) => {
        presenter.toast(status, 1000);
    }
};