const express = require('express');
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/portfolio');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.title}` + '.jpg');
    }
});
let upload = multer({
    storage: storage
});


//Routes

//Controller
const controller = require('../../controllers/adminControllers/uploadController');

//controller middleware
//router.get('/blog', controller.blogPOST);
router.post('/portfolio',upload.single('drawing'), controller.portfolioPOST);

module.exports = router;
