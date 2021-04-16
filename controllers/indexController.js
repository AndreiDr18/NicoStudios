const session = require("express-session");

function indexGET(req, res){
    res.render('index');
    res.json(session.orderValidation);

}

module.exports = {indexGET};