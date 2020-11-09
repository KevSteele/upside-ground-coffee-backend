// Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var users = new Schema({
    a_string: String,
    a_date: Date
});

// Compile model from schema
var usersModel = mongoose.model('users', users);