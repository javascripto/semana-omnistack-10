require('dotenv').config({ path: '.env' });
const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const getMongoURI = require('./utils/getMongoURI');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(getMongoURI(), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'web', 'build')));
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
