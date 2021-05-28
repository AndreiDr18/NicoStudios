const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address:{
    type:String
  },
  shortDescription: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  style:{
    type:String,
    required:true
  },
  paper:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('order', order);
