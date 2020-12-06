// Require Mongoose
const { bool, boolean } = require('@hapi/joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Define schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'That email address is taken.'],
        required: [true, 'Enter an email address.'],
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address.'],
        max: 255
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        min: [8, 'Password should be at least 8 characters.'],
        max: 1024
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Retype your password.'],
    //     validate: {
    //         validator: function(el) {
    //             return el === this.password;
    //         }, message: 'Passwords don\'t match.',
    //     }
    // },
    fullname: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    admin: {
        type: Boolean
    }
    // username: {
    //     type: String,
    //     unique: true,
    //     required: true,
    //     max: 25,
    // }
});

//schema middleware to apply before saving
userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

// Compile model from schema
module.exports = mongoose.model('User', userSchema);