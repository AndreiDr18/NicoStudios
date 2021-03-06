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
let nodemailer = require('nodemailer');

//Fetch
const fetch = require('node-fetch');

//Path handler
const path = require('path');

/*async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 2565,
    auth: {
      user: 'dragneaandrei2001@gmail.com',
      pass: 'Bet0ovY20013'
    }
  });

  let info = await transporter.sendMail({
    from: '"Dragnea Andrei" <dragneaandrei2001@gmail.com>',
    to: 'dragneaionutandrei@gmail.com',
    subject: 'Merge ba!',
    text: 'Merge si aici, stai chill'
  });

  console.log('blavo cplm sa zic: ' + info.messageId);
  console.log(nodemailer.getTestMessageUrl(info))
}
*/
async function recaptchaCheck(token, res) {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LeA7NUaAAAAAPzHEZe6hfcJ8GLLejgw6bF1PZ5a&response=${token}`, {
    method: 'POST'
  });
  const data = await response.json();
  return data;

}

async function orderGET(req, res) {
  //Price Catalog
  let catalogRaw = fs.readFileSync(path.normalize(__dirname + '/../priceCatalog.json'));
  let catalog = await JSON.parse(catalogRaw);


  res.render('order',{
    catalog:catalog
  });
}

async function orderPOST(req, res) {

  let cookie = new cookies(req, res, {
    keys: cookieKeys
  });
  let alreadyOrdered = cookie.get('alreadyOrdered');

  //Human Validation

  let humanValidate = await recaptchaCheck(req.body["g-recaptcha-response"]);

  //Check for troll requests

  if ((emailValidator.validate(req.body.email)) /* &&  (!(alreadyOrdered))  && (humanValidate["success"])*/) {
    cookie.set('alreadyOrdered', true);

    let catalogRaw = fs.readFileSync(path.normalize(__dirname + '/../priceCatalog.json'));
    let catalog = await JSON.parse(catalogRaw);

    let order = new orderModel;
    order.name = `${req.body.name}`;
    order.email = `${req.body.email}`;
    order.phoneNumber = `${req.body.phoneNumber}`;
    order.shortDescription = `${req.body.shortDescription}`;
    order.details = `${req.body.details}`;
    order.address = `${req.body.address}`;
    order.style = `${req.body.style}`;
    order.paper = `${req.body.paper}`;
    order.price = catalog.style[`${req.body.style}`] + catalog.paper[`${req.body.paper}`] + 10;

    order.save()
      .then(res => {
        fs.rename(
          path.normalize(__dirname + `/../public/img/orderReferences/${req.body.name}.jpg`),
          path.normalize(__dirname + `/../public/admin/orders/view/img/orderReferences/${order._id}.jpg`),
          () => {});

      });
    session.orderSuccess = true;
    res.redirect('/');

} else if (emailValidator.validate(req.body.email) == undefined) {
  console.log('req.body.email undefined at line 13 orderController');
  session.orderSuccess = false;
  res.redirect('/');
} else {
  session.orderSuccess = false;
  res.redirect('/');
}

}

module.exports = {
  orderGET,
  orderPOST
};
