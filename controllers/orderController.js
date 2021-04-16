const multer = require('multer');
const order = require('../models/order');
const fs = require('fs');
const emailValidator = require('email-validator');
let orderModel = require('../models/order');

function orderGET(req, res) {
    res.render('order');
}

function orderPOST(req, res) {

    if(emailValidator.validate(req.body.email)){
        let order = new orderModel;
        order.name=`${req.body.name}`;
        order.email=`${req.body.email}`;
        order.shortDescription=`${req.body.shortDescription}`;
        order.details=`${req.body.details}`;
        console.log(Date.now());
        order.save()
        .then(res=>{
            fs.rename(`./public/img/orderReferences/${req.body.name}.jpg`, `./public/img/orderReferences/${order._id}.jpg`, ()=>{
                console.log('File Renamed');
            });
        });
        res.redirect('/');

    }
    else if(emailValidator.validate(req.body.email) == undefined){
        console.log('req.body.email undefined at line 13 orderController');
        res.redirect('/');
    }
    else 

    res.redirect('/?validEmail=false');

}

module.exports = {
    orderGET,
    orderPOST
};