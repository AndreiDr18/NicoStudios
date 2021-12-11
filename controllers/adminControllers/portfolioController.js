const portfolioModel = require('../../models/portfolio');

const fs = require('fs');

const path = require('path');

async function indexDELETE(req, res){
  portfolioModel.findByIdAndDelete(`${req.params.id}`)
  .then(result=>{
    if(fs.existsSync(__dirname + `/../../public/img/portfolio/${req.params.id}.jpg`))
      fs.unlinkSync(path.normalize(__dirname + `/../../public/img/portfolio/${req.params.id}.jpg`))
  });
  res.redirect('/admin/portfolio');

}

async function indexGET(req, res){
  portfolioModel.find()
  .then(drawings=>{
    res.render('adminViews/portfolio',{
      drawings:drawings
    });
  });
}

module.exports = {indexDELETE, indexGET};
