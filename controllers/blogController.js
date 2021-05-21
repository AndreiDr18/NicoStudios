const blogModel = require('../models/blog');

async function blogGET(req, res){

    const blogs = await blogModel.find();
    res.render('blog',{
      blogs:blogs
    });
}

module.exports = {blogGET};
