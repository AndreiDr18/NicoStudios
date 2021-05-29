const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const user = require('../../models/user');
const portfolioModel = require('../../models/portfolio');

const fs = require('fs');

const path = require('path');

async function indexDELETE(req, res){
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
          portfolioModel.findByIdAndDelete(`${req.params.id}`)
          .then(result=>{
            fs.unlinkSync(path.normalize(__dirname + `/../../public/img/portfolio/${req.params.id}.jpg`));
          });
          res.redirect('/admin/portfolio');

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

async function indexGET(req, res){
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
          portfolioModel.find()
          .then(drawings=>{
            res.render('adminViews/portfolio',{
              drawings:drawings
            });
          });

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

module.exports = {indexDELETE, indexGET};
