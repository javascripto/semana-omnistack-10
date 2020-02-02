const socketio = require('socket.io');

const calculateDistance = require('./utils/calculateDistance');
const parseStringAsArray = require('./utils/parseStringAsArray');

let io;
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  const _10Km = 10;
  return connections.filter(connection =>
    calculateDistance(coordinates, connections.coordinates) < _10Km
    && connections.techs.some(tech => techs.includes(tech))
  );
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
