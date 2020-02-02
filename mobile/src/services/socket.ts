import socketio from 'socket.io-client';
import { baseURL } from './baseURL';

const socket = socketio(baseURL, {
  autoConnect: false,
});

export function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };
  socket.connect();
}

export function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export function subscribeToNewDevs(subcribeFunction: Function) {
  socket.on('new-dev', subcribeFunction);
}
