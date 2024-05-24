import { ClientSocket, Packet } from './ClientSocket.js'; 
import Controller from './Controller.js';

const WS = new ClientSocket('domain');


WS.onOpen = function() {
  const testPacket = new Packet('eventName', { int: -1 });
  
  WS.send(testPacket);

  console.log('Sending test packet to /domain');
};


const C = new Controller();