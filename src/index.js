const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

require('./app/controllers/authController')(app)
require('./app/controllers/projectController')(app)

app.listen(3000);