function indexGET(req, res){
    res.render('index', {
        validEmail:req.query.validEmail
    });
}

module.exports = {indexGET};