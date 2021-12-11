//hasher

const hasher = require('crypto-js');

const cookies = require('cookies');

//Mongoose

const user = require('../../models/user');

function indexGET(req, res){
  res.render('adminViews/index');
}
async function indexPOST(req, res){
    try{
      let cookie = new cookies(req, res, {keys:[`${process.env.COOKIE_KEY}`]});
      let hashedPass = hasher.SHA256(req.body.password, process.env.ENC_KEY);
      console.log(hashedPass +'\n' + req.body.password);
      let admin = await user.findOne({"username":`${req.body.username}`});
      console.log(admin);
      //Login verification
      if(admin.password == hashedPass){
        cookie.set('AID', `${admin._id}`, {signed:true});
        res.redirect('/admin');
      }
      else{
        res.redirect('/admin');
      }
    }catch(e){
      console.log(e);
      res.redirect('/admin');
    }


}

module.exports = {indexGET, indexPOST};
