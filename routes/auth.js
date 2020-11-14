const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require ('../validation');
const bcrypt = require("bcryptjs");

// const { models } = require('mongoose');
// const { check,validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");


/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });


router.post('/register', async (req, res) => {

    //VALIDATE DATA BEFORE CREATING USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check for duplicate username and email
    // const userExist = await User.findOne({username: req.body.username});
    // if(userExist) return res.status(400).send('Username already exists.');

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists.');

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        fullname: req.body.fullname,
        // username: req.body.username
    });
    try {
        const savedUser = await user.save();
        res.send({user: user.email});
    } catch (err) {
        res.status(400).send(err);
    }
});


//LOGIN
router.post('/login', async (req, res) => {
    //VALIDATE DATA BEFORE CREATING USER
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Verify email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not registered.');

    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password.')

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);

});


module.exports = router;