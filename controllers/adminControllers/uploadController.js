//User mongoose model
const user = require('../../models/user');
const drawingModel = require('../../models/portfolio');
const blogModel = require('../../models/blog');

//Filesystem handler
const fs = require('fs');

//Pathing
const path = require('path');

async function portfolioPOST(req, res){
  let drawingEntry = new drawingModel();
  drawingEntry.title=req.body.title;
  drawingEntry.save()
  .then(drawingEntry=>{
    fs.rename(path.normalize(__dirname + `/../../public/img/portfolio/${req.body.title}.jpg`),path.normalize(__dirname + `/../../public/img/portfolio/${drawingEntry._id}.jpg`),()=>{});
  });
  res.redirect('/admin');
}
async function blogPOST(req, res){
  let blogEntry = new blogModel();

  blogEntry.title=req.body.title;
  blogEntry.snippet=req.body.snippet;
  blogEntry.description=req.body.description;

  blogEntry.save()
  .then(blogEntry=>{
    fs.rename(path.normalize(__dirname + `/../../public/img/blog/${req.body.title}.jpg`),path.normalize(__dirname + `/../../public/img/blog/${blogEntry._id}.jpg`),()=>{});
  })
  res.redirect('/admin');

}

module.exports = {portfolioPOST, blogPOST};
