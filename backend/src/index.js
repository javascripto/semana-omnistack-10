require('dotenv').config({ path: '.env' });
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const getMongoURI = require('./utils/getMongoURI');

const app = express();

mongoose.connect(getMongoURI(), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'web', 'build')));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
