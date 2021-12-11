const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const user = require('../../models/user');
const blogModel = require('../../models/blog');

const fs = require('fs');

const path = require('path');

async function blogDELETE(req, res){
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
          blogModel.findByIdAndDelete(`${req.params.id}`)
          .then(result=>{
            if(fs.existsSync(__dirname + `/../../public/img/portfolio/${req.params.id}.jpg`)) fs.unlinkSync(path.normalize(__dirname + `/../../public/img/blog/${req.params.id}.jpg`));
          });
          res.redirect('/admin/blog');
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

async function blogGET(req, res){
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
          blogModel.find()
          .then(blogs=>{
            res.render('adminViews/blog',{
              blogs:blogs
            })
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
async function blogEDIT(req, res){
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
          blogModel.findById(`${req.params.id}`)
          .then(blog=>{

            if(req.file != undefined){
              fs.rename(path.normalize(__dirname + `/../../public/img/blog/${req.body.title}.jpg`),path.normalize(__dirname + `/../../public/img/blog/${blog._id}.jpg`),()=>{
            });
            }

            blog.title= req.body.title;
            blog.snippet = req.body.snippet;
            blog.description = req.body.description;
            blog.save()
            .then(()=>{
              res.redirect('/admin/blog');
            })
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

module.exports = {blogDELETE, blogGET, blogEDIT};
