const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const user = require('../../models/user');
const orderModel = require('../../models/order');

function ordersGET(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let AID = cookie.get('AID', {signed:true});


  if(!AID)
  {
      res.render('adminViews/login')
  }
  else{
      user.findById(`${AID}`)
      .then(result=>{
        if(result != null){
          orderModel.find()
          .then(orders=>{
          res.render('adminViews/orders',{
            orders:orders
          });
          })

              }
              else{
                res.redirect('/');
              }
      })
      .catch(err =>{
          console.log(err);
      })
  }

}

function ordersVIEW(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let AID = cookie.get('AID', {signed:true});


  if(!AID)
  {
      res.render('adminViews/login')
  }
  else{
      user.findById(`${AID}`)
      .then(result=>{
        if(result != null){
          orderModel.findById(req.params.id)
          .then(order=>{
            res.render('adminViews/orderView',{
              'order':order
            });
          })


              }
              else{
                res.redirect('/');
              }
      })
      .catch(err =>{
          console.log(err);
      })
  }

}
function ordersDELETE(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let AID = cookie.get('AID', {signed:true});


  if(!AID)
  {
      res.render('adminViews/login')
  }
  else{
      user.findById(`${AID}`)
      .then(result=>{
        if(result != null){
          orderModel.findByIdAndDelete(req.params.id)
          .then(order=>{
            res.redirect('/admin/orders');
          })


              }
              else{
                res.redirect('/');
              }
      })
      .catch(err =>{
          console.log(err);
      })
  }


}

module.exports = {ordersGET, ordersVIEW, ordersDELETE};
