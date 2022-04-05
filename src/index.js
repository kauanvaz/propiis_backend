const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
var cors = require('cors')

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

require('./app/controllers/authController')(app)
require('./app/controllers/projectController')(app)

app.listen(3333);