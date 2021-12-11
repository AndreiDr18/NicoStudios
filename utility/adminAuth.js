require('dotenv').config();
const cookies = require('cookies');

async function adminAuthenticate(req, res, next){
    const user = require('../models/user');
    let cookieKeys = [`${process.env.COOKIE_KEY}`];
    let cookie = new cookies(req, res, {keys:cookieKeys});
    let AID = cookie.get('AID', {signed:true});

    if(!AID)
    {
        res.render('adminViews/login');
    }
    else{
        user.findById(`${AID}`)
        .then(result=>{
            if(result != null && result != undefined){
                next();
                console.log('User entry granted');
                }
            else{
                res.redirect('/');
            }
        })
        .catch(err =>{
            console.log(err);
            res.redirect('/admin');
        })
    }
}

module.exports = adminAuthenticate;