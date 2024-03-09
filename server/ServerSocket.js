class Packet {
  constructor(event, data) {
    this.stringifyed = JSON.stringify({ event: event, data: data });
  }

  static getEvent(MSG) {
    try {
      return JSON.parse(MSG).event;
    } catch {
      console.error('Cannot parse the data');
      return null; // Returning null to indicate a parsing error
    }
  }

  static getData(MSG) {
    try {
      return JSON.parse(MSG).data;
    } catch {
      console.error('Cannot parse the data');
      return null; // Returning null to indicate a parsing error
    }
  }
}

class ServerSocket {
  constructor(route = '', app) {
    // Use arrow function to bind 'this' to the class instance
    app.ws('/' + route, (ws, req) => this.handle(ws, req));

    this.eventCallbacks = {};
    this.WS = null;
  }

  // Event handlers
  onMessage(message) {
    // console.log(message);
  }

  onOpen() {
    // console.log('WebSocket connection opened');
  }

  onClose() {
    // console.log('WebSocket connection closed');
  }

  // WebSocket handling
  handle(ws) {
    // Call onOpen method
    this.onOpen();

    // Handle errors using 'error' event
    this.WS = ws;

    ws.on('message', (message) => this.message(message));

    ws.on('close', () => this.onClose());

    ws.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });
  }

  // Event registration
  on(event, callback) {
    if (!this.eventCallbacks[event]) {
      this.eventCallbacks[event] = [];
    }
    this.eventCallbacks[event].push(callback);
  }

  // Message handling
  message(message) {
    this.onMessage(message);

    const event = Packet.getEvent(message);
    const data = Packet.getData(message);

    if (event && this.eventCallbacks[event]) {
      this.eventCallbacks[event].forEach((callback) => {
        if (callback instanceof Function) {
          callback(data);
        }
      });
    }
  }

  // Sending data
  send(packet) {
    if (
      packet instanceof Packet &&
      this.WS instanceof require('ws').WebSocket
    ) {
      this.WS.send(packet.stringifyed);
    }
  }

  // Closing the WebSocket connection
  close() {
    if (
      this.WS._readyState != 3 &&
      this.WS instanceof require('ws').WebSocket
    ) {
      this.WS.close();
    }
  }
}

module.exports = { Packet, ServerSocket };
