const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

//Encrypter
const hasher = require('crypto-js');


//User mongoose model
const user = require('../../models/user');
const drawingModel = require('../../models/portfolio');
const blogModel = require('../../models/blog');

//Filesystem handler
const fs = require('fs');

//Pathing
const path = require('path');

async function portfolioPOST(req, res){
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
          let drawingEntry = new drawingModel();
          drawingEntry.title=req.body.title;
          drawingEntry.save()
          .then(drawingEntry=>{
            fs.rename(path.normalize(__dirname + `/../../public/img/portfolio/${req.body.title}.jpg`),path.normalize(__dirname + `/../../public/img/portfolio/${drawingEntry._id}.jpg`),()=>{
          })

        })
          res.redirect('/admin');

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
async function blogPOST(req, res){
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
          let blogEntry = new blogModel();

          blogEntry.title=req.body.title;
          blogEntry.snippet=req.body.snippet;
          blogEntry.description=req.body.description;

          blogEntry.save()
          .then(blogEntry=>{
            fs.rename(path.normalize(__dirname + `/../../public/img/blog/${req.body.title}.jpg`),path.normalize(__dirname + `/../../public/img/blog/${blogEntry._id}.jpg`),()=>{
          })

        })
          res.redirect('/admin');

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

module.exports = {portfolioPOST, blogPOST};
