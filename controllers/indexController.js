const session = require("express-session");
const portfolioModel = require('../models/portfolio');
const blogModel = require('../models/blog');

async function indexGET(req, res){
    const drawings = await portfolioModel.find();
    const blogs = await blogModel.find().sort({'time':'-1'});
    res.render('index',{
      drawings:drawings,
      orderSuccess:session.orderSuccess,
      contactSuccess:session.contactSuccess,
      blogs:blogs
    });
    session.orderSuccess = null;
    session.contactSuccess = null;

}

module.exports = {indexGET};
