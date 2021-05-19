const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const userModel = require('../../models/user');
const portfolioModel = require('../../models/portfolio');

const fs = require('fs');

const path = require('path');

async function indexDELETE(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      portfolioModel.findByIdAndDelete(`${req.params.id}`)
      .then(result=>{
        fs.unlinkSync(path.normalize(__dirname + `/../../public/img/portfolio/${req.params.id}.jpg`));
      });
      res.redirect('/admin/portfolio');

    }
    else{
        res.redirect('/admin');
    }
  });

}

async function indexGET(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      portfolioModel.find()
      .then(drawings=>{
        res.render('adminViews/portfolio',{
          drawings:drawings
        });
      });

    }
    else{
        res.redirect('/admin');
    }
  });
}

module.exports = {indexDELETE, indexGET};
