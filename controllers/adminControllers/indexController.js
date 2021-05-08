
const session = require('express-session');
//hasher

const hasher = require('crypto-js');

const cookies = require('cookies');
const cookieKeys = ['Crest MapleDoor AveMaria NemtudomRuumano'];

//Mongoose

const user = require('../../models/user');

function indexGET(req, res){
    let cookie = new cookies(req, res, {keys:cookieKeys});
    let adminPass = cookie.get('adminPassword', {signed:true});
    let username = cookie.get('username', {signed:true});


    if(!adminPass)
    {
        res.render('adminViews/login')
    }
    else{
        user.find({username:`${username}`})
        .then(result=>{
            if(result[0].password == adminPass){
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
    console.log(hashedPass);
    user.find({username:req.body.username})
    .then(result =>{
        console.log('User find resulted in smth');
        console.log('Hashed pass = ' + `${hashedPass}`);
        if(result[0].password == hashedPass){
            cookie.set('adminPassword', hashedPass, {signed:true});
            cookie.set('username', req.body.username, {signed:true});
            console.log('User cookies registered')
            res.redirect('/admin');
        }
        else{
            console.log(hashedPass);
            res.redirect('/admin');
        }
    })
    .catch(err=>{
        console.log(err);
    })


}

module.exports = {indexGET, indexPOST};
