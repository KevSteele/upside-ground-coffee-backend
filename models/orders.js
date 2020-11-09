// Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var Order = new Schema({
    customer: {
        firstname: String,
        lastname: String,
        email: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    product: String,
    price:  Number,
});

// Compile model from schema
var OrderModel = mongoose.model('Order', Order);

module.exports = OrderModel;