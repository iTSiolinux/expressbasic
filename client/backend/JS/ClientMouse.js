class _Mouse {
  constructor(element = document, isLogger = false) {
    // Use arrow functions to maintain the correct 'this' context
    element.addEventListener('mouseup', (event) => this.mouseUp(event));
    element.addEventListener('mousedown', (event) => this.mouseDown(event));
    element.addEventListener('mouseenter', (event) => {
      this.updateMousePos(event);
    });
    element.addEventListener('mouseleave', (event) => {
      this.updateMousePos(event);
    });
    element.addEventListener('mouseout', (event) => {
      this.updateMousePos(event);
    });

    this.isLeftDown = false;
    this.isRightDown = false;
    this.isMiddleDown = false;
    this.isLogger = isLogger;

    this.POS = { x: 0, y: 0 };
  }

  // Function for mouse down event
  mouseDown(event) {
    if (event.which == 1) {
      this.isLeftDown = true;
      this.onLeftMouseDown(event);
    } else if (event.which == 2) {
      this.isMiddleDown = true;
      this.onMiddleMouseDown(event);
    } else if (event.which == 3) {
      this.isRightDown = true;
      this.onRightMouseDown(event);
    }
    this.updateMousePos(event);
  }

  updateMousePos(event) {
    this.POS.x = event.x;
    this.POS.y = event.y;
  }

  // Function for mouse up event
  mouseUp(event) {
    if (event.which == 1) {
      this.isLeftDown = false;
      this.onLeftMouseUp(event);
    } else if (event.which == 2) {
      this.isMiddleDown = false;
      this.onMiddleMouseUp(event);
    } else if (event.which == 3) {
      this.isRightDown = false;
      this.onRightMouseUp(event);
    }
    this.updateMousePos(event);
  }

  // Custom functions to be overridden for mouse events
  onLeftMouseDown(event) {
    this.log('Left mouse button down!');
  }

  onMiddleMouseDown(event) {
    this.log('Middle mouse button down!');
  }

  onRightMouseDown(event) {
    this.log('Right mouse button down!');
  }

  onLeftMouseUp(event) {
    this.log('Left mouse button up!');
  }

  onMiddleMouseUp(event) {
    this.log('Middle mouse button up!');
  }

  onRightMouseUp(event) {
    this.log('Right mouse button up!');
  }

  // Function to conditionally log messages
  log(message) {
    if (this.isLogger) {
      console.log(message);
    }
  }
}

// Example Usage:
// Instantiate the mouse with custom event handling and logging disabled
const MOUSE = new _Mouse(document, false);
