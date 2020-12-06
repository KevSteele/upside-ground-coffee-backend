var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_Connect, { useCreateIndex: true, useNewUrlParser: true});


//Import Routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var ordersRouter = require('./routes/orders');
// var errorController = require('./controllers/errorController');

//Middlewares
app.use(logger('dev'));
app.use(express.json()); //for sending post requests
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/user', authRouter);
app.use('/orders', ordersRouter);

app.use((err, req, res, next) => {
    console.log('congrats you hit the error middleware');
    console.log(err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're in!")
});

// app.use(errorController);

module.exports = app;
