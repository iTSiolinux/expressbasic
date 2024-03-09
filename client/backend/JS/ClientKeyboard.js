class _Keyboard {
  constructor() {
    // Arrays to store the state of keys by key and key code
    this.keys = [];
    this.keyCodes = [];

    // Use arrow functions to maintain the correct 'this' context
    document.addEventListener('keydown', (event) => this.keyDown(event));
    document.addEventListener('keyup', (event) => this.keyUp(event));
  }

  // Function to handle keydown event
  keyDown(event) {
    this.onKeyDown(event);

    // Set the corresponding index to true in the arrays
    this.keys[event.key] = true;
    this.keyCodes[event.keyCode] = true;
  }

  // Function to handle keyup event
  keyUp(event) {
    this.onKeyUp(event);

    // Set the corresponding index to false in the arrays
    this.keys[event.key] = false;
    this.keyCodes[event.keyCode] = false;
  }

  // Custom function to be overridden for keydown event
  onKeyDown(event) {}

  // Custom function to be overridden for keyup event
  onKeyUp(event) {}
}

const KEYBOARD = new _Keyboard();
