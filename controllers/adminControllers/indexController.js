
const session = require('express-session');
//hasher

const hasher = require('crypto-js');

const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

//Mongoose

const user = require('../../models/user');

function indexGET(req, res){
    let cookie = new cookies(req, res, {keys:cookieKeys});
    let AID = cookie.get('AID', {signed:true});


    if(!AID)
    {
        res.render('adminViews/login')
    }
    else{
        user.findById(`${AID}`)
        .then(result=>{
          if(result != null){
                res.render('adminViews/index');
                console.log('User entry granted');
                }
                else{
                  res.redirect('/');
                }
        })
        .catch(err =>{
            console.log(err);
        })
    }
}
function indexPOST(req, res){
    let cookie = new cookies(req, res, {keys:cookieKeys});
    let hashedPass = hasher.SHA3(req.body.password);
    user.find({username:req.body.username})
    .then(result =>{
        if(result.password == hashedPass){
            console.log(result['_id'] + '\n 1');
            cookie.set('AID', result._id, {signed:true});
            res.redirect('/admin');
        }
        else{
          console.log(result.password + '\n 2');
            res.redirect('/admin');
        }
    })
    .catch(err=>{
        console.log(err);
    })


}

module.exports = {indexGET, indexPOST};
