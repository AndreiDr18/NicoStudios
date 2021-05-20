const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

const hasher = require('crypto-js');

const userModel = require('../../models/user');
const blogModel = require('../../models/blog');

const fs = require('fs');

const path = require('path');

async function blogDELETE(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      blogModel.findByIdAndDelete(`${req.params.id}`)
      .then(result=>{
        fs.unlinkSync(path.normalize(__dirname + `/../../public/img/blog/${req.params.id}.jpg`));
      });
      res.redirect('/admin/blog');

    }
    else{
        res.redirect('/admin');
    }
  });

}

async function blogGET(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
      blogModel.find()
      .then(blogs=>{
        res.render('adminViews/blog',{
          blogs:blogs
        })
      });

    }
    else{
        res.redirect('/admin');
    }
  });
}
async function blogEDIT(req, res){
  let cookie = new cookies(req, res, {keys:cookieKeys});
  let adminPass = cookie.get('adminPassword', {signed:true});
  let username = cookie.get('username', {signed:true});

  userModel.find({'username':`${username}`})
  .then(result=>{
    if(result[0].password == adminPass){
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
        res.redirect('/admin');
    }
  });
}

module.exports = {blogDELETE, blogGET, blogEDIT};
