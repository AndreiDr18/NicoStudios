const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  snippet:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  time:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('blog', blogSchema);
