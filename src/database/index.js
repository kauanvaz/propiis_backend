const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/propiis', {useNewUrlParser: true});
mongoose.Promise = global.Promise; 

module.exports = mongoose;