const orderModel = require('../../models/order');

function ordersGET(req, res){
          orderModel.find()
          .then(orders=>{
            res.render('adminViews/orders',{
              orders:orders
            });
          });
}

function ordersVIEW(req, res){
          orderModel.findById(req.params.id)
          .then(order=>{
            res.render('adminViews/orderView',{
              'order':order
            });
          });
}
function ordersDELETE(req, res){

          orderModel.findByIdAndDelete(req.params.id)
          .then(order=>{
            res.redirect('/admin/orders');
          });
}

module.exports = {ordersGET, ordersVIEW, ordersDELETE};
