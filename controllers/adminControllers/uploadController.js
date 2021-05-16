const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

//Encrypter
const hasher = require('crypto-js');


//User mongoose model
const userModel = require('../../models/user');
const drawingModel = require('../../models/portfolio');

//Filesystem handler
const fs = require('fs');

async function portfolioPOST(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  let drawingEntry = new drawingModel;
  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      drawingEntry.title=req.body.title;
      drawingEntry.save()
      .then(drawingEntry=>{
      fs.rename(`./public/img/portfolio/${req.body.title}`, `./public/img/portfolio/${drawingEntry.id}`,()=>{
        console.log('File renamed');
      });
      console.log(drawingEntry);
    })
      res.redirect('/admin');

    }
    else{
        res.redirect('/admin');
    }
  });



}

module.exports = {portfolioPOST};
