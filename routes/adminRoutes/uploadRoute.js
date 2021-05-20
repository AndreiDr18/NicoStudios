const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');

let portfolioStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/portfolio');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.title}` + '.jpg');
    }
});
let portfolioUpload = multer({
    storage: portfolioStorage
});
let blogStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.normalize(__dirname + '/../../public/img/blog'));
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.title}` + '.jpg');
    }
});
let blogUpload = multer({
    storage: blogStorage
});


//Routes

//Controller
const controller = require('../../controllers/adminControllers/uploadController');

//controller middleware
//router.get('/blog', controller.blogPOST);
router.post('/portfolio',portfolioUpload.single('drawing'), controller.portfolioPOST);
router.post('/blog',blogUpload.single('drawing'), controller.blogPOST);

module.exports = router;
