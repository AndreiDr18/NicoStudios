//mongoose portfolio model
const portfolioModel = require('../models/portfolio');

async function indexGET(req,res){

  const drawings = await portfolioModel.find();

  res.render('portfolio', {
    drawings:drawings
  })

}

module.exports = {indexGET};
