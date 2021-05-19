const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

//Encrypter
const hasher = require('crypto-js');


//User mongoose model
const userModel = require('../../models/user');
const drawingModel = require('../../models/portfolio');

//Filesystem handler
const fs = require('fs');

//Pathing
const path = require('path');

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
        fs.rename(path.normalize(__dirname + `/../../public/img/portfolio/${req.body.title}.jpg`),path.normalize(__dirname + `/../../public/img/portfolio/${drawingEntry._id}.jpg`),()=>{
      })

    })
      res.redirect('/admin');

    }
    else{
        res.redirect('/admin');
    }
  });



}

module.exports = {portfolioPOST};
