const session = require("express-session");
const portfolioModel = require('../models/portfolio');

async function indexGET(req, res){
    const drawings = await portfolioModel.find();
    res.render('index',{
      drawings:drawings
    });

}

module.exports = {indexGET};
