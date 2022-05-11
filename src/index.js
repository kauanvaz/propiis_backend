const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);
require('../mock-tests/controllers/index')(app);

module.exports = app;