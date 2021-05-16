const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  title:{
    type:String,
    required:true
  }
}, {timestamps:true});

module.exports = mongoose.model('drawing', portfolioSchema);
