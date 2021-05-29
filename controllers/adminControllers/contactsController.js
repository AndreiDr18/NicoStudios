const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const user = require('../../models/user');
const contactModel = require('../../models/contact');

function contactsGET(req, res){
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
          contactModel.find()
          .then(contacts=>{
          res.render('adminViews/contacts',{
            contacts:contacts
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
function contactsVIEW(req, res){
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
          contactModel.findById(req.params.id)
          .then(contact=>{
            res.render('adminViews/contactView',{
              'contact':contact
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
function contactsDELETE(req, res){
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
          contactModel.findByIdAndDelete(req.params.id)
          .then(contact=>{
            res.redirect('/admin/contacts');
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

module.exports = {contactsGET, contactsVIEW, contactsDELETE};
