
//File upload handler
const multer = require('multer');

//Database Order Model
let orderModel = require('../models/order');

//Offline Email Validator
const emailValidator = require('email-validator');

//FileSystem
const fs = require('fs');

//Session handle
const session = require('express-session');

function orderGET(req, res) {
    res.render('order');
}

function orderPOST(req, res) {

    session.orderValidation = {
        name:true,
        email:true,
        shortDescription:true,
        details:true
    };

    if (emailValidator.validate(req.body.email)) {
        let order = new orderModel;
        order.name = `${req.body.name}`;
        order.email = `${req.body.email}`;
        order.shortDescription = `${req.body.shortDescription}`;
        order.details = `${req.body.details}`;
        console.log(Date.now());
        order.save()
            .then(res => {
                fs.rename(`./public/img/orderReferences/${req.body.name}.jpg`, `./public/img/orderReferences/${order._id}.jpg`, () => {
                    console.log('File Renamed');
                });
            });
        res.redirect('/');

    } else if (emailValidator.validate(req.body.email) == undefined) {
        console.log('req.body.email undefined at line 13 orderController');
        res.redirect('/');
    } else {
        session.orderValidation.email = false;
        res.redirect('/');
    }
}

module.exports = {
    orderGET,
    orderPOST
};