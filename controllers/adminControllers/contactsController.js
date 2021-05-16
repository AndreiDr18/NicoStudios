const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const userModel = require('../../models/user');
const contactModel = require('../../models/contact');

function contactsGET(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
        contactModel.find()
        .then(contacts=>{
        res.render('adminViews/contacts',{
          contacts:contacts
        });
        })

    }
    else{
        res.redirect('/admin');
    }
  });


}
function contactsVIEW(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      contactModel.findById(req.params.id)
      .then(contact=>{
        res.render('adminViews/contactView',{
          'contact':contact
        });
      })


    }
    else{
        res.redirect('/admin');
    }
  });

}
function contactsDELETE(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      contactModel.findByIdAndDelete(req.params.id)
      .then(contact=>{
        res.redirect('/admin/contacts');
      })


    }
    else{
        res.redirect('/admin');
    }
  });

}

module.exports = {contactsGET, contactsVIEW, contactsDELETE};
