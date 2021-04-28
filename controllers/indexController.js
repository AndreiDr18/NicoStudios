const session = require("express-session");

function indexGET(req, res){
    res.render('index',session.orderValidation);

}

module.exports = {indexGET};