const blogModel = require('../models/blog');

async function blogGET(req, res){

    const blogs = await blogModel.find();
    res.render('blog',{
      blogs:blogs
    });
}
async function blogVIEW(req, res){

    let blog = await blogModel.findById(`${req.params.id}`);
    res.render('blogView',{
      blog:blog
    });
}

module.exports = {blogGET, blogVIEW};
