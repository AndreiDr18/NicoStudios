const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const userModel = require('../../models/user');
const orderModel = require('../../models/order');

function ordersGET(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
        orderModel.find()
        .then(orders=>{
        res.render('adminViews/orders',{
          orders:orders
        });
        })

    }
    else{
        res.redirect('/admin');
    }
  });


}
function ordersVIEW(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      orderModel.findById(req.params.id)
      .then(order=>{
        res.render('adminViews/orderView',{
          'order':order
        });
      })


    }
    else{
        res.redirect('/admin');
    }
  });

}

module.exports = {ordersGET, ordersVIEW};
