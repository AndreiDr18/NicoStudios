
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

//Cookie handler
const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

//Email System
let nodemailer = require('nodemailer')

async function sendMail(){
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    port:2565,
    auth:{
      user:'dragneaandrei2001@gmail.com',
      pass:'Bet0ovY20013'
    }
  });

  let info = await transporter.sendMail({
    from:'"Dragnea Andrei" <dragneaandrei2001@gmail.com>',
    to:'dragneaionutandrei@gmail.com',
    subject:'Merge ba!',
    text:'Merge si aici, stai chill'
  });

  console.log('blavo cplm sa zic: '+ info.messageId);
  console.log(nodemailer.getTestMessageUrl(info))
}

function orderGET(req, res) {
    res.render('order');
}

function orderPOST(req, res) {

  let cookie = new cookies(req, res, {keys:cookieKeys});
  let alreadyOrdered = cookie.get('alreadyOrdered');

    session.orderValidation = {
        name:true,
        email:true,
        shortDescription:true,
        details:true
    };
    if ((emailValidator.validate(req.body.email)) && (!(alreadyOrdered))) {
        console.log(alreadyOrdered + '\n');
        cookie.set('alreadyOrdered', true);
        let order = new orderModel;
        order.name = `${req.body.name}`;
        order.email = `${req.body.email}`;
        order.phoneNumber = `${req.body.phoneNumber}`;
        order.shortDescription = `${req.body.shortDescription}`;
        order.details = `${req.body.details}`;
        order.save()
            .then(res => {
                fs.rename(`./public/img/orderReferences/${req.body.name}.jpg`, `./public/admin/orders/view/img/orderReferences/${order._id}.jpg`, () => {
                    console.log('File Renamed');
                    sendMail()
                    .catch(err =>{ console.log(err);});
                });

            });
        res.redirect('/');

    } else if (emailValidator.validate(req.body.email) == undefined) {
        console.log('req.body.email undefined at line 13 orderController');
        console.log(alreadyOrdered + '\n');
        res.redirect('/');
    } else {
        session.orderValidation.email = false;
        console.log("Nu merge bro")
        console.log(alreadyOrdered + '\n');
        res.redirect('/');
    }
}

module.exports = {
    orderGET,
    orderPOST
};
