const blogModel = require('../models/blog');
const nlbr = require('nl2br');

async function blogGET(req, res){

    const blogs = await blogModel.find();
    res.render('blog',{
      blogs:blogs
    });
}
async function blogVIEW(req, res){
    let unformattedName = req.params.name.replace(/-/g,' ');
    let blog = await blogModel.find({title:`${unformattedName}`});
    //res.send(unformattedName);
    res.render('blogView',{
      blog:blog[0],
      text:nlbr(blog[0].description, false)
    });
}

module.exports = {blogGET, blogVIEW};
