class Packet {
  constructor(event, data) {
    this.stringifyed = JSON.stringify({ event: event, data: data });
  }

  static getEvent(MSG) {
    try {
      return JSON.parse(MSG).event;
    } catch {
      return console.error('cannot parse the data');
    }
  }

  static getData(MSG) {
    try {
      return JSON.parse(MSG).data;
    } catch {
      return console.error('cannot parse the data');
    }
  }
}

class ClientSocket {
  constructor(url) {
    this.messageArray = [];

    if (typeof url === 'string' && url.indexOf('://') === -1) {
      const protocol =
        document.location.protocol.indexOf('s') === -1 ? 'ws' : 'wss';
      const host = document.location.host;
      this.SOCKET = new WebSocket(`${protocol}://${host}/${url}`);
    } else {
      this.SOCKET = new WebSocket(url);
    }

    this.SOCKET.addEventListener('open', (event) => {this.onOpen(event)});
    this.SOCKET.addEventListener('close', (event) => {this.onClose(event)});
    this.SOCKET.addEventListener('error', (event) => {this.onError(event)});
    this.SOCKET.addEventListener('message', (event) => {this.message(event)});
  }

  // events
  onMessage(event) {
    console.log('recived message: ', event);
  }

  onOpen(event) {
    console.log('socket opened: ', event);
  }

  onClose(event) {
    console.log('socket closed: ', event);
  }

  onError(event) {
    console.log('there is a socket error: ', event);
  }

  // functions
  on(name, callback) {
    if (this.messageArray[name] instanceof Array) {
      this.messageArray[name].push(callback);
    } else {
      this.messageArray[name] = [callback];
    }

    console.log('added new callback, event: ' + name);
  }

  send(packet) {
    console.log(packet);
    if (packet instanceof Packet) {
      this.SOCKET.send(packet.stringifyed);

      console.log('sending packet:  \n ' + packet.stringifyed);
    }
  }

  message(event) {
    this.onMessage(event);

    const callbacks = this.messageArray[Packet.getEvent(event.data)];
    const eventData = Packet.getData(event.data);

    callbacks.forEach((callback) => {
      if (callback instanceof Function) {
        callback(eventData);
      }
    });
  }

  close() {
    this.SOCKET.close();
  }
}


export {ClientSocket, Packet}