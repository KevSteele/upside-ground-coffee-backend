
var express = require('express');
var router = express.Router();
var Order = require('../models/orders');
const verify = require('./verifyToken');


/* GET home page. */
router.get('/', verify, async function (req, res) {
    try {
        const orders = await Order.find();
        res.status(200).json({
            data: {
                orders
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});


// Find Order by ID
router.get('/:id', verify, async function (req, res) {
    try {
        let id = req.params.id;
        const order = await Order.findById(id);
        res.status(200).json({
            data: {
                order
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});


//Add New Order
router.post('/add', verify, async function (req, res) {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                order: newOrder
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});


//update order
router.put('/update/:id', verify, async function (req, res) {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            data: {
                order
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
});


//delete order
router.delete('/delete/:id', verify, async function (req, res) {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});


module.exports = router;