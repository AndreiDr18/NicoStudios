const hasher = require('crypto-js');

const blogModel = require('../../models/blog');

const fs = require('fs');

const path = require('path');

async function blogDELETE(req, res){
  blogModel.findByIdAndDelete(`${req.params.id}`)
  .then(result=>{
    if(fs.existsSync(__dirname + `/../../public/img/portfolio/${req.params.id}.jpg`)) fs.unlinkSync(path.normalize(__dirname + `/../../public/img/blog/${req.params.id}.jpg`));
  });
  res.redirect('/admin/blog');

}

async function blogGET(req, res){
  blogModel.find()
  .then(blogs=>{
    res.render('adminViews/blog',{
      blogs:blogs
    })
  });
}
async function blogEDIT(req, res){
  
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

module.exports = {blogDELETE, blogGET, blogEDIT};
