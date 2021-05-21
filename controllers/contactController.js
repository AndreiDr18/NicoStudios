//Mongoose contact model
const contactModel = require('../models/contact.js');

//Email Validation
const emailValidator = require('email-validator');

//Session manager
const session = require('express-session');

//Fetch for backend
const fetch = require('node-fetch');

async function validateHuman(token){
  let response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LcPyNMaAAAAADLxC34cyjYrks1A5tm_6T6nrgyP&response=${token}`
  ,{
    method:'POST'
  });

  const data = response.json();

  return data;
}


function contactGET(req, res){
    res.render('contact');
}

async function contactPOST(req, res){
  const humanValidation = await validateHuman(req.body['g-recaptcha-response']);
  const isHuman = humanValidation.success;

    if((emailValidator.validate(req.body.email) && isHuman)){
      let contactEntry = new contactModel();


      contactEntry.name = req.body.name;
      contactEntry.email = req.body.email;
      contactEntry.subject = req.body.subject;
      contactEntry.message = req.body.message;
      contactEntry.save()
      .catch(err=>{
        console.log(err);
      });
      session.contactSuccess = true;

    }
    else{
      session.contactSuccess = false;
    }
    res.redirect('/');
}

module.exports = {contactGET, contactPOST};
