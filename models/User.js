// Require Mongoose
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    fullname: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    // username: {
    //     type: String,
    //     unique: true,
    //     required: true,
    //     max: 25,
    // }
});

// Compile model from schema
module.exports = mongoose.model('User', userSchema);