class Controller {
    constructor(targetElement = document) {
        const Target = targetElement;
        // register mouse events
        Target.addEventListener("mousedown", this.Mouse.down)
        Target.addEventListener("mouseup", this.Mouse.up)
        Target.addEventListener("mouseenter", this.Mouse.enter)
        Target.addEventListener("mousemove", this.Mouse.move)
        Target.addEventListener("mouseleave", this.Mouse.leave)
        Target.addEventListener("contextmenu", this.Mouse.contextMenu)

        // init keys array
        for (let i = 0; i < 127; i++) { this.Keyboard.data.array[i] = false; }
        // register keyboard events
        document.addEventListener("keydown", this.Keyboard.down)
        document.addEventListener("keyup", this.Keyboard.up)
    }

    Mouse = {
        data: {
            isRightDown: false,
            isLeftDown: false,
            isMiddleDown: false,
            onFocus: false,
            ePos: { x: 0, y: 0 }, // element x and y
            dPos: { x: 0, y: 0 } // document x and y
        },
        onEvent: (e) => {
            // setting mouse document pos
            this.Mouse.data.dPos.x = e.pageX
            this.Mouse.data.dPos.y = e.pageY

            // setting mouse element pos
            this.Mouse.data.ePos.y = e.clientY
            this.Mouse.data.ePos.x = e.clientX
        },
        down: (e) => {
            this.Mouse.onEvent(e)
            switch (e.which) {
                case 1: // Left mouse button
                    this.Mouse.data.isLeftDown = true;
                    break;
                case 2: // Middle mouse button
                    this.Mouse.data.isMiddleDown = true;
                    break;
                case 3: // Right mouse button
                    this.Mouse.data.isRightDown = true;
                    break;
            }
        },
        up: (e) => {
            this.Mouse.onEvent(e)
            switch (e.which) {
                case 1: // Left mouse button
                    this.Mouse.data.isLeftDown = false;
                    break;
                case 2: // Middle mouse button
                    this.Mouse.data.isMiddleDown = false;
                    break;
                case 3: // Right mouse button
                    this.Mouse.data.isRightDown = false;
                    break;
            }
        },
        enter: (e) => {
            this.Mouse.onEvent(e)
            this.Mouse.data.onFocus = true;
        },
        leave: (e) => {
            this.Mouse.onEvent(e)
            this.Mouse.data.onFocus = false;
        },
        move: (e) => {
            this.Mouse.onEvent(e)
            this.Mouse.data.onFocus = true;
        },

        contextMenu: (e) => {
            // Prevent the default context menu behavior
            e.preventDefault();
        },
    }

    Keyboard = {
        data: {
            array: []
        },
        down: (e) => {
            const kb = this.Keyboard.data.array;
            kb[e.keyCode] = true;
        },
        up: (e) => {
            const kb = this.Keyboard.data.array;
            kb[e.keyCode] = false;
        }
    }
}

const C = new Controller();